<template>
  <div>
    <div style="font-size: 30px;font-weight: 600; ">{{$t('spot_23')}}</div>
    <div class="flex jb ic" style="width: 100%; background-color: #1B1B1B; padding-left: 20px; margin-top: 48px; padding-right: 15px;">
      <div class="flex ic" style="margin-top: 9px; margin-bottom: 9px;align-items: center">
       <el-avatar :size="64" :src="getUserList.avatar" />
        <div>
          <div style=" width: 100%;   height: 28px; margin-left: 20px; " class="dropdown-item flex ic ">
            <div style="font-size: 20px;font-weight: 600; ">Hi,{{ getUserList.nickname }}</div>

            <div style="display: flex; margin-left: 0px;">
              <!-- $refs.userTipsShow.userTipsClick(item) -->
              <div @click="$refs.setNicknameShow.openDialog()"
                style="cursor: pointer; width: 20px; height: 20px;margin-right: 20px;cursor: pointer;"> <img
                  style="width: 100%; height: 100%;" src="@/assets/userInfo/icon_edit.png" alt=""></div>
              <div style="width: 20px; margin-top: 2px; height: 20px;color: #F0F0F0;"> <img width="100%" height="100%"
                  src="@/assets/side/icon_ edit.png" alt=""></div>
              <div style="margin-left: 1px; font-size: 16px; color: #F0F0F0;font-weight: 400;">
                VIP {{ getUserList.vipLevel }}</div>
            </div>
          </div>

          <div style=" width: 100%;  margin-top: 2px; height: 28px; margin-left: 20px;margin-right: 20px; "
            class="dropdown-item flex ic ">
            <div style="font-size: 16px;font-weight: 400; ">UID: <span id="textToCopy">{{getUserList.uid }}</span></div>

            <div @click="$copyContent(getUserList.uid)" style="display: flex; margin-left: 2px; cursor: pointer;">
              <div style="width: 20px;  margin-top: 1px; height: 20px;color: #F0F0F0"> <img width="100%" height="100%"
                  src="@/assets/side/icon_responsible.png" alt=""></div>
            </div>
          </div>
        </div>
      </div>
      <div  style="font-size: 14px; color: #737373;" >
        {{$t('spot_30')}}{{formatTimestamp(getUserList.createTimeFn)  }}
        <!-- 上次登录:{{ $formatTimesYMDHMS(getUserList.createTimeFn)  }} -->
      </div>
    </div>

    <div class="flex ic" style=" margin-top: 34px; height: 22px;">
      <div style="font-size: 16px;font-weight: 600;  color: #F0F0F0; margin-right: 8px;">{{$t('spot_31')}}
      </div>
      <div style="cursor: pointer;  display: flex; justify-content: end ;align-items: center ; margin-right: 10px; ">
        <div @click.stop="iconClick(0)" v-if="iconOpen == 1" style="cursor: pointer; margin-top: 5px;">
          <img src="@/assets/newg/icon_open.png" alt="打开">
        </div>
        <div @click.stop="iconClick(1)" v-if="iconOpen == 0"
          style="cursor: pointer; width: 20px; height: 20px;margin-top: -1px;">
          <img style="width: 100%; height: 100%;" src="@/assets/newg/icon_close.png" alt="关闭">
        </div>
      </div>
    </div>



    <div class="flex jb ic" style="height:43px;margin-top: 9px; width: 100%; ">
      <div class="flex ic">
        <div v-if="iconOpen == 1"
          style="font-size: 31px;font-weight: 600; color: #F0F0F0; margin-right: 10px;">{{formatNumberWithCommas(totalAsset)   }}
        </div>
        <div v-else
          style="font-size: 31px;font-weight: 600; color: #F0F0F0; margin-right: 10px;">******
        </div>
        <div style="">

          <div v-if="iconOpen == 1" style="position: relative;">

            <div class="flex ic jc  sleact"
              style="  height: 26px; border-radius: 4px; background-color: #252525;font-size: 11px; width: 62px;  "
              @click="toggleDropdown">
              {{ selectedOption }}
              <div style="margin-left: 4px;">
                <div class="triangle" :class="{ rotate: isRotated }" style="  border-left: 4.7px solid transparent;border-right: 4.7px solid transparent;border-top: 6px solid #a8a8a8;"></div>
              </div>
            </div>


            <transition name="fade">
              <div
                style=" position: absolute; background-color: #1C1C1C; width: 62px; padding-top:8px; padding-bottom: 8px; border-radius: 4px;"
                v-if="isDropdownVisible" class="dropdown">
                <div style="height: 32px; font-size: 11px;" v-for="(item, index) in tabList" :key='index'
                  class="dropdown-items flex ic jc" @click="selectOption(item.name, 1)">
                  {{ item.name }}
                </div>
                <!-- <div
         style="  "
          class="dropdown-items flex ic jc"
          @click="selectOption('BTC',2)"
        >
          BTC
        </div> -->
              </div>
            </transition>
          </div>
          <div v-else style="font-weight: 600; font-size: 31px;">{{ selectedOption }}</div>


        </div>
      </div>

      <div class="flex">
        <div class="fc btn1" @click="$router.push('deposit-v2')" style="cursor: pointer; border-radius: 4px; width: 72px; height: 34px; font-size: 13px;font-weight: 600; background-color: #90FF00;">{{$t('lang_73')}}</div>
        <div class="fc btn2"
        @click="$router.push('/withdraw-v2')"
          style="cursor: pointer; border-radius: 4px; width: 72px; height: 34px; font-size: 13px;font-weight: 600; color: #F0F0F0; margin-left: 20px;">
          {{$t('lang_2038')}}</div>
        <div class="fc btn2"
        @click="$router.push('/Transfer-v2')"
          style="cursor: pointer; border-radius: 4px; width: 72px; height: 34px; font-size: 13px;font-weight: 600; color: #F0F0F0; margin-left: 20px;">
          {{$t('lang_2405')}}</div>
      </div>
    </div>

    <div>
      <div v-if="iconOpen == 1" style=" margin-top: 1px;">
        <div style="font-size: 16px;font-weight: 400; height: 22px;color: #B3B3B3;">≈ {{  formatNumberWithCommas(totalLegalAsset)  }}
          CNY</div>
        <div class="flex ic" style="margin-top: 25px;">
          <div style="font-size: 14px; color: #737373;">{{$t('spot_32')}}</div>
          <div style="font-size: 16px; color: #F0F0F0;margin-left: 7px;">{{todayProfitAndLoss}}{{selectedOption}}</div>
          <div style="font-size: 12px; color: #737373;margin-left: 3px;">≈0.00 CNY</div>
          <div class="fc"
            style="margin-left: 12px; font-size: 12px; color:  #0CBB57; width: 60px; height: 30px;background: #13251b;border-radius: 4px;">
            {{todayProfitAndLossRate}}%</div>
        </div>
      </div>
      <div v-else style=" margin-top: 1px;">
        <div style="font-size: 16px;font-weight: 400; height: 22px;color: #B3B3B3;">≈ ******
          CNY</div>
        <div class="flex ic" style="margin-top: 25px;">
          <div style="font-size: 14px; color: #737373;">{{$t('spot_32')}}</div>
          <div style="font-size: 16px; color: #F0F0F0;margin-left: 7px;">******</div>
          <div class="fc"
            style="margin-left: 12px; font-size: 12px; color:  #0CBB57; width: 60px; height: 30px;background: #13251b;border-radius: 4px;">
            ****** %</div>
        </div>
      </div>
    </div>
   
    <div class="flex ic" style="margin-top: 33px;">
       <!-- 账户 -->
      <div class="flex  ic"
        style="cursor: pointer; flex-direction: column;margin-right: 20px; margin-right:15px; height: 31px;">
        <div @click.stop="clickTable(0)" style="font-size: 18px;font-weight: 600;"
          :style="textColor">{{$t('lang_790')}}</div>
        <div v-if="tableStatus == 0" style="width: 18px; height: 2px;"><img src="@/assets/userInfo/Rectangle.png"
            style="width:100%; height: 100%;" alt=""></div>
      </div>
      <!-- 币种 -->
      <div class="flex  ic" style=" cursor: pointer; flex-direction: column;height: 31px;">
        <div @click.stop="clickTable(1)" style="font-size: 18px;font-weight: 600;"
          :style="textColors">{{$t('lang_824')}}</div>
        <div v-if="tableStatus == 1" style="width: 18px; height: 2px;"><img src="@/assets/userInfo/Rectangle.png"
            style="width:100%; height: 100%;" alt=""></div>
      </div>
    </div>
       <!-- 账户 -->
    <div v-if="tableStatus == 0">
      <contract-account :accountList = accountList  :selectedOption = selectedOption  :iconOpen="iconOpen" />
    </div>
       <!-- 币种 -->
    <div v-if="tableStatus == 1"> 
      <CoinList :userCoinAssetList = userCoinAssetList  :selectedOption =selectedOption :iconOpen="iconOpen" /> 
    </div>

    <set-nickname ref="setNicknameShow" />
  </div>


</template>

<script>
import SetNickname from "./setNickname.vue";
import { mapActions } from "vuex";
import ContractAccount from "./contractAccount.vue";
import CoinList from "./CoinList.vue";
import { getToken } from "@/libs/utils"; // 引入获取 token 的工具函数

import {getUserCurrency} from "@/api/user";

export default {
  components: {
    // NameEdit,
    SetNickname,
    ContractAccount,CoinList
  },
  data() {
   return {
      totalAsset :'',totalLegalAsset:'' ,todayProfitAndLoss:'',todayProfitAndLossRate:'' , accountList :[],userCoinAssetList:[],


      tableStatus: 0,
      isEditShow: false,
      userInfo: {},
      iconOpen: 1,
      isDropdownVisible: false,
      selectedOption: 'USDT', // 默认选项
      isRotated: false,
      tabList: [
        {
          name: 'USDT',
          id: 1
        },
        {
          name: 'BTC',
          id: 2
        }
        ,
        {
          name: 'CNY',
          id: 3
        }
      ]
    };
  },
  computed: {
   getUserList() {
    return this.$store.getters['getUserList']
   },

    textColor() {
      return {
        color: this.tableStatus === 0 ? '#90FF00' : '#F0F0F0',
      };
    },
    textColors() {
      return {
        color: this.tableStatus === 1 ? '#90FF00' : '#F0F0F0',
      };
    },
    filteredAccountList() {
        if (Array.isArray(this.getAccountList)) {
            return this.getAccountList
        }else { 
          return JSON.parse(this.getAccountList)
        }
    },
    token (){
      return getToken() ? getToken() : ''
    }
  },

  methods: {
    ...mapActions(['fetchUserInfo']),

    formatTimestamp(timestamp) {
    console.log(typeof timestamp, 'timestamp------------>');

    // 如果时间戳是字符串，尝试将其转换为数字
    if (typeof timestamp === 'string') {
        timestamp = Number(timestamp);
    }

    // 检查时间戳是否为有效数字
    if (typeof timestamp !== 'number' || isNaN(timestamp)) {
        console.error('Invalid timestamp:', timestamp);
        return null; // 或者返回一个默认值
    }

    const date = new Date(timestamp);
    
    // 检查日期是否有效
    if (isNaN(date.getTime())) {
        console.error('Invalid date for timestamp:', timestamp);
        return null; // 或者返回一个默认值
    }

    // 格式化为 YYYY-MM-DD HH:mm:ss
    return date.toISOString().slice(0, 19).replace('T', ' ');
},

    initTotal(unitCoin) {
      Promise.try(async () => {
       return await getUserCurrency({unitCoin: unitCoin, legalCoin:'CNY'})}).then(res => {
       const { totalAsset ,totalLegalAsset ,todayProfitAndLoss,todayProfitAndLossRate , accountList,userCoinAssetList} = res.data

       this.totalAsset =  totalAsset //总资产
       this.totalLegalAsset = totalLegalAsset  // 法币总资产 $formatNumber
       this.todayProfitAndLoss = this.$formatNumber(todayProfitAndLoss)          //今日盈亏
       this.todayProfitAndLossRate = todayProfitAndLossRate  //今日盈亏率(%)
       this.accountList = accountList  //用户账户资产
       this.userCoinAssetList = userCoinAssetList  //用户币种资产
      })
    },

    clickTable(active) {
      this.tableStatus = active
    },

    iconClick(active) {
     this.iconOpen = active/1
    },
    toggleDropdown() {
      this.isDropdownVisible = !this.isDropdownVisible;
      this.isRotated = !this.isRotated; // 切换旋转状态
    },
    // 点击usdt或者 btc
    selectOption(option, type) {
      this.usdtBtcType = true; // 设置状态
      this.selectedOption = option; // 记录选择的选项
      this.isDropdownVisible = false; // 选择后隐藏下拉框
      this.isRotated = false; // 切换旋转状态
      this.selectedValue = type; // 设置选中的值
      this.initTotal(option)
      // 根据选项设置 selectedValue
      if (option === 'USDT') {
        this.selectedValue = 1;
      } else {
        this.selectedValue = 2;
      }
      this.initTotal(option)

      // 获取当前存储的类型
      // this.setSelectedCurrency(option)
      // this.$store.commit('setSelectedCurrency', option); // 更新 Vuex 状态
    },
    formatNumberWithCommas(number) {
    // 非空校验
    if (number === null || number === undefined || isNaN(number)) {
        return ''; // 返回空字符串或您希望的默认值
    }

    // 将数字转换为字符串
    let numStr = number.toString();

    // 分离整数部分和小数部分
    let [integerPart, decimalPart] = numStr.split('.'); // 取整数部分和小数部分

    // 使用正则表达式添加千分位
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 截取小数部分，保留两位
    if (decimalPart) {
        decimalPart = decimalPart.slice(0, 2); // 截取前两位小数
    }

    // 返回格式化后的整数部分和小数部分
    return decimalPart ? `${integerPart}.${decimalPart}` : integerPart; // 如果有小数部分则返回
}
   
  },
  mounted() {
    this.initTotal(this.selectedOption)
    // this.fetchUserInfo();
    // this.getUserInfo();
    if(this.token){
      this.fetchUserInfo(this.$store.getters.getToken);
    }else {
      this.fetchUserInfo();
    }
  },
};
</script>

<style lang="scss" scoped>
.jc {
  justify-content: center;
}

.jb {
  justify-content: space-between;
}

.ic {
  align-items: center;
}

.fc {
  display: flex;
  justify-content: center;
  align-items: center;
}

.btn1 {
  color:#252525
}
.btn1:hover {
  color:#737373
}
.btn2 {
  background-color: #252525;
}
.btn2:hover {
  background-color: #363636;
}
.sleact {
  border: 1px solid #444444,
}

.sleact:hover {
  border: 1px solid #737373,
}

.triangle {
  width: 0;
  height: 0;
  // border-left: 6px solid transparent;
  // border-right: 6px solid transparent;
  // border-top: 8px solid #a8a8a8;
  /* 三角形颜色，朝上 */
  cursor: pointer;
  transition: transform 0.5s;
  /* 动画效果 */
  // margin: 20px; /* 添加一些间距 */
}

.dropdown-items {
  border-radius: 4px;
  // padding: 8px 12px;
  cursor: pointer;
  overflow: hidden;
  color: #FFFFFF;
}

.dropdown-items:hover {
  overflow: hidden;
  border-radius: 4px;
  background-color: #252525;
  color: #90ff00;
}

.rotate {
  transform: rotate(180deg);
  /* 旋转 180 度 */
}

.userinfo {
  height: 100px;
  background-color: #ffffff;
  border-radius: 15px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 30px;

  .info-personal {
    display: flex;
    align-items: center;

    .avatar {
      width: 60px;
      height: 60px;
      margin-right: 20px;
      border-radius: 50%;

      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }

    .info-indr {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 16px;
      color: #333;
      margin-right: 30px;

      .detail {
        .edit {
          font-size: 20px;
          color: #9da8b7;
        }

        .vip {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 90px;
          height: 30px;
          padding: 0 14px;
          background-color: #f5f7fa;
          border-radius: 4px;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          -ms-border-radius: 4px;
          -o-border-radius: 4px;

          img {
            width: 24px;
            margin-right: 10px;
          }
        }

        .dentify {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 60px;
          height: 30px;
          padding: 0 15px;
          color: #fff;
          background-color: #f5f7fa;
          border-radius: 4px;
          -webkit-border-radius: 4px;
          -moz-border-radius: 4px;
          -ms-border-radius: 4px;
          -o-border-radius: 4px;

          &.pass {
            background-color: #90ff00;
          }

          &.fail {
            background-color: #f75f52;
          }
        }
      }
    }
  }

  .info-item {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 14px;
    color: #96a2b2;
    margin-right: 25px;

    div:last-child {
      color: #333;
      margin-top: 5px;
    }
  }

}
</style>
