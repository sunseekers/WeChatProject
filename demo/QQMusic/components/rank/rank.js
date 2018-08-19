// components/rank/rank.js
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
    api.getToplist(data => {
      // 过滤巅峰mv榜
      that.setData({
        topList: data.filter((item, i) => item.id != 201)
      });
    });
  },
  /**
   * 组件的初始数据
   */
  data: {
    topList:[]
  },

  /**
   * 组件的方法列表
   *  url:'../toplist/toplist?topListId='+id
   * 相当于给../toplist/toplist页面传了一个{}对象
   * ../toplist/toplist?topListId='+id相当于给页面传了一个{topListId: id}对象
   */
  methods: {
    onToplistTap(ev){
      let id = ev.currentTarget.dataset.id

      wx.navigateTo({
        url:'../toplist/toplist?topListId='+id
      })
    }
  }
})
