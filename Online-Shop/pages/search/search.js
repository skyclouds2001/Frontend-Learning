// pages/search/search.js

import {request} from "../../request/request.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  data: {
    goods: [],
    isFocus: false,
    inputValue: ''
  },
  timeid: -1,

  handleInput(e) {
    const {value} = e.detail;
    if(value.trim()) {
      this.setData({
        isFocus: true
      });
      clearTimeout(this.timeid);
      this.timeid = setTimeout(() => {
        this.search(value);
      }, 1000);
    } else {
      this.setData({
        isFocus: false,
        goods: []
      });
    }
  },

  async search(query) {
    const res = await request({
      url: '/goods/qsearch',
      data: {
        query
      }
    });
    this.setData({
      goods: res
    });
  },

  handleCancel() {
    this.setData({
      inputValue: '',
      isFocus: false,
      goods: []
    });
  }
})