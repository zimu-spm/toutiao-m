<template>
  <div class="article-comments" :style="`minHeight: ${list.length*160}px;`">

    <!-- 评论列表 -->
    <van-list
      v-model="loading"
      :finished="finished"
      :finished-text="list.length==0?'暂无评论':'已显示全部评论'"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      :immediate-check='false'
      @load="onLoad"
    >
      <van-cell v-for="(item,index) in list" :key="index" >
        <van-image
          slot="icon"
          round
          width="30"
          height="30"
          style="margin-right: 10px;"
          :src="item.aut_photo"
        />
        <span style="color: #466b9d;" slot="title">{{item.aut_name}}</span>
        <div slot="label">
          <p style="color: #363636;">{{item.content}}</p>
          <p class="bottom_txt">
            <span style="margin-right: 10px;">{{item.pubdate | relTime}}</span>
            <van-button size="mini" type="default" @click="replayCom(item)">回复 {{item.reply_count}}</van-button>
          </p>
        </div>
       <LikeTheCom slot="right-icon" :theCom='item'/>

      </van-cell>
    </van-list>
    <!-- 评论列表 -->

    <!-- 发布评论 -->
    <!-- <van-cell-group class="publish-wrap">
      <van-field clearable placeholder="请输入评论内容">
        <van-button slot="button" size="mini" type="info">发布</van-button>
      </van-field>
    </van-cell-group> -->
    <!-- /发布评论 -->
  </div>
</template>

<script>
// 获取评论或评论回复
import { getComments } from '@/api/comment'
// 评论点赞组件
import LikeTheCom from './LIkeTheCom.vue'
// 导入处理大数字的包
import JSONbig from 'json-bigint'

export default {
  name: 'ArticleComment',
  props: {
    source: {
      // 文章id或评论id
      type: [Number, String, Object],
      required: true
    },
    type: {
      type: String,
      default: 'a'
    }
  },
  data () {
    return {
      list: [], // 评论列表
      loading: false, // 上拉加载更多的 loading
      finished: false, // 是否加载结束
      offset: null, //	获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据 null 表示不传值
      error: false
    }
  },
  components: {
    LikeTheCom
  },
  created () {
    this.onLoad()
  },

  methods: {
    async onLoad () {
      // console.log(this.source.toString());

      // // console.log(JSON.stringify(this.source));

      try {
        const sourceId = JSONbig.stringify(this.source).replace(/\D/g, '')

        const {
          data
        } = await getComments({
          type: this.type,
          source: sourceId,
          offset: this.offset,
          limit: 10
        })

        this.offset = data.data.last_id
        this.list.push(...data.data.results)

        this.$emit('com_count', {
          total_com: data.data.total_count,
          list: this.list
        })
        if (data.data.results.length <= 0) {
          this.finished = true
        }
      } catch (err) {
        this.error = true
      }
      this.loading = false
    },
    replayCom (curCom) {
      curCom.source = this.source
      this.$emit('replayCom', curCom)
    }

  }
}
</script>

<style scoped lang="less">

.publish-wrap {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
}

/deep/.van-list {
  margin-bottom: 45px;
  .van-icon-good-job{color: rgb(218, 22, 22);}
}
.bottom_txt{
    display: flex;
    align-items: center;
}
</style>
