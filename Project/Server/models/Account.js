// Database
var mysql = require('mysql');
//var mysql = require('mysql-libmysqlclient');

var crypto = require('crypto');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "N3verGame0ver",
    database: "crypto"
});

// Class for an account of a user
class Account {
    constructor(fname, lname, dob, username, password) {
        this.fname = fname;
        this.lname = lname;
        this.dob = dob;
        this.username = username;
        this.passwrod = password;
    }
}

// Creates new Account instance
let account = new Account();

const util = require('util');
const queryAsync = util.promisify(con.query).bind(con);

exports.getUser = async function (username, password) {
    try {
        let hash = crypto.createHash('sha256');
        hash.update(password + "");
        let passwrd = hash.digest('hex');

        const selectQuery = "SELECT * FROM account WHERE username = ? AND password = ?";
        console.log('Query:', selectQuery);
        console.log('Parameters:', [username, password]);

        const results = await queryAsync(selectQuery, [username, password]);


        if (results && results.length > 0) {
            console.log(results[0]);
            return results[0];
        } else {
            return null; // No user found
        }
    } catch (err) {
        console.error("Error fetching user:", err);
        return null; // Indicate error to the caller
    }
};





// Creating a new account
exports.newUser = function (req) {
    const { username, firstname, lastname, DOB, password } = req.body;

    // Insert user data into the 'account' table
    const registerQuery = `INSERT INTO account (username, firstname, lastname, DOB, password) VALUES (?, ?, ?, ?, ?)`;
    con.query(registerQuery, [username, firstname, lastname, DOB, password], (err, result) => {
        if (err) {
            console.error("Error registering user:", err);
            return "Error registering user";
        }
        return "Registration successful";
    });
}
