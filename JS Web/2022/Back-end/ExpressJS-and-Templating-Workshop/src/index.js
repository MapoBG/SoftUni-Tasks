const express = require("express");
const exphbs = require("express-handlebars");
const cookieParser = require("cookie-parser");

const connectToDB = require("./config/dataBase");
const router = require("./routes");

const app = express();
const port = 5000;

app.use(express.urlencoded({ extended: false }));//enables form data reading
app.use("/public", express.static("public"));// static/public files setup(/scr/public/...)

app.use(cookieParser());
app.engine('hbs', exphbs.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');
app.set("views", "./src/views");// should be used with "start": "nodemon ./src/index.js" - remove with "start": cd ./src && "nodemon index.js"

app.use(router);

connectToDB()
    .then(() => {
        app.listen(port, () => console.log(`Server is listening on port ${port}...`));
    })
    .catch((err) => console.log(err));
