// pages/goods_list/goods_list.js

import {request} from "../../request/request.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    default_img_src: "https://ww1.sinaimg.cn/large/007rAy9hgy1g24by9t530j30i20i2glm.jpg",

    goods_list: []
  },

  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalPages: 1,

  onLoad: function (options) {
    this.QueryParams.cid = options.cid || '';
    this.QueryParams.query = options.query || '';
    this.getGoodsList();
  },
  
  onReachBottom: function () {
    if(this.QueryParams.pagenum >= this.totalPages) {
      wx.showToast({
        title: '没有下一页数据',
      })
    }
    else {
      ++this.QueryParams.pagenum;
      this.getGoodsList();
    }
  },

  onPullDownRefresh: function() {
    this.QueryParams.pagenum = 1;
    this.setData({
      goods_list: []
    });
    this.getGoodsList();
    wx.stopPullDownRefresh({
      success: (res) => {},
    });
  },

  // 实现切换页面的方法
  handleTabsItemChange(e) {
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    });
  },

  // 请求获取商品数据
  async getGoodsList() {
    const result = await request({
      url: "/goods/search",
      data: this.QueryParams
    });

    this.setData({
      goods_list: [...this.data.goods_list, ...result.goods]
    });
    this.totalPages = Math.ceil(result.total / this.QueryParams.pagesize);
  }
})