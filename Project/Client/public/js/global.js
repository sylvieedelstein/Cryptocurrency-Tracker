document.addEventListener("DOMContentLoaded", function() {
  // Does not display the navbar on the index page (splashscreen)
  if (window.location.pathname !== "/") {
        
    // Navigation bar HTML as a string
      const navbarHTML = `
        <ul class="navbar">
          <li><a href="/home">Home</a></li>
          <li><a href="/portfolio">Portfolio</a></li>
          <li><a href="/account">My Account</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/">Logout</a></li>
        </ul>
      `;
      
      const navbarContainer = document.createElement("div");

      // Set navbarcontainer to have the navigation bar HTML
      navbarContainer.innerHTML = navbarHTML;

      // Append navbar to document body
      document.body.appendChild(navbarContainer);
  }
});



