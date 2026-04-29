document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');
    const loginButton = document.querySelector('button');
    const messageDisplay = document.createElement('div');
    
    // Add message box for feedback
    messageDisplay.id = 'login-message';
    messageDisplay.style.textAlign = 'center';
    messageDisplay.style.margin = '16px auto';
    messageDisplay.style.fontSize = '14px';
    messageDisplay.style.padding = '8px';
    messageDisplay.style.borderRadius = '8px';
    messageDisplay.style.display = 'none';
    form.insertAdjacentElement('beforebegin', messageDisplay);

    // TOGGLE PASSWORD VISIBILITY
    const visibilityIcon = document.querySelector('.input-wrapper i');
    let isPasswordVisible = false;

    visibilityIcon?.addEventListener('click', () => {
        if (isPasswordVisible) {
            passwordInput.type = 'password';
            visibilityIcon.classList.remove('fa-eye-slash');
            visibilityIcon.classList.add('fa-eye');
        } else {
            passwordInput.type = 'text';
            visibilityIcon.classList.remove('fa-eye');
            visibilityIcon.classList.add('fa-eye-slash');
        }
        isPasswordVisible = !isPasswordVisible;
    });

    form.addEventListener('submit', (e) => {
        // Prevent default form submission to handle programmatically
        e.preventDefault();
        
        const email = emailInput.value;
        const password = passwordInput.value;

        // VALIDATION
        if (!email.includes('@')) {
            showNotice('Please enter a valid email address.', 'error');
            return;
        }

        if (password.includes('!')) {
            showNotice('Password contains invalid character: !', 'error');
            return;
        }

        if (email === 'admin@bugsquad.com' && password === 'admin123') {
            showNotice('Login successful! Welcome to Bug Squad.', 'success');
        } else {
            showNotice('Invalid credentials. Please try again.', 'error');
        }
    });

    function showNotice(text, type) {
        messageDisplay.textContent = text;
        messageDisplay.style.display = 'block';
        messageDisplay.style.background = type === 'success' ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)';
        messageDisplay.style.color = type === 'success' ? '#4ade80' : '#f87171';
        messageDisplay.style.marginBottom = '20px';
    }
});