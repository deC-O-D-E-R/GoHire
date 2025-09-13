import os
import joblib
from sentence_transformers import SentenceTransformer
import faiss
import numpy as np

# Initialize the model once when the service starts
model = SentenceTransformer('all-MiniLM-L6-v2')

# Resolve paths relative to this file
BASE_DIR = os.path.dirname(__file__)
MODEL_DIR = os.path.join(BASE_DIR, "model")

jobs_index_path = os.path.join(MODEL_DIR, "jobs.index")
job_data_path = os.path.join(MODEL_DIR, "processed_jobs.pkl")

# Load the FAISS index and the job data
try:
    faiss_index = faiss.read_index(jobs_index_path)
    job_data = joblib.load(job_data_path)
    print("✅ Model artifacts loaded successfully.")
except FileNotFoundError as e:
    print(f"❌ Error loading model files: {e}. Make sure 'jobs.index' and 'processed_job.pkl' are in app/model/.")
    faiss_index = None
    job_data = None

def recommend_jobs(parsed_text: str):
    """
    Recommends jobs based on the parsed resume text.
    """
    if faiss_index is None or job_data is None:
        return {"error": "Recommender service is not ready. Missing model files."}

    # Create an embedding for the parsed resume text
    resume_embedding = model.encode([parsed_text])

    # Use FAISS to find the top 5 most similar jobs
    D, I = faiss_index.search(resume_embedding.astype('float32'), k=5)

    # Get the recommended jobs and their descriptions using the indices
    recommended_jobs = []
    for index in I[0]:
        job_details = job_data.iloc[index]
        recommended_jobs.append({
            "title": job_details["Job Title"],
            "company": job_details["Company"],
            "description": job_details["Job Description"],
            "location": job_details["Location"]
        })

    return recommended_jobs
