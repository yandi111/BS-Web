<!-- 进阶身份认证 -->
<template>
   
   <div class="flex" style="">
      <div class="left flex"  style="flex-direction:column;">
        <div class="flex" > 
          <div style="width: 22px; height: 22px; margin-right: 10px;">
            <img v-if="s3StatebtnIn == 1 " style="width: 100%; height: 100%;"  src="@/assets/images/user/icon_03b.png" alt=""> 
            <div v-else>
              <img v-if="s3StatebtnIn == 2" style="width: 100%; height: 100%;"  src="@/assets/images/user/icon_01ccc.png" alt=""> 
             <img v-if="s3StatebtnIn == 3" style="width: 100%; height: 100%;"  src="@/assets/images/user/icon_03.png" alt="">   
            </div>
             </div>
          <div class="ff" style=" font-weight: 500; font-size: 16px;">{{$t('lang_2845')}}</div>
        </div>
<!-- {{ getAuthLevel }} -->
        <div v-if="s3State" class="flex jc ic" style="margin-left: 10px; "  >
          <div class="ff con" style=" margin-top:18px; padding: 20px; margin-left: 20px; font-weight: 500; font-size: 16px; background-color: #1B1B1B;border-radius: 4px;">

            <div class="flex ic " style=" margin-bottom: 10px;"> 
              <div style="width:3px; height: 14px; border-radius: 1.5px; background-color: #90FF00;"></div> 
              <div class="ff" style=" font-size: 16px;font-weight: 500; margin-left: 6px;">{{$t('权益')}}</div> 
            </div>
            <div style="height: 104px; background-color: #252525; border-radius: 4px;padding-left: 15px; padding-right: 15px">
              <div class="flex ic jb" style="height: 52px; border-bottom: 1px solid #313131; ">
                <div style="font-size: 13px; color: #737373;">{{$t('lang_2838')}}</div>
                <div class="ff" style="font-weight: 500; font-size: 13px;">{{getKycInitList?.[3]?.times}}{{$t('次/每天')}}</div>
              </div>
              <div class="flex ic jb" style="height: 52px; ">
                <div style="font-size: 13px; color: #737373;">{{$t('lang_2837')}}</div>
                <div class="ff" style="font-weight: 500; font-size: 13px;">
                  {{  getKycInitList?.[3]?.val == -1 ? $t('无限制提币额度') : getKycInitList?.[3]?.val }}  
                   <span v-if="getKycInitList?.[3]?.val != -1" >USDT</span>

                </div>
              </div>
            </div>


            <div class="flex ic " style=" margin-bottom: 10px;margin-top: 18px;"> 
              <div style="width:3px; height: 14px; border-radius: 1.5px; background-color: #90FF00;"></div> 
              <div class="ff" style=" font-size: 16px;font-weight: 500; margin-left: 6px;">{{$t('要求')}}</div> 
            </div>
            <div style=" background-color: #252525; border-radius: 4px;padding-left: 15px; padding-right: 15px ;padding-top: 18px; padding-bottom: 20px;">
              <div class="flex ic " style="">
                <div style="font-size: 13px; background-color: #F0F0F0; border-radius: 50%; width: 4px;height: 4px;margin-right: 5px;"></div>
                <div class="ff" style="font-weight: 500; font-size: 12px;">{{$t('lang_2847')}}</div>
              </div>
            </div>
        <div v-if="btnState != 2">
          <div v-if="btnState == 1" class="flex jc ic"  style="margin-top: 30px; border-radius: 4px; width: 100%; padding-top: 10px; padding-bottom: 10px; color: #737373; background-color: #363636;">{{$t('lang_2479')}}</div>
          <div v-else @click="$refs.advancedMask.openDialog(getToken)" class="flex jc ic"  style="margin-top: 30px; border-radius: 4px; width: 100%; padding-top: 10px; padding-bottom: 10px; color: #000000; background-color: #90FF00;">{{$t('立即认证')}}</div>
        </div>
          </div>
        </div>
      </div>

      <AdvancedMask ref="advancedMask" />
    </div>

      
  </template>
  
  <script>
  import { mapActions,mapGetters } from "vuex";
  import AdvancedMask from "./AdvancedMask.vue";
  
  export default {
    name: "AdvancedIdentity",
    components: {
      AdvancedMask
      
    },
    data() {
      return {
  
      }
    },
    computed:{
        ...mapGetters(['getKycInitList','getToken','getAuthLevel','getAuditStatus']),

        // eslint-disable-next-line vue/return-in-computed-property 
        btnState(){
          if (this.getAuthLevel == 3 && this.getAuditStatus == 1) {   // 1-待审核
            return 1
          }
          if (this.getAuthLevel == 3 && this.getAuditStatus == 2) { // 2-通过
            return 2
          }
          
        },

        s3State(){
          if (this.getAuthLevel == 3) {
            return true
          }else if (this.getAuthLevel == 2 && this.getAuditStatus == 2  ) {
            return true
          }else {
            return false
          }
           
        },


        // eslint-disable-next-line vue/return-in-computed-property
        s3Statebtn(){
          // 未认证  或者 已拒绝
          if ( this.getAuthLevel == 2 && this.getAuditStatus == 2 || this.getAuthLevel == 3 && this.getAuditStatus == 3 || this.getAuthLevel == null || this.getAuditStatus == null) {  
            return 1
          }else if (this.getAuthLevel == 3 && this.getAuditStatus == 1  ) { //  待审核
            return 2
          }else {   // 已通过
            return 3
          }
        },


        
        // eslint-disable-next-line vue/return-in-computed-property
        s3StatebtnIn(){
          if ( this.getAuthLevel == 1 && this.getAuditStatus == 2 || this.getAuthLevel == 2 && this.getAuditStatus == 1  || this.getAuthLevel == 3 && this.getAuditStatus == 1 || this.getAuthLevel == null || this.getAuditStatus == null) {     //2已通过
            return 1
          } else if(this.getAuthLevel == 3 && this.getAuditStatus == 2 ){
            return 2
          }else if (this.getAuthLevel == 2 && this.getAuditStatus == 2 || this.getAuthLevel == 3 && this.getAuditStatus == 3  ) {
            return 3         // 驳回 和 立即认证
          }else
          {   // 已通过
            return 4
          }


        }
       



    },
    mounted(){
  
    },
    methods:{
  
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
  