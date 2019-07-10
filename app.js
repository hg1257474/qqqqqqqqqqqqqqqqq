//app.js
App({
  onLaunch(options) {
    wx.setStorageSync("fake", false)

  },
  globalData: {
    vip: false,
    info: {
      nickName: "张三"
    }
  }
})