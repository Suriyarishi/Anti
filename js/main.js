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
        'property-list': document.getElementById('property-list-view'),
        'project-attr-cat': document.getElementById('project-attr-cat-list-view'),
        'create-project-attr-cat': document.getElementById('create-project-attr-cat-view'),
        'project-attr': document.getElementById('project-attr-list-view'),
        'create-project-attr': document.getElementById('create-project-attr-view'),
        'builder-project-list': document.getElementById('builder-project-list-view'),
        'create-project': document.getElementById('create-project-view'),
        'attributes-category-list': document.getElementById('attributes-category-list-view'),
        'create-attributes-category': document.getElementById('create-attributes-category-view'),
        'attributes-list': document.getElementById('attributes-list-view'),
        'create-attribute': document.getElementById('create-attribute-view'),
        'users-list': document.getElementById('users-list-view'),
        'agent-list': document.getElementById('agent-list-view'),
        'builder-list': document.getElementById('builder-list-view'),
        'create-user': document.getElementById('create-user-view')
    };
    const navItems = document.querySelectorAll('.nav-item, .submenu-item');
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
        } else if (viewKey === 'project-attr-cat') {
            populateProjectAttrCatTable();
        } else if (viewKey === 'project-attr') {
            populateProjectAttributesTable();
        } else if (viewKey === 'project-list') {
            populateProjectListTable();
        } else if (viewKey === 'builder-project-list') {
            populateBuilderProjectTable();
        } else if (viewKey === 'create-project') {
            if (window.resetCreateProjectForm) window.resetCreateProjectForm();
        } else if (viewKey === 'attributes-category-list') {
            populateAttributesCategoryListTable();
        } else if (viewKey === 'attributes-list') {
            populateAttributesListTable();
        } else if (viewKey === 'users-list') {
            populateUsersTable();
        } else if (viewKey === 'agent-list') {
            populateAgentTable();
        } else if (viewKey === 'builder-list') {
            populateBuilderTable();
        } else if (viewKey === 'create-user') {
            lucide.createIcons();
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
            // If it's a submenu toggle, handle it differently
            if (item.classList.contains('nav-has-submenu')) {
                e.preventDefault();
                const group = item.closest('.nav-group');
                if (group) {
                    group.classList.toggle('open');
                }
                return;
            }

            e.preventDefault();
            const viewKey = item.getAttribute('data-view');
            if (!viewKey) return;

            navItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            if (breadcrumbActive) {
                const textSpan = item.querySelector('span:not(.submenu-dot)');
                breadcrumbActive.textContent = textSpan ? textSpan.textContent : item.querySelector('span').textContent;
            }

            switchView(viewKey);
        });
    });

    // Mobile Sidebar Logic
    const mobileToggle = document.getElementById('mobile-toggle');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const sidebar = document.querySelector('.sidebar');

    if (mobileToggle && sidebarOverlay && sidebar) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.add('active');
            sidebarOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('active');
            sidebarOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        // Close on nav click (mobile)
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('active');
                    sidebarOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // Handle Buttons from views
    document.addEventListener('click', (e) => {
        // Create button (dynamic check for both List views)
        const createBtn = e.target.closest('.btn-primary');
        if (createBtn && (createBtn.textContent.trim().includes('Create') || createBtn.textContent.trim().includes('Add'))) {
            const currentView = Object.keys(views).find(key => views[key].style.display === 'block');

            if (currentView === 'property-list') {
                // Do nothing or implement generic Create logic if needed
                // For now, keeping it as requested: just delete the module.
            } else if (currentView === 'project-list') {
                switchView('create-project');
                if (breadcrumbActive) breadcrumbActive.textContent = 'Add Project';
            } else if (currentView === 'project-attr-cat') {
                switchView('create-project-attr-cat');
                if (breadcrumbActive) breadcrumbActive.textContent = 'Create Project Attributes Category';
            } else if (currentView === 'project-attr') {
                switchView('create-project-attr');
                if (breadcrumbActive) breadcrumbActive.textContent = 'Create Project Attributes';
            } else if (currentView === 'attributes-category-list') {
                switchView('create-attributes-category');
                if (breadcrumbActive) breadcrumbActive.textContent = 'Create Attributes Category';
            } else if (currentView === 'attributes-list') {
                switchView('create-attribute');
                if (breadcrumbActive) breadcrumbActive.textContent = 'Create Attribute';
            } else if (currentView === 'users-list') {
                switchView('create-user');
                if (breadcrumbActive) breadcrumbActive.textContent = 'Create User';
            } else {
                switchView('create-category');
                if (breadcrumbActive) breadcrumbActive.textContent = 'Create Property Category';
            }
        }

        // Create Button Specific ID handler (if needed explicitly)
        if (e.target.closest('#btn-create-attr-cat')) {
            switchView('create-attributes-category');
            if (breadcrumbActive) breadcrumbActive.textContent = 'Create Attributes Category';
        }

        if (e.target.closest('#btn-create-attr')) {
            switchView('create-attribute');
            if (breadcrumbActive) breadcrumbActive.textContent = 'Create Attribute';
        }

        // Cancel button in Form
        if (e.target.classList.contains('btn-cancel')) {
            switchView('categories');
            if (breadcrumbActive) breadcrumbActive.textContent = 'Property Category';
        }

        // Attributes Category Cancel
        if (e.target.classList.contains('btn-cancel-attr-cat')) {
            switchView('attributes-category-list');
            if (breadcrumbActive) breadcrumbActive.textContent = 'Attributes Category';
        }

        // Attribute Cancel
        if (e.target.classList.contains('btn-cancel-attr')) {
            switchView('attributes-list');
            if (breadcrumbActive) breadcrumbActive.textContent = 'Attributes';
        }

        // Create User Cancel
        if (e.target.closest('#btn-create-user-cancel')) {
            switchView('users-list');
            if (breadcrumbActive) breadcrumbActive.textContent = 'Users List';
        }

        // Project Form Cancel
        if (e.target.id === 'btn-project-cancel') {
            if (confirm('Are you sure you want to cancel? All progress will be lost.')) {
                switchView('project-list');
                if (breadcrumbActive) breadcrumbActive.textContent = 'Project Management';
            }
        }

        // Project Attr Cancel
        if (e.target.classList.contains('btn-cancel-project-attr')) {
            switchView('project-attr-cat');
            if (breadcrumbActive) breadcrumbActive.textContent = 'Project Attribute Category';
        }

        // Project Attr Details Cancel
        if (e.target.classList.contains('btn-cancel-project-attr-details')) {
            switchView('project-attr');
            if (breadcrumbActive) breadcrumbActive.textContent = 'Project Attributes';
        }

        // Select All logic
        if (e.target.classList.contains('btn-select-all')) {
            const section = e.target.getAttribute('data-section');
            const checkboxes = document.querySelectorAll(`.${section}-cb`);
            const allChecked = Array.from(checkboxes).every(cb => cb.checked);
            checkboxes.forEach(cb => cb.checked = !allChecked);
        }

        // Project Form Navigation (Refactored for reliability)
        // Project Form Navigation - Handled by specific listeners in initCreateProjectFormLogic
        // Delegated logic removed to prevent double-binding and conflicts

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

    const createProjectAttrForm = document.getElementById('create-project-attr-cat-form');
    if (createProjectAttrForm) {
        createProjectAttrForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Project Attribute Category created successfully!');
            switchView('project-attr-cat');
            if (breadcrumbActive) breadcrumbActive.textContent = 'Project Attribute Category';
        });
    }

    const createProjectAttrDetailsForm = document.getElementById('create-project-attr-form');
    if (createProjectAttrDetailsForm) {
        createProjectAttrDetailsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Project Attributes created successfully!');
            switchView('project-attr');
            if (breadcrumbActive) breadcrumbActive.textContent = 'Project Attributes';
        });
    }

    const createUserForm = document.getElementById('create-user-form');
    if (createUserForm) {
        createUserForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('User created successfully!');
            switchView('users-list');
            if (breadcrumbActive) breadcrumbActive.textContent = 'Users List';
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
            <td>
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
            <td>
                <div style="display: flex; gap: 8px;">
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
            <td style="font-weight: 500; color: var(--text-muted);">${item.sno}</td>
            <td style="color: var(--text-muted);">${item.postedBy}</td>
            <td><span style="color: #64748b; font-weight: 500;">${item.title || ''}</span></td>
            <td style="color: var(--text-muted);">${item.for}</td>
            <td style="color: var(--text-muted);">${item.type}</td>
            <td style="color: var(--text-muted);">${item.location}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 4px;">
                    <button class="action-icon-btn" style="background: #2FED9A; color: white; border: none; width: 28px; height: 28px; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="eye" style="width: 14px; height: 14px;"></i>
                    </button>
                    <button class="action-icon-btn" style="background: #FF5E5E; color: white; border: none; width: 28px; height: 28px; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="x" style="width: 14px; height: 14px;"></i>
                    </button>
                    <button class="status-btn" style="background: #3B82F6; color: white; padding: 4px 10px; font-size: 11px; border-radius: 4px; border: none; font-weight: 600; text-transform: capitalize;">${item.status}</button>
                </div>
            </td>
            <td>
                <button class="status-btn" style="width: 100%; border-radius: 4px; padding: 6px; font-size: 12px; font-weight: 600; border: none; color: white; background: ${item.verified === 'yes' ? '#20C997' : '#F59E0B'};">
                    ${item.verified === 'yes' ? 'Yes' : 'No'}
                </button>
            </td>
            <td>
                <button class="status-btn" style="width: 100%; border-radius: 4px; padding: 6px; font-size: 12px; font-weight: 600; border: none; color: white; background: ${item.premium === 'yes' ? '#20C997' : '#F59E0B'};">
                    ${item.premium === 'yes' ? 'Yes' : 'No'}
                </button>
            </td>
        </tr>
    `).join('');

        lucide.createIcons();
    }

    const projectData = [
        { sno: 1, postedBy: 'Builder', name: 'Developer Project', for: 'Rent', type: 'Flats', url: '#', verified: 'no' },
        { sno: 2, postedBy: 'Builder', name: 'New House edit', for: 'Sell', type: 'Penthouse', url: '#', verified: 'yes' },
        { sno: 3, postedBy: 'Builder', name: 'Platinum', for: 'Sell', type: 'Builder Floor', url: 'dsddsds', verified: 'no' },
        { sno: 4, postedBy: 'Builder', name: 'Bronze', for: 'Rent', type: 'Multi-story Apartments', url: '#', verified: 'no' },
        { sno: 5, postedBy: 'Builder', name: 'Housing colony', for: 'Sell', type: 'Multi-story Apartments', url: '#', verified: 'no' },
        { sno: 6, postedBy: 'Builder', name: 'project 01', for: 'Rent', type: 'Flats', url: '#', verified: 'no' },
        { sno: 7, postedBy: 'Builder', name: 'Avadh Colony', for: 'Rent', type: 'Flats', url: '#', verified: 'no' },
        { sno: 8, postedBy: 'Builder', name: 'Supernova', for: 'Rent', type: 'Flats', url: '#supertechlimited.com', verified: 'no' }
    ];

    function populateProjectListTable() {
        const tbody = document.getElementById('project-list-table-body');
        if (!tbody) return;

        tbody.innerHTML = projectData.map(item => `
        <tr>
            <td style="font-weight: 500; color: var(--text-muted);">${item.sno}</td>
            <td style="color: var(--text-muted);">${item.postedBy}</td>
            <td><span style="color: #64748b; font-weight: 500;">${item.name}</span></td>
            <td style="color: var(--text-muted);">${item.for}</td>
            <td style="color: var(--text-muted);">${item.type}</td>
            <td style="color: var(--text-muted);">${item.url}</td>
            <td>
                <div style="display: flex; align-items: center; gap: 4px;">
                    <button class="action-icon-btn" style="background: #2FED9A; color: white; border: none; width: 28px; height: 28px; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="eye" style="width: 14px; height: 14px;"></i>
                    </button>
                    <button class="action-icon-btn" style="background: #FF5E5E; color: white; border: none; width: 28px; height: 28px; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="x" style="width: 14px; height: 14px;"></i>
                    </button>
                    <button class="status-btn" style="background: #3B82F6; color: white; padding: 4px 10px; font-size: 11px; border-radius: 4px; border: none; font-weight: 600;">Active</button>
                </div>
            </td>
            <td>
                <button class="status-btn" style="width: 100%; border-radius: 4px; padding: 6px; font-size: 12px; font-weight: 600; border: none; color: white; background: ${item.verified === 'yes' ? '#20C997' : '#F59E0B'};">
                    ${item.verified === 'yes' ? 'Yes' : 'No'}
                </button>
            </td>
        </tr>
    `).join('');

        lucide.createIcons();
    }

    const builderProjectData = [
        { sno: 1, postedBy: 'Builder', project: 'Fusion Homes', builder: 'Fusion Buildtech', type: 'Residential', status: 'pending' },
        { sno: 2, postedBy: 'Builder', project: 'Fusion Homes', builder: 'Fusion Buildtech', type: 'Residential', status: 'pending' },
        { sno: 3, postedBy: 'Builder', project: 'Ajnara', builder: 'Ajnara', type: 'Residential', status: 'pending' },
        { sno: 4, postedBy: 'Builder', project: 'Property101', builder: 'Ajnara', type: 'Residential', status: 'pending' },
        { sno: 5, postedBy: 'Builder', project: 'Property101', builder: 'Ajnara', type: 'Residential', status: 'pending' },
        { sno: 6, postedBy: 'Builder', project: 'Property132', builder: 'Ajnara', type: 'Residential', status: 'pending' },
        { sno: 7, postedBy: 'Builder', project: 'Ajnara Green', builder: 'Ajnara', type: 'Residential', status: 'pending' },
        { sno: 8, postedBy: 'Builder', project: 'CHD City', builder: 'CHD Green', type: 'Residential', status: 'pending' },
        { sno: 9, postedBy: 'Builder', project: 'naveen project', builder: 'asdfasf', type: 'Residential', status: 'pending' },
        { sno: 10, postedBy: 'Builder', project: 'sadada', builder: 'kjjdsgfhdsgfs', type: 'Commercial', status: 'pending' }
    ];

    function populateBuilderProjectTable() {
        const tbody = document.getElementById('builder-project-list-table-body');
        if (!tbody) return;

        tbody.innerHTML = builderProjectData.map(item => `
        <tr>
            <td style="font-weight: 500; color: var(--text-muted); text-align: center;">${item.sno}</td>
            <td style="color: var(--text-muted); text-align: center;">${item.postedBy}</td>
            <td style="color: var(--text-muted); text-align: center;">${item.project}</td>
            <td style="color: var(--text-muted); text-align: center;">${item.builder}</td>
            <td style="color: var(--text-muted); text-align: center;">${item.type}</td>
            <td style="text-align: center;">
                <button style="background: #F59E0B; color: white; border: none; width: 24px; height: 24px; border-radius: 4px; display: inline-flex; align-items: center; justify-content: center;">
                    <i data-lucide="thumbs-up" style="width: 14px; height: 14px;"></i>
                </button>
            </td>
            <td>
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <button class="action-icon-btn" style="background: #2FED9A; color: white; border: none; width: 28px; height: 28px; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="eye" style="width: 14px; height: 14px;"></i>
                    </button>
                    <button class="action-icon-btn" style="background: #FF5E5E; color: white; border: none; width: 28px; height: 28px; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="x" style="width: 14px; height: 14px;"></i>
                    </button>
                </div>
            </td>
        </tr>
    `).join('');

        lucide.createIcons();
    }

    const attributesCategoryData = [
        { sno: 1, name: 'Property Features' },
        { sno: 2, name: 'Area' },
        { sno: 3, name: 'Transaction Type' },
        { sno: 4, name: 'Price Details' },
        { sno: 5, name: 'Location' },
        { sno: 6, name: 'Contact Details' }
    ];

    function populateAttributesCategoryListTable() {
        const tbody = document.getElementById('attributes-category-list-table-body');
        if (!tbody) return;

        tbody.innerHTML = attributesCategoryData.map(item => `
        <tr>
            <td style="font-weight: 500; color: var(--text-muted);">${item.sno}</td>
            <td style="color: #64748b; font-weight: 600; text-align: center;">${item.name}</td>
            <td>
                <div style="display: flex; align-items: center; justify-content: center; gap: 8px;">
                    <button class="action-icon-btn" style="background: #2FED9A; color: white; border: none; width: 28px; height: 28px; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="eye" style="width: 14px; height: 14px;"></i>
                    </button>
                    <button class="action-icon-btn" style="background: #FF5E5E; color: white; border: none; width: 28px; height: 28px; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                        <i data-lucide="x" style="width: 14px; height: 14px;"></i>
                    </button>
                </div>
            </td>
        </tr>
        `).join('');

        lucide.createIcons();
    }

    const attributesData = [
        { sno: 1, name: 'Building Name', input: 'text', options: '', validation: '', tooltip: '' },
        { sno: 2, name: 'Bedrooms', input: 'select', options: '1,2,3,4,5,6,7,8,9,10,10+', validation: 'required', tooltip: '' },
        { sno: 3, name: 'Bathrooms', input: 'select', options: '1,2,3,4,5,6,7,8,9,10,10+', validation: '', tooltip: '' },
        { sno: 4, name: 'Balconies', input: 'select', options: '1,2,3,4,5,6,7,8,9,10,10+', validation: '', tooltip: '' },
        { sno: 5, name: 'Finishing Status', input: 'select', options: 'Furnished,Unfurnished,Semi-furnished', validation: '', tooltip: '' },
        { sno: 6, name: 'Shared Office Space', input: 'radio', options: 'yes,no', validation: '', tooltip: '' },
        { sno: 7, name: 'Personal Washroom', input: 'radio', options: 'yes,no', validation: '', tooltip: '' },
        { sno: 8, name: 'Pantry', input: 'radio', options: 'yes,no', validation: '', tooltip: '' },
        { sno: 9, name: 'Floor Number', input: 'number', options: '', validation: '', tooltip: '' },
        { sno: 10, name: 'Total Floors', input: 'number', options: '', validation: 'floor_number', tooltip: '' }
    ];

    function populateAttributesListTable() {
        const tbody = document.getElementById('attributes-list-table-body');
        if (!tbody) return;

        tbody.innerHTML = attributesData.map(item => `
        <tr>
            <td style="font-weight: 500; color: var(--text-muted);">${item.sno}</td>
            <td style="font-weight: 600; color: #64748b;">${item.name}</td>
            <td style="text-align: center;"><span class="pill" style="background:#f1f5f9; color:#475569; border:1px solid #e2e8f0; font-size:11px;">${item.input}</span></td>
            <td style="color:var(--text-muted); font-size:12px; text-align: center;">${item.options}</td>
            <td style="text-align: center;"><span class="pill" style="background:${item.validation ? 'rgba(var(--primary-rgb), 0.1)' : 'transparent'}; color:var(--primary); font-size:11px;">${item.validation}</span></td>
            <td style="color:var(--text-muted); font-size:12px; text-align: center;">${item.tooltip}</td>
            <td>
                <div style="display:flex; align-items: center; justify-content: center;">
                    <button class="action-btn" style="background:#20C997; color:white; border:none; width:28px; height:28px;">
                        <i data-lucide="eye" style="width:14px;"></i>
                    </button>
                </div>
            </td>
        </tr>
        `).join('');

        lucide.createIcons();
    }

    const projectAttrCatData = [
        { sno: 1, name: 'Locatiion' },
        { sno: 2, name: 'Area' },
        { sno: 3, name: 'Features' },
        { sno: 4, name: 'Price Details' }
    ];

    function populateProjectAttrCatTable() {
        const tbody = document.getElementById('project-attr-cat-table-body');
        if (!tbody) return;

        tbody.innerHTML = projectAttrCatData.map(item => `
            <tr>
                <td style="font-weight: 500; color: var(--text-muted)">${item.sno}</td>
                <td><span style="font-weight: 600; color: #64748b;">${item.name}</span></td>
                <td>
                    <div style="display: flex; gap: 8px;">
                        <button class="action-btn" style="background: #22c55e; color: white;">
                            <i data-lucide="eye" style="width: 14px;"></i>
                        </button>
                        <button class="action-btn" style="background: #ef4444; color: white;">
                            <i data-lucide="x" style="width: 14px;"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        lucide.createIcons();
    }

    function populateProjectAttributesTable() {
        const body = document.getElementById('project-attributes-table-body');
        if (!body) return;

        const data = [
            { sno: 1, name: 'State', input: 'select', options: '', validation: 'required', tooltip: '' },
            { sno: 2, name: 'City', input: 'select', options: '', validation: 'required', tooltip: '' },
            { sno: 3, name: 'Locality', input: 'text', options: '', validation: '', tooltip: '' },
            { sno: 4, name: 'Address', input: 'text', options: '', validation: 'required', tooltip: '' },
            { sno: 5, name: 'Longitude', input: 'text', options: '', validation: '', tooltip: '' },
            { sno: 6, name: 'Latitude', input: 'text', options: '', validation: '', tooltip: '' },
            { sno: 7, name: 'Super Area', input: 'number', options: '', validation: 'required', tooltip: 'Enter Area in Sq. ft' },
            { sno: 8, name: 'Build Up Area', input: 'number', options: '', validation: 'project_buildup_area', tooltip: 'Enter Area in Sq. ft' },
            { sno: 9, name: 'Minimum Price', input: 'number', options: '', validation: 'required', tooltip: 'Minimum price' },
            { sno: 10, name: 'ProjectFor', input: 'text1', options: '', validation: '', tooltip: '' }
        ];

        body.innerHTML = data.map(item => `
            <tr>
                <td style="font-weight: 500; color: var(--text-muted)">${item.sno}</td>
                <td style="font-weight: 600; color: #64748b;">${item.name}</td>
                <td><span class="pill" style="background:#f1f5f9; color:#475569; border:1px solid #e2e8f0; font-size:11px;">${item.input}</span></td>
                <td>${item.options}</td>
                <td><span class="pill" style="background:rgba(var(--primary-rgb), 0.1); color:var(--primary); font-size:11px;">${item.validation}</span></td>
                <td style="color:var(--text-muted); font-size:12px;">${item.tooltip}</td>
                <td>
                    <div style="display:flex; gap:8px;">
                        <button class="action-btn" style="background:var(--primary); color:white; border:none; width:28px; height:28px;">
                            <i data-lucide="eye" style="width:14px;"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        lucide.createIcons();
    }

    // User Management Data & Logic
    const usersData = [
        { sno: 1, type: 'Owner', name: 'Parveen Verma', email: 'vermaparveen17@gmail.com', mobile: '9871035534', joinedDate: '2026-01-22 02:12:57' },
        { sno: 2, type: 'Owner', name: 'Priyanka Gupta', email: 'priyanka.s.jain@gmail.com', mobile: '9300062905', joinedDate: '2026-01-14 10:33:20' },
        { sno: 3, type: 'Owner', name: 'Vinay', email: 'hellohunthunger@gmail.com', mobile: '9818499369', joinedDate: '2025-12-23 21:19:40' },
        { sno: 4, type: 'Owner', name: 'Junaid Ahmed', email: 'junaidshine1@gmail.com', mobile: '9122482627', joinedDate: '2025-11-19 22:12:34' },
        { sno: 5, type: 'Owner', name: 'RISHI KESAVAN S K', email: 'klnmca6@gmail.com', mobile: '9003486509', joinedDate: '2025-11-15 19:35:54' },
        { sno: 6, type: 'Owner', name: 'Ziya', email: 'khanziaullahssc82@gmail.com', mobile: '9967586763', joinedDate: '2025-08-22 21:34:51' },
        { sno: 7, type: 'Owner', name: 'Sai Kumar', email: 'saikumarsagar143@gmail.com', mobile: '7989313969', joinedDate: '2025-08-18 21:05:12' },
        { sno: 8, type: 'Owner', name: 'Swathi komal', email: 'dmswathikomal@gmail.com', mobile: '7411564898', joinedDate: '2025-08-07 14:28:51' },
        { sno: 9, type: 'Owner', name: 'Aryan', email: 'aryanvaghasiya313@gmail.com', mobile: '9265045850', joinedDate: '2025-07-18 23:45:00' },
        { sno: 10, type: 'Owner', name: 'Mithun AR', email: 'heatmaac2@gmail.com', mobile: '9361676767', joinedDate: '2025-07-12 13:58:42' }
    ];

    function populateUsersTable() {
        const tbody = document.getElementById('users-table-body');
        if (!tbody) return;

        tbody.innerHTML = usersData.map(item => `
            <tr>
                <td style="font-weight: 500; color: var(--text-muted)">${item.sno}</td>
                <td style="color: var(--text-muted);">${item.type}</td>
                <td style="font-weight: 600; color: #64748b;">${item.name}</td>
                <td style="color: var(--text-muted);">${item.email}</td>
                <td style="color: var(--text-muted);">${item.mobile}</td>
                <td style="color: var(--text-muted);">${item.joinedDate}</td>
                <td>
                    <div style="display: flex; gap: 8px; justify-content: center;">
                        <button class="action-btn" style="background: #22c55e; color: white;">
                             <i data-lucide="eye" style="width: 14px;"></i>
                        </button>
                         <button class="action-btn" style="background: #ef4444; color: white;">
                             <i data-lucide="x" style="width: 14px;"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
        lucide.createIcons();
    }

    const agentData = [
        { sno: 1, type: 'Agent', name: 'Agent', email: 'agent@huntproperty.com', mobile: '7415212847' },
        { sno: 2, type: 'Agent', name: 'Anoop Bansal', email: 'anoopbansal72@gmail.com', mobile: '7905768355' },
        { sno: 3, type: 'Agent', name: 'Vishal Londhe', email: 'vishal.londhe143@gmail.com', mobile: '8149990503' },
        { sno: 4, type: 'Agent', name: 'suryansh', email: 'suryanshmadanwat@gmail.com', mobile: '7500414004' },
        { sno: 5, type: 'Agent', name: 'shyam', email: 'myhuntdesk@gmail.com', mobile: '9910321139' },
        { sno: 6, type: 'Agent', name: 'Chandresh Shukla', email: 'chandresh723@gmail.com', mobile: '9594018430' },
        { sno: 7, type: 'Agent', name: 'Bharath', email: 'bspropertymanagement1@gmail.com', mobile: '8374078196' },
        { sno: 8, type: 'Agent', name: 'Saurabh', email: 'khandelwal.khandelwal1@gmail.com', mobile: '8078671721' },
        { sno: 9, type: 'Agent', name: 'Sarvendra Singh', email: 'sarvendrasingh818@gmail.com', mobile: '7460909972' },
        { sno: 10, type: 'Agent', name: 'ANAND PANDEY', email: 'ap2pandey@gmail.com', mobile: '9718347147' }
    ];

    function populateAgentTable() {
        const tbody = document.getElementById('agent-table-body');
        if (!tbody) return;

        tbody.innerHTML = agentData.map(item => `
            <tr>
                <td style="font-weight: 500; color: var(--text-muted)">${item.sno}</td>
                <td style="color: var(--text-muted);">${item.type}</td>
                <td style="font-weight: 600; color: #64748b;">${item.name}</td>
                <td style="color: var(--text-muted);">${item.email}</td>
                <td style="color: var(--text-muted);">${item.mobile}</td>
                <td>
                    <div style="display: flex; gap: 8px; justify-content: center;">
                         <button class="action-btn" style="background: #22c55e; color: white;">
                             <i data-lucide="eye" style="width: 14px;"></i>
                        </button>
                        <button class="action-btn" style="background: #f97316; color: white;">
                             <i data-lucide="pencil" style="width: 14px;"></i>
                        </button>
                        <button class="action-btn" style="background: #ef4444; color: white;">
                             <i data-lucide="x" style="width: 14px;"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
        lucide.createIcons();
    }

    const builderData = [
        { sno: 1, type: 'Builder', name: 'HuntTest', email: 'HuntTest@yopmail.com', mobile: '9716039015' },
        { sno: 2, type: 'Builder', name: 'divyanka', email: 'prachi.huntproperty@gmail.com', mobile: '9953760166' },
        { sno: 3, type: 'Builder', name: 'Builder', email: 'builder@huntproperty.com', mobile: '9910861444' },
        { sno: 4, type: 'Builder', name: 'prameet singh', email: 'prameetshine23@gmail.com', mobile: '7519082538' },
        { sno: 5, type: 'Builder', name: 'Britt Bonner', email: 'brittbonner@yahoo.com', mobile: '7704805145' },
        { sno: 6, type: 'Builder', name: 'Rajesh Kumar', email: 'rm123@yopmail.com', mobile: '8427844014' },
        { sno: 7, type: 'Builder', name: 'Shaili', email: 'shailivns@gmail.com', mobile: '8299362923' },
        { sno: 8, type: 'Builder', name: 'prameet singh', email: 'prameetshine22@gmail.com', mobile: '8340711456' },
        { sno: 9, type: 'Builder', name: 'Pradeep Kr Paras', email: 'lov.paras@gmail.com', mobile: '7004827294' },
        { sno: 10, type: 'Builder', name: 'Shivam', email: 'shivam0madnawat@gmail.com', mobile: '8077821494' }
    ];

    function populateBuilderTable() {
        const tbody = document.getElementById('builder-table-body');
        if (!tbody) return;

        tbody.innerHTML = builderData.map(item => `
            <tr>
                 <td style="font-weight: 500; color: var(--text-muted)">${item.sno}</td>
                <td style="color: var(--text-muted);">${item.type}</td>
                <td style="font-weight: 600; color: #64748b;">${item.name}</td>
                <td style="color: var(--text-muted);">${item.email}</td>
                 <td style="color: var(--text-muted);">${item.mobile}</td>
                 <td>
                    <div style="display: flex; gap: 8px; justify-content: center;">
                         <button class="action-btn" style="background: #22c55e; color: white;">
                             <i data-lucide="eye" style="width: 14px;"></i>
                        </button>
                        <button class="action-btn" style="background: #f97316; color: white;">
                             <i data-lucide="pencil" style="width: 14px;"></i>
                        </button>
                        <button class="action-btn" style="background: #ef4444; color: white;">
                             <i data-lucide="x" style="width: 14px;"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');
        lucide.createIcons();
    }



    function initCreateProjectFormLogic() {
        window.currentProjectStep = 1;
        const totalSteps = 4;
        const stepperItems = document.querySelectorAll('#project-stepper .stepper-item');
        const nextBtn = document.getElementById('btn-project-next');
        const prevBtn = document.getElementById('btn-project-prev');
        const submitBtn = document.getElementById('btn-project-submit');
        const cancelBtn = document.getElementById('btn-project-cancel');

        window.updateProjectStep = function (step) {
            console.log('Updating project step to:', step);
            // Hide all steps
            for (let i = 1; i <= totalSteps; i++) {
                const content = document.getElementById(`project-step-${i}-content`);
                if (content) content.style.display = 'none';
            }

            // Show current step
            const currentContent = document.getElementById(`project-step-${step}-content`);
            if (currentContent) currentContent.style.display = 'block';

            // Update Stepper
            stepperItems.forEach((item, idx) => {
                const stepIdx = idx + 1;
                item.classList.remove('active', 'completed');
                if (stepIdx < step) item.classList.add('completed');
                if (stepIdx === step) item.classList.add('active');
            });

            // Update footer buttons visibility
            if (prevBtn) prevBtn.style.display = (step === 1) ? 'none' : 'block';
            if (cancelBtn) cancelBtn.style.display = (step === 1) ? 'block' : 'none';

            if (nextBtn) {
                nextBtn.style.display = (step === totalSteps) ? 'none' : 'flex';
            }
            if (submitBtn) {
                submitBtn.style.display = (step === totalSteps) ? 'flex' : 'none';
            }

            // Re-init icons for dynamic content
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        };

        // Navigation Event Listeners
        if (nextBtn) {
            console.log('Next button found, adding listener');
            nextBtn.addEventListener('click', () => {
                console.log('Next button clicked. Current step:', window.currentProjectStep);
                if (window.currentProjectStep < totalSteps) {
                    window.currentProjectStep++;
                    window.updateProjectStep(window.currentProjectStep);
                } else {
                    console.log('Already at max step');
                }
            });
        } else {
            console.error('Next button NOT found in DOM');
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                if (window.currentProjectStep > 1) {
                    window.currentProjectStep--;
                    window.updateProjectStep(window.currentProjectStep);
                }
            });
        }

        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                window.resetCreateProjectForm();
                // Optional: Navigate back to dashboard or project list if needed
            });
        }

        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                alert('Project Submitted Successfully!');
                window.resetCreateProjectForm();
            });
        }

        window.resetCreateProjectForm = function () {
            window.currentProjectStep = 1;
            window.updateProjectStep(1);
        };

        // Add More Unit Details logic
        const addUnitBtn = document.getElementById('btn-add-unit');
        const unitsContainer = document.getElementById('project-units-container');
        if (addUnitBtn && unitsContainer) {
            addUnitBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const newRow = document.createElement('div');
                newRow.className = 'form-row-horizontal unit-row';
                newRow.style.marginTop = '12px';
                newRow.innerHTML = `
                    <label></label>
                    <div style="display: grid; grid-template-columns: 1fr 1fr auto; gap: 12px; align-items: center;">
                        <input type="text" class="form-control-premium" style="background-color: #F8FAFC; border-color: #E2E8F0;" placeholder="Unit in sqft">
                        <input type="text" class="form-control-premium" style="background-color: #F8FAFC; border-color: #E2E8F0;" placeholder="Price in INR">
                        <button type="button" class="btn btn-remove" style="background: #FFF1F2; color: #E11D48; border: 1px solid #FFE4E6; height: 42px; width: 100%; min-width: 100px; font-size: 13px; font-weight: 500; border-radius: 8px;">Remove</button>
                    </div>
                `;
                unitsContainer.appendChild(newRow);
                newRow.querySelector('.btn-remove').addEventListener('click', () => newRow.remove());
            });
        }

        // Drag & Drop Photo Upload Logic
        const dropZone = document.getElementById('drop-zone');
        const fileInput = document.getElementById('project-photos-input');
        const mediaPreview = document.getElementById('project-media-preview');

        if (dropZone && fileInput && mediaPreview) {
            dropZone.addEventListener('click', () => fileInput.click());

            dropZone.addEventListener('dragover', (e) => {
                e.preventDefault();
                dropZone.style.borderColor = 'var(--primary)';
                dropZone.style.background = 'rgba(var(--primary-rgb), 0.05)';
            });

            ['dragleave', 'drop'].forEach(eventName => {
                dropZone.addEventListener(eventName, () => {
                    dropZone.style.borderColor = '#CBD5E1';
                    dropZone.style.background = '#F8FAFC';
                });
            });

            dropZone.addEventListener('drop', (e) => {
                e.preventDefault();
                handleFiles(e.dataTransfer.files);
            });

            fileInput.addEventListener('change', (e) => {
                handleFiles(e.target.files);
            });

            function handleFiles(files) {
                if (files.length > 0) {
                    mediaPreview.innerHTML = '';
                    mediaPreview.style.display = 'grid';
                    mediaPreview.style.gridTemplateColumns = 'repeat(auto-fill, minmax(100px, 1fr))';
                    mediaPreview.style.gap = '16px';
                    mediaPreview.style.padding = '16px';
                    mediaPreview.style.justifyContent = 'start';
                    mediaPreview.style.alignItems = 'start';

                    Array.from(files).forEach(file => {
                        const reader = new FileReader();
                        reader.onload = (e) => {
                            const div = document.createElement('div');
                            div.className = 'preview-item';
                            div.style.position = 'relative';
                            div.style.aspectRatio = '1';
                            div.style.borderRadius = '8px';
                            div.style.overflow = 'hidden';
                            div.style.border = '1px solid #E2E8F0';

                            div.innerHTML = `
                                <img src="${e.target.result}" style="width: 100%; height: 100%; object-fit: cover;">
                                <button type="button" style="position: absolute; top: 4px; right: 4px; background: rgba(0,0,0,0.5); color: white; border: none; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 10px;">×</button>
                            `;

                            div.querySelector('button').onclick = () => div.remove();
                            mediaPreview.appendChild(div);
                        };
                        reader.readAsDataURL(file);
                    });
                }
            }
        }

        // Initialize state
        window.updateProjectStep(1);
    }

    // Kick off initial view
    try {
        initDashboard();
    } catch (error) {
        console.error('Error initializing dashboard:', error);
    }

    try {
        initCreateProjectFormLogic();
    } catch (error) {
        console.error('Error initializing project form:', error);
    }
});
