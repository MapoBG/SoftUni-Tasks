let contactsEl = document.getElementById("contacts");

let template = Handlebars.compile(contactsTemplate);

let htmlContacts =  template({contacts});

contactsEl.innerHTML = htmlContacts;

function showDetails(id){
    let detailsEl = document.getElementById(`${id}`);

    if(detailsEl.style.display == "block"){
        detailsEl.style.display = "none";
    } else {
        detailsEl.style.display = "block";
    }
}