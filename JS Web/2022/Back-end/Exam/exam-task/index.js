const cookieParser = require('cookie-parser');
const express = require('express');
const exhbs = require('express-handlebars');

const connectToDB = require('./config/db');
const { port } = require('./config/env');
const { auth } = require('./middlewares/userMiddleware');
const router = require('./routes');
const { errorHandler } = require('./middlewares/errorMiddleware');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('static'));

app.engine('hbs', exhbs.engine({ extname: 'hbs' }));
app.set('view engine', 'hbs');

app.use(cookieParser());

app.use(auth);
app.use(router);
app.use(errorHandler);

connectToDB()
    .then(() => {
        console.log('Connected to DB!');
    })
    .catch((error) => error.msg = 'Something went wrong. Please try again.');

app.listen(port, () => console.log(`Server is listening on port ${port}...`));