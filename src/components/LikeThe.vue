//点赞组件
<template>
  <van-button
  :icon="value==1?'good-job':'good-job-o'"
  :loading='isLoad'
  :class="{like:value==1}"
  @click="onAttitude"
  />
</template>

<script>
import { giveLikeApi, cancelLikeApi } from '@/api/article'
export default {
  name: 'Like',
  data () {
    return {
      isLoad: false// 加载状态

    }
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    artId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async  onAttitude () {
      this.isLoad = true
      try {
        let status = -1
        if (this.value == 1) {
          await cancelLikeApi(this.artId)
        } else {
          await giveLikeApi(this.artId)
          status = 1
        }
        // 更新视图
        this.$emit('input', status)
        // 操作后提醒
        this.$toast.success(status == 1 ? '点赞成功' : '取消点赞')
      } catch (err) {

      }
      this.isLoad = false
    }
  }
}
</script>

<style lang="less" scoped>
.van-button--normal {
  padding: 0;
  height: unset;
}
.like{
    color: #E5645F;
}
</style>
