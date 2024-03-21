document.addEventListener('DOMContentLoaded', (e) => {
  // create variables to hold DOM elements
  const userInput = document.querySelector('#task');
  const addTaskButton = document.querySelector('#task-button');
  const getTasksButton = document.querySelector('#retrieve');
  const taskList = document.querySelector('#task-list');
  const taskElements = document.getElementsByClassName('task');
  const updateTaskContainer = document.querySelector('#update-task');
  const updateTaskContainerElements = document.getElementsByClassName('update');

  // create input field & submit button for updating a task

  const updateInput = document.createElement('input');
  updateInput.setAttribute('class', 'update');
  updateInput.setAttribute('placeholder', 'update your task!');
  updateInput.setAttribute('type', 'text');

  const updateButton = document.createElement('button');
  updateButton.setAttribute('class', 'update');
  updateButton.innerText = 'Update Task';

  // helper fn: create DOM element for task
  const addTaskToDOM = (data) => {
    // create list element for task
    const task = document.createElement('li');
    task.setAttribute('class', 'task');
    task.innerText = data.item;

    // create delete button element
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'remove');
    deleteButton.setAttribute('id', data._id); // attach database _id
    deleteButton.innerText = 'X';
    deleteButton.addEventListener('click', (e) => deleteTask(data._id));

    // create 'edit task' button element
    const editTaskButton = document.createElement('button');
    editTaskButton.setAttribute('class', 'remove');
    editTaskButton.setAttribute('id', data._id); // attach database _id
    editTaskButton.innerText = 'O';

    // on click, populate updateTaskContainer with input field & submit button
    editTaskButton.addEventListener('click', (e) => {
      if (updateTaskContainerElements.length === 2) return;

      updateButton.addEventListener('click', (e) => {
        updateTask(data._id, updateInput.value);
        updateInput.value = '';
      });

      updateTaskContainer.append(updateInput, updateButton);
    });

    task.append(deleteButton, editTaskButton); // append update & delete buttons to list element
    taskList.appendChild(task); // append task to task list
  };

  // retrieve & display tasks on DOM
  const getTasks = async () => {
    try {
      const res = await fetch('/api/items');
      const data = await res.json();

      // ensure that DOM doesn't re-render existing tasks
      taskList.innerHTML = '';

      // if (taskElements.length === data.length) return;

      // iterate through existing tasks and render to DOM
      for (const task of data) {
        addTaskToDOM(task);
      }
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  // add task to task list on DOM
  const addTask = async () => {
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: userInput.value }),
      });
      const data = await res.json();

      addTaskToDOM(data); // add task to task list
      userInput.value = ''; // reset input field
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  // update task in task list on DOM
  const updateTask = async (id, updatedTask) => {
    try {
      await fetch(`/api/items/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: updatedTask }),
      });

      getTasks();
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  // delete task from task list on DOM
  const deleteTask = async (id) => {
    try {
      await fetch(`/api/items/${id}`, { method: 'DELETE' });

      // remove deleted task from DOM
      const button = document.getElementById(id);
      const deletedTask = button.parentNode;
      deletedTask.remove();
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  // add event listeners to buttons
  getTasksButton.addEventListener('click', getTasks);
  addTaskButton.addEventListener('click', addTask);
});
