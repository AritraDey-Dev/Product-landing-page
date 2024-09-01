const navLinks = document.querySelectorAll('nav ul li a');
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(currentSection)) {
            link.classList.add('active');
        }
    });
});

document.addEventListener("scroll", function() {
    const backToTopButton = document.querySelector(".back-to-top");
    if (window.scrollY > 300) {
        backToTopButton.style.display = "block";
    } else {
        backToTopButton.style.display = "none";
    }
});

document.querySelector(".back-to-top").addEventListener("click", function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function showToast(message, type) {
    const toastContainer = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i> ${message}`;
    
    toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.remove();
    }, 3000);
}

function checkUserStatus() {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    const navLinks = document.getElementById('navLinks');

    if (loggedInUser) {
        const logoutLink = document.createElement('li');
        logoutLink.innerHTML = `<a href="#" id="logoutButton">Logout</a>`;
        navLinks.appendChild(logoutLink);

        document.getElementById('logoutButton').addEventListener('click', function() {
            localStorage.removeItem('loggedInUser');
            showToast('Logged out successfully.', 'success');
            setTimeout(() => window.location.href = 'index.html', 2000);
        });
    } else {
        const loginLink = document.createElement('li');
        loginLink.innerHTML = `<a href="login.html">Login</a>`;
        navLinks.insertBefore(loginLink, navLinks.firstChild);
    }
}

checkUserStatus();
