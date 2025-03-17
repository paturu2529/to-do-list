document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const prioritySelect = document.getElementById('prioritySelect');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const totalTasksSpan = document.getElementById('totalTasks');
    const completedTasksSpan = document.getElementById('completedTasks');

    let tasks = [];

    function updateTaskStats() {
        const completedTasks = tasks.filter(task => task.completed).length;
        totalTasksSpan.textContent = `Total Tasks: ${tasks.length}`;
        completedTasksSpan.textContent = `Completed: ${completedTasks}`;
    }

    function addTask() {
        const taskText = taskInput.value.trim();
        if (taskText === '') return;

        const task = {
            id: Date.now(),
            text: taskText,
            priority: prioritySelect.value,
            completed: false
        };

        tasks.push(task);

        const li = document.createElement('li');
        li.className = `priority-${task.priority}`;
        li.innerHTML = `
            <input type="checkbox" class="task-checkbox">
            <span class="task-text">${taskText}</span>
            <span class="priority-badge">${task.priority}</span>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;

        const checkbox = li.querySelector('.task-checkbox');
        checkbox.addEventListener('change', () => {
            task.completed = checkbox.checked;
            li.classList.toggle('completed', checkbox.checked);
            updateTaskStats();
        });

        const deleteBtn = li.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            tasks = tasks.filter(t => t.id !== task.id);
            li.remove();
            updateTaskStats();
        });

        taskList.appendChild(li);
        taskInput.value = '';
        updateTaskStats();
    }

    addButton.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Filter functionality
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filter = button.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const items = taskList.querySelectorAll('li');
            items.forEach(item => {
                const checkbox = item.querySelector('.task-checkbox');
                if (filter === 'all') {
                    item.style.display = '';
                } else if (filter === 'active') {
                    item.style.display = !checkbox.checked ? '' : 'none';
                } else if (filter === 'completed') {
                    item.style.display = checkbox.checked ? '' : 'none';
                }
            });
        });
    });
}); 