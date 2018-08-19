// components/recommend/recommend.js
const api = require('../../API/index.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },
  attached() {
    //推荐频道 热门歌单
    let that = this;
    api.getRecommend(data => {
      that.setData({ swiperData: data.data.slider, radioList: data.data.radioList, songList: data.data.songList });
    });
  },
  /**
   * 组件的初始数据
   */
  data: {
    swiperData:[],
    radioList:[],
    songList:[]
  },
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
