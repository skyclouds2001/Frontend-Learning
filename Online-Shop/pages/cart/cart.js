// pages/cart/cart.js

import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  getSetting,
  chooseAddress,
  openSetting,
  showModal,
  showToast
} from '../../utils/asyncWx.js';

Page({
 
  data: {
    address: {},
    cart: [],
    allChecked: false,
    total_price: 0,
    total_num: 0
  },

  onShow: function (options) {
    const address = wx.getStorageSync('address');
    const cart = wx.getStorageSync('cart') || [];
    this.setData({
      address
    });
    this.setCart(cart);
  },

  // 添加收获地址
  async handleChooseAddress(e) {
    try {
      const result = await getSetting();
      const scopeAddress = result.authSetting["scope.address"];

      if(scopeAddress === false) {
        await openSetting();
      }

      let address = await chooseAddress();
      address.detail_address = address.provinceName + address.cityName + address.countyName + address.detailInfo;

      wx.setStorageSync('address', address);
    } catch (err) {
      console.log(err);
    }
  },

  handleItemChange(e) {
    const id = e.currentTarget.dataset.id;
    let {cart} = this.data;
    let index = cart.findIndex(v => v.goods_id === id);
    cart[index].isSelected = !cart[index].isSelected;
    this.setCart(cart);
  },

  setCart(cart) {
    wx.setStorageSync('cart', cart);

    let total_price = 0, total_num = 0, allChecked = true;
    cart.forEach(v => {
      if(v.isSelected) {
        total_num += v.num;
        total_price += v.num * v.goods_price;
      } else {
        allChecked = false;
      }
    });
    allChecked = cart.length != 0 ? allChecked : false;

    this.setData({
      cart,
      total_price,
      total_num,
      allChecked
    });
  },

  handleAllSelect(e) {
    let {allChecked, cart} = this.data;

    allChecked = !allChecked;
    cart.forEach(v => v.isSelected = allChecked );

    this.setCart(cart);
  },

  async handleChangeNum(e) {
    let {cart} = this.data;
    const {flag, id} = e.currentTarget.dataset;

    const index = cart.findIndex(v => v.goods_id === id);

    if(cart[index].num === 1 && flag === -1) {
      const res = await showModal({
        content: "确认删除该商品？"
      });
      if (res.confirm) {
        cart.splice(index, 1);
        this.setCart(cart);
      }
    } else {
      cart[index].num += flag;
      this.setCart(cart);
    }
  },

  async handlePay(e) {
    const {address, total_num} = this.data;

    if(!address.userName) {
      await showToast({
        title: "没有选择收货地址"
      });
      return;
    }
    if(total_num === 0) {
      await showToast({
        title: "没有添加商品"
      });
      return;
    }

    wx.navigateTo({
      url: '/pages/pay/pay'
    });
  }

})
