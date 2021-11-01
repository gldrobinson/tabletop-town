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
  return db.query(query, [review_id]).then(({ rows }) => rows[0]);
};
