
const express = require("express");

const server = express();

server.get("/", (req, res) => {
  res.end("Hello World");
});

server.listen(9000, "localhost", () => {
  console.log("Server is running on port 9000");
});