const express = require('express');

const router = express.Router();

const article_handler = require('../router_handler/article');

const expressJoi = require('@escook/express-joi');

const { add_cate_schema } = require('../schema/artcate');

router.get('/cates', expressJoi(add_cate_schema), article_handler.getArticleCates);

router.post('/addcates', article_handler.addArticleCates);

const { delete_cate_schema } = require('../schema/artcate');

router.get('/deletecate/:id', expressJoi(delete_cate_schema), article_handler.deleteCateById);

const { get_cate_schema } = require('../schema/artcate');

router.get('/cates/:id', expressJoi(get_cate_schema), article_handler.getArtCateById);

const { update_cate_schema } = require('../schema/artcate');

router.post('/updatecate', expressJoi(update_cate_schema), article_handler.updateCateById);

module.exports = router;
