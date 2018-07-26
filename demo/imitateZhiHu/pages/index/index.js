let util = require('../../utils/util.js')
let app = getApp()

Page({
  data:{
    feed:[],
    feed_length:0
  },
  //事件处理函数
  // bindItemTap(){
  //   wx.navigateTo({
  //     url:"../answer/answer"
  //   })
  // },
  // bindQueTap(){
  //   wx.navigateTo({
  //     url:'../question/question'
  //   })
  // },
  onLoad(){
    let that = this
    this.getData()
  },
  upper(){
    wx.showNavigationBarLoading()// 在当前页面显示导航条加载动画。
   this.refresh();
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
  },
  lower(e){
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);   
  },
  //网络请求数据，实现首页刷新
  refresh0(){
    let index_api = ''
    util.getData(index_api).then(res=>{
      console.log(res)
    })
  },
  //使用本地 fake 数据实时刷新效果
  getData(){
    let feed = util.getData2()
    let feed_data = feed.data
    this.setData({
      feed:feed_data,
      feed_length:feed_data.length
    })
  },
  refresh(){
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000
    });
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
    setTimeout(function () {
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })
    }, 3000)
  },
   //使用本地 fake 数据实现继续加载效果
  nextLoad(){
    wx.showToast({
      title:"加载中",
      icon:'loading',
      duration:4000
    })
    let next = util.getNext();
    let next_data = next.data
    this.setData({
      feed:this.data.feed/concat(next_data),
      feed_length:this.data.feed_length + next_data.length
    });
    setTimeout(function () {
      wx.showToast({
        title: '加载成功',
        icon: 'success',
        duration: 2000
      })
    }, 3000)
  }
})