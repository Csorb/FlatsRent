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
   // Load users and display favorite flats
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = users.find(user => user.fullname === userFullname);

    if (loggedInUser && loggedInUser.favouriteflats) {
        displayFavoriteFlats(loggedInUser.favouriteflats);
    } else {
        alert('No favorite flats found.');
    }
       // Display favorite flats in a table
    function displayFavoriteFlats(favoriteFlats) {
        const tableBody = document.querySelector('#favoriteFlatsTable tbody');
        tableBody.innerHTML = ''; 

        favoriteFlats.forEach((flat, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${flat.name}</td>
                <td>${flat.city}</td>
                <td>${flat.streetName}</td>
                <td>${flat.streetNumber}</td>
                <td>${flat.areaSize}</td>
                <td>${flat.hasAC ? 'Yes' : 'No'}</td>
                <td>${flat.yearBuilt}</td>
                <td>${flat.rentPrice}</td>
                <td>${flat.dateAvailable}</td>
                <td><i class="bx bxs-heart removeBtn"></i></td>
            `;
            // Remove button functionality
            const removeButton = row.querySelector('.removeBtn');
            removeButton.addEventListener('click', function() {
                favoriteFlats.splice(index, 1); 
                updateLocalStorage(users); 
                row.remove(); 
                alert('Flat removed from favorites.');
            });

            tableBody.appendChild(row);
        });
    }
    // Update users in localStorage
    function updateLocalStorage(usersArray) {
        localStorage.setItem('users', JSON.stringify(usersArray));
    }

});