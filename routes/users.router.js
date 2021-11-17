const userRouter = require("express").Router();
const {
  handleMethodNotAllowed,
} = require("../controllers/errors.controller.js");
const {
  getUsers,
  getUserByUsername,
} = require("../controllers/users.controller.js");

userRouter.route("/").get(getUsers).all(handleMethodNotAllowed);
userRouter.route("/:username").get(getUserByUsername);

module.exports = { userRouter };
