const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());

// 帮助解析 application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: false,
}));

const userRouter = require('./router/user');
app.use('/api', userRouter);

const userinfoRouter = require('./router/userinfo');
app.use('/my', userinfoRouter);

const artCateRouter = require('./router/article');
app.use('/my/article', artCateRouter);

app.use((req, res, next) => {
  res.cc = (err, status = 1) => {
    res.send({
      status,
      message: err instanceof Error ? err.message : err,
    });
    next();
  };
});

const Joi = require('@hapi/joi');
app.use((err, req, res, next) => {
  if(err instanceof Joi.ValidationError) return res.cc(err);
  if(err.name === 'UnauthorizedError') return res.cc('身份认证失败！');
  res.cc(err);
});

const config = require('./config');
const expressJWT = require('express-jwt');
app.use(expressJWT({
  secret: config.jwtSecretKey,
}).unless({
  path: [/^\/api\//],
}));

app.listen(8080, () => {
  console.log('App running at http://127.0.0.1:8080');
});
