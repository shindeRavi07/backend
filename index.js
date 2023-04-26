const express = require("express");
const server = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const router = require("./login");
const user = require("./model");

const cors = require("cors");
const signup = require("./signup");

server.listen(6060, (err) => {
  if (!err) {
    console.log("Server Run");
  }
});
server.use(bodyParser.json());

server.use(cors());
server.use("/sign", signup);
server.use("/", router);
server.get("/", (req, res) => {
  user
    .find()
    .then((p) => res.json(p))
    .catch((err) => res.send(err).status(404));
});

mongoose.connect(
  "mongodb+srv://shinderavindra232:Myfirst@myfirst.jyl2s2x.mongodb.net/Myfirst"
);
var mongooseconnection = mongoose.connection;
mongooseconnection.on("open", (err) => {
  if (err) {
    console.log("Database connect sucessfully");
  } else {
    console.log("Database Connected");
  }
});
module.exports = mongoose;
