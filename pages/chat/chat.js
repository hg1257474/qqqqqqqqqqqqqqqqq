// pages/chat/page.js
const {
  chatUrl
} = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: undefined
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    const body={sessionId:wx.getStorageSync("sessionId").value,...options}
    console.log(encodeURIComponent(JSON.stringify(body)))
    this.setData({
      src: `${chatUrl}?${encodeURIComponent(JSON.stringify(body))}`
    })

  },
})