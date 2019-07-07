// pages/service/service.js
const {
  CREDITS_URL
} = require("../../utils/config.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isNoServices: false,
    orders: []
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
  },
  onShow(){
    const that = this
    wx.request({
      url: ORDER_LIST_URL,
      header: {
        cookie: wx.getStorageSync("sessionId")
      },
      success(res) {
        that.setData({
          orders: res.data
        })
      }
    })
  }
})

// will implement batch pull in the future