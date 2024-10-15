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


document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('teacher-signup-form');
    if (!form) return; // Exit if we're not on the teacher signup page

    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');

    const emailInput = document.getElementById('email');
    const verifyEmailButton = document.getElementById('verify-email');
    const verificationCodeInput = document.getElementById('verification-code');
    const submitVerificationButton = document.getElementById('submit-verification');

    // Populate birth year options
    const birthYearSelect = document.getElementById('birth-year');
    const currentYear = new Date().getFullYear();
    for (let year = currentYear - 100; year <= currentYear - 18; year++) {
        const option = document.createElement('option');
        option.value = year;
        option.textContent = year;
        birthYearSelect.appendChild(option);
    }

    verifyEmailButton.addEventListener('click', function() {
        const email = emailInput.value;
        if (isValidEmail(email)) {
            // Here you would typically send a verification code to the email
            showSuccess(step1, 'Verification code sent to your email');
            step2.style.display = 'block';
            verifyEmailButton.textContent = 'Resend Code';
        } else {
            showError(step1, 'Please enter a valid email address');
        }
    });

    submitVerificationButton.addEventListener('click', function() {
        const verificationCode = verificationCodeInput.value;
        if (verificationCode) {
            // Here you would typically verify the code with your backend
            showSuccess(step2, 'Email verified successfully');
            step3.style.display = 'block';
        } else {
            showError(step2, 'Please enter the verification code');
        }
    });

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validateForm()) {
            // Here you would typically submit the form data to your backend
            alert('Form submitted successfully!');
        }
    });

    function isValidEmail(email) {
        // Basic email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function validateForm() {
        let isValid = true;
        const fieldsToValidate = ['name', 'phone', 'password', 'confirm-password', 'gender', 'birth-year'];
        fieldsToValidate.forEach(field => {
            const input = document.getElementById(field);
            if (!input.value) {
                showError(input.parentElement, `Please enter your ${field.replace('-', ' ')}`);
                isValid = false;
            }
        });

        const password = document.getElementById('password').value;
        const confirmPassword = document.getElementById('confirm-password').value;
        if (password !== confirmPassword) {
            showError(document.getElementById('confirm-password-group'), 'Passwords do not match');
            isValid = false;
        }

        if (!document.getElementById('terms').checked) {
            showError(document.getElementById('terms-group'), 'Please agree to the terms and conditions');
            isValid = false;
        }
        return isValid;
    }

    function showError(container, message) {
        const errorElement = container.querySelector('.error-message');
        errorElement.textContent = message;
        errorElement.style.color = 'red';
    }

    function showSuccess(container, message) {
        const errorElement = container.querySelector('.error-message');
        errorElement.textContent = message;
        errorElement.style.color = 'green';
    }

    // Prevent button text from disappearing
    emailInput.addEventListener('input', function() {
        verifyEmailButton.textContent = verifyEmailButton.textContent || 'Verify';
    });

    verificationCodeInput.addEventListener('input', function() {
        submitVerificationButton.textContent = submitVerificationButton.textContent || 'Submit';
    });
});
