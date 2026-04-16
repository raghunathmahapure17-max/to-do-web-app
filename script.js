let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// 🚀 Start App
function startApp() {
  document.getElementById("homePage").style.display = "none";
  document.getElementById("appPage").style.display = "block";
}

// 💾 Save
function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// ➕ Add Task
function addTask() {
  const text = document.getElementById("taskInput").value;
  const date = document.getElementById("taskDate").value;
  const priority = document.getElementById("priority").value;
  const status = document.getElementById("status").value;
  const imageInput = document.getElementById("taskImage");

  if (!text) return alert("Enter task!");

  const file = imageInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      tasks.push({
        text,
        date,
        priority,
        status,
        completed: false,
        image: e.target.result
      });
      saveTasks();
      displayTasks();
    };
    reader.readAsDataURL(file);
  } else {
    tasks.push({ text, date, priority, status, completed: false, image: null });
    saveTasks();
    displayTasks();
  }

  document.getElementById("taskInput").value = "";
  document.getElementById("taskDate").value = "";
  imageInput.value = "";
}

// 📋 Display
function displayTasks(filtered = tasks) {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  filtered.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add(task.priority);

    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <b>${task.text}</b><br>
      ⏰ ${task.date || "No date"}<br>
      📌 ${task.status}<br>

      ${task.image ? `<img src="${task.image}" class="task-img">` : ""}

      <button onclick="toggleComplete(${index})">✔</button>
      <button onclick="editTask(${index})">✏️</button>
      <button onclick="deleteTask(${index})">❌</button>
    `;

    list.appendChild(li);
  });
}

// ❌ Delete
function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  displayTasks();
}

// ✔ Complete
function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  displayTasks();
}

// ✏ Edit
function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText) {
    tasks[index].text = newText;
    saveTasks();
    displayTasks();
  }
}

// 🔍 Search
function searchTask() {
  const value = document.getElementById("searchInput").value.toLowerCase();
  const filtered = tasks.filter(t => t.text.toLowerCase().includes(value));
  displayTasks(filtered);
}

displayTasks();
