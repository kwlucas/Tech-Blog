document.addEventListener('DOMContentLoaded', () => {
    (document.querySelectorAll('[id^="edit-btn-"]') || []).forEach(editBtnEl => {//get all elements with and id that starts with "edit-btn-" and run for each
        //Get the "post_id" of the post from the element id
        const postId = editBtnEl.id.match(/(?<=edit-btn-)\d+$/)[0];
        editBtnEl.addEventListener('click', function () {
            document.location.replace(`/dashboard/edit/${postId}`);
        });
    });
})