const taskInput = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');
const clearBtn = document.getElementById('clear-btn');

// Load tasks from local storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Display tasks
function displayTasks() {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.textContent = task.text;
    li.className = task.completed ? 'task completed' : 'task';
    li.addEventListener('click', () => toggleTask(index));
    taskList.appendChild(li);
  });
}

// Add a new task
function addTask() {
  const text = taskInput.value.trim();
  if (text !== '') {
    tasks.push({ text: text, completed: false });
    displayTasks();
    taskInput.value = '';
    saveTasks();
  }
}

// Toggle task completion
function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  displayTasks();
  saveTasks();
}

// Clear completed tasks
function clearCompletedTasks() {
  tasks = tasks.filter(task => !task.completed);
  displayTasks();
  saveTasks();
}

// Save tasks to local storage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Event listeners
addBtn.addEventListener('click', addTask);
clearBtn.addEventListener('click', clearCompletedTasks);

// Initial display
displayTasks();
