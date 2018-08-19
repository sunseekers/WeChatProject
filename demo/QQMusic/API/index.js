//获取推荐频道数据
function formatWan(n) {
  n = n.toString();
  return (n / 10000).toFixed(1) + '万';
}
function getRecommend(callback) {
  wx.request({
    url: 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg',
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      _: Date.now()
    },
    method: 'GET',
    header: { 'content-Type': 'application/json' },
    success: function (res) {
      if (res.statusCode == 200) {
        var data = res.data;
        var songlist = data.data.songList;
        for (var i = 0; i < songlist.length; i++) {
          songlist[i].accessnum = formatWan(songlist[i].accessnum);
        }
        callback(data);
      }
    }
  })
}
//获取排行榜频道数据
function getToplist(callback) {
  wx.request({
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
    data: {
      format: 'json',
      g_tk: 5381,
      uin: 0,
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      _: Date.now()
    },
    method: 'GET',
    header: { 'content-type': 'application/json' },
    success: function (res) {
      if (res.statusCode == 200) {
        var data = res.data;
        var toplist = data.data.topList;
        for (var i = 0; i < toplist.length; i++) {
          toplist[i].listenCount = formatWan(toplist[i].listenCount);
        }
        callback(toplist);
      }
    }
  })
}
//获取热门搜索
function getHotSearch(callback) {
  wx.request({
    url:"https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg",
    data:{
      g_tk: 5381,
      uin: 0,
      format: 'jsonp',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      _: Date.now()    
    },
    method:"GET",
    header: { 'content-Type': 'application/json'},
    success(res){
      if (res.statusCode ==200){
        let data = res.data
        data.data.hotkey = data.data.hotkey.slice(0, 8)
        callback(data);
      }
    }
  })
}
//获取排行榜详细信息
function getToplistInfo(id, callback) {
  wx.request({
    url: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg',
    data: {
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      tpl: 3,
      page: 'detail',
      type: 'top',
      topid: id,
      _: Date.now()
    },
    method: 'GET',
    header: { 'content-type': 'application/json' },
    success: function (res) {
      if (res.statusCode == 200) {
        callback(res.data);
      }
    }
  })
}
function getSearchMusic(keyword, page,callback){
  wx.request({
    url: 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp',
    data:{
      g_tk: 5381,
      uin: 0,
      format: 'json',
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      platform: 'h5',
      needNewCode: 1,
      w: keyword,
      zhidaqu: 1,
      catZhida: 1,
      t: 0,
      flag: 1,
      ie: 'utf-8',
      sem: 1,
      aggr: 0,
      perpage: 20,
      n: 20,
      p: page,
      remoteplace: 'txt.mqq.all',
      _: Date.now()
    },
    method:"GET",
    header:{'content-Type':'application/json'},
    success(res){
      if (res.statusCode == 200) {
        callback(res.data)
      }
    }
  })
}
/**
 * 获取歌词
 */
function getLyric(id, callback) {
  wx.request({
    url: 'https://route.showapi.com/213-2',
    data: {
      musicid: id,
      showapi_appid: '23654',
      showapi_timestamp: new Date().getTime(),
      showapi_sign: 'd23793312daf46ad88a06294772b7aac'
    },
    header: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    success: function (res) {
      if (res.statusCode == 200) {
        callback(res.data);
      }
    }
  });
}

/**
 * 获取单首歌曲的信息
 */
function getSongInfo(id, mid, callback) {
  wx.request({
    url: 'https://c.y.qq.com/splcloud/fcgi-bin/fcg_list_songinfo_cp.fcg',
    data: {
      url: 1,
      idlist: id,
      midlist: mid,
      typelist: 0
    },
    method: 'GET',
    header: { 'content-type': 'application/json' },
    success(res) {
      if (res.statusCode == 200) {
        var data = res.data.data;
        callback(data);
      }
    }
  });
}
function getSingerList(callback){
  wx.request({
    url: 'https://c.y.qq.com/v8/fcg-bin/v8.fcg',
    data:{
      channel: 'singer',
      page: 'list',
      key: 'all_all_all',
      pagesize: 100,
      pagenum: 1,
      hostUin: 0,
      needNewCode: 0,
      platform: 'yqq',
      g_tk: 1928093487,
      inCharset: 'utf-8',
      outCharset: 'utf-8',
      notice: 0,
      format: 'jsonp'
    },
    method: 'GET',
    header: { 'content-type': 'application/json' },
    success(res) {
      if (res.statusCode == 200) {
        var data = res.data.data;
        callback(data);
      }
    }
  })
}
 class Singer {
  constructor({ id, name }) {
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
  }
}
module.exports = {
  getRecommend,
  getToplist,
  getHotSearch,
  getToplistInfo,
  getSearchMusic,
  getLyric,
  getSongInfo,
  getSingerList,
  Singer
}