const express = require("express");
const app = express();
const port = 8000;
const db = require("./config/mongoose");
const jwt = require("./config/passportJWT");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const bodyParser = require("body-parser");

// used to extarct jason data from req
// app.use(express.json());
// app.use(express.urlencoded());


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
 
// parse application/json
app.use(bodyParser.json())

app.use("/", require("./routes"));

app.listen(port, function (err) {
  if (err) console.log(`error in starting server: ${err}`);
  console.log(`server is running on port: ${port}`);
});
