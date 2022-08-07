const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const { sequelize } = require("./db/models");
const session = require("express-session");
const { sessionSecret } = require("./config");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const indexRouter = require("./routes/index");
const questionRouter = require("./routes/question");
const userLogin = require("./routes/userRoutes/userlogin");
const signupRouter = require("./routes/userRoutes/usersignup");
const userProfile = require("./routes/userRoutes/userprofile");
const userLogout = require("./routes/userRoutes/userlogout");
const userEdit = require("./routes/userRoutes/useredit");
const userDelete = require("./routes/userRoutes/userdelete");
const demoUser = require("./routes/userRoutes/demouser");
// const favicon = require('serve-favicon');

const answerRouter = require("./routes/answer");

const { restoreUser } = require("./auth");

const app = express();

// view engine setup


app.set("view engine", "pug");
app.use(express.static("./public"));
// app.use(favicon(path.join(__dirname,'public','images','favicon.ico')));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(sessionSecret));
app.use(express.static(path.join(__dirname, "public")));

// set up session middleware
const store = new SequelizeStore({ db: sequelize });

app.use(
  session({
    secret: sessionSecret,
    store,
    saveUninitialized: false,
    resave: false,
  })
);

// create Session table if it doesn't already exist
store.sync();

app.use(restoreUser);

app.use(indexRouter);
app.use(userLogin);
app.use(signupRouter);
app.use(userProfile);
app.use(userLogout);
app.use(userEdit);
app.use(userDelete);
app.use(demoUser);
app.use("/answers", answerRouter);
// app.use("/users", usersRouter);
app.use("/questions", questionRouter);

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
  if (req.session.auth) {
    return res.render("page-not-found-logged", { title: "Not Found" });
  }
  res.render("page-not-found", { title: "Not Found" });
});

module.exports = app;
