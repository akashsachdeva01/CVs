from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List
import scraper
import scoring
import re

app = FastAPI(title="Antigravity Job Intelligence Engine")

class JobSearchRequest(BaseModel):
    target_role: str
    location: str
    min_experience: int
    skills: str
    f_jt: str = ""
    f_e: str = ""
    f_tpr: str = "r604800"

class JobResult(BaseModel):
    company: str
    role: str
    score: int
    matches: List[str]
    mandate_summary: str
    hiring_contact: str
    hiring_contact_title: str
    is_fallback: bool
    fallback_query: str
    job_url: str
    location: str
    posted_on: str

@app.post("/api/jobs/search", response_model=List[JobResult])
def search_jobs(request: JobSearchRequest):
    # Parse skills
    skills_list = [s.strip() for s in request.skills.split(",") if s.strip()]
    
    # Use target_role as primary keyword. If empty, fallback to using skills as keywords
    search_keyword = request.target_role.strip()
    if not search_keyword:
        # Use OR to ensure LinkedIn returns a broad list of jobs matching ANY of the skills
        search_keyword = " OR ".join(skills_list)
        
    # 1. Scrape Jobs (Live)
    raw_jobs = scraper.get_jobs(search_keyword, request.location, request.f_jt, request.f_e, request.f_tpr)
    
    results = []
    
    # 2. Score and format Jobs
    for job in raw_jobs:
        # Score and format Jobs
        score_data = {"score": 100, "matches": []}
        if skills_list:
            score_data = scoring.calculate_score(skills_list, job["job_description"])
        
        # Summarize JD: Extract first 300 chars for a 5-6 line summary
        # Strip excessive newlines and spaces
        clean_desc = re.sub(r'\s+', ' ', job["job_description"]).strip()
        summary = clean_desc[:300] + "..." if len(clean_desc) > 300 else clean_desc
        
        results.append(JobResult(
            company=job["company"],
            role=job["role"],
            score=score_data["score"],
            matches=score_data["matches"],
            mandate_summary=summary,
            hiring_contact=job["job_poster"],
            hiring_contact_title=job["job_poster_title"],
            is_fallback=job["is_fallback"],
            fallback_query=job.get("job_poster_fallback", ""),
            job_url=job.get("job_url", "#"),
            location=job.get("location", "Unknown Location"),
            posted_on=job.get("posted_on", "Recently")
        ))
        
    def parse_time_ago(time_str):
        time_str = time_str.lower()
        try:
            val = int(time_str.split()[0])
        except:
            val = 0
            
        if "minute" in time_str: return val * 60
        elif "hour" in time_str: return val * 3600
        elif "day" in time_str: return val * 86400
        elif "week" in time_str: return val * 604800
        elif "month" in time_str: return val * 2592000
        return 0
        
    # Sort by time ascending (smallest time ago = most recent = top)
    results.sort(key=lambda x: parse_time_ago(x.posted_on))
    return results

# Mount static files
app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
def read_index():
    return FileResponse("static/index.html")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
