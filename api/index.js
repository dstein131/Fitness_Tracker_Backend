// create an api router
// attach other routers from files in this api directory (users, activities...)
// export the api router

const express = require("express");
const apiRouter = express.Router();

const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env;

apiRouter.use(async (req, res, next) => {
  if (!req.headers.authorization) {
    return next();
  }
  const auth = req.headers.authorization.split(" ")[1];
  const _user = jwt.decode(auth, process.env.JWT_SECRET);
  if (!_user) {
    return next();
  }
  const user = await getUserById(_user.id);
  req.user = user;
  next();
});

apiRouter.get("/health", (req, res, next) => {
  try {
    res.send({ message: "The server is healthy!" });
  } catch (error) {
    next(error);
  }
});

const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const activitiesRouter = require("./activities");
apiRouter.use("/activities", activitiesRouter);

const routineRouter = require("./routines");
const { getUserById } = require("../db");
apiRouter.use("/routines", routineRouter);

const routineActivityRouter = require("./routineActivities");
apiRouter.use("/routine_activities", routineActivityRouter);

module.exports = apiRouter;
