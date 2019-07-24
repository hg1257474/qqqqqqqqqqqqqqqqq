// pages/service/service.js
const {
  CUSTOMER_POINTS_RECORDS_URL
} = require("../../utils/config.js")
Page({
  /**
   * 页面的初始数据
   */
  data: {
    loading: true,
    isNoPointsRecords: false,
    pointsRecords: []
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  },
  onShow() {
    const that = this
    that.setData({ loading: true })
    wx.request({
      url: CUSTOMER_POINTS_RECORDS_URL,
      header: {
        cookie: wx.getStorageSync("sessionId")
      },
      success(res) {
        if (res.data === 403) {
          getApp().globalData.refresh()
          return 1
        }
        that.setData({
          pointsRecords: res.data,
          loading: false
        })
      }
    })
  }
})

// will implement batch pull in the future