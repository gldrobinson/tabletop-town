const db = require("../db/connection.js");

exports.deleteCommentById = (comment_id) => {
  const queryValues = [comment_id];
  const query = `
  DELETE FROM comments
  WHERE comment_id = $1;`;
  return db.query(query, queryValues);
};
