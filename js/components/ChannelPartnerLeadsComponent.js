const channelPartnerLeadsData = [
    { sno: 1, name: 'Sonu Kumar', email: 'sonu.s@codeflowtech.com', phone: '9771013205', companyName: 'CFT', industryType: 'IT', message: 'Testing' },
    { sno: 2, name: '121212', email: 'fgfgfg@gghghgh.kjk', phone: '1212121212', companyName: 'hhhhjhj', industryType: 'hhjhjhj', message: 'nkjkjkk' },
    { sno: 3, name: 'sdddd', email: 'sunil.m@codeflowtech.com', phone: '9771013209', companyName: 'ddfff', industryType: 'ddddd', message: 'fdfdfd' },
    { sno: 4, name: 'Narasimha Boini', email: 'hyd.narasimha1@gmail.com', phone: '9849677321', companyName: 'Ramax', industryType: 'real estate', message: 'Video enquiry' },
    { sno: 5, name: 'Tejasvi Kapoor', email: 'tejasvikapoor.ic@gmail.com', phone: '9310095939', companyName: 'Hunt Property', industryType: 'Real Estate', message: 'Interested to join.' },
    { sno: 6, name: 'Nikhil Singh', email: 'nikscu@gmail.com', phone: '7838222327', companyName: 'Grih Sampadah', industryType: 'Real estate', message: 'Hello' },
    { sno: 7, name: 'woodcock', email: 'woodcock@gmail.com', phone: '5064567890', companyName: 'Woodcock Inc', industryType: 'Retail', message: 'Enquiry test' },
    { sno: 8, name: 'Shuslok', email: 'chullyces@mailport.lat', phone: '82592988475', companyName: 'Shuslok', industryType: 'Pharma', message: 'Cell lysates query' },
    { sno: 9, name: 'Yatendra', email: 'yatinali07@gmail.com', phone: '9997444647', companyName: 'catalyst realty', industryType: 'real estate', message: 'hello' },
    { sno: 10, name: 'ernaut', email: 'ernaut@gmail.com', phone: '2001234567', companyName: 'Ernaut LLC', industryType: 'Service', message: 'Adipisci fuga' }
];

function populateChannelPartnerLeadsTable() {
    const tbody = document.getElementById('channel-partner-leads-table-body');
    if (!tbody) return;

    tbody.innerHTML = channelPartnerLeadsData.map(item => `
        <tr>
            <td style="font-weight: 500; color: var(--text-muted); text-align: center;">${item.sno}</td>
            <td style="font-weight: 500;">${item.name}</td>
            <td style="color: var(--text-muted);">${item.email}</td>
            <td style="color: var(--text-muted);">${item.phone}</td>
            <td style="color: var(--text-muted);">${item.companyName}</td>
            <td style="color: var(--text-muted);">${item.industryType}</td>
            <td style="color: var(--text-muted); font-size: 11px; max-width: 250px; white-space: normal; line-height: 1.4;">${item.message}</td>
            <td>
                <button class="action-btn" title="Delete" style="background: #FF5E5E; color: white; border: none; width: 28px; height: 28px; border-radius: 4px; display: flex; align-items: center; justify-content: center;">
                    <i data-lucide="x" style="width: 14px;"></i>
                </button>
            </td>
        </tr>
    `).join('');

    lucide.createIcons();
}

window.populateChannelPartnerLeadsTable = populateChannelPartnerLeadsTable;
