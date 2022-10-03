// pages/login/login.js

Page({
  handleGetUserInfo(e) {
    wx.getUserProfile({
      desc: '记录购物信息',
      success: (res) => {
        const {userInfo} = res;
        wx.setStorageSync('userinfo', userInfo);

        wx.navigateBack({
          delta: 1,
        });
      },
      fail: (err) => {
        console.log(err);
        wx.navigateBack({
          delta: 1,
        });
      }
    });
  }
})
