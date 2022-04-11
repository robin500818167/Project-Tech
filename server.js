const express = require("express");
const app = express();
const http = require('http').Server(app);
const hbs = require('express-hbs');
const port = process.env.PORT || 1337;
const dotenv = require('dotenv').config();
const connectDB = require('./config/db');
const User = require('./modals/User');
const io = require('socket.io')(http);
const path = require('path');

connectDB();

// moet bovenaan blijven staan
app.use('/static', express.static(path.join(__dirname, 'static')));

app.engine('.hbs', hbs.express4({
  extname: '.hbs',
  defaultLayout: 'views/layouts/index',
  partialsDir: path.join(__dirname, 'views/partials'),
  layoutsDir: path.join(__dirname, 'views/layouts')
}));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.get("/", (req, res) => {
  res.render('main', {layout : 'index'});
});
app.get("/inlog", (req, res) => {
  res.render('inlog', {layout : 'index'});
});
app.get("/chat", (req, res) => {
  res.render('chat', {layout : 'index'});
});
app.post("/inlog", (req, res) => {
  const newUser = new User ({
    name: "Robin",
    email: "robinnikita@hotmail.com",
    password: "Test123"
  });
  newUser.save();
  res.render('main', {layout : 'index'});
});
//socket.io
io.on('connection', socket => {
	console.log('a user connected');

	socket.on('disconnect', () => {
		console.log('user disconnected');
	});

	socket.on('message', message => {
		console.log('message: ' + message);
		//Broadcast the message to everyone
		io.emit('message', message);
	});
});
// * moet onderaan blijven van de routes
app.get("*", (req, res) => {
  res.end("404 Error - Page not found");
});
http.listen(port);