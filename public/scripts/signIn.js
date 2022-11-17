document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#login-form').addEventListener('submit', async function (event) {
        event.preventDefault();
        const username = document.querySelector('#username-input').textContent;
        const password = document.querySelector('#password-input').textContent;
        const response = await fetch('/api/users/login', {
            method: 'POST',
            body: JSON.stringify({
                username,
                password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if(!response.ok){
            alert('Invalid Credentials!');
        }
        else{
            document.location.replace('/dashboard');
        }
    });
})