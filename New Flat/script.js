// Button the responsive class for the navigation menu.
function myMenuFunction(){
    const i = document.getElementById("navMenu");
    if(i.className === "nav_menu"){
        i.className += " responsive";
    }else{
        i.className = "nav_menu";
    }
}
document.addEventListener('DOMContentLoaded', function() {
      // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('loggedInUser'); 
        alert('Logged out successfully!');
        window.location.href = '../Login/index.html'; 
    });
}
   // Welcome message
    const userFullname = localStorage.getItem('userFullname');

    if (userFullname) {
        document.getElementById('welcomeMessage').textContent = `Hello, ${userFullname}`;
    } else {
        document.getElementById('welcomeMessage').textContent = 'Hello, Guest';
    }
});
// Handles new flat form submission
document.getElementById('newFlatForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const city = document.getElementById('city').value;
    const streetName = document.getElementById('streetName').value;
    const streetNumber = document.getElementById('streetNumber').value;
    const areaSize = document.getElementById('areaSize').value;
    const hasAC = document.getElementById('hasAC').checked;
    const yearBuilt = document.getElementById('yearBuilt').value;
    const rentPrice = document.getElementById('rentPrice').value;
    const dateAvailable = document.getElementById('dateAvailable').value;
   // Validate form values
    if (!name || !city || !streetName || !streetNumber || !areaSize || !yearBuilt || !rentPrice || !dateAvailable) {
        alert('All fields except AC are required!');
        return;
    }

    if (isNaN(streetNumber) || streetNumber <= 0) {
        alert('Street Number must be a positive number!');
        return;
    }

    if (isNaN(areaSize) || areaSize <= 0) {
        alert('Area Size must be a positive number!');
        return;
    }

    if (isNaN(yearBuilt) || yearBuilt <= 0) {
        alert('Year Built must be a positive number!');
        return;
    }

    if (isNaN(rentPrice) || rentPrice <= 0) {
        alert('Rent Price must be a positive number!');
        return;
    }

    const newFlat = {
        name,
        city,
        streetName,
        streetNumber,
        areaSize,
        hasAC,
        yearBuilt,
        rentPrice,
        dateAvailable
    };
 // Get logged in user data
    const loggedInUserFullname = localStorage.getItem('userFullname');

    if (!loggedInUserFullname) {
        alert('You must be logged in to save a flat.');
        return;
    }

    let users = JSON.parse(localStorage.getItem('users')) || [];

    const loggedInUser = users.find(user => user.fullname === loggedInUserFullname);
     // Add new flat to user's flats
    if (loggedInUser) {
     
        loggedInUser.allflats = loggedInUser.allflats || [];
        loggedInUser.allflats.push(newFlat);
        loggedInUser.favouriteflats.push(newFlat);
    
        users = users.map(user => user.fullname === loggedInUser.fullname ? loggedInUser : user);
        localStorage.setItem('users', JSON.stringify(users));

        alert('Flat saved successfully!');
    } else {
        alert('User not found. Please log in again.');
        window.location.href = '../Login/index.html';
    }
   // Reset form
    document.getElementById('newFlatForm').reset();
});