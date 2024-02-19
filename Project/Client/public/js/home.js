// Function to update the portfolio table with a new symbol and amount
function updatePortfolio(symbol, amount) {
    // Get the table element
    const table = document.getElementById('portfolioTable');

    // Store existing data from the portfolio table
    const existingData = Array.from(table.rows).map(row => ({
        symbol: row.cells[0].textContent,
        amount: row.cells[1].textContent,
    }));

    // Clear existing rows in the portfolio table
    table.innerHTML = '';

    // Append the existing data to the table
    existingData.forEach(data => {
        const newRow = table.insertRow();
        newRow.innerHTML = `<td>${data.symbol}</td><td>${data.amount}</td>`;
    });

    // Append a new row to the table with the updated symbol and amount
    const newRow = table.insertRow();
    newRow.innerHTML = `<td>${symbol}</td><td>${amount}</td>`;

    // Log a message to the console indicating the portfolio update
    console.log(`Updating portfolio: Bought ${amount} ${symbol}`);
}

// Function to populate the main cryptocurrency table with data
function populateTable(data) {
    // Get the main cryptocurrency table and its tbody element
    var table = document.getElementById('cryptoTable');
    let tBody = table.getElementsByTagName("tbody")[0];

    // Clear existing rows in the main table
    tBody.innerHTML = '';

    // Loop through the array of cryptocurrency data and add rows to the table
    data.forEach(function (data) {
        var row = tBody.insertRow();

        // Create cells for each data attribute
        var cell1 = row.insertCell(0)
        var cell2 = row.insertCell(1)
        var cell3 = row.insertCell(2)
        var cell4 = row.insertCell(3)
        var cell5 = row.insertCell(4)
        var cell6 = row.insertCell(5)
        var cell7 = row.insertCell(6)
        var cell8 = row.insertCell(7)
        var cell9 = row.insertCell(8)

        // Populate the cells with cryptocurrency data
        cell1.innerHTML = data.rank;
        cell2.innerHTML = data.name;
        cell3.innerHTML = data.symbol;
        cell4.innerHTML = data.price;
        cell5.innerHTML = data.change;
        cell6.innerHTML = data.marketCap;
        cell7.innerHTML = data.supply;
        cell8.innerHTML = data.volume;
        cell9.innerHTML = data.vwap;

        // Add a click event listener to each row for handling details popup
        row.addEventListener('click', function () {
            handleRowClick(data);
        });
    });
}

// Initial data population on page load
fetch('/api/cryptoData/')
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        // Populate the main cryptocurrency table with data
        populateTable(data);
    });

// Function to handle details popup when a row is clicked
function handleRowClick(data) {
    console.log('Row clicked:', data.name);
    var modal = document.getElementById('theModal');
    modal.style.display = "block";
    var cryptoTable = document.getElementById('modalCryptoTable');
    var tableBody = cryptoTable.getElementsByTagName('tbody')[0];

    // Log information for debugging
    console.log(cryptoTable);
    console.log(tableBody);

    // Insert a new row in the modal table
    var row = tableBody.insertRow();

    // Create cells for each data attribute in the modal table
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    var cell9 = row.insertCell(8);
    var cell10 = row.insertCell(9);

    // Populate the cells with data from the clicked row
    cell1.innerHTML = data.rank;
    cell2.innerHTML = data.name;
    cell3.innerHTML = data.symbol;
    cell4.innerHTML = data.price;
    cell5.innerHTML = data.change;
    cell6.innerHTML = data.marketCap;
    cell7.innerHTML = data.supply;
    cell8.innerHTML = data.volume;
    cell9.innerHTML = data.vwap;
    cell10.innerHTML = data.lastUpdated;

    // Set up the buy button click event
    let buyButton = document.getElementById("Buy");
    buyButton.addEventListener('click', function () {
        let numberOfCrypto = document.getElementById("shares").value;
        if (numberOfCrypto) {
            buyCrypto(numberOfCrypto, data.symbol);
        }
    });
}

// Onload event
window.onload = function () {
    var modal = document.getElementById('theModal');

    var span = document.getElementsByTagName('span')[0];

    // Click event for closing the details popup
    span.onclick = function () {
        modal.style.display = "none";
        location.reload();
    }

    // Click event for closing the details popup when clicking outside of it
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
            location.reload();
        }
    }
}

//sorting columns by ascending and descending
function setSortListeners() {
    let ths = document.getElementsByTagName('th');
    for (const element of ths) {
        element.addEventListener("click", function () {
            sort(element.id);
        })
    };
}
// Stores the state of the sort direction
const toggler = sortDirection('asc', 'desc');
// Function that switches the sort direction
function sortDirection(asc, desc) {
    let state = asc;

    function toggle() {
        state = state === asc ? desc : asc;
        return state;
    }

    function getState() {
        return state;
    }

    return {
        toggle,
        getState,
    };
}
// Function that sorts by column
function sort(column) {
    fetch('/api/cryptoData/sort', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "sortField": column, "sortDirection": toggler.toggle() })
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        return populateTable(data);
    })
}


window.setInterval(function () {
    fetch('/api/cryptoData/')
        .then(function (response) {
            return response.json();
        }).then(function (data) {
            populateTable(data);
        })
}, 60000000);

/** Buying Crypto */
// Function that relays a message when user buys a crypto currency
function buyMessage() {
    var text = document.getElementById("bought");
    text.style.display = "block";
}

// Function that buys crypto currencies
function buyCrypto(numberOfCrypto, symbol) {
    fetch(`/api/portfolio/${symbol}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ "quantity": numberOfCrypto })
    }).then(function (response) {
        return response.json();
    }).then(function (data) {
        return buyMessage();
    })
    buyMessage();
    console.log('You bought ', numberOfCrypto, " shares of ", symbol);
    alert("Transaction successful!");
}



document.addEventListener("DOMContentLoaded", setSortListeners);
