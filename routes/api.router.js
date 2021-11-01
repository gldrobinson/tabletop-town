const apiRouter = require("express").Router();
const { categoryRouter } = require("./categories.router.js");

apiRouter.use("/categories", categoryRouter);

module.exports = { apiRouter };
