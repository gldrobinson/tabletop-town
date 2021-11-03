const db = require("../db/connection");

exports.selectReviewById = (review_id) => {
  const query = `
    SELECT reviews.*, COUNT (comment_id) AS comments_count
    FROM reviews
    LEFT JOIN comments
    ON reviews.review_id = comments.review_id
    WHERE reviews.review_id = $1
    GROUP BY reviews.review_id;
  `;
  return db.query(query, [review_id]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({
        status: 404,
        message: "path not found",
      });
    }
    return rows[0];
  });
};

exports.updateVotesOnReview = (review_id, inc_votes) => {
  if (inc_votes === undefined) {
    return Promise.reject({ status: 400, message: "bad request" });
  }
  const query = `
  UPDATE reviews
  SET
  votes = votes + $1
  WHERE
  review_id = $2
  RETURNING *;
  `;
  return db.query(query, [inc_votes, review_id]).then(({ rows }) => {
    if (rows[0] === undefined) {
      return Promise.reject({ status: 404, message: "path not found" });
    }
    return rows[0];
  });
};

exports.selectReviews = (sort_by) => {
  const queryValues = [];
  let queryStr = `SELECT reviews.*, COUNT (comment_id) AS comments_count
    FROM reviews
    LEFT JOIN comments
    ON reviews.review_id = comments.review_id`;

  queryStr += ` GROUP BY reviews.review_id`;

  if (sort_by !== undefined) {
    queryValues.push(sort_by);
    queryStr += ` ORDER BY ${sort_by} ASC;`;
  }
  return db
    .query(queryStr)
    .then(({ rows }) => {
      return rows;
    })
    .catch(console.log);
};
