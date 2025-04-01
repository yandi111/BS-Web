<template>
 <div style="margin-bottom: 29px;">
  <!-- 谷歌验证码  -->
  <div style="margin-top: 29px;">
   <div class="ff0" style="font-size: 14px; margin-bottom: 9px; ">谷歌验证码</div>
   <div class="input-containerS" style="height: 42px;">
    <input style="height: 42px; padding-left: 12px; color: #F0F0F0" v-model="emailCheckCode"
           maxlength="4"
           @input="handleInput" @focus="eventFocusS($event)" @blur="$event.target.style.border = 'none',
                        eventFlag = false" class="custom-input" placeholder="请输入谷歌验证码 " type="text"/>

    <div class="input-icon " style="cursor: pointer;display: flex;">
    </div>
   </div>


  </div>

 </div>
</template>

<script>
// import { account } from '@/views/contractTransaction/components/ws/accountEnsure';
// import UserTips from './userTips.vue';    this.$refs.mobileCode.openDialog(this.getMethod)
import {mapGetters} from 'vuex';

// import axios from 'axios';
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
 },
 components: {},
 name: 'GoogleCheckCode',
 data() {
  return {
   emailCheckCode: '',
   secondsStatus: false,
   secondsEmail: false,
   seconds: 60, // 倒计时数据
   verifyCode: '',
   eventFlag: false,


  }
 },
 computed: {
  ...mapGetters(['getToken']),

 },
 // eslint-disable-next-line vue/return-in-computed-property
 mounted() {
 },
 methods: {

  handleInput() {

   this.$emit('googleCheckCodeClick', this.emailCheckCode)

  },

  eventFocusS(e) {
   e.target.style.border = '0.5px solid #90FF00'
   this.eventFlag = true
  },

  phondeVerifyCode() {
   this.getCode(this.bizId, this.authBizEnum)
  },

  getCode(bizId, authBizEnum) {
   Promise.try(() => {
    return onSendCode({
     bizId,
     method: 'EMAIL',
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