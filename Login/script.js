document.addEventListener('DOMContentLoaded', function() {
    const rememberMeCheckbox = document.getElementById('rememberMe');
    const rememberMe = localStorage.getItem('rememberMe') === 'true';
    
    if (rememberMe) {
        rememberMeCheckbox.checked = true;
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser) {
            document.getElementById('loginEmail').value = loggedInUser.email;
            document.getElementById('loginPassword').value = loggedInUser.password;
        }
    }
    // Handle login form submission
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();
        const email = document.getElementById('loginEmail').value;
        const password = document.getElementById('loginPassword').value;
        const rememberMeChecked = rememberMeCheckbox.checked;

        let users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);

        if (user) {
            if (rememberMeChecked) {
                localStorage.setItem('loggedInUser', JSON.stringify({ email: email, password: password }));
            } else {
                localStorage.removeItem('loggedInUser');
            }

            localStorage.setItem('userFullname', user.fullname);
            alert('Login successful!');
            window.location.href = '../Home/index.html';
        } else {
            alert('Invalid email or password');
        }
    });
      // Redirect to register page
    document.getElementById('registerBtn').addEventListener('click', function(event) {
        event.preventDefault();
        window.location.href = '../Register/index.html';
    });
    // Check if user exists
    function userExists(email, password) {
        let users = JSON.parse(localStorage.getItem('users')) || [];
        return users.some(user => user.email === email && user.password === password);
    }
    // Registration form submission
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();
            const email = document.getElementById('registerEmail').value;
            const password = document.getElementById('registerPassword').value;
            const fullname = document.getElementById('registerFullname').value;

            if (userExists(email, password)) {
                alert('User already exists with the same email and password!');
            } else {
                let users = JSON.parse(localStorage.getItem('users')) || [];
                users.push({ email: email, password: password, fullname: fullname });
                localStorage.setItem('users', JSON.stringify(users));
                alert('Registration successful!');
                window.location.href = '../Login/index.html';
            }
        });
    }
});