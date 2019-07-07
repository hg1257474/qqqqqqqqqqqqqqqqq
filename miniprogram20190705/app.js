//app.js
App({
  onLaunch(options) {
    wx.setStorageSync("fake", false)

  },
  globalData: {
    indexPage:{}
  }
})