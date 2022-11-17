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

    const signUpFormEl = document.querySelector('#signup-form');
    signUpFormEl.addEventListener('submit', async function (event) {
        event.preventDefault();
        const username = document.querySelector('#username-input').textContent;
        const password = document.querySelector('#password-input').textContent;
        const response = await fetch('/api/users/', {
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
            alert('Something went wrong!');
        }
        else{
            document.location.replace('/dashboard');
        }
    });

    if(signUpFormEl){
        const criteriaListEl = document.querySelector('#criteria-list');
        const passwordEl = document.querySelector('#password-input');
        passwordEl.addEventListener('keyup', function () {
            const currentInput = passwordEl.textContent;
            const criteriaElements = document.querySelectorAll('#criteria-list>li');
            checkCriteria(currentInput, criteriaListEl, criteriaElements);
        });
    }
})