import requests
from bs4 import BeautifulSoup
import urllib.parse
import time
import random

def get_jobs(target_role: str, location: str):
    """
    Scrape live LinkedIn jobs directly using the public jobs search endpoint.
    """
    query_role = urllib.parse.quote(target_role)
    query_loc = urllib.parse.quote(location)
    
    # f_TPR=r604800 filters for the past week. sortBy=DD sorts by most recent.
    search_url = f"https://uk.linkedin.com/jobs/search?keywords={query_role}&location={query_loc}&f_TPR=r604800&sortBy=DD"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36",
        "Accept-Language": "en-US,en;q=0.9"
    }

    job_urls = []
    
    try:
        response = requests.get(search_url, headers=headers, timeout=10)
        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'lxml')
            links = soup.find_all('a', class_='base-card__full-link')
            for link in links:
                if 'href' in link.attrs:
                    job_urls.append(link['href'])
    except Exception as e:
        print("Error fetching LinkedIn search:", e)
        return []
        
    # Remove the limit to process all jobs found on the page
    job_urls = list(dict.fromkeys(job_urls))
    jobs = []
    
    # 2. Fetch each LinkedIn Job directly
    for job_url in job_urls:
        try:
            job_resp = requests.get(job_url, headers=headers, timeout=10)
            if job_resp.status_code == 200:
                job_soup = BeautifulSoup(job_resp.text, 'lxml')
                
                # Extract details
                title_elem = job_soup.find('h1', class_='top-card-layout__title')
                company_elem = job_soup.find('a', class_='topcard__org-name-link')
                desc_elem = job_soup.find('div', class_='description__text')
                poster_elem = job_soup.find('h3', class_='base-main-card__title') # Hiring manager if present
                poster_title_elem = job_soup.find('h4', class_='base-main-card__subtitle')
                loc_elem = job_soup.find('span', class_='topcard__flavor topcard__flavor--bullet')
                time_elem = job_soup.find('span', class_='posted-time-ago__text')

                title = title_elem.text.strip() if title_elem else target_role
                company = company_elem.text.strip() if company_elem else "Unknown Company"
                desc = desc_elem.text.strip() if desc_elem else ""
                
                job_loc = loc_elem.text.strip() if loc_elem else location
                posted_time = time_elem.text.strip() if time_elem else "Recently"
                
                poster = poster_elem.text.strip() if poster_elem else ""
                poster_title = poster_title_elem.text.strip() if poster_title_elem else ""
                
                if not desc:
                    continue # Skip if no description
                    
                job_data = {
                    "company": company,
                    "role": title,
                    "job_description": desc,
                    "job_poster": poster,
                    "job_poster_title": poster_title,
                    "job_url": job_url,
                    "location": job_loc,
                    "posted_on": posted_time
                }
                
                # Fallback logic
                if not job_data.get("job_poster"):
                    job_data["job_poster_fallback"] = f"Technical Recruiter {company}"
                    job_data["job_poster"] = "Unknown (Fallback)"
                    job_data["job_poster_title"] = f"Search: {job_data['job_poster_fallback']}"
                    job_data["is_fallback"] = True
                else:
                    job_data["is_fallback"] = False
                    
                jobs.append(job_data)
                
            time.sleep(random.uniform(0.1, 0.4)) # Polite delay but fast enough for 50 jobs
        except Exception as e:
            print("Error parsing LinkedIn job:", e)
            continue
            
    return jobs
