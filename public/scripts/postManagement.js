document.addEventListener('DOMContentLoaded', () => {
    (document.querySelectorAll('[id^="edit-btn-"]') || []).forEach(editBtnEl => {//get all elements with and id that starts with "edit-btn-" and run for each
        //Get the "post_id" of the post from the element id (Get the numbers that follow "edit-btn-" in the element id)
        const postId = editBtnEl.id.match(/(?<=edit-btn-)\d+$/)[0];
        //Add an event listener to the edit button for when clicked
        editBtnEl.addEventListener('click', function (event) {
            //Because the button will be on a post ensure that the post display underneath will not register the click
            event.stopPropagation();
            //Redirect to the edit post page
            document.location.replace(`/dashboard/edit/${postId}`);
        });
    });

    (document.querySelectorAll('[id^="delete-btn-"]') || []).forEach(deleteBtnEl => {//get all elements with and id that starts with "delete-btn-" and run for each
        //Get the "post_id" of the post from the element id (Get the numbers that follow "delete-btn-" in the element id)
        const postId = deleteBtnEl.id.match(/(?<=delete-btn-)\d+$/)[0];
        deleteBtnEl.addEventListener('click', async function (event) {
            //Because the button will be on a post ensure that the post display underneath will not register the click
            event.stopPropagation();
            //Send a post delete request to the server
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE'
            });
            //Redirect to the dashboard page
            document.location.replace('/dashboard');
        });
    });
})