// component/iconList/iconList.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
           iconList:{
               type:Array,
               value:[]
           }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },

    /**
     * 组件的方法列表
     */
    methods: {
        chooseIcon(e){
            this.triggerEvent('chooseIcon',{params:e.target.dataset})
        }
    }
})
