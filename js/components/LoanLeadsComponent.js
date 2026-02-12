const loanLeadsData = [
    { sno: 1, name: 'test', email: 'kirnmca6@gmail.com', phone: '9003486509', address: '7 Roja Street Paras', date: '2025-11-26 14:22:31' },
    { sno: 2, name: 'RISHI KESAVAN S K', email: 'rishikesavan8k@gmail.com', phone: '9003486509', address: '7 Roja Street Parasakthi Nagar', date: '2025-11-24 14:14:28' },
    { sno: 3, name: 'RISHI KESAVAN S K', email: 'rishikesavan8k@gmail.com', phone: '9003486509', address: '7 Roja Street Parasakthi Nagar', date: '2025-11-24 14:14:19' },
    { sno: 4, name: 'RISHI KESAVAN S K', email: 'rishikesavan8k@gmail.com', phone: '9003486509', address: '7 Roja Street Parasakthi Nagar', date: '2025-11-24 14:13:58' },
    { sno: 5, name: 'test', email: 'test@gmail.com', phone: '9988766500', address: 'testing', date: '2025-03-26 01:04:46' },
    { sno: 6, name: 'Naveen', email: 'naveenkatiyar@gmail.com', phone: '9910861434', address: 'Noida sec 52', date: '2022-11-19 15:00:47' },
    { sno: 7, name: 'Ghbbb', email: 'sushvdgeh@geush', phone: '9586300386', address: 'Vdgeb', date: '2022-09-28 15:42:49' },
    { sno: 8, name: 'Vaibhavi', email: 'vibzdave@gmail.com', phone: '9586300386', address: 'Gsjwbe', date: '2022-09-28 15:42:04' },
    { sno: 9, name: 'TEJASVI KAPOOR', email: 'TEJASVIKAPJOOR@GMAIL.COM', phone: '9899095939', address: 'NOIDA', date: '2018-07-06 09:20:14' },
    { sno: 10, name: 'P S Kohli', email: 'prachi@signaturestaffindia.com', phone: '9999994728', address: 'Hari Nagar', date: '2017-09-16 19:32:40' }
];

function populateLoanLeadsTable() {
    const tbody = document.getElementById('loan-leads-table-body');
    if (!tbody) return;

    tbody.innerHTML = loanLeadsData.map(item => `
        <tr>
            <td style="font-weight: 500; color: var(--text-muted); text-align: center;">${item.sno}</td>
            <td style="font-weight: 500;">${item.name}</td>
            <td style="color: var(--text-muted);">${item.email}</td>
            <td style="color: var(--text-muted);">${item.phone}</td>
            <td style="color: var(--text-muted); max-width: 250px; white-space: normal;">${item.address}</td>
            <td style="color: var(--text-muted); font-size: 11px;">${item.date}</td>
        </tr>
    `).join('');

    lucide.createIcons();
}

window.populateLoanLeadsTable = populateLoanLeadsTable;
