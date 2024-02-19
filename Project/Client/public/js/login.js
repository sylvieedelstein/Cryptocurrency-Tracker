document.addEventListener("DOMContentLoaded", function () {
    // Function to login to account
function login() {
    var username = "Username" // Specifies cookie name for username
    var password = "Password" // Specifies cookie name for password
    var uname = document.getElementById("username").value; // Specifies value of username
    var pswrd = document.getElementById("password").value; // Specifies value of user password
    setCookie(username, uname, 1);
    setCookie(password, pswrd, 1);

    const user = {
        username: uname,
        password: pswrd,
    };

    const requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', 
        },
        body: JSON.stringify(user),
    };

    // Perform POST request
    fetch('/api/login', requestOptions)
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('POST request successful. Response:', data);
            // Handle the successful response here
        })
        .catch(error => {
            console.error('POST request error:', error.message);
            // Handle errors here
        });
}

// Listening for login
const loginButton = document.getElementById("login");
loginButton.addEventListener("click", () => {
    login();
})

// Cookies
function setCookie(name, value, daysToLive) {
    const date = new Date();
    date.setTime(date.getTime() + daysToLive * 24 * 60 * 60);
    let expires = "expires=" + date.toUTCString();
    document.cookie = `${name}=${value}: ${expires}; path=/`
}
function deleteCookie(name) {
    setCookie(name, null, null);
}
function getCookie(name) {
    const cDecoded = decodeURIComponent(document.cookie);
    const cArray = cDecoded.split("; ")
    let result = null;
    cArray.forEach(element => {
        if (element.indexOf(name) == 0) {
            result = element.substring(name.length + 1)
        }
    })
    return result;
}

    
});
