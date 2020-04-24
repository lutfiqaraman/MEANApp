const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const tokenmanagement = require("../Utilis/tokenmanagement");

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
  const enteredPassword = req.body.password;
  
  //find user according to the username
  const user = await User.findOne({ username });

  //If user exists generate a token
  if (user != null) {
    const userpassword = user.password;
    const isPasswordValid = validPassword(enteredPassword, userpassword);
    
    if (isPasswordValid) {
      const token = tokenmanagement.signToken(username);
      res.status(200).send({ token });
    } else {
      res.status(400).send("unauthorized user!");
    }
  }
};

// User - Show a User profile
exports.profile = async (req, res) => {
  await res.json("User Profile is here");
};

// User - Send Welcome Email
sendWelcomeEmail = () => {
  // Welcome email to be send when register a user
};

// Hashing password
hashingPassword = (password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

// Compare password
validPassword = (enteredPassword, userpassword) => {
  return bcrypt.compareSync(enteredPassword, userpassword);
};