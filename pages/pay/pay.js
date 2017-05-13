var util = require('../../utils/util.js');
var app = getApp()
Page({
  data: {
  
  },
  onLoad: function (options) {
  
  },
  topay: function (event){
    console.log(event);
    var money = event.target.id;
    util.ajax('recharge/wxpay/app/' + money,{},function(res){
      console.log(res);
      var params = res.data.content.params;
      wx.requestPayment(
      {
    	'appId' : params.appId,
    	'timeStamp': params.timeStamp,
    	'nonceStr': params.nonceStr,
    	'package': params.package,
    	'signType': params.signType,
    	'paySign': params.paySign,
    	'success':function(res){console.log('success', res)},
      'fail': function (res) { console.log('fail', res)},
      'complete': function (res) { console.log('complete', res)}
    	})
    });
  }

})