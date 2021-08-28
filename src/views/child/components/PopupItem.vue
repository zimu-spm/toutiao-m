<template>
  <div class="popup_item_wrap">
    <!-- 我的频道 -->
    <van-cell-group>
      <van-cell title="我的频道">

        <van-button plain round type="danger" size="small" @click="isShow=!isShow">{{isShow?'完成':'编辑'}}</van-button>
      </van-cell>

      <van-grid>
        <van-grid-item
          v-for="(channel,index) in  MyChannels"
          :key="index"
          :text="channel.name"
          :class="{active_item:active==index}"
          @click="deleteChannel(channel,index)"
        >
         <!-- 编辑状态下的 关闭图标 -->
          <van-icon slot="icon" name="close" class="close_icon" v-show="isShow && !fixedChannels.includes(channel.id)"/>
        </van-grid-item>
      </van-grid>
    </van-cell-group>
    <!-- 我的频道 end-->
    <!-- 频道推荐 -->
    <van-cell-group>
      <van-cell title="频道推荐"></van-cell>
      <van-grid square>
        <van-grid-item
          v-for="(channel,index) in recomChannels"
          :key="index"
          icon="plus"
          :text="channel.name"
          @click="addMyChannel(channel)"
        />
      </van-grid>
    </van-cell-group>
  </div>
</template>

<script>
import { getMyChannels, getAllChannels } from '@/api/channel'

export default {
  props: {
    MyChannels: {
      required: true,
      type: Array
    },
    active: {
      type: Number
    }
  },
  data () {
    return {
      AllChannels: [],
      isShow: false, // 是否显示编辑状态
      fixedChannels: [0, 12] // 固定频道id
    }
  },
  computed: {
    recomChannels () {
      return this.AllChannels.filter(channel => {
        return !this.MyChannels.find(myChannel => {
          return channel.id == myChannel.id
        })
      })
    }
  },
  created () {
    this.getAll()
  },
  methods: {
    async getAll () {
      try {
        const {
          data: {
            data: { channels }
          }
        } = await getAllChannels()
        this.AllChannels = channels
        console.log(11)
      } catch (err) {
        console.log(err)
      }
    },
    deleteChannel (channel, index) {
      const isFixed = this.fixedChannels.includes(channel.id) // 是否是固定频道，固定频道不执行删除
      this.$emit('delChannel', channel, index, this.isShow, isFixed)
    },
    addMyChannel (channel) {
      this.$emit('addChannel', channel)
    }
  }
}
</script>

<style lang="less" scoped>
.popup_item_wrap {
  padding-top: 99px;
  padding-left: 8px;
  [class*="van-hairline"]::after {
    border: none;
  }
  .van-cell::after {
    border: none;
  }
  .van-cell__title {
    font-size: 32px;
  }
}

.van-button {
  width: 104px;
  height: 49px;
  font-size: 26px;
  color: #f85959;
  border-color: #f85959;
}
/deep/.van-grid {
  .van-grid-item {
    color: #222222;
  }
  .van-grid-item__text {
    margin-top: unset;
    font-size: 28px;
    color: unset;
  }
  .van-grid-item__content {
    .van-grid-item__icon-wrapper {
      position: unset;
      .close_icon {
        position: absolute;
        right: 0;
        top: 0px;
      }
    }
    flex-direction: row;

    .van-icon-plus {
      margin-right: 6px;
      font-size: 28px;
      color: #222222;
    }
  }
  [class*="van-hairline"]::after {
    border: none;
  }
}
.active_item {
  color: red !important ;
}
</style>
