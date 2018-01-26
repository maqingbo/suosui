/**
 * @Date:   2017-12-26 17:24
 * @Email:  wmaqingbo@163.com
 * @Last modified time: 2018-01-01 20:03
 */

Page({
  data: {
    film: {},
    showLoading: true,
    options: null
  },
  onLoad: function(options) {
    var that = this
    wx.setNavigationBarTitle({title: options.title})
    wx.request({
      url: 'https://api.douban.com/v2/movie/subject/' + options.id,
      header: {
        'content-type': 'json'
      },
      success: function(res) {
        var data = res.data
        // console.log(data);
        that.setData({film: data, showLoading: false})
      }
    })
  },
  // 点击查看演员页面
  viewCast: function(e) {
    var ds = e.currentTarget.dataset;
    wx.navigateTo({
      url: '../cast/cast?id=' + ds.id + '&name=' + ds.name + '&type=ing'
    })
  },
  // 分享此页面
  onShareAppMessage: function(res) {
    var that = this
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: that.data.film.title,
      desc: '自定义分享描述',
      path: '/pages/detail/detail?id=' + that.data.film.id + '&title=' + that.data.film.title + '&type=ing',
      success: function(res) {
        // 转发成功
        // console.log('转发成功');
      }, fail: function(res) {
        // 转发失败
        // console.log('转发失败');
      }}
  }
})
