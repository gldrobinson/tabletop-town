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
  const psqlErrorStatus = {
    "22P02": 400,
    23503: 404,
  };

  const psqlErrorMessage = {
    400: "bad request",
    404: "path not found",
  };
  const status = psqlErrorStatus[code];
  const message = psqlErrorMessage[status];

  res.status(status).send({ message });
};

exports.handles500error = (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ message: "Internal server error" });
};

exports.handleMethodNotAllowed = (req, res, next) => {
  res.status(405).send({ message: "method not allowed" });
};
