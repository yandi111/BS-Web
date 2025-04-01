<template>
   <div style="margin-top: 52px;">
      <!-- <div class="">
        <div class="flex jb ic">
          <div style="font-size: 18px;font-weight: 600; color: #F0F0F0;">资金账户</div>
          <div class="flex ic">
            <div style="font-size: 18px;font-weight: 600; color: #F0F0F0;">10.00 USDT</div>
            <div style="color: #737373; font-size: 15pxmargin-left: 8px;">≈0.00 CNY</div>
          </div>
        </div>

      </div> -->

      <!-- {{ userCoinAssetList }} -->

 <div v-for="(item,index) in userCoinAssetList" :key="index">
   <div v-if="iconOpen ==1">
      <div class="" style="margin-top: 52px;">
        <div class="flex jb ic">
          <div class="flex ic">
            <div style="margin-right: 8px; width: 24px; height: 24px;"> <img style="width: 100%; height: 100%;" :src="item.iconUrl" alt=""> </div>
            <div style="font-size: 18px;font-weight: 600; color: #F0F0F0;">
            {{ item.coinName }}
            <!-- iconUrl -->
          </div>
          </div>
          
          <div class="flex ic">
            <div style="font-size: 18px;font-weight: 600; color: #F0F0F0;">{{ item.total }}{{ item.coinName}}</div>
            <div style="color: #737373; font-size: 15px;margin-left: 8px;">≈{{ item.totalUnit}}{{ selectedOption }}</div>
            
            <div 
            @click="toggleRotation(index)" 
             style="margin-left: 4px; width:8px; height: 8px;">
                <div class="triangle" :class="{ rotate: currentIndex === index }"   style="  border-left: 4.95px solid transparent;border-right: 4.95px solid transparent;border-top: 6px solid #a8a8a8;"></div>
            </div>
          </div>
        </div>

      </div>
      <transition name="fade">
      <div v-if="currentIndex === index"  style=" margin-left: 30px; margin-right: 37px; border-bottom: 1px solid #252525; padding-bottom: 30px;">
      <div class="" style="margin-top: 52px;">
        <div class="flex jb ic">
          <div style="font-size: 14px;font-weight: 500; color: #F0F0F0;">{{$t('lang_1098')}}</div>
          <div class="flex ic">
            <div style="font-size: 18px;font-weight: 600; color: #F0F0F0;">{{item.mainBalance }} {{ item.coinName }}</div>
            <div style="color: #737373; font-size: 15px;margin-left: 8px;">≈{{ item.mainBalanceUnit}}{{ selectedOption }}</div>
          </div>
        </div>
      </div>
      <div class="" style="margin-top: 52px;">
        <div class="flex jb ic">
          <div style="font-size: 14px;font-weight: 500; color: #F0F0F0;">{{$t('spot_33')}}</div>
          <div class="flex ic">
            <div style="font-size: 18px;font-weight: 600; color: #F0F0F0;">{{item.ucontractBalance  }} {{ item.coinName }}</div>
            <div style="color: #737373; font-size: 15px;margin-left: 8px;">≈{{ item.ucontractBalanceUnit  }} {{ selectedOption }}</div>
          </div>
        </div>
      </div>

      </div>
    </transition>
  </div>
  <div v-else>
      <div class="" style="margin-top: 52px;">
        <div class="flex jb ic">
          <div class="flex ic">
            <div style="margin-right: 8px; width: 24px; height: 24px;"> <img style="width: 100%; height: 100%;" :src=item.iconUrl alt=""> </div>
            <div style="font-size: 18px;font-weight: 600; color: #F0F0F0;">
            {{ item.coinName }}
            <!-- iconUrl -->
          </div>
          </div>
          
          <div class="flex ic">
            <div style="font-size: 18px;font-weight: 600; color: #F0F0F0;">******{{ item.coinName}}</div>
            <div style="color: #737373; font-size: 15px;margin-left: 8px;">≈******{{ selectedOption }}</div>
            
            <div @click="isRotated = !isRotated" style="margin-left: 4px; width:8px; height: 8px;">
                <div class="triangle" :class="{ rotate: isRotated }" style="  border-left: 4.95px solid transparent;border-right: 4.95px solid transparent;border-top: 6px solid #a8a8a8;"></div>
            </div>
          </div>
        </div>

      </div>
      <transition name="fade">
      <div v-if="isRotated" style=" margin-left: 30px; margin-right: 37px; border-bottom: 1px solid #252525; padding-bottom: 30px;">
      <div class="" style="margin-top: 52px;">
        <div class="flex jb ic">
          <div style="font-size: 14px;font-weight: 500; color: #F0F0F0;">{{$t('lang_2181')}}</div>
          <div class="flex ic">
            <div style="font-size: 18px;font-weight: 600; color: #F0F0F0;">******{{ item.coinName }}</div>
            <div style="color: #737373; font-size: 15px;margin-left: 8px;">≈******{{ selectedOption }}</div>
          </div>
        </div>
      </div>
      <div class="" style="margin-top: 52px;">
        <div class="flex jb ic">
          <div style="font-size: 14px;font-weight: 500; color: #F0F0F0;">{{$t('spot_33')}}</div>
          <div class="flex ic">
            <div style="font-size: 18px;font-weight: 600; color: #F0F0F0;">****** {{ item.coinName }}</div>
            <div style="color: #737373; font-size: 15px;margin-left: 8px;">≈****** {{ selectedOption }}</div>
          </div>
        </div>
      </div>

      </div>
    </transition>
  </div>

  </div>
      
      
      <!-- <div class="" style="padding-top: 28px; ">
        <div class="flex jb ic">
          <div style="font-size: 18px;font-weight: 600; color: #F0F0F0;">现货账户</div>
          <div class="flex ic">
            <div style="font-size: 18px;font-weight: 600; color: #F0F0F0;">10.00 USDT</div>
            <div style="color: #737373; font-size: 15pxmargin-left: 8px;">≈0.00 CNY</div>
          </div>
        </div>

      </div> -->
    </div>
  </template>
  
  <script>
  
  export default {
    props:{
      userCoinAssetList: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      default: "",
    },
    selectedOption: {
      type: String,
      // eslint-disable-next-line vue/require-valid-default-prop
    },
    iconOpen: {
      type: Number,
    },

    },
    name:"CoinList",
    components: {
      
    },
    data() {
      return {
        isRotated: false,

        currentIndex: null, // 用于跟踪当前展开的项的索引
      iconOpenstate: 1, // 控制图标的显示
      selectedOptionstart: 'USD', // 示例选项

      };
    },
    computed: {
   
    },
    methods:{
      toggleRotation(index) {
      // 如果当前项已经展开，则收起它；否则展开它
      this.currentIndex = this.currentIndex === index ? null : index;
    },

    },
    mounted() {
      // this.getUserInfo();
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
  .triangle {
  width: 0;
  height: 0;
  /* 三角形颜色，朝上 */
  cursor: pointer;
  transition: transform 0.5s;
  /* 动画效果 */
  // margin: 20px; /* 添加一些间距 */
}
.rotate {
  transform: rotate(180deg);
  /* 旋转 180 度 */
}
  
  
  </style>
  