import request from '@/utils/request.js'
// 获取联想建议
export const getSearchSug = params => request({
  url: '/app/v1_0/suggestion',
  params
})
// 获取搜索结果
export const getSearchResults = params => request({
  url: '/app/v1_0/search',
  params
})
