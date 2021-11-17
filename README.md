# Tabletop Town

Welcome to Tabletop town. This is a server that allows users to interact with a range of different board games for different categories and users are encouraged to engage with reviews and comments for all the games by adding votes and posting comments.

It is hosted on heroku here: https://tabletop-town.herokuapp.com

Available endpoints are listed here: https://tabletop-town.herokuapp.com/api/

## Users can interact with the server to:

- View and filter categories, games, users, reviews and comments.
- Increase/decrease votes on reviews and comments.
- Add comments to reviews (a user must have a valid username to post a comment).
- Filter and sort the reviews through queries.
- Delete a comment.

## Setup

### To clone this server, please:

- Clone this repo: https://github.com/gldrobinson/tabletop-town.git
- Run the file through node.js and install the project dependencies

  ```sh
  npm install
  ```

- Create two .env files: `.env.test` and `.env.development` in the main directory to set the correct database for the environment:

  - Add “PGDATABASE=nc_games_test” to `.env.test`
  - Add “PGDATABASE=nc_games” to `.env.development`
  - If using linux, add “PGPASSWORD" to both files

- Run the `setup-dbs` script:

  ```sh
    npm run setup-dbs
  ```

- Run the `seed` script:
  ```sh
    npm run seed
  ```

### To run the test suite:

```sh
    npm test
```

### Project dependencies:

- dotenv: 10.0.0
- express: 4.17.1,
- pg: 8.7.1,
- pg-format: 1.0.4

### Test / dev dependencies:

- jest: 27.3.1,
- jest-sorted: 1.0.12,
- supertest: 6.1.6
