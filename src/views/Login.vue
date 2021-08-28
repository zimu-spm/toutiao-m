<template>
  <div>
    <div class="toutiao-head">
      <van-nav-bar title="登陆" @click-left="reBefore">
      <template #left>
          <van-icon class="crossIcon" name="cross" size="20" color="#ffffff" />
      </template>
      </van-nav-bar>

    </div>
    <van-form @submit="onSubmit" ref="loginForm">
      <van-field
        v-model="userLogin.mobile"
        name="mobile"
        placeholder="请输入手机号"
        type="number"
        :rules="rules.mobileRules"
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji"></i>
        </template>
      </van-field>
      <van-field
        v-model="userLogin.code"
        type="number"
        name="code"
        center
        placeholder="请输入验证码"
        :rules="rules.codeRules"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-button
            round
            size="small"
            type="default"
            class="login-btn-Sms"
            native-type="button"
            @click="getCodeMsg"
            v-if="sendBtnShow"
          >获取验证码</van-button>
          <van-count-down :time="time" format="ss 秒" v-else @finish="sendBtnShow = true"/>
        </template>
      </van-field>
      <div class="login-btn-wrap">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { loginApi, getMsgCodeApi } from '@/api/user/index.js' // 导入登录 获取验证码的api函数

export default {
  data () {
    return {
      userLogin: {
        mobile: '',
        code: ''
      },
      rules: {
        // 表单验证规则
        mobileRules: [
          // 手机号验证规则
          { required: true, message: '手机号不能为空' },
          { pattern: /^1[3|5|7|8|4]\d{9}$/, message: '请输入正确的手机号' }
        ],
        codeRules: [
          {
            // 验证码验证规则
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /\d{6}/,
            message: '请输入正确的验证码'
          }
        ]
      },
      time: 1000 * 60,
      sendBtnShow: true // 显示发送验证码按钮
    }
  },
  methods: {
    async onSubmit () {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const { data } = await loginApi(this.userLogin)
        console.log(data)

        this.$store.commit('storeUer', data.data) // 将共享的token数据存储在store的 state的里

        this.$toast.success('登陆成功')
        this.$router.back()
      } catch (err) {
        if (err.request.status == 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('请稍后再试')
        }
      }
    },
    async getCodeMsg () {
      try {
        await this.$refs.loginForm.validate('mobile') // 单独只对手机号进行验证
        this.sendBtnShow = false
        this.sendMobile() // 调用发送验证码函数
      } catch (err) {
        this.$toast(err.message)
      }
    },
    async sendMobile () { // 发送手机号，获取验证码
      try {
        await getMsgCodeApi(this.userLogin.mobile)// 获取验证码api
      } catch (err) {
        if (err.request.status == 404) {
          this.$toast('手机号不正确')
          this.sendBtnShow = true
        } else {
          this.$toast.fail('请稍后再试')
          this.sendBtnShow = true
        }
      }
    },
    reBefore () {
      this.$router.back()
    }

  }

}
</script>

<style lang="less" scoped>
.toutiao {
  font-size: 32px;
}
.login-btn-wrap {
  padding: 53px 33px;
 .van-button--info{
   background-color: #3296fa
 }
}
.login-btn-Sms {
  background-color: #ededed;
  .van-button__text {
    font-size: 22px !important;
  }
}

</style>
