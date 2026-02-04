// Chart Configuration - Hunt Property Theme
// Using Chart.js with premium SaaS aesthetics

document.addEventListener('DOMContentLoaded', () => {
    // Shared chart options for consistency
    const sharedOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false
            },
            tooltip: {
                backgroundColor: '#1A1A1A',
                titleColor: '#FFFFFF',
                bodyColor: '#FFFFFF',
                padding: 12,
                cornerRadius: 8,
                displayColors: false
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#F0F0F0',
                    drawBorder: false
                },
                ticks: {
                    font: { size: 10 },
                    color: '#9A9A9A'
                }
            },
            x: {
                grid: {
                    display: false,
                    drawBorder: false
                },
                ticks: {
                    font: { size: 10 },
                    color: '#9A9A9A'
                }
            }
        }
    };

    // 1. Inquiry Analytics (Bar)
    initLeadsEnquiryChart(sharedOptions);

    // 2. Property Density by State (Horizontal Bar)
    initPropertyByStateChart(sharedOptions);

    // 3. Project Growth by State (Horizontal Bar)
    initProjectByStateChart(sharedOptions);

    // 4. Builder Performance Index (Horizontal Bar)
    initProjectByBuilderChart(sharedOptions);

    // 5. Project Type Distribution (Doughnut)
    initProjectTypeChart();

    // 6. Client Registration Source (Horizontal Bar)
    initClientRegChart(sharedOptions);
});

function initPropertyByStateChart(options) {
    const ctx = document.getElementById('propertyStateChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'Uttar Pradesh', 'Haryana', 'Madhya Pradesh', 'Punjab',
                'Jammu & Kashmir', 'Tamil Nadu', 'Chattisgarh',
                'Arunachal Pradesh', 'Andaman & Nicobar', 'Bhihar',
                'Rajasthan', 'Gujarat', 'Maharashtra', 'Karnataka'
            ],
            datasets: [{
                label: 'Property',
                data: [225, 159, 87, 74, 70, 67, 5, 4, 3, 2, 180, 140, 195, 110],
                backgroundColor: '#1DA152',
                borderRadius: 4,
                barThickness: 8
            }]
        },
        options: {
            ...options,
            indexAxis: 'y'
        }
    });
}

function initProjectByStateChart(options) {
    const ctx = document.getElementById('projectStateChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'Andaman & Nicobar', 'Arunachal Pradesh', 'Daman & Diu',
                'Goa', 'Haryana', 'Uttar Pradesh', 'Sikkim', 'Delhi',
                'Himachal', 'Uttarakhand', 'Assam'
            ],
            datasets: [{
                label: 'Projects',
                data: [42, 7, 26, 3, 23, 15, 2, 35, 12, 8, 4],
                backgroundColor: '#D3122A',
                borderRadius: 4,
                barThickness: 8
            }]
        },
        options: {
            ...options,
            indexAxis: 'y'
        }
    });
}

function initProjectByBuilderChart(options) {
    const ctx = document.getElementById('builderChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'Ajnara', 'Fusion Buildtech', 'Parshvnath Developers',
                'Nikki u', 'ghbb', 'Supertech', 'Godrej Properties',
                'DLF', 'Tata Housing', 'Prestige Group', 'Lodha',
                'Sobha', 'L&T Realty'
            ],
            datasets: [{
                label: 'By Builder',
                data: [46, 26, 20, 6, 4, 42, 38, 55, 30, 22, 18, 12, 15],
                backgroundColor: '#D3122A',
                borderRadius: 4,
                barThickness: 8
            }]
        },
        options: {
            ...options,
            indexAxis: 'y'
        }
    });
}

function initLeadsEnquiryChart(options) {
    const ctx = document.getElementById('leadsEnquiryChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['No. of Property', 'No. of Leads', 'No. of Contact Us', 'No. of Users'],
            datasets: [{
                data: [988, 303, 128, 303],
                backgroundColor: '#D3122A',
                borderRadius: 6,
                barThickness: 40
            }]
        },
        options: options
    });
}

function initProjectTypeChart() {
    const ctx = document.getElementById('projectTypeChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Residential', 'Commercial', 'Residential6ff', 'Plotting', 'Industrial'],
            datasets: [{
                data: [460, 140, 200, 80, 45],
                backgroundColor: ['#2FED9A', '#FFB800', '#1DA152', '#3B82F6', '#6366F1'],
                borderWidth: 0,
                hoverOffset: 10
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'bottom',
                    labels: {
                        usePointStyle: true,
                        padding: 20,
                        font: { size: 11, weight: '500' },
                        color: '#1A1A1A'
                    }
                }
            },
            cutout: '72%'
        }
    });
}

function initClientRegChart(options) {
    const ctx = document.getElementById('clientRegChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: [
                'SMS', 'Facebook', 'Friend', 'Walk In',
                'Newspaper', 'Google', 'Instagram', 'LinkedIn',
                'YouTube', 'Others'
            ],
            datasets: [{
                label: 'Registrations',
                data: [56, 34, 15, 12, 8, 45, 22, 18, 25, 5],
                backgroundColor: '#1E1B4B',
                borderRadius: 4,
                barThickness: 8
            }]
        },
        options: {
            ...options,
            indexAxis: 'y'
        }
    });
}
