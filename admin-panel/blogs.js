async function fetchAllBlogs() {
    try {
        const response = await fetch('http://localhost:5000/blog/getAllBlogs');
        if (!response.ok) {
            throw new Error('Failed to fetch blogs');
        }
        const blogs = await response.json();
        displayBlogs(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error.message);
    }
}

function displayBlogs(blogs) {
    const blogsContainer = document.getElementById("all-blogs");
    blogsContainer.innerHTML = ""; 
    
    if (blogs && blogs.length > 0) {
        blogs.forEach(function(blog) {
            const blogDiv = document.createElement("div");
            blogDiv.classList.add("blog-item");

            const blogTitle = document.createElement("h3");
            blogTitle.textContent = blog.title;

            const blogContent = document.createElement("p");
            blogContent.textContent = blog.content;

            const blogImage = document.createElement("img");
            blogImage.src = blog.image;
            blogImage.alt = blog.imageAlt;

            const updateButton = document.createElement("button");
            updateButton.textContent = "Update";
            updateButton.classList.add("update-btn");
            updateButton.dataset.blogId = blog._id;

            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.classList.add("delete-btn");
            deleteButton.addEventListener('click', () => {
                const confirmed = confirm("Are you sure you want to delete this blog?");
                if (confirmed) {
                    deleteBlog(blog._id);
                }
            });

            //deleteButton.dataset.blogId = blog._id;

            blogDiv.appendChild(blogTitle);
            blogDiv.appendChild(blogContent);
            blogDiv.appendChild(blogImage);
            blogDiv.appendChild(updateButton);
            blogDiv.appendChild(deleteButton);

            blogsContainer.appendChild(blogDiv);
        });
    } else {
        blogsContainer.textContent = "No blogs found.";
    }
}

async function addBlog(title, content, image) {
    try {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('content', content);
        

        const response = await fetch('http://localhost:5000/blog/createBlog', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Failed to add blog');
        }
        const data = await response.json();
        fetchAllBlogs();
    } catch (error) {
        console.error('Error adding blog:', error.message);
    }
}

async function updateBlog(blogId, title, content, image) {
    try {

        fetch(`http://localhost:5000/blog/getBlogById/${blogId}`)

        const formData = new FormData();
        formData.append('title', title);
        formData.append('image', image);
        formData.append('content', content);

        console.log(formData);
        console.log(blogId)

        fetch(`http://localhost:5000/blog/getBlogById/${blogId}`)

        const response = await fetch(`http://localhost:5000/blog/updateBlog/${blogId}`, {
            method: 'PUT',
            body: formData
        });
        if (!response.ok) {
            throw new Error('Failed to update blog');
        }
        const data = await response.json();
        fetchAllBlogs();
    } catch (error) {
        console.error('Error updating blog:', error.message);
    }
}

async function deleteBlog(blogId) {
    try {
        console.log("Deleting blog with ID:", blogId);
        if (!blogId) {
            throw new Error('Invalid blog ID');
        }

        const response = await fetch(`http://localhost:5000/blog/deleteBlog/${blogId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Failed to delete blog');
        }

        const data = await response.json();
        fetchAllBlogs();
    } catch (error) {
        console.error('Error deleting blog:', error.message);
       
        alert('Failed to delete blog');
    }
}


/*document.addEventListener("click", function(event) {
    if (event.target.classList.contains("delete-btn")) {
        const blogDiv = event.target.closest('.blog-item');
        
        if (blogDiv) {
            const blogId = blogDiv.dataset.blogId;
            console.log("Clicked delete button. Blog ID:", blogId); 

            const confirmed = confirm("Are you sure you want to delete this blog?");
            if (confirmed) {
                deleteBlog(blogId);
            }
        }
    }
});*/

document.getElementById("add-blog-btn").addEventListener("click", function() {
    const addBlogModal = document.getElementById("add-blog-modal");
    addBlogModal.style.display = "block";
});

document.getElementById("add-blog-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const title = document.getElementById("add-title").value;
    const content = document.getElementById("add-content").value;
    const image = document.getElementById("add-image").files[0];
    addBlog(title, content, image);
});

document.addEventListener("click", function(event) {
    if (event.target.classList.contains("update-btn")) {
        const blogId = event.target.dataset.blogId;
        const updateBlogModal = document.getElementById("update-blog-modal");
        updateBlogModal.style.display = "block";

        const blogTitle = document.getElementById("update-title");
        const blogContent = document.getElementById("update-content");

        const blogImage = document.getElementById("update-image").src;

        blogTitle.value = blogTitle.textContent; 
        blogContent.value = blogContent.textContent; 
   
        document.getElementById("update-image").value = blogImage;

        const updateForm = document.getElementById("update-blog-form");
        if (!updateForm.hasListener) {

            updateForm.addEventListener("submit", function(event) {
                event.preventDefault();
                const title = blogTitle.value;
                const content = blogContent.value;

                const image = document.getElementById("update-image").files[0];
                updateBlog(blogId, title, content, image);
            });
            updateForm.hasListener = true;
        }
    }
});

document.querySelectorAll(".close").forEach(function(button) {
    button.addEventListener("click", function() {
        const addBlogModal = document.getElementById("add-blog-modal");
        addBlogModal.style.display = "none";

        const updateBlogModal = document.getElementById("update-blog-modal");
        updateBlogModal.style.display = "none";
    });
});

fetchAllBlogs();
