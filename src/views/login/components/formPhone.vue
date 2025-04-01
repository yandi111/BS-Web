<!-- eslint-disable vue/no-parsing-error -->
<template>
 <div style="width: 100%;" v-if="phoneState">

  <div class="flex ic jc"
       :style="{ border: blurstate ? '1px solid #90FF00' : phoneCheck ? '1px solid #E94826' : '1px solid rgba(0,0,0,0)' }"
       style=" cursor: pointer; justify-content: space-between; align-items: center; padding-left: 26px; padding-right: 24px;  border-radius: 4px; height: 57px; background: #252525;position: relative; color: #F0F0F0;">

   <div class="flex ic">
    <div style="display: flex; align-items: center;">
     <div class="flex ic jc" style="align-items: center; height: 26px; border-radius: 4px; font-size: 12px;"
          @click="toggleDropdown"> +{{selectedOption}}
      <div style="margin-left: 26px; font-size: 12px;" class="triangle" :class="{ rotate: isRotated }"></div>
      <!-- 小三角 -->
     </div>

    </div>

    <div class="flex ic">
     <div class="flex ic jc"
          style="margin-top: 2px; margin-right: 15px; width: 2px; height: 20px; line-height: 15px; background-color: #525252; margin-left:27px;">
     </div>

     <div>
      <input v-model="phoneNumberData" maxlength="11" placeholder="请输入手机号码"
             @focus="blurstate = true, phoneCheck = false"
             @blur="$event.target.style.border = 'none', blurstate = false"
             style="color: #F0F0F0; text-align: left;  outline: none;width: 100%; caret-color: #90FF00;margin-right: 4px;border: none; border-radius: 4px; background: #252525;  height: 55px; line-height: 57px;"
             type="text">
     </div>
    </div>
   </div>
   <transition name="fade">
    <div v-if="isDropdownVisible" class="dropdown">
     <div style="overflow-y: scroll; height: 296px;
          background-color: #141414;
          scrollbar-color: #3A3B3D #141414; /* 滚动点颜色和轨道颜色 */">
      <div
       style="color: #B3B3B3; font-size: 12px; font-weight: 600; margin-left: 20px; margin-top: 19px; margin-bottom: 10px;">
       热门国家
      </div>

      <div style=" width: 100%;
         padding-top: 11px; padding-bottom: 11px; padding-left: 20px; padding-right: 20px;
         " class="dropdown-item flex ic jb" @click="selectOption(item.code)
          " v-for="(item, index ) in countryList" :key="index">
       <div style="font-size: 12px;">{{ item.name }}</div>
       <div><span style="font-size: 12px;">+{{ item.code }}</span></div>
      </div>
     </div>
    </div>
   </transition>
  </div>

  <div class="input-container" :style="{ border: eventFlag ? '0.5px solid #90FF00' : '0.5px solid rgba(0,0,0,0)' }">
   <div class="inputLeft" style="height: 57px;">
    <input v-model="passwordData" @input="handleInput" maxlength="20" @focus="eventFocus($event)" @blur="eventFlag = false"
           class="custom-input" placeholder="请输入密码" :type="iconOpen === 1 ? 'password' : 'text'"
           style="color: #F0F0F0;border:none;letter-spacing: 2px;height: 57px;"/>
   </div>

   <div
    style="cursor: pointer;  display: flex; justify-content: end ;align-items: center ; margin-left: 33px; margin-right: 10px; ">
    <div @click.stop="iconClick(1)" v-if="iconOpen === 0" style="cursor: pointer; margin-top: 5px;">
     <img src="@/assets/newg/icon_open.png" alt="打开">
    </div>
    <div @click.stop="iconClick(0)" v-if="iconOpen === 1"
         style="cursor: pointer; width: 20px; height: 20px;margin-top: -1px;">
     <img style="width: 100%; height: 100%;" src="@/assets/newg/icon_close.png" alt="关闭">
    </div>
   </div>
  </div>
  <!-- this.passwordValidation.length < 5   eventFlag  -->


  <div v-if="phoneCheck" class=""
       style=" border-radius: 4px; height: 48px; line-height: 48px; font-size: 16px; color: #E94826; margin-top: 20px; background-color:#30201C; padding-left: 18px;">
   <div class="ff" style="margin-bottom: 10px; font-size: 12px;">{{ phoneCheckText }}</div>
  </div>
  <div style="display: flex; justify-content: center; align-items: center;height: 50px; margin-top: 5px;">
   <div @mousedown="handleMouseDown" @mouseup="handleMouseUp" @click="registerBtn" class="flex jc ic "
        style="width: 400px; font-weight: 500; border-radius: 4px; font-size: 16px; margin-top: 20px; background-color:#90FF00;"
        :style="{ width: msState ? '98%' : '100%', height: msState ? '44px' : '48px', color: msState ? '#5A9212' : '#252525' }">
    <div style="color: #252525; font-weight: 600; font-size: 16px;">登录</div>
   </div>
  </div>
  <div style="display: flex; justify-content: space-between;font-size: 14px; color: #F0F0F0; margin-top: 20px; ">
   <div>尚无账号？<span style="color:#90FF00; cursor: pointer;" @click="$router.push('/register')">去注册?</span>
   </div>
   <div @click="forgetPassWord" style="color:#90FF00; cursor: pointer;">忘记密码</div>
  </div>

  <select-account ref="formaccount"/>
  <!-- this.$refs.formaccount.openDialog()  -->

 </div>
</template>

<script>
import SHA256 from 'crypto-js/sha256';
import {mapGetters, mapMutations, mapActions} from "vuex";
import {getCreateToken, onLogin} from "@/api/user";
import SelectAccount from './selectAccount';
import {GetCountryList  } from "@/api/hy";

export default {
 components: {SelectAccount},
 name: "RegisterEmail",
 data() {

  // 邮箱验证
  const validEmail = (rule, value, callback) => {
   const reg =
    /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
   if (!value) {
    callback(new Error(this.$t("loginRegister.请输入邮箱(提示)")));
   } else {
    if (reg.test(value)) {
     callback();
    } else {
     callback(new Error(this.$t("loginRegister.请输入正确的邮箱")));
    }
   }
  };

  // 密码验证
  const validPwd = (rule, value, callback) => {
   const reg =
    /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*_\-+=`|\\(){}\[\]:;"'<>?,.\/])[^\s\n]{8,15}$/;
   if (!value) {
    callback(new Error(this.$t("loginRegister.请输入密码(提示)")));
   } else {
    if (value.length < 8 || value.length > 15) {
     callback(
      this.$t(
       "loginRegister.密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号"
      )
     );
    } else {
     if (reg.test(value)) {
      callback();
     } else {
      callback(
       new Error(
        this.$t(
         "loginRegister.密码长度为8-15位,且必须包含大写字母、小写字母、数字及特殊符号"
        )
       )
      );
     }
    }
   }
  };
  return {
   bizId: '',
   msState: false,
   phoneCheck: false,
   phoneCheckText: '',
   tgDate: '',
   inviteData: '',
   phoneNumberData: null,
   phoneState: true,
   passwordData: "",
   inviteCode: '',// 邀请码
   telegramId: '',
   accountList: [
    {
     id: 1,
     name: '857229093@qq.com',
     code: '移出'
    },
    {
     id: 2,
     name: '857229093@qq.com',
     code: '移出'
    },

    {
     id: 2,
     name: '857229093@qq.com',
     code: '移出'
    }

   ],
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
   selectedOption: '86', // 默认选项
   isRotated: false,
   isRotatedInfo: false,
   isRotateds: false,
   isDropdownVisible: false,
   isDropdownVisibleInfo: false,
   selectedValue: 0,

   blurstate: false,
   invitesFlag: false,
   eventFlag: false,
   eventFlags: false,
   //邀请码是否禁用
   isDisable: false,
   iconOpen: 1,
   flag: false,
   langVal: '',
   formData: {
    email: "",
    password: "",
    inviteCode: "",
    checked: [],
   },
   rules: {
    email: [{required: true, validator: validEmail, trigger: "change"}],
    password: [{required: true, validator: validPwd, trigger: "change"}],
    checked: [
     {
      required: true,
      message: this.$t("loginRegister.请选择同意"),
      trigger: "change",
     },
    ],
   },
  };
 },
 computed: {
  ...mapGetters(["getCurIndex", "getHomeAccount"]),
  // eslint-disable-next-line vue/return-in-computed-property
  passwordValidation() {
   const validationResults = [];

   // 检查密码长度
   if (this.passwordData.length >= 8 && this.passwordData.length <= 20) {
    validationResults.push(0); // 长度符合条件
   }

   // 检查是否包含大写字母
   if (/[A-Z]/.test(this.passwordData)) {
    validationResults.push(1); // 包含大写字母
   }

   // 检查是否包含小写字母
   if (/[a-z]/.test(this.passwordData)) {
    validationResults.push(2); // 包含小写字母
   }

   // 检查是否包含数字
   if (/\d/.test(this.passwordData)) {
    validationResults.push(3); // 包含数字
   }

   // 检查是否包含特殊符号
   if (/[!@#$%^&*(),.?":{}|<>[\]\\';'`~]/.test(this.passwordData)) {
    validationResults.push(4); // 包含特殊符号
   }

   return validationResults; // 返回校验结果数组
  },


 },
 mounted() {
  this.initGetCountryList()

  this.langVal = this.$i18n.locale
  if (this.$route.query.inviteCode) {
   this.isDisable = true;
   this.formData.inviteCode = this.$route.query.inviteCode;
  }
  let curIndex = this.getCurIndex;
  let homeAccount = this.getHomeAccount;
  this.formData.email = curIndex === 1 && homeAccount ? homeAccount : "";
 },
 methods: {
  ...mapMutations(['setAuthBizEnum', 'setBizId', 'setExpireTime', 'setAuthOptions', 'setMethod', 'setToken']),
  ...mapActions(['fetchUserInfo']),

 

  forgetPassWord() {   // 忘记密码
   this.phoneState = false
   this.$emit('forgetPassWordFn')
  },



  async initGetCountryList() {
   Promise.try(async () => {return await GetCountryList()}).then(res => {
    this.countryList = res.data
   })
  },

  handleMouseDown() {
   this.msState = true

  },
  handleMouseUp() {
   this.msState = false
  },

  iconClick(active) {
   this.iconOpen = active
  },
  handleInput(event) {
   const inputValue = event.target.value;

   this.passwordData = inputValue.length <= 20 ? inputValue : inputValue.slice(0, 20); // 截取前 20 个字符
  },

  async registerBtn() {
   localStorage.setItem('PHONEDATA', this.phoneNumberData)
   let newPhoneNumberData = '+' + this.selectedOption + ' ' + this.phoneNumberData

   let PHONE_REGEX = /^\+\d{1,3} \d{5,15}$/; // 正确的正则表达式
   let isValid = PHONE_REGEX.test(newPhoneNumberData); // 验证电话号码
   if (!isValid) {
    this.phoneCheck = true
    this.phoneCheckText = '电话号码格式错误，请检查'
   } else {
    this.phoneCheck = false
    let newPasswordData = SHA256(this.passwordData).toString();
    const params = {
     username: newPhoneNumberData,
     password: newPasswordData,
     loginType: 'PHONE'
    }

    Promise.try(async () => {
     return await onLogin(params)
    }).then(res => {
     const {authBizEnum, authOptions, bizId} = res.data
     this.bizId = bizId

     if (!authOptions || authOptions.length <= 0) {
      this.registerFn()
     } else {
      this.$parent.phoneState = false
      this.setAuthBizEnum(authBizEnum)
      this.setBizId(bizId)
      this.setAuthOptions(authOptions)
      this.setMethod(authOptions[0].method)
     }
    })
   }
  },

  registerFn() {
   const authVerifyRequestVO = {
    bizId: this.bizId,
   }

   Promise.try(async () => {
    return await getCreateToken(authVerifyRequestVO)
   }).then(res => {
    let expireTime = res.data.expireTime
    this.setExpireTime(expireTime)
    this.fetchUserInfo(res.data.token)
    this.$customMessage(0, "登录成功")
    this.$router.push('/home')
    this.setToken(res.data.token);
   })
  },

  toggleDropdown() {
   this.isDropdownVisible = !this.isDropdownVisible;
   this.isRotated = !this.isRotated; // 切换旋转状态
  },

  selectOption(option) {
   this.selectedOption = option;
   this.isDropdownVisible = false; // 选择后隐藏下拉框
   this.isRotated = false; // 切换旋转状态
   this.selectedValue = option


  },
  selectOptionInfo(option) {
   this.isRotatedInfo = !this.isRotatedInfo
   this.selectedOption = option;
   this.isDropdownVisibleInfo = false; // 选择后隐藏下拉框
   // this.isRotatedInfo = false; // 切换旋转状态
  },

  eventTargetFocus() {
   this.blurstate = true
  },

  eventFocus() {
   this.eventFlag = true
   this.eventFlags = true
  },
 },
};
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
