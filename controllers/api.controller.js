exports.welcomeMessage = (req, res, next) => {
  const availableEndPoints = `GET /api \nGET /api/categories \nGET /api/reviews/:review_id \nPATCH /api/reviews/:review_id \nGET /api/reviews \nGET /api/reviews/:review_id/comments \nPOST /api/reviews/:review_id/comments \nDELETE /api/comments/:comment_id`;

  res.status(200).send({ message: availableEndPoints });
};
