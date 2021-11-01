exports.handleCustomerErrs = (err, req, res, next) => {
  const { status, message } = err;
  if (status) {
    res.status(status).send({ message });
  } else {
    next(err);
  }
};

exports.handlePsqlErrs = (err, req, res, next) => {
  const { code } = err;

  if (code === "22P02") {
    res.status(400).send({ message: "bad request" });
  } else {
    next(err);
  }
};

exports.handles500error = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Internal server error" });
};
