const User = require("../models/users.model");
const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "./config/.env" });

exports.register = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token});
  } catch (error) {
    res.status(400).send('failed to register user');
  }
};

exports.auth = async (req, res) => {
  await res.status(200).send("AUTH");
};

exports.profile = async (req, res) => {
  await res.json({ user: req.user });
};

getUserById = async (id, callBack) => {
  await User.findById(id, callBack);
};

getUserByUsername = async (username, callBack) => {
  const query = {username};
  await User.findOne(query, callBack);
};
