
const express = require("express");
const app = express();
const hbs = require('express-hbs');
const port = 1337;

app.set('view engine', 'hbs');

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
app.get("/about", (req, res) => {
  res.end("About me");
});
// * moet onderaan blijven van de routes
app.get("*", (req, res) => {
  res.end("404 Error - Page not found");
});

app.listen(port, () => {
  console.log("app is running on port 1337");
});