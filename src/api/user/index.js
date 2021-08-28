import request from '@/utils/request.js'

// 登陆注册api
export const loginApi = (data) => request({
  method: 'post',
  url: '/app/v1_0/authorizations',
  data
})

// 发送验证码
export const getMsgCodeApi = (mobile) => request({
  url: `/app/v1_0/sms/codes/${mobile}`

})
// 获取用自己新
export const getSelfMsgApi = () => request({
  url: '/app/v1_0/user'
})
// 获取用户频道列表
export const getchannelsApi = () => request({
  url: '/app/v1_0/user/channels'
})

// 关注用户
export const followUserApi = (target) => request({
  method: 'POST',
  url: '/app/v1_0/user/followings',
  data: { target }
})
// 取消关注
export const cancelFollowApi = (target) => request({
  method: 'DELETE',
  url: `/app/v1_0/user/followings/${target}`

})
// 获取用户个人资料
export const getUserProfileApi = () => request({

  url: '/app/v1_0/user/profile'

})
// 编辑用户个人资料
export const editUserProfileApi = (data) => request({
  method: 'PATCH',
  url: '/app/v1_0/user/profile',
  data
})
// 编辑用户照片资料（头像、身份证照片）
export const editUserAvatarApi = (data) => request({
  method: 'PATCH',
  url: '/app/v1_0/user/photo',
  data
})
