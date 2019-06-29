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
  } else {
    for (let key in res.header) {
      console.log(key.toLowerCase())
      if (key.toLowerCase() === "set-cookie") {
        const _temp = res.header[key]
        if (_temp.includes("vip")) wx.setStorage("vip", JSON.parse(decodeURIComponent(_temp.match(/vip=([^;]+);/)[1])))
        if (_temp.includes("isAllInfo")) wx.setStorage("isAllInfo", Boolean(_temp.match(/isAllInfo=([^;]+);/)[1]))
        if (_temp.includes("EGG_SESS")) wx.setStorage("sessionId", _temp.match(/EGG_SESS=[^;]+/)[0])

      }
    }
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
    if (getApp().globalData.indexPage.paymentCallback) delete getApp().globalData.indexPage.paymentCallback
    if (getApp().globalData.indexPage.shouldCompleteInfo) {
      this.onCommunication()
      delete getApp().globalData.indexPage.shouldCompleteInfo
    } else this.setData({
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
      expires: null
    }
    let sessionId = wx.getStorageSync("sessionId")
    wx.login({
      success: function(res) {
        wx.request({
          header: {
            cookie: sessionId,
            "if-modified-since": indexPage.expires
          },
          url: `${staticUrl}/indexPage?jsCode=${res.code}`,
          success: function(res) {
            // console.log(res)
            setSessionId(res)
            if (res.statusCode === 304) {
              that.setData({
                indexPage: indexPage.content
              })
            } else {
              wx.setStorageSync("indexPage", {
                content: res.data,
                expires: res.header["Expires"]
              })
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
    const target = this.data.modal.name
    wx.navigateTo({
      url: `/pages/submitService/submitService?category=${category}&target=${target}&method=contract&contract_type_checked=1`
    })
  },
  onCommunication: function(e) {
    console.log(this.data)
    const category = this.data.indexPage[this.data.modal.category][1]
    const target = this.data.modal.name
    // console.log(getApp())
    const that = this
    // console.log(wx.getStorageSync("customer"))
    if (wx.getStorageSync("isAllInfo")) {
      if (wx.getStorageSync("vip")) wx.navigateTo({
        url: `/pages/submitService/submitService?category=${category}&target=${target}&method=communication`
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
            getApp().globalData.indexPage.paymentCallback = () => wx.navigateTo({
              url: `/pages/submitService/submitService?category=${category}&target=${target}&method=communication`
            })
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
        getApp().globalData.indexPage.shouldCompleteInfo = true
        wx.switchTab({
          url: '/pages/user/user',
        })
      }, 1500)
    }
  },
});