from fastapi import APIRouter, UploadFile, File
from pydantic import BaseModel
from app.parser import parse_resume
from app.recommender import recommend_jobs

router = APIRouter()

class RecommendationRequest(BaseModel):
    parsed_text: str

@router.post("/parse-resume")
async def parse_resume_route(file: UploadFile = File(...)):
    contents = await file.read()
    result = parse_resume(contents, file.filename)
    return {
        "parsed_text": result["text"],
        "parsed_by": result["method"]
    }

@router.post("/recommend")
async def recommend_route(request: RecommendationRequest):
    recommendations = recommend_jobs(request.parsed_text)
    return {"recommendations": recommendations}
