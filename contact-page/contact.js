document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');

    menuIcon.addEventListener('click', function () {
        navLinks.classList.toggle('show');
    });

<<<<<<< Updated upstream
    document.querySelector('.contact-form form').addEventListener('submit', function (event) {
=======
<<<<<<< Updated upstream
    document.getElementById('contact-form').addEventListener('submit', function (event) {
=======
    document.querySelector('.contact-form form').addEventListener('submit', async function (event) {
>>>>>>> Stashed changes
>>>>>>> Stashed changes
        event.preventDefault();

        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;

        try {
            const response = await fetch('http://localhost:5000/contact/saveContactQuery', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    subject: subject,
                    message: message
                })
            });

            if (response.ok) {
                alert('Your query has been submitted successfully!');
            } else {
                const data = await response.json();
                throw new Error(data.message || 'Failed to submit query');
            }
        } catch (error) {
            console.error('Error submitting query:', error);
            alert('Failed to submit query. Please try again later.');
        }
    });
<<<<<<< Updated upstream

    function storeQuery(query) {
        let queries = localStorage.getItem('contactQueries');
        console.log('Existing queries:', queries);
        
        queries = queries ? JSON.parse(queries) : [];
    
        queries.push(query);
    
        localStorage.setItem('contactQueries', JSON.stringify(queries));
        console.log('Updated queries:', queries); 
    }
});
<<<<<<< Updated upstream
=======
=======
});
>>>>>>> Stashed changes
>>>>>>> Stashed changes
