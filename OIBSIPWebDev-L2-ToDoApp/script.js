document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const pendingList = document.getElementById('pendingList');
    const completedList = document.getElementById('completedList');
    const pendingCount = document.getElementById('pendingCount');
    const completedCount = document.getElementById('completedCount');
    const emptyPending = document.getElementById('emptyPending');
    const emptyCompleted = document.getElementById('emptyCompleted');

    let tasks = JSON.parse(localStorage.getItem('oibsip_tasks')) || [];

    function renderTasks() {
        pendingList.innerHTML = '';
        completedList.innerHTML = '';

        let pendingCountVal = 0;
        let completedCountVal = 0;

        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            if (task.completed) li.classList.add('completed');

            li.innerHTML = `
                <span>${task.text}</span>
                <div class="task-actions">
                    <button class="btn-complete" onclick="toggleTask(${index})">${task.completed ? 'Undo' : 'Complete'}</button>
                    <button class="btn-delete" onclick="deleteTask(${index})">Delete</button>
                </div>
            `;

            if (task.completed) {
                completedList.appendChild(li);
                completedCountVal++;
            } else {
                pendingList.appendChild(li);
                pendingCountVal++;
            }
        });

        pendingCount.textContent = `${pendingCountVal} Pending`;
        completedCount.textContent = `${completedCountVal} Completed`;

        emptyPending.style.display = pendingCountVal === 0 ? 'block' : 'none';
        emptyCompleted.style.display = completedCountVal === 0 ? 'block' : 'none';

        localStorage.setItem('oibsip_tasks', JSON.stringify(tasks));
    }

    addBtn.addEventListener('click', () => {
        const text = taskInput.value.trim();
        if (text === '') return;
        tasks.push({ text: text, completed: false });
        taskInput.value = '';
        renderTasks();
    });

    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addBtn.click();
        }
    });

    window.toggleTask = function(index) {
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
    };

    window.deleteTask = function(index) {
        tasks.splice(index, 1);
        renderTasks();
    };

    renderTasks();
});