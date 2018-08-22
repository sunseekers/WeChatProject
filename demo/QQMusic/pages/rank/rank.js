// pages/rank/rank.js
const api = require('../../API/index.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    topList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this;
    api.getToplist(data => {
      // 过滤巅峰mv榜
      that.setData({
        topList: data.filter((item, i) => item.id != 201)
      });
    }) 
  },
    /**
   * 自定义页面方法
   *  url:'../toplist/toplist?topListId='+id
   * 相当于给../toplist/toplist页面传了一个{}对象
   * ../toplist/toplist?topListId='+id相当于给页面传了一个{topListId: id}对象
   */
  onToplistTap(ev) {
    let id = ev.currentTarget.dataset.id

    wx.navigateTo({
      url: '../toplist/toplist?topListId=' + id
    })
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