const careerLeadsData = [
    { sno: 1, name: 'Mohit', email: 'mohitg27@hotmail.com', phone: '9811122070', location: 'Delhi', jobCategory: 'Delhi', description: 'Job App', resume: 'Download' },
    { sno: 2, name: 'Aviral', email: 'sharmaaviral75@gmail.com', phone: '7011938022', location: 'UP', jobCategory: 'Ghaziabad', description: 'Marketing', resume: 'Download' },
    { sno: 3, name: 'Tejas', email: 'tejashursale3@gmail.com', phone: '7021003409', location: 'Maharashtra', jobCategory: 'Buldhana', description: 'Android', resume: 'Download' },
    { sno: 4, name: 'Abhishek', email: 'abhisheksaini1219@gmail.com', phone: '9205260904', location: 'Haryana', jobCategory: 'Gurugram', description: 'Flutter', resume: 'Download' },
    { sno: 5, name: 'Deepak', email: 'deepakkumr901@gmail.com', phone: '8010937229', location: 'Delhi', jobCategory: 'Delhi', description: 'iOS', resume: 'Download' },
    { sno: 6, name: 'Prashant', email: 'prashantk70155@gmail.com', phone: '7015576363', location: 'Haryana', jobCategory: 'Gurugram', description: 'Fresher', resume: 'Download' },
    { sno: 7, name: 'Romal', email: 'romalpatel1107@gmail.com', phone: '9712765641', location: 'Gujarat', jobCategory: 'Surat', description: 'iOS', resume: 'Download' },
    { sno: 8, name: 'Shivam', email: 'agarwalshivam116@gmail.com', phone: '8537003806', location: 'West Bengal', jobCategory: 'Asansol', description: 'Android', resume: 'Download' },
    { sno: 9, name: 'Jasmeet', email: 'jasi127982@gmail.com', phone: '7982843491', location: 'Delhi', jobCategory: 'Delhi', description: 'Portfolio', resume: 'Download' },
    { sno: 10, name: 'Jasmeet', email: 'jasi127982@gmail.com', phone: '7982843491', location: 'Delhi', jobCategory: 'Delhi', description: 'Portfolio', resume: 'Download' }
];

function populateCareerLeadsTable() {
    const tbody = document.getElementById('career-leads-table-body');
    if (!tbody) return;

    tbody.innerHTML = careerLeadsData.map(item => `
        <tr>
            <td style="font-weight: 500; color: var(--text-muted); text-align: center;">${item.sno}</td>
            <td style="font-weight: 500;">${item.name}</td>
            <td style="color: var(--text-muted);">${item.email}</td>
            <td style="color: var(--text-muted);">${item.phone}</td>
            <td style="color: var(--text-muted);">${item.location}</td>
            <td style="color: var(--text-muted);">${item.jobCategory}</td>
            <td style="color: var(--text-muted); font-size: 11px; max-width: 300px; white-space: normal; line-height: 1.4;">${item.description}</td>
            <td>
                <button class="status-btn" style="background: transparent; color: var(--primary); border: 1px solid var(--border); padding: 4px 10px; font-size: 11px; border-radius: 4px; font-weight: 500;">
                    ${item.resume}
                </button>
            </td>
            <td>
                <button class="action-btn" title="Delete" style="background: #FF5E5E; color: white; border: none; width: 28px; height: 28px; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="x" style="width: 14px;"></i>
                </button>
            </td>
        </tr>
    `).join('');

    lucide.createIcons();
}

window.populateCareerLeadsTable = populateCareerLeadsTable;
