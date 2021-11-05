const commentRouter = require("express").Router({ mergeParams: true });
const {
  deleteComment,
  getComments,
  postComment,
} = require("../controllers/comments.controller.js");
const {
  handleMethodNotAllowed,
} = require("../controllers/errors.controller.js");

commentRouter
  .route("/:comment_id")
  .delete(deleteComment)
  .all(handleMethodNotAllowed);

commentRouter.route("/").get(getComments).post(postComment);

module.exports = { commentRouter };
