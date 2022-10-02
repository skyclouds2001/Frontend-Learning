const db = require('../db/index');

const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken');

exports.regUser = (req, res) => {
  const userinfo = req.body;
  if(!userinfo.username || !userinfo.password) {
    return res.send({
      status: 1,
      message: '用户名或密码不能为空！',
    });
  }
  const sql_search = `select * from user-node-study where username=?`;

  db.query(sql_search, userinfo.username, (err, res) => {

    if(err) {
      return res.send({
        status: 1,
        message: err.message,
      });
    }

    if(res.length > 0) {
      return res.send({
        status: 1,
        message: '用户名已占用，请更换！',
      });
    }

    userinfo.password = bcrypt.hashSync(userinfo.password, 10);
  });

  const sql_insert = 'insert into user-node-study set ?';

  db.query(sql_insert, {
    username: userinfo.username,
    password: userinfo.password,
  }, (err, res) => {
    if(err) {
      return res.send({
        status: 1,
        message: err.message,
      });
    }
    if(res.affectedRows !== 1) {
      return res.send({
        status: 1,
        message: '注册用户失败，请稍后再试！',
      });
    }
    res.send({
      status: 0,
      message: '注册成功！',
    });
  });

  res.send('reguser OK');
};

exports.login = (req, res) => {
  const userinfo = req.body;

  const sql_search = `select * from user-node-study where username=?`;

  db.query(sql_search, userinfo.username, (err, res) => {
    if(err) return res.cc(err);

    if(res.length !== 1) return res.cc('查询失败');

    const flag = bcrypt.compareSync(userinfo.password, res[0].password);

    if(!flag) return res.cc('登录失败');

    const user = { ...res[0], password: '', user_pic: '' };

    const config = require('../config');

    const token = jwt.sign(user, config.jwtSecretKey, {
      expiresIn: '10h',
    });

    res.send({
      status: 0,
      message: '登录成功！',
      token: 'Bearer ' + token,
    });
  });
};
