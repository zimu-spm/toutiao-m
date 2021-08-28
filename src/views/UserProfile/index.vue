<template>
  <div>
    <van-nav-bar title="个人信息" left-arrow class="head" @click-left="$router.back()"/>
    <!-- 选择图片 -->
    <input type="file" hidden ref="file" accept="image/*" @change="toUpdateAvatar">
    <van-cell-group>
      <van-cell title="头像" is-link @click="choiceImg">
        <van-image class="user_photo" round fit="cover" :src="userProfile.photo"/>
      </van-cell>

      <!-- 修改头像期弹出层 -->
      <van-popup v-model="isUpdateAvatar" position="bottom" style="height:100%">
        <UpdateAvatar
          @close="isUpdateAvatar=false"
          @upAvatar='userProfile.photo=$event'
          :img='img'
          v-if="isUpdateAvatar"
        />
      </van-popup>
      <!-- /修改头像期弹出层 -->
      <van-cell title="昵称" :value="userProfile.name" is-link @click="isUpdateName=true"/>
      <!-- 修改昵称弹出层 -->
      <van-popup v-model="isUpdateName" position="bottom" style="height:100%">
        <UpdateName v-if="isUpdateName" @close="isUpdateName=false" v-model="userProfile.name"/>
      </van-popup>
      <!--/ 修改昵称弹出层 -->
      <van-cell
        title="性别"
        :value="userProfile.gender==1?'女':'男'"
        is-link
        @click="isUpdateGender=true"
      />
      <!-- 修改性别弹出层 -->
      <van-popup v-model="isUpdateGender" position="bottom">
        <UpdateGender
          @close="isUpdateGender=false"
          v-model="userProfile.gender"
          v-if="isUpdateGender"
        />
      </van-popup>
      <!-- /修改性别弹出层 -->
      <van-cell title="出生日期" :value="userProfile.birthday" is-link @click="isUpdateBirthday=true"/>

      <!-- 修改出生日期弹出层 -->
      <van-popup v-model="isUpdateBirthday" position="bottom">
        <UpdateBirthday
          @close="isUpdateBirthday=false"
          v-model="userProfile.birthday"
          v-if="isUpdateBirthday"
        />
      </van-popup>
      <!-- /修改出生日期弹出层 -->
    </van-cell-group>
  </div>
</template>

<script>
import UpdateName from './components/UpdateName.vue'
import UpdateGender from './components/UpdateGender.vue'
import UpdateBirthday from './components/UpdateBirthday.vue'
import UpdateAvatar from './components/UpdateAvatar.vue'
import { getUserProfileApi } from '@/api/user'
export default {
  name: 'UserProfile',
  data () {
    return {
      userProfile: {},
      isUpdateName: false, // 是否显示修改昵称弹出层
      isUpdateGender: false, // 是否显示修改性别弹出层
      isUpdateBirthday: false, // 是否显示修改出生日期弹出
      isUpdateAvatar: false,
      img: null
    }
  },
  created () {
    this.getUserProfile()
  },
  components: {
    UpdateName,
    UpdateGender,
    UpdateBirthday,
    UpdateAvatar
  },
  methods: {
    async getUserProfile () {
      try {
        const {
          data: { data }
        } = await getUserProfileApi()
        this.userProfile = data
      } catch (err) {
        console.log(err)
      }
    },
    choiceImg () {
      this.$refs.file.click()
    },
    toUpdateAvatar () {
      this.img = window.URL.createObjectURL(this.$refs.file.files[0]) // 选中的图片
      console.log(this.img)

      this.isUpdateAvatar = true

      this.$refs.file.value = null // 保证选中同一张图片 可以触发change事件
    }
  }
}
</script>

<style lang="less" scoped>
.head {
  /deep/.van-icon {
    color: #fff;
  }
}
.user_photo {
  width: 60px;
  height: 60px;
}
</style>
