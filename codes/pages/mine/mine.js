// pages/mine/mine.js
var app = getApp();
Page({
  data:{
    list:[],
    hasData: false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数

  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    var storage = app.getFav();
    var offerList = Object.keys(storage).map(key => storage[key]);
    this.setData({
      list: offerList,
      hasData: offerList.length?true:false
    });
    storage = null;
    offerList = null;
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  }
});