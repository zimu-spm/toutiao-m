<template>
  <van-field
    v-model.trim="message"
    rows="2"
    autosize
    type="textarea"
    maxlength="50"
    placeholder="请输入留言"
    show-word-limit
  >
    <van-button
    slot="button"
    plain
    type="primary"
    round
    size="mini"
    :disabled='message.length==0'
    @click="pubCom">发布</van-button>
  </van-field>
</template>

<script>
// 导入添加评论或评论回复Api
import { pubComment } from '@/api/comment'
export default {
  data () {
    return {
      message: '' // 输入框内容
    }
  },
  props: {
    target: {
      type: [Number, String, Object],
      required: true
    },
    art_id: {
      type: [Number, String, Object],
      default: null
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    async pubCom () {
      this.$toast.loading({
        message: '发布中...',
        forbidClick: true,
        loadingType: 'spinner'
      })
      try {
        const {
          data: { data }
        } = await pubComment({
          target: Number(this.target && JSON.parse(JSON.stringify(this.target))),
          content: this.message,
          art_id: this.art_id ? JSON.parse(JSON.stringify(this.art_id)) : null
        })
        this.list.unshift(data.new_obj)
        this.$toast.success('发布成功')
        this.message = ''
        this.$emit('finish_com')
      } catch (err) {
        this.$toast.fail('发布失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.van-field__word-limit {
  margin-top: 80px;
  margin-right: 100px;
}
.van-button {
  margin-top: 56px;
}
</style>
