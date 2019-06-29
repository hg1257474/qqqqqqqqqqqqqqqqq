

// pages/set_question/set_question.js
const {
  serviceUrl,
  fileUploadUrl
} = require("../../utils/config.js")
let tempFileId=null
Page({

  /**
   * 页面的初始数据
   */
  data: {
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
  onLoad: function(options) {
    if (!this.data.hasInitializaed) {
      console.log("DDDDDDDDDDDDDDDDD")
      options.hasInitializaed = true;
      this.setData(options)
    }
  },
  onDeleteFile: function(e) {
    const that = this
    const id = e.currentTarget.dataset.id
    wx.request({
      url: fileUploadUrl + "/" + id,
      method: "DELETE",
      success(res) {
        const files = that.data.files.filter(item => item[2] !== id)
        that.setData({
          files
        })
      }
    })
  },
  onShow() {
    this.onLoad()
    const that = this
    if (tempFileId) {
      wx.request({
        url: fileUploadUrl + "/summary/" + tempFileId,
        method: "GET",
        success(res) {
          console.log(res.data)
          console.log(that.data)
          res.data.push(tempFileId)
          console.log(that.data.files)
          that.data.files.push(res.data)
          tempFileId = null
          console.log(that.data.files)
          const newFiles=that.data.files.map(item=>item)
          console.log(newFiles)
          
          that.setData({
            files: newFiles
          })
          
        }
      })
    }
  },
  onChooseFile: function(options) {
    const that = this
    wx.request({
      url: fileUploadUrl,
      method: "POST",
      success(res) {
        console.log(res)
        tempFileId = res.data
        console.log("f")
        wx.navigateTo({
          url: "/pages/fileUpload/fileUpload?id=" + res.data
        })
       
      }
    })
  },
  onSubmit(e) {
    console.log(e)
    const value = e.detail.value
    wx.request({
      url: serviceUrl,
      header: {
        cookie: wx.getStorageSync("sessionId")
      },
      method: "POST",
      data: {
        name: [
          this.data.category,
          this.data.target,
          this.data.method,
          this.data.contract_type_checked === "1" ? 'review' : 'draft'
        ],
        contact: {
          name: value.name,
          phone: value.phone,
          method: this.data.radioCheckVal === "vw" ? 'weChat' : 'dingTalk',
          content: this.data.radioCheckVal === 'vw' ? value.weChat : value.dingTalk
        },
        description: this.data.contract_type_checked === "1" ? this.data.files : value.detail
      },
      success(res) {
        if (res.statusCode === 201) {
          console.log(res.data)
          console.log(res.data===null)
          if(res.data===null){
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