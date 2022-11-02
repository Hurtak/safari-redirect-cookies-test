var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res, next) {
  res.render("index", { cookies: req.cookies, loggedIn: Boolean(req.cookies['auth_test']) });
});

app.post("/login", function (req, res, next) {
  res.cookie('auth_test', 'yes', { maxAge: 900000, httpOnly: true });
  res.redirect("/");
});

app.get("/logout", function (req, res, next) {
  res.cookie('auth_test');
  res.redirect("/");
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
