let signedIn = false;

document.addEventListener('DOMContentLoaded', () => {
    const signedInEl = document.getElementById('user-signed-in');
    if(signedInEl){
        signedIn = true;
    }

    (document.querySelectorAll('.log-btn') || []).forEach(logBtnEl => {//get all elements with "log-btn" class and run for each
        if(signedIn){
            logBtnEl.textContent = 'Logout'
            logBtnEl.setAttribute('href' , '')
            logBtnEl.addEventListener('click', async function () {
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
        else {
            logBtnEl.textContent = 'Login'
            logBtnEl.setAttribute('href' , '/login')
        }
    });
})