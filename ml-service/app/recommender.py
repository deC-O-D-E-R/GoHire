def recommend_jobs(parsed_text: str):
    skills = ["python", "flask", "ml", "react"]
    recommendations = [skill for skill in skills if skill in parsed_text.lower()]
    return recommendations
