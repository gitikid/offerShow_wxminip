// pages/main/main.js
var app = getApp();
Page({
  data: {
    list: [],
    kind: 'jobhot',
    keyword: '',
    anim: {}
  },
  onShareAppMessage: function () {
    return {
      title: 'OfferShow-最可信的校招薪水交流平台',
      path: 'pages/hot/hot',
      success: function(res) {
        wx.showToast({
          'title':'分享成功',
          'icon':'success',
          'duration': 1000
        });
      },
      fail: function(res) {
        // 分享失败
      }
    }
  },     
  getInfo: function(urltext, pastData = {}) {
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
          // select unique corperation
          var hash = {};
          var filted = [];
          var temp = {
            'company': '',
            'number': 0,
            'positions': []
          };
          var ii = 0;
          list.forEach((v, i) => {
            if (hash.hasOwnProperty(v.company)) {
              hash[v.company].number += v.number;
              if(hash[v.company].positions.length < 3){
                hash[v.company].positions.push(v.position.slice(0,5));
              }
            } else {
              hash[v.company] = {
                'company': v.company,
                'number': v.number,
                'positions': [v.position.slice(0,5)]
              }
            }
          });
          filted = Object.keys(hash).map(key => hash[key]);

          filted.sort((a, b)=>{
            return b.number - a.number;
          });
          _this.setData({
            list: filted,
            corpMode: true
          });
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
    this.getInfo([app.globalData.domain, 'webapi', this.data.kind, ''].join('/'));
  },
  onReady: function() {
    // 页面渲染完成
  },
  // onShow: function() {
  //   // 页面显示
  //   var animation = wx.createAnimation({
  //     duration: 300,
  //     timingFunction: "ease",
  //     delay: 0
  //   });
  //   animation.translate(0, -20).step();
  //   animation.translate(0, 0).step();
  //   this.setData({
  //     anim: animation.export()
  //   });        
  // },
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
