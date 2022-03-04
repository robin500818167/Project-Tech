
const express = require("express");
const app = express();
const hbs = require('express-hbs');
const port = 1337;

// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.express4({
  partialsDir: __dirname + '/views/partials'
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

app.use('/static', express.static('public'));

app.get("/", (req, res) => {
  res.render('main', {layout : 'index'});
});
app.get("/inlog", (req, res) => {
  res.render('inlog', {layout : 'index'});
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

app.listen(port, () => {
  console.log("app is running on port 1337");
});