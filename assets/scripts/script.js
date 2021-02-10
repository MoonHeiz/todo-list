document.addEventListener('DOMContentLoaded', refreshTasks);

const taskArray = JSON.parse(localStorage.getItem('tasks')) || [];
const submitButton = document.querySelector('.header__submit');
const todoList = document.querySelector('.todo-list');

function createTask() {
  const taskName = document.querySelector('.header__input-task');

  if (!taskName.value) return;

  const task = {
    name: taskName.value,
    status: false,
  };

  taskArray.push(task);
  localStorage.setItem('tasks', JSON.stringify(taskArray));

  taskName.value = '';
  refreshTasks(task);
}

function refreshTasks() {
  todoList.innerHTML = taskArray
    .map((task, i) => {
      return `
      <li class="todo-list__task ${
        task.status ? 'todo-list__task-completed' : ''
      }" data-item="${i}">
      <span class="todo-list__status"></span>
      <p class="todo-list__name">${task.name}</p>
      <a class="todo-remove">x</a>
    </li>
    `;
    })
    .join('');
}

function taskHandler(e) {
  if (e.target.matches('a')) {
    const index = e.target.parentNode.dataset.item;
    taskArray.splice(index, 1);
    localStorage.setItem('tasks', JSON.stringify(taskArray));
    refreshTasks();
  } else {
    const element = e.target.closest('li');

    if (!element) return;

    const index = element.dataset.item;
    taskArray[index].status = !taskArray[index].status;
    localStorage.setItem('tasks', JSON.stringify(taskArray));
    refreshTasks();
  }
}

todoList.addEventListener('click', taskHandler);
submitButton.addEventListener('click', createTask);

window.addEventListener('keydown', e => {
  if (e.keyCode === 13) createTask();
});
