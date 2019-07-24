// pages/customer_service/customer_service.js
const {
  LAWYERS_UTL
} = require("../../utils/config.js")
/*
const newServicers = [
  {
    username: 'houqifeng',
    password: 'houqifeng',
    name: '侯其锋',
    avatar: "/images/侯其锋(1).jpg",
    grade: 10,
    serviceTotal: 20,
    expert: '股权设计、股权融资、上市辅导及常年法律顾问服务',
    privilege: { canProcessingService: true }
  },
  {
    username: 'lvzhihe',
    password: 'lvzhihe',
    name: '吕志合',
    avatar: LVZHIHE,
    grade: 10,
    serviceTotal: 20,
    expert: '税法咨询、税收筹划，涉税民事、行政和刑事诉讼案件的代理和辩护',
    privilege: { canProcessingService: true }
  },
  {
    username: 'wangguibin',
    password: 'wangguibin',
    name: '王贵斌',
    avatar: "/images/王贵斌(1).jpg",
    grade: 10,
    serviceTotal: 20,
    expert:
      '特许经营法律、法规、政策咨询，起草、审查特许经营合同，特许经营项目的策划、设计和调研',
    privilege: { canProcessingService: true }
  },
  {
    username: 'duanluyi',
    password: 'duanluyi',
    name: '段鲁艺',
    avatar: "/images/段鲁艺(1).jpg",
    grade: 10,
    serviceTotal: 20,
    expert: '商标、专利、著作权等知识产权的申请、维护、维权',
    privilege: { canProcessingService: true }
  }
];
*/
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    const that=this
    wx.request({
      url: LAWYERS_UTL,
      success(res) {
        
        that.setData({lawyers:res.data.splice(1).concat(res.data[0])})
      }
    })
  },
})