function submitLogin() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const message = document.getElementById('message');
    const accountInfoContainer = document.getElementById('accountInfo');

    message.innerText = ''; // Clear previous messages
    accountInfoContainer.style.display = 'none'; // Hide previous account info

    fetch('https://restapi.tu.ac.th/api/v1/auth/Ad/verify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Application-Key': 'TUaff8daa31cb2238f0f911dc711b1fff19c30c4f7653febe3fd035080c0095baf77c347fa67407f7e5fec26f4117d8a73'
        },
        body: JSON.stringify({
            "UserName": username,
            "PassWord": password
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.status) {
            showAccountInfo(data);
        } else {
            message.innerText = 'Invalid username or password.';
        }
    })
    .catch(error => {
        console.error('Error:', error);
        message.innerText = 'An error occurred while processing your request.';
    });
}

function showAccountInfo(data) {
    const accountInfoContainer = document.getElementById('accountInfo');
    accountInfoContainer.innerHTML = `
        <h2>Account Information</h2>
        <p><strong>Username:</strong> ${data.username || 'N/A'}</p>
        <p><strong>Display Name (TH):</strong> ${data.displayname_th || 'N/A'}</p>
        <p><strong>Display Name (EN):</strong> ${data.displayname_en || 'N/A'}</p>
        <p><strong>Email:</strong> ${data.email || 'N/A'}</p>
        <p><strong>Department:</strong> ${data.department || 'N/A'}</p>
        <p><strong>Faculty:</strong> ${data.faculty || 'N/A'}</p>
        <p><strong>Current Status:</strong> ${data.tu_status || 'N/A'}</p>
    `;
    accountInfoContainer.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function() {
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const loginButton = document.getElementById('loginButton');

    function checkInputs() {
        const isUsernameFilled = usernameInput.value.trim() !== '';
        const isPasswordFilled = passwordInput.value.trim() !== '';
        loginButton.disabled = !(isUsernameFilled && isPasswordFilled);
    }

    usernameInput.addEventListener('input', checkInputs);
    passwordInput.addEventListener('input', checkInputs);

    checkInputs(); // Initial check
});