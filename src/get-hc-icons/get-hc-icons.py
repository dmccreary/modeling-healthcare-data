import os
import re
import shutil
import zipfile
from io import BytesIO

import requests

# -------------- CONFIG --------------

ICON_ZIP_URL = "https://healthicons.org/icons.zip"

# Your 100 targets (same list as above)
TARGET_NAMES = [
    "regular-patient",
    "person",
    "doctor",
    "person-male-doctor",
    "person-female-doctor",
    "person-nurse",
    "community-healthcare-worker",
    "pharmacy",
    "medicines",
    "pill-1",
    "pill-2",
    "prescription",
    "syringe",
    "syringe-vaccine",
    "intravenous-bag",
    "intravenous-drip",
    "stethoscope",
    "blood-pressure-monitor",
    "thermometer-digital",
    "pulse-oximeter",
    "glucometer",
    "sonogram",
    "ct-scan",
    "x-ray",
    "radiology",
    "biochemistry-lab",
    "microscope",
    "test-tube",
    "urine-sample",
    "medical-records",
    "clinical-document",
    "clinical-record",
    "fhir",
    "hospital",
    "clinic",
    "field-hospital",
    "rural-clinic",
    "admissions",
    "discharge",
    "outpatient",
    "emergency-operations-center",
    "intensive-care-unit",
    "critical-care",
    "surgical-department",
    "cardiology",
    "pediatrics",
    "pharmacy-dept",
    "insurance-card",
    "finance",
    "coins",
    "credit-card",
    "money-bag",
    "money-bills",
    "ministry-of-health",
    "spreadsheet",
    "calendar-schedule",
    "database",
    "exam",
    "symptoms",
    "fever",
    "coughing",
    "headache",
    "nausea",
    "vomiting",
    "pain",
    "diarrhea",
    "allergies",
    "pneumonia",
    "tuberculosis",
    "nursing-mother",
    "pregnant",
    "elderly-man",
    "elderly-woman",
    "child-1-5-years",
    "patient-band",
    "patient-band-alt",
    "health-worker-form",
    "insurance-card-alt",
    "medical-book",
    "pharmacy-alt",
    "icu-alt",
    "ventilator",
    "oxygen-tank",
    "wheelchair",
    "ambulance",
    "ministry-of-health-alt",
    "hospital-bed",
    "hospital-bed-alt",
    "hospital-bed-timer",
    "calendar",
    "phone",
    "desktop-app",
    "laptop",
    "training",
    "group",
    "group-discussion",
    "speech-language-therapy",
    "psychology",
    "social-work",
    "sonography",
]

OUTPUT_DIR = "hc-icons"

# -------------- HELPERS --------------

def normalize(s: str) -> str:
    """lowercase and remove all non alphanumerics so we can fuzzy match"""
    return re.sub(r"[^a-z0-9]", "", s.lower())

target_norms = [normalize(name) for name in TARGET_NAMES]

# -------------- DOWNLOAD --------------

print("Downloading icons.zip ...")
resp = requests.get(ICON_ZIP_URL, timeout=60)
resp.raise_for_status()

# -------------- EXTRACT & FILTER --------------

if not os.path.exists(OUTPUT_DIR):
    os.makedirs(OUTPUT_DIR, exist_ok=True)

with zipfile.ZipFile(BytesIO(resp.content)) as zf:
    extracted_count = 0
    for member in zf.infolist():
        # we only care about SVGs
        if not member.filename.lower().endswith(".svg"):
            continue

        norm_path = normalize(member.filename)

        # see if any of our target names appears in the normalized zip path
        if any(t in norm_path for t in target_norms):
            # copy it into hc-icons preserving just the filename
            filename_only = os.path.basename(member.filename)
            dest_path = os.path.join(OUTPUT_DIR, filename_only)

            with zf.open(member) as src, open(dest_path, "wb") as dst:
                shutil.copyfileobj(src, dst)
            extracted_count += 1
            print(f"Saved {filename_only}")

print(f"Done. Saved {extracted_count} SVG icons into ./{OUTPUT_DIR}")

