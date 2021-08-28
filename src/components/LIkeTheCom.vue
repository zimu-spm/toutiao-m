<template>
  <van-button
  :icon="theCom.like_count>0?'good-job':'good-job-o'"
  :loading='isLoad'

  @click="click_like"
  > {{theCom.like_count || '赞'}}</van-button >

</template>

<script>
import { likeTheCom, cancelLikeTheCom } from '@/api/comment'
export default {
  data () {
    return {
      isLoad: false
    }
  },
  name: 'LikeTheCom',
  props: {
    theCom: {
      type: Object,
      required: true
    }
  },
  methods: {
    async  click_like () {
      this.isLoad = true

      try {
        if (this.theCom.is_liking) {
          await cancelLikeTheCom(this.theCom.com_id)
        } else {
          await likeTheCom(this.theCom.com_id.toString())
        }
        this.$toast.success(this.theCom.is_liking ? '取消点赞成功' : '点赞成功')
        // 更新数据 ，从而更新视图
        this.theCom.is_liking ? this.theCom.like_count-- : this.theCom.like_count++
        this.theCom.is_liking = !this.theCom.is_liking
      } catch (err) {
        this.$toast.fail('操作失败，请稍后再试')
      }
      this.isLoad = false
    }
  }
}
</script>

<style lang="less" scoped>

</style>
