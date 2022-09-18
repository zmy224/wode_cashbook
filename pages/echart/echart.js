// pages/echart/echart.js

import * as echarts from '../../tools/ec-canvas/echarts';
import utils from '../../utils/util'
function setOption(chart, data) {
    var option = {
        title: {
            text: ''
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a}{b}: {c} ({d}%)',

            textStyle: {
                fontSize: 18
            }
        },
        legend: {
            data: []
        },
        series: [{
            name: '',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: true,
            label: {
                show: true,
                // formatter: '{b|{b}:}{c}({d}%)',
                fontSize: 12,
                normal: {
                    show: true,
                    textStyle: {
                        fontSize: 14
                    }
                },
                emphasis: {
                    show: true
                },

                rich: {
                    a: {
                        color: '#999',
                        // lineHeight: 22,
                        align: 'center',
                        fontSize: 12,
                    },
                    b: {
                        fontSize: 14,
                        // lineHeight: 33
                        fontSize: 12,
                    },
                },

            },
            emphasis: {
                label: {
                    show: true,
                    fontSize: '40',
                    fontWeight: 'bold'
                }
            },
            labelLine: {
                show: true
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
        tabList: [
            {
                id: 'outcome',
                text: '支出'
            },
            {
                id: 'income',
                text: '收入'
            },
        ],
        periodList: [
            {
                id: 'W',
                text: '周'
            },
            {
                id: 'M',
                text: '月'
            },
            {
                id: 'Y',
                text: '年'
            },
        ],
        activeKindTab: 'outcome',
        activPeriodTab: 'W',
        echartsData: null, // echarts 数据
        progressList: [],//  列表数据
        scrollList: [
        // { content: '22-06', id: '1' },
        // { content: '22-07', id: '2' },
        // { content: '22-07', id: '3' },
        // { content: '22-07', id: '4' },
        // { content: '22-07', id: '5' },
        // { content: '22-07', id: '6' },
        // { content: '22-07', id: '7' },
        // { content: '22-07', id: '8' }
    ],
        // screenWidth: '',
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
            // console.log(res, 'eeeeeeeeeeee')
            let calcResult = this.handleOriginData(res.data);
            this.setData({
                echartsData: calcResult
            })
            this.init_one(calcResult)
        })
    },
    handleOriginData(array) {
        let result = [];
        let obj = {}
        let total = 0  // 汇总数据用于展示进度百分比
        array.forEach(item => {
            total += Number(item.amount);
            if (!obj[item.name]) {
                obj[item.name] = 0;
            }
            obj[item.name] += Number(item.amount);
        })

        for (let key in obj) {
            let temp = {};
            temp['name'] = key;
            temp['value'] = obj[key];
            temp['total'] = total
            temp['rate'] = (obj[key] / total).toFixed(2) * 100
            result.push(temp);
        }
        console.log(result, 'result')
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
            setOption(chart, data)
            this.chart = chart;
            return chart;
        });
    },
    onLoad: function (options) {
        let weeks = utils.setweekOption('2022');
        // console.log(weeks,'import setweekOption fr')
        this.setData({
            scrollList:weeks
        })
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