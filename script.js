document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const todoList = document.getElementById('todoList');
    const totalTasks = document.getElementById('totalTasks');
    const completedTasks = document.getElementById('completedTasks');

    let todos = [];

    addBtn.addEventListener('click', addTodo);
    todoInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTodo();
    });

    function updateStats() {
        totalTasks.textContent = todos.length;
        completedTasks.textContent = todos.filter(todo => todo.completed).length;
    }

    function addTodo() {
        const text = todoInput.value.trim();
        if (text === '') return;

        const todo = {
            id: Date.now(),
            text: text,
            completed: false
        };

        todos.push(todo);
        renderTodos();
        todoInput.value = '';
        updateStats();
    }

    function renderTodos() {
        todoList.innerHTML = '';
        todos.forEach(todo => {
            const li = document.createElement('li');
            li.className = 'todo-item';
            
            li.innerHTML = `
                <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
                <div class="actions">
                    <button class="complete-btn">${todo.completed ? 'Undo' : 'Complete'}</button>
                    <button class="delete-btn">Delete</button>
                </div>
            `;

            li.querySelector('.complete-btn').addEventListener('click', () => toggleComplete(todo.id));
            li.querySelector('.delete-btn').addEventListener('click', () => deleteTodo(todo.id));
            
            todoList.appendChild(li);
        });
    }

    function toggleComplete(id) {
        todos = todos.map(todo => 
            todo.id === id ? {...todo, completed: !todo.completed} : todo
        );
        renderTodos();
        updateStats();
    }

    function deleteTodo(id) {
        todos = todos.filter(todo => todo.id !== id);
        renderTodos();
        updateStats();
    }
});