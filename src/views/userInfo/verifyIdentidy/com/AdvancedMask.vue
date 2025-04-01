<template>
    <div>
      <!-- <button @click="openDialog">打开对话窗</button>   v-if="isDialogVisible"-->
  
      <transition name="fade">
        <div v-if="isDialogVisible" class="dialog-overlay" @click.self="closeDialog" style="z-index: 1;">
          <div class="dialog-content" style="border: 1px solid #252525 ; z-index: 1;">
            <div
              class="flex jb"
              style="
                border: 1px solid #252525;
                padding-top: 17px;
                padding-bottom: 17px;
                padding-left: 30px;
                padding-right: 17px;
              "
            >
              <div
                class="ff"
                style="
                  margin-right: 370px;
                  font-size: 16px;
                  font-weight: 500;
                  color: #f0f0f0;
                "
              >
                {{$t('请准确填写您的认证信息')}}
              </div>
              <div>
                <button @click="closeDialog" class="close-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                  >
                    <path
                      d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div style="padding: 30px">

                <!-- 居住国家-->
                <div style="">
              <div
                class="ff flex ic"
                style="font-size: 14px; margin-bottom: 9px"
              >
                <div class="flex ic jc" style="color: #ed3c2f">*</div>
                <div>{{$t('居住国家')}}</div>
              </div>

              <div
                class="flex ic jc"
                :style="{
                  border: blurstate
                    ? '1px solid #90FF00'
                    : phoneCheck
                    ? '1px solid #E94826'
                    : '1px solid rgba(0,0,0,0)',
                }"
                style="
                  cursor: pointer;
                  align-items: center;
                  padding-left: 13px;
                  padding-right: 24px;
                  border-radius: 4px;
                  height: 42px;
                  background: #252525;
                  position: relative;
                  color: #f0f0f0;
                "
              >
                <div
                  class="flex ic jb"
                  style="
                    width: 100%;
                    align-items: center;
                    height: 26px;
                    border-radius: 4px;
                    font-size: 12px;
                  "
                  @click="toggleDropdownsh"
                >
                  <div>{{ selectedOptionInfo }}</div>
                  <div
                    style="margin-left: 26px; font-size: 12px"
                    class="triangle"
                    :class="{ rotate: isRotatedInfo }"
                  ></div>
                  <!-- 小三角 -->
                </div>

                <transition name="fade">
                  <!-- v-if="isDropdownVisible"  -->
                  <div v-if="isDropdown" class="dropdown">
                    <div
                      style="
                        overflow-y: scroll;
                        height: 296px;
                        background-color: #141414;
                        scrollbar-color: #3a3b3d #141414; /* 滚动点颜色和轨道颜色 */
                      "
                    >
                      <div
                        style="
                          color: #b3b3b3;
                          font-size: 12px;
                          font-weight: 600;
                          margin-left: 20px;
                          margin-top: 19px;
                          margin-bottom: 10px;
                        "
                      >
                        <!-- @focus="
                              $event.target.style.border = '0.5px solid #90FF00'
                            "
                            @blur="
                              $event.target.style.border =
                                '0.5px solid rgba(0,0,0,0)'
                            " -->
                        <!-- inputFlag -->
                        <div
                          class="flex ic"
                          :style="{
                            border: inputFlag
                              ? '0.5px solid #90FF00'
                              : '0.5px solid #252525',
                          }"
                          style="
                            background-color: #141414;
                            padding-left: 12px;
                            border-radius: 4px;
                            cursor: pointer;
                          "
                        >
                          <div
                            style="width: 18px; height: 18px; margin-right: 5px"
                          >
                            <img
                              v-if="!inputFlag"
                              style="width: 100%; height: 100%"
                              src="@/assets/images/user/search.png"
                              alt=""
                            />
                          </div>
                          <input
                            :placeholder="$t('lang_443')"
                            @focus="inputFlag = true"
                            @blur="inputFlag = false"
                            style="
                              caret-color: #90ff00;

                              width: 100%;
                              height: 42px;
                              background-color: #141414;
                              border-radius: 4px;
                              border: none;
                              color: #f0f0f0;
                              outline: none;
                            "
                            type="text"
                          />
                        </div>
                      </div>

                      <div
                        style="
                          width: 100%;
                          padding-top: 11px;
                          padding-bottom: 11px;
                          padding-left: 20px;
                          padding-right: 20px;
                        "
                        class="dropdown-item flex ic jb"
                        @click="selectOptionCountry(item.name, item.id)"
                        v-for="(item, index) in countryList"
                        :key="index"
                      >
                        <div style="font-size: 12px">{{ item.name }}</div>
                        <div>
                          <span style="font-size: 12px">
                            <!-- +{{ item.code }} -->
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
              <!-- 州/省 -->
              <div class="flex" style="margin-top: 19px">
                <div class="left" style="flex: 1">
                  <div
                    class="ff flex ic"
                    style="font-size: 14px; margin-bottom: 9px"
                  >
                    <div class="flex ic jc" style="color: #ed3c2f">*</div>
                    <div>{{$t('lang_2910')}}</div>
                  </div>
                  <div style="background-color: #252525; border-radius: 4px">
                    <input
                      v-model="province"
                      :placeholder="$t('lang_2911')"
                      @focus="provinceState = 1"
                      @blur="provinceState = 0"
                      :style="{
                        border:provinceState == 0 ? '0.5px solid rgba(0,0,0,0)': provinceState == 1 ?'0.5px solid #90FF00' :'0.5px solid #ED3C2F'
                      }"

                      style="
                        caret-color: #90ff00;
                        padding-left: 12px;
                        width: 100%;
                        height: 42px;
                        background-color: #252525;
                        border-radius: 4px;
                        border: none;
                        color: #f0f0f0;
                        outline: none;
                      "
                      type="text"
                    />
                  </div>
                </div>
                <div class="right" style="flex: 1; margin-left: 10px">
                  <div
                    class="ff flex ic"
                    style="font-size: 14px; margin-bottom: 9px"
                  >
                    <div class="flex ic jc" style="color: #ed3c2f">*</div>
                    <div>{{$t('lang_2916')}}</div>
                  </div>
                  <div style="background-color: #252525; border-radius: 4px">
                    <input
                    v-model="city"
                      :placeholder="$t('请输入城市')"
                      @focus="cityState = 1"
                      @blur="cityState = 0"
                      :style="{
                        border:cityState == 0 ? '0.5px solid rgba(0,0,0,0)': cityState == 1 ?'0.5px solid #90FF00' :'0.5px solid #ED3C2F'
                      }"
                      style="
                        caret-color: #90ff00;
                        padding-left: 12px;
                        width: 100%;
                        height: 42px;
                        background-color: #252525;
                        border-radius: 4px;
                        border: none;
                        color: #f0f0f0;
                        outline: none;
                      "
                      type="text"
                    />
                  </div>
                </div>
              </div>

               <!-- 邮政编码-->
               <div class="flex" style="margin-top: 19px">
                <div class="left" style="flex: 1">
                  <div
                    class="ff flex ic"
                    style="font-size: 14px; margin-bottom: 9px"
                  >
                    <div class="flex ic jc" style="color: #ed3c2f">*</div>
                    <div>{{$t('lang_2914')}}</div>
                  </div>
                  <div style="background-color: #252525; border-radius: 4px">
                    <input
                     v-model="postalCode"
                      placeholder="请输入邮政编码"
                      @focus="postalCodeState = 1"
                      @blur="postalCodeState = 0"
                      :style="{
                        border:postalCodeState == 0 ? '0.5px solid rgba(0,0,0,0)': postalCodeState == 1 ?'0.5px solid #90FF00' :'0.5px solid #ED3C2F'
                      }"
                      style="
                        caret-color: #90ff00;
                        padding-left: 12px;
                        width: 100%;
                        height: 42px;
                        background-color: #252525;
                        border-radius: 4px;
                        border: none;
                        color: #f0f0f0;
                        outline: none;
                      "
                      type="text"
                    />
                  </div>
                </div>
              </div>
               <!-- 详细地址--->
               <div class="flex" style="margin-top: 19px">
                <div class="left" style="flex: 1">
                  <div
                    class="ff flex ic"
                    style="font-size: 14px; margin-bottom: 9px"
                  >
                    <div class="flex ic jc" style="color: #ed3c2f">*</div>
                    <div>详细地址-</div>
                  </div>
                  <div style="background-color: #252525; border-radius: 4px">
                    <input
                     v-model="address"
                      placeholder="请输入详细地址-"
                      @focus="addressState = 1"
                      @blur="addressState = 0"
                      :style="{
                        border:addressState == 0 ? '0.5px solid rgba(0,0,0,0)': addressState == 1 ?'0.5px solid #90FF00' :'0.5px solid #ED3C2F'
                      }"
                      style="
                        caret-color: #90ff00;
                        padding-left: 12px;
                        width: 100%;
                        height: 42px;
                        background-color: #252525;
                        border-radius: 4px;
                        border: none;
                        color: #f0f0f0;
                        outline: none;
                      "
                      type="text"
                    />
                  </div>
                </div>
              </div>



              <!-- **地址认证类型 -->
              <div style=" margin-top: 19px;">
                <div
                  class="ff flex ic"
                  style="font-size: 14px; margin-bottom: 9px"
                >
                  <div class="flex ic jc" style="color: #ed3c2f">*</div>
                  <div>地址认证类型</div>
                </div>
  
                <div
                  class="flex ic jc"
                  
                  :style="{  border:addressAuthTypeState == 0 ? '0.5px solid rgba(0,0,0,0)': '0.5px solid #ED3C2F' }"
                  style="
                    cursor: pointer;
                    align-items: center;
                    padding-left: 13px;
                    border-radius: 4px;
                    height: 42px;
                    background: #252525;
                    position: relative;
                    color: #f0f0f0;
                  "
                >
                  <div
                    class="flex ic jb"
                    style="
                      width: 100%;
                      align-items: center;
                      height: 26px;
                      border-radius: 4px;
                      font-size: 12px;
                    "
                    @click="toggleDropdown"
                  >
                    <div>{{ selectedOption }}</div>
                    <div
                      style="margin-left: 26px; font-size: 12px"
                      class="triangle"
                      :class="{ rotate: isRotated }"
                    ></div>
                    <!-- 小三角 -->
                  </div>
  
                  <transition name="fade">
                    <!-- v-if="isDropdownVisible"  -->
                    <div v-if="isDropdownVisible" class="dropdown">
                      <div
                        style="
                          overflow-y: scroll;
                          height: 296px;
                          background-color: #141414;
                          scrollbar-color: #3a3b3d #141414; /* 滚动点颜色和轨道颜色 */
                          position: absolute;
                          top: 0px;
                          left: 0px;
                        "
                      >
                        <div
                          style="
                            color: #b3b3b3;
                            font-size: 12px;
                            font-weight: 600;
                            margin-left: 20px;
                            margin-top: 19px;
                            margin-bottom: 10px;
                            position: absolute;
                          top: 0px;
                          left: 0px;
                          "
                        >
                          <!-- @focus="
                                $event.target.style.border = '0.5px solid #90FF00'
                              "
                              @blur="
                                $event.target.style.border =
                                  '0.5px solid rgba(0,0,0,0)'
                              " -->
                          <!-- inputFlag -->
                        </div>
  
                        <div
                          style="
                            width: 100%;
                            padding-top: 11px;
                            padding-bottom: 11px;
                            padding-left: 20px;
                            padding-right: 20px;
                          "
                          class="dropdown-item flex ic jb"
                          @click="selectOption(item.name,item.parentId)"
                          v-for="(item, index) in addressTypeList"
                          :key="index"
                        >
                          <div style="font-size: 12px">{{ item.name }}</div>
                          <div>
                            <span style="font-size: 12px">
                              <!-- +{{ item.code }} -->
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </transition>
                </div>
              </div>    
              <!-- 地址证明 -->
              <div class="flex" style="margin-top: 19px">
                <div class="left" style="flex: 1">
                  <div
                    class="ff flex ic"
                    style="font-size: 14px; margin-bottom: 9px"
                  >
                    <div class="flex ic jc" style="color: #ed3c2f">*</div>
                    <div>地址证明</div>
                  </div>

                  <!-- @focus="$event.target.style.border = '0.5px solid #90FF00'"
                      @blur="
                        $event.target.style.border = '0.5px solid rgba(0,0,0,0)'
                      " -->

                <div :style="{
                    border: inputState ? '0.5px solid #90FF00' : '0.5px solid rgba(0,0,0,0)'
                }" class="flex jb ic" style="background-color: #252525; border-radius: 4px">
                  <div style="background-color: #252525; border-radius: 4px;padding-right: 11px; width: 100%;">
                    <input
                     v-model="fileName"
                     readonly 
                      placeholder="请上传地址证明"
                      @blur="inputState = false"
                      style="
                        caret-color: #90ff00;
                        padding-left: 12px;
                        width: 100%;
                        height: 42px;
                        background-color: #252525;
                        border-radius: 4px;
                        border: none;
                        color: #f0f0f0;
                        outline: none;
                      "
                      type="text"
                    />
                  </div>
                  <div @click="uploadData" style="color: #90ff00; width: 35px; cursor: pointer;">上传</div>
                </div>
                </div>
              </div>
              <!-- 按钮 -->
              <div
                class="flex"
                style="
                  margin-top: 44px;
                  margin-bottom: 30px;
                  padding-left: 100px;
                  padding-right: 100px;
                "
              >
                <div
                  @click.self="isDialogVisible = false"
                  class="cancel flex jc ic"
                  style="
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 13px;
                    flex: 1;
                    margin-right: 14px;
                    height: 34px;
                    border-radius: 4px;
                  "
                >
                  取消
                </div>
                <div
                  @click.self="firstLevelCertification"
                  class="submit flex jc ic"
                  style="
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 13px;
                    font-family: PingFang SC;
                    flex: 1;
                    height: 34px;
                    border-radius: 4px;
                  "
                >
                  确定
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </template>
  <script>
  import { mapActions } from "vuex";
  import {  GetCountryList } from "@/api/hy";
  import {getAddressType} from "@/api/user";
  import {onKycLv3Submit} from "@/api/user";

  // import axios from "axios";
  export default {
    name: "AdvancedMask",
    data() {
      return {

        countryNameState:0,
        provinceState:0,
        cityState:0,
        postalCodeState:0,
        addressState:0,
        addressAuthTypeState:0,
        fileNameState:0,





        inputState:false,
        fileName:'',

        countryOfResidence: '',
        countryOfResidenceName: '',
        province: '',
        city: '',
        postalCode: '',
        address: '',
        addressProof: '',
        addressAuthType: '',

        dateState: false,
        value1: "",
        inputFlag: false,
        isRotated: false,
        isRotatedInfo: false,
        isDropdown: false,
  
        blurstate: false,
        phoneCheck: false,
        phoneCheckText: "",
        formData:'',
        selectedOption: "请选择地址认证类型", // 默认选项
        selectedOptionInfo: "请选择居住的国家", // 默认选项
        phoneNumberData: null,
  
        isDropdownVisible: false,
        isDropdownVisibleInfo: false,
        addressTypeList: [
        ],
        countryListInfo: [
          {
            id: 1,
            name: "选择护照",
            code: 53,
          },
          {
            id: 2,
            name: "选择身份证",
            code: 54,
          },
        ],
  
        isDialogVisible: false,
        selectedIndex: 1, // 默认选中第二个盒子
        isSecondSelected: true, // 默认选中第二个盒子
        isSecondSelected2: true, // 默认选中第二个盒子
      };
    },
    compoted: {
        // addressAuthTypeState (){
        //   return  this.selectedOption  ? 0 : 1
        // }
    },
    mounted() {
      this.initGetCountryList()

        this.addressType() 
    },
    methods: {
        ...mapActions(['kycInitDetail']),

        async initGetCountryList() {
      try {
        const res = await GetCountryList()
        this.countryList = res.data
      } catch (e) {
        console.log(e);
      }
    },

 firstLevelCertification() {
      const authVerifyRequestVO = {
        countryOfResidence: this.countryOfResidence,
        countryOfResidenceName: this.countryOfResidenceName,
        province: this.province,
        city: this.city,
        postalCode: this.postalCode,
        address: this.address,
        addressProof: this.addressProof,
        addressAuthType: this.addressAuthType,
      };
      // 非空校验
      if (!this.countryOfResidenceName) {
        this.countryNameState = 2
        this.$customMessage(1, '请输入居住的国家');
      }else
      if (!this.province) {
        this.$customMessage(1, '请输入州/省');
        this.provinceState = 2
      }else
      if (!this.city) {
        this.$customMessage(1, '请输入城市');
        this.cityState = 2
      }else
      if (!this.postalCode) {
        this.$customMessage(1, '请输入邮政编码');
        this.postalCodeState = 2
      }else
      if (!this.address) {
        this.$customMessage(1, '请输入详细地址');
        this.addressState = 2
      }else
      if (!this.addressAuthType) {
        this.$customMessage(1, '请选择地址认证类型');
        this.addressAuthTypeState = 2
      }else
      if (!this.addressProof) {
        this.$customMessage(1, '请上传地址证明');
        this.fileNameState = 2
      }



// import {onKycLv3Submit} from "@/api/user";

Promise.try(() => {
  return onKycLv3Submit(authVerifyRequestVO)
 }).then(res => {
          if (res.code == 200) {
            this.isDialogVisible = false;
            this.kycInitDetail(this.tokenInfo)
          } else {
            this.$customMessage(2, res.msg);
          }
 }).catch((e)=>{
  console.log(e);
  
 })
      // axios
      //   .post("/app/bsex-user/kyc/lv3/submit", authVerifyRequestVO, {
      //     headers: {
      //       "x-language": "zh_CN",
      //       "x-device-id": "", // 设备唯一标识
      //       "x-app-type": "WEB",
      //       "x-app-version": "", // app版本号
      //       "x-app-token": this.tokenInfo, //
      //       "x-device-model": "", //  设备型号
      //     },
      //   })
      //   .then((res) => {
      //     if (res.data.code == 200) {
      //       this.isDialogVisible = false;
      //       this.kycInitDetail(this.tokenInfo)
      //     } else {
      //       this.$customMessage(2, res.data.msg);
      //     }
      //   })
      //   .catch((e) => {
      //     this.$customMessage(2, e);
      //     console.log(e);
      //   });
    },


    addressType() {

     
      Promise.try(() => {
              return getAddressType()
             }).then(res => {
              
              if (res.code === 200) {
                this.addressTypeList = res.data
              } else {
                // 处理错误消息
                this.$customMessage(2, res.msg);
              }
             }).catch((e)=>{
              console.log(e);
              
             })
             
        
    },
    //  获取地址方法
    uploadData() {
      // 创建文件输入元素
      const fileInput = document.createElement('input');
      fileInput.type = 'file';
      fileInput.accept = 'image/*';

      // 监听文件选择事件
      fileInput.onchange = (event) => {
        const file = event.target.files[0]; // 获取用户选择的文件
        if (file) {
          // 使用 URL.createObjectURL() 获取图片的临时 URL
          this.addressProof = URL.createObjectURL(file);
          console.log(this.addressProof ,"this.addressProofthis.addressProof");
          
          
          // 如果需要将文件上传到服务器，可以在这里处理 FormData
          this.fileName = file.name; // 直接获取文件名
          const formData = new FormData();
          formData.append('image', file); // 将文件添加到 FormData
          
          // 这里可以添加上传逻辑，例如发送到服务器
          // this.uploadToServer(formData);
        }
      };

      // 触发文件选择对话框
      fileInput.click();
    },

      formAccountClick() {
        this.$refs.formaccount.openDialog();
      },
  
      phoneInput(event) {
        const inputValue = event.target.value.replace(/\D/g, "");
        if (inputValue.length <= 11) {
          this.phoneNumberData = inputValue;
        } else {
          this.phoneNumberData = inputValue.slice(0, 11);
        }
      },
  
      toggleDropdown() {
        this.isDropdownVisible = !this.isDropdownVisible;
        this.isRotated = !this.isRotated; // 切换旋转状态
      },
      toggleDropdownsh() {
        this.isDropdown = !this.isDropdown;
        this.isRotatedInfo = !this.isRotatedInfo; // 切换旋转状态
      },
  
      selectOption(option,parentId) {
        this.selectedOption = option;
        this.isDropdownVisible = false; // 选择后隐藏下拉框
        this.isRotated = false; // 切换旋转状态
        this.addressAuthType = parentId;
      },
  
      selectOptionCountry(option,parentId) {
        this.selectedOptionInfo = option;
        this.countryOfResidenceName = option;
        this.isDropdown = false; // 选择后隐藏下拉框
        this.isRotated = false; // 切换旋转状态
        this.countryOfResidence = parentId;
      },
      openDialog(token) {
        this.tokenInfo  = token

        this.isDialogVisible = true;
      },
      closeDialog() {
        this.isDialogVisible = false;
      },
    },
  };
  </script>
  
  <style scoped>
  .ff {
    font-weight: 500;
  }
  
  .cof {
    color: #ffffff;
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
    padding-left: 30px;
    padding-right: 30px;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
  }
  
  .dialog-content {
    background-color: #1b1b1b;
    border-radius: 4px;
    position: relative;
    max-width: 90%;
    max-height: 90%;
    overflow: auto;
  }
  
  .close-button {
    position: absolute;
    top: 24px;
    right: 30px;
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
  
  .cancel {
    color: #737373;
    background-color: #252525;
  }
  
  .cancel:hover {
    color: #f0f0f0;
    background-color: #363636;
  }
  
  .submit {
    background-color: #90ff00;
    color: #252525;
  }
  
  .submit:hover {
    color: #737373;
  }
  
  .confirm-button {
    margin-bottom: 15px;
    width: 100%;
    padding-top: 10px;
    padding-bottom: 10px;
    background: #90ff00;
  
    color: #252525;
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
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s;
  }
  
  .fade-enter,
  .fade-leave-to {
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
    border-radius: 4px;
    position: relative;
    cursor: pointer;
    border: 1px solid #737373;
    margin-right: 5px;
    overflow: hidden;
    /* 确保图标不会超出边框 */
  }
  
  .box:last-child {
    margin-right: 0;
  }
  
  .selected {
    border-color: #90ff00;
  }
  
  .textcolor {
    color: #737373;
  }
  
  .selected-icon {
    position: absolute;
    top: 0;
    right: 0;
    height: 30px;
    width: auto;
    /* 保持图片的原始宽高比 */
    object-fit: contain;
    /* 确保图片完全显示 */
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
    color: #90ff00;
    /* 图标颜色 */
    pointer-events: none;
    /* 禁用图标的鼠标事件 */
    z-index: 111;
  }
  
  .rotate {
    transform: rotate(180deg);
    /* 旋转 180 度 */
  }
  
  .dropdown {
    height: 250px;
    border: 0.5px solid #252525;
    width: 100%;
    position: absolute;
    top: 58px;
    left: 0px;
    background-color: #1c1c1c;
    border-radius: 4px;
    margin-top: 1px;
    z-index: 100000000;
    overflow: hidden;
  }
  
  .dropdowns {
    height: 140px;
    border: 0.5px solid #252525;
    width: 100%;
    position: absolute;
    top: 58px;
    left: 0px;
    background-color: #1c1c1c;
    border-radius: 4px;
    margin-top: 1px;
    z-index: 10;
    overflow: hidden;
  }
  
  .dropdown-item {
    border-radius: 4px;
    cursor: pointer;
    overflow: hidden;
    color: #737373;
  }
  
  .dropdown-item:hover {
    overflow: hidden;
    border-radius: 4px;
    background-color: #252525;
    color: #90ff00;
  }
  
  ::v-deep .el-checkbox__input.is-checked .el-checkbox__inner::after {
    transform: rotate(50deg) scaleY(1.3);
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
    margin: 20px;
    /* 添加一些间距 */
  }
  /* 自定义日期选择器样式 */
  .custom-date-picker ::v-deep .el-input {
    background-color: #141414 !important; /* 设置背景色 */
    color: #f0f0f0 !important; /* 设置字体颜色 */
  }
  
  .custom-date-picker ::v-deep .el-input::placeholder {
    color: #f0f0f0 !important; /* 设置占位符颜色 */
  }
  
  .custom-date-picker ::v-deep .el-picker-panel {
    background-color: #141414 !important; /* 设置日期选择面板的背景色 */
    color: #f0f0f0 !important; /* 设置日期选择面板的字体颜色 */
  }
  
  .custom-date-picker ::v-deep .el-picker-panel .cell {
    color: #f0f0f0 !important; /* 设置日期单元格的字体颜色 */
  }
  
  .custom-date-picker ::v-deep .el-picker-panel .cell:hover {
    background-color: #1a1a1a !important; /* 设置悬停时的背景色 */
  }
  </style>
  