<template>
  <div>
  <!-- 未登录 -->
    <div class="my-head-banner not_login" v-if="!userInfo">
      <div class="login_btn" @click='to_login'>
        <van-image class="img-mobile" round :src="require('../../assets/mobile.png')"/>
        <span>登陆/注册</span>
      </div>
    </div>
    <!-- 已登陆 -->
    <div class="my-head-banner login_user" v-else >
      <div class="login_top">
        <div class="login-left">
          <van-image round class="login_img" fit="cover" :src="userInfos.photo"/>
          <span>{{userInfos.name}}</span>
        </div>
        <div class="login-right">
          <van-button type="default" size="mini" round to='/user/profile'>编辑资料</van-button>
        </div>
      </div>
      <div class="login_bottom">
        <div class="login_bottom_item">
          <span>{{userInfos.art_count}}</span>
          <span>头条</span>
        </div>
        <div class="login_bottom_item">
          <span>{{userInfos.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="login_bottom_item">
          <span>{{userInfos.art_count}}</span>
          <span>粉丝</span>
        </div>
        <div class="login_bottom_item">
          <span>{{userInfos.like_count}}</span>
          <span>获赞</span>
        </div>
      </div>
    </div>

    <van-grid clickable :column-num="2" class="recond_item">
      <van-grid-item>
        <i slot="icon" class="toutiao toutiao-shoucang"></i>
        <span slot="text" class="main_text">收藏</span>
      </van-grid-item>
      <van-grid-item>
        <i slot="icon" class="toutiao toutiao-lishi"></i>
        <span slot="text" class="main_text">历史</span>
      </van-grid-item>
    </van-grid>
    <!-- 底部消息和小智以及退出登陆 -->
    <van-cell-group>
      <van-cell title="消息通知"  is-link/>
      <van-cell title="小智同学" is-link />
       <van-cell title="退出登陆" class="login_out_btn" v-if='userInfo' @click='logout' />
    </van-cell-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getSelfMsgApi } from '@/api/user' // 导入获取用户自己信息接口
import { userInfo } from 'os'
export default {
  data () {
    return {
      userInfos: {}
    }
  },
  computed: {
    ...mapState(['userInfo'])
  },
  created () {
    if (this.userInfo) {
      this.getUserInfo()
    }
  },
  methods: {
    logout () {
      this.$store.commit('storeUer', null)
    },
    async getUserInfo () {
      try {
        const { data: { data } } = await getSelfMsgApi()

        this.userInfos = data
        this.$store.commit('storeUserId', data.id)
      } catch (err) {
        console.log(err)

        this.$toast.fail('获取数据失败，请稍后再试')
      }
    },
    to_login () {
      this.$router.push({
        path: '/login'
      })
    }

  }

}
</script>

<style lang="less" scoped>
.not_login {
  display: flex;
  justify-content: center;
  align-items: center;
}
.my-head-banner {
  width: 750px;
  height: 361px;

  background: url("~@/assets/banner.png");
  background-size: cover;
  .login_btn {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .img-mobile {
      width: 132px;
      height: 132px;
      margin-bottom: 15px;
    }
    span {
      color: #ffffff;
      font-size: 28px;
    }
  }
  .login_top {
    display: flex;
    box-sizing: border-box;
    padding: 76px 32px 23px;
    justify-content: space-between;
    height: 230px;

    .login-left {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 30px;
      color: #ffffff;
      .login_img {
        width: 132px;
        height: 132px;
        margin-right: 22px;
        border: 4px solid #ffffff;
      }
    }
    .login-right {
      display: flex;
      align-items: center;
      font-size: 22px;
      .van-button {
        padding: 20px 10px !important;
        .van-button__text {
          font-size: 22px;
        }
      }
    }
  }
  .login_bottom {
    display: flex;
    height: 131px;
    font-size: 28px;
    color: #ffffff;

    .login_bottom_item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 1;
    }
  }
}
.main_text {
  font-size: 28px;
}
.toutiao-shoucang {
  font-size: 48px;
  color: #eb5253;
}
.toutiao-lishi {
  font-size: 48px;
  color: #ff9d1d !important;
}
.login_out_btn{
  text-align: center;
  color: #eb5253;
}
</style>
