const db = require("../connection");
const format = require("pg-format");
const {
  formatCategoryData,
  formatUserData,
  formatCommentData,
  formatReviewData,
} = require("../../utils/formatData.utils");

const seed = async (data) => {
  const { categoryData, commentData, reviewData, userData } = data;
  // 1. Drop tables if exists -->comments, reviews, user, category
  await dropTables();

  // 2. create tables --> category, user, reviews, comments
  await createTables();

  // 3. Insert data into tables --> category, user, reviews, comments
  await insertDataIntoTables(categoryData, userData, reviewData, commentData);
};

const dropTables = async () => {
  await db.query(`DROP TABLE IF EXISTS comments;`);
  await db.query(`DROP TABLE IF EXISTS reviews;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS categories;`);
};
const createTables = async () => {
  // categories table
  let query = `CREATE TABLE categories (
    slug VARCHAR(40) PRIMARY KEY NOT NULL,
    description TEXT NOT NULL
  );`;
  await db.query(query);

  // users table
  query = `CREATE TABLE users (
    username VARCHAR(40) PRIMARY KEY NOT NULL,
    avatar_url TEXT,
    name VARCHAR(80) NOT NULL
  );`;
  await db.query(query);

  // reviews table
  query = `CREATE TABLE reviews (
    review_id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    review_body TEXT NOT NULL,
    designer VARCHAR(100) NOT NULL,
    review_img_url TEXT DEFAULT 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg',
    votes INTEGER DEFAULT 0,
    category VARCHAR(40) NOT NULL REFERENCES categories(slug),
    owner VARCHAR(40) NOT NULL REFERENCES users(username),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`;
  await db.query(query);
  // comments table
  query = `CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    author VARCHAR(40) NOT NULL REFERENCES users(username),
    review_id INTEGER REFERENCES reviews(review_id) ON DELETE CASCADE,
    votes INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    body TEXT NOT NULL
  );`;
  await db.query(query);
};
const insertDataIntoTables = async (
  categoryData,
  userData,
  reviewData,
  commentData
) => {
  query = `INSERT INTO categories 
  (slug, description)
  VALUES
  %L;`;
  await db.query(format(query, formatCategoryData(categoryData)));

  // users table
  query = `INSERT INTO users
  (username, avatar_url, name)
  VALUES 
  %L;`;
  await db.query(format(query, formatUserData(userData)));

  //reviews table
  query = `INSERT INTO reviews
  (title, review_body, designer, review_img_url, votes, category, owner, created_at)
  VALUES 
  %L;`;
  await db.query(format(query, formatReviewData(reviewData)));

  // comments table
  query = `INSERT INTO comments
  (author, review_id, votes, created_at, body)
  VALUES 
  %L;`;
  await db.query(format(query, formatCommentData(commentData)));
};
module.exports = seed;
