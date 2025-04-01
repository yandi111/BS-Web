<template>
 <div>
  <!-- <button @click="openDialog"></button> -->

  <transition name="fade">
   <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false">
    <div class="dialog-content" style="border:1px solid #252525;">
     <div class="flex jb"
          style="padding-top: 17px; padding-bottom: 10px; padding-left: 17px; padding-right: 17px; border-bottom: 1px solid #252525; ">
      <div class="ff" style="font-size: 16px; color: #F0F0F0;  ">{{ flagState == 1 ? $t('lang_2650') : $t('lang_2510') }}{{$t('lang_2499')}}</div>
      <div>
       <button @click="isDialogVisible = false" class="close-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
         <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
        </svg>
       </button>
      </div>

     </div>

     <div style="place-self: 30px; padding-right: 30px; padding-left: 30px; padding-top: 29px;">
      <!-- 谷歌验证 -->
      <div style=" margin-top: 29px; width: 440px;">
       <div class="ff0" style="font-size: 14px; margin-bottom: 9px; margin-top: 25px;">{{$t('lang_2499')}}</div>
       <div class="input-container"
            :style="{ border: eventFlags ? '0.5px solid #90FF00' : '0.5px solid rgba(0,0,0,0)' }"
            style="padding-right: 12px;">
        <div class="inputLeft" style="height: 40px; width: 100%;">
         <input maxlength="4" v-model="passwordData" @focus="eventFocus($event)"
                @blur="eventFlags = false" class="custom-input" :placeholder="$t('lang_2584')" type="text"
                style="padding-left: 12px; color: #F0F0F0;border:none;height: 40px;"/>
        </div>

        <div
         style="cursor: pointer;  display: flex; justify-content: end ;align-items: center ; color: #737373;">
         <!-- {{ passwordData.length }}/20 -->
        </div>
       </div>


      </div>

      <div class="flex" style="margin-top: 44px; margin-bottom: 30px;padding-left: 100px; padding-right: 100px;">
       <div @click.self="isDialogVisible = false" class="cancel flex jc ic"
            style="cursor: pointer; font-weight: 600; font-size: 13px; flex:1;margin-right:14px;height: 34px;border-radius: 4px;">
        {{$t('lang_1989')}}
       </div>
       <div @click.self="submit" class="submit flex jc ic"
            style="cursor: pointer; font-weight: 600; font-size: 13px; flex:1; height: 34px; border-radius: 4px;">
        {{$t('lang_345')}}
       </div>
      </div>
     </div>


    </div>
   </div>
  </transition>
  <mobile-code ref="mobileCode"/>
 </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
import MobileCode from '@/views/login/components/mobileCode.vue';
import {onPinShingCode} from "@/api/user";

export default {

 components: {
  MobileCode,

 },
 name: 'ChangeFishingcode',
 data() {
  return {
   getMethod: "NEW_PHONE",
   seconds: 60, // 倒计时数据
   eventFlags: false,
   eventFlagsh: false,
   verifyCode: '',
   blurstate: false,
   phoneCheck: false,
   selectedOption: '86', // 默认选项
   isDropdownVisible: false,
   phoneNumberData: null,
   flagState: null,
   countryList: [
    {
     id: 1,
     name: '中国',
     code: 53
    },
    {
     id: 2,
     name: '中国香港',
     code: 54
    },

    {
     id: 2,
     name: '中国香',
     code: 55
    }

   ],

   passwordData: '',
   eventFlag: false,
   count: 0,
   isHovered: false,
   isAddHovered: false,
   isDialogVisible: false,
   accountList: [
    {
     account: '857229093@qq.components',
     name: '移出'
    },
    {
     account: '857229093@qq.components',
     name: '移出'
    },
    {
     account: '857229093@qq.components',
     name: '移出'
    }
   ]


  }
 },
 computed: {
  ...mapGetters(['getUserList']),
  userList() {
   return this.getUserList; // 计算属性返回用户信息
  },
  phoneEmail() {
   return this.getMethod === "NEW_PHONE"
  },
 },

 methods: {
  ...mapActions(['fetchUserInfo']),

  submit() {
   if (!this.passwordData) return this.$customMessage(1, "请输入防钓鱼码")

   Promise.try(() => {
    return onPinShingCode({code: this.passwordData})
   }).then(() => {
    this.isDialogVisible = false
    this.$customMessage(0, this.flagState === 1 ? "绑定成功" : '更改成功')

    this.fetchUserInfo()
   })
  },

  eventFocus(e) {
   console.log(e)
   // e.target.style.border  = '0.5px solid #90FF00'
   this.eventFlag = true
   this.eventFlags = true
  },
  openDialog(active) {
   this.passwordData = ''
   this.isDialogVisible = true
   this.flagState = active
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

.ff0 {
 color: #F0F0F0;
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