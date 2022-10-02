const db = require('../db/index');

exports.getArticleCates = (req, res) => {
  const sql_search = 'select * from article_node_study where is_delete=0 order by id asc';

  db.query(sql_search, (err, res) => {
    if (err) return res.cc(err);

    res.send({
      status: 0,
      message: '获取文章分类列表成功！',
      data: res,
    });
  });
};

exports.addArticleCates = (req, res) => {
  const sql_search = `select * from article_node_study where name=? or alias=?`;

  db.query(sql_search, [req.body.name, req.body.alias], (error, result) => {
    if (error) return res.cc(error);

    if (result.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！');
    if (result.length === 1 && result[0].name === req.body.name && result[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！');
    if (result.length === 1 && result[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！');
    if (result.length === 1 && result[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！');

    const sql_insert = `insert into article_node_study set ?`;

    db.query(sql_insert, req.body, (error, result) => {
      if (error) return res.cc(error);

      if (result.affectedRows !== 1) return res.cc('新增文章分类失败！');

      res.cc('新增文章分类成功！', 0);
    });
  });
};

exports.deleteCateById = (req, res) => {
  const sql_update = `update article_node_study set is_delete=1 where id=?`;

  db.query(sql_update, req.params.id, (error, result) => {
    if (error) return res.cc(error);

    if (result.affectedRows !== 1) return res.cc('删除文章分类失败！');

    res.cc('删除文章分类成功！', 0);
  });
};

exports.getArtCateById = (req, res) => {
  const sql_select = `select * from ev_article_cate where id=?`;

  db.query(sql_select, req.params.id, (error, result) => {
    if (error) return res.cc(error);

    if (result.length !== 1) return res.cc('获取文章分类数据失败！');

    res.send({
      status: 0,
      message: '获取文章分类数据成功！',
      data: result[0],
    });
  });
};

exports.updateCateById = (req, res) => {
  const sql_select = `select * from ev_article_cate where Id<>? and (name=? or alias=?)`;

  db.query(sql_select, [req.body.Id, req.body.name, req.body.alias], (err, results) => {
    if (err) return res.cc(err);

    if (results.length === 2) return res.cc('分类名称与别名被占用，请更换后重试！');
    if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias) return res.cc('分类名称与别名被占用，请更换后重试！');
    if (results.length === 1 && results[0].name === req.body.name) return res.cc('分类名称被占用，请更换后重试！');
    if (results.length === 1 && results[0].alias === req.body.alias) return res.cc('分类别名被占用，请更换后重试！');

    const sql_update = `update ev_article_cate set ? where Id=?`;

    db.query(sql_update, [req.body, req.body.Id], (err, results) => {
      if (err) return res.cc(err);

      if (results.affectedRows !== 1) return res.cc('更新文章分类失败！');

      res.cc('更新文章分类成功！', 0);
    });
  });
};
