<template>
    <div >
        <transition name="fade"> 
        <div v-if="userInfoShow" class="dropdown" style="padding-right: 15px; background-color: #1B1B1B; position: absolute; right: 0px; top: 56px; z-index: 99999; ">
          <div style=" border-radius: 4px;
          background-color: #1B1B1B;">
    
            <div style=" width: 100%;  margin-top: 20px; height: 28px; margin-left: 20px;margin-right: 20px; " class="dropdown-item flex ic " >
              <div style="font-size: 20px;font-weight: 600; ">Hi,{{ getNickname }}</div>
              
              <div style="display: flex; margin-left: 10px;">
                <div style="width: 20px; margin-top: 2px; height: 20px;color: #F0F0F0"> <img width="100%" height="100%" src="@/assets/side/icon_ edit.png" alt=""></div>
                <div style="margin-left: 1px; font-size: 16px; color: #F0F0F0;font-weight: 400;">VIP {{ getVipLevel }}</div>
              </div>
            </div>

            <div style=" width: 100%;  margin-top: 2px; height: 28px; margin-left: 20px;margin-right: 20px; " class="dropdown-item flex ic " >
              <div style="font-size: 16px;font-weight: 400; ">UID: <span id="textToCopy" >{{ getUid }}</span></div>
        
              <div @click="copyText" style="display: flex; margin-left: 2px; ">
                <div style="width: 20px;  margin-top: 1px; height: 20px;color: #F0F0F0"> <img width="100%" height="100%" src="@/assets/side/icon_responsible.png" alt=""></div>
              </div>
            </div>
            <!-- this.$refs.formaccount.openDialog()  -->
            <div @click="$refs.formaccount.openDialog()" style=" margin-left: 20px;font-weight: 500; margin-right: 20px;margin-top: 12px; height: 28px;border: 1px solid #B3B3B3; border-radius: 4px; " class="dropdown-item flex ic jc" >
              切换账户
            </div>

            <div 
            @mouseenter="hover = true" 
            @mouseleave="hover = false"
            @click="$router.push('/overview');"
            :style="divStyle"
             style="padding-left: 12px; border-radius: 4px; margin-left: 20px;font-weight: 600; margin-right: 20px;margin-top: 12px; height: 51px; font-size: 14px;" class="dropdowns flex ic " >
              <div style="width: 20px; height: 20px; ">
                <img style="width: 100%; height: 100%; "  src="@/assets/sideUser/icon_ funding account.png" alt="">
              </div>
              <div style="margin-left: 11px;">账户总览</div>
            </div>
            
            <div 
            @mouseenter="hover1 = true" 
            @mouseleave="hover1 = false"
            :style="divStyle1"
            style="padding-left: 12px;  border-radius: 4px; margin-left: 20px;font-weight: 600; margin-right: 20px;margin-top: 12px; height: 51px; font-size: 14px;" class="dropdowns flex ic " >
              <div style="width: 20px; height: 20px; ">
                <img style="width: 100%; height: 100%; "  src="@/assets/sideUser/icon_ funding account.png" alt="">
              </div>
              <div style="margin-left: 11px;">资金账户</div>
            </div>
            
            <div 
            @mouseenter="hover2 = true" 
            @mouseleave="hover2 = false"
            :style="divStyle2"
             style="padding-left: 12px;  border-radius: 4px; margin-left: 20px;font-weight: 600; margin-right: 20px;margin-top: 12px; height: 51px; font-size: 14px;" class="dropdowns flex ic " >
              <div style="width: 20px; height: 20px; ">
                <img style="width: 100%; height: 100%; "  src="@/assets/sideUser/icon_ swap account.png" alt="">
              </div>
              <div style="margin-left: 11px;">合约账户</div>
            </div>

            <div 
            @mouseenter="hover3 = true" 
            @mouseleave="hover3 = false"
            :style="divStyle3"
            style="padding-left: 12px;  border-radius: 4px; margin-left: 20px;font-weight: 600; margin-right: 20px;margin-top: 12px; height: 51px; font-size: 14px;" class="dropdowns flex ic " >
              <div style="width: 20px; height: 20px; ">
                <img style="width: 100%; height: 100%; "  src="@/assets/sideUser/icon_ spot account.png" alt="">
              </div>
              <div style="margin-left: 11px;">现货账户</div>
            </div>

            <div 
            @mouseenter="hover4 = true" 
            @mouseleave="hover4 = false"
            :style="divStyle4"
            style="padding-left: 12px;  border-radius: 4px; margin-left: 20px;font-weight: 600; margin-right: 20px;margin-top: 12px; height: 59px; font-size: 14px;" class="dropdowns flex ic " >
              <div style="width: 20px; height: 20px; ">
                <img style="width: 100%; height: 100%; "  src="@/assets/sideUser/icon_ tdentity verification.png" alt="">
              </div>
              <div style="margin-left: 11px;">身份认证</div>
            </div>

            <div 
            @mouseenter="setUserEnter" 
            @mouseleave="setUserLeave"
             style="position: relative;">
             <transition name="fade">
              <div v-if="setUserInfo" style="position: absolute; top: 0; left: -258px; border-radius: 4px; background-color: #1B1B1B ; padding-right: 119px;">
                <div 
            :style="divStyle6"
            style="padding-left: 12px; border-radius: 4px; margin-left: 20px;font-weight: 600; margin-right: 20px; height: 51px; font-size: 14px;" class="dropdowns flex ic " >
              <div style="width: 20px; height: 20px; ">
                <img style="width: 100%; height: 100%" src="@/assets/sideUser/icon_security settings.png" alt="">
              </div>
              <div style="margin-left: 11px;">安全设置</div>
            </div>
              </div>
              </transition>

            <div
            

            :style="divStyle5"
             style="padding-left: 12px;  border-radius: 4px; margin-left: 20px;font-weight: 600; margin-right: 20px;margin-top: 12px; height: 51px; font-size: 14px;" class="dropdowns flex ic " >
              <div style="width: 20px; height: 20px; ">
                <img style="width: 100%; height: 100%; "  src="@/assets/sideUser/icon_account settings.png" alt="">
              </div>
              <div style="margin-left: 11px;">账户设置</div>
              
             </div>
              
            </div>

            <div 
            @mouseenter="hover6 = true" 
            @mouseleave="hover6 = false"
            :style="divStyle6"
            style="padding-left: 12px; margin-bottom: 20px;  border-radius: 4px; margin-left: 20px;font-weight: 600; margin-right: 20px;margin-top: 12px; height: 51px; font-size: 14px;" class="dropdowns flex ic " >
              <div style="width: 20px; height: 20px; ">
                <img style="width: 100%; height: 100%; "  src="@/assets/sideUser/icon_ log out.png" alt="">
              </div>
              <div style="margin-left: 11px;">退出登录</div>
            </div>
          </div>
        </div>
      </transition>  
    </div>
  </template>
  
  <script>
  import { mapMutations,mapGetters } from 'vuex';
  export default {
    name: 'HanderMaskList',
    data() {
      return {
        newNickname:'',
      userInfoShow:false,
      uid:'123456',
      setUserInfo:false,
      hover: false,
      hover1: false,
      hover2: false,
      hover3: false,
      hover4: false,
      hover5: false,
      hover6: false,
      copySuccess: false, // 复制成功的状态
      

      }
    },
    computed: {
    ...mapGetters([
      "getHeaderActiveIndex",
      "userInfo",
      "getTheme",
      "getUnreadNum",
      "getUid",
      "getNickname",
      "getAvatar",
      "getVipLevel"
    ]),
   

    divStyle() {
      return {
        backgroundColor: this.hover ? '#252525' : '', // 根据 hover 状态设
        transition: 'background-color 0.3s', // 添加过渡效果
      };
    },
    divStyle1() {
      return {
        backgroundColor: this.hover1 ? '#252525' : '', // 根据 hover 状态设
        transition: 'background-color 0.3s', // 添加过渡效果
      };
    },
    divStyle2() {
      return {
        backgroundColor: this.hover2 ? '#252525' : '', // 根据 hover 状态设
        transition: 'background-color 0.3s', // 添加过渡效果
      };
    },
    divStyle3() {
      return {
        backgroundColor: this.hover3 ? '#252525' : '', // 根据 hover 状态设
        transition: 'background-color 0.3s', // 添加过渡效果
      };
    },
    divStyle4() {
      return {
        backgroundColor: this.hover4 ? '#252525' : '', // 根据 hover 状态设
        transition: 'background-color 0.3s', // 添加过渡效果
      };
    },
    divStyle5() {
      return {
        backgroundColor: this.hover5 ? '#252525' : '', // 根据 hover 状态设
        transition: 'background-color 0.3s', // 添加过渡效果
      };
    },
    divStyle6() {
      return {
        backgroundColor: this.hover6 ? '#252525' : '', // 根据 hover 状态设
        transition: 'background-color 0.3s', // 添加过渡效果
      };
    },
  },
  watch: {
    getNickname(newName){
     this.newNickname = newName
    },
    searchVal: {
      handler(value) {
        if (value) {
          this.searchBoxChoose_isShow = true;
          this.searchBoxHover_isShow = false;
        } else {
          this.searchBoxChoose_isShow = false;
          this.searchBoxHover_isShow = true;
        }
      },
    },
  },
    methods: {
      ...mapMutations([]),
      async copyText() {
      try {
        await navigator.clipboard.writeText(this.getUid); // 使用 Clipboard API 复制 UID
        // alert('UID 复制成功: ' + this.uid); // 可选：显示复制成功的提示
        this.$customMessage(0,"复制成功")
      } catch (err) {
        console.error('复制失败:', err); // 处理错误
      }
      // this.$copyText(text).then(() => {
      //   this.$message.success("复制成功");
      // });
    },
    setHover(value) {
      this.setHoverValue(value); // 调用 mutation 更新状态
    },
       
     
     
    }
    
  }
  </script>
  
  <style lang="scss">
  .handleWalletCommand {
   font-size: 14px;
  }
  .fs {
    font-size: 14px;
  }
  .cust-pover {
    background: var(--trade-lever-btn-gb);
    .more-container .notice-count {
      background: var(--trade-lever-InputUnitActive-bg);
    }
    .more,
    .text {
      color: var(--trade-text-color) !important;
    }
    .notice-list {
      li {
        .title {
          color: var(--main-text-color) !important;
        }
        &:hover {
          background: var(--select-hover) !important;
        }
        &:focus {
          background: var(--select-hover) !important;
        }
      }
    }
    .clear {
      color: #90ff00 !important;
    }
  }
  .cust-pover1 {
    background-color: #ffffff;
    .more,
    .text {
      color: #333 !important;
    }
  }
  .more-notice {
    position: relative;
    .unread {
      position: absolute;
      right: -6px;
      top: -3px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #f75f52;
    }
  }
  .wallet-coin {
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
    
    .wallet-item {
      font-size: 14px;
      color: var(--trade-text-color) !important;
      line-height: 22px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      padding: 5px 20px;
      border-radius: 4px;
      &:hover {
        background: var(--select-hover) !important;
      }
      img {
        width: 36px;
        height: 36px;
      }
      .icon-svg {
        padding-bottom: 5px;
      }
    }
  }
  .dropdown-nohover {
    min-height: 185px;
  }
  
  .dropdown-nohover:hover {
    background-color: transparent !important;
  }
  .valuation-box {
    position: relative;
    min-width: 260px;
    height: 86px;
    border-radius: 4px;
    padding: 10px;
    font-size: 14px;
    color: var(--trade-text-color) !important;
    &:hover {
      background: var(--select-hover) !important;
    }
    .v-top {
      line-height: 20px;
      .eye {
        width: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: middle;
        margin-left: 10px;
      }
      .coin-name {
        display: inline-block;
        margin: 0 10px;
      }
    }
    .v-pad {
      margin: 2px 0px;
    }
    .cion-box {
      position: absolute;
      left: 80px;
      top: 60px;
      width: 80px;
      height: 120px;
      background-color: var(--select-bg) !important;
      box-shadow: 0px 0px 4px 0px rgba(229, 232, 245, 0.5);
      border-radius: 4px;
      z-index: 999;
      padding: 10px 0px;
      overflow-y: scroll;
      .cion-item {
        line-height: 24px;
        font-size: 12px;
        padding: 0 10px;
        color: var(--trade-text-color) !important;
        &:hover {
          background: var(--select-hover) !important;
        }
      }
    }
    .dropdown {
    height: 296px;
    border: 0.5px solid #252525;
    width: 272px;
    position: absolute;
    top: 58px;
    left: 0px;
    // background-color: #1C1C1C;
    border-radius: 4px;
    margin-top: 1px;
    z-index: 10;
    overflow: hidden;
  }
  
  
  .dropdown-item {
  
    border-radius: 4px;
    cursor: pointer;
  }
  
  .dropdowns:hover {
    background-color:#252525 !important;
  }
  
  .dropdown-item:hover {
    border-radius: 4px;
    background-color: #252525;
  }
  }
  </style>