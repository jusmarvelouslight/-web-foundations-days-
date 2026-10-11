
const loadButton = document.getElementById("load-users");
const filterInput = document.getElementById("filter-input");
const status = document.getElementById("status");
const usersList = document.getElementById("users-list");

const apiUrl = "https://jsonplaceholder.typicode.com/users";

let users = [];
let isLoading = false;

async function loadUsers() {
  // Prevent another request while one is already in progress.
  if (isLoading) {
    return;
  }

  isLoading = true;
  loadButton.disabled = true;
  status.textContent = "Loading users...";
  usersList.replaceChildren();

  try {
    const response = await fetch(apiUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    if (!Array.isArray(data)) {
      throw new Error("The API returned an invalid users list.");
    }

    users = data;

    const searchTerm = filterInput.value.trim().toLowerCase();

    const filteredUsers = users.filter(function (user) {
      return user.name.toLowerCase().includes(searchTerm);
    });

    renderUsers(filteredUsers);

    status.textContent = `Successfully loaded ${users.length} users.`;
  } catch (error) {
    status.textContent = `Failed to load users: ${error.message}`;
    console.error("Error loading users:", error);
  } finally {
    isLoading = false;
    loadButton.disabled = false;
  }
}

function renderUsers(list) {
  usersList.replaceChildren();

  if (list.length === 0) {
    const listItem = document.createElement("li");
    listItem.textContent = "No users match your filter.";
    usersList.appendChild(listItem);
    return;
  }

  list.forEach(function (user) {
    const listItem = document.createElement("li");

    const name = document.createElement("h2");
    name.textContent = user.name;

    const email = document.createElement("p");
    email.textContent = `Email: ${user.email}`;

    const city = document.createElement("p");
    city.textContent = `City: ${user.address.city}`;

    const company = document.createElement("p");
    company.textContent = `Company: ${user.company.name}`;

    listItem.appendChild(name);
    listItem.appendChild(email);
    listItem.appendChild(city);
    listItem.appendChild(company);

    usersList.appendChild(listItem);
  });
}

filterInput.addEventListener("input", function () {
  const searchTerm = filterInput.value.trim().toLowerCase();

  const filteredUsers = users.filter(function (user) {
    return user.name.toLowerCase().includes(searchTerm);
  });

  renderUsers(filteredUsers);
});

loadButton.addEventListener("click", loadUsers);
