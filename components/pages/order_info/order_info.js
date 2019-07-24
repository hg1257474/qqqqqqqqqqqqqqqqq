// pages/order_info/order_info.js
const {
  ORDER_URL
} = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: "合作伙伴-合同",
    date: "2019年10月24日 12:12:32",
    fee: "4.00",
    remark: "dsssssssssssssssss"

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    const that = this
    wx.request({
      url: ORDER_URL+"/"+options.id,
      success(res) {
        that.setData(res.data)
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
   
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})