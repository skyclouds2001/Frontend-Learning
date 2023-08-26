const express = require('express');

const apiRouter = express.Router();

apiRouter.get('/get', (req, res) => {
  const query = req.query;

  res.send({
    status: 0,
    msg: 'SUCCESS POST',
    data: query,
  });
});

apiRouter.post('/post', (req, res) => {
  const body = req.body;

  res.send({
    status: 0,
    msg: 'SUCCESS GET',
    data: body,
  });
});

module.exports = apiRouter;
