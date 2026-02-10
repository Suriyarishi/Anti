export class TestimonialsComponent {
    constructor() {
        this.testimonialsData = [
            { sno: 1, name: 'John Doe', email: 'john@example.com', phone: '9876543210', message: 'Great service! Highly recommended.', location: 'New York', image: 'profile1.jpg', status: 'active' },
            { sno: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '9876543211', message: 'Very professional team.', location: 'London', image: 'profile2.jpg', status: 'active' },
            { sno: 3, name: 'Mike Johnson', email: 'mike@example.com', phone: '9876543212', message: 'Helped me find my dream home.', location: 'Sydney', image: 'profile3.jpg', status: 'inactive' },
            { sno: 4, name: 'Sarah Wilson', email: 'sarah@example.com', phone: '9876543213', message: 'Smooth transaction process.', location: 'Tokyo', image: 'profile4.jpg', status: 'active' },
            { sno: 5, name: 'David Brown', email: 'david@example.com', phone: '9876543214', message: 'Excellent support throughout.', location: 'Paris', image: 'profile5.jpg', status: 'inactive' }
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
                        <h3 class="chart-title">Testimonials List</h3>
                    </div>
                    <button class="btn btn-primary" id="btn-add-testimonial">
                        <i data-lucide="plus"></i>
                        <span>Add Testimonial</span>
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
                                    <div class="th-content">Email <i data-lucide="chevrons-up-down"
                                            class="sort-icon" style="width: 12px;"></i></div>
                                </th>
                                <th>
                                    <div class="th-content">Phone <i data-lucide="chevrons-up-down"
                                            class="sort-icon" style="width: 12px;"></i></div>
                                </th>
                                <th>
                                    <div class="th-content">Message <i data-lucide="chevrons-up-down"
                                            class="sort-icon" style="width: 12px;"></i></div>
                                </th>
                                <th>
                                    <div class="th-content">Location <i data-lucide="chevrons-up-down"
                                            class="sort-icon" style="width: 12px;"></i></div>
                                </th>
                                <th>
                                    <div class="th-content">Image <i data-lucide="chevrons-up-down"
                                            class="sort-icon" style="width: 12px;"></i></div>
                                </th>
                                <th>
                                    <div class="th-content">Action <i data-lucide="chevrons-up-down"
                                            class="sort-icon" style="width: 12px;"></i></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody id="testimonials-table-body">
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
                        <h3 class="chart-title">Create Testimonials</h3>
                    </div>
                </div>

                <div style="padding: 32px;">
                    <form id="create-testimonial-form">
                        <div class="form-row-horizontal">
                            <label>Name <span style="color:red">*</span></label>
                            <input type="text" class="form-control-premium" placeholder="Enter name" required>
                        </div>

                        <div class="form-row-horizontal">
                            <label>Email <span style="color:red">*</span></label>
                            <input type="email" class="form-control-premium" placeholder="Enter email" required>
                        </div>

                        <div class="form-row-horizontal">
                            <label>Phone <span style="color:red">*</span></label>
                            <input type="tel" class="form-control-premium" placeholder="Enter phone number"
                                required>
                        </div>

                        <div class="form-row-horizontal">
                            <label>Description <span style="color:red">*</span></label>
                            <textarea class="form-control-premium" placeholder="Enter description"
                                style="height: 100px; resize: vertical;" required></textarea>
                        </div>

                        <div class="form-row-horizontal">
                            <label>Location <span style="color:red">*</span></label>
                            <input type="text" class="form-control-premium" placeholder="Enter location" required>
                        </div>

                        <div class="form-row-horizontal">
                            <label>Back Ground Image <span style="color:red">*</span></label>
                            <div style="flex: 2; display: flex; flex-direction: column; gap: 12px;">
                                <div
                                    style="display: flex; align-items: center; gap: 12px; border: 1px solid var(--border); padding: 8px 12px; border-radius: 8px;">
                                    <input type="file" id="testimonial-image-input" required
                                        style="font-size: 13px; color: var(--text-muted);">
                                </div>
                                <div id="testimonial-image-preview"
                                    style="display: none; width: 100px; height: 100px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border);">
                                    <img src="" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;">
                                </div>
                            </div>
                        </div>

                        <div
                            style="margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--border); display: flex; gap: 12px; justify-content: flex-start;">
                            <button type="button" class="btn" id="btn-create-testimonial-cancel"
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
        const container = document.getElementById('testimonials-list-view');
        if (!container) return;
        container.innerHTML = this.getListViewTemplate();
        this.populateTable();
    }

    renderCreateView() {
        const container = document.getElementById('create-testimonial-view');
        if (!container) return;
        container.innerHTML = this.getCreateViewTemplate();
    }

    populateTable() {
        const tbody = document.getElementById('testimonials-table-body');
        if (!tbody) return;

        tbody.innerHTML = this.testimonialsData.map((item, index) => `
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

        if (window.lucide) window.lucide.createIcons();
    }

    attachEvents() {
        const listContainer = document.getElementById('testimonials-list-view');
        if (listContainer) {
            listContainer.addEventListener('click', (e) => {
                if (e.target.closest('#btn-add-testimonial')) {
                    e.stopPropagation();
                    if (window.switchView) window.switchView('create-testimonial');
                }
            });
        }

        const createContainer = document.getElementById('create-testimonial-view');
        if (createContainer) {
            createContainer.addEventListener('click', (e) => {
                if (e.target.closest('#btn-create-testimonial-cancel')) {
                    if (window.switchView) window.switchView('testimonials-list');
                }
            });

            const fileInput = document.getElementById('testimonial-image-input');
            const preview = document.getElementById('testimonial-image-preview');

            if (fileInput && preview) {
                fileInput.addEventListener('change', function (e) {
                    const file = e.target.files[0];
                    if (file) {
                        const reader = new FileReader();
                        reader.onload = function (e) {
                            preview.querySelector('img').src = e.target.result;
                            preview.style.display = 'block';
                        }
                        reader.readAsDataURL(file);
                    }
                });
            }

            const form = document.getElementById('create-testimonial-form');
            if (form) {
                form.addEventListener('submit', (e) => {
                    e.preventDefault();
                    alert('Testimonial Added Successfully');
                    if (window.switchView) window.switchView('testimonials-list');
                });
            }
        }
    }
}
