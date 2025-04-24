// ----------- helpers --------------------------------------------------
const $ = (sel) => document.querySelector(sel);

// Haal taken op uit localStorage of leeg array
let tasks = JSON.parse(localStorage.getItem("tasks") || "[]");

// ----------- render ---------------------------------------------------
function render() {
  // sorteer op dateAdded (nieuwste eerst)
  tasks.sort((a, b) => a.dateAdded - b.dateAdded); // oudste eerst

  const openList = $("#openList");
  const doneList = $("#doneList");
  openList.innerHTML = doneList.innerHTML = "";

  tasks.forEach((t, idx) => {
    const li = document.createElement("li");
    li.className =
      "list-group-item d-flex justify-content-between align-items-start";

    li.innerHTML = `
      <div class="ms-2 me-auto">
        <div class="fw-bold">${t.title}${
      t.label ? ` <span class="badge bg-secondary">${t.label}</span>` : ""
    }</div>
        ${t.desc ? `<small>${t.desc}</small><br>` : ""}
        ${t.deadline ? `<small>📅 ${t.deadline}</small>` : ""}
      </div>
      <div>
        <input type="checkbox" ${t.done ? "checked" : ""} data-idx="${idx}">
      </div>
    `;

    // checkbox‑toggle
    li.querySelector("input").addEventListener("change", (e) => {
      tasks[e.target.dataset.idx].done = e.target.checked;
      saveAndRender();
    });

    (t.done ? doneList : openList).appendChild(li);
  });
}

// ----------- save -----------------------------------------------------
function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  render();
}

// ----------- submit ---------------------------------------------------
$("#taskForm").addEventListener("submit", (e) => {
  e.preventDefault();

  const newTask = {
    title: $("#titleInput").value.trim(),
    desc: $("#descInput").value.trim(),
    label: $("#labelInput").value.trim(),
    deadline: $("#dateInput").value,
    dateAdded: Date.now(),
    done: false,
  };

  if (!newTask.title) return; // titel is verplicht

  tasks.push(newTask);

  // formulier resetten
  e.target.reset();
  $("#titleInput").focus();

  saveAndRender();
});

// ----------- init -----------------------------------------------------
render();
