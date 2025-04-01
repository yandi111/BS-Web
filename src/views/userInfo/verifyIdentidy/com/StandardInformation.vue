<!-- 标准身份验证 -->
<template>
   
      <!--标准身份验证 -->
      <div class="flex" style="">
        <div class="left flex"  style="flex-direction:column;">
          <div class="flex" >
            <div style="width: 22px; height: 22px; margin-right: 10px;"> 
                <img v-if="iconImgState2 == 1" style="width: 100%; height: 100%;"  src="@/assets/images/user/icon_01ccc.png" alt=""> 
                <img v-if="iconImgState2 == 2" style="width: 100%; height: 100%;"  src="@/assets/images/user/icon_02b.png" alt=""> 
                <img v-if="iconImgState2 == 3" style="width: 100%; height: 100%;"  src="@/assets/images/user/icon_02.png" alt=""> 
             </div>
            <div class="ff" style=" font-weight: 500; font-size: 16px;">{{$t('lang_2841')}}</div>
          </div>
          <div class="flex jc ic" style=" border-left: 2px solid #525252; margin-left: 10px; padding-bottom: 20px; "  >
            <div class="ff con" style=" margin-top:18px; padding: 20px; margin-left: 20px; font-weight: 500; font-size: 16px; background-color: #1B1B1B;border-radius: 4px;">
  
              <div class="flex ic " style=" margin-bottom: 10px;"> 
                <div style="width:3px; height: 14px; border-radius: 1.5px; background-color: #90FF00;"></div> 
                <div class="ff" style=" font-size: 16px;font-weight: 500; margin-left: 6px;">{{$t('权益')}}</div> 
              </div>
              <div style="height: 104px; background-color: #252525; border-radius: 4px;padding-left: 15px; padding-right: 15px">
                <div class="flex ic jb" style="height: 52px; border-bottom: 1px solid #313131; ">
                  <div style="font-size: 13px; color: #737373;">{{$t('lang_2838')}}</div>
                  <div class="ff" style="font-weight: 500; font-size: 13px;">{{getKycInitList?.[2]?.times}}{{$t('次/每天')}}</div>
                </div>
                <div class="flex ic jb" style="height: 52px; ">
                  <div style="font-size: 13px; color: #737373;">{{$t('lang_2837')}}</div>
                  <div class="ff" style="font-weight: 500; font-size: 13px;">
                    {{  getKycInitList?.[2]?.val == -1 ? $t('lang_2864') : getKycInitList?.[2]?.val }}   <span v-if="getKycInitList?.[2]?.val != -1" >USDT</span>

                  </div>
                </div>
              </div>
  
  
              <div class="flex ic " style=" margin-bottom: 10px;margin-top: 18px;"> 
                <div style="width:3px; height: 14px; border-radius: 1.5px; background-color: #90FF00;"></div> 
                <div class="ff" style=" font-size: 16px;font-weight: 500; margin-left: 6px;">要求</div> 
              </div>
              <div style=" background-color: #252525; border-radius: 4px;padding-left: 15px; padding-right: 15px ;padding-top: 18px; padding-bottom: 20px;">
                <div class="flex ic " style="margin-bottom: 9px;">
                  <div style="font-size: 13px; background-color: #F0F0F0; border-radius: 50%; width: 4px;height: 4px;margin-right: 5px;"></div>
                  <div class="ff" style="font-weight: 500; font-size: 12px;">{{$t('身份信息检查')}}</div>
                </div>
                <div class="flex ic" style="">
                  <div style="font-size: 13px; background-color: #F0F0F0; border-radius: 50%; width: 4px;height: 4px;margin-right: 5px;"></div>
                  <div class="ff" style="font-weight: 500; font-size: 12px;">{{$t('lang_2843')}}</div>
                </div>
            </div>
        <div  v-if="s3State">
            <div v-if="btnState" class="flex jc ic"  style=" font-family: PingFang SC;margin-top: 30px; border-radius: 4px; width: 100%; padding-top: 10px; padding-bottom: 10px; color: #737373; background-color: #363636;">{{$t('lang_2985')}}</div>
            <div v-else
            @click="submitInfo"
            class="flex jc ic"  style=" font-family: PingFang SC;margin-top: 30px; border-radius: 4px; width: 100%; padding-top: 10px; padding-bottom: 10px; color: #000000; background-color: #90FF00;">{{$t('立即认证')}}</div>
        </div>
        </div>
          </div>
        </div>
        <ConfirmAuthentication ref="confirmAuthentication" />
        <UploadIdentityAuthentication  ref="uploadIdentityAuthentication" />


    </div>
  </template>
  
  <script>
  import {  mapGetters} from "vuex";
  import ConfirmAuthentication from "./ConfirmAuthentication.vue";
  import UploadIdentityAuthentication from "./UploadIdentityAuthentication.vue";
  
  export default {
    name: "StandardInformation",
    components: {
        ConfirmAuthentication,
        UploadIdentityAuthentication
    },
    data() {
      return {
       
  
      }
    },
    mounted(){
  
    },
    computed:{
        ...mapGetters(['getKycInitList','getToken','getAuthLevel','getAuditStatus']),
        // <!-- 返回  2级通过 authLevel= 2 && auditStatus = 2或者auditStatus=3  -->

        // 2级按钮
        // eslint-disable-next-line vue/return-in-computed-property
        iconImgState2(){
            if (this.getAuthLevel == 2 && this.getAuditStatus == 2  ) {  // 1cc
                return 1
            } else if (this.getAuthLevel == 3) {  
                return 1
            }
            else if(this.getAuthLevel == 2 && this.getAuditStatus == 1  ){
                return 2                                                                            // icon_02b
            }else{
                return 3
            }
        },
        s3State(){
          if (this.getAuthLevel == 3) {
            return false
          }else if (this.getAuthLevel == 2 && this.getAuditStatus == 2 ) {
            return false
          }else {
            return true
          }
           
        },




        // <!-- 2k按钮  authLevel = 2 &&  auditStatus = 1  待审核  -->
        // eslint-disable-next-line vue/return-in-computed-property
        btnState(){
            if (this.getAuthLevel == 2 && this.getAuditStatus == 1) {
                return true
            }
        },

        // {{ this.getAuthLevel }}---{{this.getAuditStatus }}

        // eslint-disable-next-line vue/return-in-computed-property
        btnStateMask(){    // 一级通过
            if (this.getAuthLevel == 1 && this.getAuditStatus  == 2 ) {
                return true
            }
        }


    },
    methods:{
        submitInfo(){
            if (this.btnStateMask) {
                this.$refs.uploadIdentityAuthentication.openDialog(this.getToken)
            }else {
              this.$refs.confirmAuthentication.openDialog(this.getToken)
            }
        }

    
  
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
  