<template>
  <div>
    <!-- 头部搜索 -->
    <van-nav-bar fixed>
      <van-button slot="title" round size="small" to='/search'>
        <van-icon name="search" center />
        <span>搜索</span>
      </van-button>
    </van-nav-bar>
    <!-- 头部搜索end -->
    <!-- 频道列表 -->
    <van-tabs v-model="active" swipeable animated swipe-threshold="3">
      <van-tab v-for="(channel,index) in channels" :title="channel.name" :key="index">
        <!-- 文章列表组件 -->
        <ChannelItem :channel="channel"></ChannelItem>
      </van-tab>
      <!-- 撑开的盒子 -->
      <div slot="nav-right" class="hold_right_box"></div>
      <!-- 汉堡导航 -->

      <div slot="nav-right" class="hamburgerNav" @click.stop="show=true">
        <div class="boundary_left"></div>
        <i class="toutiao toutiao-gengduo"></i>
      </div>
      <!-- 汉堡导航end -->
    </van-tabs>
    <!-- 频道列表 end -->
    <!-- 弹出层 -->
    <van-popup v-model="show" closeable position="bottom" :style="{ height: '100%' }">
      <popupItem
        :MyChannels="channels"
        :active="active"
        @delChannel="delChannel"
        @addChannel="addChannel"
      ></popupItem>
    </van-popup>
    <!-- 弹出层 end -->
  </div>
</template>

<script>
// 导入请求api
import { getchannelsApi } from '@/api/user'
import { patchMyChannels, delTheMyChannel } from '@/api/channel'
// 导入频道内容的组件
import ChannelItem from '@/views/child/components/ChannelItem'
// 导入弹出层内容组件
import popupItem from '@/views/child/components/PopupItem'
// 导入本地储存模块
import { setLocalInfo, getLocalInfo } from '@/utils/storage.js'
// 导入vuex方法
import { mapState } from 'vuex'

export default {
  data () {
    return {
      active: 0,
      channels: [],
      show: false // 控制弹出层是否展示
    }
  },
  computed: {
    ...mapState(['userInfo']) // vuex容器的公共数据
  },
  created () {
    this.getchannels()
  },

  methods: {
    async getchannels () {
      try {
        let myChannel = []

        if (this.userInfo) {
          // 登陆时，获取具体用户的频道
          const {
            data: {
              data: { channels }
            }
          } = await getchannelsApi()

          myChannel = channels
        } else if (getLocalInfo('myChannels_logout')) {
          // 未登时候，获取在本地存储的我的频道

          const channels = getLocalInfo('myChannels_logout')
          myChannel = channels
        } else {
          // 未登录且为在本地存储
          const {
            data: {
              data: { channels }
            }
          } = await getchannelsApi()
          myChannel = channels
        }
        this.channels = myChannel // 赋值给我的频道数据，更新视图
      } catch (err) {
        console.log(err)

        this.$toast('加载失败，请稍后再试')
      }
    },
    delChannel (channel, index, isShow, isFixed) {
      // 子传父 删除 弹出层编辑状态下 点击的对应我的频道
      if (isShow) {
        if (isFixed) return // 如果是固定的频道，不操作删除
        this.channels.splice(index, 1)
        this.delTheMyChannelApi(channel)
        if (index <= this.active) this.active-- // 选中频道在所要删除频道后面
      } else {
        this.active = index
        this.show = isShow
      }
    },
    addChannel (channel) {
      // 子传父 执行添加到我的频道
      this.channels.push(channel)

      this.addTheMyChannelApi(channel)
    },
    delTheMyChannelApi (channel) {
      try {
        if (this.userInfo) {
          delTheMyChannel(channel.id)
        } else {
          setLocalInfo('myChannels_logout', this.channels)
        }
      } catch (err) {
        this.$toast('删除失败，稍后再试')
      }
    },
    addTheMyChannelApi (channel) {
      try {
        if (this.userInfo) {
          console.log(channel.id)
          patchMyChannels([
            {
              id: channel.id,
              seq: this.channels.length
            }
          ])
        } else {
          setLocalInfo('myChannels_logout', this.channels)
        }
      } catch (err) {
        this.$toast('更新失败，稍后再试')
      }
    }
  },
  components: {
    ChannelItem,
    popupItem
  }
}
</script>

<style lang="less" scoped>
/deep/ .van-nav-bar {
  .van-nav-bar__title {
    max-width: unset;
    .van-button--default {
      background-color: #5babfb;
      border: none;
      color: #ffffff;
      .van-icon {
        font-size: 32px;
        color: #ffffff;
        vertical-align: bottom;
        margin-right: 9px;
      }
      span {
        font-size: 28px;
      }
    }
  }
}

.van-button {
  width: 556px;
}
.van-tabs {
  padding-top: 180px; //内容避开头部固定定位，防止被其隐藏
}

/deep/ .van-tabs__wrap {
  position: fixed;
  top: 92px;
  width: 100%;
  z-index: 1;

  .van-tabs__nav {
    align-items: center;
    padding-right: 0px;
    padding-bottom: 0;

    .van-tab {
      min-width: 210px;
      font-size: 28px;
    }

    .van-tabs__line {
      bottom: 15px;
      width: 31px;
      background-color: #3296fa;
      .van-tab--active {
        color: #333333;
      }
    }
    .hold_right_box {
      flex-shrink: 0; //不参与剩余空间计算
      width: 66px;
    }
    .hamburgerNav {
      display: flex;
      justify-content: center;
      align-items: center;
      position: fixed;
      right: 0;
      width: 66px;
      height: 82px;
      background-color: #fff;
      opacity: 0.902;

      .boundary_left {
        position: absolute;
        left: 0;
        width: 2px;
        height: 100%;
        background: url("~@/assets/gradient-gray-line.png");
        background-size: contain;
      }
      i {
        font-size: 33px !important;
      }
    }
  }
}
/deep/.van-popup--bottom {
  .van-popup__close-icon {
    left: 32px;
    top: 29px;
    color: #222222;
  }
}
</style>
