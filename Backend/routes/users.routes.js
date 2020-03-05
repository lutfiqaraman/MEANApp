var express = require('express')
var userRouter = express.Router()

//Register
userRouter.post("/register", (req, res, next) => {
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

module.exports = userRouter;