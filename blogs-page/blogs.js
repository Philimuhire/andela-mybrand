document.addEventListener('DOMContentLoaded', function () {
    const menuIcon = document.getElementById('menuIcon');
    const navLinks = document.getElementById('navLinks');

    menuIcon.addEventListener('click', function () {
        navLinks.classList.toggle('show');
    });
});

document.addEventListener('DOMContentLoaded', function () {
    const blogContainer = document.querySelector('.blogs-content');

    fetch('http://localhost:5000/blog/getAllBlogs')
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to fetch blogs');
            }
            return response.json();
        })
        .then(data => {
            // Iterate through the fetched blogs and create HTML elements dynamically
            data.forEach(blog => {
                const blogDiv = document.createElement('div');
                blogDiv.classList.add('blog');
                // Create HTML structure for each blog and append it to the container
                blogDiv.innerHTML = `
                    <div class="image">
                        <img src="${blog.image}" alt="Blog Image">
                    </div>
                    <div class="description">
                        <h3>Posted on ${new Date(blog.createdAt).toLocaleDateString()}</h3>
                        <h1>${blog.title}</h1>
                        <p>${blog.content}</p>
                        <a href="/blogs-page/${blog._id}.html">Read more</a>
                    </div>
                `;
                blogContainer.appendChild(blogDiv);
            });
        })
        .catch(error => console.error('Error fetching blogs:', error.message));
});
