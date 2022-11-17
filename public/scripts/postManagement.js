document.addEventListener('DOMContentLoaded', () => {
    (document.querySelectorAll('[id^="edit-btn-"]') || []).forEach(editBtnEl => {//get all elements with and id that starts with "edit-btn-" and run for each
        //Get the "post_id" of the post from the element id
        const postId = editBtnEl.id.match(/(?<=edit-btn-)\d+$/)[0];
        editBtnEl.addEventListener('click', function () {
            document.location.replace(`/dashboard/edit/${postId}`);
        });
    });

    (document.querySelectorAll('[id^="delete-btn-"]') || []).forEach(deleteBtnEl => {//get all elements with and id that starts with "delete-btn-" and run for each
        //Get the "post_id" of the post from the element id
        const postId = deleteBtnEl.id.match(/(?<=delete-btn-)\d+$/)[0];
        deleteBtnEl.addEventListener('click', async function () {
            const response = await fetch(`/api/posts/${postId}`, {
                method: 'DELETE'
            });
            document.location.replace('/dashboard');
        });
    });
})