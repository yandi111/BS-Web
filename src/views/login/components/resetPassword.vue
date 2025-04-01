<template>
 <div style="width: 480px;  background-color:#1B1B1B; border-radius: 4px; padding: 36px 40px">
  <div style="font-weight: 600; font-size: 30px; color: #F0F0F0">重置密码</div>
  <div style="margin-top: 30px;">


    <div class="flex"
          style=" overflow: hidden;  padding-top: 15px; padding-bottom: 17px; padding-right: 10px;">
      <div style="margin-top: 3px;"><img width="14px" height="14px"  src="@/assets/newg/icon_notice.png" alt=""></div>
      <div style="font-size: 12px; margin-left: 6px;color: #737373; "> 密码长度为 8-20 个字符，需至少包含1个大写字母、1个小写字母、1个数字、1
       个符 号</div>
     </div>
  
     <passwordInput  @passwordDataInputFn="passwordDataInputFn" />

    <div class="input-container" :style="{ border: eventFlag ? '0.5px solid #90FF00' : '0.5px solid rgba(0,0,0,0)' }">
    <div class="inputLeft" style="height: 57px;">
     <input v-model="passwordData" maxlength="20" @focus="eventFocus($event)" @blur="eventFlag = false"
            class="custom-input" placeholder="请输入密码" :type="iconOpen === 1 ? 'password' : 'text'"
            style="color: #F0F0F0;border:none;letter-spacing: 2px;height: 57px; font-weight: 600;"/>
    </div>

    <div
     style="cursor: pointer;  display: flex; justify-content: end ;align-items: center ; margin-left: 33px; margin-right: 10px; ">
     <div @click.stop="iconClick(1)" v-if="iconOpen == 0" style="cursor: pointer; margin-top: 5px;">
      <img src="@/assets/newg/icon_open.png" alt="打开">
     </div>
     <div @click.stop="iconClick(0)" v-if="iconOpen == 1"
          style="cursor: pointer; width: 20px; height: 20px;margin-top: -1px;">
      <img style="width: 100%; height: 100%;" src="@/assets/newg/icon_close.png" alt="关闭">
     </div>
    </div>
   </div>

   <!--  -->



       <div v-if="tipsStatus == 0" style="font-size: 12px; color:#737373;margin-top: 20px;">
       <div class="flex">
        <div @click="tipsStatus = 1"
             style="margin-right: 3px; width: 18px; height: 14px;    margin-top: 5px;"><img
         src="@/assets/userInfo/icon_not.png" style="width: 100%; height: 100%;" alt="">
        </div>
        <div style="color: #737373;" >为保障您的账户资金安全，真同意更新密码后24小时内禁止提现操作，我已知晓并同意</div>
       </div>
    
      </div>
      <div v-else style="font-size: 12px; color:#90FF00; margin-top: 20px;">
       <div class="flex">
        <div @click="tipsStatus = 0"
             style="margin-right: 3px; width: 18px; height: 12px;  margin-top: 5px;"><img
         src="@/assets/userInfo/icon-check.png" style="width: 100%; height: 100%;"
         alt="">
        </div>
        <div style="color: #737373;" >为保障您的账户资金安全，真同意更新密码后24小时内禁止提现操作，我已知晓并同意</div>
       </div>
     

      </div>



   <div style="display: flex; justify-content: center; align-items: center;height: 50px; margin-top: 25px; cursor: pointer;">
   <div @mousedown="handleMouseDown" @mouseup="handleMouseUp" @click="registerBtn" class="flex jc ic "
        style="width: 400px; font-weight: 500; border-radius: 4px; font-size: 16px; margin-top: 20px; background-color:#90FF00;"
        :style="{ width: msState ? '98%' : '100%', height: msState ? '44px' : '48px', color: msState ? '#5A9212' : '#252525' }">
    <div style="color: #252525; font-weight: 600; font-size: 16px;">重置</div>
   </div>
  </div>
  <div class="flex"  @click="onbackLogin"  style="color:#90FF00; cursor: pointer; margin-top: 20px; justify-content: flex-end;">返回登录界面</div>

  </div>

 </div>
</template>

<script>
// import PhoneNumberMax from '@/views/com/PhoneNumberMax.vue'
import passwordInput from "./passwordInput.vue";
import {forgetPassword} from "@/api/login";
import { mapMutations ,mapGetters} from 'vuex';
import SHA256 from 'crypto-js/sha256';


export default {
       components: {
        passwordInput
  },

 name: "GoogleCode",
 data() {
  return {
    tipsStatus: 0,
   curIndex: 0,
   emailData: '',
   msState: false,
   phoneData:'',
   authBizEnum:'',
    bizId:'',
    iconOpen: 1,
    eventFlag: false,
    eventFlags: false,
    passwordData:'',
    passwordDataNew:''  

  };
 },
 computed: {
  ...mapGetters(['getBizId']),
},
 methods: {

       ...mapMutations(['setAuthBizEnum', 'setBizId', 'setAuthOptions', 'setMethod', 'setUsername', 'setPassword', 'setInviteCode', 'setTelegramId']),

   eventFocus() {
   this.eventFlag = true
   this.eventFlags = true
  },

  iconClick(active) {
   this.iconOpen = active
  },

  passwordDataInputFn(type) {
  this.passwordDataNew = type

   },
   onbackLogin(){
     this.$emit('onbackLoginFn')
   },
    registerBtn() {
      console.log(this.passwordDataNew,this.passwordData,'this.passwordData');
      
      if (this.passwordDataNew != this.passwordData) {

        this.$customMessage(1, "两次密码不一致")
        return
        
      }
      if ( !this.passwordData) {

        this.$customMessage(1, "密码不能为空")
        return
        
      }
      if (this.tipsStatus == 0) {

        this.$customMessage(1, "请先勾选同意")
        return
        
      }


   Promise.try(async () => {
    console.log("onPasswordCheck11111111");
    
    return await forgetPassword({
      
      newPassword:SHA256(this.passwordData).toString(),
      bizId:this.getBizId
    })
   }).then(res => {
    this.$customMessage(0, "密码重置成功")
    this.$emit("resetPasswordFn")
    console.log(res);
    

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

 }

}
</script>

<style lang="scss" scoped>
/* 设置占位符样式 */
.custom-input::placeholder {
 color: #737373;
 /* 设置占位符颜色 */
 letter-spacing: normal !important;
 /* 确保占位符的间隔正常 */
}

/* 仅针对密码类型的输入框设置字符间距 */
input[type="password"] {
 letter-spacing: 5px;
 /* 设置小圆点的间隔 */
}

input[type="text"] {
 letter-spacing: normal !important;
 /* 设置小圆点的间隔 */
}

.f73 {
 color: #737373;
}

.gate-form {
 ::v-deep .el-form-item__label {
  font-size: 18px;
  color: #333333;
  font-weight: 500;
 }

 ::v-deep .el-input .el-input__inner::placeholder {
  font-size: 16px;
  color: #69798d !important;
 }
}

::v-deep .el-input__inner {
 background: #f5f7fa;
 border: 1px solid #f5f7fa;
 color: #333333;
 font-size: 14px;
}

.icon-style {
 display: inline-block;
 width: 24px;
 height: 24px;
 margin-top: 18px;
 margin-right: 5px;
 cursor: pointer;
}

.el-select {
 width: 105px;
}

::v-deep .el-input-group__prepend {
 background-color: #fff !important;
}

::v-deep .agree-box {
 .el-form-item__content {
  line-height: 20px;
 }
}

.forget-pwd {
 text-align: left;
 font-size: 18px;
 font-weight: 500;
 color: #040a1a;
 cursor: pointer;
 display: flex;

 // align-items: center;
 .agree {
  display: flex;
  flex-wrap: wrap;

  .langPad {
   display: inline-block;
   padding: 0 5px;
  }

  > span {
   color: #90ff00;

  }
 }

 ::v-deep .el-checkbox__inner {
  width: 20px;
  height: 20px;
  margin-right: 10px;
 }

 ::v-deep .el-checkbox__inner::after {
  border: 1px solid #fff;
  border-left: 0;
  border-top: 0;
  left: 8px;
  top: 4px;
 }

 ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner::after {
  transform: rotate(50deg) scaleY(1.3);
 }

 > span {
  color: #90ff00;
 }
}

::v-deep .el-form-item__label {
 font-size: 22px;
 font-weight: 500;
 color: #040a1a;
}

.input-container {
 display: flex;
 border-radius: 4px;
 overflow-y: auto;
 position: relative;
 /* 使子元素绝对定位相对于这个容器 */
 margin-top: 16px;
 /* 上边距 */
 width: 100%;
 /* 容器宽度 */
 background: #252525;
 /* 背景颜色 */
}

.inputLeft {
 width: 100%;
 /* 输入框宽度 */
}

.custom-input {
 width: 100%;
 /* 输入框宽度 */
 height: 57px;
 /* 输入框高度 */
 padding: 5px 12px;
 /* 上右下左内边距 */
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

.mailItem:hover {
 background-color: #252525;
 color: #90FF00;
}

.input-icon {
 position: absolute;
 /* 绝对定位 */
 right: 12px;
 /* 距离右侧的距离 */
 top: 50%;
 /* 垂直居中 */
 transform: translateY(-50%);
 /* 通过平移使其真正居中 */
 color: #90FF00;
 /* 图标颜色 */
 // pointer-events: none; /* 禁用图标的鼠标事件 */
 z-index: 111;
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

.dropdown-item {

 border-radius: 4px;
 // padding: 8px 12px;
 cursor: pointer;
 overflow: hidden;
 // color: #363636;
 color: #737373;
}

.dropdown-item:hover {
 overflow: hidden;
 border-radius: 4px;
 background-color: #252525;
 color: #90ff00;
}

.fade-enter-active,
.fade-leave-active {
 transition: opacity 0.3s;
}

.fade-enter,
.fade-leave-to

 /* .fade-leave-active in <2.1.8 */
{
 opacity: 0;
}

.triangle {
 width: 0;
 height: 0;
 border-left: 4.5px solid transparent;
 border-right: 4.5px solid transparent;
 border-top: 6.5px solid #a8a8a8;
 /* 三角形颜色，朝上 */
 cursor: pointer;
 transition: transform 0.5s;
 /* 动画效果 */
 // margin: 20px; /* 添加一些间距 */
}
</style>