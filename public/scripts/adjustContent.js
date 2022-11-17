document.addEventListener('DOMContentLoaded', () => {
    const newPostFormEl = document.querySelector('#new-post-form');
    const editPostFormEl = document.querySelector('#edit-post-form');
    const commentFormEl = document.querySelector('#comment-form');
    if(newPostFormEl){
        newPostFormEl.addEventListener('submit', async function (event) {
            event.preventDefault();
            const title = document.querySelector('#title-input').value;
            const content = document.querySelector('#content-input').value;
            const newPost = await fetch(`/api/posts/${post_id}`, {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    content
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            document.location.replace(`/post/${newPost.id}`);
        });
    }

    if(editPostFormEl){
        editPostFormEl.addEventListener('reset', function () {
            document.location.replace('/dashboard');
        });
    
        editPostFormEl.addEventListener('submit', async function (event) {
            event.preventDefault();
            const post_id = document.querySelector('[post_id]').getAttribute('post_id');
            const title = document.querySelector('#title-input').value;
            const content = document.querySelector('#content-input').value;
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
            document.location.replace('/dashboard');
        });
    }

    if(commentFormEl){
        commentFormEl.addEventListener('submit', async function (event) {
            event.preventDefault();
            const post_id = document.querySelector('[post_id]').getAttribute('post_id');
            const content = document.querySelector('#comment-entry').value;
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
            event.target.reset();
            //Reload the page (while preserving scroll position) 
            document.location.reload();
        });
    }

    (document.querySelectorAll('[id^="delete-btn-"]') || []).forEach(deleteBtnEl => {//get all elements with and id that starts with "delete-btn-" and run for each
        //Get the "comment_id" of the post from the element id
        const commentId = deleteBtnEl.id.match(/(?<=delete-btn-)\d+$/)[0];
        deleteBtnEl.addEventListener('click', async function () {
            const response = await fetch(`/api/comments/${commentId}`, {
                method: 'DELETE'
            });
            document.location.replace('/dashboard');
        });
    });
})