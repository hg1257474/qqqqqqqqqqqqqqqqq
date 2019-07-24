// pages/service/service.js
const {
  CUSTOMER_ORDERS_URL
} = require("../../utils/config.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isNoServices: false,
    loading:true,
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
      url: CUSTOMER_ORDERS_URL,
      header: {
        cookie: wx.getStorageSync("sessionId")
      },
      success(res) {
        if (res.data === 403) {
          getApp().globalData.refresh()
          return 1
        }
        that.setData({
          orders: res.data,
          loading:false
        })
      }
    })
  }
})

// will implement batch pull in the future