<template>
  <div class="replay_wrap">
      <!-- 头部 -->

    <van-nav-bar :title="`${list.length} 条回复`">
      <van-icon slot="left" name="cross" @click="$emit('hidePopup')" />
    </van-nav-bar>
     <!-- /头部 -->
    <van-cell>
      <van-image
        slot="icon"
        round
        width="30"
        height="30"
        style="margin-right: 10px;"
        :src="curCom.aut_photo"
      />
      <span style="color: #466b9d;" slot="title">{{curCom.aut_name}}</span>
      <div slot="label">
        <p style="color: #363636;">{{curCom.content}}</p>
        <p class="bottom_txt">
          <span style="margin-right: 10px;">{{curCom.pubdate | relTime}}</span>
          <van-button size="mini" type="default">回复 {{list.length}}</van-button>
        </p>
      </div>
      <LikeTheCom slot="right-icon" :theCom='curCom' />
    </van-cell>
    <p>全部回复</p>
    <!-- 回复列表 -->
    <CommentList
    :source='curCom.com_id'  @com_count='list=$event.list' type='c'
    :list='list'
     />
     <!-- 回复列表 -->
    <!-- 点击写评论 -->
    <van-button  class="bottom_replay"  @click="isPubReplay=true">写评论</van-button>
     <van-popup v-model="isPubReplay" position="bottom" :style="{ height: '20%' }" >  <WriteCom :target='curCom.com_id'  :list='list' :art_id='curCom.source'

       /></van-popup>
     <!-- /点击写评论 -->
  </div>
</template>

<script>

// 评论点赞组件
import LikeTheCom from './LIkeTheCom.vue'
// 写评论组件
import WriteCom from '@/components/WriteCom.vue'
import CommentList from './CommentList.vue'
export default {
  name: 'ReplayCom',
  data () {
    return {
      list: [],
      total_com: null,
      isPubReplay: false// 显示写回复
    }
  },
  components: {
    CommentList,
    LikeTheCom,
    WriteCom
  },
  props: {
    curCom: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.van-nav-bar {
  background-color: unset;
  .van-icon {
    color: #000 !important;
  }
}
.bottom_txt{
    display: flex;
    align-items: center;
}
/deep/.van-icon-good-job{
    color: red;
}
.bottom_replay{
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
     border-top: 1px solid rgb(223, 217, 217);

}

</style>
