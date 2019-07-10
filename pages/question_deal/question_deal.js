Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 老板信息
    user_info:{
      name: "张于宴",
      call: "13204628559",
      vw: "zx352463038",
      dingding:"dd_352463038",
    },
    contract_type: "合同起草",    // 合同类型
    question_note: "请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求请输入您的问题或需求",
    service_finish:"输入总结的东西输入总结的东西输入总结的东西输入总结的东西输入总结的东西输入总结的东西输入总结的东西输入总结的东西输入总结的东西输入总结的东西输入总结的东西输入总结的东西",
    radioCheckVal: 'vw',        // 沟通方式选中
    // 沟通方式
    items: [            
      { name: 'vw', value: '微信', src: 'set_question_icon_wx_active.png', "checked_src":'set_question_icon_wx.png', checked: 'true'},
      { name: 'dingding', value: '钉钉', src: 'set_question_icon_ding_active.png', "checked_src": 'set_question_icon_ding.png',},
    ],
    hide_user_note: true,   // 需求描述 控制
    hide_user_info: true,   // 老板信息 控制
    array: ['王律师', '张律师', '刘律师', '徐律师'],    // 分配律师
    index: 0,                                         // 分配律师选中
    submit_price:2000,  // 给客户报价
    hide_service_finish:true,           //服务总结
  },
  onChoose(e) {
    console.log(e)
    this.setData({
      "info.franchiseMode": e.detail
    })
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
  radioChange: function (e) {
    this.setData({
      radioCheckVal: e.detail.value
    }) 
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  //显隐需求描述
  hide_user_note: function (e) {
    let this_val = (e.target.dataset.state === true ? false : true);
    this.setData({
      hide_user_note: this_val,
    })
  },
  //显隐老板信息
  hide_user_info: function (e) {
    let this_val = (e.target.dataset.state === true? false:true);
    this.setData({
      hide_user_info: this_val,
    })
  },
  // 服务总结
  hide_service_finish: function (e) {
    let this_val = (e.target.dataset.state === true ? false : true);
    this.setData({
      hide_service_finish: this_val,
    })
  },
  /*分配律师*/
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
})