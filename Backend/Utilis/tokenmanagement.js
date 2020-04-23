const jwt = require("jsonwebtoken");

require("dotenv").config({ path: "./config/.env" });

const secret = process.env.SECRET;

// Sign Token
exports.signToken = (username) => {
  const payloads = { username };

  const signOptios = {
    expiresIn: "12h",
    algorithm: "HS256",
  };

  const token = jwt.sign(payloads, secret, signOptios);

  return token;
};

// Verify Token
exports.verifyTokn = (token) => {
  const verifyOption = {
    expiresIn: "12h",
    algorithm: "HS256",
  };

  try {
    return jwt.verify(token, secret, verifyOption);
  } catch (error) {
    return false;
  }
};
