const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");

addTaskBtn.addEventListener("click", function () {

    const task = taskInput.value.trim();

    // Validate input
    if (task === "") {
        message.textContent = "❌ Please enter a task!";
        message.style.color = "red";
        return;
    }

    // Create list item
    const li = document.createElement("li");

    // Task text
    const taskText = document.createElement("span");
    taskText.textContent = task;

    // Edit button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    // Button container
    const buttonGroup = document.createElement("div");
    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(deleteBtn);

    // Add task text and buttons to list item
    li.appendChild(taskText);
    li.appendChild(buttonGroup);

    // Add list item to task list
    taskList.appendChild(li);

    // Clear input
    taskInput.value = "";

    // Success message
    message.textContent = "✅ Task added successfully!";
    message.style.color = "green";

    // Delete task
    deleteBtn.addEventListener("click", function () {
        li.remove();

        message.textContent = "🗑 Task deleted!";
        message.style.color = "red";
    });

    // Edit task
    editBtn.addEventListener("click", function () {

        const updatedTask = prompt("Edit your task:", taskText.textContent);

        // User clicked Cancel
        if (updatedTask === null) {
            return;
        }

        // Prevent empty task
        if (updatedTask.trim() === "") {
            message.textContent = "❌ Task cannot be empty!";
            message.style.color = "red";
            return;
        }

        // Update task
        taskText.textContent = updatedTask.trim();

        message.textContent = "✏️ Task updated successfully!";
        message.style.color = "green";
    });

});