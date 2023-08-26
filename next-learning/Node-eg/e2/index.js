const express = require('express');

const app = express();

const apiRouter = require('./apiRouter.js');

app.use('/api', apiRouter);

app.listen(8000, () => {
  console.log('Service running at http://127.0.0.1:8000');
});
