const express = require("express");
const userController = require("../controllers/users.controller");
const userRouter = express.Router();
const auth = require("../middleware/auth");

//Register
userRouter.post("/register", userController.register);

//Authenticate
userRouter.post("/login", userController.login);

//Profile
userRouter.get("/profile", auth, userController.profile);

module.exports = userRouter;