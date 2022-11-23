document.addEventListener('DOMContentLoaded', () => {
    (document.querySelectorAll('.card[post_id]') || []).forEach(postEl => {//get all elements with "log-btn" class and run for each
        //Get the "post_id" of the post from the element attribute
        const postId = postEl.getAttribute('post_id');
        //Add an event listener to post that when clicked it redirects to that post's page
        postEl.addEventListener('click', function () {
            document.location.replace(`/post/${postId}`);
        });
    });
})