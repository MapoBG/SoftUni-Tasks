function loadRepos() {
	let usernameInputEl = document.getElementById("username");
	let ulEl = document.getElementById("repos");

	Array.from(ulEl.children).forEach(child => child.remove());

	let userURI = `https://api.github.com/users/${usernameInputEl.value}/repos`;

	fetch(userURI)
		.then(response => response.json())
		.then(dataArr => {
			dataArr.forEach(row => {
				let liEl = document.createElement("li");
				liEl.innerHTML = `<a href= "${row.html_url}">${row.full_name}</a>`;
				ulEl.appendChild(liEl);
			})
		})
		.catch(err => {
			console.log(err);
			let liEl = document.createElement("li");
			liEl.innerHTML = `<a href= "${usernameInputEl.value}">${usernameInputEl.value}</a>`;
			ulEl.appendChild(liEl);
		})
}