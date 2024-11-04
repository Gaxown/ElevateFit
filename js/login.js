document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Clear previous error messages
    document.getElementById('email-error').textContent = '';
    document.getElementById('password-error').textContent = '';

    // Get form values
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        document.getElementById('email-error').textContent = 'Please enter a valid email address.';
        return;
    }

    // Validate password
    if (password.length < 8) {
        document.getElementById('password-error').textContent = 'Password must be at least 8 characters long.';
        return;
    }

    // For demonstration, we'll just log the values to the console
    console.log('Email:', email);
    console.log('Password:', password);
    alert('Login successful!'); // Remove this in production
});