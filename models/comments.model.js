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
    !bodyKeys.includes("body") ||
    bodyKeys.length > 2
  ) {
    return Promise.reject({ status: 400, message: "bad request" });
  }

  const { username, body } = bodyParams;

  const queryValues = [username, body, review_id];
  const query = `
  INSERT INTO comments
  (author, comment_body, review_id)
  VALUES
  ($1, $2, $3)
  RETURNING *;
  `;
  return db.query(query, queryValues).then(({ rows }) => rows[0]);
};

exports.selectComments = (review_id) => {
  const queryValues = [review_id];
  const query = `
  SELECT * FROM comments
  WHERE review_id = $1`;

  return db
    .query(query, queryValues)
    .then((result) => {
      // check to see if review_id exists when rows = []
      if (result.rows.length === 0) {
        return db.query(
          `SELECT * FROM reviews WHERE review_id = $1;`,
          queryValues
        );
      }
      return result;
    })
    .then(({ rows }) => {
      if (rows.length === 0) {
        return Promise.reject({ status: 404, message: "path not found" });
      } else if (rows[0].hasOwnProperty("review_body")) {
        return [];
      } else {
        return rows;
      }
    });
};
