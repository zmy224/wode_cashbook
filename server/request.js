

const baseUrl  =  'http://127.0.0.1:3000'
// url,params,methods
export default function httpRequest(config){
  return new Promise((resolve,reject)=>{
    wx.request({
      url:baseUrl+config.url , //仅为示例，并非真实的接口地址
      data: {
        ...config.params
      },
      header: {
        'content-type': 'application/json' // 默认值
      },
      method:config.methods || 'POST',
      success(res) {
          resolve(res);
      },
      fail(err) {
         reject(err);
      }
    })
  })
  
}