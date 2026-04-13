const mockJobs = [
  {
    id: 1,
    title: "Software Engineering Intern",
    company: "QuantumFlow Tech",
    type: "internship",
    setup: "remote",
    duration: "3mo",
    salary: "$4,500/mo",
    tags: ["React", "Node.js", "Summer 2026"],
    logo: "img/company.png",
    urgent: true
  },
  {
    id: 2,
    title: "Junior Frontend Developer",
    company: "PixelPerfect Studios",
    type: "full-time",
    setup: "hybrid",
    duration: "",
    salary: "$85,000/yr",
    tags: ["CSS", "Vue", "Figma", "Entry Level"],
    logo: "img/company.png"
  },
  {
    id: 3,
    title: "Data Science Co-op",
    company: "Nexus Analytics",
    type: "internship",
    setup: "onsite",
    duration: "6mo",
    salary: "$5,200/mo",
    tags: ["Python", "SQL", "Pandas", "Fall 2026"],
    logo: "img/company.png"
  },
  {
    id: 4,
    title: "Cloud Infrastructure Intern",
    company: "CloudSphere",
    type: "internship",
    setup: "remote",
    duration: "3mo",
    salary: "$6,000/mo",
    tags: ["AWS", "Docker", "DevOps"],
    logo: "img/company.png",
    urgent: true
  },
  {
    id: 5,
    title: "UX/UI Design Intern",
    company: "Creativio",
    type: "internship",
    setup: "hybrid",
    duration: "3mo",
    salary: "$3,800/mo",
    tags: ["Figma", "Prototyping", "User Research"],
    logo: "img/company.png"
  },
  {
    id: 6,
    title: "Backend Engineer I",
    company: "ServerLogic",
    type: "full-time",
    setup: "remote",
    duration: "",
    salary: "$110,000/yr",
    tags: ["Go", "PostgreSQL", "Microservices"],
    logo: "img/company.png"
  }
];

document.addEventListener('DOMContentLoaded', () => {
  const jobContainer = document.getElementById('job-container');
  const jobCount = document.getElementById('job-count');
  const searchInput = document.getElementById('search-input');
  
  if (!jobContainer) return; // Not on the index page

  // Filters
  const typeFilters = Array.from(document.querySelectorAll('.filter-type'));
  const setupFilters = Array.from(document.querySelectorAll('.filter-setup'));
  const durationFilters = Array.from(document.querySelectorAll('.filter-duration'));

  function renderJobs(jobsToRender) {
    jobContainer.innerHTML = '';
    
    if (jobsToRender.length === 0) {
      jobContainer.innerHTML = `<p style="grid-column: 1/-1; color: var(--text-muted); text-align: center; padding: 3rem;">No jobs found matching your criteria. Try adjusting your filters.</p>`;
      jobCount.textContent = `0 Jobs Available`;
      return;
    }

    jobCount.textContent = `${jobsToRender.length} Job${jobsToRender.length > 1 ? 's' : ''} Available`;

    jobsToRender.forEach((job, index) => {
      const card = document.createElement('div');
      card.className = 'job-card';
      // stagger animation slightly
      card.style.animationDelay = `${index * 0.05}s`;

      const tagsHTML = job.tags.map(tag => {
        return `<span class="tag ${job.urgent && tag.includes('2026') ? 'highlight' : ''}">${tag}</span>`;
      }).join('');

      card.innerHTML = `
        <div class="job-header">
          <img src="${job.logo}" alt="${job.company} Logo" class="company-logo">
          <div>
            <h3 class="job-title">${job.title}</h3>
            <div class="company-name">
               <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
               ${job.company} • ${job.setup.charAt(0).toUpperCase() + job.setup.slice(1)}
            </div>
          </div>
        </div>
        <div class="job-tags">
          <span class="tag" style="background: rgba(139, 92, 246, 0.1); color: #c4b5fd;">${job.type === 'full-time' ? 'Full-Time' : 'Internship'}</span>
          ${tagsHTML}
        </div>
        <div class="job-footer">
          <div class="job-salary">
            ${job.salary}
            ${job.duration ? `<span style="font-size:0.8rem; font-weight:400; color:var(--text-muted); display:block;">(${job.duration})</span>` : ''}
          </div>
          <button class="btn-apply" data-id="${job.id}">Apply Now</button>
        </div>
      `;
      jobContainer.appendChild(card);
    });

    attachApplyListeners();
  }

  function attachApplyListeners() {
    const applyButtons = document.querySelectorAll('.btn-apply');
    applyButtons.forEach(btn => {
      btn.addEventListener('click', function() {
        if (!this.classList.contains('applied')) {
          this.classList.add('applied');
          this.innerHTML = '<svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24" style="vertical-align: text-bottom; margin-right: 4px;"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg> Applied!';
        }
      });
    });
  }

  function filterJobs() {
    const searchTerm = searchInput.value.toLowerCase();
    
    // Get active filter values
    const activeTypes = typeFilters.filter(cb => cb.checked).map(cb => cb.value);
    const activeSetups = setupFilters.filter(cb => cb.checked).map(cb => cb.value);
    const activeDurations = durationFilters.filter(cb => cb.checked).map(cb => cb.value);

    const filtered = mockJobs.filter(job => {
      // Search text match
      const textMatch = job.title.toLowerCase().includes(searchTerm) || job.company.toLowerCase().includes(searchTerm) || job.tags.some(t => t.toLowerCase().includes(searchTerm));
      
      // Checkbox matches (if none checked, consider it passing that filter)
      const typeMatch = activeTypes.length === 0 || activeTypes.includes(job.type);
      const setupMatch = activeSetups.length === 0 || activeSetups.includes(job.setup);
      const durationMatch = activeDurations.length === 0 || activeDurations.includes(job.duration);

      return textMatch && typeMatch && setupMatch && durationMatch;
    });

    renderJobs(filtered);
  }

  // Event Listeners for Filters
  searchInput.addEventListener('input', filterJobs);
  [...typeFilters, ...setupFilters, ...durationFilters].forEach(cb => {
    cb.addEventListener('change', filterJobs);
  });

  // Initial render
  renderJobs(mockJobs);
});
