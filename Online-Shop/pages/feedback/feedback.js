// pages/feedback/feedback.js

import {request} from "../../request/request.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

Page({

  data: {
    tabs: [
      {
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品、商家投诉",
        isActive: false
      }
    ],
    chooseImgs: [],
    problem_content: ''
  },
  uploadImages: [],

  handleTabsItemChange(e) {
    const {index} = e.detail;
    let {tabs} = this.data;
    tabs.forEach((v,i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    });
  },

  handleChooseImg(e) {
    wx.chooseMedia({
      success: (res) => {
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...res.tempFiles]
        });
      }
    })
  },

  handleRemoveImg(e) {
    const {id} = e.currentTarget.dataset;
    let {chooseImgs} = this.data;
    chooseImgs.splice(id, 1);
    this.setData({
      chooseImgs
    });
  },

  handleTextInput(e) {
    this.setData({
      problem_content: e.detail.value
    });
  },

  handleFormSubmit(e) {
    const {problem_content, chooseImgs} = this.data;
    if(problem_content.trim()) {
      wx.showLoading({
        title: '图片上传中',
        mask: true
      });

      if(chooseImgs.length !== 0) {
        chooseImgs.forEach((v, i) => {
          wx.uploadFile({
            filePath: v.tempFilePath,
            name: 'file',
            url: 'https://images.ac.cn/Home/Index/UploadAction/',
            success: (res) => {
              const url = JSON.parse(res.data).url;
              this.uploadImages.push(url);

              if(i === chooseImgs.length - 1) {
                this.setData({
                  chooseImgs: [],
                  problem_content: ''
                });

                wx.hideLoading();

                wx.navigateBack({
                  delta: 1,
                });
              }
            },
            fail: (err) => {
              console.log(err);
            }
          });
        });
      } else {
        wx.hideLoading();
        wx.navigateBack({
          delta: 1,
        });
      }
    } else {
      wx.showToast({
        title: '输入非法',
        icon: 'none',
        mask: true
      })
    }
  }
})