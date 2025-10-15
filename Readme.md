🌍 Overview: What Happens When You Open the Page

When you open index.html in your browser:

The HTML file loads first and defines the basic structure of the page.

The CSS file is applied to make everything look nice and readable.

The JavaScript file runs last. It fetches user data from the API, adds user names to the page, and handles all the interactivity — like showing details when you click a name and letting you go back.

So the three files work together in harmony:
HTML → structure, CSS → appearance, JavaScript → logic and interactivity.

🧱 1. HTML (index.html) — Structure and Framework

This is the skeleton of your web app.
It tells the browser what elements exist and where content will appear.

🔹 What it does

Declares a basic webpage using standard HTML structure.

Includes two key containers:

#userList: where JavaScript will display the list of user names.

#userDetails: where the detailed info of a clicked user will appear.

Links the stylesheet (style.css) for design.

Links the JavaScript file (app.js) that controls the app’s behavior.

🔹 In short

HTML gives the structure — like the foundation and walls of a building.
It doesn’t decide colors, fonts, or actions. It just says what exists and where.

🎨 2. CSS (style.css) — Design and Appearance

This file is the decoration and layout layer of your web app.
It makes your interface visually appealing and easy to use.

🔹 What it does

Styles the page (body, h1) with a pleasant background, font, and centered title.

Styles each user name box in the list with spacing, colors, hover effects, and a “selected” highlight.

Styles the details panel with padding, borders, and a centered card layout.

Defines a .hidden class to hide or show content (controlled by JavaScript).

Styles the Back button with a blue color that changes on hover.

🔹 In short

CSS gives the visual design — the paint, furniture, and lighting of your building.
It decides how things look but doesn’t change what they do.

⚙️ 3. JavaScript (app.js) — Logic and Interactivity

This is the brain of your web app.
It controls what happens when the user interacts — like fetching data, reacting to clicks, and updating the page dynamically.

🔹 What it does

Fetches Data:

Calls the public API https://jsonplaceholder.typicode.com/users.

Retrieves fake user data in JSON format (names, emails, addresses, etc.).

Handles network errors gracefully (shows a message if it fails).

Displays User List:

Creates clickable boxes (divs) for each user name.

Adds them inside the #userList container on the page.

Each box has a click event listener that shows that user’s full details.

Displays User Details:

When you click a user name:

The list hides.

The details view (#userDetails) shows.

It displays name, email, address, company, etc.

Also adds a “Back to List” button to return to the user list.

Manages State (selected user):

Keeps track of the currently selected user (selectedUserId) so that when you go back, the same user stays highlighted.

🔹 In short

JavaScript provides the logic and interaction — the electrical wiring, buttons, and moving parts of your building.
It decides how things behave and how the app responds to user actions.
