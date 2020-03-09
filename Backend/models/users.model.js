const mongoose = require("mongoose");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

//User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

// Generate Authentication Token
userSchema.methods.generateAuthToken = async function() {
  const user = this;
  const generatedToken = await jwt.sign(
    { _id: user._id.toString() },
    process.env.JWT_PRIVATEKEY
  );

  await user.save();

  return generatedToken;
};

// Hashing a plain password before saving
userSchema.pre("save", async function(next) {
    const user = this;
    
    if (user.isModified("password")) {
        const salt = crypto.randomBytes(16).toString("hex");
        const hash = crypto
        .pbkdf2Sync(user.password, salt, 1000, 64, "sha512")
        .toString("hex");

        user.password = hash;
    }

    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;