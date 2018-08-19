// components/search/search.js
const api = require('../../API/index.js')
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    inputFocus:{
      type:Boolean,
      value:false
    },

  },

  /**
   * 组件的初始数据
   */
  data: {
    searchKeyword: "",
    searchHotShow: true,
    searchHistoryShow: false, // 是否显示搜索历史
    searchResultShow: false, // 是否显示搜索结果
    searchCancelShow: false, // 是否显示取消按钮
    searchPageNum: 1, // 分页数
    scrollFlag: true, // 上拉分页加载条件
    searchPageSize: 0, // 每页多少
    searchTotalNum: 0, // 结果总条数
    searchSongList:[],
    searchLoading:"",
    special:"",
    hotkey:[]
  },
  attached(){
    api.getHotSearch(data=>{
      this.setData({ hotkey: data.data.hotkey, special: data.data.special_key})
    })
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 搜索输入值时的操作
    onSearchInput(e){
      this.setData({searchKeyword:e.detail.value})
    },
    // 搜索框获取焦点
    onSearchFocus(e){
      let searchKeyword = this.data.searchKeyword
      if (searchKeyword.trim()) {
        this.setData({ searchHotShow: false, searchHistoryShow: false, searchResultShow: true, searchCancelShow: true})
      }else {
        this.setData({ searchHotShow: false, searchHistoryShow: true, searchResultShow: false, searchCancelShow: true });
      }
    },
    // 搜索取消
    onSearchCancel(){
      this.setData({
        searchHotShow: true,
        searchHistoryShow:false,
        searchResultShow:false,
        searchCancelShow:false,
        searchKeyword:'',
        inputFocus:false
      })
    },
    // 搜索框清除按钮
    onClearInput(){
      this.setData({
        searchHotShow: false,
        searchHistoryShow: true,
        searchResultShow: false,
        searchCancelShow: true,
        searchKeyword: '',
        inputFocus: true       
      })
    },
    onHotKeyTap(ev) {
      let word = ev.currentTarget.dataset.text;
      this.setData({
        searchSongList: [],
        searchHotShow: false,
        searchHistoryShow: false,
        searchResultShow: true,
        searchCancelShow: true,
        searchKeyword: ev
          .currentTarget
          .dataset
          .text
          .trim(),
        inputFocus: false
      });
      this.onFetchSearchList(1);
    },
    // 搜索确认搜索
    onSearchConfirm: function (ev) {
      var searchKeyword = ev.detail.value;
      var searchHistorys = that.data.searchHistorys;
      that.setData({ searchKeyword: searchKeyword });
      if (searchKeyword.trim()) {
        // 添加搜索历史记录
        if (searchHistorys.length > 0) {
          if (searchHistorys.indexOf(searchKeyword) < 0) {
            searchHistorys.unshift(searchKeyword);
          }
        } else {
          searchHistorys.push(searchKeyword);
        }
        wx.setStorage({
          key: "searchHistorysKey",
          data: searchHistorys,
          success: function () {
            that.setData({ searchHistorys: searchHistorys });
          }
        });

        this.setData({ searchHotShow: false, searchHistoryShow: false, searchResultShow: true, searchSongList: [] });
        this.onFetchSearchList(1);
      }
    },
    // 搜索结果
    onFetchSearchList(searchPageNum) {
      let that = this
      var searchKeyword = that.data.searchKeyword;
      that.setData({ searchLoading: true, scrollFlag: false });
      api.getSearchMusic(searchKeyword, searchPageNum, function (res) {
        var res = res.data;
        that.setData({
          searchSongList: that
            .data
            .searchSongList
            .concat(res.song.list),
          zhida: res.zhida,
          searchLoading: false,
          searchPageNum: res.song.curpage,
          searchTotalNum: res.song.totalnum,
          searchPageSize: res.song.curnum,
          scrollFlag: true
        });
      });
    },
    // 删除单条历史记录
    onSearchHistoryDelete: function (ev) {
      var item = ev.currentTarget.dataset.item;
      var searchHistorys = wx.getStorageSync('searchHistorysKey');
      searchHistorys.splice(searchHistorys.indexOf(item), 1);
      wx.setStorage({
        key: "searchHistorysKey",
        data: searchHistorys,
        success: function () {
          that.setData({ searchHistorys: searchHistorys });
        }
      });
    },
    // 清除所有历史记录
    onSearchHistoryDeleteAll: function () {
      wx.removeStorage({
        key: 'searchHistorysKey',
        success: function (res) {
          that.setData({ searchHistorys: [] });
        }
      });
    },
    // 滚动分页加载
    onScrollLower: function () {
      if (that.data.scrollFlag) {
        var num = that.data.searchPageNum + 1;
        var total = Math.ceil(that.data.searchTotalNum / that.data.searchPageSize);
        if (num > total) {
          that.setData({ searchLoadingComplete: true });
          return;
        } else {
          if (num == total) {
            that.setData({ searchLoading: true });
          } else {
            that.setData({ searchLoading: false });
          }
          that.setData({ searchPageNum: num });
          that.onFetchSearchList(that.data.searchPageNum);
        }
      }
    },
    // 滚动计算滚动条距离
    onScroll: function (ev) {
      var scrollTop = ev.detail.scrollTop;
      if (scrollTop > 500) {
        that.setData({ backToTop: true });
      } else {
        that.setData({ backToTop: false });
      }
    },
    // 返回顶部
    onBackToTop: function () {
      that.setData({ scrollToView: 'scrollTop', backToTop: false });
    }
  }
})
