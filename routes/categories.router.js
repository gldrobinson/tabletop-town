const categoryRouter = require("express").Router();
const { getCategories } = require("../controllers/categories.controller.js");
const { handleMethodNotAllowed } = require("../controllers/errors.controller");

categoryRouter.route("/").get(getCategories).all(handleMethodNotAllowed);

module.exports = { categoryRouter };
