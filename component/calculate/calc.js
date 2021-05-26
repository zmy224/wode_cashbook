// component/calculate/calc.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {

    },

    /**
     * 组件的初始数据
     */
    data: {
        numberList:[1,2,3,4,5,6,7,8,9,0,'.','C'],
        calcList:['+','-','保存']
    },

    /**
     * 组件的方法列表
     */
    methods: {
        chooseNumber(e){
       
        this.triggerEvent('chooseNum',{params:e.currentTarget.dataset.id})
        }
    }
})
