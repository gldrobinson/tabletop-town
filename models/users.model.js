const db = require("../db/connection");

exports.selectUsers = () => {
  const query = `SELECT username FROM users;`;
  return db.query(query).then(({ rows }) => rows);
};
