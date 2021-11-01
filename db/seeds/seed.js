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
  // 1. Drop tables if exists... comments, reviews, user, category
  await db.query(`DROP TABLE IF EXISTS comments;`);
  await db.query(`DROP TABLE IF EXISTS reviews;`);
  await db.query(`DROP TABLE IF EXISTS users;`);
  await db.query(`DROP TABLE IF EXISTS categories;`);

  // 2. create tables ... category, user, reviews, comments
  // categories table
  let query = `CREATE TABLE categories (
    slug VARCHAR(40) PRIMARY KEY NOT NULL,
    description TEXT
  );`;
  await db.query(query);

  // users table
  query = `CREATE TABLE users (
    username VARCHAR(40) PRIMARY KEY NOT NULL,
    avatar_url TEXT,
    name VARCHAR(80)
  );`;
  await db.query(query);

  // reviews table
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
  // comments table
  query = `CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    author VARCHAR(40) REFERENCES users(username) NOT NULL,
    review_id INTEGER REFERENCES reviews(review_id) NOT NULL,
    votes INTEGER DEFAULT 0,
    comment_created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    comment_body TEXT
  );`;
  await db.query(query);

  // 3. insert data into tables
  // categories table
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
  (title, review_body, designer, review_image_url, votes, category, owner, review_created_at)
  VALUES 
  %L;`;
  await db.query(format(query, formatReviewData(reviewData)));

  // comments table
  query = `INSERT INTO comments
  (author, review_id, votes, comment_created_at, comment_body)
  VALUES 
  %L;`;
  await db.query(format(query, formatCommentData(commentData)));
};

module.exports = seed;
