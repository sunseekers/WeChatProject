// pages/singer/singer.js
const app = getApp()
const api = require('../../API/index.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    singList: [],
    HOT_NAME: '热',
    HOT_SINGER_LEN: 10,
    title: '热',
    currentIndex:0,//右边样式变化的索引
    windowHeight:'',//页面的高度，y轴的滚动位置高度
    scrollTopId:'',//锚点滚动
    heightList:[]//获取每块滚动位置的高度，用来后面的联动
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    let that = this;
    api.getSingerList(data => {
      let songList = that._normalizeSinger(data.list)
      that.setData({ singList: songList })
      this.getHeight()
    })
  },
  getHeight(){
  let height = []
    let eleHeight = 0
    this.data.singList.forEach(item=>{
       eleHeight = (item.items.length * 71+30) + eleHeight
       height.push(eleHeight)
    })
    this.setData({heightList: height })
  },
  _normalizeSinger(list) {
    let map = {
      hot: {
        title: this.data.HOT_NAME,
        items: []
      }
    }
    class Singer {
      constructor({ id, name }) {
        this.id = id
        this.name = name
        this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
      }
    }
    list.forEach((item, index) => {
      if (index < this.data.HOT_SINGER_LEN) {
        map.hot.items.push(new Singer({
          id: item.Fsinger_mid,
          name: item.Fsinger_name,
        }))
      }
      const key = item.Findex//首字母大写
      if (!map[key]) {
        map[key] = {
          title: key,
          items: []
        }
      }
      map[key].items.push(new Singer({
        id: item.Fsinger_mid,
        name: item.Fsinger_name,
      }))
    })
    //为了得到有序列表，我们需要处理map
    let ret = []
    let hot = []
    for (let key in map) {
      let val = map[key]
      if (val.title.match(/[a-zA-Z]/)) {
        ret.push(val)
      } else if (val.title === this.data.HOT_NAME) {
        hot.push(val)
      }
    }
    ret.sort((a, b) => {
      return a.title.charCodeAt(0) - b.title.charCodeAt(0)
    })
    return hot.concat(ret)
  },
  // onPageScroll(e){
  // /**
  //  * 1.计算每个小题目底下的高度，每一个高71px
  //  * 2.当每个小标题滚完了的时候进行标题替换
  //  * 3.没有办法进行左右联动，只能换滑动组件
  //  */
  // let height = []
  //   let eleHeight = 0
  //   this.data.singList.forEach(item=>{
  //      eleHeight = (item.items.length * 71+30) + eleHeight
  //      height.push(eleHeight)
  //   })
  //   let index = height.findIndex((item)=>{
  //    return  item > e.scrollTop
  //   })
  //   this.setData({ currentIndex: index })
  //   let titleName = this.data.singList[index].title
  //   if (titleName) {//应该有个异常处理，滚动到最底下的时候,否则控制台会报错
  //     this.setData({ title: titleName})
  //   }
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady(){
    let that = this;
    wx.getSystemInfo({
      success(res){
        that.setData({
          windowHeight:res.windowHeight
        })
        console.log(res.windowHeight)
      }
    })
  },
  scrollTop(e){
    // 1.得到滚动的高度
    // 2.和所有的高度作对比，得到滚到那个位置，然后变化title和旁边的样式
    //console.log(e.detail.scrollTop)//得到滚动的高度
    let index = this.data.heightList.findIndex((item) => {
      return item > e.detail.scrollTop
    })
    //console.log(index)
    this.setData({ currentIndex: index, title: this.data.singList[index].title})
  },
  switchRightTab(e){
    let id = e.target.dataset.index
    let title = e.target.dataset.id
    this.setData({
      scrollTopId: title,
      currentIndex:id,
      title:title
    })
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