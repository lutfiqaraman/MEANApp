const mongoose = require("mongoose");
const dbConfig = require("../db/db_config");
const crypto = require("crypto");

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