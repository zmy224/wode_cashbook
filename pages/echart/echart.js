// pages/echart/echart.js

import * as echarts from '../../tools/ec-canvas/echarts';
function setOption(chart,data){
    var option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            data: []
        },
        series: [{
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            label: {
                show: false,
                position: 'center'
            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: false
            },
            data: [
               ...data
            ]
        }]
    };
    chart.setOption(option);
    return chart;
}
Page({
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
        activeTab: 'outcome',
        echartsData: null, // echarts 数据
    },
    // 收入支出切换事件
    changePeriodType(e) {
        console.log(e, '<=收入支出切换事件')
        this.setData({
            activeTab: e.detail.params.type
        })
        // 重新查询列表
        this.getEchartData();
    },
    // 查询收入支出数据
    getEchartData() {
        wx.cloud.database().collection('spendD').where({
            type: this.data.activeTab == 'outcome' ? 0 : 1
        }).get().then(res => {
            let calcResult  = this.handleOriginData(res.data);
            this.setData({
                echartsData:calcResult
            })
            this.init_one(calcResult)
        })
    },
    handleOriginData(array) {
        let result = [];
        let obj = {}
        array.forEach(item => {
            if (!obj[item.name]) {
                obj[item.name] = 0;
            }
            obj[item.name] += Number(item.amount);
        })

        for(let key in obj){
            let temp  = {};
            temp['name'] = key;
            temp['value']= obj[key];
            result.push(temp);
        }
        console.log(result,'result')
        return result
    },
    /**
   * 生命周期函数--监听页面加载
   */

  init_one: function (data) {           //初始化第一个图表
    this.echartComponent.init((canvas, width, height) => {
        const chart = echarts.init(canvas, null, {
            width: width,
            height: height
        });
        setOption(chart,data)
        this.chart = chart;
        return chart;
    });
},
    onLoad: function (options) {
        this.getEchartData()
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        this.echartComponent = this.selectComponent('#mychart-dom-bar');  
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