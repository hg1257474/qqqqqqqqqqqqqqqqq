// pages/user/user.js
const {
  _customerUrl
} = require("../../utils/config.js")
let customerUrl=_customerUrl+"/info"
//const vips = ["普通", "月度", "年度"]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shouldShowInfo: false,
    hasChange: false,
    franchiseModes: ['纯直营', '开放他人加盟', '加盟他人'],
    vip: {
      src: "/images/user/vip_normal.png",
      type: "普通会员"
    },
    user_points: 2000,
  },
  onShow() {
    if (getApp().globalData.indexPage.shouldCompleteInfo) {
      this.updateInfo()
    }
    this.getUserVip();
  },
  onInput() {
    this.setData({
      hasChange: true
    })
  },
  getUserVip() {
    const initialization = () => {
      const vip = wx.getStorageSync("vip")
      if(vip) this.setData({
        vip: {
          src: `../../images/user/vip${vip ? "_normal" : "_normal"}.png`,
          type: vip.kind + "会员"
        }
      })
    }
    initialization()
  },
  onChoose(e) {
    console.log(e)
    this.setData({
      "info.franchiseMode": e.detail
    })
  },
  updateInfo() {
    if (this.data.info) {
      this.setData({
        shouldShowInfo: true,
      })
      return
    }
    const that = this
    wx.request({
      url: customerUrl + "/info",
      header: {
        cookie: wx.getStorageSync("sessionId")
      },
      method: "GET",
      success(res) {
        that.setData({
          shouldShowInfo: true,
          info: res.data
        })
      }
    })
  },
  onSubmit(e) {

    console.log(e)
    const {
      globalData
    } = getApp()
    if (this.data.hasChange) {
      const that = this
      const info = e.detail.value
      info.franchiseMode = this.data.info.franchiseMode
      wx.request({
        url: customerUrl,
        method: "PUT",
        data: info,
        header: {
          cookie: wx.getStorageSync("sessionId")
        },
        success(res) {
          console.log(res)
          const customer = wx.getStorageSync("customer")
          customer.info = info
          customer.isAllInfo = res.data
          wx.setStorageSync("customer", customer)
          that.setData({
            info,
            shouldShowInfo: false,
            hasChange: false
          })
          if (globalData.index && globalData.index.shouldCompleteInfo) wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
    } else this.setData({
      shouldShowInfo: false
    }, () => {
      if (globalData.index && globalData.index.shouldCompleteInfo) wx.switchTab({
        url: '/pages/index/index',
      })
    })
  }
})