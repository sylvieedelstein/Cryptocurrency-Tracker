// This event listener waits for the DOM to be fully loaded before executing the provided function
document.addEventListener('DOMContentLoaded', function () {
    // Get the form element with the id 'account'
    const accountForm = document.getElementById('account');

    // Attach a submit event listener to the form
    accountForm.addEventListener('submit', function (event) {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Create a new array to store user data
        let users = [];

        // SQL query to select all records from the 'account' table
        let sql = `SELECT * FROM crypto.account`;

        // Establish a connection to the MySQL database
        con.connect(function (err) {
            if (err) throw err;
            console.log("Connected!");

            // Execute the SQL query to retrieve user records
            con.query(sql, function (err, result) {
                if (err) throw err;
                // Store the retrieved user records in the 'users' array
                users = result;
                console.log(users);
            });
        });

        // Get form data from input fields
        const formData = {
            username: document.getElementById('username').value,
            firstname: document.getElementById('firstname').value,
            lastname: document.getElementById('lastname').value,
            DOB: document.getElementById('DOB').value,
            password: document.getElementById('password').value
        };

        // Send the form data to the server for registration
        fetch('api/register', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        })
            .then(response => {
                // Check if the server response is not OK
                if (!response.ok) {
                    throw new Error(`Server error: ${response.status}`);
                }
                // Parse the response as text
                return response.text();
            })
            .then(responseText => {
                // Display an alert with the server response
                alert(responseText);
                // Redirect to the login page after successful registration
                window.location.href = "/login";
            })
            .catch(error => {
                // Log and alert an error if it occurs during the fetch operation
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            });
    });
});
