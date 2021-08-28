<template>
  <div class="layout">

    <!-- 路由出口 -->
    <router-view/>
    <van-tabbar class="layout_foot_bar" route>
      <van-tabbar-item to="/">
        <i slot="icon" class="toutiao toutiao-shouye" ></i>
        <span>首页</span>
      </van-tabbar-item>
      <van-tabbar-item to="/qa">
        <i slot="icon" class="toutiao toutiao-wenda" ></i>
        <span>问答</span>
      </van-tabbar-item>
      <van-tabbar-item  to="/video">
        <i slot="icon" class="toutiao toutiao-shipin" ></i>
        <span>视频</span>
      </van-tabbar-item>
      <van-tabbar-item  to="/my">
        <i slot="icon" class="toutiao toutiao-wode" ></i>
        <!-- 登陆与否 显示不同文字 -->
        <span>{{this.$store.state.userInfo ? '我的' :'未登录'}}</span>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.layout_foot_bar{
    font-size: 20px;
i.toutiao{
    font-size: 32px;
 }
}
</style>
