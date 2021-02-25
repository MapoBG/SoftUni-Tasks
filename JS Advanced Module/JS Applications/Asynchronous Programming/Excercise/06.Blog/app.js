function attachEvents() {
    document.getElementById("btnLoadPosts").addEventListener("click", loadPosts);
    document.getElementById("btnViewPost").addEventListener("click", viewPost);
}

attachEvents();

async function loadPosts() {
    const res = await fetch("http://localhost:3030/jsonstore/blog/posts");
    const posts = await res.json();

    Object
        .values(posts)
        .forEach(p => {
            const optionEl = document.createElement("option");
            optionEl.value = p.id;
            optionEl.textContent = p.title;

            document.getElementById("posts").appendChild(optionEl);
        });
}

async function viewPost() {
    const options = Array.from(document.querySelectorAll("#posts option"));
    const selected = options.find(e => e.selected == true);

    const resPost = await fetch(`http://localhost:3030/jsonstore/blog/posts/${selected.value}`);
    const post = await resPost.json();

    const resComments = await fetch("http://localhost:3030/jsonstore/blog/comments");
    const comments = await resComments.json();

    document.getElementById("post-comments").innerHTML = "";

    const targetPosts = Object
        .values(comments)
        .filter(c => c.postId == post.id)
        .forEach(p => {
            const liEl = document.createElement("li");
            liEl.id = p.id;
            liEl.textContent = p.text;

            document.getElementById("post-comments").appendChild(liEl);
        });

    document.getElementById("post-title").textContent = post.title;
    document.getElementById("post-body").textContent = post.body;
}