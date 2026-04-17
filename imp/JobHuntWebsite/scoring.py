import re

def calculate_score(skills_provided: list[str], job_description: str) -> dict:
    """
    Calculates the match score between provided skills and job description.
    All skills are weighted equally (1.0).
    """
    if not skills_provided:
        return {"score": 0, "matches": []}
    
    total_weight = 0.0
    achieved_weight = 0.0
    matches = []
    
    jd_lower = job_description.lower()
    
    for skill in skills_provided:
        skill_clean = skill.strip()
        if not skill_clean:
            continue
            
        weight = 1.0
        total_weight += weight
        
        # Simple string match or regex match. For better accuracy, use word boundaries.
        # Handle cases like "c++" escaping properly.
        escaped_skill = re.escape(skill_clean.lower())
        pattern = r'\b' + escaped_skill + r'\b'
        
        if re.search(pattern, jd_lower) or skill_clean.lower() in jd_lower:
            # Fallback to simple `in` if boundary search misses hyphenated stuff etc
            achieved_weight += weight
            matches.append(skill_clean)
            
    if total_weight == 0:
        score = 0
    else:
        score = int((achieved_weight / total_weight) * 100)
        
    return {
        "score": min(100, score),
        "matches": matches
    }
