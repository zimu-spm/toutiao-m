<template>

    <van-picker
      title="设置性别"
      show-toolbar
      item-height="35"
      :columns="columns"
      :default-index="value"
      @confirm="onConfirm"
      @cancel="onCancel"
      @change="onChange"
    />

</template>

<script>
import { editUserProfileApi } from '@/api/user'
export default {
  name: 'UpdateGender',
  data () {
    return {
      columns: ['男', '女'],
      gender: this.value
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    onCancel () {
      this.$emit('close')
    },
    onChange (Picker, value, index) {
      this.gender = index
    },
    async onConfirm () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        await editUserProfileApi({ gender: this.gender })
        this.$toast.success('修改成功')
        // 更新视图
        this.$emit('input', this.gender)
        // 关闭弹层
        this.$emit('close')
      } catch (err) {
        console.log(`修改用户性别错误是：${err}`)

        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
