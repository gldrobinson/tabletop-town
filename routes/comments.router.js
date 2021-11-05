const commentRouter = require("express").Router({ mergeParams: true });
const {
  deleteComment,
  getComments,
  postComment,
} = require("../controllers/comments.controller.js");

commentRouter.delete("/:comment_id", deleteComment);

commentRouter.route("/").get(getComments).post(postComment);

module.exports = { commentRouter };
