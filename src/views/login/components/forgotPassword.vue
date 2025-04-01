<template>
 <div style="width: 480px;  background-color:#1B1B1B; border-radius: 4px; padding: 36px 40px">
  <div style="font-weight: 600; font-size: 30px; color: #F0F0F0">找回密码</div>
  <div style="margin-top: 30px;">
   <div class="login-type flex ic" style="">
    <div :style="{ color: curIndex === 0 ? '#F0F0F0' : '#737373' }"
         style="font-size:16px;font-weight: 600; margin-right: 20px; "
         @click="handleCheck(0)">
     手机
    </div>
    <div :style="{ color: curIndex === 1 ? '#F0F0F0' : '#737373' }"
         style="font-size:16px;font-weight: 600; " @click="handleCheck(1)">
     邮箱
    </div>
   </div>

   <div v-if="curIndex === 0 ">
       <PhoneNumberMax @phoneNumberData="phoneNumberData" :authBizEnum='authBizEnum' :bizId=bizId :titleInfoState="titleInfoState" />

   </div>
   <div style="margin-top: 12px;" v-else>
    <input v-model="emailData" @input="emailInput" @focus="$event.target.style.border = '0.5px solid #90FF00'"
           @blur="$event.target.style.border = '0.5px solid rgba(0,0,0,0)'"
           style="width: 100%; height: 57px; padding-bottom: 5px; caret-color: #90FF00;outline: none;font-size: 14px;font-weight: 600;
    color: #F0F0F0;
    border: 0.5px solid rgba(0, 0, 0, 0); border-radius: 4px; background: #252525;  text-align: left; padding-left: 12px;"
           placeholder="请输入邮箱" type="text">

   </div>
  




   <div style="display: flex; justify-content: center; align-items: center;height: 50px; margin-top: 25px; cursor: pointer;">
   <div @mousedown="handleMouseDown" @mouseup="handleMouseUp" @click="registerBtn" class="flex jc ic "
        style="width: 400px; font-weight: 500; border-radius: 4px; font-size: 16px; margin-top: 20px; background-color:#90FF00;"
        :style="{ width: msState ? '98%' : '100%', height: msState ? '44px' : '48px', color: msState ? '#5A9212' : '#252525' }">
    <div style="color: #252525; font-weight: 600; font-size: 16px;">下一步</div>
   </div>
  </div>
  <div class="flex"  @click="onbackLogin"   style="color:#90FF00; cursor: pointer; margin-top: 20px; justify-content: flex-end;">返回登录界面</div>

  </div>

 </div>
</template>

<script>
import PhoneNumberMax from '@/views/com/PhoneNumberMax.vue'
import {onPasswordCheck} from "@/api/login";
import { mapMutations } from 'vuex';

export default {
       components: {
    PhoneNumberMax},

 name: "GoogleCode",
 data() {
  return {
   curIndex: 0,
   emailData: '',
   msState: false,
   phoneData:'',
   authBizEnum:'',
    bizId:'',
    titleInfoState:''

  };
 },
 methods: {
       ...mapMutations(['setAuthBizEnum', 'setBizId', 'setAuthOptions', 'setMethod', 'setUsername', 'setPassword', 'setInviteCode', 'setTelegramId']),


         // 输入的手机号码
    phoneNumberData(phoneData) {
      this.phoneData = phoneData
      console.log(phoneData, "phoneDataphoneData");

    },
   
    onbackLogin(){
     this.$emit('onbackLoginFnsh')
   },



    registerBtn() {
   // 检查 passwordValidation 数组中是否存在 0、1、2、3 或 4

   Promise.try(async () => {
       console.log("onPasswordCheck232323233");

    return await onPasswordCheck({
     forgetType:this.curIndex === 0 ? 'PHONE' : 'EMAIL',
     username:this.curIndex === 0 ? this.phoneData :  this.emailData,
    })
   }).then(res => {
    const {authBizEnum, authOptions, bizId} = res.data
    
    this.setAuthBizEnum(authBizEnum)
    this.setBizId(bizId)
    this.setAuthOptions(authOptions)

    this.$emit('forgotPasswordFn')

//     this.$parent.phoneState = false
//     this.$parent.forgotPasswordState = false
//     this.phoneState = false
   })
  },

  handleCheck(index) {
   this.curIndex = index;
  },
  emailInput() {
   console.log(8888);
  },

  handleMouseDown() {
   this.msState = true

  },
  handleMouseUp() {
   this.msState = false
  },

 },
};
</script>

<style lang="scss" scoped></style>