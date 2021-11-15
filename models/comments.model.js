const db = require("../db/connection.js");

exports.deleteCommentById = (comment_id) => {
  const queryValues = [comment_id];
  const query = `
  DELETE FROM comments
  WHERE comment_id = $1
  RETURNING *;`;

  return db.query(query, queryValues).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, message: "path not found" });
    }
  });
};

exports.addComment = (review_id, bodyParams) => {
  const bodyKeys = Object.keys(bodyParams);
  if (
    !bodyKeys.includes("username") ||
    !bodyKeys.includes("comment_body") ||
    bodyKeys.length > 2
  ) {
    return Promise.reject({ status: 400, message: "bad request" });
  }

  const { username, comment_body } = bodyParams;

  const queryValues = [username, comment_body, review_id];
  const query = `
  INSERT INTO comments
  (author, comment_body, review_id)
  VALUES
  ($1, $2, $3)
  RETURNING *;
  `;
  return db.query(query, queryValues).then(({ rows }) => {
    return rows[0];
  });
};

exports.selectComments = (review_id) => {
  const queryValues = [review_id];
  const commentsQuery = `
  SELECT comment_id, author, votes, comment_created_at, comment_body FROM comments
  WHERE review_id = $1`;

  const reviewQuery = `SELECT * FROM reviews WHERE review_id = $1;`;

  const commentsPromise = db.query(commentsQuery, queryValues);
  const reviewsPromise = db.query(reviewQuery, queryValues);
  // check comments exist and review exists
  return Promise.all([commentsPromise, reviewsPromise]).then(
    ([comment, review]) => {
      const commentRows = comment.rows;
      const reviewRows = review.rows;

      if (commentRows.length > 0) {
        return commentRows;
      }

      if (reviewRows.length > 0) {
        return commentRows;
      }

      return Promise.reject({ status: 404, message: "path not found" });
    }
  );
};
