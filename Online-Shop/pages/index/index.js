// index.js

import {request} from "../../request/request.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  data: {
    // 存储轮播图信息
    swiper_list: [],
    // 存储导航信息
    cates_list: [],
    // 楼层数据
    floor_list: []
  },

  onLoad: function (options) {
    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },

  async getSwiperList() {
    const result = await request({
      url: "/home/swiperdata"
    });
    result.forEach((v, i) => v.navigator_url = v.navigator_url.replace('main', 'goods_detail'));
    this.setData({
      swiper_list: result
    })
  },

  async getCatesList() {
    const result = await request({
      url: "/home/catitems"
    });
    // result.forEach((v, i) => v.navigator_url ? v.navigator_url = v.navigator_url.replace('main', 'category') : '');
    this.setData({
      cates_list: result
    });
  },

  async getFloorList() {
    const result = await request({
      url: "/home/floordata"
    });
    result.forEach((v, i) => {
      v.product_list.forEach((u, j) => {
        u.navigator_url = u.navigator_url.replace('?', '/goods_list?');
      });
    });
    this.setData({
      floor_list: result
    })
  }
})
