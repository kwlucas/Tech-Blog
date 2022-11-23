//List of all objects containing a regEx criteria and the message/description of it
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
        criteria: /^.{8,}$/,
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
    //If there are elements in the criteria elements array get the text of each element and put it in the existing messages array
    if(criteriaElements.length > 0){
        criteriaElements.forEach(element => {
            existingMessages.push(element.textContent)
        });
    }
    //Run this for each criteria object
    criteriaList.forEach(criteriaObj => {
        //Destructure criteria object to get the regEx and message
        const { criteria, message } = criteriaObj;
        //If the item doesn't meet the criteria AND the criteria's message is not already being displayed
        if (!criteria.test(checkItem) && !existingMessages.includes(message)) {
            //Create a list item and set its text to the criteria message
            const newItem = document.createElement('li');
            newItem.textContent = message;
            //Add the new element to the criteria elements array
            criteriaElements.push(newItem);
            //Append the new element to the page.
            appendTo.append(newItem);
        } //If the item does meet the criteria AND the criteria's message IS being displayed
        else if (criteria.test(checkItem) && existingMessages.includes(message)) {
            //Find the index of the criteria's message within in the existingMessage array.
            const index = existingMessages.indexOf(message);
            //Retreive the criterial element that coresponds with the message.
            const removeEl = criteriaElements[index];
            //Remove the element and message from their arrays
            criteriaElements.splice(index, 1);
            existingMessages.splice(index, 1);
            //Remove the element from the page
            removeEl.remove();
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