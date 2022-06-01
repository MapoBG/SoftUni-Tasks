const express = require("express");
const exphbs = require("express-handlebars");
const router = require("./routes");

const app = express();
const port = 5000;

app.use("/public", express.static("public"));// static/public files setup(/scr/public/...)

app.engine('hbs', exphbs.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set("views", "./src/views");// should be used with "start": "nodemon ./src/index.js" - remove with "start": cd ./src && "nodemon index.js"

app.use(router).listen(port, () => console.log(`Server is listening on port ${port}...`));