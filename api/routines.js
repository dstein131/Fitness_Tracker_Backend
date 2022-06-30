const express = require('express');
const routinesRouter = express.Router();
const { requireUser, requiredNotSent } = require("./utils");
const { getAllPublicRoutines, createRoutine, getRoutineById, updateRoutine, destroyRoutine } = require("../db/routines");
const {getRoutineActivitiesByRoutine, addActivityToRoutine } = require("../db/routine_activities");

// const addActivitiesToRoutines = require("../db/routines");

// Returns a list of public routines, includes the activities with them
routinesRouter.get('/', async (req, res, next) => {
    try {
        const routines = await getAllPublicRoutines();
        res.send(routines);
    }
    catch (error) {
        next(error);
    }
}
);


// Creates a new routine, with the creatorId matching the logged in user
routinesRouter.post("/", requireUser, async (req, res, next) => {
    const routine = req.body;
  
    try {
      if (req.user) {
        const post = await createRoutine({ creatorId: req.user.id,  ...routine, });
        res.send(post);
      }
    } catch (error) {
      throw error;
    }
  });

// Updates a routine, notably changing public/private, the name, or the goal
routinesRouter.patch("/:routineId", requireUser, async (req, res, next) => {
    try {
      const { routineId } = req.params;
      const { isPublic, name, goal } = req.body;
      const routine = await updateRoutine({
        id: routineId,
        isPublic,
        name,
        goal,
      });
      res.send(routine);
    } catch (error) {
      next(error);
    }
  });

// DELETE /api/routines/:routineId
routinesRouter.delete("/:routineId", requireUser, async (req, res, next) => {
    try {
        const { routineId } = req.params;
        const routine = await destroyRoutine(routineId);
        res.send(routine);
    }
    catch (error) {
        next(error);
    }
}
);

// POST /api/routines/:routineId/activities
routinesRouter.post("/:routineId/activities", async (req, res, next) => {
  const { routineId } = req.params;
  const { activityId, count, duration } = req.body;

  try {
    const routineActivities = await getRoutineActivitiesByRoutine({
      id: routineId,
    });
    const oldRoutineActivities =
      routineActivities &&
      routineActivities.filter(
        (routineActivity) => routineActivity.activityId === activityId
      );
    if (oldRoutineActivities && oldRoutineActivities.length) {
      next({
        message: "This routine activity already exists.",
      });
    } else {
      const newActivity = await addActivityToRoutine({
        routineId,
        activityId,
        count,
        duration,
      });
      res.send(newActivity);
    }
  } catch (error) {
    next(error);
  }
});

routinesRouter.post("/:routineId/activities", requiredNotSent({requiredParams: ['activityId', 'count', 'duration']}), async(request, response, next) => {
    
  try {
      const {activityId, count, duration} = request.body;
      const {routineId} = request.params;

      const foundRoutineActivities = await getRoutineActivitiesByRoutine({id: routineId});
      const existingRoutineActivities = foundRoutineActivities && foundRoutineActivities.filter(routineActivity => routineActivity.activityId === activityId);

      if(existingRoutineActivities && existingRoutineActivities.length) {
        next({
          name: 'RoutineActivityExistsError',
          message: "A routine_activity by that routineId and activityId combination already exists"
        });

      } else {
        const attachActivityToRoutine = await addActivityToRoutine({ routineId, activityId, count, duration });
        if(attachActivityToRoutine) {
          response.send(attachActivityToRoutine);

        } else {
          next({
            name: 'FailedToCreate',
            message: "There was an error adding activity"
          })
        }
      }
   } catch (error) {
      throw (error);
  }
}
);


module.exports = routinesRouter;
