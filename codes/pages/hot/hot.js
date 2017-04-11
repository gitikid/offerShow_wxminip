// pages/main/main.js
var app = getApp();
Page({
  data: {
    list: [],
    kind: 'jobhot',
    keyword: '',
    msg: '',
    corpMode: true
  },
  getInfo: function(urltext, corpMode = true, pastData = {}) {
    var _this = this;
    wx.showToast({
      title: 'loading',
      icon: 'loading',
      duration: 10000
    });
    app.getAjaxData({
      url: urltext,
      data: pastData,
      success: function(res) {
        // success
        var list = res.data.info;
        if (corpMode) {
          // select unique corperation
          var hash = {};
          var filted = list.filter((v, i) => {
            if (hash.hasOwnProperty(v.company)) {
              return false;
            } else {
              hash[v.company] = 1;
              return true;
            }
          });
          _this.setData({
            list: filted,
            corpMode: true
          });
        } else {
          _this.setData({
            list: list,
            corpMode: false
          });
        }
      },
      fail: function(res) {
        // fail
        wx.showToast({
          title: 'failed',
          icon: 'success',
          duration: 10000
        });
      },
      complete: function(res) {
        // complete
        wx.hideToast();
      }
    });
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getInfo([app.globalData.domain, 'webapi', this.data.kind, ''].join('/'), this.data.corpMode);
  },
  onReady: function() {
    // 页面渲染完成
  },
  onShow: function() {
    // 页面显示
  },
  onHide: function() {
    // 页面隐藏
  },
  onUnload: function() {
    // 页面关闭
  },
  tapAbout: function() {
    wx.navigateTo({
      url: '../about/about'
    });
  }
});