const express = require("express");
const apiRouter = express.Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const { getUserById } = require("../db/users");

// create a route that 





// esponds to a request at /api/health with a message specifying it is healthy 
apiRouter.get("/health", async(req, res, next) => {
    res.send({
        message: "Its Healthy"
    })
})


// create a router that uses /api/users as the base path
const userRouter = require("./users");
apiRouter.use("/users", userRouter);

// ROUTER: /api/activities
const activitiesRouter = require('./activities');
apiRouter.use('/api/', activitiesRouter);

// ROUTER: /api/routines
const routinesRouter = require('./routines');
apiRouter.use('/routines', routinesRouter);

// ROUTER: /api/routine_activities
const routineActivitiesRouter = require('./routineActivities');
apiRouter.use('/routine_activities', routineActivitiesRouter);

module.exports = apiRouter;