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
activitiesRouter.get("/:activityId/routines", async (req, res, next) => {
    const activityId  = req.params.activityId
    try {
        const routines = await getPublicRoutinesByActivity({id: activityId});
        
            res.send(routines);
      
    }
    catch (error) {
        next(error);
    }
}
);

// GET /api/activities
activitiesRouter.get("/", async (req, res, next) => {
    try {
        const activities = await getAllActivities();
        res.send(activities);
    } catch (error) {
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

//PATCH anyone can update any activity
activitiesRouter.patch("/:activityId", requireUser, async (req, res, next) => {
    try {
      const { activityId } = req.params;
      const { name, description } = req.body;
      const newActivity = await updateActivity({
        id: activityId,
        name,
        description,
      });
      if (newActivity) {
        res.send(newActivity);
      }
    } catch (error) {
      next(error);
    }
  });


module.exports = activitiesRouter;
