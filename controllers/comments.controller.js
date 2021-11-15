const {
  deleteCommentById,
  addComment,
  selectComments,
} = require("../models/comments.model.js");

exports.deleteComment = (req, res, next) => {
  const { comment_id } = req.params;
  deleteCommentById(comment_id)
    .then(() => {
      res.sendStatus(204);
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
