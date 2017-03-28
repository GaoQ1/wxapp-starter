var promise = require('utils/promise.js');
App({
  globalData: {
    'baseurl': 'http://接口url'
  },

  fetchApi (url, params, method='GET') {
    let methodParam = {
      method: method
    };

    return new promise((resolve, reject) => {
      wx.request(
        Object.assign({
          url: `${this.globalData.baseurl}/${url}`,
          data: Object.assign({}, params),
          header: Object.assign({
            'Content-Type': 'application/json'
          }),
          method: method,
          success: resolve,
          fail: reject
        },methodParam)
      )
    }).then((data) => {
      return promise.resolve(data.data);
    }).catch((err) => {
      console.log(err);
    })
  },

  get(url, params){
    return this.fetchApi(url, params);
  },

  post(url, params){
    return this.fetchApi(url, params, 'POST');
  },

  onLaunch(){
    this.login();
  },

  onShow(){
    // console.log('onShow');
    // 当应用程序进入前台显示状态时触发
  },

  onHide(){
    // console.log('onHide');
    // 当应用程序进入后台状态时触发
  }

})

//Object对象方法的polyfill
Object.values=function(obj){
  var values=[];
  for (var key in obj) {
    values.push(obj[key])
  }
  return values;
}

//Object.assign兼容性处理
if (typeof Object.assign != 'function') {
  Object.assign = function(target) {
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      if (source != null) {
        for (var key in source) {
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}
