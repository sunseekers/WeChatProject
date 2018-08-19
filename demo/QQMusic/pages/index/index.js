//index.js
//获取应用实例
const app = getApp()
const api = require('../../API/index.js')
Page({
  data: {
    navBar:['推荐','歌手','排行榜','搜索'],
    currentTab:0,
  },
  //事件处理函数
  onNavbarTap(e){
    this.setData({
      currentTab: e.currentTarget.dataset.index
    })
  },
  onLoad(options) {
  },
  onShareAppMessage(){
    return {
      title:"QQ音乐，陪伴你的每一天",
      desc:"这是 sunseekers 制作的小程序",
      path:"/pages/index/index"
    }
  }
})
