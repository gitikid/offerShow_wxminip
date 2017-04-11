var app = getApp();
Page({
    data: {
        list: [],
        kind: 'jobtotal',
        keyword: '',
        corpMode: false,        
        inputShowed: false,
        inputVal: ""
    },
    onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数
        this.getInfo([app.globalData.domain, 'webapi', this.data.kind, ''].join('/'), this.data.corpMode);
    },        
    getInfo: function(urltext, corpMode = false, pastData = {}) {
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
            })
          },
          complete: function(res) {
            // complete
            wx.hideToast();
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
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        this.setData({
            inputVal: e.detail.value
        });
    },
    tapSearch: function(e) {
        if (this.data.keyword.trim() !== '') {
          this.setData({
            corpMode: false
          });
          this.getInfo(
            [app.globalData.domain, 'webapi/jobsearch', ''].join('/'),
            this.data.corpMode, {
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