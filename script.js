// Task Manager Application

const taskList = document.getElementById('task-list');
const addTaskButton = document.getElementById('add-task-button');
const taskModal = document.getElementById('task-modal');
const taskForm = document.getElementById('task-form');
const closeButton = document.getElementsByClassName('close-button')[0];

let tasks = [];

addTaskButton.addEventListener('click', openModal);

closeButton.addEventListener('click', closeModal);

taskForm.addEventListener('submit', function(event)
{
  event.preventDefault();

  const taskTitle = document.getElementById('task-title').value;
  const taskDescription = document.getElementById('task-description').value;

  if (taskTitle.trim() !== '') {
    const task = {
      id: generateTaskId(),
      title: taskTitle,
      description: taskDescription
    };

    tasks.push(task);

    renderTask(task);

    closeModal();
    resetForm();
  }
});

function generateTaskId() {
  const timestamp = Date.now();
  const randomNum = Math.floor(Math.random() * 1000);
  return `${timestamp}-${randomNum}`;
}

function renderTask(task) {
  const taskElement = document.createElement('div');
  taskElement.classList.add('task');
  taskElement.innerHTML = `
    <h3>${task.title}</h3>
    <p>${task.description}</p>
    <button class="delete-button" data-id="${task.id}">Delete</button>
  `;

  const deleteButton = taskElement.getElementsByClassName('delete-button')[0];
  deleteButton.addEventListener('click', function() {
    deleteTask(task.id);
  });

  taskList.appendChild(taskElement);
}

function deleteTask(taskId) {
  tasks = tasks.filter(task => task.id !== taskId);
  const taskElement = document.querySelector(`[data-id="${taskId}"]`);
  taskElement.parentNode.remove();
}

function openModal() {
  taskModal.style.display = 'block';
}

function closeModal() {
  taskModal.style.display = 'none';
}

function resetForm() {
  taskForm.reset();
}

function init() {
  
  tasks.forEach(task => {
    renderTask(task);
  });
}

init();
