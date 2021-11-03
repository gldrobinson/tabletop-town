const reviewRouter = require("express").Router();
const {
  getReviewById,
  patchReviewById,
  getReviews,
} = require("../controllers/reviews.controller.js");

reviewRouter.route("/").get(getReviews);
reviewRouter.route("/:review_id").get(getReviewById);
reviewRouter.route("/:review_id").patch(patchReviewById);

module.exports = { reviewRouter };
