// constant references Portfolio
const portfolio = require('../models/Portfolio');
const crypto = require('../models/CryptoData');

exports.buyCrypto = function(req, res) {
    const newPortfolio = portfolio.getPortfolio();
    const cryptoSymbol = req.params.symbol;
    const quantity = req.body.quantity; 
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

//function the removes a crypto currency from the users portfolio
exports.sellCrypto = function(req, res) {
    const newPortfolio = portfolio.getPortfolio();
    // Specifying the crypto currency and quantity the user is selling
    const cryptoSymbol = req.params.id;
    const quantity = req.body.quantity;
    // Sells the specified crypto
    const result = newPortfolio.sellCrypto(cryptoSymbol, quantity);

    if (result.error) {
        res.status(404).json({ message: result.error });
    } else {
        res.json({
            message: result.message,
            portfolio: result.portfolio
    });
}

// populates data
exports.populateData = function () {
    for (const crypto of dataObject.data) {
        cryptoData.addCrypto(currency.populateDetails(crypto));
    }
}

}
// function that retrieves the current portfolio of the user
exports.getPortfolio = function(req, res) {
    res.send(portfolio.getPortfolio());
}
// function that retrieves the current portfolio value of the user
exports.getPortfolioValue = function(req, res) {
    res.send(portfolio.getPortfolio().value);
}
// function that retrieves the history of the users portfolio value
exports.getPortfolioValueHistory = function(req, res) {
    res.send(portfolio.getPortfolio().history)
}

exports.newTransaction = function(req, res) {
    res.send(portfolio.newTransaction(req));
}