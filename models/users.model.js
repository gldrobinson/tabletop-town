const db = require("../db/connection");

exports.selectUsers = () => {
  const query = `SELECT username FROM users;`;
  return db.query(query).then(({ rows }) => rows);
};

exports.selectUserByUsername = (username) => {
  const query = `SELECT * FROM users WHERE username = $1;`;

  return db.query(query, [username]).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, message: "path not found" });
    }
    return rows[0];
  });
};
