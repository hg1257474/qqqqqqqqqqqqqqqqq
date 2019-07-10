// pages/question/question.js
const {
  questionUrl
} = require("../../utils/config.js")
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    this.setData(options)
    
  },
  onSubmit(event) {
    console.log(event)
    const {
      question
    } = event.detail.value
    if (question.replace(/\s+/g, "") === "") wx.showToast({
      title: '问题内容不能为空',
      icon: "none"
    })
    else {
      const sessionId = wx.getStorageSync('sessionId')
      console.log(sessionId)
      var data={...this.data,question,sessionId}
      wx.request({
        url: questionUrl,
        data,
        header:{cookie:wx.getStorageSync("sessionId").raw},
        method: "POST",
        success(res) {
          console.log(res)
          wx.redirectTo({
            url: `/pages/chat/chat?chatId=${res.data}&formId=${event.detail.formId}`
          })
        }
      })

    }
  }
})