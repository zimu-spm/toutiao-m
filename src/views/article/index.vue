//文章详情组件
<template>
  <div class="article-container">
    <!-- 导航栏 -->
    <van-nav-bar class="page-nav-bar" left-arrow title="黑马头条" @click-left="onClickLeft" :z-index='floor' v-if="!isReplayCom"></van-nav-bar>
    <!-- /导航栏 -->

    <div class="main-wrap">
      <!-- 加载中 -->
      <div class="loading-wrap" v-if="isloading">
        <van-loading color="#3296fa" vertical>加载中</van-loading>
      </div>
      <!-- /加载中 -->

      <!-- 加载完成-文章详情 -->
      <div
        class="article-detail markdown-body"
        v-else-if="articleDetail.title"
        ref="articleContent"
      >
        <!-- 文章标题 -->
        <h1 class="article-title">{{articleDetail.title}}</h1>
        <!-- /文章标题 -->

        <!-- 用户信息 -->
        <van-cell class="user-info" center :border="false">
          <van-image class="avatar" slot="icon" round fit="cover" :src="articleDetail.aut_photo"/>
          <div slot="title" class="user-name">{{articleDetail.aut_name}}</div>
          <div slot="label" class="publish-date">{{articleDetail.pubdate}}</div>
          <!-- 关注按钮组件 -->
          <Follow v-model="articleDetail.is_followed" :autId="articleDetail.aut_id"/>
          <!-- 关注按钮组件 end-->
        </van-cell>
        <!-- /用户信息 -->

        <!-- 文章内容 -->
        <div class="article-content" v-html="articleDetail.content"></div>
        <van-divider>正文结束</van-divider>
        <!-- 文章评论 -->
        <CommentList :source='articleDetail.art_id.toString()'
        @com_count='total_com=$event.total_com;list=$event.list;'
        @replayCom='clickReplayCom'
        />
        <!-- /文章评论 -->
        <!-- 底部区域 -->
        <div class="article-bottom">
          <van-button class="comment-btn" type="default" round size="small" @click='isPubCom=true'>写评论</van-button>
          <van-icon name="comment-o" :info="list.length" color="#777"/>
          <!-- 文章收藏 --星号 -->
          <Collection v-model="articleDetail.is_collected" :artId="articleDetail.art_id"/>
          <!--/ 文章收藏 --星号 -->
          <!-- <van-icon color="#777" name="good-job-o"/> -->
          <!-- 点赞 -->
          <Like v-model="articleDetail.attitude" :artId="articleDetail.art_id"/>
          <van-icon name="share" color="#777777"></van-icon>
        </div>
        <!-- /底部区域 -->
        <!-- 写评论 弹出层 -->
        <van-popup v-model="isPubCom" position="bottom" :style="{ height: '20%' }" > <WriteCom :target='articleDetail.art_id' :list='list'
        @finish_com='isPubCom=false' /> </van-popup>
         <!-- /写评论弹出层 -->

      </div>

      <!-- /加载完成-文章详情 -->

      <!-- 加载失败：404 -->
      <div class="error-wrap" v-else-if="errorStatus==404">
        <van-icon name="failure"/>
        <p class="text">该资源不存在或已删除！</p>
      </div>
      <!-- /加载失败：404 -->

      <!-- 加载失败：其它未知错误（例如网络原因或服务端异常） -->
      <div class="error-wrap" v-else>
        <van-icon name="failure"/>
        <p class="text">内容加载失败！</p>
        <van-button class="retry-btn" @click="getArticleDetail">点击重试</van-button>
      </div>
      <!-- /加载失败：其它未知错误（例如网络原因或服务端异常） -->
    </div>
     <!-- 回复评论 弹出层-->
         <van-popup v-model="isReplayCom" position="bottom" :style="{ height: '100%' }"  class="popup_replayCom">
           <ReplayCom @hidePopup='isReplayCom=false' :curCom='curCom' v-if='isReplayCom'/>
         </van-popup>
          <!-- /回复评论 -->
  </div>
</template>

<script>
// 导入获取文章详情的api
import { getArticleDetailApi } from '@/api/article'
// 富文本的样式
import './github-markdown.css'
// 图片预览
import { ImagePreview } from 'vant'
import { setTimeout } from 'timers'
// 关注组件
import Follow from '@/components/Follow.vue'
// 收藏组件
import Collection from '@/components/Collection.vue'
// 点赞组件
import Like from '@/components/LikeThe.vue'
// 评论列表组件
import CommentList from '@/components/CommentList.vue'
// 写评论组件
import WriteCom from '@/components/WriteCom.vue'
// 评论回复组件
import ReplayCom from '@/components/ReplayCom.vue'

export default {
  name: 'ArticleIndex',
  components: {
    Follow,
    Collection,
    Like,
    CommentList,
    WriteCom,
    ReplayCom
  },
  props: {
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data () {
    return {
      isloading: true, // 控制加载状态
      articleDetail: {}, // 文章信息
      errorStatus: 0, // 错误状态
      total_com: 0,
      isPubCom: false, // 显示写评论
      list: [],
      isReplayCom: false, // 显示回复
      curCom: {}, // 当前点击的评论
      floor: 1
    }
  },
  computed: {},
  watch: {},
  created () {
    this.getArticleDetail()
  },
  mounted () {},
  methods: {
    async getArticleDetail () {
      this.isloading = true
      try {
        const {
          data: { data }
        } = await getArticleDetailApi(this.articleId)
        this.articleDetail = data
        setTimeout(() => {
          // 调用setImg()
          this.setImg()
        }, 0)
      } catch (err) {
        if (err.response) {
          this.errorStatus = err.response.status
        }
      }
      this.isloading = false
    },
    setImg () {
      // 获取文章中每个图片的src 并保存在数组中 ，给每个img添加点击事件
      const imgs = this.$refs.articleContent.querySelectorAll('img')
      const imgUrl = []
      imgs.forEach((img, index) => {
        imgUrl.push(img.src)
        img.onclick = () => {
          ImagePreview({
            images: imgUrl,
            startPosition: index
          })
        }
      })
    },
    onClickLeft () {
      this.$router.back()
    },
    clickReplayCom (curCom) {
      // 当前点击的回复的评论
      this.curCom = curCom
      this.isReplayCom = true
    }
  }
}
</script>

<style scoped lang="less">
.article-container {

  .main-wrap {
    position: fixed;
    left: 0;
    right: 0;
    top: 92px;
    bottom: 0px;
    overflow-y: scroll;
    background-color: #fff;
  }
  .article-detail {
    .article-title {
      font-size: 40px;
      padding: 50px 32px;
      margin: 0;
      color: #3a3a3a;
    }

    .user-info {
      padding: 0 32px;
      .avatar {
        width: 70px;
        height: 70px;
        margin-right: 17px;
      }
      .van-cell__label {
        margin-top: 0;
      }
      .user-name {
        font-size: 24px;
        color: #3a3a3a;
      }
      .publish-date {
        font-size: 23px;
        color: #b7b7b7;
      }
      .follow-btn {
        width: 170px;
        height: 58px;
      }
    }

    .article-content {
      padding: 55px 32px;

      /deep/ p {
        text-align: justify;
        .van-popup--bottom{
          z-index: 99;
        }
      }
    }
  }

  .loading-wrap {
    padding: 200px 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fff;
  }

  .error-wrap {
    padding: 200px 32px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    .van-icon {
      font-size: 122px;
      color: #b4b4b4;
    }
    .text {
      font-size: 30px;
      color: #666666;
      margin: 33px 0 46px;
    }
    .retry-btn {
      width: 280px;
      height: 70px;
      line-height: 70px;
      border: 1px solid #c3c3c3;
      font-size: 30px;
      color: #666666;
    }
  }

  .article-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-sizing: border-box;
    height: 88px;
    border-top: 1px solid #d8d8d8;
    background-color: #fff;

    .comment-btn {
      width: 282px;
      height: 46px;
      border: 2px solid #eeeeee;
      font-size: 30px;
      line-height: 46px;
      color: #a7a7a7;
    }
    /deep/ .van-icon {
      font-size: 40px;
      .van-info {
        font-size: 16px;
        background-color: #e22829;
      }
    }
  }
}
/deep/ .van-nav-bar{
   z-index: 0;
  .van-icon {
  color: #ffff;
 }
}

</style>
