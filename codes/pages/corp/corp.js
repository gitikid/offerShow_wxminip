// pages/corp/corp.js
var app = getApp();
Page({
  data: {
    isiOS:app.globalData.isiOS,
    corp: '',
    positionls: [],
    salary: '0',
    detaills: [],
    offerls: []
  },
  onLoad: function(options) {
    this.setData({
      corp: options.name
    });
    var _this = this;
    wx.showToast({
      title: 'loading',
      icon: 'loading',
      duration: 10000
    });
    app.getAjaxData({
      url: [app.globalData.domain, 'webapi/jobsearch/'].join('/'),
      data: {
        'content': options.name
      },
      success: function(res) {
        // success
        var ls = res.data.info;
        analyze(ls, _this);
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
        wx.hideToast();
      }
    });
    // 页面初始化 options为页面跳转所带来的参数
  },
  tapBack:function(){
    wx.navigateBack();
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
  }
});

function analyze(ls, that) {
  // ls.sort(function(a,b){
  //   return parseInt(b.time.slice(4),10) - parseInt(a.time.slice(4),10);
  // });
  that.setData({
    positionls: ls.slice(0, 5).map((v, i) => {
      return v.position;
    }),
    offerls: ls,
    salary: ls[0].salary
  });
}