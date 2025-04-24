// elementen ophalen
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const addBtn = document.getElementById("addBtn");

// taak toevoegen
function addTask() {
  const text = input.value.trim();
  if (!text) return;

  const li = document.createElement("li");
  li.className =
    "list-group-item d-flex justify-content-between align-items-center";
  li.innerHTML = `
    <span>${text}</span>
    <button class="btn btn-sm btn-danger">×</button>
  `;

  // verwijderknop
  li.querySelector("button").addEventListener("click", () => li.remove());

  list.appendChild(li);
  input.value = "";
  input.focus();
}

// klik op knop
addBtn.addEventListener("click", addTask);

// enter‑toets in invoerveld
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") addTask();
});
