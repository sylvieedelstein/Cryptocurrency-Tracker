// constant references Account
const account = require('../models/Account');

exports.newUser = function(req, res) {
    res.send(account.newUser(req));
}

// Sends user account information
exports.getUser = async function(req, res) {
    let username = req.body.username;
    let password = req.body.password;

    try {
        let user = await account.getUser(username, password);
        console.log("User: ", user);

        if (user) {
            res.cookie('user', user.username);
            res.status(200).send({ success: true, user: user });
        } else {
            res.status(401).send({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error('Error in getUser:', error);
        res.status(500).send({ success: false, message: 'Internal server error' });
    }
}

/* exports.login = async function(req, res) {
    const { username, password } = req.body;

    try {
        // Find the user in your database by username
        const user = await user.findOne({ username });

        // Check if the user exists and if the password is correct
        if (user && user.verifyPassword(password)) {
            // Successful login
            res.status(200).json({ message: 'Login successful', user });
        } else {
            // Invalid credentials
            res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (error) {
        // Handle other errors (e.g., database connection issues)
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};  */


// function to log out of the system
exports.logout = function(req, res) {
    
}

// function to create an account
exports.createAccount = function(req, res) {
    
}

// function to delete an account
exports.deleteAccount = function(req, res) {
    
}

// function to get account information
exports.getAccountInfo = function(req, res) {
    exports.getAccountInfo = function(req, res) {
        const accountId = req.params.id; 
        const user = account.getAccountById(accountId);
    
        if (user) {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).json(user.getAccountInfo());
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }
}    