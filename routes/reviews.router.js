const reviewRouter = require("express").Router();
const {
  getReviewById,
  patchReviewById,
  getReviews,
  postComment,
  getComments,
} = require("../controllers/reviews.controller.js");

reviewRouter.route("/").get(getReviews);
reviewRouter.route("/:review_id").get(getReviewById).patch(patchReviewById);

reviewRouter.route("/:review_id/comments").get(getComments).post(postComment);

module.exports = { reviewRouter };
