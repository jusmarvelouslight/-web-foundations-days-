
const noteText = document.querySelector("#note-text");
const charCount = document.querySelector("#char-count");
const wordCount = document.querySelector("#word-count");
const clearButton = document.querySelector("#clear-btn");
const themeToggle = document.querySelector("#theme-toggle");

const DRAFT_KEY = "day4-note-draft";
const THEME_KEY = "day4-theme";

function updateCounts() {
  const text = noteText.value;
  const characters = text.length;
  const words = text.trim() === ""
    ? 0
    : text.trim().split(/\s+/).length;

  charCount.textContent = `${characters} / 200 characters`;
  wordCount.textContent = `${words} words`;

  charCount.classList.toggle("warning", characters > 180);
  charCount.classList.toggle("over", characters > 200);
}

function clearNote() {
  noteText.value = "";
  localStorage.removeItem(DRAFT_KEY);
  updateCounts();
}

function updateThemeButton() {
  themeToggle.textContent = document.body.classList.contains("dark")
    ? "Light mode"
    : "Dark mode";
}

function saveTheme() {
  const theme = document.body.classList.contains("dark")
    ? "dark"
    : "light";

  localStorage.setItem(THEME_KEY, theme);
}

noteText.addEventListener("input", function () {
  localStorage.setItem(DRAFT_KEY, noteText.value);
  updateCounts();
});

clearButton.addEventListener("click", clearNote);

noteText.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    clearNote();
  }
});

themeToggle.addEventListener("click", function () {
  document.body.classList.toggle("dark");
  updateThemeButton();
  saveTheme();
});

// Restore the saved draft.
const savedDraft = localStorage.getItem(DRAFT_KEY);

if (savedDraft !== null) {
  noteText.value = savedDraft;
}

// Restore the selected theme.
const savedTheme = localStorage.getItem(THEME_KEY);

if (savedTheme === "dark") {
  document.body.classList.add("dark");
} else {
  document.body.classList.remove("dark");
}

updateThemeButton();
updateCounts();
