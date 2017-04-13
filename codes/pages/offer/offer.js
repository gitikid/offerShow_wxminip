var app = getApp();
Page({
    data: {
        list: [],
        kind: 'jobtotal',
        keyword: '',
        inputShowed: false
    },
    onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
        this.getInfo([app.globalData.domain, 'webapi', this.data.kind, ''].join('/'));
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
              list: list
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
