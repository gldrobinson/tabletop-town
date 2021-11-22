const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");
const request = require("supertest");
const endPoint = require("../endpoints.json");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("app tests", () => {
  test("all endpoints that don't exist: status: 404 responds with error message path not found", () => {
    return request(app)
      .get("/api/not_a_path")
      .expect(404)
      .then(({ body }) => {
        expect(body.message).toBe("path not found");
      });
  });
  describe("all invalid methods to endpoints, responds with error message method not allowed", () => {
    describe("/api", () => {
      test("POST /api status 405", () => {
        return request(app)
          .post("/api")
          .send({})
          .expect(405)
          .then(({ body }) => {
            expect(body.message).toBe("method not allowed");
          });
      });
      test("PATCH /api status 405", () => {
        return request(app)
          .patch("/api")
          .send({})
          .expect(405)
          .then(({ body }) => {
            expect(body.message).toBe("method not allowed");
          });
      });
      test("DELETE /api status 405", () => {
        return request(app)
          .delete("/api")
          .expect(405)
          .then(({ body }) => {
            expect(body.message).toBe("method not allowed");
          });
      });
    });
    describe("/api/categories", () => {
      test("POST - status 405", () => {
        return request(app)
          .post("/api/categories")
          .send({})
          .expect(405)
          .then(({ body }) => {
            expect(body.message).toBe("method not allowed");
          });
      });
      test("PATCH - status 405", () => {
        return request(app)
          .patch("/api/categories")
          .send({})
          .expect(405)
          .then(({ body }) => {
            expect(body.message).toBe("method not allowed");
          });
      });
      test("DELETE - status 405", () => {
        return request(app)
          .delete("/api/categories")
          .expect(405)
          .then(({ body }) => {
            expect(body.message).toBe("method not allowed");
          });
      });
    });
    describe("/api/reviews", () => {
      test("POST - status 405", () => {
        return request(app)
          .post("/api/reviews")
          .send({})
          .expect(405)
          .then(({ body }) => {
            expect(body.message).toBe("method not allowed");
          });
      });
      test("PATCH - status 405", () => {
        return request(app)
          .patch("/api/reviews")
          .send({})
          .expect(405)
          .then(({ body }) => {
            expect(body.message).toBe("method not allowed");
          });
      });
      test("DELETE - status 405", () => {
        return request(app)
          .delete("/api/reviews")
          .expect(405)
          .then(({ body }) => {
            expect(body.message).toBe("method not allowed");
          });
      });
    });
    describe("/api/reviews/:review_id", () => {
      test("POST - status 405", () => {
        return request(app)
          .post("/api/reviews/2")
          .send({})
          .expect(405)
          .then(({ body }) => {
            expect(body.message).toBe("method not allowed");
          });
      });
      test("DELETE - status 405", () => {
        return request(app)
          .delete("/api/reviews/2")
          .expect(405)
          .then(({ body }) => {
            expect(body.message).toBe("method not allowed");
          });
      });
    });
    describe("/api/comments/:comment_id", () => {
      test("POST - status 405", () => {
        return request(app)
          .post("/api/comments/2")
          .send({})
          .expect(405)
          .then(({ body }) => {
            expect(body.message).toBe("method not allowed");
          });
      });
      test("GET - status 405", () => {
        return request(app)
          .get("/api/comments/2")
          .expect(405)
          .then(({ body }) => {
            expect(body.message).toBe("method not allowed");
          });
      });
    });
    describe("/api.users", () => {
      test("POST - status 405", () => {
        return request(app)
          .post("/api/users")
          .send({})
          .expect(405)
          .then(({ body }) => {
            expect(body.message).toBe("method not allowed");
          });
      });
      test("PATCH - status 405", () => {
        return request(app)
          .patch("/api/users")
          .send({})
          .expect(405)
          .then(({ body }) => {
            expect(body.message).toBe("method not allowed");
          });
      });
      test("DELETE - status 405", () => {
        return request(app)
          .delete("/api/users")
          .expect(405)
          .then(({ body }) => {
            expect(body.message).toBe("method not allowed");
          });
      });
    });
  });
  describe("GET /api", () => {
    test("status 200 for endpoint /api which responds with a JSON of available endpoints", () => {
      return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
          expect(body).toEqual(endPoint);
        });
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
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            category: "dexterity",
            review_created_at: "2021-01-18T10:01:41.251Z",
            votes: 5,
            comment_count: "3",
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
    test("status: 400, responds with error message bad request", () => {
      return request(app)
        .get("/api/reviews/not_a_path")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
  });
  describe("PATCH /api/reviews/:review_id", () => {
    test("status: 200, responds with the updated review object when vote increases", () => {
      const input = { inc_votes: 1 };
      return request(app)
        .patch("/api/reviews/2")
        .send(input)
        .expect(200)
        .then(({ body }) => {
          expect(body.review).toEqual({
            owner: "philippaclaire9",
            title: "Jenga",
            review_id: 2,
            review_body: "Fiddly fun for all the family",
            designer: "Leslie Scott",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            category: "dexterity",
            review_created_at: "2021-01-18T10:01:41.251Z",
            votes: 6,
          });
        });
    });
    test("status: 200, responds with the updated review object when vote decreases", () => {
      const input = { inc_votes: -3 };
      return request(app)
        .patch("/api/reviews/2")
        .send(input)
        .expect(200)
        .then(({ body }) => {
          expect(body.review).toEqual({
            owner: "philippaclaire9",
            title: "Jenga",
            review_id: 2,
            review_body: "Fiddly fun for all the family",
            designer: "Leslie Scott",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            category: "dexterity",
            review_created_at: "2021-01-18T10:01:41.251Z",
            votes: 2,
          });
        });
    });
    test("status: 404, responds with error message path not found when path is out of range", () => {
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
    test("status: 200, responds with unchanged review to user when no body was included", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({})
        .expect(200)
        .then(({ body }) => {
          expect(body.review).toEqual({
            owner: "philippaclaire9",
            title: "Jenga",
            review_id: 2,
            review_body: "Fiddly fun for all the family",
            designer: "Leslie Scott",
            review_img_url:
              "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
            category: "dexterity",
            review_created_at: "2021-01-18T10:01:41.251Z",
            votes: 5,
          });
        });
    });
    test("status: 400, responds with error message bad request when there are more than the require properties on the body", () => {
      return request(app)
        .patch("/api/reviews/2")
        .send({ inc_votes: 1, not_a_property: 3 })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
  });
  describe("GET /api/reviews", () => {
    test("status: 200, responds with an array of review objects with default sort_by review_created_at and order dec ", () => {
      return request(app)
        .get("/api/reviews")
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews).toHaveLength(13);
          expect(body.reviews[0].review_id).toBe(7);
          body.reviews.forEach((review) => {
            expect.objectContaining({
              review_id: expect.any(Number),
              title: expect.any(String),
              designer: expect.any(String),
              owner: expect.any(String),
              review_img_url: expect.any(String),
              category: expect.any(String),
              review_created_at: expect.any(String),
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
    test("status: 200, responds with an array of review objects that has a sort_by query for created_at", () => {
      return request(app)
        .get("/api/reviews?sort_by=review_created_at")
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews).toHaveLength(13);
          expect(body.reviews).toBeSorted("review_created_at");
        });
    });
    test("status: 200, responds with an array of review objects that has a sort_by query for owner", () => {
      return request(app)
        .get("/api/reviews?sort_by=owner")
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews).toHaveLength(13);
          expect(body.reviews[0].owner).toBe("philippaclaire9");
          expect(body.reviews).toBeSorted("owner");
        });
    });
    test("status: 400, responds with a bad request when sort_by query is invalid", () => {
      return request(app)
        .get("/api/reviews?sort_by=not_valid_query")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
    test("status: 200, responds with an array of review objects that has an order query for ASC", () => {
      return request(app)
        .get("/api/reviews?order=asc")
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews).toHaveLength(13);
          expect(body.reviews).toBeSorted("review_id");
        });
    });
    test("status: 200, responds with an array of review objects that has an order query for DESC", () => {
      return request(app)
        .get("/api/reviews?sort_by=review_id&&order=desc")
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews).toHaveLength(13);
          expect(body.reviews).toBeSortedBy("review_id", {
            descending: true,
          });
        });
    });
    test("status: 400, responds with a bad request when order query is invalid", () => {
      return request(app)
        .get("/api/reviews?order=not_valid_query")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
    test("status: 200, responds with an array of review objects that has been filtered when passed a category query social deduction", () => {
      return request(app)
        .get("/api/reviews?category=social deduction")
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews).toHaveLength(11);
        });
    });
    test("status: 404, responds with a path not found when category query is out of bounds", () => {
      return request(app)
        .get("/api/reviews?category=cats")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("path not found");
        });
    });
    test("status: 200, responds with an empty array when passed a category query children's games that exists but doesn't have any reviews associated with it", () => {
      return request(app)
        .get("/api/reviews?category=children's games")
        .expect(200)
        .then(({ body }) => {
          expect(body.reviews).toEqual([]);
        });
    });
  });
  describe("POST /api/reviews/:review_id/comments", () => {
    test("status 201, responds with the posted comment object", () => {
      const comment = {
        username: "mallionaire",
        comment_body: "great game!",
      };
      return request(app)
        .post("/api/reviews/1/comments")
        .expect(201)
        .send(comment)
        .then(({ body }) => {
          expect(body.comment).toEqual({
            author: expect.any(String),
            comment_body: expect.any(String),
            review_id: 1,
            comment_id: expect.any(Number),
            votes: 0,
            comment_created_at: expect.any(String),
          });
        });
    });
    test("status: 400, responds with error message bad request when passed an invalid path", () => {
      const comment = {
        username: "mallionaire",
        comment_body: "great game!",
      };
      return request(app)
        .post("/api/reviews/not_valid_path/comments")
        .expect(400)
        .send(comment)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
    test("status: 404, responds with error message path not found when passed a path that doesn't exist", () => {
      const comment = {
        username: "mallionaire",
        comment_body: "great game!",
      };
      return request(app)
        .post("/api/reviews/9999/comments")
        .expect(404)
        .send(comment)
        .then(({ body }) => {
          expect(body.message).toBe("path not found");
        });
    });
    test("status: 404, responds with error message path not found when passed a username in the body that does not exist", () => {
      const comment = {
        username: "not_a_username",
        comment_body: "Hello",
      };
      return request(app)
        .post("/api/reviews/1/comments")
        .expect(404)
        .send(comment)
        .then(({ body }) => {
          expect(body.message).toBe("path not found");
        });
    });
    test("status: 400, responds with error message bad request when passed a comment object with invalid properties", () => {
      const comment = {
        not_a_property: "mallionaire",
      };
      return request(app)
        .post("/api/reviews/1/comments")
        .expect(400)
        .send(comment)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
    test("status: 400, responds with error message bad request when passed an object with more than the required properties", () => {
      const comment = {
        username: "mallionaire",
        comment_body: "hello",
        extra_property: "ignore",
      };
      return request(app)
        .post("/api/reviews/1/comments")
        .expect(400)
        .send(comment)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
  });
  describe("GET /api/reviews/:review_id/comments", () => {
    test("status: 200, responds with an array of comments for the given review_id", () => {
      return request(app)
        .get("/api/reviews/2/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toHaveLength(3);
          body.comments.forEach((comment) => {
            expect.objectContaining({
              body: expect.any(String),
              votes: expect.any(Number),
              author: expect.any(String),
              comment_created_at: expect.any(String),
            });
          });
        });
    });
    test("status: 200, responds with an empty array of comments when the given review_id does not have any comments", () => {
      return request(app)
        .get("/api/reviews/1/comments")
        .expect(200)
        .then(({ body }) => {
          expect(body.comments).toEqual([]);
        });
    });
    test("status 404, responds with error message path not found when passed a review_id that is out of bounds", () => {
      return request(app)
        .get("/api/reviews/9999/comments")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("path not found");
        });
    });
    test("status 404, responds with error message bad request when passed a review_id that is invalid", () => {
      return request(app)
        .get("/api/reviews/not_valid_path/comments")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
  });
  describe("DELETE /api/comments/:comment_id", () => {
    test("status 204 on successful deletion of comment with no content in response", () => {
      return request(app).delete("/api/comments/1").expect(204);
    });
    test("status 404, responds with error message path not found when comment_id is out of bounds", () => {
      return request(app)
        .delete("/api/comments/1111")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("path not found");
        });
    });
    test("status 400, responds with error message bad request when comment_id is invalid", () => {
      return request(app)
        .delete("/api/comments/not_valid")
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
  });
  describe("GET /api/users", () => {
    test("status 200, responds with an array of user objects containing a username property", () => {
      return request(app)
        .get("/api/users")
        .expect(200)
        .then(({ body }) => {
          expect(body.users).toHaveLength(4);
          body.users.forEach((user) => {
            expect.objectContaining({
              username: expect.any(String),
            });
          });
        });
    });
  });
  describe("GET /api/users/:username", () => {
    test("status: 200, responds with a user object for the given username", () => {
      return request(app)
        .get("/api/users/mallionaire")
        .expect(200)
        .then(({ body }) => {
          expect(body.user).toEqual({
            username: "mallionaire",
            name: "haz",
            avatar_url:
              "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
          });
        });
    });
    test("status:400, responds with error message path not found when passed a username that is out of bounds ", () => {
      return request(app)
        .get("/api/users/no_username_found")
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("path not found");
        });
    });
  });
  describe("PATCH /api/comments/:comment_id", () => {
    test("status: 200, responds with the updated comment object when the vote increases", () => {
      const input = { inc_votes: 1 };
      return request(app)
        .patch("/api/comments/2")
        .send(input)
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).toEqual({
            comment_body: "My dog loved this game too!",
            votes: 14,
            author: "mallionaire",
            review_id: 3,
            comment_created_at: "2021-01-18T10:09:05.410Z",
            comment_id: 2,
          });
        });
    });
    test("status: 200, responds with the updated comment object when the vote decreases", () => {
      const input = { inc_votes: -1 };
      return request(app)
        .patch("/api/comments/2")
        .send(input)
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).toEqual({
            comment_body: "My dog loved this game too!",
            votes: 12,
            author: "mallionaire",
            review_id: 3,
            comment_created_at: "2021-01-18T10:09:05.410Z",
            comment_id: 2,
          });
        });
    });
    test("status: 404, responds with error message path not found when path is out of range", () => {
      return request(app)
        .patch("/api/comments/9999")
        .send({ inc_votes: 3 })
        .expect(404)
        .then(({ body }) => {
          expect(body.message).toBe("path not found");
        });
    });
    test("status: 400, responds with error message bad request when input path is invalid", () => {
      return request(app)
        .patch("/api/comments/not_a_path")
        .send({ inc_votes: 3 })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
    test("status: 400, responds with error message bad request when input body is invalid", () => {
      return request(app)
        .patch("/api/comments/2")
        .send({ inc_votes: "cat" })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
    test("status: 200, responds with unchanged comment object to user when no body was included", () => {
      return request(app)
        .patch("/api/comments/2")
        .send({})
        .expect(200)
        .then(({ body }) => {
          expect(body.comment).toEqual({
            comment_body: "My dog loved this game too!",
            votes: 13,
            author: "mallionaire",
            review_id: 3,
            comment_created_at: "2021-01-18T10:09:05.410Z",
            comment_id: 2,
          });
        });
    });
    test("status: 400, responds with error message bad request when there are more than the required properties on the body", () => {
      return request(app)
        .patch("/api/comments/2")
        .send({ inc_votes: 1, not_a_property: 3 })
        .expect(400)
        .then(({ body }) => {
          expect(body.message).toBe("bad request");
        });
    });
  });
});
