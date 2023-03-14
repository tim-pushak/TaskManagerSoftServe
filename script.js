"use strict";

const taskInput = document.querySelector("#task-input");
const addTaskBtn = document.querySelector("#add-task-btn");
const taskList = document.querySelector("#task-list");

// Check if there are any tasks in localStorage
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Add tasks from localStorage to the list
tasks.forEach(task => addTaskToList(task));

addTaskBtn.addEventListener("click", function(event) {
	event.preventDefault();
	
	if (taskInput.value !== "") {
		const task = {
			id: Date.now(),
			text: taskInput.value,
			completed: false
		};
		
		addTaskToList(task);
		
		// Add task to localStorage
		tasks.push(task);
		localStorage.setItem("tasks", JSON.stringify(tasks));
		
		taskInput.value = "";
	}
});

function addTaskToList(task) {
	const taskEl = document.createElement("li");
	taskEl.innerHTML = `
		<div class="task">
			<input type="checkbox" ${task.completed ? "checked" : ""}>
			<span>${task.text}</span>
		</div>
		<div class="actions">
			<button class="edit-btn">Edit</button>
			<button class="delete-btn">Delete</button>
		</div>
	`;
	
	taskList.appendChild(taskEl);
	
	taskEl.querySelector(".edit-btn").addEventListener("click", function() {
		const taskText = taskEl.querySelector("span");
		const taskInput = document.createElement("input");
		taskInput.type = "text";
		taskInput.value = taskText.textContent;
		taskText.replaceWith(taskInput);
		
		const saveBtn = document.createElement("button");
		saveBtn.textContent = "Save";
		saveBtn.classList.add("save-btn");
		taskEl.querySelector(".actions").appendChild(saveBtn);
		
		saveBtn.addEventListener("click", function() {
			task.text = taskInput.value;
			taskText.textContent = taskInput.value;
			taskInput.replaceWith(taskText);
			saveBtn.remove();
			
			// Update task in localStorage
			localStorage.setItem("tasks", JSON.stringify(tasks));
		});
	});
	
	taskEl.querySelector(".delete-btn").addEventListener("click", function() {
		taskEl.remove();
		
		// Remove task from localStorage
		tasks.splice(tasks.findIndex(t => t.id === task.id), 1);
		localStorage.setItem("tasks", JSON.stringify(tasks));
	});
	
	taskEl.querySelector("input[type=checkbox]").addEventListener("change", function() {
		task.completed = this.checked;
		
		// Update task in localStorage
		localStorage.setItem("tasks", JSON.stringify(tasks));
	});
}
