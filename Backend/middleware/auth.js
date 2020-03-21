const jwt = require("jsonwebtoken");
const User = require("../models/users.model");
const passport = require("passport");

require("dotenv").config({ path: "./config/.env" });

const auth = async (req, res, next) => {  
  try {
    const token = req.header("Authorization").replace("JWT ", "");
    const decoded = jwt.verify(token, process.env.JWT_PRIVATEKEY);
    const user = await User.findOne({ _id: decoded.id });
    
    if (!user) {
      throw new Error;
    }

    req.token = token;
    req.user = user;

    next();
  } catch (error) {
    res.status(401).send({ error: "User is not authenticate" });
  }
};

module.exports = auth;