//index.js
const {
  url,
  staticUrl
} = require("../../utils/config.js")
// console.log(getApp())
const setSessionId = (res) => {
  console.log(res)
  console.log(res.cookies)
  if (res.cookies) {
    res.cookies.forEach(value => {
      if (value.includes("EGG_SESS")) {
        wx.setStorageSync("sessionId", value.split(";")[0])
      } else {
        console.log(value.match(/=([^;]+);/)[1])
        wx.setStorageSync(value.split("=")[0], JSON.parse(decodeURIComponent(value.match(/=([^;]+);/)[1])))
      }
    })
  } else if (res.header["Set-Cookie"]) {
    console.log(res.header["Set-Cookie"])
    wx.setStorageSync("sessionId", res.header["Set-Cookie"].match(/EGG_SESS=([^;]+)/)[0])
    wx.setStorageSync("vip", res.header["Set-Cookie"].match(/asd/))
  }
  console.log(wx.getStorageSync("sessionId"))
  console.log(wx.getStorageSync("vip"))
  console.log(wx.getStorageSync("isAllInfo"))
}
Page({
  data: {
    modal: {
      category: null,
      service: null,
      show: false,
      currentTab: 0, // swichNav切换
    },
    category: 0,
    categories: undefined,
    servicesGroup: undefined

  },
  onShow() {
    // console.log(wx.getStorageSync("sessionId"))
    const {
      globalData
    } = getApp()
    let flag = true
    if (globalData.index && globalData.index.shouldCompleteInfo) {
      flag = false;
      globalData.index = { ...globalData.index,
        shouldCompleteInfo: false
      }
    }
    if (flag && this.data.modal.show) this.setData({
      modal: {
        category: null,
        service: null,
        show: false
      }
    });
  },
  onReady() {
    const that = this
    const indexPage = wx.getStorageSync("indexPage") || {
      timestamp: null
    }
    let sessionId = wx.getStorageSync("sessionId")
    wx.login({
      success: function(res) {
        wx.request({
          header: {
            cookie: sessionId
          },
          url: `${staticUrl}/indexPage?timestamp=${indexPage.timestamp}&jsCode=${res.code}`,
          success: function(res) {
            console.log(res)
            setSessionId(res)
            if (res.statusCode === 304) {
              that.setData({
                indexPage: indexPage
              })
            } else {
              wx.setStorageSync("indexPage", res.data)
              that.setData({
                indexPage: res.data
              })
            };
          }
        });
      }
    })
  },
  ontap() {
    const query = wx.createSelectorQuery()
    const nodes = query.selectAll(".services-name")
    nodes.boundingClientRect(function(rect) {
      // console.log(rect)
      rect.id // 节点的ID
      rect.dataset // 节点的dataset
      rect.left // 节点的左边界坐标
      rect.right // 节点的右边界坐标
      rect.top // 节点的上边界坐标
      rect.bottom // 节点的下边界坐标
      rect.width // 节点的宽度
      rect.height // 节点的高度
      wx.pageScrollTo({
        scrollTop: rect[2].top,
        duration: 300
      })
    }).exec()

  },
  onChoose: function({

    currentTarget: {
      dataset: {
        category,
        service
      }
    }
  }) {
    //console.log(servicesGroup[category][2][service][0]);
    this.setData({
      modal: {
        service,
        category,
        show: true,
        icon: this.data.indexPage[category][3][service][0],
        name: this.data.indexPage[category][3][service][1],
        content: this.data.indexPage[category][3][service][3]
      }
    }, function() {})
  },
  onPageScroll(e) {
    let that = this
    const query = wx.createSelectorQuery()
    const nodes = query.selectAll(".services-name")
    nodes.boundingClientRect(function(rect) {
      rect.some((value, index) => {
        if (value.top > 0) {
          // console.log(rect)
          if (index !== that.data.category) that.setData({
            category: index
          })
          return true
        }
      })
    }).exec()
  },
  // 定位跳转位置
  onCategoryTap: function({
    currentTarget: {
      dataset: {
        id
      }
    }
  }) {
    console.log(id);
    this.setData({
      category: id
    })
    const query = wx.createSelectorQuery()
    const nodes = query.selectAll(".services-name")
    nodes.boundingClientRect(function(rect) {
      console.log(rect);
      console.log(rect[id].top);
      wx.pageScrollTo({
        scrollTop: rect[id].top,
        duration: 300
      })
    }).exec();

  },
  onClose: function(e) {
    // console.log("close")
    this.setData({
      "modal.show": false,
      "modal.service": null
    })
  },
  onContract: function(e) {
    console.log("contract")
    console.log(this.data)
    const category = this.data.indexPage[this.data.modal.category][1]
    const target = this.data.indexPage[this.data.modal.category][3][this.data.modal.service][1]
    wx.navigateTo({
      url: `/pages/submitService/submitService?category=${category}&target=${target}&method=contract&contract_type_checked=1`
    })
  },
  onCommunication: function(e) {
    // console.log(getApp())
    const that = this
    // console.log(wx.getStorageSync("customer"))
    if (wx.getStorageSync("customer").isAllInfo) {
      if (wx.getStorageSync("customer").vip.kind !== "普通" || wx.getStorageSync("fake")) wx.navigateTo({
        url: `/pages/question/question?category=${this.data.modal.category}&name=${this.data.modal.service}&type=0`
      })
      else wx.showModal({
        title: '您不是会员',
        content: '请你在充值会员后再进行此操作',
        confirmText: '充值',
        confirmColor: 'green',
        cancelText: '取消',
        cancelColor: 'gray',
        success(res) {
          if (res.confirm) {
            // console.log('用户点击确定')
            let index = getApp().globalData.index || {}
            getApp().globalData.index = {
              ...index,
              callback: () => {
                wx.navigateTo({
                  url: `/pages/question/question?category=${that.data.modal.category}&name=${that.data.modal.service}&type=0`
                })
              }
            }
            wx.navigateTo({
              url: `/pages/pay/pay`
            })
          }
        }
      })

    } else {
      wx.showToast({
        title: '请您先完善身份信息',
        icon: "none"
      });
      setTimeout(() => {
        const {
          globalData
        } = getApp()
        globalData.index = {
          ...globalData.index,
          shouldCompleteInfo: true
        }
        wx.switchTab({
          url: '/pages/user/user',
        })
      }, 1500)
    }
  },
});