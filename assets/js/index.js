document.addEventListener('DOMContentLoaded', (e) => {
  const userInput = document.querySelector('input');
  const addTaskButton = document.querySelector('#task-button');
  const getTasksButton = document.querySelector('#retrieve');

  const taskList = document.querySelector('#task-list');
  const taskElements = document.getElementsByClassName('task');
  const deleteButtonsArray = document.getElementsByClassName('remove');

  const getTasks = async () => {
    try {
      const res = await fetch('/api/items');
      let data = await res.json();
      console.log('data in getTasks:', data);

      // ensure that only new and/or existing tasks are shown
      if (taskElements.length) {
        if (data.length >= taskElements.length) {
          data = data.slice(taskElements.length);
        } else {
          taskList.innerHTML = '';
          getTasks();
        }
      }

      // display tasks as list of <li> elements
      for (let i = 0; i < data.length; i += 1) {
        const task = document.createElement('li');
        task.setAttribute('class', 'task');
        task.innerHTML = `${data[i].item} <button class="remove" id="${data[i]._id}">X</button>`;
        taskList.appendChild(task);
      }

      // map database IDs of tasks to delete buttons
      for (const button of deleteButtonsArray) {
        button.addEventListener('click', (e) => {
          deleteTask(e.target.id);
        });
      }

      return;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  const addTask = async () => {
    try {
      const res = await fetch('/api/items', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: userInput.value }),
      });
      const data = await res.json();
      console.log('addTask confirmation:', data);

      userInput.value = '';
      getTasks();

      return;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await fetch(`/api/items/${id}`, { method: 'DELETE' });
      const data = await res.json();
      console.log('deleteTask confirmation:', data);

      getTasks();

      return;
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  getTasksButton.addEventListener('click', getTasks);
  addTaskButton.addEventListener('click', addTask);
});
