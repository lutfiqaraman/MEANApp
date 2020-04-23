const express = require("express");
const userController = require("../controllers/users.controller");
const userRouter = express.Router();
const auth = require("../middleware/auth");

//User - Register
userRouter.post("/register", userController.register);

//User - Login
userRouter.post("/login", userController.login);

//User - Profile
userRouter.get("/profile", auth, userController.profile);

module.exports = userRouter;