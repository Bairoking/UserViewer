let selectedUserId = null;

async function fetchUsers() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const users = await response.json();
    displayUserList(users);

  } catch (error) {
    console.error('Fetch Error:', error);
    document.getElementById('userList').innerHTML =
      `<p style="color:red;">Failed to load user data. Please try again later.</p>`;
  }
}

function displayUserList(users) {
  const userList = document.getElementById('userList');
  const userDetails = document.getElementById('userDetails');

  // Reset views
  userList.classList.remove('hidden');
  userDetails.classList.add('hidden');
  userList.innerHTML = '';

  users.forEach(user => {
    const userElement = document.createElement('div');
    userElement.textContent = user.name;

    // Highlight selected user
    if (selectedUserId === user.id) {
      userElement.classList.add('selected');
    }

    userElement.addEventListener('click', () => {
      selectedUserId = user.id;
      displayUserDetails(user, users);
    });

    userList.appendChild(userElement);
  });
}

function displayUserDetails(user, allUsers) {
  const userList = document.getElementById('userList');
  const userDetails = document.getElementById('userDetails');

  // Hide list and show details
  userList.classList.add('hidden');
  userDetails.classList.remove('hidden');

  userDetails.innerHTML = `
    <h2>${user.name}</h2>
    <p><strong>Email:</strong> ${user.email}</p>
    <p><strong>Phone:</strong> ${user.phone}</p>
    <p><strong>Website:</strong> <a href="http://${user.website}" target="_blank">${user.website}</a></p>
    <p><strong>Address:</strong> ${user.address.street}, ${user.address.suite}, ${user.address.city}</p>
    <p><strong>Company:</strong> ${user.company.name}</p>
    <button id="backButton">← Back to List</button>
  `;

  // Back button event
  document.getElementById('backButton').addEventListener('click', () => {
    displayUserList(allUsers);
  });
}

// Initial fetch of users
fetchUsers();
