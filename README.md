# task manager (CRUD app)

This application includes the ability to:

- log in to a protected page
- retrieve and display a list of tasks from a database
- add new tasks to the database
- delete tasks from the database

## serving files

- [x] Create a Node.js HTTP server that listens on port 3333.
- [x] When you visit `http://localhost:3333/` in the browser, it should serve the `index.html` file from the `views` folder. This is the login page for the application.
- [x] When you visit `http://localhost:3333/secret` in the browser, you should render the `secret.html` file from the `views` folder. This is the Task Manager application.
- [x] You should also serve the CSS and JS that the HTML files are requesting. These are located in the `assets` folder. Make sure the `Content-Type` header is getting properly set in the HTTP response. (Some methods from some frameworks infer the content type from the file extension and set the header automatically.)
- [x] Visiting any route that is not defined should respond to the client with a `404` status code and an error message `Page not found`.

## NoSQL database

Your Task Manager application would be useless without a database to hold onto the tasks between sessions. Please put the URI of the database you will be using (local or cloud hosted) in the `myURI` variable. If your personal URI contains sensitive information (such as a password), feel free to replace `myURI` when you are ready to commit.

### 'tasks' model

In the `server/models/TaskModel.js` file, implement a database as described below:

- [x] We want to store our data in a collection/table called `Task`. (This may be created as the plural `Tasks`.)
- [x] All items in the database must have a property `item` which is a string.
- [x] Additionally, all items should be stored with the time they were `created_at`. This should default to the current time.

### task controller

In the `server/models/taskController.js` file, add the following functionality to the exported controller. (These will be server middleware/final handler functions, so they should take the appropriate parameters and perform the necessary callback operations.)

- [x] `getTasks` should retrieve all items from the database and send it back to the client as JSON.
- [x] `postTask` should create a new item in the database.
- [x] `deleteTask` should find items in the database based on an ID number and delete that item if it exists.
- [x] Errors in any of the controllers (such as those related to querying or updating the database) should trigger a **global error handler** rather than proceeding to the next function in the middleware chain. If you have not already created a global error handler, add one to the `server.js` file. When invoked, it should return a relevant error message to the client, along with a status code of `500`.

## client-side javascript / DOM manipulation

You are serving `index.js` to the client for use on the `secret` page, but there is not much existing functionality. Add code to achieve the following:

- [x] When the button is clicked to get tasks, all tasks from the database should be displayed as list items in the `#task-list` element. These list items should display the task item followed by a `button` (inside the list item) with a class of `remove` and display an `X`. As an example, one list item might look like `<li>Go shopping <button class="remove">X</button></li>`.
- [x] Multiple clicks of the button to get tasks should not display the list items multiple times.
- [x] Clicking on the button to add a task should take the text from the input field and create a new task in the database. This task should be seen by clicking the button to get tasks after it has been added. (Optionally, you can display the new task immediately after adding.)
- [x] Clicking on any list item's `X` button should remove the item from the list (immediately) and delete the task from the database.

## server routing

By now, your server should serve the static assets, the login page, and the secret page. Add additional routes to achieve the following functionality:

- [x] If you have not already done so in conjunction with the tasks above, create the routes to tie the client-side JavaScript events to the appropriate database functions.
- [x] When the sign in form is submitted, it should redirect to the secret page route. This should **not** be done with AJAX. (This route will be authenticated in a later step.)

## authentication

Modify your code to enforce the following authentication measures. (Use the `server/controllers/authController.js` file to add any middleware functions.)

- [x] The only successful login credentials should be to have a username of `adminUser` and a password of `ilovetesting`. Providing these credentials will redirect to the secret page route as before. Any other credentials (or none at all) will send the string `unsuccessful login attempt`.
- [x] Providing the correct login credentials should set a cookie on the client with a key of `token` and a value of `admin`.
- [x] Visiting the `http://localhost:3333/secret` route directly should now check for the existence of a valid cookie before sending the secret page. If the cookie is not valid (or does not exist), send back the string `You must be signed in to view this page`.
