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
    test("status: 404, responds with error message path not found", () => {
      return request(app)
        .get("/api/reviews/9999")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("path not found");
        });
    });
    test("status: 400, responds with error message bad requet", () => {
      return request(app)
        .get("/api/reviews/not_a_path")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
  });
  describe("PATCH /api/reviews/:review_id", () => {
    test("status: 201, responds with the updated review object when vote increases", () => {
      const input = { inc_votes: 1 };
      return request(app)
        .patch("/api/reviews/2")
        .send(input)
        .expect(201)
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
            votes: 6,
          });
        });
    });
    test("status: 201, responds with the updated review object when vote decreases", () => {
      const input = { inc_votes: -3 };
      return request(app)
        .patch("/api/reviews/2")
        .send(input)
        .expect(201)
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
            votes: 2,
          });
        });
    });
    test("status: 404, responds with error message path not found when inputted path is out of range", () => {
      return request(app)
        .patch("/api/reviews/9999")
        .send({ inc_votes: 3 })
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("path not found");
        });
    });
    test("status: 400, responds with error message bad request when input path is invalid", () => {
      return request(app)
        .patch("/api/reviews/not_a_path")
        .send({ inc_votes: 3 })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
    test("status: 400, responds with error message bad request when input body is invalid", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({ inc_votes: "cat" })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
    test("status: 400, responds with error message bad request when there is no inc_votes on body", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({})
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
  });
  describe("GET /api/reviews", () => {
    test("status: 200, responds with an array of review objects", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews).toHaveLength(13);
          body.reviews.forEach((review) => {
            expect.objectContaining({
              review_id: expect.any(Number),
              title: expect.any(String),
              designer: expect.any(String),
              owner: expect.any(String),
              review_img_url: expect.any(String),
              review_body: expect.any(String),
              category: expect.any(String),
              created_at: expect.any(String),
              votes: expect.any(Number),
              comment_count: expect.any(String),
            });
          });
        });
    });
    test("status: 200, responds with an array of review objects that has a sort_by query for title", () => {
      return request(app)
        .get("/api/reviews?sort_by=title")
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews).toHaveLength(13);
          expect(body.reviews).toBeSorted("title");
        });
    });
    test("status: 200, responds with an array of review objects that has a sort_by query for review_id", () => {
      return request(app)
        .get("/api/reviews?sort_by=review_id")
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews).toHaveLength(13);
          expect(body.reviews).toBeSorted("review_id");
        });
    });
  });
});
