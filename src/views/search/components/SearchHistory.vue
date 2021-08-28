<template>
  <div>

    <van-cell-group>
      <van-cell title="搜索历史">
        <div v-if="isShowDel">
          <span @click="historyList.splice(0)">全部删除</span>
          &nbsp;&nbsp;
          <span @click="isShowDel=false" >完成</span>
        </div>
        <van-icon name="delete-o" v-else @click="isShowDel=true"/>
      </van-cell>
      <van-cell :title="item" v-for="(item,index) in  historyList " :key="index"  @click="delTheHistory(item,index)">
        <van-icon name="close" v-show='isShowDel' />
      </van-cell>
     </van-cell-group>
  </div>
</template>

<script>
export default {
  data () {
    return {
      isShowDel: false
    }
  },
  props: {
    historyList: {
      type: Array,
      required: true
    }
  },
  methods: {
    delTheHistory (item, index) {
      if (this.isShowDel) {
        this.historyList.splice(index, 1) // 删除状态下，删除点击的搜索历史
      } else {
        this.$emit('historySearch', item) // 非删除状态下,子传父 ，调用搜索方法（父）
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
