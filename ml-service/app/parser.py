import requests
from pdfminer.high_level import extract_text as extract_pdf_text
import docx2txt
import os
import re

def extract_text_from_pdf(file_path):
    try:
        text = extract_pdf_text(file_path)
        return text.strip() or "No text found in PDF."
    except Exception as e:
        return f"PDF extraction error: {str(e)}"

def extract_text_from_docx(file_path):
    try:
        text = docx2txt.process(file_path)
        return text.strip() or "No text found in DOCX."
    except Exception as e:
        return f"DOCX extraction error: {str(e)}"

def extract_text_with_ocr(file: bytes, filename: str):
    url = 'https://api.ocr.space/parse/image'
    api_key = 'K85238450888957'

    response = requests.post(
        url,
        files={'file': (filename, file)},
        data={'apikey': api_key, 'language': 'eng'}
    )

    result = response.json()
    if result.get('IsErroredOnProcessing'):
        return 'Error in OCR processing.'

    return result['ParsedResults'][0]['ParsedText']

def parse_resume(file, filename=None):
    extension = os.path.splitext(filename)[1].lower() if filename else ".pdf"
    temp_path = f"temp_{filename}"

    with open(temp_path, "wb") as f:
        f.write(file)

    if extension == ".pdf":
        text = extract_text_from_pdf(temp_path)
        method = "pdfminer"
    elif extension == ".docx":
        text = extract_text_from_docx(temp_path)
        method = "docx2txt"
    else:
        with open(temp_path, "rb") as f:
            text = extract_text_with_ocr(f.read(), filename)
        method = "ocr_space"

    os.remove(temp_path)
    structured_data = process_parsed_text(text)

    return {"text": text, "method": method, "structured": structured_data}


def process_parsed_text(text):
    structured = {}

    lines = text.splitlines()
    lines = [line.strip() for line in lines if line.strip()]

    structured['name'] = lines[0] if lines else ""

    contact_section = ' '.join(lines[:10])
    email_match = re.search(r'[\w\.-]+@[\w\.-]+', contact_section)
    phone_match = re.search(r'(\+?\d[\d\s\-]{8,}\d)', contact_section)

    structured['email'] = email_match.group(0) if email_match else ""
    structured['phone'] = phone_match.group(0) if phone_match else ""

    structured['linkedin'] = ""
    structured['github'] = ""
    structured['portfolio'] = ""

    for line in lines:
        if not structured['linkedin']:
            match = re.search(r'(https?://[^\s]+)', line)
            if match and "linkedin.com" in match.group(0).lower():
                structured['linkedin'] = match.group(0)
        if not structured['github']:
            match = re.search(r'(https?://[^\s]+)', line)
            if match and "github.com" in match.group(0).lower():
                structured['github'] = match.group(0)
        if not structured['portfolio']:
            match = re.search(r'(https?://[^\s]+)', line)
            if match:
                url = match.group(0).lower()
                if "vercel" in url or "portfolio" in url:
                    structured['portfolio'] = match.group(0)

    def extract_section(start_keywords, stop_keywords):
        capturing = False
        content = []
        for line in lines:
            if any(kw.lower() in line.lower() for kw in start_keywords):
                capturing = True
                continue
            if capturing and any(kw.lower() in line.lower() for kw in stop_keywords):
                break
            if capturing:
                content.append(line)
        return "\n".join(content).strip()

    structured['education'] = extract_section(["EDUCATION"], ["SKILLS", "EXPERIENCE", "CERTIFICATIONS"])

    raw_skills = extract_section(["SKILLS"], ["EXPERIENCE", "PROJECTS", "CERTIFICATIONS", "HACKATHONS"])
    skill_sections = {}
    for line in raw_skills.split("\n"):
        if ":" in line:
            category, values = line.split(":", 1)
            skill_list = [skill.strip() for skill in values.split(",") if skill.strip()]
            if skill_list:
                skill_sections[category.strip()] = skill_list
    structured['skills'] = skill_sections

    structured['experience'] = extract_section(["EXPERIENCE"], ["PROJECTS", "CERTIFICATIONS", "HACKATHONS", "VOLUNTEER"])

    raw_projects = extract_section(["PROJECTS"], ["HACKATHONS", "CERTIFICATIONS", "VOLUNTEER"])
    project_lines = []
    for line in raw_projects.split("\n"):
        clean_line = line.replace("", "").replace("•", "").strip()
        if len(clean_line) > 4 and not clean_line.lower().startswith("project link"):
            project_lines.append(clean_line)
    structured['projects'] = project_lines

    structured['hackathons'] = extract_section(["HACKATHONS"], ["CERTIFICATIONS", "VOLUNTEER", "LANGUAGES"])
    structured['volunteer'] = extract_section(["VOLUNTEER"], ["CERTIFICATIONS", "LANGUAGES", "AWARDS", "INTERESTS"])
    structured['certifications'] = extract_section(["CERTIFICATIONS"], ["AWARDS", "LANGUAGES", "INTERESTS"])
    structured['awards'] = extract_section(["AWARDS"], ["LANGUAGES", "INTERESTS"])

    lang = extract_section(["LANGUAGES"], ["INTERESTS", "EXPERIENCE", "VOLUNTEER"])
    structured['languages'] = lang if len(lang.split()) < 50 else ""

    structured['interests'] = extract_section(["INTERESTS"], [])

    structured = {
        k: v for k, v in structured.items()
        if v not in ("", [], {}) and not (isinstance(v, dict) and len(v) == 0)
    }

    return structured
