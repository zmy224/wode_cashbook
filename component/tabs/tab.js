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
    periodList: {
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
    changePeriodType(e) {
 
      let a = e.target.dataset
      this.triggerEvent('changePeriodType',{params:a})
    }
  },
  attached() {
  

  }
})
