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

    // TOGGLE PASSWORD VISIBILITY BUG: The icon click doesn't actually toggle the type
    const visibilityIcon = document.querySelector('.input-wrapper i');
    visibilityIcon?.addEventListener('click', () => {
        // BUG: Incomplete logic, doesn't actually toggle!
        console.log("Toggle visibility clicked");
        passwordInput.value = passwordInput.value; // NOP!
    });

    form.addEventListener('submit', (e) => {
        // BUG: Forgot to prevent default, form refreshes page so user can't see the feedback
        // e.preventDefault(); 
        
        const email = emailInput.value;
        const password = passwordInput.value;

        // VALIDATION BUG: Password logic incorrectly rejects all passwords with '!'
        if (!email.includes('@')) {
            showNotice('Please enter a valid email address.', 'error');
            return;
        }

        if (password.includes('!')) {
            // BUG: Arbitrary rejection of symbol for testing
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
