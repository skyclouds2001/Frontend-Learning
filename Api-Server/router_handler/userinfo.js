const bcrypt = require('bcryptjs');

const db = require('../db/index');

exports.getUserInfo = (req, res) => {
  const sql_search = `select id, username, nickname, email, user_pic from ev_users where id=?`;

  db.query(sql_search, req.user.id, (err, res) => {
    if(err) return res.cc(err);

    if(res.length !== 1) return res.cc('获取用户信息失败！');

    res.send({
      status: 0,
      message: '获取用户基本信息成功！',
      data: res[0],
    });
  });
};

exports.updateUserInfo = (req, res) => {
  const sql_update = `update ev_users set ? where id=?`;

  db.query(sql_update, [req.body, req.body.id], (err, res) => {
    if(err) return res.cc(err);

    if(res.affectedRows !== 1) return res.cc('修改用户基本信息失败！');

    return res.cc('修改用户基本信息成功！', 0);
  });
};

exports.updatePassword = (req, res) => {
  const sql_search = `select * from ev_users where id=?`;
  const sql_update = `update ev_users set password=? where id=?`;

  db.query(sql_search, req.user.id, (err, res) => {
    if (err) return res.cc(err);

    if (res.length !== 1) return res.cc('用户不存在！');

    const flag = bcrypt.compareSync(req.body.oldPwd, res[0].password);

    if(!flag) return res.cc('原密码错误！');

    const newPwd = bcrypt.hashSync(req.body.newPwd, 10);

    db.query(sql_update, [newPwd, req.user.id], (err, res) => {
      if (err) return res.cc(err);

      if (res.length !== 1) return res.cc('用户不存在！');

      res.cc('更新密码成功！', 0);
    });
  });
};

exports.updateAvatar = (req, res) => {
  const sql_update = 'update ev_users set user_pic=? where id=?';

  db.query(sql_update, [req.body.avatar, req.user.id], (err, results) => {
    if (err) return res.cc(err);

    if (results.affectedRows !== 1) return res.cc('更新头像失败！');

    return res.cc('更新头像成功！', 0);
  });
};
