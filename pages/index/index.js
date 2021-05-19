//index.js
//获取应用实例

const app = getApp()

Page({
  data: {
    // 小眼睛
   isShowEye:true
  },
 
  onLoad: function () {
    // this.getType();
    this.getDayList();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  // 小眼睛切换事件
  toggleEyes(){
    if (this.data.isShowEye){
      this.setData({
        isShowEye: false
      })
    }else  {
      this.setData({
        isShowEye: true
      })
    }
  
   
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  // 测试获取接口数据
  getType() {
  let that = this;
  wx.request({
    url: 'http://localhost:3306/getType',
    // method: 'GET',
    data: {},
    header: {
      'content-type':'application/json'
    },
    success(res) {
      console.log(res)
    }
  })
},
// 获取花费列表
getDayList(){
  wx.cloud.database().collection('spendD').get().then(res=>{
    console.log(res,'resss');
  })
}



})
