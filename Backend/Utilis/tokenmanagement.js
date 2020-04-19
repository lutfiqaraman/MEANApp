const jwt = require("jsonwebtoken");
const keys = require("./keys");
require("dotenv").config({ path: "./config/.env" });

// Sign Token
exports.signToken = (id) => {
  const payloads = { id };

  const privateKey = {
    key: keys.keyGenerator.privateKey,
    passphrase: process.env.PASSPHRASE,
  };

  const signOptios = {
    expiresIn: "12h",
    algorithm: "RS256",
  };

  const token = jwt.sign(payloads, privateKey, signOptios);

  return token;
};

// Verify Token
exports.verifyTokn = (token) => {
  const publicKey = keys.keyGenerator.publicKey;

  const verifyOption = {
    expiresIn: "12h",
    algorithm: "RS256",
  };

  try {
    return jwt.verify(token, publicKey, verifyOption);
  } catch (error) {
    return false;
  }
};
