import request from '@/utils/request.js'

// 删除指定用户频道
export const delTheMyChannel = (id) => request({
  method: 'DELETE',
  url: `/app/v1_0/user/channels/${id}`

})
// 全部频道列表
export const getAllChannels = () => request({
  method: 'GET',
  url: '/app/v1_0/channels'
})

// 批量修改用户频道列表（部分覆盖）
export const patchMyChannels = (channels) => request({
  method: 'PATCH',
  url: '/app/v1_0/user/channels',
  data: {
    channels: channels
  }
})
