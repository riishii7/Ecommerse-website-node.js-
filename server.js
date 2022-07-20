const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controller/error');
const db = require('./database');

const flash = require('connect-flash');

const app = express();

app.set('view engine', 'ejs'); // kaun sa engine use kar rahe hai pug,ejs
app.set('views', 'views');      // 2nd argument is folder to find like in our case its views

const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');
const authRoutes = require('./routes/auth');

app.use(bodyParser.urlencoded({ extended: false }));

//for using external css in public folder
app.use(express.static(path.join(__dirname, 'public')));

var session = require('express-session');
var mysql2 = require('mysql2/promise');
var MySQLStore = require('express-mysql-session')(session);

var options = {
	host: 'localhost',
	port: 3306,
	user: 'root',
	password: '',
	database: 'shop'
};

var connection = mysql2.createPool(options);
var sessionStore = new MySQLStore({}, connection);

app.use(
  session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: true,
    store: sessionStore
  })
);

//flash should be used after session
app.use(flash());

app.use('/admin', adminData.routes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

app.listen(3000);





