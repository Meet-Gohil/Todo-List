
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const filterTasks = document.getElementById('filterTasks');
const toggleDarkMode = document.getElementById('toggleDarkMode');
const fab = document.getElementById('fab');


addTaskBtn.addEventListener('click', addTask);
taskList.addEventListener('click', handleTaskActions);
filterTasks.addEventListener('change', filterTasksByStatus);
toggleDarkMode.addEventListener('click', toggleDarkModeHandler);
fab.addEventListener('click', () => taskInput.focus());

function addTask() {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const li = document.createElement('li');
    li.innerHTML = `
        <input type="checkbox" class="taskCheckbox">
        <span>${taskText}</span>
        <button class="delete">Delete</button>
    `;
    taskList.appendChild(li);
    taskInput.value = '';
}


function handleTaskActions(e) {
    if (e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    } else if (e.target.classList.contains('taskCheckbox')) {
        e.target.parentElement.classList.toggle('completed');
    }
}


function filterTasksByStatus(e) {
    const status = e.target.value;
    const tasks = Array.from(taskList.children);
    tasks.forEach(task => {
        const isCompleted = task.classList.contains('completed');
        if (status === 'all') {
            task.style.display = '';
        } else if (status === 'completed' && isCompleted) {
            task.style.display = '';
        } else if (status === 'pending' && !isCompleted) {
            task.style.display = '';
        } else {
            task.style.display = 'none';
        }
    });
}


function toggleDarkModeHandler() {
    document.body.classList.toggle('dark-mode');
}

taskList.addEventListener('touchstart', handleSwipeStart);
taskList.addEventListener('touchend', handleSwipeEnd);

let touchStartX = 0;
let currentTouch = null;

function handleSwipeStart(e) {
    touchStartX = e.changedTouches[0].screenX;
    currentTouch = e.target.closest('li');
}

function handleSwipeEnd(e) {
    const touchEndX = e.changedTouches[0].screenX;
    const threshold = 50; 
    if (currentTouch && touchStartX - touchEndX > threshold) {
        currentTouch.querySelector('.delete').click(); 
    }
}

fab.addEventListener('click', () => {
    taskInput.focus();
});
