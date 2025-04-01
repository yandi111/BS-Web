<template>
  <div class="protocol">
    <div class="title">{{$t('information.隐私政策')}}</div>
    <div class="content">
      <div class="content-logo">
        <img src="../../../assets/images/logo-icon.png" alt="" />
        <div>
          <p class="content-title">BSEX</p>
          <p class="content-date">2023.06.19</p>
        </div>
      </div>
      <div class="content-text">{{$t('information.尊敬的BSEX用户')}}</div>
      <div class="content-text">{{$t('information.请仔细阅读以下《隐私政策》')}}</div>
      <div class="content-text">
        {{$t('information.privacyTitle1')}}
      </div>
      <div class="content-text">
        {{$t('information.privacyTitle2')}}
      </div>
      <div class="content-text">{{$t('information.privacy1')}}</div>
      <div class="content-text">
        {{$t('information.privacy1Text1')}}
      </div>
      <div class="content-info">
        <p>{{$t('information.privacy1Text2')}}</p>
        <p>{{$t('information.privacy1Text3')}}</p>
        <p>{{$t('information.privacy1Text4')}}</p>
        <p>{{$t('information.privacy1Text5')}}</p>
        <p>{{$t('information.privacy1Text6')}}</p>
        <p>{{$t('information.privacy1Text7')}}</p>
        <p>{{$t('information.privacy1Text8')}}</p>
        <p>{{$t('information.privacy1Text9')}}</p>
        <p>{{$t('information.privacy1Text10')}}</p>
      </div>
      <div class="content-text">{{$t('information.privacy2')}}</div>
      <div class="content-text">
        {{$t('information.privacy2Text1')}}
      </div>
      <div class="content-text"> {{$t('information.privacy2Text2')}}</div>
      <div class="content-text">
         {{$t('information.privacy2Text3')}}
      </div>
      <div class="content-text">
         {{$t('information.privacy2Text4')}}
      </div>
      <div class="content-text"> {{$t('information.privacy2Text5')}}</div>
      <div class="content-text">
         {{$t('information.privacy2Text6')}}
      </div>
      <div class="content-text">
         {{$t('information.privacy2Text7')}}
      </div>
      <div>
         {{$t('information.privacy2Text8')}}
       
      </div>
      <div class="content-text"> {{$t('information.privacy3')}}</div>
      <div class="content-text">
        {{$t('information.privacy3Text1')}}
      </div>
      <div class="content-text">{{$t('information.privacy4')}}</div>
      <div class="content-text">
        {{$t('information.privacy4Text1')}}
        
      </div>
      <div class="content-text">{{$t('information.privacy5')}}</div>
      <div class="content-text">
        {{$t('information.privacy5Text1')}}
       
      </div>
      <div class="content-text">{{$t('information.privacy6')}}</div>
      <div class="content-text">
        {{$t('information.privacy6Text1')}}
      </div>
      <div class="content-text">{{$t('information.privacy7')}}</div>
      <div class="content-text">
        {{$t('information.privacy7Text1')}}
      </div>
      <div class="content-text">
        {{$t('information.privacy7Text2')}}
      </div>
      <div class="content-text">
        {{$t('information.privacy7Text3')}}
      </div>
      <div class="content-text">{{$t('information.privacy7Text4')}}</div>
      <div class="content-text">{{$t('information.privacy7Text5')}}</div>
      <div class="content-text">{{$t('information.privacy7Text6')}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PrivacyPolicy",
  data() {
    return {};
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.protocol {
  width: 100%;
  background: #fff;
  padding: 40px;
  color: #333;
  .title {
    font-size: 24px;
  }
  .content {
    font-size: 14px;
    .content-logo {
      padding: 20px 0px;
      display: flex;
      align-items: center;
      img {
        width: 34px;
        height: 34px;
        display: inline-block;
        margin-right: 10px;
      }
      .content-title {
        font-size: 16px;
      }
      .content-date {
        font-size: 10px;
        color: #999;
      }
    }
    .content-text {
      margin: 10px 0;
      font-size: 14px;
    }
  }
}
</style>