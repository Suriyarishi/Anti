// Chart Configuration - Hunt Property Theme

document.addEventListener('DOMContentLoaded', () => {
    initPropertyByStateChart();
    initProjectByStateChart();
    initProjectByBuilderChart();
    initLeadsEnquiryChart();
});

function initPropertyByStateChart() {
    const ctx = document.getElementById('propertyStateChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Delhi', 'Haryana', 'Himachal', 'Jammu', 'Karnataka'],
            datasets: [{
                label: 'Property',
                data: [147, 138, 150, 42, 67],
                backgroundColor: '#D3122A',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: '#f0f0f0' } },
                x: { grid: { display: false } }
            }
        }
    });
}

function initProjectByStateChart() {
    const ctx = document.getElementById('projectStateChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Delhi', 'Haryana', 'Himachal', 'Jammu', 'Karnataka'],
            datasets: [{
                label: 'Projects',
                data: [42, 67, 85, 30, 48],
                backgroundColor: '#1DA152',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: '#f0f0f0' } },
                x: { grid: { display: false } }
            }
        }
    });
}

function initProjectByBuilderChart() {
    const ctx = document.getElementById('builderChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Ajnara', 'Supertech', 'Godrej', 'DLF', 'Tata'],
            datasets: [{
                label: 'By Builder',
                data: [420, 280, 150, 310, 240],
                backgroundColor: '#D3122A',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: '#f0f0f0' } },
                x: { grid: { display: false } }
            }
        }
    });
}

function initLeadsEnquiryChart() {
    const ctx = document.getElementById('leadsEnquiryChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Properties', 'Leads', 'Enquiry', 'Users'],
            datasets: [{
                data: [988, 303, 128, 303],
                backgroundColor: '#D3122A',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false } },
            scales: {
                y: { beginAtZero: true, grid: { color: '#f0f0f0' } },
                x: { grid: { display: false } }
            }
        }
    });
}
