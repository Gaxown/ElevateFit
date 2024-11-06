document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault(); 

    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';
    document.getElementById('confirm-password-error').textContent = '';

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        return;
    }

    // password
    if (password.length < 8) {
        document.getElementById('password-error').textContent = 'Password must be at least 8 characters long.';
        return;
    }

    if (!/[A-Z]/.test(password)) {
        document.getElementById('password-error').textContent = 'Password must contain at least one uppercase letter.';
        return;
    }

    if (!/[a-z]/.test(password)) {
        document.getElementById('password-error').textContent = 'Password must contain at least one lowercase letter.';
        return;
    }

    if (!/[0-9]/.test(password)) {
        document.getElementById('password-error').textContent = 'Password must contain at least one number.';
        return;
    }

    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        document.getElementById('password-error').textContent = 'Password must contain at least one special character.';
        return;
    }

    //confirm passwrd
    if (password !== confirmPassword) {
        document.getElementById('confirm-password-error').textContent = 'Passwords do not match.';
        return;
    }
    console.log('Email:', email);
    console.log('Password:', password);
    alert('Sign up successful!');
    window.location.href = '../index.html'
});