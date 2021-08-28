import request from '@/utils/request.js'
// 频道新闻推荐_V1.1
export const getChannelItemApi = params => request({
  url: '/app/v1_1/articles',
  params
})
// 获取新闻文章详情
export const getArticleDetailApi = articleId => request({
  url: `/app/v1_0/articles/${articleId}`

})

// 收藏文章
export const collectArticleApi = (target) => request({
  method: 'POST',
  url: '/app/v1_0/article/collections',
  data: { target }
})
// 取消收藏文章
export const noCollectArticleApi = (target) => request({
  method: 'DELETE',
  url: `/app/v1_0/article/collections/${target}`
})

// 点赞文章
export const giveLikeApi = (target) => request({
  method: 'POST',
  url: '/app/v1_0/article/likings',
  data: { target }
})
// 取消收藏文章
export const cancelLikeApi = (target) => request({
  method: 'DELETE',
  url: `/app/v1_0/article/likings/${target}`
})
