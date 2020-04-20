const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config({ path: "./config/.env" });

// User - Register a user for the first time
exports.register = async (req, res) => {
  const user = new User(req.body);
  user.password = hashingPassword(user.password);

  try {
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send("failed to register user");
  }
};

// User - a registered user does login
exports.login = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  
};

// User - Show a User profile
exports.profile = async (req, res) => {
  await res.json("User Profile is here");
};

// Hashing password
hashingPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
}