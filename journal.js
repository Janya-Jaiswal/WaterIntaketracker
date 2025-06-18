const textarea = document.getElementById("journalEntry");
const entryList = document.getElementById("entryList");

// Load previous entries
const entries = JSON.parse(localStorage.getItem("journalEntries")) || [];
renderEntries();

function saveEntry() {
  const text = textarea.value.trim();
  if (!text) return alert("✍️ Please write something!");

  const today = new Date().toLocaleDateString();
  const entry = `${today}: ${text}`;

  entries.unshift(entry); // add new entry at the top
  localStorage.setItem("journalEntries", JSON.stringify(entries));

  textarea.value = "";
  renderEntries();
  alert("✅ Entry saved!");
}

function clearEntry() {
  textarea.value = "";
}

function renderEntries() {
  entryList.innerHTML = ""; // Clear previous entries
  for (let entry of entries) {
    const li = document.createElement("li");
    li.textContent = entry;
    entryList.appendChild(li);
  }
}


function clearAllEntries() {
  if (confirm("⚠️ Are you sure you want to delete all journal entries?")) {
    localStorage.removeItem("journalEntries");
    entryList.innerHTML = "";
    alert("🗑️ All entries deleted!");
  }
}
