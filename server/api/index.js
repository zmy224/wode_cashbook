// 首页相关接口

import  httpRequest   from '../request'
//获取日常记账流水

export function getSpendDailyApi(params){
  return  httpRequest({
    url:'/spendDaily',
    params
  })
  }