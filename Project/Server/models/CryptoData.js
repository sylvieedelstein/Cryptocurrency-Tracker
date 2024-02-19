class CryptoData {
    constructor() {
        this.cryptocurrencies = [];
        this.currentSort = '';
        this.currentSortDirection = '';
        this.searchResults = [];
        this.searchQuery = '';
        this.currentCrypto = "";
        this.currentValue = "";
        this.price = "";
    }
}

/* Example in Node.js */
const axios = require('axios');
const currency = require('./Detail')
const sampleData = require('../../crypto_example.json')

let response = null;
new Promise(async (resolve, reject) => {
  try {
    response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
      headers: {
        'X-CMC_PRO_API_KEY': '65b31142-d6be-4aeb-8830-9ad1e0a266bc',
      },
    });
  } catch(ex) {
    response = null;
    // error
    console.log(ex);
    reject(ex);
  }
  if (response) {
    // success
    const json = response.data;
    console.log(json);
    resolve(json);
    rawData = json.data;
    cryptoData.cryptocurrencies = [];
    for (const crypto of rawData) {
        cryptoData.cryptocurrencies.push(currency.populateDetails(crypto));
    }
  }
});

let cryptoData = new CryptoData();

exports.getCryptoData = function() {
    return(cryptoData);
}

exports.getCryptoCurrencies = function() {
    return cryptoData.cryptocurrencies;
}

exports.getCryptoDataByID = function() {
    return(cryptoData);
}
exports.addCrypto = function (crypto) {
    return cryptoData.cryptocurrencies.push(crypto);
} 

// Model function for sorting currencies
exports.sortCurrencies = function() {
    const { sort, sortDirection } = cryptoData;
    // Conducting the sort
    if (sort && sortDirection) {
        cryptoData.cryptocurrencies.sort((a, b) => {
            const symbolA = a.symbol.toUpperCase();
            const symbolB = b.symbol.toUpperCase();
            if (sortDirection === 'asc') {
                return symbolA.localeCompare(symbolB);
            } else if (sortDirection === 'desc') {
                return symbolB.localeCompare(symbolA);
            } else return 0;
        })
    }
}


exports.setSearchCriteria = function(searchQuery) {
    cryptoData.searchQuery = searchQuery;
}

exports.searchCurrencies = function() {
    const { cryptocurrencies, searchQuery} = cryptoData;
    if (searchQuery) {
        cryptoData.searchResults = cryptocurrencies.filter(crypto => 
            crypto.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            crypto.symbol.toLowerCase().includes(searchQuery.toLowerCase()));
    }
}
