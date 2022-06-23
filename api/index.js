
const express = require("express");
const apiRouter = express.Router();


// create a route that 





// esponds to a request at /api/health with a message specifying it is healthy 
apiRouter.get("/health", async(req, res, next) => {
    res.send({
        message: "Its Healthy"
    })
})


const usersRouter = require("./users");
apiRouter.use("/users", usersRouter);

const activitiesRouter = require("./activities");
apiRouter.use("/activities", activitiesRouter);

const routinesRouter = require("./routines");
apiRouter.use("/routines", routinesRouter);

const routineActivitiesRouter = require("./routineActivities");
apiRouter.use("/routine_activities", routineActivitiesRouter);

module.exports = apiRouter;

