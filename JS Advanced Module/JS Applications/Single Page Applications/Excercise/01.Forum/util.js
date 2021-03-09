import { url } from "./app.js";

async function getAllPosts() {
    const res = await fetch(url);
    const posts = await res.json();

    return posts;
}

export async function renderPosts() {
    const fragment = document.createDocumentFragment();
    const topicsEl = document.querySelector(".topic-title");
    const posts = await getAllPosts();

    topicsEl.innerHTML = "";

    Object
        .values(posts)
        .map(e => {
            const newPost = document.createElement("div");
            newPost.classList.add("topic-container");
            newPost.setAttribute("data-id", e._id);

            newPost.innerHTML = `
            <div class="topic-name-wrapper">
                <div class="topic-name">
                    <a href="#" class="normal">
                        <h2>${e.title}</h2>
                    </a>
                    <div class="columns">
                        <div>
                            <p>Date: <time>${e.date}</time></p>
                            <div class="nick-name">
                                <p>Username: <span>${e.username}</span></p>
                            </div>
                        </div>
                        <div class="subscribers">
                        <p>Subscribers: <span>0</span></p>
                    </div>
                    </div>
                </div>
            </div>
        </div>`;

            return newPost;
        })
        .forEach(e => fragment.appendChild(e));

    topicsEl.appendChild(fragment);

    document.getElementById("main").style.display = "block";
    document.getElementById("post-comments").style.display = "none";
}

export function getInputEls(form) {
    const result = [];

    const [titleEl, usernameEl, postEl] = form.elements;

    result.push(titleEl, usernameEl, postEl);

    return result;
}

export function clearInputs(inputEls) {
    inputEls.forEach(e => e.value = "");
}

export async function getPost(id) {
    const res = await fetch(url + `/${id}`);
    const post = await res.json();

    return post;
}

export async function getComments(postId) {
    const res = await fetch("http://localhost:3030/jsonstore/collections/myboard/comments");
    const comments = await res.json();

    const filteredComments = Object
        .values(comments)
        .filter(c => c.postId == postId)

    return filteredComments;
}

export function generateComment(comment) {
    const divEl = document.createElement("div");
    divEl.classList.add("comment");

    divEl.innerHTML = `
<header class="header">
     <p><span>${comment.username}</span> posted on <time>${comment.date}</time></p>
</header>
<div class="comment-main">
     <div class="userdetails">
        <img src="./static/profile.png" alt="avatar">
     </div>
    <div class="post-content">
        <p>${comment.content}</p>
    </div>
</div>
<div class="footer">
<p><span>0</span> likes</p>
</div>
`;

    return divEl;
}