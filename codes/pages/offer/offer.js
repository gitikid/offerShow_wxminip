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
    isNewest: true,//是最新列表而非搜索页
    onShareAppMessage: function () {
      return {
        title: 'OfferShow-最可信的校招薪水交流平台',
        path: 'pages/offer/offer',
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
        this.isNewest = true;//是最新列表而非搜索页
    },
    onShow: function(){
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
        if (this.data.keyword.trim() === '') {
          if ( this.isNewest) {//是最新列表而非搜索页
            wx.showToast({
              'title': '关键词为空',
              'icon': 'loading',
              'duration': 1000
            });
          }
          else{
            this.onLoad();
          }
        }
        else{
          this.isNewest = false;//进行搜索，设置非最新列表
          this.getInfo(
            [app.globalData.domain, 'webapi/jobsearch', ''].join('/'),
            {
              'content': this.data.keyword.trim()
            });
        }
    },
    tapAbout: function() {
        wx.navigateTo({
          url: '../about/about'
        });
    }
});
