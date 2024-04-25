document.addEventListener('DOMContentLoaded', async function () {
    try {
        const queryCountResponse = await fetch('http://localhost:5000/contact/queryCount');
        if (!queryCountResponse.ok) {
            throw new Error('Failed to fetch query count');
        }
        const queryCountData = await queryCountResponse.json();
        console.log('Query count data:', queryCountData); 

        const queryCountSpan = document.getElementById('query-count');
        if (queryCountSpan) {
            if (queryCountData && queryCountData.queryCount !== undefined) {
                queryCountSpan.textContent = queryCountData.queryCount.toString();
            } else {
                console.error('Query count data or queryCount property is undefined');
            }
        } else {
            console.error('Element with ID "query-count" not found');
        }

        const allBlogsResponse = await fetch('http://localhost:5000/blog/getAllBlogs');
        if (!allBlogsResponse.ok) {
            throw new Error('Failed to fetch all blogs');
        }
        const allBlogsData = await allBlogsResponse.json();
        console.log('All blogs data:', allBlogsData); 

        const recentBlogsContainer = document.getElementById('recent-blogs');
        if (recentBlogsContainer) {
            const lastTwoBlogs = allBlogsData.slice(-2); 
            lastTwoBlogs.forEach(blog => {
                const blogElement = document.createElement('div');
                blogElement.classList.add('blog-item');
                blogElement.innerHTML = `
                    <h4>${blog.title}</h4>
                    <img src="${blog.image}" alt="${blog.title} Image">
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
