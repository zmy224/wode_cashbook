// component/singleItem/singleItem.js


Component({
  /**
   * 组件的属性列表
   */
  properties: {
    dayDetail:{
      type:Object,
      value:''
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
 
  },
  onLoad: function () {
   console.log(this.properties.dayDetail,'ffffff')
  },
})
