const {
  serviceUrl,
  customerUrl
} = require('../../utils/config.js')
let serviceFileUrl = null
let serviceId = null
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
  onPay() {
    wx.request({
      url: `${customerUrl}/service/${serviceId}/payConfig`,
      header: {
        cookie: wx.getStorageSync("sessionId")
      },
      success(res) {
        wx.requestPayment({ ...res.data,
          success(res) {
            console.log(res)
          }
        })
      }
    })
  },
  onPreviewFile(e) {
    const index = e.currentTarget.dataset.index
    const type = this.data.description[index][0].slice(-4).includes(".") ? this.data.description[index][0].slice(-3) : this.data.description[index][0].slice(-4)
    console.log(type)
    const url = `${serviceUrl}/description/file/data?serviceId=${serviceId}&index=${index}`
    console.log(url)
    if (["png", "jpg", "gif"].includes(type)) {
      wx.previewImage({
        urls: [url]
        ,complete(res){console.log(res)}
      })
    } else {
      wx.downloadFile({
        url: url,
        success(res) {
          console.log(res)
          wx.openDocument({
            fileType: type,
            filePath: res.tempFilePath,
          })
        }
      })
    }
  },
  onDownloadFile(e) {
    wx.navigateTo({
      url: `/pages/download/download?serviceId=${serviceId}&target=description&index=${e.currentTarget.dataset.index}`
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options)
    const that = this
    serviceId = options.id
    serviceFileUrl = `${serviceUrl}/${options.id}`
    wx.request({
      url: serviceUrl + "/" + options.id,
      header: {
        cookie: wx.getStorageSync("sessionId")
      },
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
  // 评级打分
  onRate1: function(e) {
    console.log(e)
    console.log(this.data)
    const comment = this.data.comment.map(item => item)
    comment[0] = e.currentTarget.dataset.index
    this.setData({
      "comment[0]": e.currentTarget.dataset.index
    })
  },
  // 评级打分
  onRate2: function(e) {
    console.log(e)
    console.log(this.data)
    const comment = this.data.comment.map(item => item)
    comment[1] = e.currentTarget.dataset.index
    this.setData({
      "comment[1]": e.currentTarget.dataset.index
    })

  },
  // 评级打分
  onRate3: function(e) {
    console.log(e)
    console.log(this.data)
    const comment = this.data.comment.map(item => item)
    comment[2] = e.currentTarget.dataset.index
    this.setData({
      "comment[2]": e.currentTarget.dataset.index
    })
  },
  onMakeCommentDetail(e) {
    console.log(e)
    console.log(e.detail.value)
    this.setData({
      "comment[3]": e.detail.value
    })
  },
  onMakeComment() {
    const that = this
    console.log(serviceUrl)
    console.log(this.data.comment)
    wx.request({
      url: serviceUrl + "/" + serviceId + "/comment",
      method: "PUT",
      data: this.data.comment,
      success() {
        wx.request({
          url: serviceUrl + "/" + serviceId,
          header: {
            cookie: wx.getStorageSync("sessionId")
          },
          success(res) {
            res.data.isTextDescriptionType = typeof res.data.description === 'string'
            that.setData(res.data)
          }
        })
      }
    })
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