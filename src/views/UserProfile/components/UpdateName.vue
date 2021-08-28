<template>
  <div>
    <van-nav-bar
      title="设置昵称"
      left-text="取消"
      right-text="完成"
      class="cancel_bac"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-field
      class="name_file"
      v-model.trim="userName"
      rows="2"
      autosize
      type="textarea"
      maxlength="7"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { editUserProfileApi } from '@/api/user'
export default {
  name: 'UpdateName',
  data () {
    return {
      userName: this.value
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    onClickLeft () {
      this.$emit('close')
    },
    async onClickRight () {
      if (!this.userName.length) { // 输入框为空时
        this.$toast('昵称不能为空')
        return
      }
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await editUserProfileApi({ name: this.userName })

        this.$toast.success('修改成功')
        // 更新视图
        this.$emit('input', this.userName)
        // 关闭弹层
        this.$emit('close')
      } catch (err) {
        console.log(`修改用户昵称错误是：${err}`)

        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.name_file {
  padding: 20px 60px;
}
.cancel_bac {
  background-color: unset !important;
}
</style>
