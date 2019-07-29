//index.js
const {
  url,
  CUSTOMER_LOGIN_URL
} = require("../../utils/config.js")
deviceHeight = 0
// console.log(getApp())
const setSessionId = (res) => {
  console.log(res)
  console.log(res.cookies)
  if (res.cookies && res.cookies.length) {
    if (res.cookies[0].value) wx.setStorageSync("sessionId", `EGG_SESS=${res.cookies[0].value}`)
    else wx.setStorageSync("sessionId", res.cookies[0].split(";")[0])
  } else {
    for (let key in res.header) {
      console.log(key.toLowerCase())
      if (key.toLowerCase() === "set-cookie") {
        const _temp = res.header[key]
        wx.setStorageSync("sessionId", _temp.match(/EGG_SESS=[^;]+/)[0])
      }
    }
  }
}
let isScrolling = true
Page({
  data: {
    scrollTop: 0,
    isLoading: true,
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
    console.log(getApp().globalData.indexPage)
    // console.log(wx.getStorageSync("sessionId"))
    if (getApp().globalData.indexPage.paymentCallback) delete getApp().globalData.indexPage.paymentCallback
    if (getApp().globalData.indexPage.shouldCompleteInfo) {
      if (getApp().globalData.indexPage.shouldCompleteInfo === "completed") this.onCommunication()
      delete getApp().globalData.indexPage.shouldCompleteInfo
    } else this.setData({
      modal: {
        category: null,
        service: null,
        show: false
      }
    });

  },
  cacheImg(img) {
    const that = this
    const FileSystemManager = wx.getFileSystemManager()
    return new Promise(resolve => {
      const downloadImg = () => new Promise(resolve => {
        console.log(`${url}/resource/indexPage/${img[1]}/${img[0]}`)
        wx.downloadFile({
          url: `${url}/resource/indexPage/${img[1]}/${img[0]}`,
          success(res) {
            if (res.statusCode === 200) {
              const result = FileSystemManager.saveFileSync(res.tempFilePath)
              wx.setStorageSync(img[1], {
                path: result
              })
              resolve(result)
            }
          }
        })
      })
      const file = wx.getStorageSync(img[1])
      console.log("ok", img)
      console.log(file)
      if (!file.path) downloadImg().then(resolve)
      else try {
        FileSystemManager.accessSync(file.path)
        console.log(1)
        resolve(file.path)
      } catch (e) {
        downloadImg().then(resolve)
      }
    })
  },
  getImage() {
    let total = 0
    let finish = false
    const that = this
    const indexPage = this.data.indexPage;
    return new Promise(resolve => {
      for (let terms of indexPage) {
        for (let term of terms[1]) {
          console.log(term[0])
          total++
          that.cacheImg(term[0]).then(value => {
            total--
            console.log(value)
            term[0] = value
            if (!total && finish) {
              that.setData({
                indexPage
              })
              resolve()
            }
          })
        }
      }
      finish = true
    })
  },
  onReady() {
    wx.getSystemInfo({
      success: function(res) {
        deviceHeight = res.windowHeight;
        console.log(deviceHeight)
      },
    })
    wx.hideTabBar({})
    console.log(wx.getStorageSync("indexPage"))
    console.log(wx.getStorageSync("isAllInfo"))
    console.log(wx.getStorageSync("vip"))
    const that = this
    // const indexPage = wx.getStorageSync("indexPage") || {
    // expires: null
    // }
    let sessionId = wx.getStorageSync("sessionId")
    //console.log(sessionId, indexPage)
    console.log(wx.getStorageSync("indexPageExpires"))
    console.log(wx.getStorageSync("indexPageExpires") || null)
    wx.login({
      success: function(res) {
        wx.request({
          header: {
            cookie: sessionId,
          },
          method: "POST",
          url: CUSTOMER_LOGIN_URL,
          data: {
            jsCode: res.code,
            expires: wx.getStorageSync("indexPageExpires") || null
          },
          success: function(res) {
            console.log(111111111111111111111111)
            console.log(res.data)
            setSessionId(res)
            wx.setStorageSync("isAllInfo", res.data.isAllInfo)
            wx.setStorageSync("vip", res.data.vip)

            console.log(res.data)
            if (res.data.indexPage) {
              wx.setStorageSync("indexPage", {
                content: res.data.indexPage,
                expires: res.data.expires
              })
            }
            that.setData({
              indexPage: wx.getStorageSync("indexPage").content
            }, () => {
              that.getImage().then(() => {
                that.setData({
                  isLoading: false
                })
                wx.showTabBar({})
              })
            })
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
    if (category === (this.data.indexPage.length - 1)) {
      console.log("ok")
      wx.navigateTo({
        url: '/pages/watchVedio/watchVedio',
      })
      return
    }
    console.log(category, service)
    //console.log(servicesGroup[category][2][service][0]);
    this.setData({
      modal: {
        service,
        category,
        show: true,
        icon: this.data.indexPage[category][1][service][0],
        name: this.data.indexPage[category][1][service][1],
        content: this.data.indexPage[category][1][service][2] //[3]
      }
    }, function() {})
  },
  onScroll(e) {
    console.log(e)
    console.log("scrolling")
    console.log(isScrolling)
    if (!isScrolling) {
      isScrolling = true
      return 1
    }

    console.log(isScrolling)
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
  move() {},
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
    const that = this
    const query = wx.createSelectorQuery()
    const nodes = query.selectAll(".services-name")
    nodes.boundingClientRect(function(rect) {
      console.log(rect)
      //console.log(rect);
      //console.log(rect[id].top);
      isScrolling = false
      console.log(rect[id].top)
      let target = undefined
      if (rect[0].top > 0) {
        target = rect[id].top
      } else {
        target = -rect[0].top + 0.2467 * deviceHeight + rect[id].top
      }
      console.log("@@")
      console.log(target)
      console.log("@@")
      that.setData({
        scrollTop: target
      })
      wx.pageScrollTo({
        scrollTop: target,
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
    const category = this.data.indexPage[this.data.modal.category][0]
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
      if (wx.getStorageSync("vip") && (wx.getStorageSync("vip").balance || wx.getStorageSync("vip").kind)) wx.navigateTo({
        url: `/pages/submitService/submitService?category=${category}&target=${target}&method=communication`
      })
      else wx.showModal({
        title: '您不是会员',
        content: '请你在充值会员后再进行此操作',
        confirmText: '充值',
        confirmColor: '#008000',
        cancelText: '取消',
        cancelColor: '#808080',
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