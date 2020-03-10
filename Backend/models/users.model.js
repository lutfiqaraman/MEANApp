const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
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
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(user.password, salt);

      user.password = hash;
    }
    
    next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;