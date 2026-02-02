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
        'add-property': document.getElementById('add-property-view'),
        'project-attr-cat': document.getElementById('project-attr-cat-list-view'),
        'create-project-attr-cat': document.getElementById('create-project-attr-cat-view'),
        'project-attr': document.getElementById('project-attr-list-view'),
        'create-project-attr': document.getElementById('create-project-attr-view'),
        'project-list': document.getElementById('project-list-view'),
        'create-project': document.getElementById('create-project-view')
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
        } else if (viewKey === 'create-project') {
            if (window.resetCreateProjectForm) window.resetCreateProjectForm();
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

    // Handle Buttons from views
    document.addEventListener('click', (e) => {
        // Create button (dynamic check for both List views)
        const createBtn = e.target.closest('.btn-primary');
        if (createBtn && createBtn.textContent.trim().includes('Create')) {
            const currentView = Object.keys(views).find(key => views[key].style.display === 'block');

            if (currentView === 'property-list') {
                switchView('add-property');
                if (breadcrumbActive) breadcrumbActive.textContent = 'Add Property';
            } else if (currentView === 'project-list') {
                switchView('create-project');
                if (breadcrumbActive) breadcrumbActive.textContent = 'Add Project';
            } else if (currentView === 'project-attr-cat') {
                switchView('create-project-attr-cat');
                if (breadcrumbActive) breadcrumbActive.textContent = 'Create Project Attributes Category';
            } else if (currentView === 'project-attr') {
                switchView('create-project-attr');
                if (breadcrumbActive) breadcrumbActive.textContent = 'Create Project Attributes';
            } else {
                switchView('create-category');
                if (breadcrumbActive) breadcrumbActive.textContent = 'Create Property Category';
            }
        }

        // Cancel button in Form
        if (e.target.classList.contains('btn-cancel')) {
            switchView('categories');
            if (breadcrumbActive) breadcrumbActive.textContent = 'Property Category';
        }

        // Project Form Cancel (from Step 1)
        if (e.target.id === 'btn-project-prev' && window.currentProjectStep === 1) {
            switchView('project-list');
            if (breadcrumbActive) breadcrumbActive.textContent = 'Project Management';
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

        // Add Project Form Navigation (Refactored for reliability)
        if (e.target.closest('#create-project-view')) {
            const btn = e.target.closest('.btn');
            if (btn) {
                const btnId = btn.id;

                if (btnId === 'btn-project-next') {
                    if (window.currentProjectStep < 4) {
                        window.currentProjectStep++;
                        if (typeof window.updateProjectStep === 'function') {
                            window.updateProjectStep(window.currentProjectStep);
                        }
                    }
                } else if (btnId === 'btn-project-prev') {
                    if (window.currentProjectStep > 1) {
                        window.currentProjectStep--;
                        if (typeof window.updateProjectStep === 'function') {
                            window.updateProjectStep(window.currentProjectStep);
                        }
                    } else {
                        switchView('project-list');
                    }
                } else if (btnId === 'btn-project-finish') {
                    alert('Project created successfully!');
                    switchView('project-list');
                }
            }
        }

        // Add Property Form Navigation
        if (e.target.closest('#add-property-view')) {
            const btn = e.target.closest('.btn');
            if (btn) {
                const btnId = btn.id;
                const btnText = btn.textContent.trim();
                const stepperItems = document.querySelectorAll('#add-property-view .stepper-item');

                // Initialize current step if not defined
                if (window.currentAddPropStep === undefined) window.currentAddPropStep = 1;

                const navigate = (direction) => {
                    const currentStepEl = document.getElementById(`step-${window.currentAddPropStep}-content`);
                    let nextStep = window.currentAddPropStep + direction;

                    if (nextStep < 1 || nextStep > 4) return;

                    const nextStepEl = document.getElementById(`step-${nextStep}-content`);
                    const nextBtn = document.getElementById('btn-add-prop-next');
                    const prevBtn = document.getElementById('btn-add-prop-prev');

                    // Animated Transition
                    currentStepEl.style.transition = 'all 0.3s ease';
                    currentStepEl.style.opacity = '0';
                    currentStepEl.style.transform = direction > 0 ? 'translateX(-20px)' : 'translateX(20px)';

                    setTimeout(() => {
                        currentStepEl.style.display = 'none';
                        nextStepEl.style.display = 'block';
                        nextStepEl.style.opacity = '0';
                        nextStepEl.style.transform = direction > 0 ? 'translateX(20px)' : 'translateX(-20px)';

                        // Force reflow
                        nextStepEl.offsetHeight;

                        nextStepEl.style.transition = 'all 0.3s ease';
                        nextStepEl.style.opacity = '1';
                        nextStepEl.style.transform = 'translateX(0)';

                        // Update Stepper
                        stepperItems.forEach((item, idx) => {
                            const stepIdx = idx + 1;
                            item.classList.remove('active', 'completed');
                            if (stepIdx < nextStep) item.classList.add('completed');
                            if (stepIdx === nextStep) item.classList.add('active');
                        });

                        // Update Button Text
                        if (nextStep === 4) {
                            nextBtn.querySelector('span').textContent = 'Submit';
                        } else {
                            nextBtn.querySelector('span').textContent = 'Continue';
                        }

                        if (nextStep === 1) {
                            prevBtn.textContent = 'Cancel';
                        } else {
                            prevBtn.textContent = 'Back';
                        }

                        window.currentAddPropStep = nextStep;
                    }, 300);
                };

                if (btnId === 'btn-add-prop-next') {
                    if (window.currentAddPropStep === 4) {
                        // Submit - go back to list
                        switchView('property-list');
                        if (breadcrumbActive) breadcrumbActive.textContent = 'Property/ data view';
                        // Reset for next time (handled in switchView or here)
                        setTimeout(() => resetAddPropertyForm(), 500);
                    } else {
                        navigate(1);
                    }
                } else if (btnId === 'btn-add-prop-prev') {
                    if (window.currentAddPropStep === 1) {
                        // Cancel - go back to list
                        switchView('property-list');
                        if (breadcrumbActive) breadcrumbActive.textContent = 'Property/ data view';
                        setTimeout(() => resetAddPropertyForm(), 500);
                    } else {
                        navigate(-1);
                    }
                }
            }
        }

        function resetAddPropertyForm() {
            window.currentAddPropStep = 1;
            const stepperItems = document.querySelectorAll('#add-property-view .stepper-item');
            const nextBtn = document.getElementById('btn-add-prop-next');
            const prevBtn = document.getElementById('btn-add-prop-prev');

            for (let i = 1; i <= 4; i++) {
                const el = document.getElementById(`step-${i}-content`);
                if (el) {
                    el.style.display = i === 1 ? 'block' : 'none';
                    el.style.opacity = '1';
                    el.style.transform = 'none';
                }
            }

            stepperItems.forEach((item, idx) => {
                item.classList.remove('active', 'completed');
                if (idx === 0) item.classList.add('active');
            });

            if (nextBtn) nextBtn.querySelector('span').textContent = 'Continue';
            if (prevBtn) prevBtn.textContent = 'Cancel';
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
            <td style="font-weight: 500; color: var(--text-muted); text-align: center;">${item.sno}</td>
            <td style="text-align: center; color: var(--text-muted);">${item.postedBy}</td>
            <td style="text-align: center;"><span style="color: #64748b; font-weight: 500;">${item.title || ''}</span></td>
            <td style="text-align: center; color: var(--text-muted);">${item.for}</td>
            <td style="text-align: center; color: var(--text-muted);">${item.type}</td>
            <td style="text-align: center; color: var(--text-muted);">${item.location}</td>
            <td>
                <div style="display: flex; align-items: center; justify-content: center; gap: 4px;">
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
            <td style="font-weight: 500; color: var(--text-muted); text-align: center;">${item.sno}</td>
            <td style="text-align: center; color: var(--text-muted);">${item.postedBy}</td>
            <td style="text-align: center;"><span style="color: #64748b; font-weight: 500;">${item.name}</span></td>
            <td style="text-align: center; color: var(--text-muted);">${item.for}</td>
            <td style="text-align: center; color: var(--text-muted);">${item.type}</td>
            <td style="text-align: center; color: var(--text-muted);">${item.url}</td>
            <td>
                <div style="display: flex; align-items: center; justify-content: center; gap: 4px;">
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
                <td style="text-align: center;"><span style="font-weight: 600; color: #64748b;">${item.name}</span></td>
                <td style="text-align: right;">
                    <div style="display: flex; gap: 8px; justify-content: flex-end;">
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



    function initCreateProjectFormLogic() {
        window.currentProjectStep = 1;
        const totalSteps = 4;
        const stepperItems = document.querySelectorAll('#project-stepper .stepper-item');
        const nextBtn = document.getElementById('btn-project-next');
        const prevBtn = document.getElementById('btn-project-prev');
        const finishBtn = document.getElementById('btn-project-finish');

        window.updateProjectStep = function (step) {
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
            if (prevBtn) prevBtn.style.display = 'block';
            if (nextBtn) {
                nextBtn.style.display = (step === totalSteps) ? 'none' : 'block';
                const span = nextBtn.querySelector('span');
                if (span) span.textContent = 'Next';
            }
            if (finishBtn) {
                finishBtn.style.display = (step === totalSteps) ? 'block' : 'none';
            }

            lucide.createIcons();
        };

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
                        <input type="text" class="form-control-premium" style="background-color: #F1F5F9; border-color: #CBD5E1;" placeholder="Unit">
                        <input type="text" class="form-control-premium" style="background-color: #F1F5F9; border-color: #CBD5E1;" placeholder="Price">
                        <button type="button" class="btn btn-remove" style="background: #FFF1F2; color: #E11D48; border: 1px solid #FFE4E6; height: 42px; width: 100%; min-width: 80px; font-size: 13px; border-radius: 6px;">Remove</button>
                    </div>
                `;
                unitsContainer.appendChild(newRow);
                newRow.querySelector('.btn-remove').addEventListener('click', () => newRow.remove());
            });
        }

        // Add More Photo logic
        const addPhotoBtn = document.getElementById('btn-add-photo');
        const photoContainer = document.getElementById('photo-upload-container');
        if (addPhotoBtn && photoContainer) {
            addPhotoBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const newRow = document.createElement('div');
                newRow.className = 'form-row-horizontal photo-row';
                newRow.style.marginTop = '12px';
                newRow.innerHTML = `
                    <label></label>
                    <div style="display: grid; grid-template-columns: 1fr auto; gap: 12px; align-items: center;">
                        <select class="form-control-premium" style="background-color: #F8FAFC; border: 1px solid #E2E8F0;">
                            <option>Project Photo</option>
                            <option>Amenity Photo</option>
                            <option>Location Photo</option>
                        </select>
                        <button type="button" class="btn btn-remove" style="background: #FFF1F2; color: #E11D48; border: 1px solid #FFE4E6; height: 42px; min-width: 80px; font-size: 13px; border-radius: 6px; padding: 0 16px;">Remove</button>
                    </div>
                `;
                photoContainer.appendChild(newRow);
                newRow.querySelector('.btn-remove').addEventListener('click', () => newRow.remove());
            });
        }

        // Initialize state
        window.updateProjectStep(1);
    }

    // Kick off initial view
    initDashboard();
    initCreateProjectFormLogic();
});
