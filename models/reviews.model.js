const db = require("../db/connection");

exports.selectReviewById = (review_id) => {
  const query = `
    SELECT reviews.*, COUNT (comment_id) AS comment_count
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

exports.updateVotesOnReview = (review_id, bodyParams) => {
  const bodyKeys = Object.keys(bodyParams);

  if (bodyKeys.length === 0) {
    // return unchanged review
    const query = "SELECT * FROM reviews WHERE review_id = $1";
    return db.query(query, [review_id]).then(({ rows }) => rows[0]);
  }

  if (!bodyKeys.includes("inc_votes") || bodyKeys.length > 1) {
    return Promise.reject({ status: 400, message: "bad request" });
  }
  const { inc_votes } = bodyParams;
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

exports.selectReviews = (sort_by = "created_at", order = "desc", category) => {
  const queryValues = [];

  const validSortBy = [
    "review_id",
    "title",
    "review_body",
    "designer",
    "review_img_url",
    "votes",
    "category",
    "owner",
    "created_at",
  ];

  const validOrder = ["asc", "desc"];

  if (!validSortBy.includes(sort_by) || !validOrder.includes(order)) {
    return Promise.reject({ status: 400, message: "bad request" });
  }

  let queryStr = `SELECT reviews.*, COUNT (comment_id) AS comment_count
    FROM reviews
    LEFT JOIN comments
    ON reviews.review_id = comments.review_id`;

  if (category !== undefined) {
    queryValues.push(category);
    queryStr += ` WHERE category = $1`;
  }

  queryStr += ` GROUP BY reviews.review_id ORDER BY ${sort_by} ${order};`;

  const categoryQueryStr = `SELECT * FROM categories WHERE slug = $1;`;

  const reviewPromise = db.query(queryStr, queryValues);
  const categoryPromise = db.query(categoryQueryStr, [category]);

  return Promise.all([reviewPromise, categoryPromise]).then(
    ([review, category]) => {
      const reviewRows = review.rows;
      const categoryRows = category.rows;

      if (reviewRows.length > 0) {
        console.log(reviewRows);
        return reviewRows;
      }
      if (categoryRows.length > 0) {
        return reviewRows;
      }

      return Promise.reject({ status: 404, message: "path not found" });
    }
  );
};

exports.selectReviewsDebug = (sort_by, order) => {
  if (!sort_by) {
    sort_by = "created_at";
  }
  if (!order) {
    order = "desc";
  }

  const query = `SELECT * FROM reviews ORDER BY ${sort_by} ${order};`;
  return db.query(query).then(({ rows }) => rows);
};
