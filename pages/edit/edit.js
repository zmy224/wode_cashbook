// pages/edit/edit.js
import { getIconTypeApi } from '../../server/api/edit'
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
        //  收入支出种类
        iconList: [],
        currentIcon: '', // 当前选择的icon分类
        isChooseIconFlag: false,
        showCalc: false,  // 显示隐藏计算器
    },
    // 监听属性
    watch: {
        activeTab: function (newValue, oldValue) {
            console.log(newValue, oldValue); // name改变时，调用该方法输出新值。
            let type = newValue == 'outcome' ? 0 : 1;
            this.getIconList(type);
        }
    },

    //  選擇花費種類
    chooseIcon(e) {
        let obj = e.detail.params.currenticon;
        this.setData({
            currentIcon: obj,
            // iconName: obj.name, //名称
            // iconSrc: obj.src,
            isChooseIconFlag: true,
            showCalc: true //  显示计算器
        })

    },
    // 请求收入支出种类列表
    getIconList(type) {
        let that = this;
        getIconTypeApi({
            type: type 
        })
       .then(res=>{
            that.setData({
                iconList: res.data
             })
        },err=>{
            console.err(err)
        })
    },
    // 收入支出切换事件
    changeType(e) {
        console.log(e, '<=收入支出切换事件')
        this.setData({
            activeTab: e.detail.params.type
        })
        // 重新查询列表
    },
    // 计算器点击事件
    chooseNum(e) {
        this.data.copyfakeTextarea = this.data.fakeTextarea;
        // 如果按了操作符就将备份数据保存作为加数
        if ((e.detail.params == '+') || (e.detail.params == '-')) {
            this.setData({
                fakeTextarea: this.data.copyfakeTextarea + e.detail.params,
                calcList: ['+', '-', '='],
            })
        } else if (e.detail.params == '=') {
            // 如果是=  不需要将= 展示出来直接计算出结果
            let temp = this.data.copyfakeTextarea;
            let tempResult = this.getResultBy(temp);
            // 先计算结果赋值给文框
            //   清空备份数据   将= 变成保存
            this.setData({
                fakeTextarea: tempResult,
                copyfakeTextarea: '',
                calcList: ['+', '-', '保存'],
            })
        }
        else if (e.detail.params == 'C') {
            //   如果是C 就清空数据
            this.setData({
                fakeTextarea: 0,
                copyfakeTextarea: ''
            })
        } else if (e.detail.params == '保存') {
            //  如果是保存的话就写入数据库
            this.saveSpendData(this.data.fakeTextarea);
            // 清空文本框 
            // 清空备份框  隱藏計算器
            this.setData({
                fakeTextarea: 0,
                copyfakeTextarea: '',
                showCalc: false
            })
            //  回到首頁

            setTimeout(() => {
                wx.switchTab({
                    url: '/pages/index/index',
                    success: function () {
                        console.log('回到首頁')
                    }
                })
            })

        } else {
            //   0 作为第一位如果是0 的不能以’0‘和字符相连  0 的时候取空   不是第一位就是正常相连（用正则匹配replace0 开头的--parseint）
            let reg = new RegExp("([0]*)([1-9]+[0-9]+)", "g");
            let newVal = (this.data.copyfakeTextarea == '0' ? '' : this.data.copyfakeTextarea) + e.detail.params;
            this.setData({
                fakeTextarea: newVal
            })
        }
    },
    //  根據表達式計算結果
    getResultBy(string) {
        let temp = string;
        let calcArr = ['+', '-'];
        let reg = /[+-]/;
        let restStr = '';
        let result = 0;
        let start = 0;
        let last = false;  // 判断是不是最后1位
        for (var i = 0; i < temp.length; i++) {
            if (last) {
                break;
            }
            if (calcArr.includes(temp[i])) {
                // 截取开头位置
                result += Number(temp.slice(start, i));
                console.log(result, 'result', temp.slice(start, i));
                // 保留剩余部分
                restStr = temp.substr(i + 1);
                // start 作为切割的索引 默认为 0   当切割之后将start设为上一次切割的起点
                console.log(result, 'result', temp.slice(start, i))
                start = i;
                // 判断剩下字符串还有没有运算符 没有就直接相加 有的话在进行后续的循环
                if (!reg.test(restStr)) {
                    switch (temp[i]) {
                        case '+':
                            result += Number(restStr);
                            break;
                        case '-':
                            result -= Number(restStr);
                            break;
                    }
                    last = true;
                }
            };
        }
        console.log(result, 'resulttotal')
        return result
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        getApp().setWatcher(this); // 设置监听器
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        let type = this.data.activeTab == 'outcome' ? 0 : 1;
        this.getIconList(type);
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

        this.data.showCalc && this.setData({
            showCalc: false
        })
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