const apiRouter = require("express").Router();
const { welcomeMessage } = require("../controllers/api.controller");
const { categoryRouter } = require("./categories.router.js");
const { reviewRouter } = require("./reviews.router.js");
const { commentRouter } = require("./comments.router.js");

apiRouter.route("/").get(welcomeMessage);
apiRouter.use("/categories", categoryRouter);

apiRouter.use("/reviews", reviewRouter);

apiRouter.use("/comments", commentRouter);

module.exports = { apiRouter };
