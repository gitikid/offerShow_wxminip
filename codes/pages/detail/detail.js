// pages/detail/detail.js
var app = getApp();
Page({
  data: {
    detail: {},
    id: ''
  },
  onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
    var temp = app.getCache(options.id);
    this.setData({
      detail: temp,
      id: options.id
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
  tapBack:function(){
    wx.navigateBack();
  },  
  postRank: function(urltext) {
    wx.showToast({
      title: 'loading',
      icon: 'loading',
      duration: 10000
    })
    app.getAjaxData({
      url: urltext,
      data: {
        'id': this.data.id
      },
      success: function(res) {
        wx.showToast({
          title: '谢谢评价',
          icon: 'success',
          duration: 2000
        })
      },
      fail: function(res) {
        // fail
        wx.showToast({
          title: '错误',
          icon: 'success',
          duration: 2000
        })
      },
      complete: function(res) {
        setTimeout(function() {
          wx.navigateBack()
        }, 1500);
      }
    })
  },
  tapRank: function(e) {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定提交信息？',
      success: function(res) {
        var url = '';
        if (res.confirm) {
          console.log('用户点击确定');
          url = [app.globalData.domain, 'webapi', e.target.dataset.rank, ''].join('/');
          that.postRank(url);
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  }
})