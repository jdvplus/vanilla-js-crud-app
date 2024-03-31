const db = require('../models/TaskModel');

const taskController = {};

taskController.getTasks = async (req, res, next) => {
  const queryString = 'SELECT * from task ORDER BY _id ASC';

  try {
    const data = await db.query(queryString);
    res.locals.tasks = data.rows;

    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught middleware error at taskController.getTasks',
      message: { error: 'Could not retrieve tasks from database.' },
    });
  }
};

taskController.postTask = async (req, res, next) => {
  const { task } = req.body;
  if (!task) return;

  const queryString = 'INSERT INTO task (item) VALUES ($1)';

  try {
    const data = await db.query(queryString, [task]);
    res.locals.addedTask = data.rows[0];

    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught middleware error at taskController.postTask',
      message: { error: 'Could not add task to database.' },
    });
  }
};

taskController.updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { task } = req.body;

  const updateQueryString = 'UPDATE task SET item = ($2) WHERE _id = ($1)';

  try {
    await db.query(updateQueryString, [id, task]);

    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught middleware error at taskController.updateTask',
      message: { error: 'Could not update task in database.' },
    });
  }
};

taskController.deleteTask = async (req, res, next) => {
  const { id } = req.params;

  const queryString = 'DELETE FROM task WHERE _id = ($1)';

  try {
    await db.query(queryString, [id]);

    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught middleware error at taskController.deleteTask',
      message: { error: 'Could not delete task from database.' },
    });
  }
};

module.exports = taskController;
