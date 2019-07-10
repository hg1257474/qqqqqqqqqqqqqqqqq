// pages/review/review.js
const {
  reviewUrl
} = require('../../utils/config.js')

let serviceId = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    scores: [{
      group: 0,
      score: 0
    }, {
      group: 1,
      score: 0
    }, {
      group: 2,
      score: 0
    }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.request({
      url: reviewUrl,
      success: function(res) {
        if (res.statusCode === 201) {

        }
      },
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

  },
  onStarTap: function({
    target: {
      dataset: {
        group,
        score
      }
    }
  }) {
    this.setData({
      [`scores[${group}].score`]: score + 1
    }, () => {
      console.log(this.data)
    })
  },
  onSubmit: function() {
    wx.createSelectorQuery().select('.comment').fields({
      dataset: true,
      size: true,
      scrollOffset: true,
      properties: ['scrollX', 'scrollY', 'value'],
      computedStyle: ['margin', 'backgroundColor'],
      context: true,
    }, function(res) {
      wx.request({
        url: `https://user.${url}/service/${serviceId}/review`,
        method: "POST",
        data: {
          scores: this.data.scores,
          comment: res.value
        },
        success: function() {
          wx.showToast({
            title: '评价成功',
            mask: true
          })
          setTimeout(() => wx.navigateBack({
            data: -1
          }), 1500)
        },
        fail: function(res) {
          onError(res)
        }
      })
    }).exec()
  }
})