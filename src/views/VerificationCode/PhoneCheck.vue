<template>
 <div>
  <!-- 手机验证码  -->
  <div>
   <div v-if="stateShow" class="ff0" style="font-size: 14px; margin-bottom: 9px; ">手机验证码</div>
   <div class="input-containerS" style="height: 42px;">
    <!-- :placeholder="请输入4位手机验证码"  -->
    <input style="height: 42px; padding-left: 12px; color: #F0F0F0" v-model="phoneCheckCode"
           maxlength="4"
           @input="handleInput" @focus="eventFocusS($event)" @blur="$event.target.style.border = 'none',
                        eventFlag = false" class="custom-input" placeholder="请输入4位手机验证码 " type="text"/>
    <div class="input-icon " style="cursor: pointer;display: flex;">
     <div v-if="secondsStatus" style="color: #737373;">
      {{ seconds }}(s)
     </div>
     <div v-else @click="phondeVerifyCode"
          style="font-weight: 400; color: #90FF00; font-size: 12.5px; font-family: PingFang SC;">
      获得验证码
     </div>
     <div style="margin-top: 2px; margin-left:6px;width: 14px; height: 14px;"><img style="width: 100%; height: 100%;"
                                                                                   src="@/assets/newg/icon_noticeCCC.png"
                                                                                   alt="">
     </div>
    </div>
   </div>
   <div v-if="stateShow"
        style="font-family: PingFang SC;font-size: 14px;font-weight: 500;margin-top: 8px;margin-bottom: 7px; color: #737373 ">
    获取并输入手机{{ option.prompt }}收到的验证码，验证码30分钟有效
   </div>
   <div @click="$refs.mobileCode.openDialog('NEW_PHONE')"
        style="color: #90FF00; font-size: 12px; margin-top: 7px; font-family: PingFang SC; font-weight: 500; margin-bottom: 29px;">
    未收到短信验证码？
   </div>
  </div>

  <mobile-code ref="mobileCode"/>
 </div>
</template>

<script>
import {mapGetters} from 'vuex';
import MobileCode from '@/views/login/components/mobileCode.vue';

// import axios from 'axios';
import {onSendCode} from "@/api/common";

export default {
 props: {
  bizId: {
   type: String,
   required: false,
  },
  method: {
   type: String,
   required: false,
  },
  authBizEnum: {
   type: String,
   required: false,
  },
  option: {
   type: Object,
   required: false,
  },
  stateShow: {
   type: String,
   required: false,
  },
 },


 components: {
  MobileCode
  // User
 },
 name: 'PhoneCheck',
 data() {
  return {
   phoneCheckCode: '',
   secondsStatus: false,
   secondsEmail: false,
   seconds: 60, // 倒计时数据
   verifyCode: '',
   passwordData: '',
   eventFlag: false,
  }
 },
 computed: {
  ...mapGetters(['getAccountList', 'getToken', 'getUserList', 'getBizId', 'getAuthBizEnum']),
  userList() {
   return this.getUserList; // 计算属性返回用户信息
  },
  phoneEmail() {
   return this.getMethod == "NEW_PHONE" ? true : false
  },
 },
 mounted() {
 },
 methods: {

  handleInput() {
   this.$emit('phoneCheckCodeClick', this.phoneCheckCode)
   // const inputValue = event.target.value;
   // // 限制输入长度为 20
   // if (inputValue.length <= 4) {
   //     this.verifyCode = inputValue; // 更新密码数据
   // } else {
   //     this.verifyCode = inputValue.slice(0, 4); // 截取前 20 个字符
   //     return
   // }
  },

  eventFocusS(e) {
   e.target.style.border = '0.5px solid #90FF00'
   this.eventFlag = true
  },

  phondeVerifyCode() {
   this.getCode(this.getBizId, this.getAuthBizEnum)
  },

  getCode(bizId, authBizEnum) {
   Promise.try(() => {
    return onSendCode({
     bizId,
     method: 'PHONE',
     authBizEnum,
    })
   }).then(() => {
    this.secondsStatus = true
    this.timer = setInterval(() => {
     if (this.seconds > 0) {
      this.seconds--; // 每秒减少 1
     } else {
      clearInterval(this.timer); // 倒计时结束，清除定时器
      this.seconds = 60
      this.secondsStatus = false
     }
    }, 1000);
   })
  },

 }


}
</script>

<style scoped>
.ff {
 font-family: PingFang SC;
 font-weight: 500;
}

.ff0 {
 color: #F0F0F0;
}

.input-containerS {
 display: flex;
 align-items: center;
 position: relative;
 /* 使子元素绝对定位相对于这个容器 */

 width: 100%;
 /* 容器宽度 */
}

.rotate {
 transform: rotate(180deg);
 /* 旋转 180 度 */
}

.dropdown {
 height: 296px;
 border: 0.5px solid #252525;
 width: 272px;
 position: absolute;
 top: 58px;
 left: 0px;
 background-color: #1C1C1C;
 border-radius: 4px;
 margin-top: 1px;
 z-index: 10;
 overflow: hidden;
}

.input-icon {
 position: absolute;
 right: 10px;
 display: inline-block;
 /* 确保图标在同一行 */
}

.dropdown-item {

 border-radius: 4px;
 /* // padding: 8px 12px; */
 cursor: pointer;
 overflow: hidden;
 /* // color: #363636; */
 color: #737373;
}

.dropdown-item:hover {
 overflow: hidden;
 border-radius: 4px;
 background-color: #252525;
 color: #90ff00;
}

.parent-component {
 padding: 20px;
}

.cancel {
 color: #737373;
 background-color: #252525;
}

.cancel:hover {
 color: #F0F0F0;
 background-color: #363636;
}

.submit {
 background-color: #90FF00;
 color: #252525;
}

.submit:hover {
 color: #737373;
}

.custom-input {
 width: 100%;
 /* 输入框宽度 */
 height: 40px;
 /* 输入框高度 */
 caret-color: #90FF00;
 /* 光标颜色 */
 outline: none;
 /* 去除聚焦时的蓝色边框 */
 border: 0.5px solid rgba(0, 0, 0, 0);
 /* 初始边框样式 */
 border-radius: 4px;
 /* 圆角边框 */
 background: #252525;
 /* 背景颜色 */
 text-align: left;
 /* 文本左对齐 */
}

.dialog-overlay {
 border-radius: 10px;
 position: fixed;
 top: -70px;
 left: 0;
 width: 100%;
 height: 100%;
 background-color: rgba(0, 0, 0, 0.5);
 display: flex;
 justify-content: center;
 align-items: center;
 z-index: 888;
}

.dialog-content {
 background-color: #1B1B1B;
 border-radius: 10px;
 position: relative;
 max-width: 90%;
 max-height: 90%;
 overflow: auto;
}

.close-button {
 position: absolute;
 /* top: 10px; */
 right: 10px;
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
 border-top: 1px solid #252525;
 width: 100%;
 padding-top: 15px;
 padding-bottom: 15px;
 background: rgba(0, 0, 0, 0);

 color: #90FF00;;
 border: none;
 border-radius: 4px;
 cursor: pointer;
}

.input-container {
 display: flex;
 border-radius: 4px;
 overflow-y: auto;
 position: relative;
 /* 使子元素绝对定位相对于这个容器 */
 width: 100%;
 /* 容器宽度 */
 background: #252525;
 /* 背景颜色 */
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

.fade-enter-active,
.fade-leave-active {
 transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to {
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
 border-radius: 10px;
 position: relative;
 cursor: pointer;
 border: 1px solid #737373;
 margin-right: 5px;
 overflow: hidden;
 /* 确保图标不会超出边框 */
}

.box:last-child {
 margin-right: 0;
}

.selected {
 border-color: #90FF00;
}

.selected-icon {
 position: absolute;
 top: 0;
 right: 0;
 height: 30px;
 width: auto;
 /* 保持图片的原始宽高比 */
 object-fit: contain;
 /* 确保图片完全显示 */
}

.textTips {
 font-family: PingFang SC;
 font-size: 11px;
 font-weight: 500;
 color: #737373;
}
</style>

<style scoped>
.custom-slider-container {
 position: relative;
 width: 100%;
 padding-bottom: 20px;
 /* 为标签腾出空间 */
}

.custom-slider {
 position: relative;
 width: 100%;
 height: 14px;
 padding: 6px 0;
}

.slider-track {
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 width: 100%;
 height: 1px;
 background-color: #252525;
}

.slider-fill {
 position: absolute;
 height: 100%;
 background-color: #B3B3B3;
}

.slider-point {
 position: absolute;
 top: 50%;
 transform: translate(-50%, -50%);
 width: 14px;
 height: 14px;
 background: url('@/assets/images/icon/icon-drag-node2.png') no-repeat center center;
 background-size: cover;
}

.slider-point.active {
 background-image: url('@/assets/images/icon/icon-drag-node.png');
}

.slider-thumb {
 position: absolute;
 top: 50%;
 transform: translateY(-50%);
 width: 22px;
 height: 22px;
 background: url('@/assets/images/icon/icon-Slide.png') no-repeat center center;
 background-size: cover;
 cursor: pointer;
}

.slider-tooltip {
 position: absolute;
 top: -25px;
 transform: translateX(-50%);
 background-color: #B3B3B3;
 color: #252525;
 padding: 2px 6px;
 border-radius: 3px;
 font-family: PingFang SC;
 font-size: 11px;
 font-weight: 500;

}

.slider-labels {
 position: absolute;
 width: 100%;
 top: 100%;
 left: 0;
 margin-top: -16px;
 font-family: PingFang SC;
}

.slider-label {
 position: absolute;
 transform: translateX(-50%);
 font-size: 11px;
 font-weight: 500;
 color: #B3B3B3;
}

.filteredAccountList {
 color: #B3B3B3;

}

.filteredAccountList:hover {
 color: #FFFFFF;
}
</style>