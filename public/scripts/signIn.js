const criteriaList = [
    {
        criteria: /^(?=.*\d).+$/,
        message: 'Contains a digit'
    },
    {
        criteria: /^(?=.*[A-Z]).+$/,
        message: 'Contains a capital letter'
    },
    {
        criteria: /^(?=.*[a-z]).+$/,
        message: 'Contains a lowercase letter'
    },
    {
        criteria: /^(?=.*[!@#$%^&*_]).+$/,
        message: 'Contains a special character'
    },
    {
        criteria: /^.{8}$/,
        message: 'At least 8 characters long'
    },
    {
        criteria: /^.{0,16}$/,
        message: 'No more than 16 characters long'
    },
    {
        criteria: /^[\w!@#$%^&*]+$/,
        message: 'Contains only valid characters'
    }
]

function checkCriteria(checkItem = '', appendTo, existingElements = []) {
    const existingMessages = existingElements.map(element => {
        return element.textContent
    });
    criteriaList.forEach(criteriaObj => {
        const { criteria, message } = criteriaObj;
        if(!checkItem.test(criteria) && !existingMessages.includes(message)){
            const newItem = document.createElement('li')
            newItem.textContent = message;
            appendTo.append(newItem);
        }
        else if(checkItem.test(criteria) && existingMessages.includes(message)) {
            const index = existingMessages.indexOf(message);
            existingElements[index].remove();
        }
    });
}

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