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
