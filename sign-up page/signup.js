document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.querySelector('.signup-form');
    const successMessage = document.getElementById('successMessage');
    const errorMessage = document.getElementById('errorMessage');

    signupForm.addEventListener('submit', function (event) {
        event.preventDefault();

        // Get form inputs
        const username = document.getElementById('username').value;
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;

        // Validate form inputs
        if (!isValidEmail(email)) {
            displayError('Please enter a valid email address.');
            return;
        }

        if (!isValidPassword(password)) {
            displayError('Password must contain at least one uppercase letter, one lowercase letter, one number, one symbol, and be at least 8 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            displayError('Passwords do not match.');
            return;
        }

        // Prepare data for submission
        const userData = {
            username: username,
            email: email,
            password: password
        };

        // Send data to backend
        fetch('http://localhost:5000/auth/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to register user');
            }
            return response.json();
        })
        .then(data => {
            // Handle successful registration
            displaySuccess('Account created successfully!');
            console.log(data.message); // Display success message
            // Redirect to login page
            setTimeout(() => {
                window.location.href = '/login-page/login.html';
            }, 1000); // Redirect after 2 seconds
        })
        .catch(error => {
            // Handle error
            displayError(error.message || 'Registration failed.');
            console.error('Error registering user:', error.message);
        });
    });

    function isValidEmail(email) {
        return email.includes('@') && email.includes('.');
    }

    function isValidPassword(password) {
        return password.length >= 8 &&
            /[a-z]/.test(password) &&
            /[A-Z]/.test(password) &&
            /\d/.test(password) &&
            /[^a-zA-Z\d\s]/.test(password);
    }

    function displaySuccess(message) {
        successMessage.innerText = message;
        successMessage.style.display = 'block';
        errorMessage.style.display = 'none';
    }

    function displayError(message) {
        errorMessage.innerText = message;
        errorMessage.style.display = 'block';
        successMessage.style.display = 'none';
    }
});
