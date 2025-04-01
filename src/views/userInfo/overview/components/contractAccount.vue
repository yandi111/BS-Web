<template>
   <div style="margin-top: 52px;">
      <div class="">
        <div style="margin-top: 55px;" v-for="(item,index) in accountList" :key="index" >
       <div v-if="iconOpen == 1" class="flex jb ic" >
          <div style="font-size: 18px;font-weight: 600; color: #F0F0F0;">
            {{ item.accountType === 'MAIN' ? $t('lang_1098') :$t('spot_34') }}
          </div>
          <div class="flex ic">
            <div style="font-size: 18px;font-weight: 600; color: #F0F0F0;">{{ formatNumberWithCommas(item.total)  }}{{selectedOption}}</div>
            <div style="color: #737373; font-size: 15px;margin-left: 8px;">≈{{  formatNumberWithCommas(item.totalLegal) }} CNY</div>
          </div>
        </div>
          
       <div v-else class="flex jb ic">
          <div style="font-size: 18px;font-weight: 600; color: #F0F0F0;">
            {{ item.accountType == 'MAIN' ? $t('lang_1098') :$t('spot_34') }}
          </div>
          <div class="flex ic">
            <div style="font-size: 18px;font-weight: 600; color: #F0F0F0;">******{{selectedOption}}</div>
            <div style="color: #737373; font-size: 15px;margin-left: 8px;">≈******CNY</div>
          </div>
        </div>

        </div>
      </div>

     
    </div>
  </template>
  
  <script>
  
  export default {
    props:{
      accountList: {
      type: Array,
      // eslint-disable-next-line vue/require-valid-default-prop
      required: false,
    },
    selectedOption: {
      type: String,
      // eslint-disable-next-line vue/require-valid-default-prop
      required: false,
    },
    iconOpen: {
      type: Number,
      // eslint-disable-next-line vue/require-valid-default-prop
      required: false,
    },

    },
    name:"ContractAccount",
    components: {
      
    },
    data() {
      return {
        isRotated: false,
      };
    },
    computed: {
   
    },
    methods:{
      formatNumberWithCommas(number) {
    // 非空校验
    if (number === null || number === undefined || isNaN(number)) {
        return ''; // 返回空字符串或您希望的默认值
    }

    // 将数字转换为字符串
    let numStr = number.toString();

    // 分离整数部分和小数部分
    let [integerPart] = numStr.split('.'); // 只取整数部分

    // 使用正则表达式添加千分位
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // 返回格式化后的整数部分
    return integerPart;
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
  