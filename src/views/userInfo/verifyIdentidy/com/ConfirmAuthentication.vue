<template>
  <div>
    <!-- <button @click="openDialog">打开对话窗</button>   v-if="isDialogVisible"-->

    <transition name="fade">
      <div
        v-if="isDialogVisible"
        class="dialog-overlay"
        @click.self="closeDialog"
      >
        <div class="dialog-content" style="border: 1px solid #252525">
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
            <!-- *国家 -->
            <div style="">
              <div
                class="ff flex ic"
                style="font-size: 14px; margin-bottom: 9px"
              >
                <div class="flex ic jc" style="color: #ed3c2f">*</div>
                <div>{{$t('lang_2524')}}</div>
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
                    style="margin-left: 13px; font-size: 12px"
                    class="triangle"
                    :class="{ rotate: isRotated }"
                  ></div>
                  <!-- 小三角 -->
                </div>

                <transition name="fade">
                  <!-- v-if="isDropdownVisible"  -->
                  <div v-if="isDropdownVisible" class="dropdown" style="background-color: #141414;">
                   
                      <div
                        style="
                           color: #B3B3B3;
                          font-size: 12px;
                          font-weight: 600;
                          margin-left: 20px;
                          margin-top: 19px;
                          margin-bottom: 10px;
                          padding-right: 15px;
                        "
                      >
                      
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
                            placeholder="搜索"
                            @focus="inputFlag = true"
                            @blur="inputFlag = false"
                            @input="searchCountry"
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
                        overflow-y: scroll;
                        height: 296px;
                        background-color: #141414;
                        scrollbar-color: #3a3b3d #141414; /* 滚动点颜色和轨道颜色 */
                        color: #B3B3B3;
                      "
                    >
                      <div
                        style="
                          width: 100%;
                          padding-top: 13px;
                          padding-bottom: 13px;
                          padding-left: 20px;
                          padding-right: 20px;
                          color: #B3B3B3;
                        "
                        class="dropdown-item flex ic jb "
                        @click="selectOption(item.name, item.id)"
                        v-for="(item, index) in countryList"
                        :key="index"
                      >
                        <div  class="hoverItem" style="font-size: 12px; ">{{ item.name }}</div>
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
            <!-- *证件类型 -->
            <div style="margin-top: 19px">
              <div
                class="ff flex ic"
                style="font-size: 14px; margin-bottom: 9px"
              >
                <div class="flex ic jc" style="color: #ed3c2f">*</div>
                <div>{{$t('lang_2773')}}</div>
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
                    style="margin-left: 13px; font-size: 12px"
                    class="triangle"
                    :class="{ rotate: isRotated }"
                  ></div>
                  <!-- 小三角 -->
                </div>

                <transition name="fade">
                  <!-- v-if="isDropdownVisible"  -->
                  <div v-if="isDropdown" class="dropdowns">
                    <div
                      style="
                        height: 100%;
                        background-color: #141414;
                        scrollbar-color: #3a3b3d #141414; /* 滚动点颜色和轨道颜色 */
                      "
                    >
                     
                      <div
                        style="
                          width: 100%;
                          padding-top: 11px;
                          padding-bottom: 11px;
                          padding-left: 20px;
                          padding-right: 20px;
                        "
                        class="dropdown-item flex ic jb"
                        @click="selectOptionInfo(item.name, item.id)"
                        v-for="(item, index) in countryListInfo"
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
            <!-- *姓氏  *名字 -->

            <div class="flex" style="margin-top: 19px">
              <div class="left" style="flex: 1">
                <div
                  class="ff flex ic"
                  style="font-size: 14px; margin-bottom: 9px"
                >
                  <div class="flex ic jc" style="color: #ed3c2f">*</div>
                  <div>{{$t('lang_2718')}}</div>
                </div>
                <div style="background-color: #252525; border-radius: 4px">
                  <input
                    v-model="surnameData"
                    :placeholder="$t('lang_2597')"
                    @focus="$event.target.style.border = '0.5px solid #90FF00'"
                    @blur="
                      $event.target.style.border = '0.5px solid rgba(0,0,0,0)'
                    "
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
                  <div>名字</div>
                </div>
                <div style="background-color: #252525; border-radius: 4px">
                  <input
                    v-model="nameData"
                    :placeholder="$t('请输入名字')"
                    @focus="$event.target.style.border = '0.5px solid #90FF00'"
                    @blur="
                      $event.target.style.border = '0.5px solid rgba(0,0,0,0)'
                    "
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

            <!-- 生日-->
            <div style="margin-top: 19px">
              <div
                class="ff flex ic"
                style="font-size: 14px; margin-bottom: 9px"
              >
                <div class="flex ic jc" style="color: #ed3c2f">*</div>
                <div>{{$t('生日')}}</div>
              </div>

              <!-- <div
                @click="dateState"
                class="right flex ic"
                style="
                  cursor: pointer;
                  padding-top: 11px;
                  padding-bottom: 11px;
                  border-radius: 4px;
                  margin-top: 8px;
                  width: 100%;
                  padding-left: 10px;
                  background-color: #252525;
                "
              >
                <div style="width: 20px; height: 20px">
                  <img
                    style="width: 100%; height: 100%"
                    src="@/assets/images/user/icon_cale.png"
                    alt=""
                  />
                </div>
                <div
                  style="
                    margin-left: 7px;
                    color: #737373;
                    font-size: 14px;
                    font-weight: 500;
                  "
                >
                  请选择
                </div>
              </div> -->

              <div class="dateStyle" style="background-color: #141414">
                <el-date-picker
                  v-model="value1"
                  type="date"
                  :placeholder="$t('选择日期')"
                  locale="zh-CN"
                  format="yyyy-MM-dd"
                  value-format="yyyy-MM-dd"
                  class="custom-date-picker"
                  ref="elDatePicker"
                  @change="handleDateChange"
                  :editable="false"
                  style=" height: 42px !important; font-size: 14px;"

                >
                </el-date-picker>
              </div>
            </div>
            <!-- 证件号 -->
            <div class="flex" style="margin-top: 19px">
              <div class="left" style="flex: 1">
                <div
                  class="ff flex ic"
                  style="font-size: 14px; margin-bottom: 9px"
                >
                  <div class="flex ic jc" style="color: #ed3c2f">*</div>
                  <div>{{$t('证件号')}}</div>
                </div>
                <div style="background-color: #252525; border-radius: 4px">
                  <input
                    v-model="idNumber"
                    :placeholder="$t('lang_287')"
                    @focus="$event.target.style.border = '0.5px solid #90FF00'"
                    @blur="
                      $event.target.style.border = '0.5px solid rgba(0,0,0,0)'
                    "
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
                   oninput="this.value = this.value.replace(/[^0-9]/g, '');"
                  />
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
                  font-family: PingFang SC;
                  flex: 1;
                  margin-right: 14px;
                  height: 34px;
                  border-radius: 4px;
                "
              >
                {{$t('lang_333')}}
              </div>
              <div
                @click="firstLevelCertification()  "
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
                {{$t('lang_345')}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
    <UploadIdentityAuthentication ref="uploadIdentityAuthentication" />
  </div>
</template>
<script>
// import { mapGetters } from "vuex";
// import axios from "axios";
import UploadIdentityAuthentication from "./UploadIdentityAuthentication.vue";
import {  mapActions} from "vuex";
import {  GetCountryList } from "@/api/hy";

import {onKycLv1Submit} from "@/api/user";

export default {
  name: "mobileCode",
  components: {
    UploadIdentityAuthentication,
  },
  data() {
    return {
      tokenInfo: "",
      isDatePickerVisible: false,

      type: null,
      realName: "",
      birthday: "",
      countryName: "",
      countryId: "",
      idNumber: "",
      surnameData: "",
      nameData: "",
      value1: "",
      inputFlag: false,
      isRotated: false,
      isRotatedInfo: false,
      isDropdown: false,

      blurstate: false,
      phoneCheck: false,
      phoneCheckText: "",
      selectedOption: "请选择国家", // 默认选项
      selectedOptionInfo: "请选择证件类型", // 默认选项
      phoneNumberData: null,

      isDropdownVisible: false,
      isDropdownVisibleInfo: false,
      countryList: [
        {
          id: 1,
          name: "中国",
          code: 53,
        },
        {
          id: 2,
          name: "中国香港",
          code: 54,
        },

        {
          id: 2,
          name: "中国香",
          code: 55,
        },
      ],
      countryListInfo: [
        {
          id: 2,
          name: "选择护照",
          code: 53,
        },
        {
          id: 1,
          name: "选择身份证",
          code: 54,
        },
      ],
      countryListState:[],
      Listinfo:[],

      phoneEmail: "",
      isDialogVisible: false,
      selectedIndex: 1, // 默认选中第二个盒子
      isSecondSelected: true, // 默认选中第二个盒子
      isSecondSelected2: true, // 默认选中第二个盒子
    };
  },
  compoted: {
    // ...mapGetters(['getToken'])
  },
  mounted() {

    this.initGetCountryList()
  },
  methods: {
    ...mapActions(['kycInitDetail']),


    async initGetCountryList() {
      try {
        const res = await GetCountryList()
        this.countryList = res.data
        this.Listinfo = res.data
        this.countryListState = res.data
      } catch (e) {
        console.log(e);
      }
    },


    searchCountry(event){
      const query = event.target.value; 
      this.countryList = this.earchCountries(query)
      console.log(this.countryListDetail,'countryListDetailcountryListDetail');
    },

    earchCountries(query) {
    return this.countryListState
        .filter(country => country.name.toLowerCase().includes(query.toLowerCase())) // 过滤匹配的国家
        .sort((a, b) => a.name.toLowerCase().indexOf(query.toLowerCase()) - b.name.toLowerCase().indexOf(query.toLowerCase())) // 排序
        .concat(this.countryListState.filter(country => !country.name.toLowerCase().includes(query.toLowerCase()))); // 将不匹配的国家添加到后面
},

    dateState() {
      this.isDatePickerVisible = true; // 设置为可见

      console.log(8888, "handleClickhandleClick");
      // this.$refs.elDatePicker.visible = true; // 打开日期选择器
    },
    handleDateChange(value) {
      console.log("选择的日期:", value);
      // 处理日期变化的逻辑
      this.isDatePickerVisible = false; // 选择后隐藏日期选择器
    },

    firstLevelCertification() {
      let countryNameInfo = this.surnameData + this.nameData;
      const authVerifyRequestVO = {
        type: this.type,
        realName: countryNameInfo,
        birthday: this.value1,
        countryName: this.selectedOption,
        countryId: this.countryId,
        idNumber: this.idNumber,
      };

      // 非空校验
      if (!this.type) {
        if (!this.selectedOption) {
          this.$customMessage(2, "请选择国家");
          return;
        }
        if (!this.countryId) {
          this.$customMessage(2, "请选择国家");
          return;
        }
        this.$customMessage(2, "请选择证件类型");
        return;
      }
      if (!this.surnameData) {
        this.$customMessage(2, "请输入姓氏");
        return;
      }

      if (!this.nameData) {
        this.$customMessage(2, "请输入名字");
        return;
      }
      if (!this.value1) {
        this.$customMessage(2, "请选择生日");
        return;
      }

      if (!this.idNumber) {
        this.$customMessage(2, "请输入证件号码");
        return;
      }


Promise.try(() => {
  return onKycLv1Submit(authVerifyRequestVO)
 }).then(res => {
  
  if (res.code === 200) {

            this.isDialogVisible = false
            this.kycInitDetail(this.tokenInfo) 
            this.$refs.uploadIdentityAuthentication.openDialog(this.tokenInfo,this.type)
          
  } else {
    // 处理错误消息
    this.$customMessage(2, res.msg);
  }
 }).catch((e)=>{
  console.log(e);
  
 })

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
      this.isRotated = !this.isRotated; // 切换旋转状态
    },

    selectOption(option, id) {
      this.selectedOption = option;
      this.isDropdownVisible = false; // 选择后隐藏下拉框
      this.isRotated = false; // 切换旋转状态
      this.selectedValue = option;
      this.countryId = id;
    },
    selectOptionInfo(option, id) {
      this.isRotatedInfo = !this.isRotatedInfo;
      this.selectedOptionInfo = option;
      this.isDropdownVisibleInfo = false; // 选择后隐藏下拉框
      this.isDropdown = false;
      this.type = id;
    //   this.setType(id)
      console.log(id, "selectedOptionselectedOptionselectedOption");
    },

    eventTargetFocus(e) {
      console.log(e);
      this.blurstate = true;
    },


    openDialog(token) {
      this.tokenInfo = token;
      this.surnameData = "",
        this.nameData = "",
        this.type = "",
        this.selectedOption = "请选择国家",
        this.countryId = "",
        this.idNumbe = ""

      this.isDialogVisible = true;

      this.countryList = this.Listinfo
      this.isDropdownVisible =false
      this.isDropdown =false
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
  height: 296px;
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
  z-index: 99999;
}

.dropdowns {
  /* border: 0.5px solid #252525; */
  width: 100%;
  position: absolute;
  top: 55px;
  left: 0px;
  background-color: #1c1c1c;
  border-radius: 4px;
  z-index: 10;
  overflow: hidden;
  z-index: 99998;

}

.dropdown-item {
  color: #737373;
  border-radius: 4px;
  cursor: pointer;
  overflow: hidden;
}

.dropdown-item:hover  {
  overflow: hidden;
  border-radius: 4px;
  background-color: #252525;
}
.dropdown-item:hover div  {
  color: #90ff00;
}
/* .hoverItem:hover {
  color: #90ff00;
} */
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
  background-color: #141414 !important;
  /* 设置背景色 */
  color: #f0f0f0 !important;
  /* 设置字体颜色 */
}

.custom-date-picker ::v-deep .el-input::placeholder {
  color: #f0f0f0 !important;
  /* 设置占位符颜色 */
}

.custom-date-picker ::v-deep .el-picker-panel {
  background-color: #141414 !important;
  /* 设置日期选择面板的背景色 */
  color: #f0f0f0 !important;
  
  /* 设置日期选择面板的字体颜色 */
}

.custom-date-picker ::v-deep .el-picker-panel .cell {
  color: #f0f0f0 !important;
  /* 设置日期单元格的字体颜色 */
}

.custom-date-picker ::v-deep .el-picker-panel .cell:hover {
  background-color: #1a1a1a !important;
  color: #f0f0f0 !important;  /* 设置悬停时的背景色 */
}
.dateStyle ::v-deep .el-date-editor--date {
    background-color: #252525!important;
    width: 100% !important;
    height: 42px !important;
    border: none !important; 
    font-size: 14px !important;
    border-radius: 4px !important;
    color: #f0f0f0 !important; 

}

.dateStyle ::v-deep .el-input__inner .el-date-editor.el-input{
    background-color: #252525!important;
    width: 100% !important;
    height: 100% !important;
    border: none !important; 
    font-size: 14px !important;
    color: #f0f0f0 !important; 
}
.dateStyle ::v-deep .el-input--prefix .el-input__inner {
    background-color: #252525!important;
    width: 100% !important;
    height: 100% !important;
    border: none !important; 
    font-size: 14px !important;
    border-radius: 4px !important;
    color: #f0f0f0 !important; 
}
/* el-picker-panel el-date-picker el-popper */

  .el-popper {
    background-color: #252525 !important;
    border: none !important; 
    color: #f0f0f0 !important; 
    font-size: 14px !important;
    z-index: 99999999999999;
}
.text_one{
  background-color:  #141414 !important;

}

</style>
<style>
  .el-popper {
    background-color: #252525 !important;
    border: none !important; 
    color: #ccc !important;
    font-size: 14px !important;
}
.el-date-table__row {
  border: none !important;
}
.el-date-table td.current:not(.disabled) span  {

  background-color: #90ff00 !important;
  color: black !important;
}
.el-picker-panel__icon-btn {
  color: #f0f0f0 !important;
}

</style>
