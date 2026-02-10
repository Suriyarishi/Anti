export class NewsComponent {
    constructor() {
        this.data = [
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
        this.initialized = false;
    }

    init() {
        if (this.initialized) return;
        this.renderListView();
        this.renderCreateView();
        this.attachEvents();
        this.initialized = true;
    }

    // Returns the HTML for the News List View
    getListViewTemplate() {
        return `
            <div class="table-card">
                <div class="table-header">
                    <div>
                        <h3 class="chart-title">News/Articles List</h3>
                        <p class="chart-subtitle" style="margin-top: 4px;">Manage latest news and updates</p>
                    </div>
                    <button class="btn btn-primary" id="btn-add-news">
                        <i data-lucide="plus"></i>
                        <span>Add News</span>
                    </button>
                </div>

                <div class="table-controls"
                    style="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; background: #F8FAFC; border-bottom: 1px solid var(--border);">
                    <div style="display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--text-muted);">
                        <span>Show</span>
                        <select style="padding: 4px 8px; border-radius: 6px; border: 1px solid var(--border); outline: none;">
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
                                    <div class="th-content">S.no. <i data-lucide="chevrons-up-down" class="sort-icon" style="width: 12px;"></i></div>
                                </th>
                                <th>
                                    <div class="th-content">Title <i data-lucide="chevrons-up-down" class="sort-icon" style="width: 12px;"></i></div>
                                </th>
                                <th>
                                    <div class="th-content">Description <i data-lucide="chevrons-up-down" class="sort-icon" style="width: 12px;"></i></div>
                                </th>
                                <th>
                                    <div class="th-content">Date <i data-lucide="chevrons-up-down" class="sort-icon" style="width: 12px;"></i></div>
                                </th>
                                <th>
                                    <div class="th-content">Image <i data-lucide="chevrons-up-down" class="sort-icon" style="width: 12px;"></i></div>
                                </th>
                                <th>
                                    <div class="th-content">Action <i data-lucide="chevrons-up-down" class="sort-icon" style="width: 12px;"></i></div>
                                </th>
                            </tr>
                        </thead>
                        <tbody id="news-table-body">
                            <!-- Populated via JS -->
                        </tbody>
                    </table>
                </div>
                <div style="padding: 16px 24px; display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border);">
                    <span style="font-size: 13px; color: var(--text-muted);">Showing 1 to 10 of 10 entries</span>
                    <div style="display: flex; gap: 4px;">
                        <button class="btn" style="padding: 6px 12px; font-size: 12px; background: #E2E8F0;">Previous</button>
                        <button class="btn" style="padding: 6px 12px; font-size: 12px; background: #E2E8F0;">1</button>
                        <button class="btn" style="padding: 6px 12px; font-size: 12px; background: #E2E8F0;">Next</button>
                    </div>
                </div>
            </div>
        `;
    }

    // Returns the HTML for the Create News View
    getCreateViewTemplate() {
        return `
            <div class="form-card">
                <div class="form-header-premium">
                    <div>
                        <h3 class="chart-title">Add News</h3>
                        <p class="chart-subtitle">Create a new article or update</p>
                    </div>
                </div>

                <form id="create-news-form">
                    <div class="form-group" style="margin-bottom: 24px;">
                        <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-muted); margin-bottom: 8px;">News Title <span style="color: #ef4444;">*</span></label>
                        <input type="text" class="form-control-premium" placeholder="Enter title" required style="width: 100%;">
                    </div>

                    <div class="form-group" style="margin-bottom: 24px;">
                        <label style="display: block; font-size: 13px; font-weight: 600; color: var(--text-muted); margin-bottom: 8px;">News Description <span style="color: #ef4444;">*</span></label>

                        <!-- Custom Rich Text Editor Toolbar -->
                        <div class="wp-editor-container" style="border: 1px solid var(--border); border-radius: 8px; overflow: hidden;">
                            <div class="wp-toolbar" style="background: #F8FAFC; padding: 8px; border-bottom: 1px solid var(--border); display: flex; gap: 4px; flex-wrap: wrap;">
                                <select class="wp-toolbar-select" style="padding: 4px 8px; border-radius: 4px; border: 1px solid #CBD5E1; font-size: 12px; margin-right: 8px;">
                                    <option>Paragraph</option>
                                    <option>Heading 1</option>
                                    <option>Heading 2</option>
                                    <option>Heading 3</option>
                                </select>
                                <button type="button" class="wp-toolbar-btn" title="Bold" style="padding: 4px 8px; background: white; border: 1px solid #E2E8F0; border-radius: 4px; cursor: pointer;"><i data-lucide="bold" style="width: 14px;"></i></button>
                                <button type="button" class="wp-toolbar-btn" title="Italic" style="padding: 4px 8px; background: white; border: 1px solid #E2E8F0; border-radius: 4px; cursor: pointer;"><i data-lucide="italic" style="width: 14px;"></i></button>
                                <div style="width: 1px; background: #CBD5E1; margin: 0 4px;"></div>
                                <button type="button" class="wp-toolbar-btn" title="Bullet List" style="padding: 4px 8px; background: white; border: 1px solid #E2E8F0; border-radius: 4px; cursor: pointer;"><i data-lucide="list" style="width: 14px;"></i></button>
                                <button type="button" class="wp-toolbar-btn" title="Numbered List" style="padding: 4px 8px; background: white; border: 1px solid #E2E8F0; border-radius: 4px; cursor: pointer;"><i data-lucide="list-ordered" style="width: 14px;"></i></button>
                                <div style="width: 1px; background: #CBD5E1; margin: 0 4px;"></div>
                                <button type="button" class="wp-toolbar-btn" title="Align Left" style="padding: 4px 8px; background: white; border: 1px solid #E2E8F0; border-radius: 4px; cursor: pointer;"><i data-lucide="align-left" style="width: 14px;"></i></button>
                                <button type="button" class="wp-toolbar-btn" title="Align Center" style="padding: 4px 8px; background: white; border: 1px solid #E2E8F0; border-radius: 4px; cursor: pointer;"><i data-lucide="align-center" style="width: 14px;"></i></button>
                                <button type="button" class="wp-toolbar-btn" title="Align Right" style="padding: 4px 8px; background: white; border: 1px solid #E2E8F0; border-radius: 4px; cursor: pointer;"><i data-lucide="align-right" style="width: 14px;"></i></button>
                                <div style="width: 1px; background: #CBD5E1; margin: 0 4px;"></div>
                                <button type="button" class="wp-toolbar-btn" title="Insert Link" style="padding: 4px 8px; background: white; border: 1px solid #E2E8F0; border-radius: 4px; cursor: pointer;"><i data-lucide="link" style="width: 14px;"></i></button>
                                <button type="button" class="wp-toolbar-btn" title="Insert Image" style="padding: 4px 8px; background: white; border: 1px solid #E2E8F0; border-radius: 4px; cursor: pointer;"><i data-lucide="image" style="width: 14px;"></i></button>
                            </div>
                            <div id="news-description-editor" contenteditable="true" style="min-height: 200px; padding: 16px; font-size: 14px; line-height: 1.6; outline: none;">
                                <p>Start typing your news content here...</p>
                            </div>
                            <div class="wp-editor-status" style="background: #F8FAFC; padding: 4px 12px; border-top: 1px solid var(--border); font-size: 11px; color: var(--text-muted); display: flex; justify-content: space-between;">
                                <span>p</span>
                                <span>Word Count: 0</span>
                            </div>
                        </div>
                    </div>

                    <div class="form-row-horizontal">
                        <label>News Image <span style="color:red">*</span></label>
                        <div style="flex: 2; display: flex; flex-direction: column; gap: 12px;">
                            <div style="display: flex; align-items: center; gap: 12px; border: 1px solid var(--border); padding: 8px 12px; border-radius: 8px;">
                                <input type="file" id="news-image-input" class="form-control-premium" style="border: none; padding: 0;">
                            </div>
                            <div id="news-image-preview" style="display: none; width: 200px; height: 120px; border-radius: 8px; overflow: hidden; border: 1px solid var(--border);">
                                <img src="" alt="Preview" style="width: 100%; height: 100%; object-fit: cover;">
                            </div>
                        </div>
                    </div>

                    <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid var(--border); display: flex; gap: 12px; justify-content: flex-start;">
                        <button type="button" class="btn" id="btn-create-news-cancel" style="background: #3b82f6; color: white; padding: 10px 24px;">Cancel</button>
                        <button type="submit" class="btn" style="background: #10b981; color: white; padding: 10px 24px;">Submit</button>
                    </div>
                </form>
            </div>
        `;
    }

    renderListView() {
        const container = document.getElementById('news-list-view');
        if (!container) return;
        container.innerHTML = this.getListViewTemplate();
        this.populateTable();
    }

    renderCreateView() {
        const container = document.getElementById('create-news-view');
        if (!container) return;
        container.innerHTML = this.getCreateViewTemplate();
    }

    populateTable() {
        const tbody = document.getElementById('news-table-body');
        if (!tbody) return;

        tbody.innerHTML = this.data.map(item => `
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

        if (window.lucide) window.lucide.createIcons();
    }

    attachEvents() {
        // Create News Button - We need to delegate this as it's now dynamically inserted
        const addBtn = document.getElementById('btn-add-news');
        if (addBtn) {
            addBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                if (window.switchView) {
                    window.switchView('create-news');
                }
            });
        }

        // Create News Form
        const newsForm = document.getElementById('create-news-form');
        if (newsForm) {
            newsForm.addEventListener('submit', (e) => {
                e.preventDefault();
                // Capture rich text
                const editor = document.getElementById('news-description-editor');
                const description = editor ? editor.innerHTML : '';
                console.log('Creating news with description:', description);
                alert('News created successfully!');
                if (window.switchView) window.switchView('news-list');
                newsForm.reset();
                if (editor) editor.innerHTML = '<p>Start typing your news content here...</p>';
                const preview = document.getElementById('news-image-preview');
                if (preview) preview.style.display = 'none';
            });
        }

        // Cancel Button
        const cancelBtn = document.getElementById('btn-create-news-cancel');
        if (cancelBtn) {
            cancelBtn.addEventListener('click', () => {
                if (window.switchView) window.switchView('news-list');
            });
        }

        // Image Preview
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

        // Rich Text Editor Toolbar (Delegated)
        const toolbar = document.querySelector('.wp-toolbar');
        const editor = document.getElementById('news-description-editor');
        if (toolbar && editor) {
            toolbar.addEventListener('click', (e) => {
                const btn = e.target.closest('.wp-toolbar-btn');
                if (!btn) return;
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
        }
    }
}
