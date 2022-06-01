handlebars = require("express-handlebars");
express = require("express");
const app = express();
const port = 5000;

app.use("/public", express.static("public"));// static/public files setup(/scr/public/...)

app.get("/", (req, res) => {
    res.send("Hey!")
}).listen(port, () => console.log(`Server is listening on port ${port}...`));