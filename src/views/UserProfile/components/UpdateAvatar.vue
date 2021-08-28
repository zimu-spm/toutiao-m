<template>
  <div class="container">
    <img :src="img" alt ref="img">
    <div class="funcBtn">
      <div @click="$emit('close')">取消</div>
      <div @click="finishCroped">完成</div>
    </div>
  </div>
</template>

<script>
import Cropper from 'cropperjs'
import 'cropperjs/dist/cropper.css'
import { editUserAvatarApi } from '@/api/user'
export default {
  data () {
    return {
      cropper: null
    }
  },
  props: {
    img: {
      type: [String, Object],
      required: true
    }
  },
  mounted () {
    const image = this.$refs.img

    this.cropper = new Cropper(image, {
      aspectRatio: 1,
      viewMode: 1,
      dragMode: 'move',
      cropBoxMovable: false,
      cropBoxResizable: false,
      background: false,
      autoCropArea: 0.8
    })
  },
  methods: {
    finishCroped () {
      this.cropper.getCroppedCanvas().toBlob(blob => { this.upadateAvatar(blob) })
    },
    async upadateAvatar (blob) {
      this.$toast.loading({
        message: '保存中...',
        forbidClick: true,
        duration: 0
      })
      try {
        const formData = new FormData()
        formData.append('photo', blob)
        const { data } = await editUserAvatarApi(formData)

        this.$toast.success('更新成功')
        this.$emit('close')
        this.$emit('upAvatar', data.data.photo)
      } catch (err) {
        this.$toast.fail('更新失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  background-color: black;

  img {
    max-width: 100%;
    display: block;
  }
  .funcBtn {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-between;
    color: #ffffff;
    font-size: 30px;
    div {
      width: 110px;
      height: 110px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
</style>
