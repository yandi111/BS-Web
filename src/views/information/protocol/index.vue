<template>
  <div class="protocol">
    <div class="title">{{$t('information.用户协议')}}</div>
    <div class="content">
      <div class="content-logo">
        <img src="../../../assets/images/logo-icon.png" alt="" />
        <div>
          <p class="content-title">BSEX</p>
          <p class="content-date">2023.06.19</p>
        </div>
      </div>
      <div class="content-text">{{$t('information.尊敬的BSEX用户')}}</div>
      <div class="content-text">
        {{$t('information.在使用我们的服务前请仔细阅读该《用户协议》')}}
      </div>
      <div class="content-text">
        {{$t('information.userText')}}
      </div>
      <div class="content-title"> {{$t('information.定义')}}</div>
      <div class="content-text">
        {{$t('information.definition1')}}
      </div>
      <div class="content-text">
         {{$t('information.definition2')}}
      </div>
      <div class="content-text">
         {{$t('information.definition3')}}
      
      </div>
      <div class="content-text">
         {{$t('information.definition4')}}
      </div>
      <div class="content-text">
         {{$t('information.definition5')}}
       
      </div>
      <div class="content-text">
         {{$t('information.definition6')}}
      
      </div>
      <div class="content-text">
         {{$t('information.definition7')}}
       
      </div>
      <div class="content-text">
         {{$t('information.definition8')}}
       
      </div>
      <div class="content-text">
         {{$t('information.definition9')}}
      
      </div>
      <div class="content-text">
         {{$t('information.definition10')}}
      </div>
      <div class="content-title">{{$t('information.总则')}}</div>
      <div class="content-text">
        {{$t('information.性质')}}
        {{$t('information.zongze1')}}
      </div>

      <div class="content-text">
        {{$t('information.zongze2')}} <br />
        {{$t('information.zongze2a')}}<br />
        {{$t('information.通过注册使用BSEX账户，您确认并承诺')}}<br />
        {{$t('information.zongze2a1')}}<br />
        {{$t('information.zongze2a2')}}<br />
        {{$t('information.zongze2a3')}}<br />
        {{$t('information.zongze2a4')}}<br />
        {{$t('information.zongze2a5')}}<br />
        {{$t('information.zongze2b')}}<br />
        {{$t('information.您确认并承诺，您不会出于违反任何适用法律或法规，或破坏本网站数字资产交易秩序的目的在本网站注册')}}<br />
        {{$t('information.zongze2c')}} <br />
        {{$t('information.zongze2c1')}}
        <br />
        {{$t('information.zongze2d')}}
       {{$t('information.zongze2d1')}}
       
        <br />
        {{$t('information.zongze2e')}}
         <br />
         {{$t('information.zongze2e1')}}
      </div>
      <div class="content-title">{{$t('information.serve')}}</div>
      <div class="content-text">
        {{$t('information.serveText')}}
      </div>
      <div class="content-text">
        {{$t('information.serve1')}}<br />
        {{$t('information.serve1a')}}<br />
        {{$t('information.serve1a1')}}<br />
        {{$t('information.serve1b')}}<br />
        {{$t('information.serve1b1')}}
      </div>
      <div class="content-text">
        {{$t('information.serve1b2')}}<br />
        {{$t('information.您需知晓并同意')}}<br />
        {{$t('information.serve1b2a')}}<br />
       {{$t('information.serve1b2b')}}<br />
       {{$t('information.serve1bc')}}
        <br />
        {{$t('information.serve1b3')}}<br />
        {{$t('information.serve1b3text')}}
        <br />
        {{$t('information.serve1b4')}}<br />
        {{$t('information.serve1b4a')}}
        <br />
        {{$t('information.serve1b4b')}}
        <br />
        {{$t('information.serve1b4c')}}
        <br />
        {{$t('information.serve1b4d')}}
        <br />{{$t('information.serve1b4e')}}
        <br />
        {{$t('information.serve1b4f')}}
      </div>

      <div class="content-title">{{$t('information.announcement')}}</div>
      <div class="content-text">
        {{$t('information.announcement1')}}
      </div>
      <div class="content-title">{{$t('information.account')}}</div>
      <div class="content-text">
        {{$t('information.account1')}}<br />
        {{$t('information.account1text1')}}
         {{$t('information.account1text0')}}<br />
         {{$t('information.account1text2')}}<br />
         {{$t('information.account1text3')}}<br />
         {{$t('information.account1text4')}}<br />
         {{$t('information.account1text5')}}<br />
         {{$t('information.account1text6')}}<br />
         {{$t('information.account1text7')}}<br />
         {{$t('information.account1text8')}}<br />
         {{$t('information.account1text9')}}<br />
         {{$t('information.account1text10')}}
        <br />{{$t('information.account2')}}
        <br />{{$t('information.account3')}}
      </div>
      <div class="content-title">{{$t('information.suggestion')}}</div>
      <div class="content-text">
        {{$t('information.suggestion1')}}
      </div>
      <div class="content-title">{{$t('information.law')}}</div>
      <div class="content-text">
        {{$t('information.law1')}}
      </div>
      <span class="privacy" @click="onpolicy"><span>{{$t('information.隐私政策')}}</span> <i class="el-icon-right"></i></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Protocol",
  data() {
    return {
      logoName:'BSEX'
    };
  },
  methods: {
     onpolicy() {
      this.$router.push({
        path: "/information/compliance",
        query: {
          params: 3,
        },
      });
    },
  },
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
    .content-title {
      font-size: 16px;
    }
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

      .content-date {
        font-size: 10px;
        color: #999;
      }
    }
    .content-text {
      margin: 10px 0;
      font-size: 14px;
    }
    .content-info {
      p {
        padding-left: 60px;
      }
    }
    .privacy{
      color: #90ff00;
      cursor: pointer;
      font-size: 20px;
      min-width: 110px;
    }
  }
}
</style>