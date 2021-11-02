const reviewRouter = require("express").Router();
const {
  getReviewById,
  patchReviewById,
} = require("../controllers/reviews.controller.js");

reviewRouter.route("/:review_id").get(getReviewById);
reviewRouter.route("/:review_id").patch(patchReviewById);

module.exports = { reviewRouter };
