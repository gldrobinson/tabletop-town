const endPoint = require("../endpoints.json");

exports.welcomeMessage = (req, res, next) => {
  res.status(200).send(endPoint);
};
