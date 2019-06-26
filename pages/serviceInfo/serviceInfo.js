const {
  serviceUrl
} = require('../../utils/config.js')
Page({

  /**
   * 页面的初始数据
   */
  datas: {
    description: "asdddddddddddddddddd",
    isTextDescriptionType: true,
    shouldViewDescription: true,
    shouldViewContact: true,
    shouldViewProcessor: true,
    shouldViewComment: true,
    processor: {
      name: "dsdsd",
      serviceTotal: 122,
      grade: 323,
      expert: '餐饮服务、合同咨询'
    },
    status: "待回复",
    name: "合同-咨询",
    contact: {
      name: "dsdsdsdsds",
      phone: 2312312312,
      method: "dingTalk",
      content: "dsdsds"
    },
    payment: [3232,
      true
    ],
    comment: [1, 2, 3, "dsdsds"],
    // 老板信息
  },
  data: {
    shouldViewDescription: false,
    shouldViewContact: false,
    shouldViewProcessor: false,
    shouldViewComment: false,
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
  onLoad: function(options) {
    console.log(options)
    const that = this
    wx.request({
      url: serviceUrl + "/" + options.id,
      success(res) {
        console.log(res.data)
        res.data.isTextDescriptionType = typeof res.data.description === 'string'
        that.setData(res.data)
      }
    })
  },
  radioChange: function(e) {
    this.setData({
      radioCheckVal: e.detail.value
    })
    console.log('radio发生change事件，携带value值为：', e.detail.value)
  },
  //显隐需求描述
  hide_user_note: function(e) {
    let this_val = (e.target.dataset.state === true ? false : true);
    this.setData({
      hide_user_note: this_val,
    })
  },
  //显隐老板信息
  hide_user_info: function(e) {
    let this_val = (e.target.dataset.state === true ? false : true);
    this.setData({
      hide_user_info: this_val,
    })
  },
  // 服务总结
  hide_service_finish: function(e) {
    let this_val = (e.target.dataset.state === true ? false : true);
    this.setData({
      hide_service_finish: this_val,
    })
  },
  // 评价
  hide_evaluate: function(e) {
    let this_val = (e.target.dataset.state === true ? false : true);
    this.setData({
      hide_evaluate: this_val,
    })
  },
  // 律师名片
  hide_lawer_card: function(e) {
    let this_val = (e.target.dataset.state === true ? false : true);
    this.setData({
      hide_lawer_card: this_val,
    })
  },
  /*分配律师*/
  bindPickerChange: function(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },
  // 评级打分
  score_1: function(e) {
    var that = this;
    for (var i = 0; i < that.data.stars1.length; i++) {
      var allItem = 'stars1[' + i + '].flag';
      that.setData({
        [allItem]: 1
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'stars1[' + i + '].flag';
      that.setData({
        [item]: 2
      })
    }
  },
  // 评级打分
  score_2: function(e) {
    var that = this;
    for (var i = 0; i < that.data.stars2.length; i++) {
      var allItem = 'stars2[' + i + '].flag';
      that.setData({
        [allItem]: 1
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'stars2[' + i + '].flag';
      that.setData({
        [item]: 2
      })
    }
  },
  // 评级打分
  score_3: function(e) {
    var that = this;
    for (var i = 0; i < that.data.stars3.length; i++) {
      var allItem = 'stars3[' + i + '].flag';
      that.setData({
        [allItem]: 1
      })
    }
    var index = e.currentTarget.dataset.index;
    for (var i = 0; i <= index; i++) {
      var item = 'stars3[' + i + '].flag';
      that.setData({
        [item]: 2
      })
    }
  },
  onChangeDescriptionShow() {
    this.setData({
      shouldViewDescription: !this.data.shouldViewDescription
    })
  },
  onChangeProcessorShow() {
    this.setData({
      shouldViewProcessor: !this.data.shouldViewProcessor
    })
  },
  onChangeContactShow() {
    this.setData({
      shouldViewContact: !this.data.shouldViewContact
    })
  },
  onChangeCommentShow() {
    this.setData({
      shouldViewComment: !this.data.shouldViewComment
    })
  }
})