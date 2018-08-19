// pages/toplist/toplist.js
const api = require('../../API/index.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topinfo: {},
    songlist: [],
    update_time: '',
    listBgColor: '',
    isLight: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.topListId
    console.log(options)
    let that = this
    wx.showLoading({title:'数据加载中...',mask:true})
    api.getToplistInfo(id,data=>{
      wx.hideLoading()
      if (data.color == "14737632") {
        that.setData({isLight:true})
      }
      //console.log(data)
      that.setData({
        topinfo: data.topinfo,
        songlist: data.songlist,
        update_time: data.update_time,
        listBgColor: that.dealColor(data.color)        
      })
    })
  },
  dealColor(rgb) {
    if (!rgb) {
      return;
    }
    var r = (rgb & 0x00ff0000) >> 16,
      g = (rgb & 0x0000ff00) >> 8,
      b = (rgb & 0x000000ff);
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  },
  playsongTap(ev) {
    var that = this;
    app.setGlobalData({ songData: ev.currentTarget.dataset.data, songlists: that.data.songlist });
    var id = ev.currentTarget.dataset.id;
    var mid = ev.currentTarget.dataset.mid;
    var albummid = ev.currentTarget.dataset.albummid;
    var songFrom = ev.currentTarget.dataset.from;
    var no = ev.currentTarget.dataset.no;
    wx.navigateTo({
      url: '../playsong/playsong?id=' + id + '&mid=' + mid + "&albummid=" + albummid + '&songFrom=' + songFrom + '&no=' + no
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
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