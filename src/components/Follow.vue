//关注组件
<template>
  <van-button
    v-if="isFollow"
    class="follow-btn"
    round
    size="small"
    :loading="isLoad"
    loading-type="spinner"
    @click="onFollow"
  >已关注</van-button>
  <van-button
    class="follow-btn"
    type="info"
    v-else
    color="#3296fa"
    round
    size="small"
    :loading="isLoad"
    loading-type="spinner"
    icon="plus"
    @click="onFollow"
  >关注</van-button>
</template>

<script>
import { followUserApi, cancelFollowApi } from '@/api/user'
// 公共数据源取出 登陆用户id
import { mapState } from 'vuex'
export default {
  data () {
    return {
      isLoad: false // 加载状态
    }
  },
  name: 'follow',
  model: {
    prop: 'isFollow',
    event: 'changeFollow'
  },
  props: {
    isFollow: {
      type: Boolean,
      required: true
    },
    autId: {
      type: [Number, String, Object],
      required: true
    }
  },
  computed: {
    ...mapState(['user_id'])
  },
  methods: {
    async onFollow () {
      if (this.user_id == this.autId) {
        return this.$toast.fail('用户不能关注自己')
      }
      this.isLoad = true
      try {
        if (this.isFollow) {
          await cancelFollowApi(this.autId)
        } else {
          await followUserApi(this.autId)
        }

        this.$emit('changeFollow', !this.isFollow) // 更新视图状态，在Ajax请求后改变
      } catch (err) {
        if (err.response && err.response.status == 401) {
          this.$toast.fail('请登录后再操作')
        } else {
          this.$toast.fail('请稍后再试试')
        }
      }
      this.isLoad = false
    }
  }
}
</script>

<style lang="less" scoped>
</style>
