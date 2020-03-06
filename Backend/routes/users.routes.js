const express = require("express");
const userController = require("../controllers/users.controller");
const userRouter = express.Router();

//Register
userRouter.post("/register", userController.register);

//Authenticate
userRouter.post("/auth", userController.auth);

//Profile
userRouter.get("/profile", userController.profile);

module.exports = userRouter;