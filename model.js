const mongoose = require("mongoose");
const Schema = mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
});
const user = mongoose.model("login", Schema);
module.exports = user;
