require("dotenv").config();
require("./config/mongo");
require("./helpers/hbs"); // custom functions adding features to hbs templates

const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const hbs = require("hbs");

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(path.join(__dirname, "views/partials")); // where are the tiny chunks of views ?

// base middlewares setup

app.use(logger("dev"));
app.use(express.json()); // expose asynchronous posted data in req.body
app.use(express.urlencoded({ extended: false })); // same for synchronous posted data
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// connect routers
const indexRouter = require("./routes/index");
const artistRouter = require("./routes/artist")
const labelRouter = require("./routes/label")
const styleRouter = require("./routes/style")
// require label router here
// require style router here

// use routers
app.use("/", indexRouter); // use routers
app.use("/dashboard/artist", artistRouter);
app.use("/dashboard/label", labelRouter);
app.use("/dashboard/style", styleRouter);
// use label router here
// use style router here


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

