const { selectReviewById } = require("../models/reviews.model.js");

exports.getReviewById = (req, res) => {
  const { review_id } = req.params;
  selectReviewById(review_id)
    .then((review) => {
      res.status(200).send({ review });
    })
    .catch(console.log);
};
