// pages/home/home.js
const wxCharts = require('../../utils/wxcharts.js');
const api = require('../../API/index.js');
const app = getApp();
const order = ['red', 'yellow', 'blue', 'green', 'red']
var lineChart = null;
var pieChart = null;
Page({
  data: {
    navbar:[],
    categories:[],
    serialNumber:[],
    lastWeekSalesVolume:[],
    swiperListNumber:{},
    tableList: [],
    dateType:1,
    shopId:'',
    list: ['今日','昨日','本月','上月'],
    chartList:['销售额','毛利额'],
    currentChar:0,
    menuList:[],
    index: 0,
    listData: ['../../image/i1.png','../../image/i2.png'],
    title:"全部",
    swiperList:[
      {
        "name":"销售额",
        "number":"",
        "url": "../../image/icon_one.png",
        "color": 'demo-text-1'
      },
      {
        "name": "销售成本",
        "number": "",
        "url": "../../image/icon_two.png",
        "color": 'demo-text-2'
      },
      {
        "name": "毛利额",
        "number": "",
        "url": "../../image/icon_three.png",
        "color": 'demo-text-3'
      },
      {
        "name": "毛利率",
        "number": "",
        "url": "../../image/icon_four.png",
        "color": 'demo-text-4'
      }
      ],

    indicatorDots: true,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    currentTab:0,
    previousMargin: 0,
    nextMargin: 0,
    toView: 'red',
    scrollTop: 100
  },
  onTitle(){
    this.setData({'title':'门店'})
  },
  onNavbarTap(e){
    this.setData({
      currentTab:e.currentTarget.dataset.index,
      dateType: e.currentTarget.dataset.index
    })
    let token = app.globalData.token
    let dateType = ++this.data.dateType
    let shopId = this.data.shopId
    this.getSaleData(token, dateType, shopId)
    this.getSelectGraphi(token, shopId)
  },
  onChart(e){
    this.setData({
      currentChar: e.currentTarget.dataset.index
    })
    let token = app.globalData.token
    let shopId = this.data.shopId
    if (e.currentTarget.dataset.index == 1){
      let currentChar = e.currentTarget.dataset.index
      this.getSelectGraphi(token, shopId, currentChar)
    }else {
      this.getSelectGraphi(token, shopId)
    }
  },
  bindPickerChange (e) {
    let menuList = this.data.menuList
    let token = app.globalData.token
    let dateType = this.data.dateType
    let shopId = menuList[e.detail.value].refObjId == -1 ? "" : menuList[e.detail.value].refObjId
    this.getSaleData(token, dateType, shopId)
    this.getSelectGraphi(token, shopId)
    this.setData({
      index: e.detail.value
    })
  },
  touchHandler: function (e) {
    lineChart.showToolTip(e, {
      background: '#7cb5ec',
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  getSaleData(token, dateType, shopId){
    let that = this
    this.setData({ tableList: [], navbar: [], swiperListNumber:[] })
    api.selectSalesDataAggregate(token, dateType, shopId, data => {
      if (data.data.length > 0) {
        that.setData({ swiperListNumber: data.data[0] })
        that.setData({ tableList: data.data.splice(1, 4), navbar: data.data[0] })
      }
    })
  },
  touchHandler: function (e) {
    console.log(129)
    lineChart.scrollStart(e);
  },
  moveHandler: function (e) {
    console.log(22)
    lineChart.scroll(e);
  },
  touchEndHandler: function (e) {
    console.log(12)
    lineChart.scrollEnd(e);
    lineChart.showToolTip(e, {
      format: function (item, category) {
        return category + ' ' + item.name + ':' + item.data
      }
    });
  },
  getSelectGraphi(token, shopId, Profit){
    let that = this
    api.selectDataGraphi(token, shopId, data => {
      let serialNumber = data.data.map(item => {
        return item.salesVolume == null ? 0 : item.salesVolume
      })
      let grossProfit = data.data.map(item => {
        return item.grossProfit == null ? 0 : item.grossProfit
      })
      let lastWeekSalesVolume = data.data.map(item => { 
        return item.lastWeekSalesVolume == null ? 0 : item.lastWeekSalesVolume
        })
      let dataTime = data.data.map(item => { return item.date })
      var windowWidth = 320;
      if (Profit) {
        serialNumber = grossProfit
      }
      console.log(serialNumber)
      lineChart = new wxCharts({
        canvasId: 'lineCanvas',
        type: 'line',
        categories: dataTime,
        animation: true,
        series: [{
          name: '今日',
          data: serialNumber,
        }, {
          name: '上周今日',
            data: lastWeekSalesVolume,
        }],
        xAxis: {
          disableGrid: true
        },
        yAxis: {
          disableGrid: true
        },
        width: windowWidth,
        height: 200,
        dataLabel: false,
        dataPointShape: true,
        // dataLabel: true,
        // dataPointShape: true,
        // enableScroll: true,
        extra: {
          lineStyle: 'curve'
        }
      });
    })
  },
  onLoad(e) {
    let token = app.globalData.token
    let dateType = this.data.dateType
    let shopId = this.data.shopId
    let that = this
    this.setData({ menuList: app.globalData.menuList})
    this.getSaleData(token, dateType, shopId)
    this.getSelectGraphi(token,shopId)
  },
})
