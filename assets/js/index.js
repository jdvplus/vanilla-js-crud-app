document.addEventListener('DOMContentLoaded', (e) => {
  // create variables to hold DOM elements
  const userInput = document.querySelector('input');
  const addTaskButton = document.querySelector('#task-button');
  const getTasksButton = document.querySelector('#retrieve');
  const taskList = document.querySelector('#task-list');

  // helper fn: create DOM element for task
  const addTaskToDOM = (data) => {
    // create list element for task
    const task = document.createElement('li');
    task.setAttribute('class', 'task');
    task.innerText = data.item;

    // create delete button element
    const button = document.createElement('button');
    button.setAttribute('class', 'remove');
    button.setAttribute('id', data._id); // attach database _id to delete button
    button.innerText = 'X';
    button.addEventListener('click', (e) => deleteTask(data._id));

    task.appendChild(button); // append button to list element
    taskList.appendChild(task); // append task to task list
  };

  // retrieve & display tasks on DOM
  const getTasks = async () => {
    try {
      const res = await fetch('/api/items');
      const data = await res.json();

      // ensure that DOM doesn't re-render existing tasks
      taskList.innerHTML = '';

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
