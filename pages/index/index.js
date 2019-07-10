//index.js
const {
  categories,
  servicesGroup
} = require('./other')
const {
  url,
  cacheUrl
} = require("../../utils/config.js")
const {
  myGetStorage
} = require('../../utils/storage.js')
// console.log(getApp())
Page({
  data: {
    modal: {
      category: null,
      service: null,
      show: false,
      currentTab: 0, 					// swichNav切换
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
    wx.request({
      url: cacheUrl,
      data: {
        type: "indexPage",
        timestamp: indexPage.timestamp
      },
      success: function(res) {
        let back_data = [
          {
            "icon": "../../images/index/index_left_icon_1.png",
            "tittle": "主体设立",
            "tips": "介绍法务官所在律所、法务官团队及餐饮法律咨询服务....",
            "right_part":[
              {
                "icon": "../../images/index/index_right_icon_1.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
              {
                "icon": "../../images/index/index_right_icon_1.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
              {
                "icon": "../../images/index/index_right_icon_1.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
            ]
          },
          {
            "icon": "../../images/index/index_left_icon_2.png",
            "tittle": "合      同",
            "tips": "介绍法务官所在律所、法务官团队及餐饮法律咨询服务....",
            "right_part": [
              {
                "icon": "../../images/index/index_right_icon_2.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
              {
                "icon": "../../images/index/index_right_icon_2.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
              {
                "icon": "../../images/index/index_right_icon_2.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
            ]
          },
          {
            "icon": "../../images/index/index_left_icon_3.png",
            "tittle": "劳动人事",
            "tips": "介绍法务官所在律所、法务官团队及餐饮法律咨询服务....",
            "right_part": [
              {
                "icon": "../../images/index/index_right_icon_3.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
              {
                "icon": "../../images/index/index_right_icon_3.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
              {
                "icon": "../../images/index/index_right_icon_3.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
            ]
          },
          {
            "icon": "../../images/index/index_left_icon_4.png",
            "tittle": "食品安全",
            "tips": "介绍法务官所在律所、法务官团队及餐饮法律咨询服务....",
            "right_part": [
              {
                "icon": "../../images/index/index_right_icon_4.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
              {
                "icon": "../../images/index/index_right_icon_4.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
              {
                "icon": "../../images/index/index_right_icon_4.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
            ]
          },
          {
            "icon": "../../images/index/index_left_icon_5.png",
            "tittle": "融资并购",
            "tips": "介绍法务官所在律所、法务官团队及餐饮法律咨询服务....",
            "right_part": [
              {
                "icon": "../../images/index/index_right_icon_4.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
              {
                "icon": "../../images/index/index_right_icon_4.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
              {
                "icon": "../../images/index/index_right_icon_4.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
            ]
          },
          {
            "icon": "../../images/index/index_left_icon_6.png",
            "tittle": "员工激励",
            "tips": "介绍法务官所在律所、法务官团队及餐饮法律咨询服务....",
            "right_part": [
              {
                "icon": "../../images/index/index_right_icon_4.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
              {
                "icon": "../../images/index/index_right_icon_4.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
              {
                "icon": "../../images/index/index_right_icon_4.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
            ]
          },
          {
            "icon": "../../images/index/index_left_icon_7.png",
            "tittle": "其它问题",
            "tips": "介绍法务官所在律所、法务官团队及餐饮法律咨询服务....",
            "right_part": [
              {
                "icon": "../../images/index/index_right_icon_4.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
              {
                "icon": "../../images/index/index_right_icon_4.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
              {
                "icon": "../../images/index/index_right_icon_4.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
            ]
          },
          {
            "icon": "../../images/index/index_left_icon_8.png",
            "tittle": "争议解决",
            "tips": "介绍法务官所在律所、法务官团队及餐饮法律咨询服务....",
            "right_part": [
              {
                "icon": "../../images/index/index_right_icon_4.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
              {
                "icon": "../../images/index/index_right_icon_4.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
              {
                "icon": "../../images/index/index_right_icon_4.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
            ]
          },
          {
            "icon": "../../images/index/index_left_icon_9.png",
            "tittle": "特许经营",
            "tips": "介绍法务官所在律所、法务官团队及餐饮法律咨询服务....",
            "right_part": [
              {
                "icon": "../../images/index/index_right_icon_4.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
              {
                "icon": "../../images/index/index_right_icon_4.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
              {
                "icon": "../../images/index/index_right_icon_4.jpg",
                "tittle": "合作伙伴",
                "tips": "介绍法务官所在律所，法务官团队及餐饮法律咨询服务....",
              },
            ]
          },
        ];
        // if (res.data) wx.setStorageSync("indexPage", res.data);
        // that.setData(wx.getStorageSync("indexPage"));
        // console.log(wx.getStorageSync("indexPage"));
        that.setData({
          indexPage: back_data,
        });
      }
    });
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
    console.log(servicesGroup[category][2][service][0]);
    this.setData({
      modal: {
        service,
        category,
        show: true,
        icon: servicesGroup[category][2][service][0],
        name: servicesGroup[category][2][service][1],
        content: servicesGroup[category][2][service][3]
      }
    }, function() {
    })
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
    // console.log("contract")
    wx.navigateTo({
      url: `/pages/question/question?category=${this.data.modal.category}&name=${this.data.modal.service}&type=1`
    })
  },
  onCommunication: function(e) {
    // console.log(getApp())
    const that=this
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