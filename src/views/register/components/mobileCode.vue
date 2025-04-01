<template>
 <transition name="fade">
  <div v-if="isDialogVisible" class="dialog-overlay" @click.self="closeDialog">
   <div class="dialog-content" style="border:1px solid #252525;">

    <div class="flex jb" style="padding-top: 17px; padding-bottom: 17px; padding-left: 30px; padding-right: 17px;">
     <div class="ff" style="font-size: 22px; color: #FFFFFF; margin-top: 20px; ">

      {{ phoneEmail === 'NEW_PHONE' ? '未收到短信验证码?' : '未收到邮件?' }}
     </div>
     <div>
      <button @click="closeDialog" class="close-button">
       <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
        <path
         d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
       </svg>
      </button>
     </div>
    </div>
    <div v-if="phoneEmail === 'NEW_PHONE'"
         style="margin-top: 14px; color: #737373; font-size: 14px; font-weight: 500; margin-left: 30px; margin-right: 30px;">
     <div style="margin-bottom: 10px;">1.请确定您使用的手机号为 {{ promptNumber }}</div>
     <div style="margin-bottom: 10px;"> 2.请检查您的手机信号及网络是否处于正常</div>
     <div style="margin-bottom: 10px;">3.请检查手机存储空间是否已满</div>
     <div style="margin-bottom: 10px;">4.请检查绑定的手机号是否欠费</div>
     <div style="margin-bottom: 10px;"> 5.请关闭安全软件并重启手机</div>
     <div style="margin-bottom: 1px;">6.如您使用双卡槽手机，请将您的SIM卡置入另一个插槽。若您使</div>
     <div style="margin-bottom: 10px;"> 用的是单卡槽手机，请将您的SIM卡置入其他手机尝试</div>
     <div style="margin-bottom: 1px;">7.如若您也无法接收其他平台信息，请联系您的电讯公司并询问是否封</div>
     <div style="margin-bottom: 10px;">锁/暂停您的手机配套服务</div>
    </div>
    <div v-else
         style="margin-top: 14px; color: #737373; font-size: 14px; font-weight: 500; margin-left: 30px; margin-right: 30px;">
     <div style="margin-bottom: 10px;">首先请您确保以下操作</div>
     <div style="margin-bottom: 10px;">1.请确定您使用的邮箱正确</div>
     <div style="margin-bottom: 10px;">2.请您尽量选择Gmail、Outlook等主流邮箱</div>
     <div style="margin-bottom: 10px;">3.请确保电子邮件不在您的垃圾邮件文件夹中</div>
     <div style="margin-bottom: 10px;">4.您已将 BSEX 电子邮件域名列入白名单</div>
     <div style="margin-bottom: 1px;">5.请检查您的收件箱是否还有容量</div>
     <div style="margin-bottom: 10px;"> 6.请您尝试退出“邮件”后再次打开，并检查网络是否处于正常</div>
     <div style="margin-bottom: 1px;">7.请检查电子邮件服务器设置，以确保没有任何由防火墙或防病毒软件</div>
     <div style="margin-bottom: 10px;">而引起的安全冲突</div>
    </div>
    <div v-if="phoneEmail === 'NEW_PHONE'">
     <div
      style="margin-top: 30px; color: #F0F0F0; font-size: 14px; font-weight: 500; margin-left: 30px; margin-bottom: 5px;">
      如您已确保上述所有内容均无问题，但仍无法接收 BSEX 短信，请
     </div>
     <div style="color: #F0F0F0; font-size: 14px; font-weight: 500; margin-left: 30px;">
      您联系<span style="color: #90FF00;">在线客服</span>, 我们将第一时间为您解决!
     </div>
     <div
      style="text-align: center; margin-top: 30px; color: #F0F0F0; font-size: 14px; font-weight: 500; margin-left: 30px; margin-bottom: 43px;">
      尝试接听<span style="color: #90FF00;">语音验证码?</span>
     </div>
    </div>

    <div v-else style=" margin-bottom: 43px">
     <div
      style="margin-top: 30px; color: #F0F0F0; font-size: 14px; font-weight: 500; margin-left: 30px; margin-bottom: 5px;">
      如您已确保上述所有内容均无问题，但仍无法接收 BSEX 邮件，请您联
     </div>
     <br>
     <div style="color: #F0F0F0; font-size: 14px; font-weight: 500; margin-left: 30px;">
      系<span style="color: #90FF00;">在线客服</span>, 我们将第一时间为您解决!
     </div>

    </div>
   </div>
  </div>
 </transition>
</template>
<script>
export default {
 name: 'mobileCode',
 data() {
  return {
   phoneEmail: '',
   isDialogVisible: false,
   selectedIndex: 1, // 默认选中第二个盒子
   isSecondSelected: true,// 默认选中第二个盒子
   isSecondSelected2: true,// 默认选中第二个盒子
   promptNumber: null
  }
 },
 methods: {
  openDialog(active, promptNumber) {
   this.phoneEmail = active
   console.log(active, 'activeactiveactive');
   this.promptNumber = promptNumber

   this.isDialogVisible = true
  },
  closeDialog() {
   this.isDialogVisible = false
  },
 }
}
</script>

<style scoped>
.ff {
 font-weight: 500;
}

.dialog-overlay {
 padding-left: 30px;
 padding-right: 30px;
 position: fixed;
 top: 0;
 left: 0;
 width: 100%;
 height: 100%;
 background-color: rgba(0, 0, 0, 0.5);
 display: flex;
 justify-content: center;
 align-items: center;
 z-index: 1000;
}

.dialog-content {
 background-color: #1B1B1B;
 border-radius: 4px;
 position: relative;
 max-width: 90%;
 max-height: 90%;
 overflow: auto;
}

.close-button {
 position: absolute;
 top: 24px;
 right: 30px;
 background: transparent;
 border: none;
 cursor: pointer;
 padding: 0;
 width: 20px;
 height: 20px;
 display: flex;
 justify-content: center;
 align-items: center;
}

.close-button svg {
 fill: #333333;
 transition: fill 0.3s ease;
}

.close-button:hover svg {
 fill: #ffffff;
}

.confirm-button {
 margin-bottom: 15px;
 width: 100%;
 padding-top: 10px;
 padding-bottom: 10px;
 background: #90FF00;

 color: #252525;
 border: none;
 border-radius: 4px;
 cursor: pointer;
}

/* .confirm-button:hover {
  background-color: #45a049;
} */

h2 {
 color: #333;
 margin-bottom: 15px;
}

p {
 margin-bottom: 20px;
}

.fade-enter-active, .fade-leave-active {
 transition: opacity 0.3s;
}

.fade-enter, .fade-leave-to {
 opacity: 0;
}

.selected-icon {
 position: absolute;
 right: 0.3px;
 top: 0.3px;
 overflow: hidden;
}

.selected-icon img {
 height: 30px;
 width: 30px;
}

.box {
 padding: 5px 70px;
 border-radius: 4px;
 position: relative;
 cursor: pointer;
 border: 1px solid #737373;
 margin-right: 5px;
 overflow: hidden; /* 确保图标不会超出边框 */
}

.box:last-child {
 margin-right: 0;
}

.selected {
 border-color: #90FF00;
}

.textcolor {
 color: #737373;
}

.selected-icon {
 position: absolute;
 top: 0;
 right: 0;
 height: 30px;
 width: auto; /* 保持图片的原始宽高比 */
 object-fit: contain; /* 确保图片完全显示 */
}
</style>