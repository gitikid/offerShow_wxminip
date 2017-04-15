var app = getApp();
Page({
    data: {
        list: [],
        kind: 'jobtotal',
        keyword: '',
        inputShowed: false,
        hasData: true,
        anim: {}
    },
    onShareAppMessage: function () {
      return {
        title: 'offerShow·校招offer查询平台',
        path: '/about/about',
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
    onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数     
        this.getInfo([app.globalData.domain, 'webapi', this.data.kind, ''].join('/'));
    },
    onShow: function(){
      if(this.data.keyword !== ''){
        this.setData({
          keyword: '',   
          inputShowed: false       
        });
        this.onLoad();
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
            if (list.length < 1){
              wx.showToast({
                title: '无结果',
                icon: 'loading',
                duration: 2000
              });
            }
            else{
              wx.hideToast();
            }
            _this.setData({
              list: list,
              hasData: list.length?true:false
            });
          },
          fail: function(res) {
            // fail
            wx.showToast({
              title: 'failed',
              icon: 'loading',
              duration: 10000
            })
          },
          complete: function(res) {
            // complete
          }
        });
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            keyword: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            keyword: ""
        });
    },
    inputTyping: function (e) {
        this.setData({
            keyword: e.detail.value.trim()
        });
    },
    tapSearch: function(e) {
        if (this.data.keyword.trim() !== '') {
          this.getInfo(
            [app.globalData.domain, 'webapi/jobsearch', ''].join('/'),
            {
              'content': this.data.keyword.trim()
            });
        } else {
          wx.showToast({
            'title': '关键词为空',
            'icon': 'loading',
            'duration': 1000
          });
        }
    },
    tapAbout: function() {
        wx.navigateTo({
          url: '../about/about'
        });
    }
});
