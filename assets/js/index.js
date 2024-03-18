document.addEventListener('DOMContentLoaded', (e) => {
  // create variables to hold DOM elements
  const userInput = document.querySelector('input');
  const addTaskButton = document.querySelector('#task-button');
  const getTasksButton = document.querySelector('#retrieve');

  const taskList = document.querySelector('#task-list');
  const taskElements = document.getElementsByClassName('task');
  const deleteButtonsArray = document.getElementsByClassName('remove');

  // retrieve & display tasks on DOM
  const getTasks = async () => {
    try {
      const res = await fetch('/api/items');
      let data = await res.json();

      // ensure that only new and/or existing tasks are shown
      if (taskElements.length) {
        // if task has been added, use .slice() to only render new tasks
        if (data.length >= taskElements.length)
          data = data.slice(taskElements.length);
        else {
          // if task has been deleted, reset the task list and re-populate data
          taskList.innerHTML = '';
          getTasks();
        }
      }

      // display tasks as list of <li> elements
      for (let i = 0; i < data.length; i += 1) {
        const task = document.createElement('li');
        task.setAttribute('class', 'task');
        task.innerHTML = `${data[i].item} <button class="remove" id="${data[i]._id}">X</button>`; // attach database _id to specific delete button
        taskList.appendChild(task);
      }

      // dynamically add event listeners to delete buttons (linked to database IDs)
      for (const button of deleteButtonsArray) {
        button.addEventListener('click', (e) => deleteTask(e.target.id));
      }

      return;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  // add task to task list on DOM
  const addTask = async () => {
    try {
      await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: userInput.value }),
      });

      userInput.value = ''; // reset input field
      getTasks(); // update rendered tasks after adding task

      return;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  // delete task from task list on DOM
  const deleteTask = async (id) => {
    try {
      await fetch(`/api/items/${id}`, { method: 'DELETE' });

      getTasks(); // update rendered tasks after deleting task

      return;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  // add event listeners to buttons
  getTasksButton.addEventListener('click', getTasks);
  addTaskButton.addEventListener('click', addTask);
});
