const {
  selectReviewById,
  updateVotesOnReview,
  selectReviews,
  selectReviewsDebug,
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
      res.status(200).send({ review });
    })
    .catch(next);
};

exports.getReviews = (req, res, next) => {
  const { sort_by, order, category } = req.query;
  console.log(sort_by, order, category);
  selectReviewsDebug()
    .then((reviews) => {
      res.status(200).send({ reviews });
    })
    .catch(next);
  // selectReviews(sort_by, order, category)
  //   .then((reviews) => {
  //     console.log(reviews);
  //     res.status(200).send({ reviews });
  //   })
  //   .catch(next);
};
