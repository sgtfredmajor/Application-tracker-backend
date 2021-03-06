const createError = require("http-errors"),
  express = require("express"),
  path = require("path"),
  cookieParser = require("cookie-parser"),
  logger = require("morgan"),
  cors = require("cors");

const indexRouter = require("./routes/index");
const interviewRouter = require("./routes/interviews");
const applicationRouter = require("./routes/applications");
const loginRouter = require("./routes/login");

const interViewEntryRouter = require("./routes/interviewsEntry");
const applicationInfo = require("./routes/userapplications");
const manageapplications = require("./routes/manageapplications");


const app = express();

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/interviews", interviewRouter);
app.use("/applications", applicationRouter);
app.use("/login", loginRouter);
app.use("/interviewsEntry", interViewEntryRouter);
app.use("/manageapplications", manageapplications);
app.use("/userapplications", applicationInfo);


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
});

module.exports = app;
