// component/calculate/calc.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        currentIcon:{
            type: Object
      
        },
        activeTab:{
            type: String,
            value: ''
        }
     
    },

    /**
     * 组件的初始数据
     */
    data: {
        copyfakeTextarea: '',// 备份收入支出展示部分
        fakeTextarea: '0',  // 收入支出展示部分
        numberList: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', 'C'], // 计算器弹框键盘数字
        calcList: ['+', '-', '保存'], //计算器弹框键盘操作符
    },

    /**
     * 组件的方法列表
     */
    methods: {
        chooseNumber(e){
            // 当前点击项 
        let clickitem= e.currentTarget.dataset.id; 
        this.data.copyfakeTextarea = this.data.fakeTextarea;
        // 如果按了操作符就将备份数据保存作为加数
        if ((clickitem == '+') || (clickitem == '-')) {
            this.setData({
                fakeTextarea: this.data.copyfakeTextarea + clickitem,
                calcList: ['+', '-', '='],
            })
        } else if (clickitem == '=') {
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
        else if (clickitem == 'C') {
            //   如果是C 就清空数据
            this.setData({
                fakeTextarea: 0,
                copyfakeTextarea: ''
            })
        } else if (clickitem== '保存') {
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

            wx.switchTab({
                url: '/pages/index/index',
                success: function () {
                    console.log('回到首頁')
                }
            })

        } else {
            //   0 作为第一位如果是0 的不能以’0‘和字符相连  0 的时候取空   不是第一位就是正常相连（用正则匹配replace0 开头的--parseint）
            let reg = new RegExp("([0]*)([1-9]+[0-9]+)", "g");
            let newVal = (this.data.copyfakeTextarea == '0' ? '' : this.data.copyfakeTextarea) + clickitem;
            this.setData({
                fakeTextarea: newVal
            })
        }
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
            wx.switchTab({
                url: '/pages/index/index',
                success: function () {
                    console.log('回到首頁')
                }
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
     // 保存花费到数据库
     saveSpendData(amount) {
     const that  = this;
       wx.request({
         url: 'http://127.0.0.1:3000/insertDaily', //仅为示例，并非真实的接口地址
         data: {
            dateTime:'2022-05-25',  // 日期
            costFlag:that.properties.activeTab=='income'?'1':'0', // 收入还是支出
            notes:that.properties.currentIcon.iconText, // 购买的东西
            spend:amount ,// 消费金额
            iconType:that.properties.currentIcon.iconType
         },
         method: 'POST',
         header: {
             'content-type': 'application/json' // 默认值
         },
         success(res) {
         }

       })
        // wx.cloud.database().collection('spendD').add({
        //     // 向数据库写入数据
        //     data: {
        //         // id:Number(Math.random().toString().substr(3,32) + Date.now()).toString(36),  //  生成唯一id
        //         amount: amount,
        //         src: this.data.iconSrc,
        //         name: this.data.iconName,
        //         type: this.data.activeTab == 'outcome' ? 0 : 1,
        //         time: new Date()
        //     }
        // }).then(res => {
        //     console.log('添加成功')
        // })
    },
    }
})
