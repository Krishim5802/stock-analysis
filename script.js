// document.getElementById('csvFileInput').addEventListener('change', handleFileUpload);

// function handleFileUpload(event) {
//     const file = event.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = function (e) {
//         const text = e.target.result;
//         const data = parseCSV(text);
//         renderTable(data);
//     };
//     reader.readAsText(file);
// }

// function parseCSV(csvText) {
//     const rows = csvText.split('\n');
//     return rows.map(row => row.split(','));
// }

// function renderTable(data) {
//     const table = document.getElementById('csvTable');
//     table.innerHTML = ''; // Clear previous data

//     data.forEach((row, index) => {
//         const tr = document.createElement('tr');
//         row.forEach(cell => {
//             const cellElement = document.createElement(index === 0 ? 'th' : 'td');
//             cellElement.textContent = cell.trim();
//             tr.appendChild(cellElement);
//         });
//         table.appendChild(tr);
//     });
// }


// URL of the CSV file (place your file URL here)
const csvFileUrl = 'data.csv'; // Replace with your hosted CSV file path or URL

// Fetch the CSV file and render the table
fetch(csvFileUrl)
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to load CSV file');
        }
        return response.text();
    })
    .then(csvText => {
        const data = parseCSV(csvText);
        renderTable(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

// Parse CSV text into an array of arrays
function parseCSV(csvText) {
    const rows = csvText.split('\n').filter(row => row.trim() !== ''); // Remove empty rows
    return rows.map(row => row.split(',').map(cell => cell.trim())); // Trim spaces from cells
}

// Render the table in HTML
function renderTable(data) {
    const table = document.getElementById('csvTable');
    
    // Clear previous table content
    while (table.firstChild) {
        table.removeChild(table.firstChild);
    }

    data.forEach((row, index) => {
        const tr = document.createElement('tr');
        row.forEach(cell => {
            const cellElement = document.createElement(index === 0 ? 'th' : 'td');
            cellElement.textContent = cell;
            tr.appendChild(cellElement);
        });
        table.appendChild(tr);
    });
}
