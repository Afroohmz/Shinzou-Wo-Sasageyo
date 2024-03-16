// app.js

const express = require('express');
const session = require('express-session');
const path = require('path');
const exphbs = require('express-handlebars');

// Initialize Express app
const app = express();

// Configure Handlebars
app.engine('.hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }));
app.set('view engine', '.hbs');

// Body Parser Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Session middleware
app.use(session({
  secret: 'secret', // Change this to a randomly generated string
  resave: false,
  saveUninitialized: false
}));

// Define routes
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/dashboard', require('./routes/dashboard'));
app.use('/posts', require('./routes/posts'));

module.exports = app;
