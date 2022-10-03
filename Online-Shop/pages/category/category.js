// pages/category/category.js

import {request} from "../../request/request.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  data: {
    // 存储左侧滚动条信息
    left_data: [],
    // 存储右侧滚动条信息
    right_data: [],
    // 点击活跃的菜单序号
    active_index: 0,
    // scroll距离
    scroll_top: 0
  },

  cates_list: [],

  onLoad: function (options) {
    // this.getCates();
    const cates = wx.getStorageSync('cates_list');
    if(cates) {
      if(Date.now() - cates.time > 1000 * 10) {
        this.getCates();
      } 
      else {
        this.cates_list = cates.data;
        let left_data = this.cates_list.map(v => v.cat_name);
        let right_data = this.cates_list[0].children;

        this.setData({
          left_data,
          right_data
        })
      }
    }
    else {
      this.getCates();
    }
  },

  async getCates() {
    // request({
    //   url: "/categories"
    // }).then(result => {
    //   this.cates_list = result;
    //   wx.setStorageSync('cates_list', {
    //     time: Date.now(),
    //     data: this.cates_list
    //   });

    //   let left_data = this.cates_list.map(v => v.cat_name);
    //   let right_data = this.cates_list[0].children;

    //   this.setData({
    //     left_data,
    //     right_data
    //   })
    // });
    const result = await request({
      url: "/categories"
    });
    this.cates_list = result;
    wx.setStorageSync('cates_list', {
      time: Date.now(),
      data: this.cates_list
    });

    let left_data = this.cates_list.map(v => v.cat_name);
    let right_data = this.cates_list[0].children;

    this.setData({
      left_data,
      right_data
    });
  },

  handleItemTap(e) {
    const { index } = e.currentTarget.dataset;
    let right_data = this.cates_list[index].children;
    this.setData({
      active_index: index,
      right_data,
      scroll_top: 0
    });
  }
})