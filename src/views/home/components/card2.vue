<template>
 <div class="card flex">
  <div class="tabs flex">
   <div class="imgList">
    <img v-show="bi === 0" src="../../../assets/images/mobile.png" class="mobile" alt="">
    <img v-show="bi === 1" src="../../../assets/images/pc.png" class="pc" alt="">
   </div>

   <div class="tab flex">
    <a @click="bi = 0" :class="bi === 0 ? 'active' : ''">{{$t('home_14')}}</a>
    <a @click="bi = 1" :class="bi === 1 ? 'active' : ''">{{$t('home_15')}}</a>
   </div>
  </div>

  <div class="right">
   <h6 class="title">{{$t('home_16')}}</h6>

   <div class="download">
    <div class="qrcode flex">
     <div v-show="imageUrl !== ''" class="code">
      <img :src="imageUrl" class="download_btn" alt="">
     </div>

     <div v-show="imageUrl === ''" class="android">
      <img src="../../../assets/images/prohibit.png" class="download_btn" alt="">
      <p>{{$t('home_17')}}</p>
     </div>

     <div class="download_txt flex">
      <span>{{$t('home_18')}}</span>
      <p>{{$t('home_19')}}</p>
     </div>
    </div>

    <div class="download_app flex">
     <a :class="[mobile === 0 ? 'active' : '', 'btn flex']" @click="getVersionData(0)">
      <img src="../../../assets/images/ios.png" alt="ios" />
      <p>iOS</p>
     </a>
     <a :class="[mobile === 1 ? 'active' : '', 'btn flex']" class="btn flex" @click="getVersionData(1)">
      <img src="../../../assets/images/android.png" alt="安卓" />
      <p>{{$t('home_20')}}</p>
     </a>
    </div>
   </div>
  </div>
 </div>
</template>

<script>
import { GetVersion } from '@/api/home';
import QRCode from 'qrcode';

export default {
 data() {
  return {

   // 展示图片类型,0: 移动端展示图，1：PC端展示图
   bi: 0,

   // 移动端下载二维码
   mobile: 0,

   imageUrl: ''
  }
 },
 created() {
  this.getVersionData(0)
 },
 methods: {
  // 获取最新版本
  async getVersionData(e) {
   this.mobile = e
    try {
      const res = await GetVersion({clientType: this.mobile === 0 ? 'IOS' : 'ANDROID'})
      this.imageUrl = res.data.url ? await QRCode.toDataURL(res.data.url) : ''
    } catch (err) {}
  }
 }
}
</script>

<style scoped lang="scss">
.card {
 width: 100%;
 margin-top: 131px;
 margin-bottom: 121px;
 justify-content: space-between;
}

.tabs {
 margin-right: 227px;
 flex-direction: column;

 .imgList {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 560px;
  margin: 0 auto 29px;
  .mobile {
   width: 258px;
  }
  .pc {
   width: 560px;
  }
 }

 .tab {
  position: relative;
  align-items: center;
  margin: auto;

  &:after {
   content: '';
   position: absolute;
   bottom: -5px;
   left: 0;
   right: 0;
   margin: 0 auto;
   width: 100%;
   height: 1px;
   border-radius: 2px;
   background-color: #252525;
  }
  a {
   position: relative;
   @include Font((size: $h4, color: $subtitle_color));

   &.active {
    color: $white;

    &:after {
     background-color: $colorA;
    }
   }

   &:first-child {
    margin-right: 20px;
   }

   &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    right: 0;
    margin: 0 auto;
    width: 80%;
    height: 2px;
    border-radius: 2px;
    z-index: 2;
   }
  }
 }
}

.right {
 .title {
  margin-bottom: 110px;
  @include Font((color: $colorD, size: 40px, weight: bold));
 }

 .download {
  .qrcode {
   margin-bottom: 39px;
   align-items: center;

   .android {
    margin-right: 24px;
    padding: 21px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 220px;
    height: 220px;
    border-radius: 8px;
    background-color: rgba(217, 217, 217, 0.8);

    p {
     @include Font((size: 16px, color: $colorE, weight: bold));
    }

    img {
     margin-bottom: 12px;
     width: 72px;
    }
   }

   .code {
    margin-right: 24px;
    padding: 21px;
    border: 1px solid #252525;
    border-radius: 8px;

    .download_btn {
     border-radius: 8px;
     width: 176px;
     height: 176px;
    }
   }
  }

  &_txt {
   flex-direction: column;
   span {
    margin-bottom: 6px;
    @include Font((size: $h4, color: $subtitle_color))
   }

   p {
    @include Font((size: 20px, color: $colorD))
   }
  }

  .download_app {
   align-items: center;

   a {
    width: 102px;
    height: 88px;
    border-radius: 10px;
    @include NewFlex((
     direction: column,
     align: center,
     justify: center,
    ));

    &.active {
     background-color: $colorK;
    }

    &:not(:first-child) {
     margin-left: 20px;
    }

    img {
     margin-bottom: 8px;
     width: 32px;
     height: 32px;
    }

    p {
     @include Font((size: $h5, color: $colorD))
    }
   }
  }
 }
}
</style>