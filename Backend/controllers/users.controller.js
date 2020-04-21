const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const tokenmanagement = require("../Utilis/tokenmanagement");
const crypto = require("crypto");

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
  const enteredPassword = hashingPassword(password);

  //find user according to the username
  const user = await User.findOne({ username });

  const userpassword = user.password;

  if (enteredPassword === userpassword) {
    const token = tokenmanagement.signToken(username);
    res.status(200).send({ token });
  } else {
    res.status(400).send("unauthorized user!");
  }
};

// User - Show a User profile
exports.profile = async (req, res) => {
  await res.json("User Profile is here");
};

// Hashing password
hashingPassword = (password) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.pbkdf2Sync(password, salt, 64, "sha512").toString("hex");

  return hash;
}