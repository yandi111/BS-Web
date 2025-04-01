<template>
 <div style="margin-bottom: 29px;width: 100%;">
  <!-- INPUT邮箱验证码  -->
  <div>
   <div class="ff0" style="font-size: 14px; margin-bottom: 9px; ">
    {{ emailInfoState ? '新邮箱号' : '邮箱号' }}
   </div>
   <div class="input-containerS" style="height: 42px;">
    <input style="height: 42px; padding-left: 12px; color: #F0F0F0" v-model="emailCheckCode"
           @input="handleInput" @focus="eventFocusS($event)" @blur="$event.target.style.border = 'none',
                        eventFlag = false" class="custom-input" placeholder="请输入邮箱号 " type="text"/>

    <div class="input-icon " style="cursor: pointer;display: flex;">
     <div v-if="secondsStatus" style="color: #737373;">
      {{ seconds }}(s)
     </div>
     <div v-else @click="phondeVerifyCode"
          style="font-weight: 400; color: #90FF00; font-size: 12.5px;">
      获得验证码
     </div>
     <div style="margin-top: 2px; margin-left:6px;width: 14px; height: 14px;">
      <img style="width: 100%; height: 100%;" src="@/assets/newg/icon_noticeCCC.png" alt="">
     </div>
    </div>
   </div>
  </div>

  <div style="margin-top: 29px;">
   <div class="ff0" style="font-size: 14px; margin-bottom: 9px; "> {{
     emailInfoState ? '新邮箱验证码' : '邮箱验证码'
    }}
   </div>
   <div class="input-containerS" style="height: 42px;">
    <input style="height: 42px; padding-left: 12px; color: #F0F0F0" v-model="emailCheckCodeInfo"
           maxlength="4"
           @input="handleInputSh" @focus="eventFocusS($event)" @blur="$event.target.style.border = 'none',
                        eventFlag = false" class="custom-input" placeholder="请输入4位邮箱验证码 " type="text"/>

    <div class="input-icon " style="cursor: pointer;display: flex;">
    </div>
   </div>
   <div @click="$refs.mobileCode.openDialog(getMethod)"
        style="color: #90FF00; font-size: 12px; margin-top: 7px; font-weight: 500; cursor: pointer;">
    未收到邮件？
   </div>

  </div>

  <mobile-code ref="mobileCode"/>
 </div>
</template>

<script>
import MobileCode from '@/views/login/components/mobileCode.vue';
import {onSendCode} from "@/api/common";

export default {
 props: {
  bizId: {
   type: String,
   required: true,
  },
  method: {
   type: String,
   required: true,
  },
  authBizEnum: {
   type: String,
   required: true,
  },
  emailInfoState: {
   type: Boolean,
   required: true,
  },
 },
 components: {
  MobileCode
 },
 name: 'EmailCheck',
 data() {
  return {
   emailCheckCode: '',
   secondsStatus: false,
   secondsEmail: false,
   seconds: 60, // 倒计时数据
   verifyCode: '',
   eventFlag: false,
   emailCheckCodeInfo: '',


  }
 },

 methods: {

  handleInput() {
   this.$emit('emailINPUTCodeClick', this.emailCheckCode)
  },

  handleInputSh() {
   this.$emit('emailINPUTCodeClickSh', this.emailCheckCodeInfo)
  },

  eventFocusS(e) {
   e.target.style.border = '0.5px solid #90FF00'
   this.eventFlag = true
  },

  phondeVerifyCode() {
   this.getCode(this.bizId, this.authBizEnum)
  },

  getCode(bizId, authBizEnum) {
   if (!this.emailCheckCode) return this.$customMessage(1, '邮箱号不能为空')

   Promise.try(() => {
    return onSendCode({bizId, method: this.method, authBizEnum, to: this.emailCheckCode})
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

.input-icon {
 position: absolute;
 right: 10px;
 display: inline-block;
 /* 确保图标在同一行 */
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