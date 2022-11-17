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

let criteriaElements = [];

function checkCriteria(checkItem = '', appendTo) {
    let existingMessages = [];
    if(criteriaElements.length > 0){
        criteriaElements.forEach(element => {
            existingMessages.push(element.textContent)
        });
    }
    console.log(existingMessages);
    criteriaList.forEach(criteriaObj => {
        const { criteria, message } = criteriaObj;
        if (!criteria.test(checkItem) && !existingMessages.includes(message)) {
            console.log(`The password must ${message}.`)
            const newItem = document.createElement('li')
            newItem.textContent = message;
            criteriaElements.push(newItem)
            appendTo.append(newItem);
        }
        else if (criteria.test(checkItem) && existingMessages.includes(message)) {
            console.log('Criteria Met');
            const index = existingMessages.indexOf(message);
            const removeEl = criteriaElements[index];
            criteriaElements.splice(index, 1);
            existingMessages.splice(index, 1);
            removeEl.remove();
        }
        else if (criteria.test(checkItem)){
            console.log('Passed test');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const passwordEl = document.querySelector('#password-input');
    const usernameEl = document.querySelector('#username-input');
    const loginFormEl = document.querySelector('#login-form');
    const signUpFormEl = document.querySelector('#signup-form');

    if (loginFormEl) {
        loginFormEl.addEventListener('submit', async function (event) {
            event.preventDefault();
            const username = usernameEl.value;
            const password = passwordEl.value;
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

            if (!response.ok) {
                alert('Invalid Credentials!');
            }
            else {
                document.location.replace('/dashboard');
            }
        });
    }

    if (signUpFormEl) {
        const criteriaListEl = document.querySelector('#criteria-list');
        signUpFormEl.addEventListener('submit', async function (event) {
            event.preventDefault();
            const username = usernameEl.value;
            const password = passwordEl.value;
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
    
            if (!response.ok) {
                alert('Something went wrong!');
            }
            else {
                document.location.replace('/dashboard');
            }
        });
        passwordEl.addEventListener('keyup', function () {
            const currentInput = passwordEl.value;
            checkCriteria(currentInput, criteriaListEl);
        });
    }
})