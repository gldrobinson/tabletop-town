const categoryRouter = require("express").Router();
const { getCategories } = require("../controllers/categories.controller.js");

categoryRouter.route("/").get(getCategories);

module.exports = { categoryRouter };
