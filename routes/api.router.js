const apiRouter = require("express").Router();
const { categoryRouter } = require("./categories.router.js");
const { reviewRouter } = require("./reviews.router.js");
const { commentRouter } = require("./comments.router.js");

apiRouter.use("/categories", categoryRouter);

apiRouter.use("/reviews", reviewRouter);

apiRouter.use("/comments", commentRouter);

module.exports = { apiRouter };
