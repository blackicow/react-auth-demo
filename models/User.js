const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Schema creation
const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  uname: {
    type: String,
  },
  contact: {
    type: Number
  }
});

const User = mongoose.model("users", userSchema);

module.exports = User;
