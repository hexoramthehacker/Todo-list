const input = document.getElementById('todo-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const taskCount = document.getElementById('task-count');
const greeting = document.getElementById('greeting');

let todos = JSON.parse(localStorage.getItem('lovelyTodos')) || [];

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
    updateGreeting();
    render();
});

function updateGreeting() {
    const hours = new Date().getHours();
    const greetings = hours < 12 ? 'Good Morning' : hours < 18 ? 'Good Afternoon' : 'Good Evening';
    greeting.textContent = `${greetings}, Star`;
}

// --- Actions ---
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
        completed: false
    };

    todos.unshift(newTodo);
    save();
    render();
    input.value = '';
    
    // Add subtle visual feedback to input
    input.parentElement.animate([
        { transform: 'scale(1)' },
        { transform: 'scale(1.02)' },
        { transform: 'scale(1)' }
    ], 200);
}

function toggleComplete(id, event) {
    todos = todos.map(t => {
        if (t.id === id) {
            const isNowComplete = !t.completed;
            if (isNowComplete && event) {
                // Trigger confetti at the click location
                triggerConfetti(event.clientX, event.clientY);
            }
            return { ...t, completed: isNowComplete };
        }
        return t;
    });
    
    // Slight delay to allow animation to play before re-sorting (optional)
    setTimeout(() => {
        save();
        render();
    }, 300);
}

function deleteTodo(id, btnElement) {
    // Animate out
    const li = btnElement.closest('li');
    li.style.animation = 'fadeOut 0.3s forwards';
    
    setTimeout(() => {
        todos = todos.filter(t => t.id !== id);
        save();
        render();
    }, 300);
}

function save() {
    localStorage.setItem('lovelyTodos', JSON.stringify(todos));
}

function render() {
    list.innerHTML = '';
    
    if (todos.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
    }
    
    taskCount.textContent = `${todos.filter(t => !t.completed).length} tasks remaining`;

    todos.forEach(todo => {
        const li = document.createElement('li');
        li.className = todo.completed ? 'completed' : '';
        
        li.innerHTML = `
            <div class="check-circle" onclick="toggleComplete(${todo.id}, event)"></div>
            <span class="task-text">${todo.text}</span>
            <button class="delete-btn" onclick="deleteTodo(${todo.id}, this)">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
        `;
        list.appendChild(li);
    });
}

// --- Homemade Confetti Engine (Vanilla JS) ---
function triggerConfetti(x, y) {
    const colors = ['#ff6b81', '#ff4757', '#2ed573', '#1e90ff', '#ffa502'];
    
    for (let i = 0; i < 30; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        document.body.appendChild(confetti);
        
        // Random Position near click
        const left = x;
        const top = y;
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        confetti.style.left = `${left}px`;
        confetti.style.top = `${top}px`;
        confetti.style.backgroundColor = color;
        
        // Random movement
        const xMove = (Math.random() - 0.5) * 200; // -100 to 100
        const yMove = (Math.random() - 1) * 200;   // -200 to 0 (upward)
        
        const animation = confetti.animate([
            { transform: `translate(0,0) scale(1)`, opacity: 1 },
            { transform: `translate(${xMove}px, ${yMove}px) scale(0)`, opacity: 0 }
        ], {
            duration: 800 + Math.random() * 400,
            easing: 'cubic-bezier(0.25, 1, 0.5, 1)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}