// pages/edit/edit.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        periodList: [
            {
                id: 'outcome',
                text: '支出'
            },
            {
                id: 'income',
                text: '收入'
            },
        ],
        fakeTextarea:0,  // 收入支出展示部分
        activeTab: 'outcome',
        //  收入支出种类
        iconList: [],
        showCalc:true
    },
    // 请求收入支出种类列表
    getIconList() {
        wx.cloud.database().collection('inout-type').where({
            type: this.data.activeTab
        }).get().then(res => {
            console.log('请求收入支出种类列表=》', res);
            this.setData({
                iconList: res.data
            })
        })
    },
    // 收入支出切换事件
    changePeriodType(e) {
        console.log(e, '<=收入支出切换事件')
        this.setData({
            activeTab: e.detail.params.type
        })
        // 重新查询列表
        this.getIconList();
    },
    // 计算器点击事件
    chooseNum(e){
        debugger;
      this.setData({
        fakeTextarea:e.detail.params
      })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.hideTabBar({
            animation:true //是否需要过渡动画
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.getIconList();
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})