// 导入express包
const express = require('express');

// 创建服务器
const app = express();

// 启动服务器
app.listen(8000, () => {
  console.log('express server running at http://127.0.0.1:8000');
});

// 监听请求
//    req 请求对象
//    res 响应对象
app.get('/:id/user', (req, res) => {

  // 获取查询参数 `req.query`
  // 默认为空对象
  console.log(req.query);

  // 获取动态参数{如 /:id/} `req.params`
  console.log(req.params);

  // 发送请求内容 `res.send()`
  res.send('get!!!');

});

// 托管静态资源
//   外部 http://localhost:8000/0.css
//   内部 /public/0.css
// 托管多个静态资源目录，只需多次调用 express.static() 方法
app.use(express.static('public'));
// 挂载路径前缀
//   外部 http://localhost:8000/static/0.css
//   内部 /public/0.css
app.use('/static/', express.static('public'));

// 使用外部路由
const router = require('./router.js');
app.use(router);
