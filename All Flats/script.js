// Button the responsive class for the navigation menu.
function myMenuFunction() {
    const i = document.getElementById("navMenu");
    if (i.className === "nav_menu") {
        i.className += " responsive";
    } else {
        i.className = "nav_menu";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    // Logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function () {
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

    // Load flats data and mark favorites
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUser = users.find(user => user.fullname === userFullname);

    if (loggedInUser && loggedInUser.allflats) {
        flatsData = loggedInUser.allflats.map(flat => {
            flat.favorite = loggedInUser.favouriteflats.some(favFlat => (
                favFlat.name === flat.name &&
                favFlat.streetName === flat.streetName &&
                favFlat.rentPrice === flat.rentPrice &&
                favFlat.dateAvailable === flat.dateAvailable
            ));
            return flat;
        });
    } else {
        flatsData = [];
    }

    // Set up filter and sort event listeners
    document.getElementById("cityFilter").addEventListener("input", renderFlatsTable);
    document.getElementById("minPrice").addEventListener("input", renderFlatsTable);
    document.getElementById("maxPrice").addEventListener("input", renderFlatsTable);
    document.getElementById("minArea").addEventListener("input", renderFlatsTable);
    document.getElementById("maxArea").addEventListener("input", renderFlatsTable);

    const sortCheckboxes = document.querySelectorAll('input[name="sort"]');
    sortCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', renderFlatsTable);
    });

    renderFlatsTable();
});

// Filters and sorts flats, then updates the table display
function renderFlatsTable() {
    const cityFilter = document.querySelector("#cityFilter").value.toLowerCase();
    const minPrice = parseFloat(document.getElementById("minPrice").value) || 0;
    const maxPrice = parseFloat(document.getElementById("maxPrice").value) || Number.MAX_SAFE_INTEGER;
    const minArea = parseFloat(document.getElementById("minArea").value) || 0;
    const maxArea = parseFloat(document.getElementById("maxArea").value) || Number.MAX_SAFE_INTEGER;

    let flatsFiltered = flatsData.filter(flat =>
        flat.city.toLowerCase().includes(cityFilter) &&
        flat.rentPrice >= minPrice && flat.rentPrice <= maxPrice &&
        flat.areaSize >= minArea && flat.areaSize <= maxArea
    );

    const sortBy = document.querySelector('input[name="sort"]:checked').value;

    switch (sortBy) {
        case 'city-asc':
            flatsFiltered.sort((a, b) => a.city.localeCompare(b.city));
            break;
        case 'city-desc':
            flatsFiltered.sort((a, b) => b.city.localeCompare(a.city));
            break;
        case 'price-asc':
            flatsFiltered.sort((a, b) => a.rentPrice - b.rentPrice);
            break;
        case 'price-desc':
            flatsFiltered.sort((a, b) => b.rentPrice - a.rentPrice);
            break;
        case 'area-asc':
            flatsFiltered.sort((a, b) => a.areaSize - b.areaSize);
            break;
        case 'area-desc':
            flatsFiltered.sort((a, b) => b.areaSize - a.areaSize);
            break;
        default:
            break;
    }

    const flatsTableBody = document.getElementById("flatsTableBody");
    flatsTableBody.innerHTML = "";

    flatsFiltered.forEach(flat => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${flat.name}</td>
            <td>${flat.city}</td>
            <td>${flat.streetName}</td>
            <td>${flat.streetNumber}</td>
            <td>${flat.areaSize}</td>
            <td>${flat.hasAC ? "Yes" : "No"}</td>
            <td>${flat.yearBuilt}</td>
            <td>${flat.rentPrice}</td>
            <td>${flat.dateAvailable}</td>
            <td>
                <button class="btx" onclick="toggleFavorite(${flatsData.indexOf(flat)})">
                    ${flat.favorite ? '<i class="bx bxs-heart"></i>' : '<i class="bx bx-heart"></i>'}
                </button>
            </td>
            <td>
                <button class="btn-delete" onclick="deleteFlat(${flatsData.indexOf(flat)})"><i class='bx bxs-box'></i></button>
            </td>
        `;
        flatsTableBody.appendChild(row);
    });
}

// Toggles the favorite status of a flat and updates storage
function toggleFavorite(index) {
    flatsData[index].favorite = !flatsData[index].favorite;
    updateFavoriteFlatsInStorage(flatsData[index]);
    renderFlatsTable();
}

// Updates the favorite flats list in localStorage
function updateFavoriteFlatsInStorage(flat) {
    const userFullname = localStorage.getItem('userFullname');
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUserIndex = users.findIndex(user => user.fullname === userFullname);

    if (loggedInUserIndex !== -1) {
        const loggedInUser = users[loggedInUserIndex];

        // Check if the flat is already a favorite based on all unique identifiers
        const isAlreadyFavorite = loggedInUser.favouriteflats.some(favFlat => (
            favFlat.name === flat.name &&
            favFlat.streetName === flat.streetName &&
            favFlat.rentPrice === flat.rentPrice &&
            favFlat.dateAvailable === flat.dateAvailable
        ));

        if (flat.favorite && !isAlreadyFavorite) {
            loggedInUser.favouriteflats.push(flat);
        } else if (!flat.favorite && isAlreadyFavorite) {
            loggedInUser.favouriteflats = loggedInUser.favouriteflats.filter(favFlat => (
                favFlat.name !== flat.name ||
                favFlat.streetName !== flat.streetName ||
                favFlat.rentPrice !== flat.rentPrice ||
                favFlat.dateAvailable !== flat.dateAvailable
            ));
        }

        users[loggedInUserIndex] = loggedInUser;
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        alert('User not found. Please log in again.');
        window.location.href = '../Login/index.html';
    }
}

// Deletes a flat from both the flatsData array and the localStorage
function deleteFlat(index) {
    const flatToDelete = flatsData[index];
    flatsData.splice(index, 1);
    removeFlatFromStorage(flatToDelete);
    renderFlatsTable();
}

// Removes a flat from the localStorage
function removeFlatFromStorage(flat) {
    const userFullname = localStorage.getItem('userFullname');
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const loggedInUserIndex = users.findIndex(user => user.fullname === userFullname);

    if (loggedInUserIndex !== -1) {
        const loggedInUser = users[loggedInUserIndex];

        // Remove flat from allflats
        loggedInUser.allflats = loggedInUser.allflats.filter(allFlat => (
            allFlat.name !== flat.name ||
            allFlat.streetName !== flat.streetName ||
            allFlat.rentPrice !== flat.rentPrice ||
            allFlat.dateAvailable !== flat.dateAvailable
        ));

        // Remove flat from favouriteflats if it's there
        loggedInUser.favouriteflats = loggedInUser.favouriteflats.filter(favFlat => (
            favFlat.name !== flat.name ||
            favFlat.streetName !== flat.streetName ||
            favFlat.rentPrice !== flat.rentPrice ||
            favFlat.dateAvailable !== flat.dateAvailable
        ));

        users[loggedInUserIndex] = loggedInUser;
        localStorage.setItem('users', JSON.stringify(users));
    } else {
        alert('User not found. Please log in again.');
        window.location.href = '../Login/index.html';
    }
}