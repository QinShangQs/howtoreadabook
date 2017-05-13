//app.js
App({
 data:{  
    appid:'wx29aa31ee54d6feb3',
    appsecret:'41ba95339b1a4b2c73f6e92b5e98f0c2',
 },
  onLaunch: function () {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
  },
  getUserInfo:function(cb){
    var that = this
    if(this.globalData.userInfo){
      typeof cb == "function" && cb(this.globalData.userInfo)
    }else{
      //调用登录接口
      wx.login({
        success: function (res) {
          //console.info(res);
          if(res.code){
            wx.request({
                url: 'https://api.weixin.qq.com/sns/jscode2session?appid='+getApp().data.appid+'&secret='+getApp().data.appsecret+'&js_code='+res.code+'&grant_type=authorization_code',

                success: function (response) {
                 // console.log(response.openid)
                  //console.log(response);
                }
              })
          }


          wx.getUserInfo({
            success: function (res) {
             // console.info(res);
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null
  }
})