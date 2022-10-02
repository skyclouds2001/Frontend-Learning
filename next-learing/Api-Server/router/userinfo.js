const express = require('express');

const router = express.Router();

const userinfo_handle = require('./../router_handler/userinfo');

router.get('/userinfo', userinfo_handle.getUserInfo);

const expressJoi = require('@escook/express-joi');

const { update_userinfo_schema } = require('../schema/user');

router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handle.updateUserInfo);

const { update_password_schema } = require('../schema/user');

router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handle.updatePassword);

const { update_avatar_schema } = require('../schema/user');

router.post('/update/avatar', expressJoi(update_avatar_schema), userinfo_handle.updateAvatar);

module.exports = router;
