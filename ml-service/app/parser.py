import requests
from pdfminer.high_level import extract_text as extract_pdf_text
import docx2txt
import os

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
    return {"text": text, "method": method}
