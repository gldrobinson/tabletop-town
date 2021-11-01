const db = require("../db/connection");

exports.selectCategories = () => {
  const query = `SELECT * FROM categories;`;

  return db.query(query).then(({ rows }) => rows);
};
