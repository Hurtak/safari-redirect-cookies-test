const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const PORT = 3000;
const COOKIE_NAME = "auth_test";

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res, next) {
  res.render("index", {
    cookies: req.cookies,
    loggedIn: Boolean(req.cookies[COOKIE_NAME]),
  });
});

app.post("/login", function (req, res, next) {
  res.cookie(COOKIE_NAME, "yes", { maxAge: 900000, httpOnly: true });
  res.redirect("/");
});

app.get("/logout", function (req, res, next) {
  res.clearCookie(COOKIE_NAME);
  res.redirect("/");
});

app.post("/logout", function (req, res, next) {
  res.clearCookie(COOKIE_NAME);
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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
