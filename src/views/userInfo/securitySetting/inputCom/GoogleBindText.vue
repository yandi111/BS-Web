<template>
 <div>
  <transition name="fade">
   <div style="padding-left: 30px; padding-right: 30px; padding-top: 30px;">
    <div style="font-size: 12px; color: #737373;" class="ff">
     <div style="white-space: nowrap;">
      *谷歌验证器是一款动态口令工具，工作原理类似短信动态验证。绑定后每30s生成一个动态验证码，
     </div>
     <div style="margin-top: 2px;">验证码可用于登录、提现、修改安全设置等操作的安全验证</div>
    </div>
    <div style="font-size: 12px; color: #737373; margin-top: 22px;" class="ff">
     <div style="color: #F0F0F0;font-size: 14px; font-weight: 500;">1 下载谷歌验证器APP</div>
     <div style="margin-top: 14px;">iOS用户登录App
      Store搜索“Authenticator”下载。安卓用户登录应用商店或使用手机浏览器搜索“谷
     </div>
     <div style="margin-top: 2px;">歌验证器”下载</div>
    </div>

    <div style="font-size: 12px; color: #737373; margin-top: 30px;" class="ff">
     <div style="color: #F0F0F0;font-size: 14px; font-weight: 500;">2 安装完成后打开谷歌验证器APP，扫描下方二维码或手动输入秘钥，得到6位数验证码
     </div>
     <div style="margin-top: 12px; color: #ED3C2F;">
      请务必妥善保管谷歌验证秘钥，以免更换或丢失手机导致无法换绑。未保存密钥的情况下删除谷歌验证
     </div>
     <div style="margin-top: 2px;font-size: 12px; color: #ED3C2F;">器内已绑定的账号将导致账户无法登录，请谨慎操作。</div>
    </div>

    <div style="margin-top: 14px;" class="flex">
     <div style="height: 134px; margin-right: 15px;">
      <img class="img100" :src="qrcodeUrl" alt="">
     </div>
     <div class="flex" style="margin-top: 101px;">
      <div style="color: #737373;">秘钥:{{ googleTotpKey }}</div>
      <div @click="$copyContent(googleTotpKey)" style="display: flex; margin-left: 2px; margin-right: 2px;">
       <div style="width: 20px; cursor: pointer;  margin-top: 1px; height: 20px;color: #F0F0F0">
        <img width="100%" height="100%" src="@/assets/side/icon_responsible.png" alt=""></div>
      </div>

     </div>

    </div>

   </div>
  </transition>


 </div>
</template>

<script>

export default {
 props: {
  googleTotpKey: {
   type: String,
   required: true,
  },
  qrcodeUrl: {
   type: String,
   required: true,
  }
 },
 components: {},
 name: 'GoogleBindText',

 data() {
  return {}
 },
}
</script>

<style scoped>
.ff {
 font-weight: 500;
}

.img100 {
 /* width: 100%; */
 height: 100%;
}

.close-button svg {
 fill: #333333;
 transition: fill 0.3s ease;
}

.close-button:hover svg {
 fill: #ffffff;
}

h2 {
 color: #333;
 margin-bottom: 15px;
}

p {
 margin-bottom: 20px;
}

.selected-icon img {
 height: 30px;
 width: 30px;
}
</style>