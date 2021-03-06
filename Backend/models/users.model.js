const mongoose = require("mongoose");

//User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model("User", userSchema);

//Username must be unique
User.collection.createIndex({ "username": 1 }, { unique: true });

module.exports = User;
