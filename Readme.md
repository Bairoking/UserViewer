HTML ‚Äî index.html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>User Profile Viewer</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>
  <h1>User Profile Viewer</h1>
  <div id="userList"></div>
  <div id="userDetails" class="hidden"></div>

  <script src="app.js"></script>
</body>
</html>


Line-by-line:

<!DOCTYPE html>
Declares the document type as HTML5. Tells the browser to render in standards mode.

<html lang="en">
Root element. lang="en" informs browsers and assistive tech (screen readers) that the content is English.

<head> ‚Ä¶ </head>
Metadata about the page (not visible in the main page content).

<meta charset="UTF-8">
Declares character encoding (UTF-8) so characters render correctly.

<title>User Profile Viewer</title>
Title shown in browser tab / window and used by search engines / bookmarks.

<link rel="stylesheet" href="style.css">
Includes the external CSS file style.css. rel="stylesheet" tells the browser this link is a stylesheet.

<body> ‚Ä¶ </body>
The visible page content.

<h1>User Profile Viewer</h1>
Main heading on the page. Good for structure and accessibility.

<div id="userList"></div>
Container where the list of user names will be inserted dynamically by JavaScript. We refer to it by id="userList".

<div id="userDetails" class="hidden"></div>
Container for the selected user‚Äôs detailed info. Initially has the hidden class so it‚Äôs not visible until a user is selected.

<script src="app.js"></script>
Loads the JavaScript file app.js. Placed at the end of <body> so the DOM elements (userList, userDetails) exist before the script runs.

CSS ‚Äî style.css
body {
  font-family: Arial, sans-serif;
  margin: 30px;
  background-color: #f8f9fa;
  color: #333;
}

h1 {
  text-align: center;
  color: #007bff;
}

#userList {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
}

#userList div {
  padding: 10px;
  background-color: #ffffff;
  border: 1px solid #ccc;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.1s;
}

#userList div:hover {
  background-color: #e9ecef;
  transform: scale(1.02);
}

#userList div.selected {
  background-color: #007bff;
  color: white;
  font-weight: bold;
}

#userDetails {
  padding: 20px;
  border-radius: 8px;
  background-color: #fff;
  border: 1px solid #ccc;
  max-width: 500px;
  margin: 0 auto;
}

button {
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 8px 15px;
  cursor: pointer;
  margin-top: 15px;
}

button:hover {
  background-color: #0056b3;
}

.hidden {
  display: none;
}


Group explanations & rationale:

body { font-family: ..., margin: 30px; ... }
Basic page layout and readable font. margin creates space around content.

h1 { text-align: center; color: #007bff; }
Centers the heading and applies a blue color.

#userList { display: flex; flex-direction: column; gap: 10px; }
Makes user list a vertical flex container with spacing between items.

#userList div { padding; background; border; border-radius; cursor: pointer; transition: ... }
Styles each user item: padding for space, white background, subtle border and rounded corners, cursor: pointer to show it‚Äôs clickable. transition makes hover effects smooth.

#userList div:hover { ... }
Slight background change and scale on hover for visual feedback.

#userList div.selected { ... }
Styling for the currently selected user (blue background, white text) so user knows which item is active.

#userDetails { padding... max-width: 500px; margin: 0 auto; }
Makes the detail card readable, centered, and constrained in width.

button { ... } and button:hover { ... }
Styles the back button; hover darkens it.

.hidden { display: none; }
Utility class that hides elements. Used to toggle visibility between list and details.

JavaScript ‚Äî app.js

I'll paste the JS first, then explain line-by-line and group-by-group.

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
    <button id="backButton">‚Üê Back to List</button>
  `;

  // Back button event
  document.getElementById('backButton').addEventListener('click', () => {
    displayUserList(allUsers);
  });
}

// Initial fetch of users
fetchUsers();

JavaScript ‚Äî Detailed explanation
let selectedUserId = null;

Declares a variable in the outer scope to remember which user is currently selected.

null means no selection at start. Using this allows the list to show the selected item highlighted if the UI is rebuilt.

async function fetchUsers() { ... }

Declares an asynchronous function to fetch users from the API.

Inside fetchUsers:

try { ... } catch (error) { ... }
A try/catch block ensures network or parsing errors are handled gracefully.

const response = await fetch('https://jsonplaceholder.typicode.com/users');
Uses the fetch API to request the users. await waits for the network response promise to resolve.

if (!response.ok) { throw new Error(...); }
fetch only rejects on network failure; it doesn‚Äôt reject for HTTP errors (like 404 or 500). Checking response.ok ensures we catch non-2xx HTTP responses and throw an error manually.

const users = await response.json();
Reads and parses the JSON body of the response into a JavaScript array/object.

displayUserList(users);
Calls the function that will render the list of users on the page.

catch (error) { console.error('Fetch Error:', error); ... }
If any error occurs (network issue, bad JSON, or the thrown HTTP error above), we log it and show a friendly message to the user:

document.getElementById('userList').innerHTML =
  `<p style="color:red;">Failed to load user data. Please try again later.</p>`;


This gives immediate feedback on the page rather than leaving the UI blank.

function displayUserList(users) { ... }

Responsible for rendering the list of users and wiring click events.

Step-by-step:

const userList = document.getElementById('userList');
Get the DOM element where we will put the list.

const userDetails = document.getElementById('userDetails');
Also get the details container because we'll toggle its visibility.

userList.classList.remove('hidden'); userDetails.classList.add('hidden');
Ensure the list is visible and the details pane is hidden. This supports toggling views.

userList.innerHTML = '';
Clear any existing content so we render a fresh list. This prevents duplicates when displayUserList is called multiple times.

users.forEach(user => { ... });
Loop through each user returned by the API.

Inside the loop:

const userElement = document.createElement('div');
Create a new div element to represent one user row.

userElement.textContent = user.name;
Put the user's name inside the div. textContent is safe for plain text (no HTML injection).

if (selectedUserId === user.id) userElement.classList.add('selected');
If we previously selected this user (tracked by selectedUserId), apply the selected CSS class so it‚Äôs highlighted.

userElement.addEventListener('click', () => { selectedUserId = user.id; displayUserDetails(user, users); });
When the element is clicked:

Save the clicked user‚Äôs id into selectedUserId (so highlight persists when returning to list).

Call displayUserDetails(user, users) to show that user‚Äôs details. Passing users (all users) makes it easy to return to the list later with the same data.

userList.appendChild(userElement);
Add the div to the DOM under #userList.

Why pass users to displayUserDetails?
We pass allUsers so the detail view can call displayUserList(allUsers) when clicking the Back button ‚Äî this avoids refetching the API and improves responsiveness.

function displayUserDetails(user, allUsers) { ... }

Shows a selected user‚Äôs detailed info and provides a back button.

Steps inside:

const userList = document.getElementById('userList'); and const userDetails = document.getElementById('userDetails');
Grab containers to toggle visibility.

userList.classList.add('hidden'); userDetails.classList.remove('hidden');
Hide the list and reveal the details card.

userDetails.innerHTML = \ ... `;`
Set the inner HTML of the details area. This includes:

<h2>${user.name}</h2> ‚Äî large heading with the user name.

<p><strong>Email:</strong> ${user.email}</p> ‚Äî email line.

Other fields: phone, website (wrapped in an <a> with target="_blank" to open in a new tab), address (street, suite, city), company.

<button id="backButton">‚Üê Back to List</button> ‚Äî the back button to return to the list.

Security note: Using template literals with values directly is fine here because the API is trusted and the values are plain text; for untrusted sources you'd sanitize or set textContent for pieces rather than injecting raw HTML. We output minimal HTML (a tags + button) and the user strings are not used as HTML tags.

document.getElementById('backButton').addEventListener('click', () => { displayUserList(allUsers); });
Add a click handler to the back button. When clicked, we call displayUserList(allUsers) to re-render the list and preserve the selectedUserId highlight ‚Äî UI returns to list view without re-fetching.

fetchUsers(); (initial call)

Starts the app by fetching users once when the script loads.

Additional clarifications, tips & small improvements

Why toggle .hidden instead of style.display?
Using classes keeps styling in CSS (separation of concerns). It‚Äôs easier to maintain and animate if needed.

Why store selectedUserId globally?
So the selected item can be highlighted when returning to the list. Without this, returning to the list would lose the selection state.

Avoiding refetch
The code passes the users array around so you don‚Äôt need to re-request the API on every view change. That‚Äôs faster and kinder to the API.

Accessibility (a11y) improvements you can add:

Make each user element a <button> or <a> rather than a div (buttons are keyboard accessible by default).

Add aria-expanded or aria-controls attributes to indicate the UI state to screen readers.

Provide focus styles for keyboard users.

Error handling improvements:

Add a retry button when fetch fails.

Show a loading indicator while fetching: set userList.innerHTML = 'Loading‚Ä¶' before fetch and remove after.

Security note:
If the app ever displays user-provided HTML, sanitize or use textContent instead of innerHTML to avoid XSS. For this exercise, the API returns plain text fields.

Performance
For large lists you might consider rendering only visible items (virtualization). For 10 users from this API, current approach is fine.
Ìºç Overview: What Happens When You Open the Page

When you open index.html in your browser:

The HTML file loads first and defines the basic structure of the page.

The CSS file is applied to make everything look nice and readable.

The JavaScript file runs last. It fetches user data from the API, adds user names to the page, and handles all the interactivity ‚Äî like showing details when you click a name and letting you go back.

So the three files work together in harmony:
HTML ‚Üí structure, CSS ‚Üí appearance, JavaScript ‚Üí logic and interactivity.

Ì∑± 1. HTML (index.html) ‚Äî Structure and Framework

This is the skeleton of your web app.
It tells the browser what elements exist and where content will appear.

Ì¥π What it does

Declares a basic webpage using standard HTML structure.

Includes two key containers:

#userList: where JavaScript will display the list of user names.

#userDetails: where the detailed info of a clicked user will appear.

Links the stylesheet (style.css) for design.

Links the JavaScript file (app.js) that controls the app‚Äôs behavior.

Ì¥π In short

HTML gives the structure ‚Äî like the foundation and walls of a building.
It doesn‚Äôt decide colors, fonts, or actions. It just says what exists and where.

Ìæ® 2. CSS (style.css) ‚Äî Design and Appearance

This file is the decoration and layout layer of your web app.
It makes your interface visually appealing and easy to use.

Ì¥π What it does

Styles the page (body, h1) with a pleasant background, font, and centered title.

Styles each user name box in the list with spacing, colors, hover effects, and a ‚Äúselected‚Äù highlight.

Styles the details panel with padding, borders, and a centered card layout.

Defines a .hidden class to hide or show content (controlled by JavaScript).

Styles the Back button with a blue color that changes on hover.

Ì¥π In short

CSS gives the visual design ‚Äî the paint, furniture, and lighting of your building.
It decides how things look but doesn‚Äôt change what they do.

‚öôÔ∏è 3. JavaScript (app.js) ‚Äî Logic and Interactivity

This is the brain of your web app.
It controls what happens when the user interacts ‚Äî like fetching data, reacting to clicks, and updating the page dynamically.

Ì¥π What it does

Fetches Data:

Calls the public API https://jsonplaceholder.typicode.com/users.

Retrieves fake user data in JSON format (names, emails, addresses, etc.).

Handles network errors gracefully (shows a message if it fails).

Displays User List:

Creates clickable boxes (divs) for each user name.

Adds them inside the #userList container on the page.

Each box has a click event listener that shows that user‚Äôs full details.

Displays User Details:

When you click a user name:

The list hides.

The details view (#userDetails) shows.

It displays name, email, address, company, etc.

Also adds a ‚ÄúBack to List‚Äù button to return to the user list.

Manages State (selected user):

Keeps track of the currently selected user (selectedUserId) so that when you go back, the same user stays highlighted.

Ì¥π In short

JavaScript provides the logic and interaction ‚Äî the electrical wiring, buttons, and moving parts of your building.
It decides how things behave and how the app responds to user actions.
