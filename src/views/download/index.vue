<script>
import Dialog from '@/views/download/components/dialog.vue'
import { GetVersion } from '@/api/home';

export default {
 components: {
  Dialog
 },
 data() {
  return {
   android_url: '',  // 安卓下载链接
   ios_url: '',  // ios下载链接

   isWindows: false,
   isMac: false,
   isIpad: false,
   isMobile: false,
   isAndroid: false,
   isIos: false,

   imageUrl: '',

   tag: [
    {
     title: this.$t('lang_1321'),
     color: 'rgba(144, 255, 0, 1)'
    },
    {
     title: this.$t('lang_1426'),
     color: 'rgba(228, 70, 92, 1)'
    },
    {
     title: this.$t('lang_1720'),
     color: 'rgba(233, 119, 62, 1)'
    },
    {
     title: this.$t('lang_2927'),
     color: 'rgba(116, 217, 225, 1)'
    },
   ]
  }
 },
 async created() {
  Promise.try(async () => {
   return await this.getDevice()
  }).then(res => {
			console.log(this.isIos)
   this.getVersionData()
  }).catch(() => {
   this.$alert(this.$t('该页面仅在手机，请前往手机查看'), this.$t('lang_2217')).then(
    () => {
     this.$router.push('/')
    }
   ).catch()
  })
 },
 methods: {

  // 获取当前设备
  async getDevice() {
   const { userAgent } = navigator;

   // 判断当前系统是否为windows
   this.isWindows = /Windows/i.test(userAgent);

   // 判断是否为mac
   this.isMac = /Macintosh/i.test(userAgent);

   // 判断当前为ipad
   this.isIpad = /iPad/i.test(userAgent);

   // 判断当前为Android
   this.isAndroid = /Android/i.test(userAgent);

   // 判断当前为ios
   this.isIos = /iPhone/i.test(userAgent);

   return this.isAndroid || this.isIos ? Promise.resolve(true) : Promise.reject(false)
  },

  // 下载,0是ios， 1是安卓
  onDownload(type) {
   if (type === 0) {
    if (!this.isIos) return this.$message.error(this.$t('当前手机系统不匹配'))
    window.open(this.imageUrl,'_self')
   } else {
    if (!this.isAndroid) return this.$message.error(this.$t('当前手机系统不匹配'))
    window.open(this.imageUrl,'_self')
   }
  },

  // 获取版本及下载链接
  async getVersionData() {
   try {
      const res = await GetVersion({clientType: this.isIos ? 'IOS' : 'ANDROID'})
      this.imageUrl = res.data.url
      // this.imageUrl = res.data.url ? await QRCode.toDataURL(res.data.url) : ''
    } catch (err) {
    }
  }
 }
}
</script>

<template>
<div class="container flex">
 <img src="../../assets/images/download_logo.png" class="logo" alt="LOGO">

 <div class="tags flex">
  <div class="tag flex" v-for="(item, index) of tag" :key="index">
   <i class="purple" :style="{backgroundColor: item.color}"></i>
   {{item.title}}
  </div>
 </div>

 <img src="../../assets/images/app_logo.png" class="app_logo" alt="">

 <div class="subTitle">
  <h6>{{$t('lang_1034')}} UBEX APP</h6>
  <p>{{$t('顶级安全保障')}} </p>
  <p>{{$t('极致交易体验')}} </p>
  <p>{{$t('国际三牌 合规运营')}} </p>
 </div>
 
 <div class="btns flex">
  <el-button class="ios" @click="onDownload(0)">
   <img src="../../assets/images/download_ios.png" alt="ios">
   <p>{{$t('iPhone版本')}}</p>
  </el-button>

  <el-button class="android" @click="onDownload(1)">
   <img src="../../assets/images/download_android.png" alt="android">
   <p>{{$t('Android版本')}}</p>
  </el-button>
 </div>

 <footer>©2025 UBEX</footer>

 <Dialog ref="dialog" :imageUrl="imageUrl" />
</div>
</template>

<style scoped lang="scss">
.container {
 flex-direction: column;
 width: 100vw;
 height: 100vh;
 padding: 4.27vw;
 overflow: hidden;
 background: {
  color: $white;
  image: url("../../assets/images/download_bg.png");
  repeat: no-repeat;
  position: bottom;
  size: 100% 25%
 };

 .logo {
  margin-bottom: 6.3vw;
  width: 17vw;
 }

 .tags {
  margin-bottom: 18.1vw;
  align-items: center;

  .tag {
   align-items: center;
   &:not(:last-child) {
    margin-right: 5.3vw;
   }
   @include Font((size: 14px, color: $black, weight: bold));

   .purple {
    position: relative;
    top: 2px;
    margin-right: 1.33vw;
    width: 2.133vw;
    height: 2.133vw;
    border-radius: 50%;
   }
  }
 }

 .app_logo {
  margin: 0 auto 17.3vw;
  width: 22.4vw;
 }

 .subTitle {
  text-align: center;
  h6 {
   margin-bottom: 3.73vw;
   @include Font((size: 16px, color: $black, weight: bold));
  }
  p {
   &:not(:last-child) {
    margin-bottom: 6px;
   }
   color: rgba(37, 37, 37, 1);
   font-size: 14px;
  }
 }

 .btns {
  margin-top: 11.47vw;
  margin-bottom: 5.33vw;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .el-button {
   width: 50.66vw;
   height: 12.8vw;
   border: none;
   border-radius: 1.07vw;
   margin: 0;

   ::v-deep {
    padding: 3.47vw;
    >span {
     display: flex;
     align-items: center;
     justify-content: center;

     img {
      margin-right: 2.67vw;
      width: 5.87vw;
     }
     p {
      font-size: 16px;
     }
    }
   }

   &.ios {
    margin-bottom: 14px;
    background-color: $black;
   }
   &.android {
    background-color: rgba(12, 187, 87, 1);
   }
  }
 }

 footer {
  text-align: center;
  margin: auto auto 5.33vw;
  font-size: 12px;
  color: $black;
 }
}
</style>