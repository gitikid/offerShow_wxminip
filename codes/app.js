//app.js
var token = require('/utils/token.js');
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);
  },
  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function() {
          wx.getUserInfo({
            success: function(res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  setFav: function(key, value){
    var obj = wx.getStorageSync('fav') || {};
    obj[key] = value;
    wx.setStorageSync('fav', obj);
  },
  getFav: function(key){
    if (typeof key === 'undefined') {
      return wx.getStorageSync('fav');
    }
    else{
      if (typeof key === 'string') {
        return wx.getStorageSync('fav')[key];
      }
      else{
        return null;
      }
    }
    
  },
  delFav: function(key){
    var obj = wx.getStorageSync('fav') || {};
    if (key in obj) {
      delete obj[key];
    }
    wx.setStorageSync('fav', obj);    
  },
  getCache: function(id) {
    return this.cache[id];
  },
  setCache: function(id, value) {
    this.cache[id] = value;
  },
  getAjaxData: function(param) {
    var tempObj, textls = [],
      _this = this;
    if (param.url === undefined) {
      throw 'url is underfined';
    }
    if (param.data === undefined) {
      throw 'data is underfined';
    }
    if (typeof param.success === 'undefined') {
      throw 'callback is undefined';
    }
    textls.push('access_token'.concat('=', encodeURIComponent(this.globalData.token)));
    for (var i in param.data) {
      textls.push(i.concat('=', encodeURIComponent(param.data[i])));
    }
    wx.request({
      url: param.url,
      data: textls.join('&'),
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }, // 设置请求的 header
      success: function(res) {
        // success
        var sour = {};
        if (typeof param.success === 'function' && res.data.r === 1) {
          if (res.data.info instanceof Array) {
            res.data.info.forEach((v, i) => {
              _this.setCache(v.id, v);
            });
          }
          param.success(res);
        } else {
          if (res.data.r !== 1) {
            wx.showToast({
              'title': res.data.msg,
              'icon': 'loading',
              'duration': 1000
            });
          }
        }
      },
      fail: function(res) {
        // fail
        if (typeof param.fail === 'function') {
          param.fail(res);
        }
      },
      complete: function(res) {
        // complete
        if (typeof param.complete === 'function') {
          param.complete(res);
        }

      }
    });
  },
  cache: {},
  globalData: {
    isiOS: wx.getSystemInfoSync().system.indexOf('iOS') === -1?false:true,
    token: token.token,
    domain: 'https://www.ioffershow.com',
    userInfo: null
  }
});