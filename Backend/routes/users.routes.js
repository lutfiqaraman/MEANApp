const express = require("express");
const router = express();

module.exports = app => {
   app.get("/register", (req, res, next) => {
      res.send("REGISTER");
   });
};