<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" :title="item.title"/>
    </van-list>
  </div>
</template>

<script>
import { getSearchResults } from '@/api/search'
import { log } from 'util'
export default {
  data () {
    return {
      list: [],
      loading: false, // 加载状态
      finished: false,
      per_page: 20, // 每页数量
      page: 1, // 页数
      error: false // 发生错误将其设为true，显示错误提示，点击提示重新触发 load()
    }
  },
  props: {
    inptText: {
      type: String,
      required: true
    }
  },
  methods: {
    async onLoad () {
      try {
        const {
          data: {
            data: { results }
          }
        } = await getSearchResults({
          q: this.inptText,
          per_page: this.per_page,
          page: this.page
        })
        this.loading = false
        if (results.length <= 0) {
          this.finished = true // 数据全部加载完成
          return
        }

        this.page++
        this.list.push(...results)
      } catch (err) {
        this.error = true
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
