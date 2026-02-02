// 2025 Dashboard Logic

document.addEventListener('DOMContentLoaded', () => {
    // Lucide Init
    lucide.createIcons();

    // Populate Dashboard Data

    // State Management
    const views = {
        'dashboard': document.getElementById('dashboard-view'),
        'categories': document.getElementById('categories-view'),
        'create-category': document.getElementById('create-category-view'),
        'property-list': document.getElementById('property-list-view')
    };
    const navItems = document.querySelectorAll('.nav-item[data-view]');
    const breadcrumbActive = document.getElementById('breadcrumb-active');
    let chartInstances = [];

    function cleanupCharts() {
        chartInstances.forEach(chart => chart.destroy());
        chartInstances = [];
    }

    function switchView(viewKey) {
        // Hide all views first
        Object.values(views).forEach(v => {
            if (v) v.style.display = 'none';
        });

        const targetView = views[viewKey];
        if (!targetView) {
            console.warn('View not found:', viewKey);
            return;
        }

        targetView.style.display = 'block';

        if (viewKey === 'dashboard') {
            cleanupCharts();
            initDashboard();
        } else if (viewKey === 'categories') {
            populateCategoriesTable();
        } else if (viewKey === 'create-category') {
            lucide.createIcons();
        } else if (viewKey === 'property-list') {
            populatePropertyListTable();
        }

        // Animated entry
        targetView.querySelectorAll('.kpi-card, .chart-card, .table-card').forEach((el, i) => {
            el.style.opacity = "0";
            el.style.transform = "translateY(10px)";
            setTimeout(() => {
                el.style.transition = "all 0.4s ease-out";
                el.style.opacity = "1";
                el.style.transform = "translateY(0)";
            }, i * 50);
        });
    }

    function initDashboard() {
        chartInstances.push(drawChart('leadsEnquiryChart', ['Property', 'Leads', 'Enquiry', 'Users'], [988, 303, 128, 303], '#2FED9A'));
        chartInstances.push(drawChart('propertyStateChart', ['Delhi', 'Haryana', 'Himachal', 'Jammu', 'Karnataka'], [147, 138, 150, 42, 67], '#2FED9A'));
        chartInstances.push(drawChart('projectStateChart', ['Delhi', 'Haryana', 'Himachal', 'Jammu', 'Karnataka'], [42, 67, 85, 30, 48], '#1DA152'));
        chartInstances.push(drawChart('builderChart', ['Ajnara', 'Supertech', 'Godrej', 'DLF', 'Tata'], [420, 280, 150, 310, 240], '#2FED9A'));
        populateActivityTable();
    }

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const viewKey = item.getAttribute('data-view');

            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            if (breadcrumbActive) {
                breadcrumbActive.textContent = item.querySelector('span').textContent;
            }

            switchView(viewKey);
        });
    });

    // Handle Buttons from views
    document.addEventListener('click', (e) => {
        // Create button (dynamic check for both List views)
        const createBtn = e.target.closest('.btn-primary');
        if (createBtn && createBtn.textContent.trim().includes('Create')) {
            switchView('create-category');
            if (breadcrumbActive) breadcrumbActive.textContent = 'Create Property Category';
        }

        // Cancel button in Form
        if (e.target.classList.contains('btn-cancel')) {
            switchView('categories');
            if (breadcrumbActive) breadcrumbActive.textContent = 'Property Category';
        }

        // Select All logic
        if (e.target.classList.contains('btn-select-all')) {
            const section = e.target.getAttribute('data-section');
            const checkboxes = document.querySelectorAll(`.${section}-cb`);
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);

            checkboxes.forEach(cb => {
                cb.checked = !allChecked;
            });

            e.target.textContent = allChecked ? 'Select All' : 'Deselect All';
            e.target.classList.toggle('active', !allChecked);
        }
    });

    // Form Submissions
    const createForm = document.getElementById('create-category-form');
    if (createForm) {
        createForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Property Category created successfully!');
            switchView('categories');
            if (breadcrumbActive) breadcrumbActive.textContent = 'Property Category';
        });
    }

    // Initial Load
    function drawChart(id, labels, data, color) {
        const canvas = document.getElementById(id);
        if (!canvas) return;
        const ctx = canvas.getContext('2d');

        // Gradient fill logic
        const gradient = ctx.createLinearGradient(0, 0, 0, 300);
        gradient.addColorStop(0, hexToRgb(color, 0.15));
        gradient.addColorStop(1, hexToRgb(color, 0));

        new Chart(ctx, {
            type: 'line', // Moving to lines for more 'premium' 2025 feel
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    borderColor: color,
                    borderWidth: 3,
                    backgroundColor: gradient,
                    fill: true,
                    tension: 0.45, // Smoother curves
                    pointRadius: 4,
                    pointBackgroundColor: color,
                    pointBorderColor: '#fff',
                    pointBorderWidth: 2,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: '#1e293b',
                        padding: 12,
                        displayColors: false,
                        cornerRadius: 10
                    }
                },
                scales: {
                    y: { beginAtZero: true, grid: { color: '#f1f5f9' }, ticks: { font: { size: 11 } } },
                    x: { grid: { display: false }, ticks: { font: { size: 11 } } }
                }
            }
        });
    }

    function hexToRgb(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    const activityData = [
        { user: 'Sarah Connor', type: 'Residential', state: 'Delhi', builder: 'Ajnara', status: 'active', date: 'Feb 02, 2026' },
        { user: 'Marcus Wright', type: 'Commercial', state: 'Haryana', builder: 'Supertech', status: 'pending', date: 'Feb 01, 2026' },
        { user: 'Kyle Reese', type: 'Plots', state: 'Himachal', builder: 'Godrej', status: 'failed', date: 'Jan 31, 2026' },
        { user: 'Ellen Ripley', type: 'Villa', state: 'Karnataka', builder: 'DLF', status: 'active', date: 'Jan 30, 2026' }
    ];

    function populateActivityTable() {
        const tbody = document.getElementById('activity-table-body');
        if (!tbody) return;

        tbody.innerHTML = activityData.map(item => `
        <tr>
            <td>
                <div style="display: flex; align-items: center; gap: 12px;">
                    <div style="width: 32px; height: 32px; border-radius: 8px; background: #f1f5f9; display: flex; align-items: center; justify-content: center; font-weight: 700; color: var(--primary); font-size: 11px;">
                        ${item.user.charAt(0)}
                    </div>
                    <div>
                        <div style="font-weight: 600; font-size: 13px;">${item.user}</div>
                        <div style="font-size: 11px; color: var(--text-muted);">${item.type}</div>
                    </div>
                </div>
            </td>
            <td><span style="font-weight: 500">${item.state}</span></td>
            <td><span style="color: var(--text-muted)">${item.builder}</span></td>
            <td><span class="status-pill status-${item.status}">${item.status}</span></td>
            <td><span style="font-size: 12px; color: var(--text-muted)">${item.date}</span></td>
            <td style="text-align: right;">
                <button style="color: var(--text-muted); padding: 4px;"><i data-lucide="more-horizontal" style="width: 18px;"></i></button>
            </td>
        </tr>
    `).join('');

        lucide.createIcons();
    }

    const categoryData = [
        { sno: 1, for: 'Rent', category: 'Residential', sub: 'House or Kothi' },
        { sno: 2, for: 'Rent', category: 'Residential', sub: 'Multi-story Apartments' },
        { sno: 3, for: 'Rent', category: 'Residential', sub: 'Builder Floor' },
        { sno: 4, for: 'Rent', category: 'Residential', sub: 'Villa' },
        { sno: 5, for: 'Rent', category: 'Residential', sub: 'Service Apartment' },
        { sno: 6, for: 'Rent', category: 'Residential', sub: 'Penthouse' },
        { sno: 7, for: 'Rent', category: 'Residential', sub: 'Studio Apartment' },
        { sno: 8, for: 'Rent', category: 'Commercial', sub: 'Hostel/PG' },
        { sno: 9, for: 'Rent', category: 'Commercial', sub: 'Commercial Land' },
        { sno: 10, for: 'Rent', category: 'Commercial', sub: 'Office Space' }
    ];

    function populateCategoriesTable() {
        const tbody = document.getElementById('categories-table-body');
        if (!tbody) return;

        // Add sort icons to headers if they don't exist
        const headers = document.querySelectorAll('#categories-view th:not(:last-child)');
        headers.forEach(th => {
            if (!th.querySelector('.sort-icon')) {
                th.innerHTML += `<span class="sort-icon"><i data-lucide="chevron-up-down" style="width: 12px;"></i></span>`;
            }
        });

        tbody.innerHTML = categoryData.length > 0 ? categoryData.map(item => `
        <tr>
            <td style="font-weight: 500; color: var(--text-muted)">${String(item.sno).padStart(2, '0')}</td>
            <td><span style="font-weight: 500">${item.for}</span></td>
            <td><span style="font-weight: 600">${item.category}</span></td>
            <td><span style="color: var(--text-muted)">${item.sub}</span></td>
            <td style="text-align: right;">
                <div style="display: flex; gap: 8px; justify-content: flex-end;">
                    <button class="action-btn btn-edit" title="Edit">
                        <i data-lucide="pencil" style="width: 14px;"></i>
                    </button>
                    <button class="action-btn btn-delete" title="Delete" onclick="confirmDelete(${item.sno})">
                        <i data-lucide="trash-2" style="width: 14px;"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('') : `
        <tr>
            <td colspan="5" style="text-align: center; padding: 48px; color: var(--text-muted);">
                <i data-lucide="folder-open" style="width: 40px; height: 40px; margin-bottom: 12px; opacity: 0.2;"></i>
                <p>No categories found</p>
            </td>
        </tr>
    `;

        lucide.createIcons();
    }

    function confirmDelete(sno) {
        if (confirm('Are you sure you want to delete this category?')) {
            console.log('Deleting item:', sno);
            // Add actual delete logic here
        }
    }

    const propertyData = [
        { sno: 1, postedBy: 'Agricultural Land Ranair', title: '', for: 'Sell', type: 'Agricultural Land', location: 'Ranair Village', status: 'active', verified: 'no', premium: 'no' },
        { sno: 2, postedBy: 'Ranair', title: '', for: 'Sell', type: 'Agricultural Land', location: 'Ranair Village', status: 'deactive', verified: 'yes', premium: 'no' },
        { sno: 3, postedBy: 'Princess Estate', title: '', for: 'Sell', type: 'Plot/Land', location: 'Lasuria Mori', status: 'deactive', verified: 'no', premium: 'no' },
        { sno: 4, postedBy: 'Princess Estate', title: '', for: 'Sell', type: 'Plot/Land', location: 'Princess Estate', status: 'active', verified: 'no', premium: 'no' },
        { sno: 5, postedBy: 'test1223', title: '', for: 'Sell', type: 'Villa', location: 'Test', status: 'active', verified: 'no', premium: 'no' },
        { sno: 6, postedBy: 'yyryr', title: '', for: 'Sell', type: 'Warehouse/ Godown', location: 'yryyryry', status: 'active', verified: 'no', premium: 'no' },
        { sno: 7, postedBy: 'test1223', title: '', for: 'Sell', type: 'House or Kothi', location: 'Test35', status: 'active', verified: 'no', premium: 'no' },
        { sno: 8, postedBy: 'test1223', title: '', for: 'Rent', type: 'Farm House', location: 'wfwaf', status: 'active', verified: 'no', premium: 'no' },
        { sno: 9, postedBy: 'test1223', title: '', for: 'Sell', type: 'Multi-story Apartments', location: 'Test', status: 'active', verified: 'no', premium: 'no' },
        { sno: 10, postedBy: 'Rajpushpa Provincia', title: '', for: 'Sell', type: 'Flats', location: 'Financial district', status: 'active', verified: 'no', premium: 'no' }
    ];

    function populatePropertyListTable() {
        const tbody = document.getElementById('property-list-table-body');
        if (!tbody) return;

        tbody.innerHTML = propertyData.map(item => `
        <tr>
            <td style="font-weight: 500; color: var(--text-muted)">${item.sno}</td>
            <td><div style="font-weight: 600; color: #475569;">${item.postedBy}</div></td>
            <td><span style="color: var(--text-muted); font-size: 12px;">${item.title || '-'}</span></td>
            <td><span style="font-weight: 500;">${item.for}</span></td>
            <td><span style="color: #64748b;">${item.type}</span></td>
            <td><span style="color: #64748b;">${item.location}</span></td>
            <td>
                <div style="display: flex; align-items: center; gap: 6px;">
                    <button class="action-btn btn-view" title="View" style="background: #22c55e; color: white; border: none; padding: 4px; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="eye" style="width: 12px; height: 12px;"></i>
                    </button>
                    <button class="action-btn btn-delete" title="Delete" style="background: #ef4444; color: white; border: none; padding: 4px; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="x" style="width: 12px; height: 12px;"></i>
                    </button>
                    <span class="status-pill ${item.status === 'active' ? 'status-active' : 'status-pending'}" style="padding: 2px 8px; font-size: 10px; font-weight: 700; text-transform: capitalize; border-radius: 4px; min-width: 60px; text-align: center;">${item.status}</span>
                </div>
            </td>
            <td>
                <button class="status-btn ${item.verified === 'yes' ? 'verified-primary' : 'verified-secondary'}" style="width: 100%; border-radius: 4px; padding: 6px; font-size: 12px; font-weight: 600; border: none; color: white; background: ${item.verified === 'yes' ? '#10b981' : '#f59e0b'};">
                    ${item.verified === 'yes' ? 'Yes' : 'No'}
                </button>
            </td>
            <td>
                <button class="status-btn premium-secondary" style="width: 100%; border-radius: 4px; padding: 6px; font-size: 12px; font-weight: 600; border: none; color: white; background: #f59e0b;">
                    No
                </button>
            </td>
        </tr>
    `).join('');

        lucide.createIcons();
    }

    // Kick off initial view
    initDashboard();
});
