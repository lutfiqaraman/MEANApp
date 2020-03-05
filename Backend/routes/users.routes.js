var express = require('express')
var userRouter = express.Router()

//Register
userRouter.get("/register", (req, res, next) => {
   res.send("REGISTER");
});

//Authenticate
userRouter.post("/auth", (req, res, next) => {
   res.send("Authenticate");
});

//Profile
userRouter.get("/profile", (req, res, next) => {
   res.send("PROFILE");
});

//Validate
userRouter.get("/validate", (req, res, next) => {
   res.send("VALIDATE");
});

module.exports = userRouter;