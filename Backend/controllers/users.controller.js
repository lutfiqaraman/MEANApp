const User = require("../models/users.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

require("dotenv").config({ path: "./config/.env" });

exports.register = async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.status(201).send({ user });
  } catch (error) {
    res.status(400).send("failed to register user");
  }
};

exports.auth = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  getUserByUsername(username, (err, user) => {
    if (err) throw err;

    if (!user) {
      return res.json({ success: false, msg: "User not found ... " });
    }

    comparePassword(password, user.password, (err, isMatch) => {
      if (err) throw err;

      if (isMatch) {
        const token = jwt.sign({ id: user._id }, process.env.SECRET, {
          expiresIn: 604800
        });

        res.json({
          success: true,
          token: "JWT " + token,
          user: {
            id: user._id,
            name: user.name,
            username: user.username,
            email: user.email
          }
        });
      } else {
        return res.json({ success: false, msg: "wrong password ... " });
      }
    });
  });
};

exports.profile = async (req, res) => {
  await res.json({ user: req.user });
};

getUserById = async (id, callBack) => {
  await User.findById(id, callBack);
};

getUserByUsername = async (username, callBack) => {
  const query = { username };
  await User.findOne(query, callBack);
};

comparePassword = async (candidatePassword, hash, callBack) => {
  await bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if (err) throw err;

    callBack(null, isMatch);
  });
};
