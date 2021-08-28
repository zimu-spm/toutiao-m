import Vue from 'vue'
import Vuex from 'vuex'
import { setLocalInfo, getLocalInfo } from '@/utils/storage.js'
Vue.use(Vuex)
const Token_User = 'Token_User'
export default new Vuex.Store({
  state: {
    userInfo: getLocalInfo(Token_User) || null, // 从本地获取token
    user_id: null
  },
  mutations: {
    storeUer (state, data) {
      state.userInfo = data
      setLocalInfo(Token_User, state.userInfo) // 将token存储在本地，使其持久
    },
    storeUserId (state, data) {
      console.log(data)

      state.user_id = data
    }
  },
  actions: {},
  modules: {}
})
