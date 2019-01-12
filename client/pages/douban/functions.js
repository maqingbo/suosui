/**
 * @Date:   2017-12-26 12:30
 * @Email:  wmaqingbo@163.com
 * @Last modified time: 2018-01-08 22:35
 */

var config = require('./config.js')
var store = require('./store.js')
module.exports = {
  // 获取位置坐标
  // 使用百度API逆向解析
  // 将百度地图返回的位置对象，以参数的形式传入 cb 函数
  getLocation: function (cb) {
    var location = store.location

    if (location) {
      cb(location)
      return;
    }

    wx.getLocation({
      success: function (res) {
        // 获取经纬度
        var locationParam = res.latitude + ',' + res.longitude
        // 使用百度地图逆向解析出地址信息
        wx.request({
          url: 'https://api.map.baidu.com/geocoder/v2/?ak=' + config.baiduAK + '&location=' + locationParam + '1&output=json&pois=1',
          header: {
            "Content-Type": "json",
          },
          success: function (res) {
            var data = res.data
            // console.log(data);
            store.location = data.result
            console.log(data.result);
            // data.result 为百度地图返回的位置信息，是一个对象
            // 将百度地图返回的位置对象，以参数的形式传入 cb 函数（跨域）
            cb(data.result)
          }
        })
      }
    })
  },
  // 获取所在城市
  getCity: function (cb) {
    this.getLocation(function (location) {
      cb(location.addressComponent.city.replace('市', ''))
    })
  },
  // 从豆瓣获取用户所在城市的热映电影
  fetchFilms: function (url, city, start, count, cb) {
    var that = this
    // apikey为固定值
    wx.request({
      url: url + '?apikey=0b2bdeda43b5688921839c8ecb20399b' + '&city=' + city + '&start=' + start + '&count=' + count,
      header: {
        "Content-Type": "json",
      },
      success: function (res) {
        var data = res.data
        if (data.subjects.length === 0) {
          that.setData({
            hasMore: false,
          })
        } else {
          that.setData({
            films: that.data.films.concat(data.subjects),
            start: that.data.start + data.subjects.length
          })
        }
        cb(data)
      }
    })
  }
}
