// pages/user/user.js
const {
  customerUrl: _customerUrl,
  CUSTOMER_POINTS_TOTAL_URL,
  CUSTOMER_INFO_URL
} = require("../../utils/config.js")
let customerUrl = _customerUrl + "/info"
//const vips = ["普通", "月度", "年度"]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    points: 0,
    shouldShowInfo: false,
    hasChange: false,
    franchiseModes: ['纯直营', '开放他人加盟', '加盟他人'],
    vip: {
      src: "/images/user/vip_normal.png",
      type: "普通会员",
      description: "您当前为普通会员"
    },
    user_points: 2000,
  },
  onHide() {
    if (this.data.shouldShowInfo) this.setData({
      shouldShowInfo: false
    })
    if (getApp().globalData.indexPage.shouldCompleteInfo && !["completed", "back"].includes(getApp().globalData.indexPage.shouldCompleteInfo)) {
      delete getApp().globalData.indexPage.shouldCompleteInfo
    }
  },
  onShow() {
    this.setData({
      isAllInfo: wx.getStorageSync("isAllInfo")
    })
    // console.log(getApp().globalData.indexPage.shouldCompleteInfo)
    if (getApp().globalData.indexPage.shouldCompleteInfo) {
      this.onChangeInfoShow()
    }
    this.getUserVip();
    const that = this
    wx.request({
      url: CUSTOMER_POINTS_TOTAL_URL,
      header: {
        cookie: wx.getStorageSync("sessionId")
      },
      success(res) {
        if (res.data === 403) {
          getApp().globalData.refresh()
          return 1
        }
        that.setData({
          points: res.data
        })
      }
    })
  },
  onInput() {
    this.setData({
      hasChange: true
    })
  },
  getUserVip() {
    const initialization = () => {
      const vip = wx.getStorageSync("vip")
      console.log(vip)
      if (Object.keys(vip).length > 0) {
        let newVip = {}
        if (vip.kind) {
          const expires = new Date(vip.expires)
          newVip = {
            src: `../../images/user/vip_${vip.kind}.png`,
            type: `${vip.kind === "month" ? '月度' : '年度'}会员`,
            description: `会员有效期至 ${expires.getFullYear()}-${expires.getMonth()+1}-${expires.getDate()}`
          }
        } else newVip = {
          ...this.data.vip,
          decription: `剩余可咨询次数${vip.balance}`
        }
        this.setData({
          vip: newVip
        })
      }
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
      url: CUSTOMER_INFO_URL,
      header: {
        cookie: wx.getStorageSync("sessionId")
      },
      method: "GET",
      success(res) {
        if (res.data === 403) {
          getApp().globalData.refresh()
          return 1
        }
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
        url: CUSTOMER_INFO_URL,
        method: "PUT",
        data: info,
        header: {
          cookie: wx.getStorageSync("sessionId")
        },
        success(res) {
          if (res.data === 403) {
            getApp().globalData.refresh()
            return 1
          }
          console.log(res)
          wx.setStorageSync("isAllInfo", res.data)
          that.setData({
            info,
            isAllInfo: res.data,
            shouldShowInfo: false,
            hasChange: false
          })
          if (getApp().globalData.indexPage.shouldCompleteInfo) {
            getApp().globalData.indexPage.shouldCompleteInfo = res.data ? "completed" : "back"
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
          getApp().globalData.indexPage.shouldCompleteInfo = "back"
          wx.switchTab({
            url: '/pages/index/index',
          })
        }
      })
    }
  }
})