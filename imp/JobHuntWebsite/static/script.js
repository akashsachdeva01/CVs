// On page load, restore saved inputs
window.addEventListener('DOMContentLoaded', () => {
    if (localStorage.getItem('savedSkills')) document.getElementById('skills').value = localStorage.getItem('savedSkills');
    if (localStorage.getItem('savedLocation')) document.getElementById('location').value = localStorage.getItem('savedLocation');
    if (localStorage.getItem('savedExperience')) document.getElementById('min-experience').value = localStorage.getItem('savedExperience');
});

document.getElementById('generate-btn').addEventListener('click', async () => {
    const location = document.getElementById('location').value;
    const minExperience = document.getElementById('min-experience').value;
    const skills = document.getElementById('skills').value;
    
    // Save to localStorage
    localStorage.setItem('savedSkills', skills);
    localStorage.setItem('savedLocation', location);
    localStorage.setItem('savedExperience', minExperience);
    
    const btnText = document.getElementById('btn-text');
    const btnIcon = document.getElementById('btn-icon');
    
    // Simple validation
    if(!skills) {
        alert("Please enter some Required Protocols/Skills for matching.");
        return;
    }

    // Loading state
    btnText.innerText = "SCRAPING LIVE LEADS...";
    btnIcon.classList.remove('fa-magnifying-glass');
    btnIcon.classList.add('fa-spinner', 'fa-spin');
    document.getElementById('job-count').classList.add('hidden');
    
    try {
        const response = await fetch('/api/jobs/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                target_role: "",
                location: location,
                min_experience: parseInt(minExperience) || 0,
                skills: skills
            })
        });

        if(!response.ok) {
            throw new Error("Failed to fetch jobs");
        }

        const jobs = await response.json();
        renderJobs(jobs);

    } catch (err) {
        console.error(err);
        alert("An error occurred while generating leads.");
    } finally {
        // Reset loading state
        btnText.innerText = "GENERATE LEAD LIST";
        btnIcon.classList.add('fa-magnifying-glass');
        btnIcon.classList.remove('fa-spinner', 'fa-spin');
    }
});

function renderJobs(jobs) {
    const tbody = document.getElementById('results-body');
    const jobCountElem = document.getElementById('job-count');
    tbody.innerHTML = ''; // Clear existing
    
    if(jobs.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="p-8 text-center text-slate-500">No live jobs found matching your criteria right now. Try broader keywords.</td></tr>`;
        jobCountElem.classList.add('hidden');
        return;
    }

    jobCountElem.innerText = `Found ${jobs.length} live job listings`;
    jobCountElem.classList.remove('hidden');

    jobs.forEach(job => {
        // Determine color based on score
        let scoreColor = "emerald-500";
        let scoreTextColor = "emerald-400";
        if (job.score < 50) {
            scoreColor = "red-500";
            scoreTextColor = "red-400";
        } else if (job.score < 80) {
            scoreColor = "yellow-500";
            scoreTextColor = "yellow-400";
        }

        const matchesText = job.matches.length > 0 ? `Matches: ${job.matches.join(', ')}` : "No direct protocol matches";
        
        let contactHtml = '';
        if(job.is_fallback) {
            contactHtml = `
                <a href="https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(job.fallback_query)}" target="_blank" class="text-blue-400 hover:underline flex items-center">
                    <i class="fa-solid fa-magnifying-glass mr-1 text-slate-500"></i> ${job.hiring_contact}
                </a>
                <div class="text-[10px] text-slate-500 italic mt-1">${job.hiring_contact_title}</div>
            `;
        } else {
            contactHtml = `
                <a href="#" class="text-blue-400 hover:underline flex items-center">
                    <i class="fa-brands fa-linkedin mr-1 text-blue-500"></i> ${job.hiring_contact}
                </a>
                <div class="text-[10px] text-slate-500 mt-1">${job.hiring_contact_title}</div>
            `;
        }

        const tr = document.createElement('tr');
        tr.className = "hover:bg-slate-700/30 transition-colors border-b border-slate-700";
        
        tr.innerHTML = `
            <td class="p-4">
                <div class="font-bold text-slate-300">${job.company}</div>
                <a href="${job.job_url}" target="_blank" class="text-sm font-bold text-blue-400 hover:underline block mt-1">${job.role}</a>
                <div class="text-[10px] text-slate-500 mt-1 flex items-center gap-2">
                    <span><i class="fa-solid fa-location-dot"></i> ${job.location}</span>
                    <span><i class="fa-regular fa-clock"></i> ${job.posted_on}</span>
                </div>
            </td>
            <td class="p-4">
                <div class="flex items-center">
                    <div class="w-16 bg-slate-900 rounded-full h-2 mr-2">
                        <div class="bg-${scoreColor} h-2 rounded-full" style="width: ${job.score}%"></div>
                    </div>
                    <span class="text-${scoreTextColor} font-mono">${job.score}%</span>
                </div>
                <div class="text-[10px] text-slate-500">${matchesText}</div>
            </td>
            <td class="p-4 text-slate-400 leading-relaxed text-xs">
                ${job.mandate_summary}
            </td>
            <td class="p-4">
                ${contactHtml}
            </td>
            <td class="p-4 text-center">
                <a href="${job.job_url}" target="_blank" class="inline-block bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-xs font-bold transition-colors">
                    <i class="fa-solid fa-arrow-up-right-from-square mr-1"></i> APPLY
                </a>
            </td>
        `;
        tbody.appendChild(tr);
    });
}

document.getElementById('linkedin-direct-btn').addEventListener('click', () => {
    const location = document.getElementById('location').value;
    const minExperience = document.getElementById('min-experience').value;
    const skills = document.getElementById('skills').value;
    
    // Save to localStorage
    localStorage.setItem('savedSkills', skills);
    localStorage.setItem('savedLocation', location);
    localStorage.setItem('savedExperience', minExperience);
    
    if(!skills && !location) {
        alert("Please enter some Required Protocols/Skills or Location first.");
        return;
    }
    
    // Construct LinkedIn Search URL natively using OR
    const skillsList = skills.split(',').map(s => s.trim()).filter(s => s);
    const searchQuery = skillsList.length > 0 ? skillsList.join(" OR ") : "";
    
    const queryLoc = encodeURIComponent(location);
    const queryRole = encodeURIComponent(searchQuery);
    
    // Using past week (f_TPR=r604800) and sort by date (sortBy=DD) to match the scraper
    const url = `https://uk.linkedin.com/jobs/search?keywords=${queryRole}&location=${queryLoc}&f_TPR=r604800&sortBy=DD`;
    
    window.open(url, '_blank');
});
