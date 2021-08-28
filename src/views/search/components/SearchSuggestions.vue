//联想建议模块

<template>
  <div>
    <van-cell-group>
      <van-cell v-for="(sug , index) in  suggtions" :key="index" icon="search" @click="to_search(sug)">
        <div slot="title" v-html="highLight(sug)">

        </div>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
// 获取联想建议的api
import { getSearchSug } from '@/api/search'
// 导入防抖 js工具
import { debounce } from 'lodash'
export default {
  data () {
    return {
      suggtions: [],
      htmStr: `<span style="color:red">${this.inptText}</span>`
    }
  },
  props: {
    inptText: { // 输入框文本
      required: true,
      type: String
    }
  },
  watch: {
    inptText: {
      immediate: true, // 该回调将会在侦听开始之后被立即调用
      handler: debounce(function (val) { // 调用lodash 的debounce防抖方法
        this.SearchSug(val)
      }, 300)
    }
  },
  methods: {
    async SearchSug (q) {
      try {
        const {
          data: { data: options }
        } = await getSearchSug({
          q
        })
        console.log(options.options)

        this.suggtions = options.options
      } catch (err) {
        this.$toast('获取失败')
      }
    },
    highLight (sugStr) { // 给指定字符增加高亮
      const pattern = new RegExp(this.inptText, 'gi')
      return sugStr.replace(pattern, this.htmStr)
    },
    to_search (sug) {
      this.$emit('search', sug)
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
