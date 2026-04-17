import requests
from bs4 import BeautifulSoup
import urllib.parse

def test_scrape():
    url = "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search"
    params = {
        "keywords": "Network Engineer",
        "location": "London",
        "start": 0
    }
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
    }
    
    response = requests.get(url, params=params, headers=headers)
    print("Status:", response.status_code)
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'lxml')
        jobs = soup.find_all('li')
        print(f"Found {len(jobs)} jobs in page 1")
        
        for i, job in enumerate(jobs[:2]):
            title_elem = job.find('h3', class_='base-search-card__title')
            company_elem = job.find('h4', class_='base-search-card__subtitle')
            link_elem = job.find('a', class_='base-card__full-link')
            
            title = title_elem.text.strip() if title_elem else "N/A"
            company = company_elem.text.strip() if company_elem else "N/A"
            link = link_elem['href'] if link_elem and 'href' in link_elem.attrs else "N/A"
            
            print(f"[{i+1}] {title} at {company}")
            print(f"Link: {link}")

if __name__ == "__main__":
    test_scrape()
