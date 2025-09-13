from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
from app.parser import parse_resume
from app.recommender import recommend_jobs

router = APIRouter()

# You can keep this route if you want to support direct file parsing as well
@router.post("/parse-resume")
async def parse_resume_route(file: UploadFile = File(...)):
    contents = await file.read()
    result = parse_resume(contents, file.filename)
    return {
        "parsed_text": result["text"],
        "parsed_by": result["method"]
    }


@router.post("/recommend")
async def recommend_from_file_route(file: UploadFile = File(...)):
    # Read the file content
    contents = await file.read()

    # Step 1: Parse the file to get the resume text
    parsed_result = parse_resume(contents, file.filename)
    parsed_text = parsed_result["text"]

    # Step 2: Use the parsed text to get job recommendations
    recommendations = recommend_jobs(parsed_text)

    # Return the recommendations
    return {"recommendations": recommendations}
