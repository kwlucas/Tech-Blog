let signedIn = false;

document.addEventListener('DOMContentLoaded', () => {
    //Find an element on page with an id of "user-signed-in"
    const signedInEl = document.getElementById('user-signed-in');
    //If an element is found set signedIn variable to true
    if(signedInEl){
        signedIn = true;
    }

    (document.querySelectorAll('.log-btn') || []).forEach(logBtnEl => {//get all elements with "log-btn" class and run for each
        //If a user is signed in
        if(signedIn){
            //change the text of the login button to "Logout"
            logBtnEl.textContent = 'Logout'
            //Ensure the link doesnt go anywhere
            logBtnEl.setAttribute('href' , '')
            //Add an event listener on the button for when it is clicked
            logBtnEl.addEventListener('click', async function () {
                //Send a log out request to server
                await fetch('/api/users/logout', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                //Once logged out/ session is deleted reload the page
                document.location.reload();
            });
        }
        else { //Otherwise if a user is not logged in
            //Set the text of the button to "Login"
            logBtnEl.textContent = 'Login'
            //Ensure the link leads to the login page
            logBtnEl.setAttribute('href' , '/login')
        }
    });
})