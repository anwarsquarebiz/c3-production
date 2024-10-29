// app.js

const JOBS_KEY = 'jobs';

document.addEventListener('DOMContentLoaded', function() {
    loadJobs();

    const jobForm = document.getElementById('jobForm');
    jobForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const jobTitle = document.getElementById('jobTitle').value;
        const jobLocation = document.getElementById('jobLocation').value;
        const jobSalary = document.getElementById('jobSalary').value;
        const jobExperience = document.getElementById('jobExperience').value;

        addJob({ title: jobTitle, location: jobLocation, salary: jobSalary, experience: jobExperience });
        jobForm.reset();
    });
});

function loadJobs() {
    const jobs = JSON.parse(localStorage.getItem(JOBS_KEY)) || [];
    displayJobs(jobs);
}

function displayJobs(jobs) {
    const jobList = document.getElementById('jobList');
    jobList.innerHTML = '';

    jobs.forEach(job => {
        const jobDiv = document.createElement('div');
        jobDiv.className = 'job-item';
        jobDiv.innerHTML = `
            <div>
                <h3>${job.title}</h3>
                <p>Location: ${job.location}</p>
                <p>Salary: ${job.salary}</p>
                <p>Experience: ${job.experience}</p>
                <button onclick="editJob(${job.id})">Edit</button>
                <button onclick="deleteJob(${job.id})">Delete</button>
            </div>
        `;
        jobList.appendChild(jobDiv);
    });
}

function addJob(job) {
    const jobs = JSON.parse(localStorage.getItem(JOBS_KEY)) || [];
    job.id = jobs.length ? jobs[jobs.length - 1].id + 1 : 1; // Assign an ID
    jobs.push(job);
    localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
    displayJobs(jobs);
}

function editJob(id) {
    const jobs = JSON.parse(localStorage.getItem(JOBS_KEY)) || [];
    const job = jobs.find(job => job.id === id);
    if (job) {
        document.getElementById('jobTitle').value = job.title;
        document.getElementById('jobLocation').value = job.location;
        document.getElementById('jobSalary').value = job.salary;
        document.getElementById('jobExperience').value = job.experience;

        // Remove the job from storage for editing
        deleteJob(id);
    }
}

function deleteJob(id) {
    let jobs = JSON.parse(localStorage.getItem(JOBS_KEY)) || [];
    jobs = jobs.filter(job => job.id !== id);
    localStorage.setItem(JOBS_KEY, JSON.stringify(jobs));
    displayJobs(jobs);
}
