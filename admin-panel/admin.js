document.addEventListener('DOMContentLoaded', async function () {
    try {
        // Fetch query count
        const queryCountResponse = await fetch('/contact/queryCount');
        if (!queryCountResponse.ok) {
            throw new Error('Failed to fetch query count');
        }
        const queryCountData = await queryCountResponse.json();
        const queryCountSpan = document.getElementById('query-count');
        if (queryCountSpan) {
            queryCountSpan.textContent = queryCountData.count.toString();
        } else {
            console.error('Element with ID "query-count" not found');
        }

        // Fetch all blogs
        const allBlogsResponse = await fetch('http://localhost:5000/blog/getAllBlogs');
        if (!allBlogsResponse.ok) {
            throw new Error('Failed to fetch all blogs');
        }
        const allBlogsData = await allBlogsResponse.json();
        
        // Display the last two blogs
        const recentBlogsContainer = document.getElementById('recent-blogs');
        if (recentBlogsContainer) {
            const lastTwoBlogs = allBlogsData.slice(-2); // Get the last two blogs
            lastTwoBlogs.forEach(blog => {
                const blogElement = document.createElement('div');
                blogElement.classList.add('blog-item');
                blogElement.innerHTML = `
                    <h4>${blog.title}</h4>
                    ${blog.image}
                    <p>${blog.content}</p>
                `;
                recentBlogsContainer.appendChild(blogElement);
            });
        } else {
            console.error('Element with ID "recent-blogs" not found');
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});

