import  httpRequest  from '../request'

// 获取icon分类
export function getIconTypeApi(params){
return  httpRequest({
  url:'/iconType',
  params
})
}