const express = require("express");
const handlebars = require("express-handlebars");
const port = 5000;

const server = express();
server.engine("hbs", handlebars.engine({ extname: "hbs" }));
server.set("view engine", "hbs");

server.get("/", (req, res) => {
    res.render("home", {name: "Ra"});
}).listen(port, () => console.log(`Server is listening on port ${port}...`));