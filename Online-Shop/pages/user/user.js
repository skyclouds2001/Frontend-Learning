// pages/user/user.js

Page({

  data: {
    userinfo: {},
    collectGoodsNumber: 0
  },

  onLoad: function () {
    const collectGoods = wx.getStorageSync('collect') || [];
    this.setData({
      collectGoodsNumber: collectGoods.length
    });
  },

  onShow: function () {
    const userinfo = wx.getStorageSync('userinfo');
    this.setData({
      userinfo
    });
  }
})