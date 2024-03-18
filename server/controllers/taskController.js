const Task = require('../models/TaskModel');

const taskController = {};

// get tasks
taskController.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({});
    res.locals.tasks = tasks; // store tasks in res.locals

    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught middleware error at taskController.getTasks',
      message: { error: 'Could not retrieve tasks from database.' },
    });
  }
};

// post task
taskController.postTask = async (req, res, next) => {
  try {
    const { task } = req.body;
    if (!task) return; // cancel if no task provided
    await Task.create({ item: task });

    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught middleware error at taskController.postTask',
      message: { error: 'Could not add task to database.' },
    });
  }
};

// delete task
taskController.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;
    await Task.findByIdAndDelete(id);

    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught middleware error at taskController.deleteTask',
      message: { error: 'Could not add task to database.' },
    });
  }
};

module.exports = taskController;
