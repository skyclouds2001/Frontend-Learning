// pages/pay/pay.js

import regeneratorRuntime from '../../lib/runtime/runtime';
import {
  request
} from '../../request/request.js';
import {
  requestPayment,
  showToast
} from '../../utils/asyncWx.js';

Page({
 
  data: {
    address: {},
    cart: [],
    total_price: 0,
    total_num: 0
  },

  onShow: function (options) {
    const address = wx.getStorageSync('address');
    let cart = wx.getStorageSync('cart') || [];
    cart = cart.filter(v => v.isSelected);

    let total_price = 0, total_num = 0;
    cart.forEach(v => {
      total_num += v.num;
      total_price += v.num * v.goods_price;
    });

    this.setData({
      address,
      cart,
      total_price,
      total_num
    });
  },

  async handlePrderPay() {
    try {
      const token = wx.getStorageSync('token');
      if(!token) {
        wx.navigateTo({
          url: '/pages/auth/auth'
        });
        return;
      }

      const order_price = this.data.total_price;
      const consignee_addr = this.data.address;
      let goods = [];
      this.data.cart.forEach(v => goods.push({
        goods_id: v.goods_id,
        goods_number: v.num,
        goods_price: v.goods_price
      }));

      const {order_number} = await request({
        url: '/my/orders/create',
        method: 'POST',
        data: {
          order_price,
          consignee_addr,
          goods
        }
      });

      const {pay} = await request({
        url: '/my/orders/req_unifiedorder',
        method: 'POST',
        data: {
          order_number
        }
      });

      await requestPayment(pay);

      await request({
        url: '/my/orders/chkOrder',
        method: 'POST',
        data: {
          order_number
        }
      });

      await showToast({
        title: '支付成功'
      });

      let newCart = wx.getStorageSync('cart');
      newCart = newCart.filter(v => !v.isSelected);
      wx.setStorageSync('cart', newCart);

      wx.navigateTo({
        url: '/pages/order/order',
      })
    } catch (error) {
      console.log(error);

      await showToast({
        title: '支付失败'
      });
    }
  }
})
