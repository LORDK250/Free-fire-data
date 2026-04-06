// LORD K'S ULTIMATE FREE FIRE SYNC - ATOM-LEVEL FIX
async function fetchLatestUpdates() {
    const tableBody = document.getElementById('table-body');
    
    // THE CONNECTION: Make sure this matches your Render link exactly
    const RENDER_URL = 'https://free-fire-data-m3mk.onrender.com'; 

    try {
        console.log("System: Requesting data...");
        
        const response = await fetch(RENDER_URL, { 
            method: 'GET',
            mode: 'cors', 
            cache: 'no-cache'
        });

        if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

        const rawData = await response.json();

        // THE CORE FIX: 
        // If the server sends one update {}, this turns it into a list [{}]
        // This prevents the "forEach" error that was stopping your site.
        const updates = Array.isArray(rawdata) ? rawData : [rawData];

        // Clear the "Scanning" message
        tableBody.innerHTML = ''; 

        if (updates.length === 0 || !updates[0]) {
            tableBody.innerHTML = '<tr><td colspan="2" style="text-align:center;">No updates found.</td></tr>';
            return;
        }

        // Loop through and build the table rows
        updates.forEach(item => {
            const platformName = item.platform || item.title || "Free Fire";
            const updateInfo = item.info || item.message || "New update detected!";
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td style="color: #ffbc00; font-weight: bold; padding: 10px; border-bottom: 1px solid #333;">${platformName}</td>
                <td style="color: #ffffff; padding: 10px; border-bottom: 1px solid #333;">${updateInfo}</td>
            `;
            tableBody.appendChild(row);
        });

        console.log("System: Render complete.");

    } catch (error) {
        console.error('CRITICAL ERROR:', error);
        tableBody.innerHTML = `
            <tr>
                <td colspan="2" style="color: #ff4444; text-align: center; padding: 20px;">
                    <strong>CONNECTION FAILED</strong><br>
                    <small>${error.message}</small><br>
                    <button onclick="location.reload()" style="margin-top:10px; background:#ffbc00; border:none; padding:8px 15px; border-radius:5px; cursor:pointer; font-weight:bold; color:#000;">RETRY NOW</button>
                </td>
            </tr>`;
    }
}

// Start the process
window.onload = fetchLatestUpdates;
 