const todoForm = document.getElementById("todo-form");
const todoInput = document.getElementById("todo-input");
const todoList = document.getElementById("todo-list");

let todos = [];

function renderTodoList() {
  todoList.innerHTML = "";
  todos.forEach((todo, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <input type="checkbox" id="todo-${index}" ${
      todo.completed ? "checked" : ""
    }>
      <span>${todo.text}</span>
      <button type="button" data-index="${index}">Delete</button>
    `;
    todoList.appendChild(li);
    const checkbox = li.querySelector(`#todo-${index}`);
    checkbox.addEventListener("change", () => {
      todos[index].completed = checkbox.checked;
      saveTodos();
    });
    const deleteButton = li.querySelector("button");
    deleteButton.addEventListener("click", () => {
      todos.splice(index, 1);
      saveTodos();
      renderTodoList();
    });
  });
}

function saveTodos() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    renderTodoList();
  }
}

todoForm;
