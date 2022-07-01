const client = require('./client');

const getRoutineActivityById = async (id) => {
    try {
        const { rows: [ra] } = await client.query(`
            SELECT * FROM routine_activities
            WHERE id = $1
        `, [id]);
        return ra;
    } catch (error) {
        throw error;
    }
}

async function addActivityToRoutine({
    routineId,
    activityId,
    count,
    duration,
  }) {
    try {
      const { rows } = await client.query(
        `
      INSERT INTO routine_activities ("routineId", "activityId", count, duration) VALUES ($1,$2,$3,$4) RETURNING *`,
        [routineId, activityId, count, duration]
      );
  
      return rows[0];
    } catch (error) {
      throw error;
    }
  }

const getRoutineActivitiesByRoutine = async ({id}) => {
    try {
        const { rows } = await client.query(`
            SELECT *
            FROM routine_activities
            WHERE "routineId"=$1;
        `, [id]); 
        return rows;
    } catch (error) {
        throw error;
    }
}

const updateRoutineActivity = async ({id, ...fields}) => {

    const fieldKeys = Object.keys(fields);

    if (fieldKeys.length === 0) { 
        return; 
    }

    const setString = fieldKeys.map((fieldName, index) => {
        return `"${fieldName}"=$${index+1}`
    }).join(', ');

    const setValues = Object.values(fields);
    setValues.push(id);

    try {

        const { rows: [ra] } = await client.query(`
            UPDATE routine_activities
            SET ${setString}
            WHERE id = $${setValues.length}
            RETURNING *;
        `, setValues);

        return ra;

    } catch (error) {
        throw error;
    }
}

async function destroyRoutineActivity(id) {
    try {
      const {rows: [routineActivity]} = await client.query(`
          DELETE FROM routine_activities 
          WHERE id = $1
          RETURNING *;
      `, [id]);
      return routineActivity;
    } catch (error) {
      throw error;
    }
  }

  async function canEditRoutineActivity( routineActivityId, userId ) {
    const { rows: [ routineFromRoutineActivity ] } = await client.query(`
        SELECT * FROM routine_activities
        JOIN routines ON routine_activities."routineId" = routines.id
        AND routine_activities.id = $1
      `, [routineActivityId]);
      return routineFromRoutineActivity.creatorId === userId;
}

module.exports = {
    addActivityToRoutine,
    getRoutineActivitiesByRoutine,
    updateRoutineActivity,
    destroyRoutineActivity,
    getRoutineActivityById,
    canEditRoutineActivity
};