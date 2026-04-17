import requests
from bs4 import BeautifulSoup
import urllib.parse
import re

def test_google_scrape():
    query = 'site:linkedin.com/jobs/view "Network Engineer" "London"'
    url = f"https://html.duckduckgo.com/html/?q={urllib.parse.quote(query)}"
    
    headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36"
    }
    
    response = requests.get(url, headers=headers)
    print("Status:", response.status_code)
    
    if response.status_code == 200:
        soup = BeautifulSoup(response.text, 'lxml')
        results = soup.find_all('a', class_='result__url')
        
        for i, a in enumerate(results[:5]):
            link = a.get('href')
            print(f"[{i+1}] {link}")
            
            # Extract job ID
            # e.g. https://uk.linkedin.com/jobs/view/network-engineer-at-company-31231231
            match = re.search(r'-(\d{9,10})\b', link)
            if match:
                job_id = match.group(1)
                print("Job ID:", job_id)

if __name__ == "__main__":
    test_google_scrape()
