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
    let existingMessages = [];
    if(existingElements.length > 0){
        existingElements.forEach(element => {
            existingMessages.push(element.textContent)
        });
    }
    criteriaList.forEach(criteriaObj => {
        const { criteria, message } = criteriaObj;
        if (!criteria.test(checkItem) && !existingMessages.includes(message)) {
            const newItem = document.createElement('li')
            newItem.textContent = message;
            appendTo.append(newItem);
        }
        else if (criteria.test(checkItem) && existingMessages.includes(message)) {
            const index = existingMessages.indexOf(message);
            existingElements[index].remove();
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
            const username = usernameEl.textContent;
            const password = passwordEl.textContent;
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
            const username = usernameEl.textContent;
            const password = passwordEl.textContent;
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
            const currentInput = passwordEl.textContent;
            let criteriaElements = (document.querySelectorAll('#criteria-list>li') || []);
            checkCriteria(currentInput, criteriaListEl, criteriaElements);
        });
    }
})