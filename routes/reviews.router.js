const reviewRouter = require("express").Router();
const {
  getReviewById,
  patchReviewById,
  getReviews,
} = require("../controllers/reviews.controller.js");
const { commentRouter } = require("./comments.router.js");

reviewRouter.route("/").get(getReviews);
reviewRouter.route("/:review_id").get(getReviewById).patch(patchReviewById);

reviewRouter.use("/:review_id/comments", commentRouter);

module.exports = { reviewRouter };
