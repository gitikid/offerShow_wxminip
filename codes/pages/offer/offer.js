var app = getApp();
Page({
    data: {
        list: [],
        kind: 'jobtotal',
        inputShowed: false,
        hasData: true,
        anim: {},
        history: [],
        inputval:'',
        keyword: '',            
    },
    cache : [],
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
      };
    },    
    onLoad: function(options) {
    // 页面初始化 options为页面跳转所带来的参数     
        // this.getInfo([app.globalData.domain, 'webapi', this.data.kind, ''].join('/'), {}, true);
        // this.isNewest = true;//是最新列表而非搜索页
        // this.setData({
        //   'history':wx.getStorageSync('history') || []
        // });
    },
    onShow: function(){
    // 页面初始化 options为页面跳转所带来的参数 
        if (app.globalData.needReq) {
          app.globalData.needReq = false;
          this.getInfo([app.globalData.domain, 'webapi', this.data.kind, ''].join('/'), {}, true);
          this.isNewest = true;//是最新列表而非搜索页
          this.setData({
            'history':wx.getStorageSync('history') || []
          });      
        }    
    },
    getInfo: function(urltext, pastData = {}, cache = false) {
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
                duration: 1000
              });
            }
            else{
              wx.hideToast();
            }
            // wx.hideToast();            
            _this.setData({
              list: list,
              hasData: list.length?true:false
            });
            if (cache) {
              _this.cache = list;
            }
          },
          fail: function(res) {
            // fail
            wx.showToast({
              title: 'failed',
              icon: 'loading',
              duration: 10000
            });
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
              inputShowed: false
          });
    },
    inputTyping: function (e) {
      var dataToSet = {};
      this.setData({
        'keyword':e.detail.value          
      });
      if (e.detail.value === '') {
        dataToSet.list = this.cache;
        dataToSet.hasData = this.cache.length?true:false;
        this.setData(dataToSet);
      }
    },
    clickHistory:function(e){
      this.setData({
        'keyword':e.currentTarget.dataset.word
      });
      this.tapSearch();
    },
    clearHistory: function(e){
        wx.setStorageSync('history', []);
        this.setData({
          'history':[]
        });        
    },   
    tapBackground: function(e){
        if (e.target.id === 'historyBackground'){
          this.hideInput();
        }
    },
    tapSearch: function() {
        var history = this.data.history;
        this.hideInput();
        if (this.data.keyword.trim() === '') {
          if ( this.isNewest) {//是最新列表而非搜索页
            wx.showToast({
              'title': '关键词为空',
              'icon': 'loading',
              'duration': 1000
            });
          }
          else{
            app.globalData.needReq = true;
            this.onShow();
          }
        }
        else{
          //go
          this.isNewest = false;//进行搜索，设置非最新列表
          this.getInfo(
            [app.globalData.domain, 'webapi/jobsearch', ''].join('/'),
            {
              'content': this.data.keyword.trim()
            });
          if (history.indexOf(this.data.keyword) === -1){
            //保持4个历史
            history.unshift(this.data.keyword.trim());
            while(history.length > 4){
              history.pop();
            }
            wx.setStorageSync('history', history);
            this.setData({
              'history':history
            });
          }
        }
    },
    tapAbout: function() {
        wx.navigateTo({
          url: '../about/about'
        });
    }
});
