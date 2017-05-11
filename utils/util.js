function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  ajax:ajax
}

function ajax(_api, _data, _success, _fail, _complate){
  wx.request({
    url: 'https://c4b64fed.ngrok.io/' + _api, //仅为示例，并非真实的接口地址
    data: _data,
    header: {
      'content-type': 'application/json',
      'token': wx.getStorageSync('token')
    },
    complete:function(res){
      if (_complate) {
        _complate(res);
      }
    },
    success: function (res) {
      if(res.data.code == 300){
        wx.showToast({
          title: '验证失败，需要跳转',
          icon: 'success',
          duration: 2000
        })
      } else if (typeof _success == 'function'){
          _success(res);
      }
    },
    fail:function(res){
      if(_fail){
        _fail(res);
      }
    }
  })
}