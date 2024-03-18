const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = 3333;

const {
  getTasks,
  postTask,
  deleteTask,
} = require('./controllers/taskController');

const {
  verifyUser,
  setCookie,
  verifyCookie,
} = require('./controllers/authController');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// statically serve css + js
app.use(express.static(path.resolve(__dirname, '../assets')));

// serve homepage
app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'))
);

// redirect to /secret upon successful sign in
app.post('/signin', verifyUser, setCookie, (req, res) =>
  res.status(301).redirect('/secret')
);

// serve secret page
app.get('/secret', verifyCookie, (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'))
);

// retrieve tasks from DB
app.get('/api/items', getTasks, (req, res) =>
  res.status(200).json(res.locals.tasks)
);

// post task to DB
app.post('/api/items', postTask, (req, res) =>
  res.status(200).json('added task!')
);

// delete task from DB
app.delete('/api/items/:id', deleteTask, (req, res) =>
  res.status(200).json('task deleted!')
);

// catch-all error handler
app.use((req, res) => res.sendStatus(404));

/* GEH */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { error: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log('LOG:', errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
