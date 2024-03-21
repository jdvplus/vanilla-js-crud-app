const Task = require('../models/TaskModel');

const taskController = {};

// get tasks
taskController.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({}); // retrieve tasks from database
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
  const { task } = req.body; // destructure task from request body
  if (!task) return; // do nothing if no task provided

  try {
    const addedTask = await Task.create({ item: task }); // create task in database
    res.locals.addedTask = addedTask; // store added task in res.locals

    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught middleware error at taskController.postTask',
      message: { error: 'Could not add task to database.' },
    });
  }
};

// update task
taskController.updateTask = async (req, res, next) => {
  const { id } = req.params;
  const { task } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { item: task },
      { new: true }
    );
    console.log('updatedTask', updatedTask);
    res.locals.updatedTask = updatedTask;

    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught middleware error at taskController.updateTask',
      message: { error: 'Could not update task in database.' },
    });
  }
};

// delete task
taskController.deleteTask = async (req, res, next) => {
  const { id } = req.params; // destructure ID from request params

  try {
    await Task.findByIdAndDelete(id); // delete task from database

    return next();
  } catch (error) {
    return next({
      log: 'Express error handler caught middleware error at taskController.deleteTask',
      message: { error: 'Could not delete task from database.' },
    });
  }
};

module.exports = taskController;
