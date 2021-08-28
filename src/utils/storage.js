// 本地储存模块

// 获取本地储存
export const getLocalInfo = key => JSON.parse(localStorage.getItem(key))

// 设置本地存储
export const setLocalInfo = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value))
}

// 删除本地存储
export const removeLocalInfo = (key) => {
  localStorage.removeItem(key)
}
