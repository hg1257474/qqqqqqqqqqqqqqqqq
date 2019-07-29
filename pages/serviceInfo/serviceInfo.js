const {
  serviceUrl,
  customerUrl,
  RESOURCE_URL,
  SERVICE_PAY_CONFIG_UTL,
  SERVICE_PAYMENT_STATUS_UTL
} = require('../../utils/config.js')
let serviceFileUrl = null
let serviceId = null
const InitializeData = {
  shouldViewDescription: false,
  shouldViewContact: false,
  shouldViewProcessor: false,
  canMakeComment: false,
  shouldViewComment: false,
}
Page({

  /**
   * 页面的初始数据
   */
  datas: {
    canMakeComment: false,
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
    comment: [0, 0, 0, undefined],
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
    const that = this
    wx.request({
      url: `${SERVICE_PAY_CONFIG_UTL}?id=${serviceId}`,
      header: {
        cookie: wx.getStorageSync("sessionId")
      },
      success(res) {
        if (res.data === 403) {
          getApp().globalData.refresh()
          return 1
        }
        wx.requestPayment({ ...res.data,
          success(res) {
            wx.request({
              url: `${SERVICE_PAYMENT_STATUS_UTL}?id=${serviceId}`,
              success(res) {
                that.setData(res.data)
              }
            })
            console.log(res)
          }
        })
      }
    })
  },
  onPreviewFile(e) {
    const index = e.currentTarget.dataset.index
    /*
    const type = this.data.description[index][0].slice(-4).includes(".") ? this.data.description[index][0].slice(-3) : this.data.description[index][0].slice(-4)
    */
    const filename = this.data.description[index][0]
    let type = ""
    for (let key = filename.length - 1; key > -1; key--) {
      if (filename[key] !== ".") type = filename[key] + type
      else break;
    }
    console.log(type)
    console.log(type)
    const url = `${RESOURCE_URL}/description/${this.data.description[index][2]}/${filename}`
    console.log(url)
    if (["png", "jpg", "gif", "jpeg"].includes(type)) {
      wx.previewImage({
        urls: [url],
        complete(res) {
          console.log("22");
          console.log(res)
        }
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
    console.log(111)
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
        if (res.data === 403) {
          getApp().globalData.refresh()
          return 1
        }
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
            if (res.data === 403) {
              getApp().globalData.refresh()
              return 1
            }
            res.data.isTextDescriptionType = typeof res.data.description === 'string'
            that.setData({ ...InitializeData,
              ...res.data,
              shouldViewComment: true
            })
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