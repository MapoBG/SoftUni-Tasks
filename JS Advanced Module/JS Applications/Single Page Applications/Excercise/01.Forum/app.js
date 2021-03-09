import { clearInputs, generateComment, getComments, getInputEls, getPost, renderPosts } from "./util.js";

export const url = "http://localhost:3030/jsonstore/collections/myboard/posts";

function addEventListeners() {
    document.querySelector("form").addEventListener("submit", createNewPost);
    document.querySelector(".cancel").addEventListener("click", clearPost);
    document.querySelector(".topic-title").addEventListener("click", redirectToPost);
    document.querySelector("nav > ul > li > a").addEventListener("click", (e) => {
        e.preventDefault();
        renderPosts();
    });

    renderPosts();
}

addEventListeners();


function clearPost(e) {
    e.preventDefault();

    const inputEls = getInputEls(e.target.parentNode.parentNode);

    clearInputs(inputEls);
}

async function createNewPost(e) {
    e.preventDefault();

    const inputEls = getInputEls(e.target);

    inputEls.forEach(e => {
        if (e.value == "") {
            throw new Error(alert("All fields must be filled."));
        }
    });

    let date = new Date().toISOString();
    date = date.replace("T", " ").substring(0, date.length - 5);

    const res = await fetch(url, {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: inputEls[0].value, username: inputEls[1].value, post: inputEls[2].value, date })
    });

    clearInputs(inputEls);
    renderPosts();
}

function redirectToPost(e) {
    let currentEl = e.target;

    let id = currentEl.dataset.id;

    while (!id) {
        currentEl = currentEl.parentNode;
        id = currentEl.dataset.id;
        if (currentEl.className == "topic-title") {
            return;
        }
    }

    renderPostAndComments(id);
}

async function renderPostAndComments(postId) {
    const [post, comments] = await Promise.all([getPost(postId), getComments(postId)]);

    const contentEl = document.querySelector("#post-comments");

    contentEl.innerHTML = "";
    contentEl.style.display = "block";
    document.querySelector("#main").style.display = "none";

    const divEl = document.createElement("div");
    divEl.classList.add("topic-content");

    divEl.innerHTML = `
    <!-- topic-title  -->
    <div class="topic-title" id="topic" data-id="${post._id}">
        <div class="topic-name-wrapper">
            <div class="topic-name">
                <h2>${post.title}</h2>
                <p>Date: <time>${post.date}</time></p>
                <p>${post.post}</p>
            </div>
            <div class="subscribers">
            <p>Subscribers: <span>0</span></p>
        </div>   
    </div>`;

    Object
        .values(comments)
        .map(generateComment)
        .forEach(e => divEl.appendChild(e));

    const newComment = document.createElement("div");
    newComment.classList.add("answer-comment");

    newComment.innerHTML = `
    <p><span>currentUser</span> comment:</p>
    <div class="answer">
        <form>
            <textarea name="postText" id="comment" cols="30" rows="10"></textarea>
            <div>
                <label for="username">Username <span class="red">*</span></label>
                <input type="text" name="username" id="username">
            </div>
            <button>Post</button>
        </form>
    </div>`;

    divEl.appendChild(newComment);
    contentEl.appendChild(divEl);
    document.querySelector(".answer form").addEventListener("submit", createNewComment);
}

async function createNewComment(e) {
    e.preventDefault();

    const [commentContentEl, usernameEl] = getInputEls(e.target);

    if (!commentContentEl.value || !usernameEl.value) {
        return alert("All fields must be filled.");
    }

    let date = new Date().toISOString();
    date = date.replace("T", " ").substring(0, date.length - 5);

    let postId = document.querySelector("#topic").dataset.id;

    await fetch("http://localhost:3030/jsonstore/collections/myboard/comments", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, username: usernameEl.value, content: commentContentEl.value, date })
    });

    renderPostAndComments(postId);
}