const express = require("express");
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const hbs = require('express-hbs');
const port = process.env.PORT || 1338;
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./modals/User');

connectDB();

// moet bovenaan blijven staan
app.use('/static', express.static(path.join(__dirname, 'static')));
app.engine('.hbs', hbs.express4({
  extname: '.hbs',
  defaultLayout: 'views/layouts/index',
  partialsDir: path.join(__dirname, 'views/partials'),
  layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 
app.set('view engine', '.hbs');
app.set('views',path.join(__dirname,'views'))

app.get("/", (req, res) => {
  res.render('main', {layout : 'index'});
});
app.get("/inlog", (req, res) => {
  res.render('inlog', {layout : 'index'} /*, {
    title: 'Login',
    name: '',
    email: '',
    password: '' 
  }*/)
});

  
app.get("/forgotpassword", (req, res) => {
  res.render('forgotPassword', {layout : 'index'});
});
app.get("/signup", (req, res) => {
  res.render('signUp',  {layout : 'index'} /*, {
    title: 'Registration Page',
    name: '',
    email: '',
    password: ''    
    }*/);
});
app.post("/signup", (req, res) => {
  console.log(req.body);
   res.send("recieved your request!");
});

// * moet onderaan blijven van de routes
app.get("*", (req, res) => {
  res.end("404 Error - Page not found");
});

app.listen(port);