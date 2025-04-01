<!-- 基本信息 -->
<template>
   <div class="flex" style="margin-top: 43px;"> 
        <div class="left flex"  style="flex-direction:column;">
          <div class="flex" > 
            <div style="width: 22px; height: 22px; margin-right: 10px;"> <img style="width: 100%; height: 100%;"  src="@/assets/images/user/icon_01ccc.png" alt="">  </div>
            <div class="ff" style=" font-weight: 500; font-size: 16px;">{{$t('lang_2979')}}</div>
          </div>
  
          <div class="flex jc ic" style="height: 240px; border-left: 2px solid #525252; margin-left: 10px; "  >
            <div class="ff con" style=" padding: 20px; margin-left: 20px; height: 176px; font-weight: 500; font-size: 16px; background-color: #1B1B1B;border-radius: 4px;">
  
              <div class="flex ic " style=" margin-bottom: 10px;"> 
                <div style="width:3px; height: 14px; border-radius: 1.5px; background-color: #90FF00;"></div> 
                <div class="ff" style=" font-size: 16px;font-weight: 500; margin-left: 6px;">$t('权益')</div> 
              </div>
              <div style="height: 104px; background-color: #252525; border-radius: 4px;padding-left: 15px; padding-right: 15px">
                <div class="flex ic jb" style="height: 52px; border-bottom: 1px solid #313131; ">
                  <div style="font-size: 13px; color: #737373;">{{$t('lang_2838')}}</div>
                  <div class="ff" style="font-weight: 500; font-size: 13px;">{{getKycInitList[1]?.times ? getKycInitList[1]?.times : '' }}{{$t('次/每天')}}</div>
                </div>
                <div class="flex ic jb" style="height: 52px; ">
                  <div style="font-size: 13px; color: #737373;">{{$t('lang_2837')}}</div>
                  <div class="ff" style="font-weight: 500; font-size: 13px;">
                     {{ getKycInitList?.[1]?.val &&  getKycInitList?.[1]?.val == -1 ? $t('lang_2864') : getKycInitList?.[1]?.val }} <span v-if="getKycInitList?.[1]?.val != -1" >USDT</span>
                     </div>
                </div>
              </div>
  
            </div>
          </div>
        </div>
      </div>
  </template>
  
  <script>
  import { mapActions ,mapGetters} from "vuex";
  
  export default {
    name: "BasicInformation",
    components: {
     
    },
    data() {
      return {
  
      }
    },
    mounted(){
        this.kycInitDetail()
    },
    computed:{
        ...mapGetters(['getKycInitList'])
    },
    methods:{
        ...mapActions(['kycInitDetail']),
  
    }
  };
  </script>
  <style lang="scss" scoped>
  .ff {
    color: #F0F0F0;
  }

  .jc {
    justify-content: center;
  }
  .ic {
  
    align-items: center
  }
  .jb {
    justify-content: space-between
  }
  .con {
    width: 640px; 
  }

  </style>
  