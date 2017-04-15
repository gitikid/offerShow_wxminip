// pages/post/post.js
var app = getApp();
Page({
  data:{
    category:[
      "销售|客服|市场",
      "财务|人力资源|行政",
      "项目|质量|高级管理",
      "IT|互联网|通信",
      "房产|建筑|物业管理",
      "金融",
      "采购|贸易|交通|物流",
      "生产|制造",
      "传媒|印刷|艺术|设计",
      "咨询|法律|教育|翻译",
      "服务业",
      "能源|环保|农业|科研",
      "服务业",
      "兼职|实习|社工|其他"     
    ],
    title:[
      "博士985",
      "博士211",
      "博士其他",
      "硕士985",
      "硕士211",
      "硕士其他",
      "本科985",
      "本科211",
      "本科其他",
      "大专",
      "其它"  
    ],
    cateIndex:3,
    titleIndex:6,
    company:'',
    position:'',
    city:'',
    salary:'',
    remark:'',
    isInput:false,
    toViewId:'basic'
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  onFocus:function(){
    this.setData({
      isInput:true,
      toViewId:'remark'
    });
  },
  onBlur:function(){
    this.setData({
      isInput:false,
      toViewId:'basic'
    });    
  },
  changeCate:function(e){
    this.setData({
      cateIndex: e.detail.value
    });
  },
  changeTitle:function(e){
    this.setData({
      titleIndex: e.detail.value
    });
  },  
  onInput:function(e){
    var changedData = {};
    var text = e.detail.value.trim();
    if(text === ''){
      return;
    }
    if(text.length > 10 && e.target.id === 'salary'){
      wx.showToast({
        'title':'超出字数',
        'icon':'loading',
        'duration':1000
      });
      return;
    }
    if(text.length > 45 && e.target.id !== 'desc'){
      wx.showToast({
        'title':'超出字数',
        'icon':'loading',
        'duration':1000
      });
      return;
    }
    if(text.length > 450 && e.target.id === 'desc'){
      wx.showToast({
        'title':'超出字数',
        'icon':'loading',
        'duration':1000
      });      
      return;
    }
    changedData[e.target.id] = e.detail.value.trim();
    this.setData(changedData);    
  },
  tapConfirm:function(){
    var that = this;
    wx.showModal({
      title: '提示',
      content: '确定提交信息？',
      success: function(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          that.tapSubmit();
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
    // this.setData({
    //   'showMsg':true
    // });
  },
  tapAbove:function(){
    wx.navigateBack();
  },
  tapCancel:function(){
  },
  tapSubmit:function(){
    var param = {
      'hangye':this.data.category[this.data.cateIndex],
      'company':this.data.company,
      'position':this.data.position,
      'city':this.data.city,
      'salary':this.data.salary,
      'xueli':this.data.title[this.data.titleIndex]
    };
    for(var i in param){
      if(param[i].length < 1){
        wx.showToast({
          'title':'信息不完整',
          'icon':'loading',
          'duration':1000
        });
        return;        
      }
    }
    param['remark'] = this.data.remark;
    wx.showToast({
      'title':'提交中',
      'icon':'loading',
      'duration':10000
    });
    app.getAjaxData({
      url: [app.globalData.domain,'webapi/jobrecord',''].join('/'),
      data: param,
      success: function(res){
        wx.showToast({
          'title':'成功',
          'icon':'success',
          'duration':2000
        });
        setTimeout(function(){
          wx.navigateBack();
        },1500)
      },
      fail: function(res) {
        // fail
      },
      complete: function(res) {
        // complete
      }
    })    
  },  
})