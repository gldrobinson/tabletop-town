const db = require("../db/connection");

exports.selectUsers = () => {
  const query = `SELECT username FROM users;`;
  return db.query(query).then(({ rows }) => rows);
};

exports.selectUserByUsername = (username) => {
  const query = `SELECT * FROM users WHERE username = $1;`;

  return db.query(query, [username]).then(({ rows }) => {
    return rows[0];
  });
};
