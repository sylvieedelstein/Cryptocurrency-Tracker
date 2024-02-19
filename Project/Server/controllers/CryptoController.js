// constants
const e = require('express');
const cryptoData = require('../models/CryptoData');
const currency = require('../models/Detail');
const dataObject = require('../../crypto_example.json');

// populates data
exports.populateData = function () {
    for (const crypto of dataObject.data) {
        cryptoData.addCrypto(currency.populateDetails(crypto));
    }
}

// retrieves crypto data
exports.getCryptoData = function (req, res) {
    console.log(cryptoData);
    res.send(cryptoData.getCryptoCurrencies().slice(0, 50));
}

// retrieves currency data
exports.getCryptoDataByID = function (req, res) {
    var cryptoID = cryptoData.getCryptoCurrencies().find(e => e.symbol == req.params.id);
    if (!cryptoID) {
        return res.status(404).json({ error: 'Crypto not found' });
    }
    res.send(cryptoID);
}

// function that sorts currencies using criteria from the model
exports.sortCurrencies = function (req, res) {
    const data = req.body;
    var field = data.sortField;
    var direction = data.sortDirection;
    console.log('Sorting by:', field, 'Direction:', direction);
    cryptoData.sort = field;
    cryptoData.sortDirection = direction;   
    if (direction === 'asc') {
        cryptoData.getCryptoCurrencies().sort(function (a, b) {
            if (a[field] > b[field])
                return 1;
            if (a[field] < b[field])
                return -1;
            else return 0;
        });
    } else if (direction === 'desc') {
        cryptoData.getCryptoCurrencies().sort(function (a, b) {
            if (b[field] > a[field])
                return 1;
            if (b[field] < a[field])
                return -1;
            else return 0;
        });
    }

    console.log('Sorted data:', cryptoData.getCryptoCurrencies());

    res.setHeader('Content-Type', 'text/plain');
    res.send(cryptoData.getCryptoCurrencies());
}

// searches currencies
exports.searchCurrencies = function (req, res) {
    const { searchQuery } = req.body;
    cryptoData.setSearchCriteria(searchQuery);
    cryptoData.searchCurrencies();
    res.json({
        message: "Search criteria has been set successfully.",
        searchResults: cryptoData.getCryptoCurrencies()
    });
}

// retrieves information about crypto details
exports.viewDetail = function (req, res) {
    
}

// Buy Crypto
exports.buyCrypto = function(req, res) {
    const newPortfolio = portfolio.getPortfolio();
    const cryptoSymbol = req.params.id; // symbol passed into parameter
    const quantity = req.body.quantity; // quantity passed into body
    //Accepts user provided symbol as well as quantity
    const cryptoInfo = crypto.getCryptoData().cryptocurrencies.find(crypto => crypto.symbol === cryptoSymbol);
    //Gathers the cryptoinformation from cryptodata
    if (cryptoInfo) {
        portfolio.getPortfolio().buyCrypto(cryptoInfo, quantity);

        res.json({
            message: `Successfully bought ${quantity} of ${cryptoInfo.name}.`,
            portfolio: newPortfolio
        });
    } else {
        res.status(404).json({ message: 'Cryptocurrency not found.' });
    }
}
//