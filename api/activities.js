const express = require("express");
const activitiesRouter = express.Router();
const {
  getAllActivities,
  getPublicRoutinesByActivity,
  createActivity,
  updateActivity,
} = require("../db");
const { requireUser } = require("./utils");

// GET /api/activities/:activityId/routines
activitiesRouter.get('/:activityId/routines', async (req, res, next) => {
    const activityId = req.params.activityId;
    const activity = await getActivityById(activityId);
    if (activity) {
        res.send(activity.routines);
    } else {
        res.status(404).send('Activity not found');
    }
    next()
}
);

// GET /api/activities
activitiesRouter.get("/", async (req, res, next) => {
    try {
        const activities = await getAllActivities();
        res.send(activities);
    }
    catch (error) {
        next(error);
    }
}
);


// POST /api/activities
activitiesRouter.post('/', requireUser, async (req, res, next) => {
    try {
        const activity = await createActivity(req.body);
        res.send(activity);
    }
    catch (error) {
        next(error);
    }
}
);

// PATCH /api/activities/:activityId
activitiesRouter.patch('/:activityId', requireUser, async (req, res, next) => {
    try {
        const activity = await updateActivity(req.params.activityId, req.body);
        if (activity) {
            res.send(activity);
        }
        else {
            res.status(404).send('Activity not found');
        }
    }
    catch (error) {
        next(error);
    }
}
);

activitiesRouter.get("/:activityId/routines", async (req, res, next)=> {
    
    try {
        const routines = await getPublicRoutinesByActivity(req.params.activityId)
        if (routines) {
            res.send(routines);
          } else {
            throw({
              name: "NoneFound",
              message: `No Routines were found with Activity ${id}`,
            })
        }
    } catch (error) {
        
    }
})

module.exports = activitiesRouter;
