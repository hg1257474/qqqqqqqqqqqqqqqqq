// pages/set_question/set_question.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    "contract_type_checked": '1',        // 沟通方式
    "radioCheckVal": 'vw',
    contract_type: [
      { name: '1', value: '合同审核', src: 'set_question_icon_type_c_active.png', "checked_src": 'set_question_icon_type_c.png', checked: 'true' },
      { name: '2', value: '合同起草', src: 'set_question_icon_type_c_active.png', "checked_src": 'set_question_icon_type_c.png', },
    ],
    lx_type: [
      { name: 'vw', value: '微信', src: 'set_question_icon_wx_active.png', "checked_src": 'set_question_icon_wx.png', checked: 'true' },
      { name: 'dingding', value: '钉钉', src: 'set_question_icon_ding_active.png', "checked_src": 'set_question_icon_ding.png', },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  // 头痛方式
  radioChange: function (e) {
    this.setData({
      radioCheckVal: e.detail.value
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  // 合同类型
  contract_type_change: function(e) {
    console.log(e.detail.value);
    this.setData({
      contract_type_checked: e.detail.value
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
})