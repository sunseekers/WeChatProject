// components/swiper/swiper.js
const api = require('../../API/index.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    inidicatorDots:{
      type:Boolean,
      value:true
    },
    autoplay: {
      type: Boolean,
      value: true
    },
    interval:{
      type: Number,
      value: 5000
    },
    duration: {
      type: Number,
      value: 500
    },
    sliderList:{
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
    onHotKeyTap(ev) {
      console.log(ev)
    }
  },
})
