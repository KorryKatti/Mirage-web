// Function to generate a random 5-letter alphanumeric string
function generateRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}

// Check if data already exists in localStorage
if (localStorage.getItem('username') && localStorage.getItem('email')) {
    // Prompt user for confirmation to auto-login
    const autoLogin = confirm("You are already authenticated. Do you want to continue to chat?");
    if (autoLogin) {
        window.location.href = 'chat.html';
    }
    // If the user does not want to auto-login, they can re-enter details
}

// Function to handle form submission
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from reloading the page

    // Get the values from the form
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;

    // Generate the random alphanumeric string
    const randomString = generateRandomString(5);

    // Create a new unique username by appending the random string
    const uniqueUsername = username + '-' + randomString;

    // Save both the unique username and email to localStorage
    localStorage.setItem('username', uniqueUsername);
    localStorage.setItem('email', email);

    // Generate a downloadable .txt file containing the user's details
    const userDetails = `Username: ${uniqueUsername}\nEmail: ${email}`;
    const blob = new Blob([userDetails], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'user_details.txt';
    link.click();

    // Redirect to chat.html after saving details
    window.location.href = 'chat.html';
});
