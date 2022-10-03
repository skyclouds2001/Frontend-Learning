// pages/auth/auth.js

import {request} from '../../request/request.js';
import regeneratorRuntime from '../../lib/runtime/runtime';
import {login, getUserProfile} from '../../utils/asyncWx.js';

Page({

  data: {

  },

  onLoad: function (options) {

  },

  async handleGetUserInfo() {
    try{
      const {encryptedData, iv, rawData, signature} = await getUserProfile();
      const {code} = await login();
      const loginParams = {
        encryptedData, iv, rawData, signature, code
      };

      const {token} = await request({
        url: '/users/wxlogin',
        data: loginParams,
        method: 'post'
      });

      wx.setStorageSync('token', token);
      wx.navigateBack({
        delta: 1
      });
    } catch (error) {
      console.log(error);
    }
  }
})