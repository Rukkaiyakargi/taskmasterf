// Get elements
const taskList = document.getElementById('tasks');
const taskForm = document.getElementById('task-form');
const createTaskBtn = document.getElementById('create-task-btn');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

// Add event listeners
createTaskBtn.addEventListener('click', createTask);
loginBtn.addEventListener('click', login);
registerBtn.addEventListener('click', register);

// Functions
async function createTask(e) {
  e.preventDefault();
  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const deadline = document.getElementById('deadline').value;
  const priority = document.getElementById('priority').value;

  const task = {
    title,
    description,
    deadline,
    priority
  };
  try {
    const response = await fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    const data = await response.json();
    console.log(data);
    taskList.innerHTML += `
      <li>
        <h3>${data.title}</h3>
        <p>${data.description}</p>
        <p>Deadline: ${data.deadline}</p>
        <p>Priority: ${data.priority}</p>
      </li>
    `;
  } catch (error) {
    console.error(error);
  }
}

async function login(e) {
  e.preventDefault();
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    console.log(data);
    localStorage.setItem('token', data.token);
  } catch (error) {
    console.error(error);
  }
}

async function register(e) {
  e.preventDefault();
  const username = document.getElementById('username').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  try {
    const response = await fetch('/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, email, password })
    });

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}

// Fetch tasks on page load
async function fetchTasks() {
  try {
    const response = await fetch('/tasks');
    const data = await response.json();
    console.log(data);

    data.forEach(task => {
      taskList.innerHTML += `
        <li>
          <h3>${task.title}</h3>
          <p>${task.description}</p>
          <p>Deadline: ${task.deadline}</p>
          <p>Priority: ${task.priority}</p>
        </li>
      `;
    });
  } catch (error) {
    console.error(error);
  }
}

fetchTasks();
// Add event listener for delete task button
taskList.addEventListener('click', deleteTask);

async function deleteTask(e) {
  if (e.target.classList.contains('delete-btn')) {
    const taskId = e.target.dataset.taskId;

    try {
      const response = await fetch(`/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      console.log(data);

      // Remove task from list
      const taskElement = document.querySelector(`#task-${taskId}`);
      taskElement.remove();
    } catch (error) {
      console.error(error);
    }
  }
}
// Adding event listener for update task button
taskList.addEventListener('click', updateTask);

async function updateTask(e) {
  if (e.target.classList.contains('update-btn')) {
    const taskId = e.target.dataset.taskId;
    const title = document.querySelector(`#task-${taskId} .title`).value;
    const description = document.querySelector(`#task-${taskId} .description`).value;
    const deadline = document.querySelector(`#task-${taskId} .deadline`).value;
    const priority = document.querySelector(`#task-${taskId} .priority`).value;

    try {
      const response = await fetch(`/tasks/${taskId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title, description, deadline, priority })
      });

      const data = await response.json();
      console.log(data);

      // Update task in list
      const taskElement = document.querySelector(`#task-${taskId}`);
      taskElement.innerHTML = `
        <h3>${data.title}</h3>
        <p>${data.description}</p>
        <p>Deadline: ${data.deadline}</p>
        <p>Priority: ${data.priority}</p>
      `;
    } catch (error) {
      console.error(error);
    }
  }
}
// Adding validation for user input
function validateInput(input) {
    if (input.trim() === '') {
      return 'Field cannot be empty';
    } else if (input.length < 3) {
      return 'Field must be at least 3 characters long';
    } else {
      return null;
    }
  }
  
  // Update createTask function
  async function createTask(e) {
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const deadline = document.getElementById('deadline').value;
    const priority = document.getElementById('priority').value;
  
    const titleError = validateInput(title);
    const descriptionError = validateInput(description);
  
    if (titleError || descriptionError) {
      console.error(titleError || descriptionError);
      return;
    }
  }
  try {
    const data = await fetchRequest('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });
    console.log(data);
  } catch (error) {
    console.error(error);
  }
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('/tasks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(task)
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
// Adding error handling for fetch requests
async function fetchRequest(url, options) {
    try {
      const response = await fetch(url, options);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
  // Add authentication check for tasks
async function fetchTasks() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/tasks', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  