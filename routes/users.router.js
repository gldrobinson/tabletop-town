const userRouter = require("express").Router();
const {
  handleMethodNotAllowed,
} = require("../controllers/errors.controller.js");
const { getUsers } = require("../controllers/users.controller.js");

userRouter.route("/").get(getUsers).all(handleMethodNotAllowed);

module.exports = { userRouter };
