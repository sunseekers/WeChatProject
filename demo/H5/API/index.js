const md5 = require('./MD5.js');
const PRIMARY_KEY = 'CE0BFD15059B68D67688884D7A3D3E0C'
let signature = md5(PRIMARY_KEY + Date.now())
function signIn(obj,callback) {
  wx.request({
    url: 'http://192.168.0.163:9060/api/v1/user02/login',
    data: {
      appCode:"10004",
      password: obj.password,
      systemId: 300,
      timestamp: Date.now(),
      userName: obj.name,
    },
    method: 'POST',
    header: {
      'content-Type': 'application/json;charset=UTF-8',
      'timestamp': Date.now(),
      'signature': signature,
    },
    success (res) {
      if (res.statusCode == 200) {
        callback(res.data)
      }
    }
  })
}
function getOrgLis(token,callback){
  wx.request({
    url:"http://192.168.0.172:9060/api/v1/user02/selectUserOrgRefInfoList",
    data:{
      timestamp: Date.now()
    },
    method: 'POST',
    header: {
      'timestamp': Date.now(),
      'signature': md5(PRIMARY_KEY + Date.now() + token),
      'token': token,
    },
    success(res) {
      if (res.statusCode == 200) {
        callback(res.data)
      }
    }
  })
}
function selectSalesDataAggregate(token, dateType,shopId,callback) {
  wx.request({
    url: "http://192.168.0.172:9060/api/v1/shop/index/selectSalesDataAggregate",
    data: {
      timestamp: Date.now(),
      shopId: shopId,
      dateType: dateType
    },
    method: 'POST',
    header: {
      'timestamp': Date.now(),
      'signature': md5(PRIMARY_KEY + Date.now() + token),
      'token': token,
    },
    success(res) {
      if (res.statusCode == 200) {
        callback(res.data)
      }
    }
  })
}
function selectDataGraphi(token,shopId, callback) {
  wx.request({
    url: "http://192.168.0.163:9060/api/v1/shop/index/selectDataGraphics",
    data: {
      timestamp: Date.now(),
      shopId: shopId
    },
    method: 'POST',
    header: {
      'timestamp': Date.now(),
      'signature': md5(PRIMARY_KEY + Date.now() + token),
      'token': token,
    },
    success(res) {
      if (res.statusCode == 200) {
        callback(res.data)
      }
    }
  })
}
module.exports = {
  signIn,
  getOrgLis,
  selectSalesDataAggregate,
  selectDataGraphi
}