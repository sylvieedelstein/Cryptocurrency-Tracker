// constant references Detail
const { detail } = require('../models/Detail');

// retrieves details of a cryptocurrency
exports.getDetail = function(req, res) {
    detail.CryptoCurrency[3] = name[req.params.id], rank[req.params.id], 
    symbol[req.params.id];
    res.setHeader('Content-Type', 'text/plain');
    res.send(detail.CryptoCurrency.getDetail());
}

// function that retrieves the price history of a cryptocurrency
exports.getPriceHistory = function(req, res) {
    res.send(detail.getDetail().priceHistory[req.params.id]);
}
// function that retrieves the price at a specific time of a cryptocurrency
exports.getPriceAtTimes = function(req, res) {
    res.send(detail.getDetail().price[req.params.last_updated]);
}
