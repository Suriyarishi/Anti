export class SubscribersComponent {
    constructor() {
        this.subscribersData = [
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

        this.newslettersData = [
            { sno: 1, title: 'Real Estate Trends 2024', createdDate: '2024-01-15 10:30:00' },
            { sno: 2, title: 'New Project Launch - Sky Gardens', createdDate: '2024-02-01 14:15:00' },
            { sno: 3, title: 'Investment Opportunities in Downtown', createdDate: '2024-02-10 09:45:00' }
        ];

        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        this.renderListView();
        this.renderAddNewsletterView();
        this.attachEvents();
        this.initialized = true;
    }

    getListViewTemplate() {
        return `
            <div class="table-card" style="margin-bottom: 24px;">
                <div class="table-header">
                    <div>
                        <h3 class="chart-title">Subscribers List</h3>
                    </div>
                    <button class="btn btn-primary" id="btn-add-newsletter">
                        <i data-lucide="mail"></i>
                        <span>Add NewsLetter</span>
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

                <div style="padding: 16px 24px; border-bottom: 1px solid var(--border); background: #fff;">
                    <h4 style="font-size: 14px; font-weight: 600; color: var(--text-main);">Select Subscribers</h4>
                </div>

                <div class="table-container">
                    <table class="sortable-table">
                        <thead>
                            <tr>
                                <th style="width: 40px;"><input type="checkbox" id="select-all-subscribers"></th>
                                <th style="width: 80px;">S No.</th>
                                <th style="flex: 1;">Name</th>
                                <th style="flex: 1;">Email</th>
                                <th style="width: 200px;">Subscribe On</th>
                            </tr>
                        </thead>
                        <tbody id="subscribers-table-body">
                            <!-- Populated via JS -->
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    getAddNewsletterViewTemplate() {
        return `
            <div class="form-card">
                <div class="form-header-premium">
                    <div>
                        <button class="btn" id="btn-view-subscribers"
                            style="background: #10B981; color: white; border: none; padding: 8px 16px; font-size: 13px; font-weight: 600; margin-bottom: 16px;">
                            VIEW SUBSCRIBERS
                        </button>
                        <h3 class="chart-title">Add Newsletter</h3>
                    </div>
                </div>

                <form id="add-newsletter-form">
                    <div class="form-group" style="margin-bottom: 24px;">
                        <label
                            style="display: block; font-size: 13px; font-weight: 600; color: var(--text-muted); margin-bottom: 8px;">Newsletter
                            Title <span style="color: #ef4444;">*</span></label>
                        <input type="text" id="newsletter-title" class="form-control-premium" placeholder="Enter title"
                            required style="width: 100%;">
                    </div>

                    <div class="form-group" style="margin-bottom: 24px;">
                        <label
                            style="display: block; font-size: 13px; font-weight: 600; color: var(--text-muted); margin-bottom: 8px;">Newsletter
                            Details <span style="color: #ef4444;">*</span></label>
                        <textarea id="newsletter-details" class="form-control-premium" rows="6" placeholder="Enter details"
                            required style="width: 100%;"></textarea>
                    </div>

                    <div class="form-group" style="margin-bottom: 24px;">
                        <label
                            style="display: block; font-size: 13px; font-weight: 600; color: var(--text-muted); margin-bottom: 8px;">Newsletter
                            Image <span style="color: #ef4444;">*</span></label>
                        <input type="file" id="newsletter-image" class="form-control-premium" accept="image/*"
                            required style="width: 100%; padding: 8px;">
                    </div>

                    <div style="display: flex; justify-content: center;">
                        <button type="submit" class="btn btn-primary"
                            style="background: #10B981; min-width: 100px;">save</button>
                    </div>
                </form>
            </div>

            <!-- Newsletters List -->
            <div class="table-card" style="margin-top: 32px;">
                <div class="table-header">
                    <div>
                        <h3 class="chart-title">Newsletters</h3>
                    </div>
                    <div class="table-actions">
                        <button class="btn-icon" title="CSV">CSV</button>
                        <button class="btn-icon" title="Excel">Excel</button>
                        <button class="btn-icon" title="PDF">PDF</button>
                        <button class="btn-icon" title="Print">Print</button>
                    </div>
                </div>
                <div class="table-controls"
                    style="padding: 16px 24px; display: flex; justify-content: flex-end; align-items: center; background: #F8FAFC; border-bottom: 1px solid var(--border);">
                    <div class="search-bar" style="width: 240px;">
                        <label style="font-size: 13px; color: var(--text-muted); margin-right: 8px;">Search:</label>
                        <input type="text"
                            style="height: 30px; font-size: 12px; border: 1px solid var(--border); padding: 4px 8px;">
                    </div>
                </div>

                <div class="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th style="width: 60px;">
                                    <div class="th-content">S No.</div>
                                </th>
                                <th>
                                    <div class="th-content">Title</div>
                                </th>
                                <th style="width: 200px;">
                                    <div class="th-content">Created Date</div>
                                </th>
                                <th style="width: 100px;">
                                    <div class="th-content">Action</div>
                                </th>
                            </tr>
                        </thead>
                        <tbody id="newsletters-table-body">
                            <!-- Populated by JS -->
                        </tbody>
                    </table>
                </div>
                <div class="table-footer">
                    <div class="showing-entries">Showing 1 to 2 of 2 entries</div>
                    <div class="pagination" style="display: flex; gap: 4px;">
                        <button class="btn" style="padding: 6px 12px; font-size: 12px; background: #F1F5F9;">Previous</button>
                        <button class="btn" style="padding: 6px 12px; font-size: 12px; background: var(--primary); color: white;">1</button>
                        <button class="btn" style="padding: 6px 12px; font-size: 12px; background: #F1F5F9;">Next</button>
                    </div>
                </div>
            </div>
        `;
    }

    renderListView() {
        const container = document.getElementById('subscribers-list-view');
        if (!container) return;
        container.innerHTML = this.getListViewTemplate();
        this.populateSubscribersTable();
    }

    renderAddNewsletterView() {
        const container = document.getElementById('add-newsletter-view');
        if (!container) return;
        container.innerHTML = this.getAddNewsletterViewTemplate();
        this.populateNewslettersTable();
    }

    populateSubscribersTable() {
        const tbody = document.getElementById('subscribers-table-body');
        if (!tbody) return;

        tbody.innerHTML = this.subscribersData.map(item => `
            <tr>
                <td><input type="checkbox" class="subscriber-checkbox"></td>
                <td style="font-weight: 500; color: var(--text-muted)">${item.sno}</td>
                <td style="font-weight: 600; color: #64748b;">${item.name || '---'}</td>
                <td style="color: var(--text-muted);">${item.email}</td>
                <td style="color: var(--text-muted);">${item.date}</td>
            </tr>
        `).join('');

        if (window.lucide) window.lucide.createIcons();

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

    populateNewslettersTable() {
        const tbody = document.getElementById('newsletters-table-body');
        if (!tbody) return;

        tbody.innerHTML = this.newslettersData.map(item => `
            <tr>
                <td style="font-weight: 500; color: var(--text-muted)">${item.sno}</td>
                <td style="font-weight: 600; color: #64748b;">${item.title}</td>
                <td style="color: var(--text-muted);">${item.createdDate}</td>
                <td>
                    <button class="action-btn" style="background: #ef4444; color: white; border-radius: 6px; width: 32px; height: 32px; display: flex; align-items: center; justify-content: center;" title="Delete">
                        <i data-lucide="trash-2" style="width: 16px; height: 16px;"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        if (window.lucide) window.lucide.createIcons();
    }

    attachEvents() {
        // Add Newsletter Button
        // Use document body delegation or check existence if rendered
        // Since we re-render on switch usually, or we can check attached state
        // Simplest is to delegate from document level in main.js OR attach here if we know elements exist.
        // But init() is called ONCE.
        // renderListView() overwrites HTML, so listeners attached to inner elements are lost unless re-attached.
        // BETTER STRATEGY: Attach listener to a stable parent or re-attach after render.
        // For this refactor, I'll attach to the CONTAINER (which is stable) using event delegation.

        const subContainer = document.getElementById('subscribers-list-view');
        if (subContainer) {
            subContainer.addEventListener('click', (e) => {
                if (e.target.closest('#btn-add-newsletter')) {
                    e.stopPropagation(); // Prevent global listener from firing
                    if (window.switchView) window.switchView('add-newsletter-view');
                }
            });
        }

        const newsContainer = document.getElementById('add-newsletter-view');
        if (newsContainer) {
            newsContainer.addEventListener('click', (e) => {
                if (e.target.closest('#btn-view-subscribers')) {
                    if (window.switchView) window.switchView('subscribers-list');
                }
            });

            // Form Submit (using delegation for form inside container)
            // But form submit doesn't bubble like click? HTML forms do bubble submit events.
            newsContainer.addEventListener('submit', (e) => {
                if (e.target.id === 'add-newsletter-form') {
                    e.preventDefault();
                    alert('Newsletter saved successfully!');
                    e.target.reset();
                    // Maybe refresh table?
                }
            });
        }
    }
}
