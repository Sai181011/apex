const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const filters = document.querySelectorAll('.filters button');

let todos = [];

form.addEventListener('submit', function (e) {
  e.preventDefault();
  const taskText = input.value.trim();
  if (taskText === '') return;

  todos.push({ text: taskText, completed: false });
  input.value = '';
  renderTodos();
});

function renderTodos(filter = 'all') {
  list.innerHTML = '';

  const filtered = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  filtered.forEach((todo, index) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');
    
    const span = document.createElement('span');
    span.textContent = todo.text;

    const actions = document.createElement('div');
    actions.className = 'todo-actions';

    const completeBtn = document.createElement('button');
    completeBtn.innerHTML = todo.completed ? '✅' : '⬜';
    completeBtn.onclick = () => {
      todos[index].completed = !todos[index].completed;
      renderTodos(filter);
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '❌';
    deleteBtn.onclick = () => {
      todos.splice(index, 1);
      renderTodos(filter);
    };

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(span);
    li.appendChild(actions);
    list.appendChild(li);
  });
}

filters.forEach(button => {
  button.addEventListener('click', () => {
    filters.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    renderTodos(button.dataset.filter);
  });
});

// Initial render
renderTodos();
