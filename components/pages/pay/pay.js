// pages/pay/pay.js
const {
  cacheUrl,
  payUrl,
  staticUrl,
  CUSTOMER_CONSULTING_PRICE_URL,
  CUSTOMER_VIP_URL,
  customerUrl
} = require('../../utils/config.js')
const names = ["单次咨询", "包月会员", "包年会员"]
const descriptions = [{
  balance: 1
}, {
  monthVip: true
}, {
  yearVip: true
}]
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: '0',
  },
  onReady: function() {
    const that = this
    const payPage = wx.getStorageSync("payPage") || {
      expires: null
    }
    wx.request({
      header: {
        "if-modified-since": payPage.expires,
        cookie:wx.getStorageSync("sessionId")
      },
      url: CUSTOMER_CONSULTING_PRICE_URL,
      success: function(res) {
        if (res.data === 403) {
          getApp().globalData.refresh()
          return 1
        }
        if (!res.data.payPage) {
          that.setData({
            payPage: payPage.content,
            points:res.data.points
          })
        } else {
          wx.setStorageSync("payPage", {
            content: res.data.payPage,
            expires: res.header["expires"]
          })
          that.setData({
            payPage: res.data.payPage,
            points:res.data.points
          })
        };
      }
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */

  onTap: function({
    currentTarget: {
      dataset: {
        id
      }
    }
  }) {
    this.setData({
      category: id
    })
  },
  onPay() {
    const that = this

    wx.request({
      url: CUSTOMER_VIP_URL,
      method: "put",
      data: {
        name: names[this.data.category],
        description: descriptions[this.data.category],
        totalFee: this.data.payPage[this.data.category][0]
      },
      header: {
        cookie: wx.getStorageSync("sessionId")
      },
      success(res) {
        if (res.data === 403) {
          getApp().globalData.refresh()
          return 1
        }
        wx.requestPayment({ ...res.data,
          success() {
            wx.request({
              url: CUSTOMER_VIP_URL,
              method: "get",
              header: {
                cookie: wx.getStorageSync("sessionId")
              },
              success(res) {
                if (res.data === 403) {
                  getApp().globalData.refresh()
                  return 1
                }
                wx.setStorageSync("vip", res.data)
                getApp().globalData.indexPage.paymentCallback()
              }
            })
          },
          fail(res) {
            console.log(res)
          }
        })
      },
      fail(res) {
        console.log(res)
      }
    })
  }
})