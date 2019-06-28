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
    if (["png", "jpg", "gif"].includes(type)) {
      wx.previewImage({
        urls: [`${serviceFileUrl}/file/${index}`]
      })
    } else {
      wx.downloadFile({
        url: `${serviceFileUrl}/file/${index}`,
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
    const index = e.currentTarget.dataset.index
    wx.downloadFile({
      url: `${serviceFileUrl}/file/${index}`,
      success(res) {
        const fileSystemManager = wx.getFileSystemManager()
        fileSystemManager.saveFileSync(res.tempFilePath)
        /*
        FileSystemManager.saveFile({
          tempFilePath:res.tempFilePath,
          complete(res){
            console.log(res)
          }
        })
        */
      }
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