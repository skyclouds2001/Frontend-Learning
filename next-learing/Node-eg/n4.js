const express = require('express');

const app = express();

const cors = require('cors');

app.use(cors());

app.listen(8080, () => {
  console.log('http://127.0.1:8000');
});

// 全局注册中间件
app.use((req, res, next) => {
  console.log('mid');
  next();
});
// 同时注册多个中间件只需多次调用app.use即可

// 局部注册中间件
app.post('/', (req, res, next) => {}, (req, res) => {});
