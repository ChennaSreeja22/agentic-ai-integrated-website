const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const message = document.getElementById("message");

// New elements for AI
const goalInput = document.getElementById("goalInput");
const generatePlanBtn = document.getElementById("generatePlanBtn");
const status = document.getElementById("status");

// Function to add a task
function addTask(taskName, priority = "", time = "") {

    if (taskName.trim() === "") {

        message.textContent = "❌ Please enter a task!";
        message.style.color = "red";
        return;

    }

    const li = document.createElement("li");

    const taskText = document.createElement("div");

    taskText.classList.add("task-details");

    taskText.innerHTML = `
        <strong>📋 Task:</strong> ${taskName}<br>
        <strong>🔥 Priority:</strong> ${priority}<br>
        <strong>⏱ Estimated Time:</strong> ${time}
    `;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("edit-btn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");

    // Button container
    const buttonGroup = document.createElement("div");
    buttonGroup.classList.add("button-group");

    buttonGroup.appendChild(editBtn);
    buttonGroup.appendChild(deleteBtn);

    li.appendChild(taskText);
    li.appendChild(buttonGroup);

    taskList.appendChild(li);

    message.textContent = "✅ Task added successfully!";
    message.style.color = "green";

    deleteBtn.addEventListener("click", function () {

        li.remove();

        message.textContent = "🗑 Task deleted!";
        message.style.color = "red";

    });

    editBtn.addEventListener("click", function () {

        const updatedTask = prompt("Edit your task:", taskText.textContent);

        if (updatedTask === null) {
            return;
        }

        if (updatedTask.trim() === "") {

            message.textContent = "❌ Task cannot be empty!";
            message.style.color = "red";
            return;

        }

        taskText.innerHTML = `
            <strong>📋 Task:</strong> ${updatedTask.trim()}<br>
            <strong>🔥 Priority:</strong> ${priority}<br>
            <strong>⏱ Estimated Time:</strong> ${time}
        `;

        message.textContent = "✏️ Task updated successfully!";
        message.style.color = "green";

    });

}

// Existing button
addTaskBtn.addEventListener("click", function () {

    
    addTask(taskInput.value, "-", "-");

    taskInput.value = "";

});

generatePlanBtn.addEventListener("click", async function () {

    const goal = goalInput.value.trim();

    if (goal === "") {
        status.textContent = "❌ Please enter a goal.";
        status.style.color = "red";
        return;
    }

    status.innerHTML =
    "🤖 Thinking...<br>Creating your personalized task plan...";
    status.style.color = "blue";

    try {

        const response = await fetch("http://localhost:3000/generate", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                goal: goal
            })

        });

        if (!response.ok) {
            throw new Error("Server Error");
        }

        const data = await response.json();

        // Clear old tasks
        taskList.innerHTML = "";

        // Add AI-generated tasks
        data.tasks.forEach((task, index) => {

            addTask(
                `Step ${index + 1}: ${task.task_name}`,
                task.priority,
                task.estimated_time
            ); 

        });

        // Clear the goal input after success
        goalInput.value = "";

        status.textContent = "✅ Your personalized task plan is ready!";
        status.style.color = "green";

    }

    catch (error) {

        console.error(error);
    
        status.textContent = "❌ Failed to fetch AI plan.";
        status.style.color = "red";
    
    }

});