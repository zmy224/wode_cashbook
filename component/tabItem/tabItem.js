// component/tabItem.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    tabList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    screenWidth: '',
    contentScrollW: '',
    curIndex: 0, // 当前选中
    scrollLeft:'',
  },
  // 组件里面是attach生命周期
  attached() {
    // 获取缓存里的屏幕尺寸
    //  let screenWidth = wx.setStorageSync('screenWidth')
    let screenWidth = wx.getSystemInfoSync().windowHeight;
    this.setData({
      screenWidth: screenWidth
    })

    // this.getScrollW()
  },


  /**
   * 组件的方法列表
   */
  methods: {
    tabClick(e) {    debugger;
      // 获取当前点击元素的index  和id
      let { id, index } = e.target.dataset;
      // 获取当前点击的元素dom
  
      // 小程序中拿不到document
      // this.setData({
      //   curIndex:index,
      //   scrollLeft:index  * this.data.tabList[index].width
      // })

   
      // 效果一(当前点击子元素靠左展示)  局限性：子元素宽度相同
    //  this.scrollLeft = index  * this.data.tabList[index].width
  
      // 获取元素的scrollleft
      //  1、 拿到手机屏幕宽度 
      //  2、 拿到元素的宽度
      //  2、 计算当前点击项的scrollLeft 有没有大于屏幕宽带的一半
      //  3、 大于一半则需要计算当前应该滚动的距离 重新设置scrollLeft
      //  4、 怎么知道应该滚动距离
    },
    // getScrollW() {
    //   let that = this;
    //   const query = wx.createSelectorQuery().in(this);
  
    //   query.select('.content-scroll').boundingClientRect(data => {
    
    //     this.setData({
    //       contentScrollW:data.width
    //     })
     
    //   }).exec();
  
    //   query.selectAll('.tab-item').boundingClientRect(data => {
    //     let dataLen = data.length;
    //     for (let i = 0; i < dataLen; i++) {
       
    //       console.log(this.data.tabList,'tabList')
    //       this.data.tabList[i].left = data[i].left;

    //       this.data.tabList[i].width = data[i].width
    //     }
    //   }).exec()
    // },
  
  },

    
})
