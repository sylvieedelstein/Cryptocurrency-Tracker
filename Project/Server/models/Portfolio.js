// Import the MySQL library
var mysql = require('mysql');

// Create a connection to the MySQL database
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "N3verGame0ver",
    database: "crypto"
});

// Import the CryptoData class from the CryptoData module
const { CryptoData } = require("./CryptoData");

// Define the Portfolio class
class Portfolio {
    // Constructor for the Portfolio class
    constructor(cryptoList = [], history = [], value = '', buy = [], sell = []) {
        // Initialize instance variables
        this.portfolio = [];
        this.cryptoList = cryptoList;
        this.history = history;
        this.value = value;
        this.buy = buy;
        this.sell = sell;
    }

    // Method to calculate the total price of a cryptocurrency based on its price and quantity
    calculateTotalPrice(price, quantity) {
        var totalPrice = price * quantity;
        return totalPrice;
    }

    sellCrypto(cryptoID, quantity) {
        // Find the cryptocurrency in the portfolio based on the ID
        const cryptoInfo = this.portfolio.find(crypto => crypto.symbol === cryptoID);

        // Check if the cryptoInfo is found
        if (cryptoInfo) {
            // Calculate the total price based on the crypto price and quantity
            const totalPrice = this.calculateTotalPrice(cryptoInfo.price, quantity);

            // Update the portfolio by removing the sold cryptocurrency
            this.portfolio = this.portfolio.filter(crypto => crypto.symbol !== cryptoID);

            // Update other portfolio details as needed
            this.value -= totalPrice;
            this.history.push({ action: 'sell', crypto: cryptoInfo, quantity: quantity, totalPrice: totalPrice });

            return {
                message: `Successfully sold ${quantity} of ${cryptoInfo.name}.`,
                portfolio: this.portfolio
            };
        } else {
            return {
                error: 'Cryptocurrency not found in the portfolio.',
                portfolio: this.portfolio
            };
        }
    }

}
let portfolio = new Portfolio();

exports.getPortfolio = function () {
    return (portfolio);
}

exports.addCrypto = function () {
    return getCryptoData.cryptocurrencies.push(CryptoData);
}

exports.getPortfolioValue = function () {
    return (portfolio);
}

// Transactions
exports.newTransaction = function(req) {
    const { trans_id, username, symbol, amount, price, trans_date } = req.body;

    // Insert user data into the 'account' table
    const registerQuery = `INSERT INTO transaction (trans_id, username, symbol, amount, price, trans_date) VALUES (?, ?, ?, ?, ?, ?)`;
    con.query(registerQuery, [trans_id, username, symbol, amount, price, trans_date ], (err, result) => {
        if (err) {
            console.error("Error registering user:", err);
            return "Error registering user";
        }
        return "Registration successful";
    });
}







