
document.addEventListener('DOMContentLoaded', function () {
      // Get references to form elements by their IDs
    const registerForm = document.getElementById('registerForm');

    const userName = document.getElementById('fullname');
    const userEmail = document.getElementById('email');
    const userPassword = document.getElementById('password');
    const userCpassword = document.getElementById('confirmpassword');
    const userFname = document.getElementById('firstname');
    const userLname = document.getElementById('lastname');
    const userDate = document.getElementById('dateofbirth');
    const userCheck = document.getElementById('checkbox');

    // Validation logic
    function validateName() {
        let errorName = document.getElementById('errorHintName');
        const regex = /^[A-Z][a-z]+(?: [A-Z][a-z]+)*$/;
    
        if (userName.value.trim() === '') {
            errorName.textContent = "This field is required";
            errorName.style.color = 'red';
        } else if (regex.test(userName.value)) {
            errorName.textContent = 'Correct';
            errorName.style.color = 'green';
        } else {
            errorName.textContent = 'This is not a valid name';
            errorName.style.color = 'red';
        }
    }
    function validateEmail() {
        let errorEmail = document.getElementById('errorHintEmail');
        const regex = /^[a-z0-9]+@[a-z]+\.[a-z]{2,}$/;

        if (userEmail.value.trim() === '') {
            errorEmail.textContent = "This field is required";
            errorEmail.style.color = 'red';
        } else if (regex.test(userEmail.value)) {
            errorEmail.textContent = 'Correct';
            errorEmail.style.color = 'green';
        } else {
            errorEmail.textContent = 'This is not a valid email';
            errorEmail.style.color = 'red';
        }
    }

    function validatePassword() {
        let errorPassword = document.getElementById('errorHintPassword');
        const regex = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,})/;

        if (userPassword.value.trim() === '') {
            errorPassword.textContent = "This field is required";
            errorPassword.style.color = 'red';
        } else if (regex.test(userPassword.value)) {
            errorPassword.textContent = 'Correct';
            errorPassword.style.color = 'green';
        } else {
            errorPassword.textContent = 'This is not a valid password';
            errorPassword.style.color = 'red';
        }
    }

    function validateCpassword() {
        let errorCpassword = document.getElementById('errorHintCpassword');

        if (userCpassword.value.trim() === '') {
            errorCpassword.textContent = "This field is required";
            errorCpassword.style.color = 'red';
        } else if (userCpassword.value === userPassword.value) {
            errorCpassword.textContent = 'Passwords match';
            errorCpassword.style.color = 'green';
        } else {
            errorCpassword.textContent = 'Passwords do not match';
            errorCpassword.style.color = 'red';
        }
    }

    function validateFname() {
        let errorFirstName = document.getElementById('errorHintFirstName');

        if (userFname.value.trim() === '') {
            errorFirstName.textContent = "This field is required";
            errorFirstName.style.color = 'red';
        } else if (userFname.value.length >= 2) {
            errorFirstName.textContent = 'Correct';
            errorFirstName.style.color = 'green';
        } else {
            errorFirstName.textContent = 'This is not a valid first name';
            errorFirstName.style.color = 'red';
        }
    }

    function validateLname() {
        let errorLastName = document.getElementById('errorHintLastName');

        if (userLname.value.trim() === '') {
            errorLastName.textContent = "This field is required";
            errorLastName.style.color = 'red';
        } else if (userLname.value.length >= 2) {
            errorLastName.textContent = 'Correct';
            errorLastName.style.color = 'green';
        } else {
            errorLastName.textContent = 'This is not a valid last name';
            errorLastName.style.color = 'red';
        }
    }

    function validateDate() {
        let errorDOB = document.getElementById('errorHintDOB');
        const dateOfBirth = new Date(userDate.value);
        let currentDate = new Date();
        let age = currentDate.getFullYear() - dateOfBirth.getFullYear();

        if (userDate.value.trim() === '') {
            errorDOB.textContent = "This field is required";
            errorDOB.style.color = 'red';
        } else if (age >= 18 && age <= 120) {
            errorDOB.textContent = 'Correct age';
            errorDOB.style.color = 'green';
        } else {
            errorDOB.textContent = 'Incorrect age';
            errorDOB.style.color = 'red';
        }
    }

    // Add blur event listeners
    userName.addEventListener('blur', validateName);
    userEmail.addEventListener('blur', validateEmail);
    userPassword.addEventListener('blur', validatePassword);
    userCpassword.addEventListener('blur', validateCpassword);
    userFname.addEventListener('blur', validateFname);
    userLname.addEventListener('blur', validateLname);
    userDate.addEventListener('blur', validateDate);

    // Form submission
    registerForm.addEventListener('submit', function (event) {
        event.preventDefault();

        validateName();
        validateEmail();
        validatePassword();
        validateCpassword();
        validateFname();
        validateLname();
        validateDate();
        // Additional checks before submitting
        if (userName.value.trim() === '' || userEmail.value.trim() === '' || userPassword.value.trim() === '' || userFname.value.trim() === '' || userLname.value.trim() === '' || userDate.value.trim() === '') {
            alert('Please complete all fields');
            return;
        }

        if (userPassword.value !== userCpassword.value) {
            alert('Passwords do not match');
            return;
        }

        if (!userCheck.checked) {
            alert('You must agree to the terms & conditions!');
            return;
        }

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const existingUser = users.find(user => user.email === userEmail.value);
        // Creating an object
        if (existingUser) {
            alert('User with this email already exists.');
        } else {
            const newUser = {
                fullname: userName.value,
                email: userEmail.value,
                password: userPassword.value,
                firstname: userFname.value,
                lastname: userLname.value,
                dateofbirth: userDate.value,
                allflats: [],
                favouriteflats: []
            };
            // Save user data to localStorage
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('userFullname', userName.value);
            alert('Registration successful!');
            // Redirect to login page
            window.location.href = '../Login/index.html';
        }
    });
});