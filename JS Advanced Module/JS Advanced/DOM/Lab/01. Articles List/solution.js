function createArticle() {
	let inputTitleElement = document.getElementById("createTitle");
	let inputContectElement = document.getElementById("createContent");
	let sectionElement = document.getElementById("articles");
	
/* 	inputTitleElement.setAttribute("placeholder", "Type your title here");
	inputContectElement.setAttribute("placeholder", "Type your content here") */


	let articleElement = document.createElement("article");
	let headingElement = document.createElement("h3");
	let contentElement = document.createElement("p");

	if(inputTitleElement.value !== "" && inputContectElement.value !== ""){
		headingElement.innerHTML = inputTitleElement.value;
		contentElement.innerHTML = inputContectElement.value;
		sectionElement.appendChild(articleElement);
		articleElement.appendChild(headingElement);
		articleElement.appendChild(contentElement);
		inputTitleElement.value = "";
		inputContectElement.value = "";
	}
}