//收藏组件
<template>
  <van-button loading  v-if="isLoad"/>
  <van-icon color="#777" name="star" @click="onCollect" v-else-if='isCollected' />
  <van-icon color="#777" name="star-o" @click="onCollect" v-else/>
</template>

<script>
import { collectArticleApi, noCollectArticleApi } from '@/api/article'
export default {
  data () {
    return { isLoad: false }
  },
  model: {
    prop: 'isCollected',
    event: 'changeStatus'
  },
  props: {
    isCollected: {
      type: Boolean,
      required: true
    },
    artId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onCollect () {
      this.isLoad = true
      try {
        if (this.isCollected) {
          await noCollectArticleApi(this.artId)
        } else {
          await collectArticleApi(this.artId)
        }
        // 更新视图（子传父） 数据更新有延迟
        this.$emit('changeStatus', !this.isCollected)
        this.$toast.success(!this.isCollected ? '收藏成功' : '取消收藏')
      } catch (err) {

      }
      this.isLoad = false
    }
  }
}
</script>

<style lang="less" scoped>
 /deep/.van-button ,.van-button--normal{
    width: 36px !important;
    height: 38px !important ;
    padding: 0 !important;
}
.van-button--default{
    border: none;
}
.van-icon-star{
    color: #FFA500 !important;
}

</style>
