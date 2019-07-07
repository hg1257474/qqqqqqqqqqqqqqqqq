// pages/user/user.js
const {
  customerUrl: _customerUrl
} = require("../../utils/config.js")
let customerUrl = _customerUrl + "/info"
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
  onHide() {
    if (getApp().globalData.indexPage.shouldCompleteInfo && getApp().globalData.indexPage.shouldCompleteInfo !== "completed") {
      delete getApp().globalData.indexPage.shouldCompleteInfo
    }
  },
  onReady() {
    this.setData({
      isAllInfo: wx.getStorageSync("isAllInfo"),
      score: wx.getStorageSync("score")
    })
  },
  onShow() {
    // console.log(getApp().globalData.indexPage.shouldCompleteInfo)
    if (getApp().globalData.indexPage.shouldCompleteInfo) {
      this.onChangeInfoShow()
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
      if (vip && vip.kind) this.setData({
        vip: {
          src: `../../images/user/vip${vip ? "_normal" : "_normal"}.png`,
          type: `${vip.kind==="month"?'月度':'年度'}会员`
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
  onChangeInfoShow() {
    if (this.data.info) {
      this.setData({
        shouldShowInfo: true,
      })
      return
    }
    const that = this
    console.log(wx.getStorageSync("sessionId"))
    wx.request({
      url: customerUrl,
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
          wx.setStorageSync("isAllInfo", res.data)
          that.setData({
            info,
            isAllInfo: res.data,
            shouldShowInfo: false,
            hasChange: false
          })
          if (getApp().globalData.indexPage.shouldCompleteInfo) {
           // getApp().globalData.indexPage.shouldCompleteInfo = "completed"
            wx.switchTab({
              url: '/pages/index/index',
            })
          }
        }
      })
    } else {

      this.setData({
        shouldShowInfo: false
      }, () => {
        if (getApp().globalData.indexPage.shouldCompleteInfo) {
          getApp().globalData.indexPage.shouldCompleteInfo = "completed"
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
    }
  }
})