 const input = document.getElementById('todoInput');
    const addBtn = document.getElementById('addBtn');
    const list = document.getElementById('todoList');

    let todos = JSON.parse(localStorage.getItem('todos')) || [];

    //saving function
    function saveTodos() {
        localStorage.setItem('todos', JSON.stringify(todos));
    }

    //rendering for the ui
    function renderTodos() {
        list.innerHTML = '';

        todos.forEach((todo, index) => {
            const li = document.createElement('li')
            li.className = todo.completed ? 'completed' : '';

            const span = document.createElement('span');
            span.textContent = todo.text;
            span.onclick = () => toggleComplete(index);

            const delBtn = document.createElement('button');
            delBtn.textContent = 'Delete';
            delBtn.onclick = () => deleteTodo(index);

            li.appendChild(span);
            li.appendChild(delBtn);
            list.appendChild(li);
        });
    }

    //adding new todos
    addBtn.onclick = () => {
        const task = input.value.trim();
        if (task) {
            todos.push({ text: task, done: false});
            renderTodos();
            input.value = '';
        }
        saveTodos();
    };

    //marking as completed
    function toggleComplete(index) {
        todos[index].completed = !todos[index].completed;
        renderTodos();
        saveTodos();
    }

    //deleting todos
    function deleteTodo(index) {
        todos.splice(index, 1);
        renderTodos();
        saveTodos();
    }

    //clear all todos
    const clearBtn = document.getElementById("clearAllBtn");

    clearBtn.onclick = () => {
    todos = [];
    saveTodos();
    renderTodos();
    };

    renderTodos();