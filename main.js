// DOM Elements
const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const progressBar = document.getElementById('progress-bar');
const progressPercent = document.getElementById('progress-percent');
const greetingEl = document.getElementById('greeting');
const dateEl = document.getElementById('date');

// State
let todos = JSON.parse(localStorage.getItem('premiumTodos')) || [];

// Init
document.addEventListener('DOMContentLoaded', () => {
    setGreeting();
    renderApp();
});

// 1. Dynamic Greeting & Date
function setGreeting() {
    const hour = new Date().getHours();
    let greeting = 'Good Evening';
    if (hour < 12) greeting = 'Good Morning';
    else if (hour < 18) greeting = 'Good Afternoon';
    
    greetingEl.textContent = `${greeting}, Boss`;
    
    const options = { weekday: 'long', month: 'short', day: 'numeric' };
    dateEl.textContent = new Date().toLocaleDateString('en-US', options);
}

// 2. Add Todo
addBtn.addEventListener('click', addTodo);
input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTodo();
});

function addTodo() {
    const text = input.value.trim();
    if (!text) return;

    const newTodo = {
        id: Date.now(),
        text: text,
        completed: false,
        isEditing: false
    };

    todos.unshift(newTodo); // Add to top
    saveAndRender();
    input.value = '';
}

// 3. Render Loop
function renderApp() {
    list.innerHTML = '';
    
    // Toggle Empty State
    if (todos.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }

    // Update Progress Bar
    updateProgress();

    // Render Items
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        
        if (todo.isEditing) {
            li.innerHTML = `
                <input type="text" class="edit-input" value="${todo.text}" id="edit-${todo.id}">
                <div class="actions">
                    <button class="icon-btn" onclick="saveEdit(${todo.id})">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    </button>
                </div>
            `;
            // Auto focus the edit input
            setTimeout(() => {
                 const editInput = document.getElementById(`edit-${todo.id}`);
                 if(editInput) editInput.focus(); 
            }, 10);
        } else {
            li.innerHTML = `
                <div class="task-left" onclick="toggleComplete(${todo.id})">
                    <div class="custom-checkbox"></div>
                    <span class="task-content">${todo.text}</span>
                </div>
                <div class="actions">
                    <button class="icon-btn" onclick="enableEdit(${todo.id})">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    </button>
                    <button class="icon-btn delete-btn" onclick="deleteTodo(${todo.id})">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                    </button>
                </div>
            `;
        }
        list.appendChild(li);
    });
}

// 4. Update Progress Bar
function updateProgress() {
    const total = todos.length;
    const completed = todos.filter(t => t.completed).length;
    const percent = total === 0 ? 0 : Math.round((completed / total) * 100);

    progressBar.style.width = `${percent}%`;
    progressPercent.textContent = `${percent}%`;
}

// 5. Actions
window.toggleComplete = function(id) {
    todos = todos.map(t => t.id === id ? {...t, completed: !t.completed} : t);
    saveAndRender();
};

window.deleteTodo = function(id) {
    if(confirm('Delete this task?')) {
        todos = todos.filter(t => t.id !== id);
        saveAndRender();
    }
};

window.enableEdit = function(id) {
    todos = todos.map(t => t.id === id ? {...t, isEditing: true} : {...t, isEditing: false});
    renderApp();
};

window.saveEdit = function(id) {
    const inputEl = document.getElementById(`edit-${id}`);
    const newText = inputEl.value.trim();
    
    if (newText) {
        todos = todos.map(t => t.id === id ? {...t, text: newText, isEditing: false} : t);
        saveAndRender();
    }
};

// Listen for "Enter" key on edit inputs
document.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && e.target.classList.contains('edit-input')) {
        const id = parseInt(e.target.id.split('-')[1]);
        saveEdit(id);
    }
});

function saveAndRender() {
    localStorage.setItem('premiumTodos', JSON.stringify(todos));
    renderApp();
}
