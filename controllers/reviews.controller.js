const {
  selectReviewById,
  updateVotesOnReview,
} = require("../models/reviews.model.js");

exports.getReviewById = (req, res, next) => {
  const { review_id } = req.params;
  selectReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.patchReviewById = (req, res, next) => {
  const { review_id } = req.params;
  const { inc_votes } = req.body;
  updateVotesOnReview(review_id, inc_votes)
    .then((review) => {
      res.status(201).send({ review });
    })
    .catch(next);
};
