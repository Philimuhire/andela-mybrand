document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');

    menuIcon.addEventListener('click', function () {
        navLinks.classList.toggle('show');
    });

    document.querySelector('.login-form').addEventListener('submit', async function (event) {
        event.preventDefault();

        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch('http://localhost:5000/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (response.ok) {
                const data = await response.json();
                if (data.token) {
                    window.location.href = '/admin-panel/admin.html';
                } else {
                    throw new Error(data.message || 'Login failed');
                }
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            alert(error.message || 'Login failed. Please try again later.');
        }
    });
});
