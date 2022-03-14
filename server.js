const express = require("express");
const path = require('path');
// Passport is authentication middleware for Node. js. Extremely flexible and modular, Passport can be unobtrusively dropped in to any Express-based web application. A comprehensive set of strategies support authentication using a username and password, Facebook, Twitter, and more.
const passport = require("passport");
const app = express();
const hbs = require('express-hbs');
const port = process.env.PORT || 1338;
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./modals/User');
const LocalStrategy = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

connectDB();

// moet bovenaan blijven staan
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.engine('.hbs', hbs.express4({
  extname: '.hbs',
  defaultLayout: 'views/layouts/index',
  partialsDir: path.join(__dirname, 'views/partials'),
  layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', '.hbs');
app.set('views',path.join(__dirname,'views'))

app.get("/", isLoggedIn, (req, res) => {
  res.render('main', {layout : 'index'});
});
app.get("/inlog", (req, res) => {
  res.render('inlog', {layout : 'index'}, {
    title: 'Login',
    name: '',
    email: '',
    password: '' 
  })
});
app.post("/inlog", passport.authenticate("local", {
  successRedirect: "/main",
  failureRedirect: "/login"
  }),  (req, res) => {
  });
  
app.get("/forgotpassword", (req, res) => {
  res.render('forgotPassword', {layout : 'index'});
});
app.get("/signup", (req, res) => {
  res.render('signUp',  {layout : 'index'}, {
    title: 'Registration Page',
    name: '',
    email: '',
    password: ''    
    });
});
app.post("/signup", (req, res) => {
  var name = req.body.name
  var email = req.body.email
  var password = req.body.password
  User.register(new User({ email: email }),
  password, function (err, user) {
  if (err) {
  console.log(err);
  return res.render('signUp', {layout : 'index'});
  }
});
passport.authenticate("local", (req, res) => {
  req.flash('success', 'You have logged in')
  res.render('main', {layout : 'index'});
  });
  });

  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
    }

// * moet onderaan blijven van de routes
app.get("*", (req, res) => {
  res.end("404 Error - Page not found");
});

app.listen(port);