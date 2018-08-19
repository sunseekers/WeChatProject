// components/singer/singer.js
const api = require('../../API/index.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    singList:[],
    HOT_NAME:'热',
    HOT_SINGER_LEN : 10,
  },
  attached() {
    //推荐频道 热门歌单
    let that = this;
    api.getSingerList(data => {
      let songList = that._normalizeSinger(data.list)
      that.setData({ singList: songList})

      console.log(songList)
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    _normalizeSinger(list){
      let map = {
        hot:{
          title:this.data.HOT_NAME,
          items:[]
        }
      }
      class Singer {
        constructor({ id, name }) {
          this.id = id
          this.name = name
          this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
        }
      }
      list.forEach((item,index)=>{
        if (index < this.data.HOT_SINGER_LEN){
          map.hot.items.push(new Singer({
            id: item.Fsinger_mid,
            name: item.Fsinger_name,
          }))
        }
        const key = item.Findex//首字母大写
        if (!map[key]){
          map[key] = {
            title:key,
            items:[]
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
        //console.log(val)
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
      console.log(hot.concat(ret))
    }
  }
})
