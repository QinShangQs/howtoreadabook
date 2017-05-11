//logs.js
var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
    amount:'',
    userInfo: {},
    hidden: false
  },
  onLoad: function (options) {
    var that = this;
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    });

    util.ajax('users/index',{},function(res){
      that.setData({ amount: res.data.content.amount, hidden: true});
    });
  },

 
})