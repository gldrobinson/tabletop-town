const apiRouter = require("express").Router();
const { categoryRouter } = require("./categories.router.js");
const { reviewRouter } = require("./reviews.router.js");

apiRouter.use("/categories", categoryRouter);

apiRouter.use("/reviews", reviewRouter);

module.exports = { apiRouter };
