//discovery.js
let util = require('../../utils/util.js')
Page({
  data: {
    navTab: ["推荐", "圆桌", "热门", "收藏"],
    currentNavtab: "0",
    imgUrls: [
      '../../../images/24213.jpg',
      '../../../images/24280.jpg',
      '../../../images/1444983318907-_DSC1826.jpg'
    ],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000,
    feed: [],
    feed_length: 0
  },
  onLoad() {
    console.log('onLoad')
    let that = this
    //调用应用实例的方法获取全局数据
    this.refresh();
  },
  switchTab(e) {
    this.setData({
      currentNavtab: e.currentTarget.dataset.idx
    });
  },

  bindItemTap() {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  bindQueTap() {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  upper() {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function () { wx.hideNavigationBarLoading(); wx.stopPullDownRefresh(); }, 2000);
  },
  lower(e) {
    wx.showNavigationBarLoading();
    let that = this;
    setTimeout(function () { wx.hideNavigationBarLoading(); that.nextLoad(); }, 1000);
    console.log("lower")
  },
  //scroll: function (e) {
  //  console.log("scroll")
  //},

  //网络请求数据, 实现刷新
  refresh0() {
    let index_api = '';
    util.getData(index_api)
      .then(function (data) {
        //this.setData({
        //
        //});
        console.log(data);
      });
  },

  //使用本地 fake 数据实现刷新效果
  refresh() {
    let feed = util.getDiscovery();
    console.log("loaddata");
    let feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad() {
    let next = util.discoveryNext();
    console.log("continueload");
    let next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
  }
});
