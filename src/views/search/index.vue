<template>
  <div>
    <form action="/">
      <van-search
        v-model="inptText"
        show-action
        background="#3296fa"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="onFocus"
      />
    </form>
<div class="item_wrap">
    <searchResults v-if="isRsult" :inptText="inptText"/>
    <searchSuggestions v-else-if="inptText.trim()!=''" :inptText="inptText" @search="onSearch"/>
    <searchHistory v-else  :historyList='historyList' @historySearch="onSearch"/></div>
  </div>
</template>

<script>
import searchHistory from './components/SearchHistory.vue'
import searchResults from './components/SearchResults.vue'
import searchSuggestions from './components/SearchSuggestions.vue'
export default {
  data () {
    return {
      inptText: '',
      isRsult: false, // 是否搜索
      historyList: []
    }
  },
  components: {
    searchHistory,
    searchResults,
    searchSuggestions
  },
  methods: {
    onSearch (val) {
      this.inptText = val
      this.isRsult = true // 显示搜索结果，其他隐藏
      const index = this.historyList.indexOf(val)
      if (index !== -1) {
        this.historyList.splice(index, 1)
      }
      this.historyList.unshift(val)
    },
    onCancel () {
      this.$router.back()
    },
    onFocus () {
      this.isRsult = false // 获得焦点时候，搜索关闭，显示联想建议
    }
  }
}
</script>

<style lang="less" scoped>
.van-search__action {
  color: #fff;
}
.van-search{
  position: fixed;
  left: 0;
  right: 0;
    z-index: 1;

}
 .item_wrap{
      padding-top: 106px;
    }
</style>
