// pages/goods_detail/goods_detail.js

import {request} from "../../request/request.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  data: {
    goodsObject: {},
    isCollect: false
  },
  GoodsInfo: {},

  onLoad: function (options) {
    const {goods_id} = options;
    this.getGoodsDetail(goods_id);
  },

  // 获取商品详情
  async getGoodsDetail(goods_id) {
    const result = await request({
      url: '/goods/detail',
      data: {
        goods_id
      }
    });

    this.GoodsInfo = result;
    
    this.setData({
      goodsObject: {
        pics: result.pics,
        goods_price: result.goods_price,
        goods_name: result.goods_name,
        // ios特殊处理webp图片格式
        goods_introduce: result.goods_introduce.replace(/\.webp/g, '.jpg'),
        goods_id: result.goods_id
      }
    });
    
    const collect = wx.getStorageSync('collect') || [];
    let isCollect = collect.some(v => v === this.GoodsInfo.goods_id);
    this.setData({
      isCollect
    });
  },

  // 点击轮播图预览效果
  handlePreviewImage(e) {
    const urls = this.data.goodsObject.pics.map(v => v.pics_big);
    const current = e.currentTarget.dataset.index;
    wx.previewImage({
      urls,
      current: urls[current]
    });
  },

  // 添加购物车
  handleCartAdd(e) {
    let cart = wx.getStorageSync('cart') || [];
    let index = cart.findIndex(v => v.goods_id === this.data.goodsObject.goods_id);

    if(index === -1) {
      this.GoodsInfo.num = 1;
      this.GoodsInfo.isSelected = true;
      cart.push(this.GoodsInfo);
    }
    else {
      ++cart[index].num;
    }

    wx.setStorageSync('cart', cart);

    wx.showToast({
      title: '添加成功',
      icon: 'success',
      mask: true
    });
  },

  handleCollect() {
    let collect = wx.getStorageSync('collect') || [];
    let index = collect.findIndex(v => v.goods_id === this.GoodsInfo.goods_id);
    let {isCollect} = this.data;

    if(index !== -1) {
      collect.splice(index, 1);
      isCollect = false;
      wx.showToast({
        title: '取消成功',
        icon: 'success',
        mask: true
      });
    } else {
      collect.push(this.GoodsInfo);
      isCollect = true;
      wx.showToast({
        title: '收藏成功',
        icon: 'success',
        mask: true
      });
    }

    wx.setStorageSync('collect', collect);
    this.setData({
      isCollect: isCollect
    });
  }

})