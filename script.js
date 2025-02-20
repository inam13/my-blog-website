document.querySelectorAll('.post-date').forEach(el => {
    el.innerText = new Date().toDateString();
});

document.getElementById('darkModeToggle').addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});

document.getElementById("searchBar").addEventListener("input", function () {
    let query = this.value.toLowerCase();
    let posts = document.querySelectorAll(".blog-post");

    posts.forEach(post => {
        let title = post.querySelector("h2").innerText.toLowerCase();
        let content = post.querySelector("p").innerText.toLowerCase();

        if (title.includes(query) || content.includes(query)) {
            post.style.display = "block";
        } else {
            post.style.display = "none";
        }
    });
});

document.querySelectorAll(".filter-btn").forEach(button => {
    button.addEventListener("click", () => {
        let category = button.getAttribute("data-category");
        let posts = document.querySelectorAll(".blog-post");

        posts.forEach(post => {
            if (category === "all" || post.getAttribute("data-category") === category) {
                post.style.display = "block";
            } else {
                post.style.display = "none";
            }
        });
    });
});
function addComment() {
    let commentInput = document.getElementById("commentInput");
    let commentText = commentInput.value.trim();

    if (commentText === "") {
        alert("Please enter a comment!");
        return;
    }

    let commentList = document.querySelector(".comment-list");

    // Create a new comment div
    let newComment = document.createElement("div");
    newComment.classList.add("comment");
    newComment.innerHTML = `<p>${commentText}</p>`;

    // Append the comment to the list
    commentList.appendChild(newComment);

    // Clear the input field
    commentInput.value = "";
}

function subscribeNewsletter() {
    let emailInput = document.getElementById("emailInput").value.trim();
    let message = document.getElementById("subscriptionMessage");

    if (emailInput === "") {
        message.style.color = "red";
        message.innerText = "Please enter a valid email!";
        return;
    }

    // Simulating subscription success
    message.style.color = "green";
    message.innerText = "Thank you for subscribing! 🎉";

    // Clear the input field after subscribing
    document.getElementById("emailInput").value = "";
}

document.getElementById("themeToggle").addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    // Change button text based on mode
    if (document.body.classList.contains("dark-mode")) {
        this.innerText = "☀️ Light Mode";
    } else {
        this.innerText = "🌙 Dark Mode";
    }
});

// Initialize AOS
document.addEventListener("DOMContentLoaded", function () {
    AOS.init({
        duration: 800, // Animation duration in milliseconds
        once: true, // Animation runs only once when scrolled into view
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let currentPost = document.querySelector(".blog-post");
    let currentCategory = currentPost.getAttribute("data-category");
    let allPosts = document.querySelectorAll(".blog-post");
    let relatedContainer = document.querySelector(".related-container");

    relatedContainer.innerHTML = ""; // Clear previous content

    allPosts.forEach(post => {
        if (post !== currentPost && post.getAttribute("data-category") === currentCategory) {
            let postTitle = post.querySelector("h2").innerText;
            let postLink = post.querySelector("a") ? post.querySelector("a").href : "#";

            let relatedItem = document.createElement("a");
            relatedItem.href = postLink;
            relatedItem.classList.add("related-post");
            relatedItem.innerHTML = `<p>${postTitle}</p>`;

            relatedContainer.appendChild(relatedItem);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let pageUrl = encodeURIComponent(window.location.href);
    let pageTitle = encodeURIComponent(document.title);

    document.getElementById("share-facebook").href = `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`;
    document.getElementById("share-twitter").href = `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`;
    document.getElementById("share-linkedin").href = `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`;
    document.getElementById("share-whatsapp").href = `https://wa.me/?text=${pageTitle} ${pageUrl}`;
});

document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("scroll", function () {
        let scrollTop = window.scrollY;
        let docHeight = document.documentElement.scrollHeight - window.innerHeight;
        let scrollPercent = (scrollTop / docHeight) * 100;

        document.getElementById("progress-bar").style.width = scrollPercent + "%";
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let tocList = document.getElementById("toc-list");
    let content = document.querySelector(".blog-content"); // Make sure your content has this class
    let headers = content.querySelectorAll("h2, h3"); // Get all headings

    if (headers.length === 0) {
        document.getElementById("table-of-contents").style.display = "none"; // Hide TOC if no headings
        return;
    }

    headers.forEach((header, index) => {
        let id = "section-" + index;
        header.id = id; // Assign unique IDs to each heading

        let listItem = document.createElement("li");
        listItem.innerHTML = `<a href="#${id}">${header.innerText}</a>`;
        tocList.appendChild(listItem);
    });

    // Smooth Scroll Effect
    document.querySelectorAll("#toc-list a").forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            let targetId = this.getAttribute("href").substring(1);
            let targetElement = document.getElementById(targetId);

            window.scrollTo({
                top: targetElement.offsetTop - 20,
                behavior: "smooth"
            });
        });
    });
});

document.addEventListener("DOMContentLoaded", function () {
    let content = document.querySelector(".blog-content"); // Ensure your blog content has this class
    if (!content) return;

    let text = content.innerText;
    let wordCount = text.split(/\s+/).length; // Count words
    let readingTime = Math.ceil(wordCount / 200); // Average reading speed = 200 words/min

    document.getElementById("reading-time").innerText = `⏳ Estimated Reading Time: ${readingTime} min`;
});

document.addEventListener("DOMContentLoaded", function () {
    let sidebar = document.querySelector(".sidebar");

    if (window.innerWidth > 768) { // Enable only on larger screens
        let sidebarTop = sidebar.offsetTop;

        window.addEventListener("scroll", function () {
            if (window.scrollY > sidebarTop - 20) {
                sidebar.classList.add("fixed-sidebar");
            } else {
                sidebar.classList.remove("fixed-sidebar");
            }
        });
    }
});

// Redirect users to 404 page if URL doesn't exist
if (!document.querySelector(".blog-content")) { 
    window.location.href = "404.html";
}

document.addEventListener("DOMContentLoaded", function () {
    let backToTop = document.getElementById("backToTop");

    // Show button when scrolling down 300px
    window.addEventListener("scroll", function () {
        if (window.scrollY > 300) {
            backToTop.style.display = "block";
        } else {
            backToTop.style.display = "none";
        }
    });

    // Smooth scroll to top when clicked
    backToTop.addEventListener("click", function () {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });
});



