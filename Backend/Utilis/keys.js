const crypto = require("crypto");
require("dotenv").config({ path: "./config/.env" });

exports.keyGenerator = crypto.generateKeyPairSync("rsa", {
  modulusLength: 512,
  publicKeyEncoding: {
    type: 'spki',
    format: 'pem'
  },
  privateKeyEncoding: {
    type: 'pkcs8',
    format: 'pem',
    cipher: process.env.CIPHER,
    passphrase: process.env.PASSPHRASE
  }
});