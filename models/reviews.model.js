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

exports.updateVotesOnReview = (review_id, bodyParams) => {
  const bodyKeys = Object.keys(bodyParams);

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

exports.selectReviews = (sort_by = "title", order = "ASC", category) => {
  const queryValues = [];

  const validSortBy = [
    "review_id",
    "title",
    "review_body",
    "designer",
    "review_image_url",
    "votes",
    "category",
    "owner",
    "review_created_at",
  ];

  const validOrder = ["ASC", "DESC"];

  if (!validSortBy.includes(sort_by)) {
    return Promise.reject({ status: 400, message: "bad request" });
  }

  if (!validOrder.includes(order)) {
    return Promise.reject({ status: 400, message: "bad request" });
  }

  let queryStr = `SELECT reviews.*, COUNT (comment_id) AS comments_count
    FROM reviews
    LEFT JOIN comments
    ON reviews.review_id = comments.review_id`;

  if (category !== undefined) {
    queryValues.push(category);
    queryStr += ` WHERE category = $1`;
  }

  queryStr += ` GROUP BY reviews.review_id ORDER BY ${sort_by} ${order};`;

  return db
    .query(queryStr, queryValues)
    .then((result) => {
      if (result.rows.length > 0) {
        return result;
      }
      // results.rows = [], check category exists
      const query = `SELECT * FROM categories WHERE slug = $1;`;

      return db.query(query, [category]);
    })
    .then(({ rows }) => {
      if (rows.length === 0) {
        // category.rows = [] - category does not exist
        return Promise.reject({ status: 404, message: "path not found" });
      } else if (rows[0].hasOwnProperty("slug")) {
        // category comes back, then no reviews for category
        return [];
      } else {
        return rows;
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
