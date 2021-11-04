const {
  selectReviewById,
  updateVotesOnReview,
  selectReviews,
  addComment,
  selectComments,
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
  const bodyParams = req.body;
  updateVotesOnReview(review_id, bodyParams)
    .then((review) => {
      res.status(201).send({ review });
    })
    .catch(next);
};

exports.getReviews = (req, res, next) => {
  const { sort_by, order, category } = req.query;
  selectReviews(sort_by, order, category)
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch(next);
};

exports.postComment = (req, res, next) => {
  const { review_id } = req.params;
  const bodyParams = req.body;
  addComment(review_id, bodyParams)
    .then((comment) => {
      res.status(201).send({ comment });
    })
    .catch(next);
};
exports.getComments = (req, res, next) => {
  const { review_id } = req.params;

  selectComments(review_id)
    .then((comments) => {
      res.status(200).send({ comments });
    })
    .catch((err) => {
      next(err);
    });
};
