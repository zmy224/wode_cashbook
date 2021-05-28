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
        copyfakeTextarea: '',// 备份收入支出展示部分
        fakeTextarea: '0',  // 收入支出展示部分
        numberList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'C'], // 计算器弹框键盘数字
        calcList: ['+', '-', '保存'], //计算器弹框键盘操作符
        activeTab: 'outcome',
        //  收入支出种类
        iconList: [],
        showCalc: true,
        calcOrigin1: '',// 加数1
        calcOrigin2: '',// 加数2
        operation: '',  //  操作符
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
        // this.getIconList();
    },
    // 计算器点击事件
    chooseNum(e) {
  
        this.data.copyfakeTextarea = this.data.fakeTextarea;
        // 如果按了操作符就将备份数据保存作为加数
        if ((e.detail.params == '+') || (e.detail.params == '-')) {
            this.setData({
                // calcOrigin1:this.data.copyfakeTextarea,
                operation: e.detail.params, // 保存操作符
                fakeTextarea: this.data.copyfakeTextarea + e.detail.params,
                calcList: ['+', '-', '='],
            })

        } else if (e.detail.params == '=') {
            // 如果是=  不需要将= 展示出来直接计算出结果
            let temp = this.data.copyfakeTextarea;
           console.log( this.getResultBy(temp),'lllllllll')
        }

        else if (e.detail.params == 'C') {
            //   如果是C 就清空数据
            this.setData({
                fakeTextarea: 0,
                copyfakeTextarea:''
            })
        } else {
            //   0 作为第一位如果是0 的不能以’0‘和字符相连  0 的时候取空   不是第一位就是正常相连（用正则匹配replace0 开头的--parseint）
            let reg = new RegExp("([0]*)([1-9]+[0-9]+)", "g");
            let newVal =(this.data.copyfakeTextarea=='0'? '': this.data.copyfakeTextarea) + e.detail.params;
            this.setData({
                fakeTextarea: newVal
            })
        }
    },
    getResultBy(string) {
        let temp = string;
        let calcArr = ['+', '-'];
        let reg = /[+-]/;
        let number1 =  0;
        let restStr='';
        let elementArr = []; // 数字集合
        let result= 0;
        let start =  0;
        let last  = false;  // 判断是不是最后1位
        // debugger
        for (var i = 0; i < temp.length; i++ ) {
            if(last){
                break;
            }
            if (calcArr.includes(temp[i])) {
                // 判断当前是+ 还是减做相应的运算
                switch(temp[i]){
                    case '+' :
                        result +=Number(temp.slice(start,i));
                    break;
                    case '-' :
                        result -=Number(temp.slice(start,i));
                    break;
                }
                // 截取开头位置
                // result +=Number(temp.slice(start,i));
               // 保留剩余部分
                restStr = temp.substr(i+1);
                // start 作为切割的索引 默认为 0   当切割之后将start设为上一次切割的起点
                start =  i;
               
                // 判断剩下字符串还有没有运算符 没有就直接相加 有的话在进行后续的循环
            if(!reg.test(restStr)){

                switch(temp[i]){
                    case '+' :
                        result +=Number(restStr) ;
                    break;
                    case '-' :
                        result -=Number(restStr) ;
                    break;
                }
                // result +=parseFloat(restStr) ;
                last= true;
            }
            };
            // test 正则  如果不包含calcArr
          
            // while(reg.test(restStr)){
            //     result +=parseFloat(restStr) 
            // }
            console.log(result,'result')
        }
        console.log(result,'resulttotal')
         // return result
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.hideTabBar({
            animation: true //是否需要过渡动画
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        // this.getIconList();
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