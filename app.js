//app.js
App({
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
        success: function (lr) {
          wx.getUserInfo({
            success: function (res) {
              console.info(res);
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)

              wx.request({
                url: 'https://e80a8bc0.ngrok.io/users/littleLogin',
                data: {
                  code: lr.code, 
                  encryptedData: res.encryptedData,
                  iv: res.iv
                },
                method: 'GET',
                header: {
                  'content-type': 'application/json'
                }, 
                complete:function(obj){
                  //console.info(obj);
                },
                success:function(obj){
                  console.log('[login]',obj.data);
                  console.log('[token]', obj.data.content.session_key);
                  
                  wx.setStorage({
                    key: 'token',
                    data: obj.data.content.session_key,
                  });
                  
                  for(var k in obj.data.content){
                    if(k != 'session_key'){
                      wx.setStorage({
                        key: k,
                        data: obj.data.content[k],
                      });
                    }
                  }


                  that.globalData.token = obj.data.content.session_key;
                  wx.showToast({
                    title: '锐文远程登录成功',
                    icon: 'success',
                    duration: 2000
                  })
                },
                fail:function(obj){
                  console.info(obj);
                }
              });
            }
          })
        }
      })
    }
  },
  globalData:{
    userInfo:null,
    token:'',
  }
})