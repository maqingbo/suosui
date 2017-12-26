/**
 * @Date:   2017-12-26 10:31
 * @Email:  wmaqingbo@163.com
 * @Last modified time: 2017-12-26 14:36
 */

var functions = require('./function.js')
var store = require('./store.js')
var url = 'https://api.douban.com/v2/movie/in_theaters'
var pageSize = 20
Page({
  data: {
    films: [],
    hasMore: true,
    showLoading: true,
    start: 0
  },
  onPullDownRefresh: function() {
    console.log('onPullDownRefresh', new Date())
  },
  scroll: function(e) {
    //console.log(e)
  },
  onLoad: function() {
    var that = this
    functions.getCity(function(city) {
      functions.fetchFilms.call(that, url, city, 0, pageSize, function(data) {
        that.setData({showLoading: false})
      })
    })
  },
  scrolltolower: function() {
    var that = this
    functions.getCity(function(city) {
      functions.fetchFilms.call(that, url, city, that.data.start, pageSize, function(data) {})
    })
  },
  viewDetail: function(e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../detail/detail?id=' + ds.id + '&title=' + ds.title + '&type=ing'
    })
  }
})
