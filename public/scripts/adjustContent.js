document.addEventListener('DOMContentLoaded', () => {
    //Get form elements using ids
    const newPostFormEl = document.querySelector('#new-post-form');
    const editPostFormEl = document.querySelector('#edit-post-form');
    const commentFormEl = document.querySelector('#comment-form');
    //If a new post form was found
    if(newPostFormEl){
        //Add an event listener to form for when it is submitted
        newPostFormEl.addEventListener('submit', async function (event) {
            //Prevent the form from clearing on submit
            event.preventDefault();
            //Get the values entered into inputs
            const title = document.querySelector('#title-input').value;
            const content = document.querySelector('#content-input').value;
            //Send a create post request to server
            const newPost = await fetch(`/api/posts/`, {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    content
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            //If the server responds with a post object for the created post navigate to view that post
            if(newPost.id){
                document.location.replace(`/post/${newPost.id}`);
            }//Otherwise redirect the user to the dashboard page
            else {
                document.location.replace(`/dashboard`);
            }
        });
    }

    //If an edit post form was found
    if(editPostFormEl){
        //Add an event listener to form for when it is reset (On edit forms the reset button is the "Cancel" button)
        editPostFormEl.addEventListener('reset', function () {
            //Redirect to dashboard
            document.location.replace('/dashboard');
        });

        //Add an event listener to form for when it is submitted
        editPostFormEl.addEventListener('submit', async function (event) {
            //Prevent the form from clearing on submit
            event.preventDefault();
            //Get the id of the post being edited
            const post_id = document.querySelector('[post_id]').getAttribute('post_id');
            //Get the values entered into the inputs
            const title = document.querySelector('#title-input').value;
            const content = document.querySelector('#content-input').value;
            //Send an update request to the server for the post
            await fetch(`/api/posts/${post_id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title,
                    content
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            //Redirect to the dashboard page
            document.location.replace('/dashboard');
        });
    }

    //If a comment form was found.
    if(commentFormEl){
        //Add an event listener to form for when it is submitted
        commentFormEl.addEventListener('submit', async function (event) {
            //Prevent the form from clearing on submit
            event.preventDefault();
            //Get the id of the post being commented on
            const post_id = document.querySelector('[post_id]').getAttribute('post_id');
            //Get the value input into the comment form
            const content = document.querySelector('#comment-entry').value;
            //Send a create comment request to the server
            await fetch('/api/comments', {
                method: 'POST',
                body: JSON.stringify({
                    post_id,
                    content
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            //Clear the form inputs
            event.target.reset();
            //Reload the page (while preserving scroll position) so that the new comment appears
            document.location.reload();
        });
    }

    (document.querySelectorAll('[id^="delete-btn-"]') || []).forEach(deleteBtnEl => {//get all elements with an id that starts with "delete-btn-" and run for each
        //Get the "comment_id" of the item from the element id (Get the numbers that follow "delete-btn-" in the element id)
        const commentId = deleteBtnEl.id.match(/(?<=delete-btn-)\d+$/)[0];
        //Add an event listener to the delete button for when clicked
        deleteBtnEl.addEventListener('click', async function () {
            //Send a delete comment request to the server
            const response = await fetch(`/api/comments/${commentId}`, {
                method: 'DELETE'
            });
            //Reload the page (while preserving scroll position) so that the comments update
            document.location.replace('/dashboard');
        });
    });
})