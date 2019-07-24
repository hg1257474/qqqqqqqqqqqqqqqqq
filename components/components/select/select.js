// components/select.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    options: Array, // 简化的定义方式,
    selected:String 
  },
  /**
   * 组件的初始数据
   */
  data: {
    shouldShowOptions: false
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChangeFolding() {
      console.log(this.data)
      this.setData({
        shouldShowOptions: !this.data.shouldShowOptions
      })
    },
    onChoose(e) {
      console.log(e)
      this.setData({
        shouldShowOptions: false,
        selected: e.target.dataset.value
      })
      this.triggerEvent('choose', e.target.dataset.value)
    },
  }
})