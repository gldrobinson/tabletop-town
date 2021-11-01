exports.handles500error = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Internal server error" });
};
