document.addEventListener('DOMContentLoaded', (e) => {
  const getTasksButton = document.querySelector('#retrieve');
  const addTaskButton = document.querySelector('#task-button');
  const userInput = document.querySelector('input');

  const taskList = document.querySelector('#task-list');
  const taskElements = document.getElementsByClassName('task');

  const getTasks = async () => {
    try {
      const res = await fetch('/api/items');
      const data = await res.json();
      console.log('data in getTasks', data);

      // if (taskElements.length === data.length) {
      //   console.log('hitting this');
      //   return;
      // }

      // display tasks as list
      for (let i = 0; i < data.length; i += 1) {
        // create list element for task
        const task = document.createElement('li');
        task.setAttribute('class', 'task');
        task.innerHTML = `${data[i].item} <button class="remove">X</button>`;
        taskList.appendChild(task);
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

      userInput.value = '';
    } catch (error) {
      console.error(error);
      throw new Error(error);
    }
  };

  getTasksButton.addEventListener('click', getTasks);
  addTaskButton.addEventListener('click', addTask);
});
