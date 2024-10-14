// Function for scroll-based animations
document.addEventListener('DOMContentLoaded', function () {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    });

    elements.forEach(element => {
        observer.observe(element);
    });
});

// Theme toggle functionality
const themeToggleButton = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme') || 'dark-mode';

// Apply the stored theme when the page loads
document.body.classList.add(currentTheme);
if (currentTheme === 'light-mode') {
    themeToggleButton.textContent = '☽';
}

// Toggle theme on button click
themeToggleButton.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const theme = document.body.classList.contains('light-mode') ? 'light-mode' : 'dark-mode';
    localStorage.setItem('theme', theme);
    themeToggleButton.textContent = theme === 'light-mode' ? '☽' : '☀';
});


// Form Validation Functionality
const formElements = document.querySelectorAll('form');

formElements.forEach(form => {
    form.addEventListener('submit', function (e) {
        const inputs = form.querySelectorAll('input[required]');
        let formIsValid = true;

        inputs.forEach(input => {
            if (!input.value) {
                formIsValid = false;
                input.nextElementSibling.textContent = 'This field is required';
                input.classList.add('input-error');
            } else {
                input.nextElementSibling.textContent = '';
                input.classList.remove('input-error');
            }
        });

        if (!formIsValid) {
            e.preventDefault(); // Prevent form submission if validation fails
        }
    });
});

// Input Field Interaction - Remove error state on typing
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('input', () => {
        if (input.value) {
            input.classList.remove('input-error');
            input.nextElementSibling.textContent = '';
        }
    });
});

const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

const teacherSignupForm = document.getElementById('teacher-signup-form');

if (teacherSignupForm) {
    teacherSignupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('phone');
        const location = document.getElementById('location');
        
        let isValid = true;

        // Simple validation
        if (!name.value.trim()) {
            showError(name, 'Name is required');
            isValid = false;
        } else {
            clearError(name);
        }

        if (!email.value.trim()) {
            showError(email, 'Email is required');
            isValid = false;
        } else if (!isValidEmail(email.value)) {
            showError(email, 'Please enter a valid email');
            isValid = false;
        } else {
            clearError(email);
        }

        if (!phone.value.trim()) {
            showError(phone, 'Phone number is required');
            isValid = false;
        } else if (!isValidPhone(phone.value)) {
            showError(phone, 'Please enter a valid phone number');
            isValid = false;
        } else {
            clearError(phone);
        }

        if (!location.value.trim()) {
            showError(location, 'Location is required');
            isValid = false;
        } else {
            clearError(location);
        }

        if (isValid) {
            // If the form is valid, you can submit it to your server here
            console.log('Form is valid. Ready to submit!');
            // For now, we'll just show an alert
            alert('Thank you for signing up! We\'ll contact you soon with next steps.');
            teacherSignupForm.reset();
        }
    });
}

function showError(input, message) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = message;
    input.classList.add('input-error');
}

function clearError(input) {
    const errorElement = input.nextElementSibling;
    errorElement.textContent = '';
    input.classList.remove('input-error');
}

function isValidEmail(email) {
    // Basic email validation regex
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidPhone(phone) {
    // Basic phone number validation regex (adjust as needed)
    return /^\+?[\d\s-]{10,}$/.test(phone);
}
