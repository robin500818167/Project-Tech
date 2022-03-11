const express = require("express");
const path = require('path');
const app = express();
const hbs = require('express-hbs');
const port = process.env.PORT || 1337;
require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./modals/User');

connectDB();

// moet bovenaan blijven staan
app.use('/static', express.static(path.join(__dirname, 'static')));

app.engine('hbs', hbs.express4({
  //partialsDir: __dirname + '/views'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.get("/", (req, res) => {
  res.render('main', {layout : 'index'});
});
app.get("/inlog", (req, res) => {
  res.render('inlog', {layout : 'index'});
});
app.post("/inlog", (req, res) => {
  const newUser = new User ({
    name: "Test"
  });
  newUser.save();
  res.render('main', {layout : 'index'});
});
app.get("/forgotpassword", (req, res) => {
  res.render('forgotPassword', {layout : 'index'});
});
app.get("/signup", (req, res) => {
  res.render('signUp', {layout : 'index'});
});
// * moet onderaan blijven van de routes
app.get("*", (req, res) => {
  res.end("404 Error - Page not found");
});

app.listen(port);