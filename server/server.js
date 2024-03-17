const path = require('path');
const express = require('express');

const app = express();
const PORT = 3333;

app.use(express.json());

// statically serve css + js
app.use(express.static(path.resolve(__dirname, '../assets')));

// serve homepage
app.get('/', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../views/index.html'))
);

// serve secret page
app.get('/secret', (req, res) =>
  res.status(200).sendFile(path.resolve(__dirname, '../views/secret.html'))
);

// catch-all error handler
app.use((req, res) => res.sendStatus(404));

/* GEH */
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { error: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log('LOG:', errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}...`);
});
