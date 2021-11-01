const db = require("../connection");
const format = require("pg-format");

const seed = async (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. Drop tables if exists... comments, reviews, user, category
  console.log("Dropping comments table");
  await db.query(`DROP TABLE IF EXISTS comments;`);
  console.log("Dropping comments reviews");
  await db.query(`DROP TABLE IF EXISTS reviews;`);
  console.log("Dropping comments users");
  await db.query(`DROP TABLE IF EXISTS users;`);
  console.log("Dropping comments categories");
  await db.query(`DROP TABLE IF EXISTS categories;`);

  // 2. create tables ... category, user, reviews, comments
  console.log(`Adding categories table`);
  let query = `CREATE TABLE categories (
    slug VARCHAR(40) PRIMARY KEY NOT NULL,
    description TEXT
  );`;
  await db.query(query);
  console.log(`Adding users table`);
  query = `CREATE TABLE users (
    username VARCHAR(40) PRIMARY KEY NOT NULL,
    avatar_url TEXT,
    name VARCHAR(80)
  );`;
  await db.query(query);
  console.log(`Adding reviews table`);
  query = `CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    review_body TEXT,
    designer VARCHAR(100),
    review_image_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    votes INTEGER DEFAULT 0,
    category VARCHAR(40) REFERENCES categories(slug),
    owner VARCHAR(40) REFERENCES users(username),
    review_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;
  await db.query(query);
  console.log(`Adding reviews comments`);
  query = `CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    author VARCHAR(40) REFERENCES users(username) NOT NULL,
    review_id INTEGER REFERENCES reviews(review_id) NOT NULL,
    votes INTEGER DEFAULT 0,
    comment_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comment_body TEXT
  );`;
  await db.query(query);
  // 3. insert data
  console.log(`Inserting categories data`);
  // insert... values %L,
  // array of vals [[..], [...]...]
};

module.exports = seed;
