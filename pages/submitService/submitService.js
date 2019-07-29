// pages/set_question/set_question.js
const {
  serviceUrl,
  CUSTOMER_DEFAULT_CONTACT_URL,
  UPLOAD_FILE_URL,
  SERVICE_FILE_URL,
  fileUploadUrl
} = require("../../utils/config.js")
let tempFileId = null
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shouldChooseUploadMethod: false,
    files: [],
    method: 'contract',
    "contract_type_checked": '1', // 沟通方式
    "radioCheckVal": 'vw',
    contract_type: [{
        name: '1',
        value: '合同审核',
        src: 'set_question_icon_type_c_active.png',
        "checked_src": 'set_question_icon_type_c.png',
        checked: 'true'
      },
      {
        name: '2',
        value: '合同起草',
        src: 'set_question_icon_type_c_active.png',
        "checked_src": 'set_question_icon_type_c.png',
      },
    ],
    lx_type: [{
        name: 'vw',
        value: '微信',
        src: 'set_question_icon_wx_active.png',
        "checked_src": 'set_question_icon_wx.png',
        checked: 'true'
      },
      {
        name: 'dingding',
        value: '钉钉',
        src: 'set_question_icon_ding_active.png',
        "checked_src": 'set_question_icon_ding.png',
      },
    ],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onReady() {
    const that = this
    wx.request({
      url: CUSTOMER_DEFAULT_CONTACT_URL,
      header: {
        cookie: wx.getStorageSync("sessionId")
      },
      success(res) {
        if (res.data === 403) {
          getApp().globalData.refresh()
          return 1
        }
        that.setData(res.data)
      }
    })
  },
  onLoad: function(options) {
    console.log(options)
    console.log(this.data)
    // hasInitializaed 
    if (!this.data.hasInitialized1) {
      console.log("DDDDDDDDDDDDDDDDD")
      options.hasInitialized1 = true;
      this.setData(options)
    }
  },
  onDeleteFile: function(e) {
    const that = this
    const id = e.currentTarget.dataset.id
    this.setData({
      files: this.data.files.filter(item => item[2] !== id)
    })
  },
  onShow() {
    // this.onLoad()
    const that = this
    if (tempFileId) {
      wx.request({
        url: `${SERVICE_FILE_URL}?tempFileId=${tempFileId}`,
        success(res) {
          that.data.files.push(res.data)
          that.setData({
            files: that.data.files
          })
        }
      })
    }
  },
  onChooseFile: function(e) {
    const that = this
    console.log(e.detail.value)
    if (e.detail.value == 1)
      wx.request({
        url: SERVICE_FILE_URL,
        method: "POST",
        success(res) {
          tempFileId = res.data
          wx.navigateTo({
            url: "/pages/fileUpload/fileUpload?id=" + res.data
          })

        }
      })
    else wx.chooseMessageFile({
      count: 1,
      success(res) {
        const file = res.tempFiles[0]
        wx.uploadFile({
          url: `${SERVICE_FILE_URL}?isDirect=true`,
          name: file.name,
          filePath: file.path,
          success(res) {
            that.data.files.push([file.name, file.size, res.data])
            that.setData({
              files: that.data.files
            })
          }
        })
      }
    })
  },
  onSubmit(e) {
    console.log(e)
    const value = e.detail.value
    const name = [
      this.data.category,
      this.data.target,
      this.data.method
    ]
    if (this.data.method !== "communication") name.push(this.data.contract_type_checked === "1" ? 'review' : 'draft')
    wx.request({
      url: serviceUrl,
      header: {
        cookie: wx.getStorageSync("sessionId")
      },
      method: "POST",
      data: {
        name,
        contact: {
          name: value.name,
          phone: value.phone,
          method: this.data.radioCheckVal === "vw" ? 'weChat' : 'dingTalk',
          content: this.data.radioCheckVal === 'vw' ? value.weChat : value.dingTalk
        },
        description: (this.data.method !== "communication" && this.data.contract_type_checked === "1") ? this.data.files : value.detail
      },
      success(res) {
        if (res.data === 403) {
          getApp().globalData.refresh()
          return 1
        }
        if (res.statusCode === 201) {
          console.log(res.data)
          console.log(res.data === null)
          if (res.data === null) {
            wx.removeStorageSync("vip")
          }
          wx.switchTab({
            url: '/pages/serviceList/serviceList',
          })
        }
      }
    })
  },
  // 合同方式
  radioChange: function(e) {
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