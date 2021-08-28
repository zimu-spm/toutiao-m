import request from '@/utils/request.js'
// 获取评论或评论回复
export const getComments = params => request({
  url: '/app/v1_0/comments',
  params
})

// 添加评论或评论回复
export const pubComment = data => request({
  method: 'POST',
  url: '/app/v1_0/comments',
  data
})
// 对评论或评论回复点赞
export const likeTheCom = target => request({
  method: 'POST',
  url: '/app/v1_0/comment/likings',
  data: {
    target
  }
})
// 取消对评论或评论回复点赞
export const cancelLikeTheCom = target => request({
  method: 'DELETE',
  url: `/app/v1_0/comment/likings/${target}`

})
