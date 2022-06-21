const express = require('express');
const exhbs = require('express-handlebars');

const { port } = require('./config/env');
const router = require('./routes');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

app.engine('hbs', exhbs.engine({ extname: 'hbs' }));

app.set('view engine', 'hbs');

app.use(router);

app.listen(port, () => console.log(`Server is listening on port ${port}...`));