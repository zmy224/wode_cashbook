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

    speenList: [],// 列表
    activeTab: 'D',
    date: '',  // 日期   年月 
    currentPage: 1,// 做分页使用 当前页
    showMonth: '',  // 月
    showYear: '',// 年
    hasMore: true,// 是否加载下一页
  },
  watch: {
    date: function (newVal, oldVal) {
      let Month = newVal.split('-')[1];
      let year = newVal.split('-')[0];
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
    let date = dayjs(new Date()).format('YYYY-MM');;
    // let year = date.getFullYear();
    // let month = (date.getMonth() + 1).toString().padStart(2, '0');

    this.setData({
      date: date
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
    console.log(that.data.hasMore,'that.data.hasMore')
    if (!that.data.hasMore) return;
    // 显示导航栏loading
    wx.showNavigationBarLoading();
    let params = {
      pageSize: 10,
      currentPage: this.data.currentPage++
    }
    getSpendDailyApi(params).then(res => {
      // 判断当前返回条数是不是》= 当前size
      res.data.list.forEach(_ => {
        _.date = _.dateTime.slice(0, 10)
      })
      that.setData({
        speenList: that.data.speenList.concat(res.data.list),
        hasMore: res.data.list.length >= 10  // 大于等于表示true 还有下一页
      })

      // 隐藏导航栏loading
      wx.hideNavigationBarLoading();
      // 当处理完数据刷新后，wx.stopPullDownRefresh可以停止当前页面的下拉刷新
      wx.stopPullDownRefresh();
    })
  },
  // 下拉刷新
  onPullDownRefresh() {
    this.setData({
      currentPage: 1,
    }, () => {

      this.getDayList()
    })
  },

  onReachBottom(){
    const that  = this;
    console.log(that.data.hasMore,'that.data.hasMore')
  if (!that.data.hasMore) return;
   this.getDayList()
  }

})
