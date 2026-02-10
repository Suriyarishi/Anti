export class AssociatesComponent {
    constructor() {
        this.associatesData = [
            { sno: 1, name: 'Premium Partners', link: 'https://premium.com', image: 'associate1.jpg', status: 'active' },
            { sno: 2, name: 'Global Real Estate', link: 'https://globalre.com', image: 'associate2.jpg', status: 'active' },
            { sno: 3, name: 'Home Solutions', link: 'https://homesol.com', image: 'associate3.jpg', status: 'deactive' },
            { sno: 4, name: 'Elite Builders', link: 'https://elite.com', image: 'associate4.jpg', status: 'active' },
            { sno: 5, name: 'City Living', link: 'https://cityliving.com', image: 'associate5.jpg', status: 'deactive' }
        ];
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        this.renderListView();
        this.renderCreateView();
        this.attachEvents();
        this.initialized = true;
    }

    getListViewTemplate() {
        return `
            <div class="table-card">
                <div class="table-header">
                    <div>
                        <h3 class="chart-title">Associates List</h3>
                    </div>
                    <button class="btn btn-primary" id="btn-add-associate">
                        <i data-lucide="plus"></i>
                        <span>Add Associate</span>
                    </button>
                </div>

                <div class="table-controls"
                    style="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; background: #F8FAFC; border-bottom: 1px solid var(--border);">
                    <div
                        style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--text-muted);">
                        <span>Show</span>
                        <select
                            style="padding: 4px 8px; border-radius: 6px; border: 1px solid var(--border); outline: none;">
                            <option>10</option>
                            <option>25</option>
                            <option>50</option>
                        </select>
                        <span>entries</span>
                    </div>
                    <div class="search-bar" style="width: 240px;">
                        <i data-lucide="search" style="width: 14px;"></i>
                        <input type="text" placeholder="Search..." style="height: 36px; font-size: 12px;">
                    </div>
                </div>

                <div class="table-container">
                    <table class="sortable-table">
                        <thead>
                            <tr>
                                <th style="width: 60px;">
                                    <div class="th-content">S.no. <i data-lucide="chevrons-up-down"
                                            class="sort-icon" style="width: 12px;"></i></div>
                                </th>
                                <th>
                                    <div class="th-content">Name <i data-lucide="chevrons-up-down" class="sort-icon"
                                            style="width: 12px;"></i></div>
                                </th>
                                <th>
                                    <div class="th-content">Link <i data-lucide="chevrons-up-down"
                                            class="sort-icon" style="width: 12px;"></i></div>
                                </th>
                                <th>
                                    <div class="th-content">Image <i data-lucide="chevrons-up-down"
                                            class="sort-icon" style="width: 12px;"></i></div>
                                </th>
                                <th>
                                    <div class="th-content">Status <i data-lucide="chevrons-up-down"
                                            class="sort-icon" style="width: 12px;"></i></div>
                                </th>
                                <th>
                                    <div class="th-content">Action <i data-lucide="chevrons-up-down"
                                            class="sort-icon" style="width: 12px;"></i></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody id="associates-table-body">
                            <!-- Populated via JS -->
                        </tbody>
                    </table>
                </div>
                <div
                    style="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border);">
                    <span style="font-size: 13px; color: var(--text-muted);">Showing 1 to 10 of 17 entries</span>
                    <div style="display: flex; gap: 4px;">
                        <button class="btn"
                            style="padding: 6px 12px; font-size: 12px; background: #E2E8F0;">Previous</button>
                        <button class="btn"
                            style="padding: 6px 12px; font-size: 12px; background: #E2E8F0;">1</button>
                        <button class="btn"
                            style="padding: 6px 12px; font-size: 12px; background: #E2E8F0;">2</button>
                        <button class="btn"
                            style="padding: 6px 12px; font-size: 12px; background: #E2E8F0;">Next</button>
                    </div>
                </div>
            </div>
        `;
    }

    getCreateViewTemplate() {
        return `
            <div class="table-card">
                <div class="table-header">
                    <div>
                        <h3 class="chart-title">Create Associate</h3>
                        <p class="chart-subtitle" style="margin-top: 4px;">Add a new partner or associate</p>
                    </div>
                </div>

                <div style="padding: 32px;">
                    <form id="create-associate-form">
                        <div class="form-row-horizontal">
                            <label>Name <span style="color:red">*</span></label>
                            <input type="text" class="form-control-premium" placeholder="Enter name" required>
                        </div>

                        <div class="form-row-horizontal">
                            <label>Link <span style="color:red">*</span></label>
                            <input type="url" class="form-control-premium"
                                placeholder="Enter link (e.g., https://example.com)" required>
                        </div>

                        <div class="form-row-horizontal">
                            <label>Associate Image <span style="color:red">*</span></label>
                            <div
                                style="flex: 2; display: flex; align-items: center; gap: 12px; border: 1px solid var(--border); padding: 8px 12px; border-radius: 8px;">
                                <input type="file" required style="font-size: 13px; color: var(--text-muted);">
                            </div>
                        </div>

                        <div
                            style="margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--border); display: flex; gap: 12px; justify-content: flex-start;">
                            <button type="button" class="btn" id="btn-create-associate-cancel"
                                style="background: #3b82f6; color: white; padding: 10px 24px;">Cancel</button>
                            <button type="submit" class="btn"
                                style="background: #10b981; color: white; padding: 10px 24px;">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        `;
    }

    renderListView() {
        const container = document.getElementById('associates-list-view');
        if (!container) return;
        container.innerHTML = this.getListViewTemplate();
        this.populateTable();
    }

    renderCreateView() {
        const container = document.getElementById('create-associate-view');
        if (!container) return;
        container.innerHTML = this.getCreateViewTemplate();
    }

    populateTable() {
        const tbody = document.getElementById('associates-table-body');
        if (!tbody) return;

        tbody.innerHTML = this.associatesData.map((item, index) => `
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

        if (window.lucide) window.lucide.createIcons();
    }

    attachEvents() {
        const listContainer = document.getElementById('associates-list-view');
        if (listContainer) {
            listContainer.addEventListener('click', (e) => {
                if (e.target.closest('#btn-add-associate')) {
                    e.stopPropagation();
                    if (window.switchView) window.switchView('create-associate');
                }
            });
        }

        const createContainer = document.getElementById('create-associate-view');
        if (createContainer) {
            createContainer.addEventListener('click', (e) => {
                if (e.target.closest('#btn-create-associate-cancel')) {
                    if (window.switchView) window.switchView('associates-list');
                }
            });

            const form = document.getElementById('create-associate-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    alert('Associate Added Successfully');
                    if (window.switchView) window.switchView('associates-list');
                });
            }
        }
    }
}
