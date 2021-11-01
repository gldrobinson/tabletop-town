const reviewRouter = require("express").Router();
const { getReviewById } = require("../controllers/reviews.controller.js");

reviewRouter.route("/:review_id").get(getReviewById);

module.exports = { reviewRouter };
