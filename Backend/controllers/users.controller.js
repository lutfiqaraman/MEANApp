const user = require("../models/users.model");
const passport = require("passport");
const jwt = require("jsonwebtoken");

exports.register = async (req, res, next) => {
  const newUser = new user(req.body);

  try {
    await newUser.save();
    res.status(201).send({newUser});
  } catch(error) {
    res.send(400).send(error);
  }
};

exports.auth = async (req, res, next) => {
  await res.send("PROFILE");
};

exports.profile = async (req, res, next) => {
  await res.send("PROFILE");
};