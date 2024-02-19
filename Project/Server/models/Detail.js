//all my cryptocurrency details
exports.populateDetails = function (data) {
    return{
        id: Number(data.id),
        rank: data.cmc_rank,
        name: data.name,
        symbol: data.symbol,
        price: data.quote.USD.price,
        change: data.quote.USD.percent_change_24h,
        marketCap: data.quote.USD.market_cap,
        supply: data.total_supply,
        volume: data.quote.USD.volume_24h,
        vwap: data.quote.USD.volume_change_24h,
        priceHistory: data.quote.USD.priceHistory,
        lastUpdated: data.quote.USD.last_updated,
    }
}

