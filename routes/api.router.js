const apiRouter = require("express").Router();
const { welcomeMessage } = require("../controllers/api.controller");
const { categoryRouter } = require("./categories.router.js");
const { reviewRouter } = require("./reviews.router.js");
const { commentRouter } = require("./comments.router.js");
const { userRouter } = require("./users.router.js");
const { handleMethodNotAllowed } = require("../controllers/errors.controller");

apiRouter.route("/").get(welcomeMessage).all(handleMethodNotAllowed);
apiRouter.use("/categories", categoryRouter);
apiRouter.use("/reviews", reviewRouter);
apiRouter.use("/comments", commentRouter);
apiRouter.use("/users", userRouter);

module.exports = { apiRouter };
