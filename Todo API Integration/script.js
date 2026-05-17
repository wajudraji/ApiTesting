const cardsContainer = document.getElementById('cardsContainer');
const loadingElement = document.getElementById('loading');
const errorElement = document.getElementById('error');

async function fetchTodos() {
  try {
    // Show loading, hide others 
    loadingElement.style.display = 'block';
    errorElement.textContent = ''; // clear any previous error

    const response = await fetch('https://jsonplaceholder.typicode.com/todos');

    if (!response.ok) {
      throw new Error('Failed the fetch tasks from the server.');
    }

    const data = await response.json();

    // Get only the first 20 items
    const firstTwenty = data.slice(0, 20);

    // Hide loading and render cards
    loadingElement.style.display = 'none';
    displayCards(firstTwenty);

  } catch (err) {
    loadingElement.style.dispaly = 'none';
    errorElement.textContent = "Error: " + err.message;
  }
}

function displayCards(todos) {
  todos.forEach(todo => {
    // Create the card element
    const card = document.createElement('div');
    card.classList.add('card');

    // Dynamic status badge text and class
    const statusText = todo.completed ? 'Completed' : 'Pending';
    const statusClass = todo.completed ? 'status-Completed' : 'status-pending';

  // Fill the card with HTML
  card.innerHTML = `
            <div class="card-header">
                <span class="user-id">User ID: ${todo.userId}</span>
                <span class="todo-id">#${todo.id}</span>
            </div>
            <h3 class="todo-title">${todo.title}</h3>
            <div class="card-footer">
                <span class="badge ${statusClass}">${statusText}</span>
            </div>
        `;

        cardsContainer.appendChild(card);
    });
}

fetchTodos();