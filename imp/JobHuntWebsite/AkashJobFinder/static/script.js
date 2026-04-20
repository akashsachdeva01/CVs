document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Handle Role Buttons (Single Select)
    const roleBtns = document.querySelectorAll('.role-btn');
    roleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            // Deselect all
            roleBtns.forEach(b => b.classList.remove('role-btn-active'));
            // Select current
            e.target.classList.add('role-btn-active');
        });
    });

    // Default select the first high priority role
    if(roleBtns.length > 0) roleBtns[0].classList.add('role-btn-active');

    // 2. Handle Company Chips (Multi Select)
    const compChips = document.querySelectorAll('.comp-chip');
    compChips.forEach(chip => {
        chip.addEventListener('click', (e) => {
            e.target.classList.toggle('chip-active');
        });
    });

    // 3. Handle Generate Button
    const generateBtn = document.getElementById('generate-btn');
    generateBtn.addEventListener('click', async () => {
        const btnText = document.getElementById('btn-text');
        const btnIcon = document.getElementById('btn-icon');
        const tbody = document.getElementById('results-body');
        const jobCountElem = document.getElementById('job-count');
        
        // Gather Location
        const locRadios = document.getElementsByName('loc');
        let selectedLoc = "United Kingdom";
        for (const radio of locRadios) {
            if (radio.checked) selectedLoc = radio.value;
        }

        // Gather Role
        let activeRoleStr = "";
        const activeRoleBtn = document.querySelector('.role-btn-active');
        if (activeRoleBtn) {
            activeRoleStr = activeRoleBtn.getAttribute('data-val');
        }

        // Gather Companies
        let selectedComps = [];
        const activeChips = document.querySelectorAll('.chip-active');
        activeChips.forEach(chip => {
            selectedComps.push(chip.getAttribute('data-val'));
        });

        // Combine Role + Companies into the main keyword string
        let finalKeywords = activeRoleStr;
        if (selectedComps.length > 0) {
            // LinkedIn allows grouping: "IP Test Engineer" (Nokia OR Ericsson)
            finalKeywords += " (" + selectedComps.join(" OR ") + ")";
        }

        // Gather Job Filters
        let jtVals = [];
        if (document.getElementById('chk-ft').checked) jtVals.push(document.getElementById('chk-ft').value);
        if (document.getElementById('chk-ct').checked) jtVals.push(document.getElementById('chk-ct').value);
        const f_jt = jtVals.join(",");

        let eVals = [];
        if (document.getElementById('chk-e4').checked) eVals.push(document.getElementById('chk-e4').value);
        if (document.getElementById('chk-e5').checked) eVals.push(document.getElementById('chk-e5').value);
        const f_e = eVals.join(",");

        const f_tpr = document.getElementById('date-posted').value;

        // UI Loading State
        btnText.innerText = "EXECUTING AI SEARCH...";
        btnIcon.classList.remove('fa-radar');
        btnIcon.classList.add('fa-spinner', 'fa-spin');
        jobCountElem.classList.add('hidden');
        tbody.innerHTML = `<tr><td colspan="4" class="p-8 text-center text-slate-400">Scraping LinkedIn native results... this may take a moment.</td></tr>`;

        try {
            const response = await fetch('/api/jobs/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    target_role: finalKeywords,
                    location: selectedLoc,
                    min_experience: 0,
                    skills: "", // Unused in this custom UI, the payload is in target_role
                    f_jt: f_jt,
                    f_e: f_e,
                    f_tpr: f_tpr
                })
            });
            
            if (!response.ok) throw new Error("Server error");
            const jobs = await response.json();
            
            tbody.innerHTML = ''; // Clear existing
            
            if(jobs.length === 0) {
                tbody.innerHTML = `<tr><td colspan="4" class="p-8 text-center text-slate-500">No live jobs found matching these exact filters. Try broadening the search.</td></tr>`;
                return;
            }

            jobCountElem.innerText = `Found ${jobs.length} exact matches for Akash's Profile`;
            jobCountElem.classList.remove('hidden');

            jobs.forEach(job => {
                let contactHTML = job.job_poster ? 
                    `<div class="font-semibold text-slate-300">${job.job_poster}</div><div class="text-[10px] text-slate-500 truncate" title="${job.job_poster_title}">${job.job_poster_title}</div>` :
                    `<a href="https://www.linkedin.com/search/results/people/?keywords=${encodeURIComponent(job.fallback_query)}" target="_blank" class="text-blue-400 hover:underline"><i class="fa-solid fa-magnifying-glass"></i> Find Recruiter</a>`;

                const tr = document.createElement('tr');
                tr.className = 'border-b border-slate-700/50 hover:bg-slate-700/30 transition-colors';
                
                tr.innerHTML = `
                    <td class="p-4">
                        <div class="font-bold text-slate-300">${job.company}</div>
                        <a href="${job.job_url}" target="_blank" class="text-sm font-bold text-blue-400 hover:underline block mt-1">${job.role}</a>
                        <div class="text-[10px] text-slate-500 mt-1 flex items-center gap-2">
                            <span><i class="fa-solid fa-location-dot"></i> ${job.location}</span>
                            <span><i class="fa-regular fa-clock"></i> ${job.posted_on}</span>
                        </div>
                    </td>
                    <td class="p-4 text-slate-400 leading-relaxed text-xs">
                        ${job.mandate_summary}
                    </td>
                    <td class="p-4">
                        ${contactHTML}
                    </td>
                    <td class="p-4 text-center">
                        <a href="${job.job_url}" target="_blank" class="inline-block bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded text-xs font-bold transition-colors">
                            <i class="fa-solid fa-arrow-up-right-from-square mr-1"></i> APPLY
                        </a>
                    </td>
                `;
                tbody.appendChild(tr);
            });

        } catch(err) {
            console.error(err);
            tbody.innerHTML = `<tr><td colspan="4" class="p-8 text-center text-red-500">Error fetching jobs. Check backend.</td></tr>`;
        } finally {
            btnText.innerText = "SCRAPE LINKEDIN NOW";
            btnIcon.classList.remove('fa-spinner', 'fa-spin');
            btnIcon.classList.add('fa-radar');
        }
    });

});
