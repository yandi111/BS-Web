<script>
import QRCode from 'qrcode';

export default {
 props: {
  imageUrl: {
   type: String,
   default: ''
  }
 },
 data() {
  return {
   dialogVisible: false,

   mobile: 0,  // 0为ios，1为安卓
   url: '',
  }
 },

 methods: {

  handleClose() {
   this.dialogVisible = false
  },

  async handleOpen(e) {
   this.dialogVisible = true

   this.mobile = +e

   console.log(!this.imageUrl)
   if (!this.imageUrl) return

   this.$nextTick(() => {
    // 使用 qrcode 库生成二维码并渲染到 canvas 上
    const canvas = this.$refs.qrcodeCanvas;
    const scale = window.devicePixelRatio; // 设备的像素比

    canvas.width = 200;
    canvas.height = 200;
    canvas.getContext('2d').scale(scale, scale);

    QRCode.toCanvas(canvas, this.imageUrl, {
     width: 200
    }, function (error) {
     if (error) {
      console.error('二维码生成失败', error);
     } else {
      console.log('二维码生成成功');
     }
    });
   })
  },

 }
}
</script>

<template>
 <el-dialog
  :visible.sync="dialogVisible"
  :close-on-press-escape="false"
  :close-on-click-modal="false"
  :show-close="false"
  width="78.13vw"
  :before-close="handleClose">

  <div class="dialog flex">
   <div v-if="imageUrl !== ''"  class="main flex">
    <img src="../../../assets/images/download_logo.png" class="logo" alt="logo" />

    <p>长按识别</p>

    <canvas ref="qrcodeCanvas" class="card download"></canvas>

    <el-button @click="handleClose">我知道了</el-button>
   </div>

   <div v-else class="main flex">
    <img src="../../../assets/images/download_logo.png" class="logo" alt="logo" />

    <p>敬请期待</p>

    <img src="../../../assets/images/download_curreny.png" alt="ios" class="card download">

    <el-button @click="handleClose">我知道了</el-button>
   </div>
  </div>
 </el-dialog>
</template>

<style scoped lang="scss">
.dialog {
 flex-direction: column;
}
.main {
 padding: 8vw 16vw;
 border-radius: 2.67vw;
 width: 100%;
 background-color: #fff;
 flex-direction: column;
 align-items: center;
 justify-content: center;

 .logo {
  margin-bottom: 5.07vw;
  width: 17.07vw;
 }

 .card {
  width: 46.4vw;
 }

 p {
  margin-bottom: 1.33vw;
  text-align: center;
  @include Font((color: $black, size: 14px));
 }

 .currency {
  width: 34.67vw;
 }

 .download {
  margin-bottom: 5.33vw;
  width: 120%;
 }
}

.el-button {
 background-color: rgba(144, 255, 0, 1);
 width: 37.33vw;
 height: 10.67vw;
 border-radius: 0.67vw;
 border: none;
 ::v-deep {
  span {
   color: $black
  }
 }
}

::v-deep {
 .el-dialog {
  background-color: transparent;
 }
 .el-dialog__header {
  padding: 0;
 }
 .el-dialog__body {
  padding: 0;
 }
}
</style>