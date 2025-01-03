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
// const csvFileUrl = 'data1Jan.csv'; // Replace with your hosted CSV file path or URL

// // Fetch the CSV file and render the table
// fetch(csvFileUrl)
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Failed to load CSV file');
//         }
//         return response.text();
//     })
//     .then(csvText => {
//         const data = parseCSV(csvText);
//         renderTable(data);
//     })
//     .catch(error => {
//         console.error('Error:', error);
//     });

// // Parse CSV text into an array of arrays
// function parseCSV(csvText) {
//     const rows = csvText.split('\n').filter(row => row.trim() !== ''); // Remove empty rows
//     return rows.map(row => row.split(',').map(cell => cell.trim())); // Trim spaces from cells
// }

// // Render the table in HTML
// function renderTable(data) {
//     const table = document.getElementById('csvTable');
    
//     // Clear previous table content
//     while (table.firstChild) {
//         table.removeChild(table.firstChild);
//     }

//     data.forEach((row, index) => {
//         const tr = document.createElement('tr');
//         row.forEach(cell => {
//             const cellElement = document.createElement(index === 0 ? 'th' : 'td');
//             cellElement.textContent = cell;
//             tr.appendChild(cellElement);
//         });
//         table.appendChild(tr);
//     });
// }


// Multiples tables 

// Array of CSV file URLs
const csvFiles = [
    'Nifty 50 Prediction 2025-01-03.csv',       // Replace with actual file URLs or paths
    'Nifty Auto Prediction 2025-01-03.csv',
    'Nifty Bank Prediction 2025-01-03.csv',
    'Nifty FMCG Prediction 2025-01-03.csv',
    'Nifty Fin Services Prediction 2025-01-03.csv',
    'Nifty IT Prediction 2025-01-03.csv',
    'Nifty Infra Prediction 2025-01-03.csv',
    'Nifty Metal Prediction 2025-01-03.csv'
];

// Corresponding table headings for each CSV file
const tableHeadings = [
    'Nifty 50 Prediction for 2025-01-03',
    'Nifty Auto Prediction for 2025-01-03',
    'Nifty Bank Prediction for 2025-01-03',
    'Nifty FMCG Prediction for 2025-01-03',
    'Nifty Financial Services Prediction for 2025-01-03',
    'Nifty IT Prediction for 2025-01-03',
    'Nifty Infrastructure Prediction for 2025-01-03',
    'Nifty Metal Prediction for 2025-01-03'
];

// Folder path where CSV files are stored
const folderPath = './2025-01-03/'; // Update the folder path if necessary

// Fetch and render each CSV file
csvFiles.forEach((csvFile, index) => {
    const filePath = `${folderPath}${csvFile}`;
    fetch(filePath)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to load ${csvFile}`);
            }
            return response.text();
        })
        .then(csvText => {
            const data = parseCSV(csvText);
            renderTable(data, tableHeadings[index]);
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

// Parse CSV text into an array of arrays
function parseCSV(csvText) {
    const rows = csvText.split('\n').filter(row => row.trim() !== ''); // Remove empty rows
    return rows.map(row => row.split(',').map(cell => cell.trim())); // Trim spaces from cells
}

// Render a single table in HTML
function renderTable(data, tableTitle) {
    const container = document.body;

    // Create a heading for the table
    const heading = document.createElement('h2');
    heading.textContent = tableTitle;
    heading.style.textAlign = 'center';
    heading.style.marginLeft = '28px';
    container.appendChild(heading);

    // Create the table
    const table = document.createElement('table');
    table.style.margin = '20px auto'; // Center the table

    data.forEach((row, index) => {
        const tr = document.createElement('tr');
        row.forEach((cell, cellIndex) => {
            const cellElement = document.createElement(index === 0 ? 'th' : 'td');
            cellElement.textContent = cell;

            // Apply color coding for predictions
            if (index > 0 && cellIndex === 2) { // Assuming the prediction column is the second column
                if (cell.toLowerCase() === 'up') {
                    cellElement.style.color = 'green';
                    cellElement.style.fontWeight = 'bold';
                } else if (cell.toLowerCase() === 'down') {
                    cellElement.style.color = 'red';
                    cellElement.style.fontWeight = 'bold';
                }
            }

            tr.appendChild(cellElement);
        });

        // Add light yellow background to the first row
        if (index === 1) {
            tr.style.backgroundColor = 'lightyellow';
        }
        
        table.appendChild(tr);
    });

    // Append the table to the container
    container.appendChild(table);
}
