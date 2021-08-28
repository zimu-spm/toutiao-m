<template>
  <div>
    <van-cell  :to="`/article/${article_item.art_id}`">
      <!--底部描述信息 -->
        <div slot="title"  class="van-multi-ellipsis--l2">
          {{article_item.title}}
        </div>
      <div slot="label">
          <!-- 底部显示的3张图片区域 -->
        <div v-if="article_item.cover.type==3" class="bottom_image_wrap">
          <van-image class="vanImage" :src="article_item.cover.images[0]" fit="cover"/>
          <van-image class="vanImage" :src="article_item.cover.images[1]" fit="cover"/>
          <van-image class="vanImage" :src="article_item.cover.images[2]" fit="cover"/>
        </div>
         <!-- 底部显示的3张图片区域 end-->
      <div class="descrpition" :class="{one_img_margin:article_item.cover.type==1,none_img_margin:article_item.cover.type==0}"  >
          <span>{{article_item.aut_name}}</span>
        <span>{{article_item.comm_count}} 评论</span>
        <span>{{article_item.pubdate | relTime }}</span>
      </div>
      </div>
      <!--底部描述信息end -->
      <!-- 右侧内容 -->
      <div slot="default" v-if="article_item.cover.type==1" class="item_right_img">
        <van-image class="vanImage" :src="article_item.cover.images[0]" fit="cover"/>
      </div>
    </van-cell>
  </div>
</template>

<script>
export default {
  props: {
    article_item: {
      require: true
    }
  },
  methods: {

  }
}
</script>

<style lang="less" scoped>
.van-cell__title{
  flex: 1;
}
.van-cell__value{
  flex: unset;
 width: 232px;
  height: 146px;
  margin-left: 25px;
  .item_right_img {

  .van-image{
    width: 232px;
    height: 146px;
  }

}
}

.van-cell__label{
  margin: unset;
}
.bottom_image_wrap{
  display: flex;
  .vanImage {
   flex: 1;
   height: 146px;
   padding:31px 0;
   &:not(:last-child){
     padding-right: 4px;
   }
  }

}

.none_img_margin{
  margin-top: 24px;
}
.one_img_margin{
  margin-top: 44px;
}
.descrpition{
  span{
    margin-right: 25px;
  }
}

</style>
