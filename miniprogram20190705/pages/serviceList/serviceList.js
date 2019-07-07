// pages/service/service.js
const {
  serviceListUrl
} = require("../../utils/config.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isNoServices: false,
    services: []
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },
  onShow(){
    const that = this
    wx.request({
      url: serviceListUrl,
      header: {
        cookie: wx.getStorageSync("sessionId")
      },
      success(res) {
        that.setData({
          services: res.data
        })
      }
    })
  }
})

// will implement batch pull in the future