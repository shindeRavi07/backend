const express = require("express");
const signup = express.Router();
const sign = require("./signupmodel");
const bcrypt = require("bcrypt");
const saltRound = 10;

signup.get("/", (req, res) => {
  res.send("hello Signup here");
});

signup.post("/", (req, res) => {
  var fn = req.body.fname;
  var ln = req.body.lname;
  var un = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var conform = req.body.conform;

  if (password !== conform) {
    res.status(405).json({ message: "Password dosen't match" });
  } else {
    bcrypt.hash(password, saltRound, function (err, hash) {
      if (!err) {
        var newsign = new sign({
          fname: fn,
          lname: ln,
          username: un,
          email: email,
          password: hash,
        });

        newsign
          .save()
          .then((data) => res.send("data save Sucessfully").status(200))
          .catch((err) => res.send("something went wrong ", err));
      }
    });
  }
});
module.exports = signup;
