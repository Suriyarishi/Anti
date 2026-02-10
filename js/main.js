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
        'create-user': document.getElementById('create-user-view'),
        'testimonials-list': document.getElementById('testimonials-list-view'),
        'associates-list': document.getElementById('associates-list-view'),
        'create-testimonial': document.getElementById('create-testimonial-view'),
        'create-associate': document.getElementById('create-associate-view'),
        'news-list': document.getElementById('news-list-view'),
        'create-news': document.getElementById('create-news-view'),
        'subscribers-list': document.getElementById('subscribers-list-view'),
        'add-newsletter-view': document.getElementById('add-newsletter-view'),
        'contact-enquiry-list': document.getElementById('contact-enquiry-list-view'),
        'lead-management-list': document.getElementById('lead-management-list-view')
    };
    const navItems = document.querySelectorAll('.nav-item, .submenu-item');
    const breadcrumbActive = document.getElementById('breadcrumb-active');
    let chartInstances = [];

    function cleanupCharts() {
        chartInstances.forEach(chart => chart.destroy());
        chartInstances = [];
    }

    function switchView(viewKey) {
        console.log('Switching to view:', viewKey);

        // Hide all views first
        Object.values(views).forEach(v => {
            if (v) v.style.display = 'none';
        });

        const targetView = views[viewKey];
        if (!targetView) {
            console.warn('View not found in switchView:', viewKey);
            return;
        }

        targetView.style.display = 'block';
        window.currentView = viewKey; // Track current view globally

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
        } else if (viewKey === 'testimonials-list') {
            populateTestimonialsTable();
            if (breadcrumbActive) breadcrumbActive.textContent = 'Testimonials';
        } else if (viewKey === 'associates-list') {
            populateAssociatesTable();
            if (breadcrumbActive) breadcrumbActive.textContent = 'Associates';
        } else if (viewKey === 'create-testimonial') {
            lucide.createIcons();
            if (breadcrumbActive) breadcrumbActive.textContent = 'Create Testimonial';
        } else if (viewKey === 'create-associate') {
            lucide.createIcons();
            if (breadcrumbActive) breadcrumbActive.textContent = 'Create Associate';
        } else if (viewKey === 'news-list') {
            populateNewsTable();
            if (breadcrumbActive) breadcrumbActive.textContent = 'News';
        } else if (viewKey === 'create-news') {
            lucide.createIcons();
            if (breadcrumbActive) breadcrumbActive.textContent = 'Add News';
        } else if (viewKey === 'subscribers-list') {
            populateSubscribersTable();
            if (breadcrumbActive) breadcrumbActive.textContent = 'Subscription List';
        } else if (viewKey === 'contact-enquiry-list') {
            populateContactEnquiryTable();
            if (breadcrumbActive) breadcrumbActive.textContent = 'Contact Enquiry';
        } else if (viewKey === 'lead-management-list') {
            populateLeadManagementTable();
            if (breadcrumbActive) breadcrumbActive.textContent = 'Lead Management';
        } else if (viewKey === 'add-newsletter-view') {
            populateNewslettersTable();
            if (breadcrumbActive) breadcrumbActive.textContent = 'Add Newsletter';
        }

        // Update sidebar active state
        navItems.forEach(item => {
            if (item.getAttribute('data-view') === viewKey) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

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
        const createBtn = e.target.closest('.btn-primary, .btn-premium');
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
            } else if (currentView === 'testimonials-list') {
                switchView('create-testimonial');
                if (breadcrumbActive) breadcrumbActive.textContent = 'Create Testimonial';
            } else if (currentView === 'associates-list') {
                switchView('create-associate');
                if (breadcrumbActive) breadcrumbActive.textContent = 'Create Associate';
            } else if (currentView === 'news-list') {
                switchView('create-news');
                if (breadcrumbActive) breadcrumbActive.textContent = 'Add News';
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

        // News Cancel
        if (e.target.id === 'btn-create-news-cancel') {
            switchView('news-list');
            if (breadcrumbActive) breadcrumbActive.textContent = 'News';
        }

        // Testimonial Cancel
        if (e.target.id === 'btn-create-testimonial-cancel') {
            switchView('testimonials-list');
            if (breadcrumbActive) breadcrumbActive.textContent = 'Testimonials List';
        }

        // Associate Cancel
        if (e.target.id === 'btn-create-associate-cancel') {
            switchView('associates-list');
            if (breadcrumbActive) breadcrumbActive.textContent = 'Associates List';
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
                    <div style="display: flex; gap: 8px;">
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
                    <div style="display: flex; gap: 8px;">
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

    const testimonialsData = [
        { sno: 1, name: 'John Doe', email: 'john@example.com', phone: '9876543210', message: 'Great service! Highly recommended.', location: 'New York', image: 'profile1.jpg', status: 'active' },
        { sno: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '9876543211', message: 'Very professional team.', location: 'London', image: 'profile2.jpg', status: 'active' },
        { sno: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '9876543212', message: 'Helped me find my dream home.', location: 'Sydney', image: 'profile3.jpg', status: 'inactive' },
        { sno: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '9876543213', message: 'Smooth transaction process.', location: 'Tokyo', image: 'profile4.jpg', status: 'active' },
        { sno: 5, name: 'David Brown', email: 'david@example.com', phone: '9876543214', message: 'Excellent support throughout.', location: 'Paris', image: 'profile5.jpg', status: 'inactive' }
    ];

    function populateTestimonialsTable() {
        const tbody = document.getElementById('testimonials-table-body');
        if (!tbody) return;

        tbody.innerHTML = testimonialsData.map((item, index) => `
            <tr>
                <td style="font-weight: 500; color: var(--text-muted)">${index + 1}</td>
                <td style="font-weight: 600; color: #64748b;">${item.name}</td>
                <td style="color: var(--text-muted);">${item.email}</td>
                <td style="color: var(--text-muted);">${item.phone}</td>
                <td style="color: var(--text-muted);" title="${item.message}">
                    <div style="max-width: 200px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${item.message}
                    </div>
                </td>
                <td style="color: var(--text-muted);">${item.location}</td>
                <td>
                    <button class="action-btn" title="View Image" style="background:none; border:none; color: #3b82f6; cursor: pointer; padding: 0; display: inline-flex; align-items: center; gap: 4px; font-size: 13px;">
                         <i data-lucide="image" style="width: 14px;"></i>
                         view image
                    </button>
                </td>
                <td>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <button class="action-btn" style="background: #22c55e; color: white; border-radius: 6px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;" title="View">
                             <i data-lucide="eye" style="width: 16px; height: 16px;"></i>
                        </button>
                        <button class="action-btn" style="background: #ef4444; color: white; border-radius: 6px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;" title="Delete">
                             <i data-lucide="x" style="width: 16px; height: 16px;"></i>
                        </button>
                        <button class="status-btn" style="background-color: #3b82f6; color: white; border: none; padding: 6px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">
                            ${item.status === 'active' ? 'Active' : 'Deactive'}
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

    const associatesData = [
        { sno: 1, name: 'Premium Partners', link: 'https://premium.com', image: 'associate1.jpg', status: 'active' },
        { sno: 2, name: 'Global Real Estate', link: 'https://globalre.com', image: 'associate2.jpg', status: 'active' },
        { sno: 3, name: 'Home Solutions', link: 'https://homesol.com', image: 'associate3.jpg', status: 'deactive' },
        { sno: 4, name: 'Elite Builders', link: 'https://elite.com', image: 'associate4.jpg', status: 'active' },
        { sno: 5, name: 'City Living', link: 'https://cityliving.com', image: 'associate5.jpg', status: 'deactive' }
    ];

    function populateAssociatesTable() {
        const tbody = document.getElementById('associates-table-body');
        if (!tbody) return;

        tbody.innerHTML = associatesData.map((item, index) => `
            <tr>
                <td style="font-weight: 500; color: var(--text-muted)">${index + 1}</td>
                <td style="font-weight: 600; color: #64748b;">${item.name}</td>
                <td style="color: #3b82f6; text-decoration: none;">${item.link}</td>
                <td>
                    <button class="action-btn" title="View Image" style="background:none; border:none; color: #3b82f6; cursor: pointer; padding: 0; display: inline-flex; align-items: center; gap: 4px; font-size: 13px;">
                         <i data-lucide="image" style="width: 14px;"></i>
                         view image
                    </button>
                </td>
                <td>
                     <button class="status-btn" style="background-color: #3b82f6; color: white; border: none; padding: 6px 16px; border-radius: 6px; font-size: 13px; font-weight: 600; cursor: pointer;">
                        ${item.status === 'active' ? 'Active' : 'Deactive'}
                    </button>
                </td>
                <td>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <button class="action-btn" style="background: #22c55e; color: white; border-radius: 6px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;" title="View">
                             <i data-lucide="eye" style="width: 16px; height: 16px;"></i>
                        </button>
                        <button class="action-btn" style="background: #ef4444; color: white; border-radius: 6px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;" title="Delete">
                             <i data-lucide="x" style="width: 16px; height: 16px;"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        lucide.createIcons();
    }

    const newsData = [
        { sno: 1, title: 'Buyers to move court against UP-RERA "ongoing projects" clause', description: 'NOIDA: A day after chief minister Yogi Adityanath launched the RERA website to help all promoters, builders and agents to get registered and for buyers to lodge complaints, buyers groups have announce', date: '2017-07-27' },
        { sno: 2, title: 'Haryana RERA portal may be operational in 2-3 months: Dilbag Singh Sihag', description: 'Editor | October 5, 2017 @ 02:05 PM Delhi/NCR: Haryana Real Estate Regulatory Authority\'s portal may get operational over the next 2-3 months, said Dilbag Singh Sihag, Executive Director, Haryana RERA', date: '2017-10-05' },
        { sno: 3, title: '50% drop in housing launches in NCR this Diwali: Report', description: 'Editor | October 5, 2017 @ 11:47 AM Delhi/NCR: A triple whammy from demonetisation, RERA implementation and GST has hit launch of new residential projects in the real-estate hubs of NCR, and the tr', date: '2017-10-05' },
        { sno: 4, title: 'Foreign funds invest $10 billion in realty in 2 years!', description: 'Editor | October 4, 2017 @ 10:42 AM Delhi/NCR With over $10 billion investments in the last two years, which is more than half of the total investments since 2013, the Indian real estate sector ha', date: '2017-10-04' },
        { sno: 5, title: 'Builders assure delivery of 20,000 flats in three months in Noida', description: 'Updated: Oct 05, 2017 22:14 IST | Vinod Rajput | Hindustan Times Builders on Thursday assured a committee of three ministers, appointed by the Uttar Pradesh state cabinet, that they will be delivering', date: '2017-10-05' },
        { sno: 6, title: 'UP to fund Jewar airport, YEIDA to be nodal agency', description: 'Vandana Keelor| TNN | Aug 2, 2017, 12:33 AM IST Greater Noida: The Yamuna Expressway Industrial Development Authority (YEIDA) will be the nodal agency to set up the international airport in Jewar, Gre', date: '2017-08-02' },
        { sno: 7, title: 'Circle rates not to be hiked in Noida this year', description: 'TNN| Updated: Jul 17, 2017, 10:16 AM IST NOIDA: The district administration has decided against increasing the circle rates of property under the three authorities. The decision reflects the groun', date: '2017-07-17' },
        { sno: 8, title: 'Builders give flat buyers one delivery deadline and Rera a later one', description: 'Nauzer Bharucha| TNN | Sep 14, 2017, 03:20 IST MUMBAI: Builders are pushing back the date of delivery of flats by several months and even years as a result of the new real estate law in the', date: '2017-09-14' },
        { sno: 9, title: 'Real estate to get real: How Modi is setting India\'s Housing in order', description: 'ET Online| Date : 30th Nov 2017 It is clear that Prime Minister Narendra Modi wants homes to be more affordable for the masses. The real estate sector has been under his hard gaze as is evident from', date: '2017-11-30' },
        { sno: 10, title: 'Maharashtra to lift construction curbs in eco-sensitive Gorai-Manori belt', description: 'Source: Express News Service | Mumbai | Published: December 2, 2017 6:21 am Image Courtesy: Gorai Pagoda (Express photo) Curbs on construction activity in the eco-sensitive Gorai-Manori belt in Mumbai', date: '2017-12-02' }
    ];

    function populateNewsTable() {
        const tbody = document.getElementById('news-table-body');
        if (!tbody) return;

        tbody.innerHTML = newsData.map(item => `
            <tr>
                <td style="font-weight: 500; color: var(--text-muted)">${item.sno}</td>
                <td style="font-weight: 600; color: #64748b;">${item.title}</td>
                <td style="color: var(--text-muted); font-size: 13px;">
                    <div style="max-width: 400px; display: -webkit-box; -webkit-line-clamp: 1; -webkit-box-orient: vertical; overflow: hidden; text-overflow: ellipsis; line-height: 1.5;">
                        ${item.description}
                    </div>
                </td>
                <td style="color: var(--text-muted); white-space: nowrap;">${item.date}</td>
                <td>
                    <button class="action-btn" title="View Image" style="background:none; border:none; color: #3b82f6; cursor: pointer; padding: 0; display: inline-flex; align-items: center; gap: 4px; font-size: 13px;">
                         <i data-lucide="image" style="width: 14px;"></i>
                         view image
                    </button>
                </td>
                <td>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <button class="action-btn" style="background: #22c55e; color: white; border-radius: 6px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;" title="View">
                             <i data-lucide="eye" style="width: 16px; height: 16px;"></i>
                        </button>
                        <button class="action-btn" style="background: #ef4444; color: white; border-radius: 6px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;" title="Delete">
                             <i data-lucide="x" style="width: 16px; height: 16px;"></i>
                        </button>
                        <button class="status-btn" style="background-color: #3b82f6; color: white; border: none; padding: 6px 16px; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;">
                            Active
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        lucide.createIcons();
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

    // Form Submission Logic
    const testimonialForm = document.getElementById('create-testimonial-form');
    if (testimonialForm) {
        testimonialForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Testimonial submitted successfully!');
            switchView('testimonials-list');
            testimonialForm.reset();
            const preview = document.getElementById('testimonial-image-preview');
            if (preview) {
                preview.style.display = 'none';
                preview.querySelector('img').src = '';
            }
        });
    }

    // Image Preview Logic
    const testimonialImageInput = document.getElementById('testimonial-image-input');
    const testimonialImagePreview = document.getElementById('testimonial-image-preview');

    if (testimonialImageInput && testimonialImagePreview) {
        testimonialImageInput.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    const img = testimonialImagePreview.querySelector('img');
                    img.src = e.target.result;
                    testimonialImagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                testimonialImagePreview.style.display = 'none';
                testimonialImagePreview.querySelector('img').src = '';
            }
        });
    }

    const associateForm = document.getElementById('create-associate-form');
    if (associateForm) {
        associateForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Associate submitted successfully!');
            switchView('associates-list');
            associateForm.reset();
        });
    }

    const newsForm = document.getElementById('create-news-form');
    if (newsForm) {
        newsForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Capture rich text content
            const editor = document.getElementById('news-description-editor');
            const description = editor ? editor.innerHTML : '';

            console.log('Creating news with description:', description);

            alert('News created successfully!');
            switchView('news-list');
            newsForm.reset();

            // Reset editor content
            if (editor) editor.innerHTML = '<p>Start typing your news content here...</p>';

            const preview = document.getElementById('news-image-preview');
            if (preview) preview.style.display = 'none';
        });

        // Initialize Rich Text Editor Toolbar logic
        const editor = document.getElementById('news-description-editor');
        if (editor) {
            // Simple execCommand based toolbar
            document.querySelectorAll('.wp-toolbar-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    const title = btn.getAttribute('title');

                    if (title === 'Bold') document.execCommand('bold', false, null);
                    else if (title === 'Italic') document.execCommand('italic', false, null);
                    else if (title === 'Bullet List') document.execCommand('insertUnorderedList', false, null);
                    else if (title === 'Numbered List') document.execCommand('insertOrderedList', false, null);
                    else if (title === 'Align Left') document.execCommand('justifyLeft', false, null);
                    else if (title === 'Align Center') document.execCommand('justifyCenter', false, null);
                    else if (title === 'Align Right') document.execCommand('justifyRight', false, null);
                    else if (title === 'Insert Link') {
                        const url = prompt('Enter the link URL:');
                        if (url) document.execCommand('createLink', false, url);
                    }
                    else if (title === 'Insert Image') {
                        const url = prompt('Enter the image URL:');
                        if (url) document.execCommand('insertImage', false, url);
                    }

                    editor.focus();
                });
            });

            // Handle Font types (Heading/Paragraph)
            const fontSelect = document.querySelector('.wp-toolbar-select');
            if (fontSelect) {
                fontSelect.addEventListener('change', () => {
                    const value = fontSelect.value;
                    if (value === 'Paragraph') document.execCommand('formatBlock', false, 'p');
                    else if (value === 'Heading 1') document.execCommand('formatBlock', false, 'h1');
                    else if (value === 'Heading 2') document.execCommand('formatBlock', false, 'h2');
                    else if (value === 'Heading 3') document.execCommand('formatBlock', false, 'h3');
                    editor.focus();
                });
            }

            // Word Count logic
            editor.addEventListener('input', () => {
                const text = editor.innerText.trim();
                const words = text ? text.split(/\s+/).length : 0;
                const statusSpan = document.querySelector('.wp-editor-status span:last-child');
                if (statusSpan) statusSpan.textContent = `Word Count: ${words}`;
            });
        }
    }

    const newsImageInput = document.getElementById('news-image-input');
    const newsImagePreview = document.getElementById('news-image-preview');
    if (newsImageInput && newsImagePreview) {
        newsImageInput.addEventListener('change', function () {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    newsImagePreview.querySelector('img').src = e.target.result;
                    newsImagePreview.style.display = 'block';
                };
                reader.readAsDataURL(file);
            } else {
                newsImagePreview.style.display = 'none';
            }
        });
    }

    const subscribersData = [
        { sno: 1, name: 'Suriya Rishi', email: 'suriya.rishi@anti.com', date: '2017-05-31 17:13:27' },
        { sno: 2, name: 'Devesh Kumar', email: 'devesh.k@gmail.com', date: '2017-05-31 17:10:54' },
        { sno: 3, name: 'Anjali Sharma', email: 'anjali.s@outlook.com', date: '2017-05-31 16:41:01' },
        { sno: 4, name: 'Rahul Varma', email: 'rahul.v@example.com', date: '2017-06-05 10:20:15' },
        { sno: 5, name: 'Priya Patel', email: 'priya.p@gmail.com', date: '2017-06-12 14:45:30' },
        { sno: 6, name: 'Amit Singh', email: 'amit.s88@yahoo.com', date: '2017-06-20 09:12:44' },
        { sno: 7, name: 'Sonia Gupta', email: 'sonia.g@outlook.com', date: '2017-07-01 16:33:12' },
        { sno: 8, name: 'Vikram Mehta', email: 'vikram.m@company.in', date: '2017-07-10 11:05:55' },
        { sno: 9, name: 'Anjali Desai', email: 'anjali_d@live.com', date: '2017-07-15 13:50:22' },
        { sno: 10, name: 'Rajesh Khanna', email: 'rajesh.k@protonmail.com', date: '2017-07-22 18:22:11' },
        { sno: 11, name: 'Sneha Rao', email: 'sneha.rao@gmail.com', date: '2017-08-05 10:15:22' },
        { sno: 12, name: 'Karan Malhotra', email: 'karan.m@yahoo.com', date: '2017-08-12 11:30:45' },
        { sno: 13, name: 'Pooja Hegde', email: 'pooja.h@outlook.com', date: '2017-08-18 14:20:10' },
        { sno: 14, name: 'Arjun Kapoor', email: 'arjun.k@example.com', date: '2017-09-02 09:10:55' },
        { sno: 15, name: 'Neha Kakkar', email: 'neha.k@gmail.com', date: '2017-09-10 16:45:33' },
        { sno: 16, name: 'Siddharth Roy', email: 'sid.roy@company.com', date: '2017-09-15 13:22:11' },
        { sno: 17, name: 'Esha Gupta', email: 'esha.g@live.com', date: '2017-10-01 11:05:44' },
        { sno: 18, name: 'Varun Dhawan', email: 'varun.d@yahoo.com', date: '2017-10-08 15:40:22' },
        { sno: 19, name: 'Alia Bhatt', email: 'alia.b@outlook.com', date: '2017-10-15 10:12:33' },
        { sno: 20, name: 'Ranbir Kapoor', email: 'ranbir.k@gmail.com', date: '2017-10-22 17:55:44' },
        { sno: 21, name: 'Deepika P', email: 'deepika.p@example.com', date: '2017-11-05 12:30:11' },
        { sno: 22, name: 'Ranveer S', email: 'ranveer.s@yahoo.com', date: '2017-11-12 09:44:22' },
        { sno: 23, name: 'Katrina K', email: 'katrina.k@outlook.com', date: '2017-11-20 14:20:55' },
        { sno: 24, name: 'Vicky K', email: 'vicky.k@gmail.com', date: '2017-12-01 10:05:33' },
        { sno: 25, name: 'Ayushmann K', email: 'ayush.k@example.com', date: '2017-12-10 16:40:44' }
    ];

    function populateSubscribersTable() {
        const tbody = document.getElementById('subscribers-table-body');
        if (!tbody) return;

        tbody.innerHTML = subscribersData.map(item => `
            <tr>
                <td><input type="checkbox" class="subscriber-checkbox"></td>
                <td style="font-weight: 500; color: var(--text-muted)">${item.sno}</td>
                <td style="font-weight: 600; color: #64748b;">${item.name || '---'}</td>
                <td style="color: var(--text-muted);">${item.email}</td>
                <td style="color: var(--text-muted);">${item.date}</td>
            </tr>
        `).join('');

        // Handle Select All
        const selectAll = document.getElementById('select-all-subscribers');
        if (selectAll) {
            selectAll.addEventListener('change', (e) => {
                document.querySelectorAll('.subscriber-checkbox').forEach(cb => {
                    cb.checked = e.target.checked;
                });
            });
        }
    }

    // Add NewsLetter Button logic
    const addNewsletterBtn = document.getElementById('btn-add-newsletter');
    if (addNewsletterBtn) {
        addNewsletterBtn.addEventListener('click', () => {
            switchView('add-newsletter-view');
        });
    }

    // View Subscribers Button logic
    const viewSubscribersBtn = document.getElementById('btn-view-subscribers');
    if (viewSubscribersBtn) {
        viewSubscribersBtn.addEventListener('click', () => {
            switchView('subscribers-list');
        });
    }

    // Add Newsletter Form logic
    const addNewsletterForm = document.getElementById('add-newsletter-form');
    if (addNewsletterForm) {
        addNewsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Newsletter saved successfully!');
            addNewsletterForm.reset();
            populateNewslettersTable(); // Refresh table (mock)
        });
    }

    // Send Newsletter Form logic
    const sendNewsletterForm = document.getElementById('send-newsletter-form');
    if (sendNewsletterForm) {
        sendNewsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Newsletter sent successfully!');
            sendNewsletterForm.reset();
        });
    }

    const contactEnquiryData = [
        { sno: 1, name: 'Suriya Rishi', email: 'suriya.rishi@anti.com', phone: '9876543210', subject: 'Project Enquiry', message: 'Interested in the new downtown project.', date: '2017-05-31 17:13:27' },
        { sno: 2, name: 'Rahul Varma', email: 'rahul.v@example.com', phone: '9123456780', subject: 'Pricing Details', message: 'Can you send the pricing for 3BHK?', date: '2017-06-05 10:20:15' },
        { sno: 3, name: 'Priya Patel', email: 'priya.p@gmail.com', phone: '8899776655', subject: 'Site Visit', message: 'I would like to schedule a site visit.', date: '2017-06-12 14:45:30' },
        { sno: 4, name: 'Amit Singh', email: 'amit.s88@yahoo.com', phone: '7766554433', subject: 'Loan Options', message: 'What are the available loan options?', date: '2017-06-20 09:12:44' },
        { sno: 5, name: 'Sonia Gupta', email: 'sonia.g@outlook.com', phone: '9988776655', subject: 'General Enquiry', message: 'Looking for investment opportunities.', date: '2017-07-01 16:33:12' }
    ];

    function populateContactEnquiryTable() {
        const tbody = document.getElementById('contact-enquiry-table-body');
        if (!tbody) return;

        tbody.innerHTML = contactEnquiryData.map(item => `
            <tr>
                <td style="font-weight: 500; color: var(--text-muted)">${item.sno}</td>
                <td style="font-weight: 600; color: #64748b;">${item.name}</td>
                <td style="color: var(--text-muted);">${item.email}</td>
                <td style="color: var(--text-muted);">${item.phone}</td>

                <td style="color: var(--text-muted); font-size: 13px;">
                    <div style="max-width: 250px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        ${item.message}
                    </div>
                </td>
                <td style="color: var(--text-muted); white-space: nowrap;">${item.date}</td>
            </tr>
        `).join('');

        lucide.createIcons();
    }

    const leadManagementData = [
        { sno: 1, name: 'Suriya Rishi', type: 'Buyer', phone: '9876543210', date: '2017-05-31', status: 'New' },
        { sno: 2, name: 'Rahul Varma', type: 'Seller', phone: '9123456780', date: '2017-06-05', status: 'In Progress' },
        { sno: 3, name: 'Priya Patel', type: 'Investor', phone: '8899776655', date: '2017-06-12', status: 'Converted' },
        { sno: 4, name: 'Amit Singh', type: 'Buyer', phone: '7766554433', date: '2017-06-20', status: 'Closed' },
        { sno: 5, name: 'Sonia Gupta', type: 'Renter', phone: '9988776655', date: '2017-07-01', status: 'New' }
    ];

    function populateLeadManagementTable() {
        const tbody = document.getElementById('lead-management-table-body');
        if (!tbody) return;

        tbody.innerHTML = leadManagementData.map(item => `
            <tr>
                <td style="font-weight: 500; color: var(--text-muted)">${item.sno}</td>
                <td style="font-weight: 600; color: #64748b;">${item.name}</td>
                <td style="color: var(--text-muted);">${item.type}</td>
                <td style="color: var(--text-muted);">${item.phone}</td>
                <td style="color: var(--text-muted);">${item.date}</td>
                <td>
                    <span class="status-btn" style="background-color: ${getStatusColor(item.status)}; color: white; padding: 4px 12px; border-radius: 6px; font-size: 12px; font-weight: 600;">
                        ${item.status}
                    </span>
                </td>
                <td>
                    <div style="display: flex; gap: 8px; align-items: center;">
                        <button class="action-btn" style="background: #22c55e; color: white; border-radius: 6px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;" title="View">
                                <i data-lucide="eye" style="width: 16px; height: 16px;"></i>
                        </button>
                        <button class="action-btn" style="background: #ef4444; color: white; border-radius: 6px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;" title="Delete">
                                <i data-lucide="x" style="width: 16px; height: 16px;"></i>
                        </button>
                    </div>
                </td>
            </tr>
        `).join('');

        lucide.createIcons();
    }

    const newslettersData = [
        { sno: 1, title: 'Weekly Updates', date: '2017-06-01' },
        { sno: 2, title: 'Monthly Digest', date: '2017-06-05' }
    ];

    function populateNewslettersTable() {
        const tbody = document.getElementById('newsletters-history-table-body');
        if (!tbody) return;

        tbody.innerHTML = newslettersData.map(item => `
            <tr>
                <td style="font-weight: 500; color: var(--text-muted)">${item.sno}</td>
                <td style="font-weight: 600; color: #64748b;">${item.title}</td>
                <td style="color: var(--text-muted);">${item.date}</td>
                <td>
                    <button class="action-btn" style="background: #ef4444; color: white; border-radius: 6px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;" title="Delete">
                            <i data-lucide="x" style="width: 16px; height: 16px;"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        lucide.createIcons();
    }

    function getStatusColor(status) {
        switch (status) {
            case 'New': return '#3b82f6'; // Blue
            case 'In Progress': return '#f59e0b'; // Amber
            case 'Converted': return '#10b981'; // Green
            case 'Closed': return '#ef4444'; // Red
            default: return '#64748b'; // Slate
        }
    }

    // Export switchView globally
    window.switchView = switchView;
});
