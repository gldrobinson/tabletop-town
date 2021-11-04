exports.welcomeMessage = (req, res, next) => {
  const endPoints = {
    endPoints: {
      "/api": "GET",
      "/api/categories": "GET",
      "/api/reviews/:review_id ": ["GET", "PATCH"],
      "/api/reviews": "GET",
      "/api/reviews/:review_id/comments": ["GET", "POST"],
      "/api/comments/:comment_id ": "DELETE",
    },
  };

  res.status(200).send(endPoints);
};
