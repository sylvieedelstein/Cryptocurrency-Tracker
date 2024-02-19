//Hitting the spacebar returns you to Home
document.addEventListener("DOMContentLoaded", function () {
    // Add an event listener for the 'keydown' event on the document
    document.addEventListener("keydown", function (event) {
        // Check if the pressed key is the spacebar (key code 32)
        if (event.key === " ") {
            // Navigate to home.html when spacebar is pressed
            window.location.href = "/home";
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    var table = document.getElementById("cryptoTable");
    table.addEventListener("click", function (event) {
        if (event.target.tagName === "TD") {
            // Get the closest table row
            var row = event.target.closest("tr");

            // Get the data from the clicked row. 
            var rowData = row.textContent;

            // Redirect to details.html
            // window.location.href = "/detail";
        }
    });
});

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

function populateTable(dataArray) {
    if (!Array.isArray(dataArray)) {
        console.error('Data is not an array:', dataArray);
        return;
    }

    var tableBody = document.getElementById('cryptoTable').getElementsByTagName('tbody')[0];
    // Clear existing table rows
    tableBody.innerHTML = '';

    // Loop through the array and add rows to the table
    dataArray.forEach(function (data) {
        var row = tableBody.insertRow();
        // Assuming data is an object with properties: rank, name, symbol, etc.
        var cell1 = row.insertCell(0);
        var cell2 = row.insertCell(1);
        var cell3 = row.insertCell(2);
        var cell4 = row.insertCell(3);
        var cell5 = row.insertCell(4);
        var cell6 = row.insertCell(5);
        var cell7 = row.insertCell(6);
        var cell8 = row.insertCell(7);
        var cell9 = row.insertCell(8);

        cell1.innerHTML = data.rank;
        cell2.innerHTML = data.name;
        cell3.innerHTML = data.symbol;
        cell4.innerHTML = data.price;
        cell5.innerHTML = data.change;
        cell6.innerHTML = data.marketCap;
        cell7.innerHTML = data.supply;
        cell8.innerHTML = data.volume;
        cell9.innerHTML = data.vwap;
        row.addEventListener('click', function () {
            handleRowClick(data);
        });
       
    });

function handleRowClick(data) {
    console.log('Row clicked:', data.name);
    var modal = document.getElementById('theModal');
    modal.style.display = "block";
    var cryptoTable = document.getElementById('modalPortfolioTable');
    var tableBody = cryptoTable.getElementsByTagName('tbody')[0];
    console.log(PortfolioTable);
    console.log(tableBody);

    var row = tableBody.insertRow();

    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    var cell6 = row.insertCell(5);
    var cell7 = row.insertCell(6);
    var cell8 = row.insertCell(7);
    var cell9 = row.insertCell(8);

    cell1.innerHTML = data.rank;
    cell2.innerHTML = data.name;
    cell3.innerHTML = data.symbol;
    cell4.innerHTML = data.price;
    cell5.innerHTML = data.change;
    cell6.innerHTML = data.marketCap;
    cell7.innerHTML = data.supply;
    cell8.innerHTML = data.volume;
    cell9.innerHTML = data.vwap;

     // Add the price to the total
     totalPrice += parseFloat(data.price);
    };

    // Display the total at the bottom of the popup
    var totalRow = tableBody.insertRow();
    var totalCellLabel = totalRow.insertCell(0);
    var totalCellValue = totalRow.insertCell(1);
    totalCellLabel.innerHTML = 'Total Price:';
    totalCellValue.innerHTML = totalPrice.toFixed(2); // Format the total price as needed
}


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

// Fetch that retrieves data when crypto currencies are bought and imports it into it into the table 
fetch('/api/portfolio/')
    .then(function (response) {
        return response.json();
    }).then(function (data) {
        return populateTable(data);
    })
