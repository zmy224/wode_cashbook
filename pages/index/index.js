//index.js
//获取应用实例
let utils = require('../../utils/util.js')
const app = getApp()
let dayjs = require('dayjs')
import { getSpendDailyApi } from '../../server/api/index'
Page({
  data: {
    // 小眼睛
    isShowEye: true,
    originList: [],//  原始数据
    speenList: [],// 列表
    activeTab: 'D',
    date: '',
    showMonth: '',  // 月
    showYear: '',// 年
  },
  watch: {
    date: function (newVal, oldVal) {
      console.log(newVal, oldVal);
      let Month = newVal.split('-')[1];
      let year = newVal.split('-')[0];
      // let  shortName = newVal.substring(newValLength-2,newValLength);
      this.setData({
        showMonth: Month,
        showYear: year
      })
    }
  },
  bindDateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  onLoad: function () {
    var s = dayjs().format('YYYY-MM-DD');
    getApp().setWatcher(this); // 设置监听器
    let date = new Date();
    let year = date.getFullYear();
    let month = (date.getMonth() + 1).toString().padStart(2, '0');

    this.setData({
      date: year + '-' + month
    })
    this.getDayList();
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },

  // 获取花费列表
  getDayList() {
    const that = this;
    let params = {
      pageSize: 10,
      currentPage: 1,
    }
    getSpendDailyApi(params).then(res => {
      console.log(res.data, '99999');
      res.data.forEach(_ => {
        _.date = _.dateTime.slice(0, 10)
      })
      that.setData({
        originList: res.data,
        speenList: res.data// that.groupBy(res.data)
      })
    })
  },
  // 数据分组 根据天周月分
  groupBy(list) {
    let filter = {}; // 过滤器 
    let dResultList = [];
    list.forEach(item => {
      item.timeD = item.date.slice(0, 10);
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
