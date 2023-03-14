"use strict";
const taskInput = document.querySelector("#task-input");
const addTaskBtn = document.querySelector("#add-task-btn");
const taskList = document.querySelector("#task-list");

addTaskBtn.addEventListener("click", function(event) {
	event.preventDefault();
	
	if (taskInput.value !== "") {
		const task = document.createElement("li");
		task.innerHTML = `
			<div class="task">
				<input type="checkbox">
				<span>${taskInput.value}</span>
			</div>
			<div class="actions">
				<button class="edit-btn">Edit</button>
				<button class="delete-btn">Delete</button>
			</div>
		`;
		taskList.appendChild(task);
		
		task.querySelector(".edit-btn").addEventListener("click", function() {
			const taskText = task.querySelector("span");
			const taskInput = document.createElement("input");
			taskInput.type = "text";
			taskInput.value = taskText.textContent;
			taskText.replaceWith(taskInput);
			
			const saveBtn = document.createElement("button");
			saveBtn.textContent = "Save";
			saveBtn.classList.add("save-btn");
			task.querySelector(".actions").appendChild(saveBtn);
			
			saveBtn.addEventListener("click", function() {
				taskText.textContent = taskInput.value;
				taskInput.replaceWith(taskText);
				saveBtn.remove();
			});
		});
		
		task.querySelector(".delete-btn").addEventListener("click", function() {
			task.remove();
		});
		
		taskInput.value = "";
	}
});
