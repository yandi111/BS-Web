<!-- eslint-disable vue/no-parsing-error -->
<template>
 <div style="width: 100%;">
  <div v-if="phoneState">
   <div style="position: relative;">
    <input v-model="emailData" @input="emailInput" @focus="$event.target.style.border = '0.5px solid #90FF00'"
           @blur="handleBlur"
           style="width: 100%; height: 57px; padding-bottom: 5px; caret-color: #90FF00;outline: none;font-size: 14px;font-weight: 600;
    color: #F0F0F0;
    border: 0.5px solid rgba(0, 0, 0, 0); border-radius: 4px; background: #252525;  text-align: left; padding-left: 12px;"
           placeholder="请输入邮箱" type="text">
    <transition name="fade">
     <div v-if="emailMaskShow" class="dropdownsh"
          style="position: absolute; top: 60px; left: 0px; width: 100%; z-index: 99999;">
      <div style="
          background-color: #141414;
          scrollbar-color: #3A3B3D #141414; /* 滚动点颜色和轨道颜色 */">

       <div style=" width: 100%;
         padding-top: 11px; padding-bottom: 11px; padding-left: 20px; padding-right: 20px;
         " class="dropdownsh-item flex ic jb mailItem" @mousedown="selectOption(item)
          " v-for="(item, index ) in mailList" :key="index">
        <div><span class="itemNamesh">{{ item.name }}</span>{{ item.mail }}</div>
        <div><span></span></div>
       </div>

      </div>
     </div>
    </transition>

   </div>

   <div class="input-container" :style="{ border: eventFlag ? '0.5px solid #90FF00' : '0.5px solid rgba(0,0,0,0)' }">
    <div class="inputLeft" style="height: 57px;">
     <input v-model="passwordData" maxlength="20" @focus="eventFocus($event)" @blur="eventFlag = false"
            class="custom-input" placeholder="请输入密码" :type="iconOpen === 1 ? 'password' : 'text'"
            style="color: #F0F0F0;border:none;letter-spacing: 2px;height: 57px;"/>
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
    <div>尚无账号？<span style="color:#90FF00; cursor: pointer;" @click="$router.push('/register')">去注册?</span></div>
    <div @click="forgetPassWord" style="color:#90FF00; cursor: pointer;">忘记密码</div>
   </div>
  </div>
 </div>
</template>

<script>
import SHA256 from 'crypto-js/sha256';
import {mapGetters, mapMutations, mapActions} from "vuex";
import {TokenCreate} from '@/api/hy';
import {GetCountryList} from "@/api/hy";
import {onLogin} from "@/api/user";

export default {
 name: "formEmail",
 data() {
  return {
   emailMaskShow: false,
   mailList: [
    {
     id: 1,
     name: '',
     mail: '@gmail.com',
    },
    {
     id: 2,
     name: '',
     mail: '@hotmail.com',
    }
    , {
     name: '',
     id: 3,
     mail: '@outlook.com',
    }
    , {
     name: '',
     id: 4,
     mail: '@icloud.com',
    }
    , {
     name: '',
     id: 5,
     mail: '@naver.com',
    }
    , {
     name: '',
     id: 6,
     mail: '@126.com',
    }
    , {
     name: '',
     id: 7,
     mail: '@yahoo.com',
    }
    , {
     name: '',
     id: 8,
     mail: '@qq.com',
    }
    , {
     name: '',
     id: 9,
     mail: '@163.com',
    }
    , {
     name: '',
     id: 10,
     mail: '@sohu.com',
    }
    , {
     name: '',
     id: 11,
     mail: '@sina.com',
    }

   ],
   emailData: "",
   emailShow: true,
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
   isRotateds: false,
   isDropdownVisible: false,
   selectedValue: 0,

   blurstate: false,
   invitesFlag: false,
   eventFlag: false,
   eventFlags: false,
   emailDataInfo: '',
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

  };
 },
 computed: {
  ...mapGetters(["getCurIndex", "getHomeAccount", 'getUsername']),

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
  ...mapMutations(['setAuthBizEnum', 'setBizId', 'setAuthOptions', 'setMethod', 'setAccountList', 'setToken', 'setExpireTime']),
  ...mapActions(['fetchUserInfo']),

  async initGetCountryList() {
   try {
    const res = await GetCountryList()
    this.countryList = res.data
   } catch (e) {
    console.log(e);
   }
  },

  handleBlur(event) {
   console.log(this.emailMaskShow, "emailMaskShow");
   console.log(222222222, "emailMaskShow11111");

   event.target.style.border = '0.5px solid rgba(0,0,0,0)';
   setTimeout(() => {
    this.emailMaskShow = false;
   }, 100);
  },
  forgetPassWord() {   // 忘记密码
   this.phoneState = false
   this.$emit('forgetPassWordFn')
  },
  emailInput(event) {
   this.emailMaskShow = true
   // this.emailShow = true
   const emailDataLeft = event.target.value.split('@')[0]
   this.emailDataInfo = event.target.value


   this.mailList.map(item => {
    return item.name = emailDataLeft
   })

  },
  selectOption(item) {
   this.emailData = item.name.split('@')[0] + item.mail
   this.emailMaskShow = false

  },
  handleMouseDown() {
   this.msState = true

  },
  handleMouseUp() {
   this.msState = false
   console.log("按钮被松开！", "handleMouseDown222");
  },


  iconClick(active) {
   this.iconOpen = active
  },

  registerBtn() {

   localStorage.setItem('EMAILDATA', this.emailData)

   // 检查 passwordValidation 数组中是否存在 0、1、2、3 或 4
   this.$parent.errorStatu = this.passwordValidation.length < 5;

   this.phoneCheck = false
   let newPasswordData = SHA256(this.passwordData).toString();
   const params = {
    username: this.emailData,
    password: newPasswordData,
    loginType: 'EMAIL'
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
  },

  async registerFn() {
   Promise.try(async () => {
    return await TokenCreate({bizId: this.bizId})
   }).then(res => {
    let expireTime = res.data.expireTime
    this.setExpireTime(expireTime)
    this.fetchUserInfo(res.data.token)
    if (res.data.token) {
     this.$customMessage(0, "登录成功")
     this.$router.push('/home')
     this.setToken(res.data.token);
    }
   })
  },

  accountShowList(res) {
   let timeSum = Date.now() + res.data.data.expireTime;
   let emailList = JSON.parse(localStorage.getItem('EMAI_LIST')) || [];
   let emailItem = {
    account: this.getUsername,
    token: res.data.data.token,
    expireTime: timeSum
   };

   // 查找 emailItem 是否存在于 emailList 中
   const index = emailList.findIndex(item => item.account === emailItem.account);

   if (index !== -1) emailList.splice(index, 1); // 移除该项

   // 将 emailItem 添加到数组的开头
   emailList.unshift(emailItem); // 添加到数组开头

   // 将更新后的 emailList 存储到 localStorage
   let emailListPush = JSON.stringify(emailList);
   localStorage.setItem('EMAI_LIST', emailListPush);
   this.setAccountList(emailListPush);
  },

  toggleDropdown() {
   this.isDropdownVisible = !this.isDropdownVisible;
   this.isRotated = !this.isRotated; // 切换旋转状态
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
