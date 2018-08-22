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
  }
})