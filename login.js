const express = require("express");
const router = express.Router();
const user = require("./model");
const ObjectId = require("mongoose").Types.ObjectId;

// here two methodes to save data on database

router.post("/save", (req, res) => {
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;

  const user1 = new user({
    username: username,
    email: email,
    password: password,
  });
  user1
    .save()
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});
//.json({message:"data save sucessfully",data:data})
//.send({message:"data not saved "})
router.post("/login", (req, res) => {
  const newuser = new user({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  newuser
    .save({})
    .then((data1) => {
      res.status(200).json({ message: "data stored sucessfully", data: data1 });
    })
    .catch((err) => {
      res.status(404).send({ message: "data nat saved " });
    });
});

router.get("/:email2", (req, res) => {
  user
    .findOne({ email: req.params.email2 })
    .then((data) => res.send(data))
    .catch((err) => res.send(err));
});

router.get("/login/:email?", (req, res) => {
  var email1 = req.params.email;
  if (!ObjectId === email1) {
    return res.status(400).send(`No record with given id`);
  }

  user
    .findById(email1)
    .then((data) => res.status(200).send(data))
    .catch((err) => res.status(404).send(err));
});

module.exports = router;
