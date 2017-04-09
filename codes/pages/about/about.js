// pages/about/about.js
var app = getApp();
Page({
  data: {
    anim: {}
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var animation = wx.createAnimation({
      duration: 1500,
      timingFunction: "ease",
      delay: 0
    });
    animation.opacity(1).step();
    this.setData({
      anim: animation.export()
    });

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
  tapBack: function() {
    wx.navigateBack({
      delta: 1, // 回退前 delta(默认为1) 页面
      success: function(res) {
        // success
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })
  }
})