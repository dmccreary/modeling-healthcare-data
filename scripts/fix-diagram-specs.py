#!/usr/bin/env python3
"""
Bring chapter <details> diagram/MicroSim specs into compliance with the
chapter-content-generator v0.08 format:

  1. De-indent the content inside each <details markdown="1"> block
     (removes the uniform leading indent that makes MkDocs render the spec
     as a code block instead of formatted markdown).
  2. Insert a `#### Diagram: <summary>` level-4 header before each block
     that lacks one (required for the TOC anchor and extract-sim-specs.py).
  3. Add the structured fields **sim-id:** / **Library:** / **Status:**
     after the Type: line (adding a Type: line if missing).

Usage:
  python scripts/fix-diagram-specs.py --dry-run docs/chapters/09-*/index.md
  python scripts/fix-diagram-specs.py --apply   docs/chapters/*/index.md
"""
import re, sys, glob

STOP = {'a','an','the','with','for','and','of','to','in','vs','using',
        'interactive','example'}

def kebab(summary, used):
    s = summary.lower().replace("'", "")
    s = re.sub(r'[^a-z0-9]+', ' ', s)
    toks = [t for t in s.split() if t and t not in STOP]
    toks = toks[:6]
    sid = '-'.join(toks) or 'diagram'
    base = sid; n = 2
    while sid in used:
        sid = f"{base}-{n}"; n += 1
    used.add(sid)
    return sid

def library_for(type_str):
    t = type_str.lower()
    if 'microsim' in t: return 'p5.js'
    if 'chart' in t or 'dashboard' in t: return 'Chart.js'
    if 'graph-model' in t or 'graph model' in t: return 'vis-network'
    if 'timeline' in t: return 'vis-timeline'
    if t.strip() == 'map' or 'map ' in t: return 'Leaflet'
    if 'workflow' in t: return 'Mermaid'
    if 'venn' in t: return 'p5.js'
    if 'infographic' in t: return 'p5.js'
    if 'diagram' in t: return 'p5.js'
    if 'table' in t: return 'p5.js'
    return 'p5.js'

def normalize_type(type_str):
    t = type_str.lower()
    if 'venn' in t: return 'diagram'
    return type_str.strip()

def infer_type(summary):
    s = summary.lower()
    if 'microsim' in s: return 'microsim'
    if 'dashboard' in s or 'chart' in s: return 'chart'
    if 'timeline' in s: return 'timeline'
    if 'workflow' in s: return 'workflow'
    if 'map' in s: return 'map'
    if 'infographic' in s: return 'infographic'
    if 'graph model' in s or 'network' in s: return 'graph-model'
    return 'diagram'

def process(path, apply):
    lines = open(path).read().split('\n')
    out = []
    used_ids = set()
    i = 0
    changed = 0
    while i < len(lines):
        line = lines[i]
        if '<details' in line:
            # capture block content
            start = i
            j = i + 1
            content = []
            while j < len(lines) and '</details>' not in lines[j]:
                content.append(lines[j]); j += 1
            end = j  # index of </details>
            # de-indent by the <summary> line's indent (the true base level),
            # stripping at most `base` leading spaces per line so nested list
            # structure is preserved and content is never corrupted by ragged
            # source indentation.
            sumi = next((len(l) - len(l.lstrip(' '))
                         for l in content if '<summary>' in l), None)
            indents = [len(l) - len(l.lstrip(' ')) for l in content if l.strip()]
            base = sumi if sumi is not None else (min(indents) if indents else 0)
            def strip_lead(l, b=base):
                n = len(l) - len(l.lstrip(' '))
                return l[min(n, b):]
            ded = [strip_lead(l) for l in content]
            # find summary
            summ = None
            for l in ded:
                m = re.search(r'<summary>(.*?)</summary>', l)
                if m: summ = m.group(1).strip(); break
            if summ is None:
                summ = 'Diagram'
            # find type line index in ded
            type_idx = None; type_val = None
            for k, l in enumerate(ded):
                m = re.match(r'\*{0,2}Type:\*{0,2}\s*(.*)', l.strip())
                if m:
                    type_idx = k; type_val = m.group(1).strip(); break
            if type_val is None or type_val == '':
                type_val = infer_type(summ)
                norm_type = type_val
            else:
                norm_type = normalize_type(type_val)
            sid = kebab(summ, used_ids)
            lib = library_for(norm_type if type_val else summ)
            fields = [f"**sim-id:** {sid}<br/>",
                      f"**Library:** {lib}<br/>",
                      "**Status:** Specified"]
            # rebuild ded content with normalized Type + fields
            new_ded = []
            inserted = False
            if type_idx is not None:
                for k, l in enumerate(ded):
                    if k == type_idx:
                        new_ded.append(f"Type: {norm_type}")
                        new_ded.extend(fields)
                        inserted = True
                    else:
                        new_ded.append(l)
            else:
                # no type line: insert Type+fields right after summary line
                for l in ded:
                    new_ded.append(l)
                    if not inserted and '<summary>' in l:
                        new_ded.append(f"Type: {norm_type}")
                        new_ded.extend(fields)
                        inserted = True
                if not inserted:
                    new_ded = [f"Type: {norm_type}"] + fields + new_ded
            # check for preceding header (scan back over blank/iframe/link lines)
            k = len(out) - 1
            def skippable(s):
                t = s.strip()
                return (t == '' or '<iframe' in t or '</iframe' in t
                        or (t.startswith('[') and '](' in t))   # md link/button
            while k >= 0 and skippable(out[k]):
                k -= 1
            has_hdr = k >= 0 and out[k].startswith('#### Diagram:')
            if not has_hdr:
                # replace the blank/iframe-leading run after the prose at k with
                # cleanly-spaced: <blank> #### header <blank> <iframe-or-details>
                insert_at = k + 1
                m = insert_at
                while m < len(out) and out[m].strip() == '':
                    m += 1
                out[insert_at:m] = ["", f"#### Diagram: {summ}", ""]
                changed += 1
            # emit rebuilt block
            out.append(line)            # <details ...>
            out.extend(new_ded)
            out.append(lines[end])      # </details>
            i = end + 1
            continue
        out.append(line)
        i += 1
    result = '\n'.join(out)
    if apply:
        open(path, 'w').write(result)
    return changed, result

def main():
    mode = sys.argv[1]
    apply = (mode == '--apply')
    paths = []
    for a in sys.argv[2:]:
        paths.extend(glob.glob(a))
    for p in sorted(paths):
        changed, result = process(p, apply)
        ch = p.split('/')[-2]
        print(f"{'APPLIED' if apply else 'DRY'} {ch}: headers added={changed}")
        if not apply and 'dry-print' in sys.argv:
            print(result)

if __name__ == '__main__':
    main()
