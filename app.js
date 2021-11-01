const express = require("express");
const { apiRouter } = require("./routes/api.router.js");
const {
  handleCustomerErrs,
  handles500error,
} = require("./controllers/errors.controller");

const app = express();

app.use(express.json());

app.use("/api", apiRouter);

app.use(handleCustomerErrs);
app.use(handles500error);

app.all("*", (req, res) => {
  res.status(404).send({ message: "path not found" });
});

module.exports = app;
