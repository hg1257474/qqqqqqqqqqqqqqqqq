//app.js
App({
  onLaunch(options) {
    wx.setStorageSync("fake", false)
    console.log("refresh")
    console.log("refresh")
  },
  globalData: {
    indexPage:{},
    refresh(){
      wx.reLaunch({
        url: '/pages/index/index',
      })
    }
  }
})