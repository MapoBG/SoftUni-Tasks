function attachEvents() {
    document.getElementById("submit").addEventListener("click", sendMsg);
    document.getElementById("refresh").addEventListener("click", getMsgs);
}

attachEvents();


async function sendMsg() {
    const data = {
        author: document.getElementById("author").value,
        content: document.getElementById("content").value
    };

    const res = await fetch("http://localhost:3030/jsonstore/messenger", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    const msg = await res.json();
}

async function getMsgs() {
    const res = await fetch("http://localhost:3030/jsonstore/messenger");
    const data = await res.json();

    let result = "";

    Object.values(data).forEach(e => result += `${e.author}: ${e.content}\n`);

    document.getElementById("messages").value = result.trim();
}