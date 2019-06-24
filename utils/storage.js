const {
  onError
} = require('./util.js')
const {
  url
} = require('./config.js')
exports.myGetStorage = (key, callback) => {
  try {
    const value = wx.getStorageSync(key)
    wx.request({
      url: `${url}static/${key}?update=${value.timestamp}`,
      success: ({ data }) => {
        console.log(data)
        if (data !== "newest") {
          try {
            wx.setStorageSync(key, data)
            callback(data.data)
          } catch (e) {
            onError(e)
          }
        } else callback(value.data)
      },
      fail: onError
    })
  } catch (e) {
    onError(e)
  }
}

exports.myGetStorage = (key, callback) => {
  try {
    const value = wx.getStorageSync(key)
    wx.request({
      url: `${url}static/${key}?update=${value.timestamp}`,
      success: ({data}) => {
        console.log(data)
        if (data !== "newest") {
          try {
            wx.setStorageSync(key, data)
            callback(data.data)
          } catch (e) {
            onError(e)
          }
        } else callback(value.data)
      },
      fail: onError
    })
  } catch (e) {
    onError(e)
  }
}