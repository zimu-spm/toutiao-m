<template>
  <van-datetime-picker
    v-model="currentDate"
    type="date"
    title="选择年月日"
    :min-date="minDate"
    :max-date="maxDate"
    @cancel="onCancle"
    @confirm="onConfirm"
  />
</template>

<script>
import { editUserProfileApi } from '@/api/user'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  data () {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    onCancle () {
      this.$emit('close')
    },
    async onConfirm () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const time = dayjs(this.currentDate).format('YYYY-MM-DD')

        await editUserProfileApi({ birthday: time })
        this.$toast.success('修改成功')
        // 更新视图
        this.$emit('input', time)
        // 关闭弹层
        this.$emit('close')
      } catch (err) {
        console.log(`修改用户出生日期错误是：${err}`)
        this.$toast.fail('修改失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
</style>
