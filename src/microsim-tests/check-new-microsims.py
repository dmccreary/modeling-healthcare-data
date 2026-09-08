#!/usr/bin/env python3
"""Browser regression checks for the September 2026 MicroSim batches.
Run: python check-new-microsims.py [--screenshots] [--output /tmp/results.json]
Requires Playwright and its Chromium browser. Serves repository docs locally.
"""
import argparse
import functools
import http.server
import json
from pathlib import Path
import re
import threading
from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parents[2]
SIMS = ['healthcare-graph-anatomy-explorer', 'relational-vs-graph-data-model-comparison',
        'graph-sharding-partition-explorer', 'graph-algorithm-family-map',
        'patient-demographics-sdoh-profile', 'behavioral-health-screening-graph-model',
        'post-surgical-care-transition-workflow', 'remote-monitoring-data-flow-graph-model']

class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *_args):
        pass


def check_geometry(frame, height):
    """Check real content, visible controls, and labels against frame bounds."""
    result = frame.evaluate('''() => {
      const main = document.querySelector('main');
      const bad = [...main.querySelectorAll('button,input,select,canvas')]
        .filter(e=>e.getClientRects().length && getComputedStyle(e).visibility!=='hidden')
        .map(e=>({name:e.id||e.tagName, r:e.getBoundingClientRect().toJSON()}))
        .filter(e=>e.r.left < -1 || e.r.right > innerWidth+1 || e.r.bottom > innerHeight+1);
      return {height:Math.ceil(main.getBoundingClientRect().height), width:document.documentElement.scrollWidth, viewport:innerWidth, bad};
    }''')
    assert not result['bad'], result
    assert result['width'] <= result['viewport'] + 1, result
    assert result['height'] <= height, result
    return result['height']


def click_network_node(frame, node):
    xy = frame.evaluate('(id)=>network.canvasToDOM(network.getPositions([id])[id])', node)
    frame.locator('#network canvas').click(position=xy)


def run_actions(frame, sim):
    """Exercise outputs and resets, including boundary values and graph clicks."""
    if sim == SIMS[0]:
        assert frame.evaluate('nodes.length') == 4
        assert frame.evaluate('edges.length') == 3
        click_network_node(frame, 'patient')
        assert 'MRN-48213' in frame.locator('#info').inner_text()
        assert len(frame.evaluate('network.getSelectedEdges()')) == 2
        frame.locator('#inspect').select_option('works')
        assert 'Attending Physician' in frame.locator('#info').inner_text()
        frame.locator('#properties').click()
        assert frame.locator('#properties').get_attribute('aria-pressed') == 'true'
        assert frame.evaluate('showProperties')
        click_network_node(frame, 'provider')
        assert '1234567890' in frame.locator('#info').inner_text()
        frame.locator('#reset').click()
        assert not frame.evaluate('showProperties')
        assert frame.evaluate('network.getSelectedEdges()') == []
    elif sim == SIMS[1]:
        # A real foreign-key cell click must select the matching graph edge.
        cell = frame.evaluate('cellTargets.find(c=>c.id==="works")')
        frame.locator('canvas').click(position={'x':cell['x']+8,'y':cell['y']+12})
        assert frame.evaluate('state.selected') == 'works'
        edge = frame.evaluate('edgeTargets.find(e=>e.id==="diagnosed").label')
        frame.locator('canvas').click(position={'x':edge['x']+edge['w']/2,'y':edge['y']+9})
        assert frame.evaluate('state.selected') == 'diagnosed'
        frame.get_by_role('button', name='Count the Hops').click()
        frame.wait_for_function('state.step === 3', timeout=6000)
        assert frame.evaluate('[state.joins,state.hops]') == [4,3]
        assert frame.evaluate('state.selected') == 'bills'
        assert frame.evaluate('tableData().length') == 6
        frame.get_by_role('button', name='Reset', exact=True).click()
        assert frame.evaluate('[state.joins,state.hops,tableData().length]') == [0,0,5]
        # Reset must also cancel a traversal before its first delayed step.
        frame.get_by_role('button', name='Count the Hops').click()
        frame.get_by_role('button', name='Reset', exact=True).click()
        frame.wait_for_timeout(600)
        assert frame.evaluate('state.step') == 0
    elif sim == SIMS[2]:
        assert frame.evaluate('nodes.length') == 24
        for value, count, text in [(0,21,'0–0'),(8,29,'40–400'),(2,23,'10–100')]:
            frame.locator('#count').fill(str(value))
            assert frame.evaluate('edges.length') == count
            assert text in frame.locator('#cost').inner_text()
        frame.locator('#inspect').select_option('local-0-0')
        assert '~0.01 ms' in frame.locator('#info').inner_text()
        frame.locator('#inspect').select_option('remote-0')
        assert '~5–50 ms' in frame.locator('#info').inner_text()
        frame.locator('#count').fill('8')
        frame.locator('#reset').click()
        assert frame.locator('#count').input_value() == '2'
        assert frame.evaluate('edges.length') == 23
    elif sim == SIMS[3]:
        frame.wait_for_selector('#diagram .node[data-concept="link"]')
        assert frame.locator('#diagram .node').count() == 14
        frame.locator('[data-concept="degree"]').click()
        assert 'n − 1' in frame.locator('#info').inner_text()
        frame.locator('#tour').click()
        frame.wait_for_function('document.querySelectorAll("#diagram .node").length===5')
        frame.locator('[data-concept="grouping"]').focus()
        frame.locator('[data-concept="grouping"]').press('Enter')
        frame.wait_for_selector('[data-concept="clustering"]')
        assert frame.locator('#diagram .node').count() == 8
        frame.locator('[data-concept="clustering"]').focus()
        frame.locator('[data-concept="clustering"]').press('Space')
        assert 'fraction of possible edges' in frame.locator('#info').inner_text()
        frame.locator('#all').click()
        frame.wait_for_function('document.querySelectorAll("#diagram .node").length===14')
    elif sim == 'patient-demographics-sdoh-profile':
        assert frame.evaluate('nodes.length') == 6
        assert frame.evaluate('edges.length') == 3
        click_network_node(frame, 'patient')
        assert frame.evaluate('nodes.get("housing").opacity') < 1
        assert len(frame.evaluate('network.getSelectedEdges()')) == 3
        frame.locator('#inspect').select_option('transport')
        assert 'risk_level: 3' in frame.locator('#info').inner_text()
        frame.locator('#inspect').select_option('housing')
        frame.locator('#connected').check()
        assert frame.evaluate('edges.length') == 4
        frame.locator('#connected').uncheck()
        assert frame.evaluate('edges.length') == 3
        frame.locator('#mapping').click()
        assert frame.locator('#mapping-note').is_visible()
        assert 'Observation' in frame.locator('#mapping-note').inner_text()
        frame.locator('#reset').click()
        assert frame.locator('#mapping-note').is_hidden()
        assert frame.evaluate('edges.length') == 3
    elif sim == 'behavioral-health-screening-graph-model':
        assert frame.evaluate('nodes.length') == 10
        assert frame.evaluate('edges.length') == 9
        frame.locator('#inspect').select_option('node:phq9')
        assert 'score_range' in frame.locator('#info').inner_text()
        frame.locator('#inspect').select_option('edge:screen-phq')
        assert 'POSITIVE' in frame.locator('#info').inner_text()
        frame.locator('#group').click()
        assert frame.locator('#group').get_attribute('aria-pressed') == 'false'
        frame.locator('#reset').click()
        assert frame.locator('#group').get_attribute('aria-pressed') == 'true'
    elif sim == 'post-surgical-care-transition-workflow':
        assert frame.evaluate('nodes.length') == 11
        assert frame.evaluate('edges.length') == 9
        frame.locator('#inspect').select_option('risk')
        assert 'Comorbidity Count: 3' in frame.locator('#info').inner_text()
        frame.locator('#risk-only').click()
        assert frame.evaluate('nodes.get("procedure").opacity') < 1
        assert frame.evaluate('nodes.get("risk").opacity') == 1
        frame.locator('#reset').click()
        assert frame.evaluate('nodes.get("procedure").opacity') == 1
    else:
        assert frame.evaluate('nodes.length') == 11
        assert frame.evaluate('edges.length') == 14
        assert frame.evaluate('currentStage') == 1
        assert frame.evaluate('nodes.get("r1").hidden')
        frame.locator('#next').click()
        assert frame.evaluate('currentStage') == 2
        assert not frame.evaluate('nodes.get("r1").hidden')
        frame.locator('#next').click()
        assert '104 → 108 → 112' in frame.locator('#info').inner_text()
        frame.locator('#next').click()
        frame.locator('#next').click()
        assert frame.evaluate('currentStage') == 5
        assert frame.locator('#inspect option[value="pro"]').count() == 1
        frame.locator('#reset').click()
        frame.locator('#play').click()
        frame.wait_for_timeout(1300)
        assert frame.evaluate('currentStage') == 2
        frame.locator('#play').click()
        frame.locator('#reset').click()
        assert frame.evaluate('currentStage') == 1


def main():
    parser=argparse.ArgumentParser()
    parser.add_argument('--screenshots', action='store_true')
    parser.add_argument('--sim', choices=SIMS)
    parser.add_argument('--output', default='/tmp/healthcare-microsim-results.json')
    args=parser.parse_args()
    server=http.server.ThreadingHTTPServer(('127.0.0.1',0),functools.partial(QuietHandler,directory=str(ROOT/'docs')))
    threading.Thread(target=server.serve_forever,daemon=True).start()
    base=f'http://127.0.0.1:{server.server_port}'
    results=[]
    try:
      with sync_playwright() as pw:
        browser=pw.chromium.launch()
        context=browser.new_context()
        for sim in ([args.sim] if args.sim else SIMS):
          source=ROOT/'docs/sims'/sim/(sim+'.js')
          fallback=int(re.search(r'CANVAS_HEIGHT: (\d+)',source.read_text())[1])
          for width in [400,800,1200]:
            errors=[];page=context.new_page();page.set_viewport_size({'width':width,'height':1600})
            page.on('pageerror',lambda error:errors.append(str(error)))
            page.goto(base+'/index.md')
            page.set_content(f'''<html><head><style>body{{margin:0}}iframe{{display:block;width:100%;box-sizing:border-box;border:2px solid blue}}</style><script src="{base}/js/extra.js"></script></head><body><iframe title="MicroSim" src="{base}/sims/{sim}/main.html" height="{fallback+2}"></iframe></body></html>''')
            frame=page.frames[1]
            frame.wait_for_selector('canvas' if sim != SIMS[3] else '#diagram .node',timeout=20000)
            page.wait_for_timeout(500)
            max_height=check_geometry(frame,fallback)
            run_actions(frame,sim)
            page.wait_for_timeout(250)
            max_height=max(max_height,check_geometry(frame,fallback))
            if sim==SIMS[4]:
                frame.locator('#mapping').click();page.wait_for_timeout(200)
                max_height=max(max_height,check_geometry(frame,fallback))
                frame.locator('#reset').click()
            if sim==SIMS[3]:
                # The longest definition must fit below the diagram on mobile.
                frame.locator('[data-concept="clustering"]').click();page.wait_for_timeout(200)
                max_height=max(max_height,check_geometry(frame,fallback))
            assert not errors,errors
            if args.screenshots:
                frame.goto(base+f'/sims/{sim}/main.html')
                frame.wait_for_selector('canvas' if sim != SIMS[3] else '#diagram .node')
                page.wait_for_timeout(300)
                if width==800:
                    page.locator('iframe').screenshot(path=str(source.with_suffix('.png')))
                elif width==400:
                    page.locator('iframe').screenshot(path=f'/tmp/{sim}-mobile.png')
            results.append({'sim':sim,'width':width,'status':'PASS','max_content_height':max_height,'console_errors':errors})
            print(sim,width,'PASS',f'max height {max_height}',flush=True)
            page.close()
        browser.close()
    finally:
        server.shutdown()
        Path(args.output).write_text(json.dumps(results,indent=2)+'\n')

if __name__=='__main__':
    main()
