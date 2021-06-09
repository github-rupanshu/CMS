const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const db = require("./config/mongoose");
const jwt = require("./config/passportJWT");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const bodyParser = require("body-parser");
const cors = require("cors");
// used to extarct jason data from req
// app.use(express.json());
// app.use(express.urlencoded());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) console.log(`error in starting server: ${err}`);
  console.log(`server is running on port: ${port}`);
});
