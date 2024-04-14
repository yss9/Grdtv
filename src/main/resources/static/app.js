document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value;
    const email = document.getElementById('signupEmail').value;
    const password = document.getElementById('signupPassword').value;

    fetch('/api/users/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({  email, password, name})
    })
        .then(response => response.json())
        .then(data => {
            console.log('Signup Success:', data);
            alert('Signup successful!');
        })
        .catch((error) => {
            console.error('Signup Error:', error);
            alert('Signup failed!');
        });
});

document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    fetch('/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.text();  // Assuming the server sends the token as plain text
        })
        .then(token => {
            localStorage.setItem('jwt', token);  // Save the JWT to local storage
            console.log('Login Success:', token);
            alert('Login successful! Token stored.');
        })
        .catch((error) => {
            console.error('Login Error:', error);
            alert(error.message);
        });
});
