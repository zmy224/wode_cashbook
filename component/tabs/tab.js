// component/tabs/tab.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeTab: {
      type: String,
      value: 'D'
    },
    // tab内容
    tabList: {
      type: Array
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeType(e) {
      let a = e.target.dataset
      this.triggerEvent('changeType',{params:a})
    }
  },
  attached() {
  

  }
})
