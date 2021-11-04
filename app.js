const express = require("express");
const { apiRouter } = require("./routes/api.router.js");
const {
  handleCustomerErrs,
  handles500error,
  handlePsqlErrs,
} = require("./controllers/errors.controller");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomerErrs);
app.use(handlePsqlErrs);
app.use(handles500error);

app.all("*", (req, res) => {
  res.status(404).send({ message: "path not found" });
});

module.exports = app;
