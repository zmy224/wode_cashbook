//index.js
//获取应用实例
let utils = require('../../utils/util.js')
const app = getApp()

Page({
  data: {
    // 小眼睛
    isShowEye: true,
    originList: [],//  原始数据
    speenList: [],// 列表
    activeTab: 'D',
    periodList: [{
      id: 'D',
      text: '天'
    },
    {
      id: 'W',
      text: '周'
    },
    {
      id: 'M',
      text: '月'
    }
    ]
  },

  onLoad: function () {
    // this.getType();
    // this.getDayList();
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
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
  changePeriodType(e) {
    this.setData({
      activeTab: e.detail.params.type
    })

  },
  // 小眼睛切换事件
  toggleEyes() {
    if (this.data.isShowEye) {
      this.setData({
        isShowEye: false
      })
    } else {
      this.setData({
        isShowEye: true
      })
    }


  },
  getUserInfo: function (e) {
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
        'content-type': 'application/json'
      },
      success(res) {
        console.log(res)
      }
    })
  },
  // 获取花费列表
  getDayList() {
    // 类数组对象：判断他的length是否存在---array.from转换
    wx.cloud.database().collection('spendD').get().then(res => {
      console.log(res, 'resss');
      this.data.originList = res.data || [];
      this.setData({
        originList: res.data,
        speenList: this.groupBy(res.data)
      })
      this.data.speenList = this.groupBy(this.data.originList);
      console.log(this.data.speenList, 'speenList')
    })
  },
  // 数据分组 根据天周月分
  groupBy(list) {
    let filter = {}; // 过滤器 
    let dResultList = [];
    list.forEach(item => {
      item.timeD = utils.formatTime(item.time);
      // filter 存在这一天吗存在就push 不存在就设初始值是【】
      if (!filter[item.timeD]) {
        filter[item.timeD] = []
      }
      filter[item.timeD].push(item);
    })
    for (let key in filter) {
      dResultList.push({
        period: key,
        child: filter[key]
      });
    }
    // return filter 
    // 对象遍历出问题了 还是转换成数组
    // console.log(dResultList,'dResultList')
    return dResultList
  }



})
