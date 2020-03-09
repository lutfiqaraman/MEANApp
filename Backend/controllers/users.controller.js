const User = require("../models/users.model");

exports.register = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({user, token});
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