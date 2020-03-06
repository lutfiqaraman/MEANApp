const express = require("express");
const userController = require("../controllers/user.controller");
const userRouter = express.Router();

//Register
userRouter.get("/register", userController.register);

//Authenticate
userRouter.post("/auth", userController.auth);

//Profile
userRouter.get("/profile", userController.profile);

module.exports = userRouter;