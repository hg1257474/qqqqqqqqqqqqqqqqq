// pages/pay/pay.js
const {
  communication,
  contract,
  fee
} = require('./other')
const {
  cacheUrl,
  payUrl,
  customerUrl
} = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shouldPayContract: undefined,
    totalFee: undefined,
    service: undefined,
    category: '0',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    const that = this
    if (options.shouldPayContract) {
      wx.request({
        url: `${payUrl}`,
        header: {
          cookie: "sessionId=" + wx.getStorageSync("sessionId").value
        },
        method: "POST",
        data: options,
        success(res) {
          console.log(res)
          that.setData({ ...options,
            ...res.data
          })
        }
      })
    }
  },
  onShow() {
    console.log(this.data)

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that = this
    const payPage = wx.getStorageSync("payPage") || {
      timestamp: null
    }
    wx.request({
      url: cacheUrl,
      data: {
        type: "payPage",
        timestamp: payPage.timestamp
      },
      success(res) {
        console.log(res)
        if (res.data) wx.setStorageSync("payPage", res.data)
        console.log(res.data, payPage)
        that.setData(wx.getStorageSync("payPage"))
      }
    })
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
    console.log(that.data.category)
    if (this.data.shouldPayContract) wx.requestPayment({
      ...this.data.param,
      success(res) {
        console.log(res)
        wx.navigateBack({
          delta: "1"
        })
      },
      fail(res) {
        console.log(res)
      }
    })
    else {
      wx.request({
        url: `${payUrl}`,
        method: "post",
        data: {
          category: this.data.category,
        },
        header: {
          cookie: wx.getStorageSync("sessionId").raw
        },
        success(res) {
          console.log(res)

          wx.requestPayment({ ...res.data,
            success() {
              console.log(that.data.category)
              if (that.data.category) {
                const vip = {
                  kind: that.data.category === 2 ? "年度" : "月度"
                }
                wx.request({
                  url: customerUrl+"/vip",
                  method: "put",
                  data: vip,
                  header: {
                    cookie: wx.getStorageSync("sessionId").raw
                  },
                  success() {
                    const customer = wx.getStorageSync("customer")
                    customer.vip=vip
                    wx.setStorageSync("customer", customer)
                    getApp().globalData.index.callback()
                  }
                })
              } else getApp().globalData.index.callback()
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
  }
})