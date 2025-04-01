<template>
 <div>
  <!-- <button @click="openDialog">打开对话窗</button> -->

  <transition name="fade">
   <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false">
    <div class="dialog-content" style="border:1px solid #252525;width: 380px;">
     <div class="flex jb"
          style="padding-top: 17px; padding-bottom: 10px; padding-left: 17px; padding-right: 17px; border-bottom: 1px solid #252525; ">
      <div class="ff" style="font-size: 16px; color: #F0F0F0; ">切换账号</div>
      <div>
       <button @click="isDialogVisible = false" class="close-button">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
         <path
          d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/>
        </svg>
       </button>
      </div>

     </div>
     <div @click="$router.push('/layout/login')"
          style="color: #90FF00; margin-left: 20px;margin-top: 24px; cursor: pointer;font-size: 12px; ">添加账号
     </div>
     <div class="con " style="padding-top: 10px;padding-left: 17px; padding-right: 17px;">
      <div @click.stop="accountSwitch(item)" v-for="(item,index) in filteredAccountList" :key="index"
           class="flex jb ic filteredAccountList"
           style="font-family: PingFang SC;font-size: 13px;font-weight: 500;  margin-top: 8px; margin-bottom: 10px; cursor: pointer;">
       <div style="height: 22px; line-height: 22px">
        {{ item.account }}
       </div>
       <div class="flex ic jc " style="height: 22px; line-height: 22px;">
        <div v-if="index == 0" class="flex ic jc ">
         <div style="width: 18px; height: 18px;"><img style="width: 100%; height: 100%;"
                                                      src="@/assets/sideUser/Group.png" alt=""></div>
         <div style="margin-left: 6px;font-family: PingFang SC;font-weight: 500;font-size: 14px; color: #F0F0F0;">
          已登录
         </div>
        </div>
        <div v-if="index != 0" class="flex ic jc ">
         <div style="font-size: 12px; color: #737373;font-family: PingFang SC;">
          {{ item.expireTime < Date.now() ? '已失效' : '' }}
         </div>
         <div @click.stop="removeUser(item)"
              style="margin-left: 6px;font-family: PingFang SC;font-weight: 500;font-size: 14px; color: #90FF00; cursor: pointer;">
          移除
         </div>
        </div>
       </div>
      </div>

     </div>
    </div>
   </div>
  </transition>
  <user-tips ref="userTipsShow"/>
 </div>
</template>

<script>
// import { account } from '@/views/contractTransaction/components/ws/accountEnsure';
import UserTips from './userTips.vue';
import {mapActions, mapGetters, mapMutations} from 'vuex';

export default {
 components: {
  UserTips
 },
 name: 'SetuserAccount',
 data() {
  return {
   count: 0,
   isHovered: false,
   isAddHovered: false,
   isDialogVisible: false,
   accountList: []

  }
 },
 computed: {
  ...mapGetters(['getAccountList', 'getToken']),
  // eslint-disable-next-line vue/return-in-computed-property
  filteredAccountList() {
   if (Array.isArray(this.getAccountList)) {
    return this.getAccountList
   } else {
    return JSON.parse(this.getAccountList)
   }
  },
  // eslint-disable-next-line vue/return-in-computed-property
  accountOne() {
   if (Array.isArray(this.getAccountList)) {
    return this.getAccountList[0].account
   } else {
    return JSON.parse(this.getAccountList)[0].account
   }
  },
  nowTime() {
   return Date.now();
  }
 },
 methods: {
  ...mapMutations(['setAccountList', 'setToken']),
  ...mapActions(['fetchUserInfo']),
  removeUser(item) {
   this.$refs.userTipsShow.userTipsClick(item)
  },
  openDialog() {
   this.isDialogVisible = true
  },
  closeDialog() {
   this.isDialogVisible = false
  },
  accountSwitch(item) {
   // 设置 token
   this.setToken(item.token);

   // 更新 filteredAccountList，将选中的账号移动到数组的第一项
   const index = this.filteredAccountList.findIndex(account => account.account === item.account);
   if (index > -1) {
    // 移动选中的账号到数组的第一项
    const selectedAccount = this.filteredAccountList.splice(index, 1)[0]; // 移除选中的账号
    let newAccountList = this.filteredAccountList.unshift(selectedAccount); // 添加到数组开头
    console.log(newAccountList, 'newAccountListnewAccountListnewAccountList');

    // this.setAccountList(JSON.stringify(newAccountList))
    this.setAccountList(this.filteredAccountList)
    // this.$set(this, 'filteredAccountList', [...this.filteredAccountList]);
   }
   // 调用 fetchUserInfo 方法
   this.fetchUserInfo(item.token);
  }
 }

}
</script>

<style scoped>

.ff {
 font-weight: 500;
}

.cof {
 color: #FFFFFF;
}

.jc {
 justify-content: center;
}

.ic {
 align-items: center;
}

.jb {
 justify-content: space-between;
}

.parent-component {
 padding: 20px;
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
 border-radius: 10px;
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

.selected-icon {
 position: absolute;
 top: 0;
 right: 0;
 height: 30px;
 width: auto; /* 保持图片的原始宽高比 */
 object-fit: contain; /* 确保图片完全显示 */
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
 padding-bottom: 20px; /* 为标签腾出空间 */
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