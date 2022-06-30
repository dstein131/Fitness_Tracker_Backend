const express = require('express');
const routineActivitiesRouter = express.Router();
const { requireUser, requiredNotSent } = require("./utils");
const { getRoutineActivityById, updateRoutineActivity, destroyRoutineActivity, canEditRoutineActivity } = require("../db");
const { getRoutineById } = require("../db/routines");

// this has ** the logged in user should be the owner of the modified object
routineActivitiesRouter.patch('/:routineActivityId', requireUser, requiredNotSent({requiredParams: ['count', 'duration'], atLeastOne: true}), async (request, response, next) => {
    try {
      const {count, duration} = request.body;
      const {routineActivityId} = request.params;
      
      const getRoutineActivity = await getRoutineActivityById(routineActivityId);
      if(!getRoutineActivity) {
        next({
          name: 'NotFound',
          message: `No routine_activity found by this ID ${routineActivityId}`
        })
      } else {
        if(!await canEditRoutineActivity(routineActivityId, request.user.id)) {
            next({
              name: "UnauthorizedUser", 
              message: "You cannot edit this routine_activity which is not yours"
            });
        } else {
          const updatedRoutineActivity = await updateRoutineActivity({id: routineActivityId, count, duration})
          response.send(updatedRoutineActivity);
        }
      }
    } catch (error) {
      next(error);
    }
  });
  
  
  routineActivitiesRouter.delete('/:routineActivityId', requireUser, async (request, response, next) => {
    try {
        const { routineActivityId } = request.params;
      if(!await canEditRoutineActivity(routineActivityId, request.user.id)) {
        next({
            name: "UnauthorizedUser", 
            message: "You cannot edit this routine_activity which is not yours"
        });
      } else {
        const deletedRoutineActivity = await destroyRoutineActivity(routineActivityId)
        response.send({success: true, ...deletedRoutineActivity});
      }
    } catch (error) {
      next(error);
    }
  }
  );

module.exports = routineActivitiesRouter;
