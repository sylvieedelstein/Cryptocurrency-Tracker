document.addEventListener('DOMContentLoaded', function() {
    const spacebarElement = document.querySelector('.spacebar');

    if (spacebarElement) {
        function fadeIn() {
            spacebarElement.style.opacity = 1;
        }

        function fadeOut() {
            spacebarElement.style.opacity = 0.25;
        }

        fadeIn();

        setInterval(() => {
            setTimeout(fadeOut, 0);
            setTimeout(fadeIn, 1000);
        }, 2000);

        // Button function for the spacebar
        spacebarElement.addEventListener('click', function(event) {
            goHome();
        });

        // Spacebar functionality
        window.addEventListener("keydown", checkKeyPressed, false);
        function checkKeyPressed(evt) {
            if (evt.keyCode === 32) {
                window.location.href = "/home";
            }
        }
    } else {
        console.error("Element with class 'spacebar' not found");
    }
});

// Function to handle redirection
function goHome() {
    // Redirect the user to home.html
    window.location.href = '/home';
}



