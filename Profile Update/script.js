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
  // Populate user profile form
    const updateForm = document.getElementById('updateForm');
    const userName = document.getElementById('fullname');
    const userEmail = document.getElementById('email');
    const userOldPassword = document.getElementById('oldpassword');
    const userNewPassword = document.getElementById('newpassword');
    const userFirstName = document.getElementById('firstname');
    const userLastName = document.getElementById('lastname');
    const userDateOfBirth = document.getElementById('dateofbirth');
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const rememberMe = localStorage.getItem('rememberMe') === 'true';

    if (loggedInUser) {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        let currentUser = users.find(user => user.email === loggedInUser.email);

        if (currentUser) {
            userName.value = currentUser.fullname;
            userEmail.value = currentUser.email;
            userEmail.readOnly = true;  // Make the email field read-only
            userFirstName.value = currentUser.firstname;
            userLastName.value = currentUser.lastname;
            userDateOfBirth.value = currentUser.dateofbirth;
        } else {
            alert('User not found. Please log in again.');
            window.location.href = '../Login/index.html';
        }
 // Validation functions for user inputs
        function validateName() {
            let errorName = document.getElementById('errorHintName');
            const regex = /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/;

            if (userName.value.trim() === '') {
                errorName.textContent = "This field is required";
                errorName.style.color = 'red';
                return false;
            } else if (regex.test(userName.value)) {
                errorName.textContent = 'Correct';
                errorName.style.color = 'green';
                return true;
            } else {
                errorName.textContent = 'This is not a valid name';
                errorName.style.color = 'red';
                return false;
            }
        }

        function validateEmail() {
            let errorEmail = document.getElementById('errorHintEmail');
            const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,}$/;

            if (userEmail.value.trim() === '') {
                errorEmail.textContent = "This field is required";
                errorEmail.style.color = 'red';
                return false;
            } else if (regex.test(userEmail.value)) {
                errorEmail.textContent = 'Correct';
                errorEmail.style.color = 'green';
                return true;
            } else {
                errorEmail.textContent = 'This is not a valid email';
                errorEmail.style.color = 'red';
                return false;
            }
        }

        function validatePassword() {
            let errorPassword = document.getElementById('errorHintPassword');
            const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})/;

            if (userOldPassword.value.trim() === '') {
                errorPassword.textContent = "This field is required";
                errorPassword.style.color = 'red';
                return false;
            } else if (regex.test(userOldPassword.value)) {
                errorPassword.textContent = 'Correct';
                errorPassword.style.color = 'green';
                return true;
            } else {
                errorPassword.textContent = 'This is not a valid password';
                errorPassword.style.color = 'red';
                return false;
            }
        }

        function validateNewPassword() {
            let errorNpassword = document.getElementById('errorHintNpassword');
            const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})/;

            if (userNewPassword.value.trim() === '') {
                errorNpassword.textContent = "This field is required";
                errorNpassword.style.color = 'red';
                return false;
            } else if (regex.test(userNewPassword.value)) {
                errorNpassword.textContent = 'Correct';
                errorNpassword.style.color = 'green';
                return true;
            } else {
                errorNpassword.textContent = 'This is not a valid password';
                errorNpassword.style.color = 'red';
                return false;
            }
        }

        function validateFname() {
            let errorFirstName = document.getElementById('errorHintFirstName');

            if (userFirstName.value.trim() === '') {
                errorFirstName.textContent = "This field is required";
                errorFirstName.style.color = 'red';
                return false;
            } else if (userFirstName.value.length >= 2) {
                errorFirstName.textContent = 'Correct';
                errorFirstName.style.color = 'green';
                return true;
            } else {
                errorFirstName.textContent = 'This is not a valid first name';
                errorFirstName.style.color = 'red';
                return false;
            }
        }

        function validateLname() {
            let errorLastName = document.getElementById('errorHintLastName');

            if (userLastName.value.trim() === '') {
                errorLastName.textContent = "This field is required";
                errorLastName.style.color = 'red';
                return false;
            } else if (userLastName.value.length >= 2) {
                errorLastName.textContent = 'Correct';
                errorLastName.style.color = 'green';
                return true;
            } else {
                errorLastName.textContent = 'This is not a valid last name';
                errorLastName.style.color = 'red';
                return false;
            }
        }

        function validateDate() {
            let errorDOB = document.getElementById('errorHintDOB');
            const dateOfBirth = new Date(userDateOfBirth.value);
            let currentDate = new Date();
            let age = currentDate.getFullYear() - dateOfBirth.getFullYear();

            if (userDateOfBirth.value.trim() === '') {
                errorDOB.textContent = "This field is required";
                errorDOB.style.color = 'red';
                return false;
            } else if (age >= 18 && age <= 120) {
                errorDOB.textContent = 'Correct age';
                errorDOB.style.color = 'green';
                return true;
            } else {
                errorDOB.textContent = 'Must be at least 18 years old';
                errorDOB.style.color = 'red';
                return false;
            }
        }

        function preventEmailChange() {
            userEmail.addEventListener('keydown', function (event) {
                event.preventDefault();
                alert('Email cannot be changed.');
            });
            userEmail.addEventListener('paste', function (event) {
                event.preventDefault();
                alert('Email cannot be changed.');
            });
        }

        preventEmailChange();

        userName.addEventListener('blur', validateName);
        userEmail.addEventListener('blur', validateEmail);
        userNewPassword.addEventListener('blur', validateNewPassword);
        userOldPassword.addEventListener('blur', validatePassword);
        userFirstName.addEventListener('blur', validateFname);
        userLastName.addEventListener('blur', validateLname);
        userDateOfBirth.addEventListener('blur', validateDate);
      // Handle form submission
        updateForm.addEventListener('submit', function (event) {
            event.preventDefault();

            const isNameValid = validateName();
            const isEmailValid = validateEmail();
            const isNewPasswordValid = validateNewPassword();
            const isPasswordValid = validatePassword();
            const isFnameValid = validateFname();
            const isLnameValid = validateLname();
            const isDateValid = validateDate();

            if (isNameValid && isEmailValid && isNewPasswordValid && isPasswordValid && isFnameValid && isLnameValid && isDateValid) {
                updateUserProfile(currentUser, users, rememberMe);
            } else {
                alert('Please fill in the form correctly before submission.');
            }
        });
   // Update user profile
        function updateUserProfile(currentUser, users, rememberMe) {
            if (userOldPassword.value === '' || userOldPassword.value !== currentUser.password) {
                alert('Old password is incorrect.');
                return;
            }
            if (userNewPassword.value === currentUser.password) {
                alert('New password cannot be the same as the old password.');
                return;
            }

            if (userNewPassword.value !== '') {
                currentUser.password = userNewPassword.value;
                const updatedLoggedInUser = { email: currentUser.email, password: userNewPassword.value };
                localStorage.setItem('loggedInUser', JSON.stringify(updatedLoggedInUser));
            }
            currentUser.fullname = userName.value;
            currentUser.firstname = userFirstName.value;
            currentUser.lastname = userLastName.value;
            currentUser.dateofbirth = userDateOfBirth.value;
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('userFullname', userName.value);
            alert('Profile updated successfully!');
            window.location.href = '../Home/index.html';
        }
    } else {
        alert('You must be logged in to update your profile.');
        window.location.href = '../Login/index.html';
    }
});