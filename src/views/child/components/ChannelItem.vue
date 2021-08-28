// 每个频道的具体的 文章列表组件

<template>
  <div class="scroll_wrap">
    <van-pull-refresh
      v-model="isLoading"
      @refresh="onRefresh"
      :success-text="cue_text"
      success-duration="1000"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
      >
        <ArticleItem
         v-for="(item,index)  in  article_list" :key="index"
       :article_item='item'></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getChannelItemApi } from '@/api/article'
// 引入文章项的组件
import ArticleItem from './ArticleItem'
export default {
  name: 'ChannelItem',
  components: {
    ArticleItem
  },
  data () {
    return {
      list: [],
      loading: false, // 加载完成
      finished: false,
      article_list: [], // 文章列表
      error: false,
      timestamp: null,
      isLoading: false, // 下拉刷新loading的状态
      cue_text: ''
    }
  },
  props: {
    channel: {
      required: true,
      type: Object
    }
  },

  methods: {
    async onLoad () {
      // 加载更多
      try {
        const {
          data: {
            data: { results }
          }
        } = await getChannelItemApi({
          channel_id: this.channel.id,
          timestamp: this.timestamp || Date.now(),
          with_top: 1
        })
        if (results.length == 0) {
          // 获取的数据为零时，关闭加载，提示‘没有更多’
          this.finished = true
        }
        this.article_list.push(...results)
        console.log(this.article_list)
      } catch (err) {
        this.error = true // 点击错误信息后，重新执行加载,error自动变为false
        this.loading = false //
        return console.log(err.message)
      }
      this.loading = false
    },
    async onRefresh () {
      // 下拉刷新,得到最新数据
      try {
        const {
          data: {
            data: { results }
          }
        } = await getChannelItemApi({
          channel_id: this.channel.id,
          timestamp: Date.now(),
          with_top: 1
        })

        this.article_list.unshift(...results)
        this.cue_text = `刷新成功，更新了${results.length}条数据`
      } catch (err) {
        this.cue_text = '刷新失败'
      }
      this.isLoading = false
    }
  }
}
</script>

<style lang="less" scoped>
.van-list {
  padding-bottom: 100px;

}
.scroll_wrap {
  height: 77vh; //視口單位
  overflow-y: auto;
}
</style>
