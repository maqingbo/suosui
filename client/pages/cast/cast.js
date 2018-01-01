/**
 * @Date:   2017-12-26 17:24
 * @Email:  wmaqingbo@163.com
 * @Last modified time: 2018-01-01 12:24
 */

Page({
  data: {
    cast: {},
    showLoading: true,
    options: null
  },
  onLoad: function (options) {
    var that = this
    wx.setNavigationBarTitle({
      title: options.name
    })
    wx.request({
      url: 'https://api.douban.com/v2/movie/celebrity/' + options.id,
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        var data = res.data
        console.log(data);
        that.setData({
          cast: data,
          showLoading: false
        })
      }
    })
  }
})
