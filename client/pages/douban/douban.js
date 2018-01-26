/**
 * @Date:   2017-12-26 10:31
 * @Email:  wmaqingbo@163.com
 * @Last modified time: 2018-01-08 22:33
 */

var functions = require('./functions.js')
var store = require('./store.js')
var url = 'https://api.douban.com/v2/movie/in_theaters'
var count = 20
Page({
  data: {
    city: "",
    films: [],
    hasMore: false,
    showLoading: true,
    start: 0
  },
  // 下拉刷新，失效
  onPullDownRefresh: function() {
    console.log('onPullDownRefresh', new Date())
  },
  scroll: function(e) {
    //console.log(e)
  },
  // 生命周期钩子
  onLoad: function() {
    var that = this
    functions.getCity(function(city) {
      // let that.city = city
      functions.fetchFilms.call(that, url, city, 0, count, function(data) {
        that.setData({showLoading: false})
      })
    })
  },
  scrolltolower: function() {
    var that = this
    functions.getCity(function(city) {
      functions.fetchFilms.call(that, url, city, that.data.start, count, function(data) {})
    })
  },
  // 点击查看详情
  viewDetail: function(e) {
    var ds = e.currentTarget.dataset;
    // console.log(ds);
    wx.navigateTo({
      url: '../detail/detail?id=' + ds.id + '&title=' + ds.title + '&type=ing'
    })
  }
})
