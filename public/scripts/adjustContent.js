document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('#new-post-form').addEventListener('submit', async function (event) {
        event.preventDefault();
        const title = document.querySelector('#title-input').textContent;
        const content = document.querySelector('#content-input').textContent;
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

    document.querySelector('#edit-post-form').addEventListener('reset', function () {
        document.location.replace('/dashboard');
    });

    document.querySelector('#edit-post-form').addEventListener('submit', async function (event) {
        event.preventDefault();
        const post_id = document.querySelector('[post_id]').getAttribute('post_id');
        const title = document.querySelector('#title-input').textContent;
        const content = document.querySelector('#content-input').textContent;
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
})