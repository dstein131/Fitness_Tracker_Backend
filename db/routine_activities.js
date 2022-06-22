const client = require('./client')

async function getRoutineActivityById(id){

  const result = await client.query(`
    SELECT * FROM routine_activities
    WHERE id = $1;
  `, [id]);

  return result.rows[0];
  
}

async function addActivityToRoutine({
  routineId,
  activityId,
  count,
  duration,
}) {

  const result = await client.query(`
    INSERT INTO routine_activities (routineid, activityid, count, duration)
    VALUES ($1, $2, $3, $4)
    RETURNING id, routineid, activityid, count, duration;
  `, [routineId, activityId, count, duration]);

  return result.rows[0];
    
}

async function getRoutineActivitiesByRoutine({id}) {

  const result = await client.query(`
    SELECT * FROM routine_activities
    WHERE routineid = $1;
  `, [id]);

  return result.rows;

}

async function updateRoutineActivity ({id, ...fields}) {

  const result = await client.query(`
    UPDATE routine_activities
    SET count = $1, duration = $2
    WHERE id = $3
    RETURNING id, routineid, activityid, count, duration;
  `, [fields.count, fields.duration, id]);

  return result.rows[0];

}


async function destroyRoutineActivity(id) {

  const result = await client.query(`
    DELETE FROM routine_activities
    WHERE id = $1
    RETURNING id, routineid, activityid, count, duration;
  `, [id]);

  return result.rows[0];

}

async function canEditRoutineActivity(routineActivityId, userId) {
  
    const result = await client.query(`
      SELECT * FROM routines
      WHERE id = (SELECT routineid FROM routine_activities
      WHERE id = $1)
      AND creatorid = $2;
    `, [routineActivityId, userId]);

    return result.rows[0];
}

module.exports = {
  getRoutineActivityById,
  addActivityToRoutine,
  getRoutineActivitiesByRoutine,
  updateRoutineActivity,
  destroyRoutineActivity,
  canEditRoutineActivity,
};


