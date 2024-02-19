const express = require('express')
const app = express()
app.use(express.static('Client/public'));
const port = 1337

// Session constants
const session = require("express-session");
const cookieParser = require("cookie-parser");

// JSON parser
const bodyParser = require('body-parser');
app.use(bodyParser.json({ type: 'application/json' }));

// Populate the data
const cryptoController = require('./controllers/CryptoController');
const accountController = require('./controllers/AccountController');
const detailController = require('./controllers/DetailController');
const portfolioController = require('./controllers/PortfolioController');
cryptoController.populateData();

app.get('/', function (req, res) {
	res.sendFile('index.html', { root: './Client/views' })
})

app.get('/home', function (req, res) {
	res.sendFile('home.html', { root: './Client/views' })
})

app.get('/detail', function (req, res) {
	res.sendFile('detail.html', { root: './Client/views' })
})

app.get('/account', function (req, res) {
	res.sendFile('account.html', { root: './Client/views' })
})

app.get('/portfolio', function (req, res) {
	res.sendFile('portfolio.html', { root: './Client/views' })
})

app.get('/login', function (req, res) {
	res.sendFile('login.html', { root: './Client/views' })
})

// Routes for Crypto Controller
app.route('/api/cryptoData') // Required
	.get(cryptoController.getCryptoData);
app.route('/api/cryptoData/:id') // Required
	.get(cryptoController.getCryptoDataByID);
app.route('/api/cryptoData/sort')
	.post(cryptoController.sortCurrencies);
app.route('/api/cryptoData/search')
	.post(cryptoController.searchCurrencies);
app.route('/api/cryptoData/viewDetail')
	.get(cryptoController.viewDetail);

// Routes for Account Controller
app.route('/api/account/info')
	.get(accountController.getAccountInfo);
//app.route('/api/account/login')
	//.put(accountController.login);
app.route('/api/account/logout')
	.put(accountController.logout);
app.route('/api/account/:id')
	.patch(accountController.createAccount)
	.delete(accountController.deleteAccount);

// Routes for Portfolio Controller
app.route('/api/portfolio') // Required
	.get(portfolioController.getPortfolio);
app.route('/api/portfolio/value')
	.get(portfolioController.getPortfolioValue);
app.route('/api/portfolio/valueHistory')
	.get(portfolioController.getPortfolioValueHistory);
app.route('/api/portfolio/:symbol') // Required
	.patch(portfolioController.buyCrypto)
app.route('/api/portfolio/:symbol')
	.delete(portfolioController.sellCrypto);

// Routes for Detail Controller
app.route('/api/detail')
	.get(detailController.getDetail);
app.route('/api/detail/priceAtTimes/:id/:last_updated')
	.get(detailController.getPriceAtTimes);
app.route('/api/detail/priceHistory:/id')
	.get(detailController.getPriceHistory);

// Database
var mysql = require('mysql');
const e = require('express');

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "N3verGame0ver",
	database: "sys"
});

con.connect(function (err) {
	if (err) throw err;
	console.log("Connected");
})

// Middleware setup
app.use(cookieParser());
app.use(bodyParser.json({ type: 'application/json' }));

app.use(session({
    secret: "amar",
    saveUninitialized: true,
    resave: true
}));

// Registration route
app.route('/api/register')
    .patch(accountController.newUser);
	
// User Portfolio
app.get('/api/portfolio', function (req, res) {
	let user = req.cookies.user;
	if (!user) {
		res.redirect('/');
	} else {
		res.sendFile('portfolio.html', { root: './Client/views' });
	}
});

//Login route
app.route('/api/login')
	.post(accountController.getUser)
	.get(function(req, res) {
		let bad_auth = req.query.msg ? true : false;

		if (bad_auth) {
			res.render("login", { error: "invalid username or password" });
		} else {
			res.render("login");
		}
	});

//logout route
app.get('/logout', (req, res) => {
    res.clearCookie('user');
    res.redirect('/login');
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
})

