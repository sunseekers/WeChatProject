let app = getApp()
Page({
  data: {
    info: '哈哈，你位置信息暴露了',
    longitude:"",
    latitude:"",
    markers:[]
    //msg:"你的个人信息暴露了"
  },
  transform(){
    this.setData({
      info:"当你在凝视深渊的时候，深渊也在凝视你"
    })
  },
  onLoad() {
    console.log(app)
    const that = this;
    console.log(this)
    wx.getLocation({
      type: 'wgs84',
      success (res) {
        console.log(this)
        that.setData({
          longitude: res.longitude,
          latitude: res.latitude
        })
        that.setData({
          markers:[{
            longitude: res.longitude,
            latitude: res.latitude,
          }]
        })
      }
    })
  },
  
})