//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: '锐文小说助手',
    userInfo: {},
    showView: false 
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    });
  },
  showToast:function(){
    wx.navigateTo({
      url: '../my/my'
    });
  },
  showPay: function () {
    wx.navigateTo({
      url: '../pay/pay'
    });
  },
  onLoad: function () {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function(userInfo){
      //更新数据
      that.setData({
        userInfo:userInfo,
        showView: getApp().globalData.token ? false:true
      })
    })
  }
})
