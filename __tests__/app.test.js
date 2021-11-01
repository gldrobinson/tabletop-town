const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("app tests", () => {
  test("status: 404 responds with error message", () => {
    return request(app)
      .get("/api/not_a_path")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("path not found");
      });
  });
  describe("GET /api/categories", () => {
    test("status: 200, responds with an array of category objects", () => {
      return request(app)
        .get("/api/categories")
        .expect(200)
        .then(({ body }) => {
          expect(body.categories).toHaveLength(4);
          body.categories.forEach((category) => {
            expect(category).toEqual(
              expect.objectContaining({
                slug: expect.any(String),
                description: expect.any(String),
              })
            );
          });
        });
    });
  });
  describe("GET /api/reviews/:review_id", () => {
    test("status: 200, responds with a review object", () => {
      return request(app)
        .get("/api/reviews/2")
        .expect(200)
        .then(({ body }) => {
          expect(body.review).toEqual({
            owner: "philippaclaire9",
            title: "Jenga",
            review_id: 2,
            review_body: "Fiddly fun for all the family",
            designer: "Leslie Scott",
            review_image_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            category: "dexterity",
            review_created_at: "2021-01-18T10:01:41.251Z",
            votes: 5,
            comments_count: "3",
          });
        });
    });
  });
});
