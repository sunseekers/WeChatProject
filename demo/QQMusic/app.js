App({
  globalData: {
    songData: null,
    songLists: null,
    current:0
  },
  setGlobalData: function (obj) {
    for (var n in obj) {
      this.globalData[n] = obj[n];
    }
  },
  get(){
    let songLists = 'io'
  },
  onLaunch(options){
   // options 首页的相关配置（参数）比如这个页面：{path: "pages/recommend/recommend", query: {…}, scene: 1001, shareTicket: undefined, referrerInfo: {…}}
    console.log(options)
    console.log(1)
  },
  onShow(options){
    console.log(options)
    console.log(2)
  },
  onHide() {
    console.log(3)
  }
})