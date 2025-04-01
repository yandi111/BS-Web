<template>
    <div>
        <!-- <button @click="openDialog">打开对话窗</button>   v-if="isDialogVisible"-->

        <transition name="fade">


            <!-- <div style="background-color: #1C1C1C; color: #F0F0F0;font-size: 12px ; display: flex; align-items: center;">
                <div style="width: 20px; height: 20px;"></div>
                 <img src="${iconPath}" style="width: 100%; height: 100%; vertical-align: middle; margin-right: 8px;" /> 
              </div> isDialogVisible
              <div style="color: #F0F0F0;font-size: 12px ">${message}</div>  isDialogVisible -->
            <div v-if="isDialogVisible" class="dialog-overlay" @click.self="closeDialog" style="z-index: 1;">

                <div class="dialog-content" style="border: 1px solid #252525 ; z-index: 1;">
                    <div class="flex jb" style="
                border: 1px solid #252525;
                padding-top: 17px;
                padding-bottom: 17px;
                padding-left: 30px;
                padding-right: 17px;
              ">
                        <div class="ff" style="
                  font-size: 16px;
                  font-weight: 500;
                  color: #f0f0f0;
                ">
                    {{typeInfo == 2 ? '上传护照' : '上传身份证'}}
                            
                        </div>
                        <div>
                            <button @click="closeDialog" class="close-button">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                                    <path
                                        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <div style="padding: 30px;" class="">


                       


                           <div v-if="typeInfo == 2" class="flex jc ic">
                                <div @click="$refs.fileInput.click()" class="flex ic jc"
                                    style="padding-top: 19px; flex-direction: column; background-color: #252525;
                                     border-radius: 4px; padding-bottom: 34px; padding-left: 42px; padding-right: 42px; position: relative;">
                                    <div style="color: #F0F0F0; font-size: 14px; font-weight: 500;">
                                        点击上传 <span style="color:#90FF00">人像面</span>
                                    </div>
                                    <div class="flex jc ic bgcinfo"
                                        style="width: 142px; height: 97px; margin-top: 12px;">
                                        <div style="width: 120px; height: 80px;">
                                            <img style="width: 100%; height: 100%;" :src="imageUrl" alt="">
                                        </div>
                                    </div>
                                    <input ref="fileInput" type="file" @change="handleFileChange" accept="image/*"
                                        class="file-input" />
                                </div>
                           
                            </div>

                            <div v-else class="flex jb ic" style="">
                                <div class="flex jc ic"  style="margin-right: 20px;" >
                                <div @click="$refs.fileInput.click()" class="flex ic jc"
                                    style="padding-top: 19px; flex-direction: column; background-color: #252525;
                                     border-radius: 4px; padding-bottom: 34px; padding-left: 42px; padding-right: 42px; position: relative;">
                                    <div style="color: #F0F0F0; font-size: 14px; font-weight: 500;">
                                        点击上传 <span style="color:#90FF00">人像面</span>
                                    </div>
                                    
                                    <div class="flex jc ic bgcinfo"
                                        style="width: 142px; height: 97px; margin-top: 12px;">
                                        <div style="width: 120px; height: 80px;">
                                            <img style="width: 100%; height: 100%;" 
                                            :src="imageUrl" 
                                            alt="">
                                        </div>
                                    </div>
                                    <input ref="fileInput" type="file" @change="handleFileChange" accept="image/*"
                                        class="file-input" />
                                </div>
                            </div>
                            <div class="flex jc ic" >
                                <div @click="$refs.fileInputInfo.click()" class="flex ic jc"
                                    style="padding-top: 19px; flex-direction: column; background-color: #252525;
                                     border-radius: 4px; padding-bottom: 34px; padding-left: 42px; padding-right: 42px; position: relative;">
                                    <div style="color: #F0F0F0; font-size: 14px; font-weight: 500;">
                                        点击上传 <span style="color:#90FF00">人像面</span>
                                    </div>
                                    
                                    <div class="flex jc ic bgcinfo"
                                        style="width: 142px; height: 97px; margin-top: 12px;">
                                        <div style="width: 120px; height: 80px;">
                                            <img style="width: 100%; height: 100%;" 
                                            :src="imageUrlinfo" 
                                            alt="">
                                        </div>
                                    </div>
                                    <input ref="fileInputInfo" type="file" @change="handleFileChangeInfo" accept="image/*"
                                        class="file-input" />
                                </div>
                            </div>

                        </div>



                          <div style="margin-top: 29px;">
                                <div class="ff" style="font-size: 14px; margin-bottom: 20px; ">上传须知:</div>

                                <div class="flex">
                                    <div class="flex jc ic flex1" style="flex-direction: column; ">
                                        <div style="width: 100px; height: 62px; margin-bottom: 4px;"> <img
                                                style="width: 100%; height: 100%;"
                                                src="@/assets/images/upload/icon_passport1.png" alt=""> </div>

                                        <div class="flex ic">
                                            <div style="width: 18px; height: 18px;"> <img
                                                    style="width: 100%; height: 100%; margin-right: 5px;"
                                                    src="@/assets/images/upload/success.png" alt=""> </div>
                                            <div class="ff" style="font-size: 12px; font-weight: 500;">标准</div>
                                        </div>

                                    </div>
                                    <div class="flex jc ic  flex1" style="flex-direction: column;">
                                        <div style="width: 100px; height: 62px;margin-bottom: 4px;"> <img
                                                style="width: 100%; height: 100%;"
                                                src="@/assets/images/upload/icon_passport2.png" alt=""> </div>

                                        <div class="flex ic">
                                            <div style="width: 18px; height: 18px;"> <img
                                                    style="width: 100%; height: 100%; margin-right: 5px;"
                                                    src="@/assets/images/upload/error.png" alt=""> </div>
                                            <div class="ff" style="font-size: 12px; font-weight: 500;">边框缺失</div>
                                        </div>

                                    </div>
                                    <div class="flex jc ic flex1" style="flex-direction: column;">
                                        <div style="width: 100px; height: 62px;margin-bottom: 4px;"> <img
                                                style="width: 100%; height: 100%;"
                                                src="@/assets/images/upload/icon_passport3.png" alt=""> </div>

                                        <div class="flex ic">
                                            <div style="width: 18px; height: 18px;"> <img
                                                    style="width: 100%; height: 100%; margin-right: 5px;"
                                                    src="@/assets/images/upload/error.png" alt=""> </div>
                                            <div class="ff" style="font-size: 12px; font-weight: 500;">照片模糊</div>
                                        </div>

                                    </div>
                                    <div class="flex jc ic flex1" style="flex-direction: column;">
                                        <div style="width: 100px; height: 62px;margin-bottom: 4px;"> <img
                                                style="width: 100%; height: 100%;"
                                                src="@/assets/images/upload/icon_passport4.png" alt=""> </div>

                                        <div class="flex ic">
                                            <div style="width: 18px; height: 18px;"> <img
                                                    style="width: 100%; height: 100%; margin-right: 5px;"
                                                    src="@/assets/images/upload/error.png" alt=""> </div>
                                            <div class="ff" style="font-size: 12px; font-weight: 500;">闪光强烈</div>
                                        </div>

                                    </div>

                                </div>
                            </div>

                            <!-- 按钮 -->
                            <div class="flex" style="
                  margin-top: 50px;
                  margin-bottom: 30px;
                  padding-left: 100px;
                  padding-right: 100px;
                ">
                                <div @click.self="isDialogVisible = false" class="cancel flex jc ic" style="
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 13px;
                    font-family: PingFang SC;
                    flex: 1;
                    margin-right: 14px;
                    height: 34px;
                    border-radius: 4px;
                  ">
                                    取消
                                </div>
                                <div @click="uploadImage" class="submit flex jc ic" style="
                    cursor: pointer;
                    font-weight: 600;
                    font-size: 13px;
                    font-family: PingFang SC;
                    flex: 1;
                    height: 34px;
                    
                    border-radius: 4px;
                  ">
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
import {  mapActions} from "vuex";
import {  GetCountryList } from "@/api/hy";
import {onKycLv2Submit} from "@/api/user";
// import axios from "axios";

export default {
    name: "UploadIdentityAuthentication",
    data() {
        return {
            typeInfo:'',
            tokenInfo:'',
            dateState: false,
            value1: "",
            inputFlag: false,
            isRotated: false,
            isRotatedInfo: false,
            isDropdown: false,

            blurstate: false,
            phoneCheck: false,
            phoneCheckText: "",
            selectedOption: "请选择地址认证类型", // 默认选项
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

            phoneEmail: "",
            isDialogVisible: false,
            selectedIndex: 1, // 默认选中第二个盒子
            isSecondSelected: true, // 默认选中第二个盒子
            isSecondSelected2: true, // 默认选中第二个盒子
            imageFileinfo:      '',
            fileStaet:null,
            fileTwoStaet:null,

            imageFile: null, // 存储选择的文件
            imageUrl: this.typeInfo == 2 ? require('@/assets/images/user/icon_passport.png')  : require('@/assets/images/user/Maskz.png') , // 初始图片路径
            imageUrlinfo:require('@/assets/images/user/Maskb.png')
        };
    },
    compoted: {
    //     imageUrl() {
    //   if (this.typeInfo == 2) {
    //     return require('@/assets/images/user/icon_passport.png');
    //   } else {
    //     return require('@/assets/images/user/Maskz.png');
    //   }
    // }

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
      } catch (e) {
        console.log(e);
      }
    },

        handleFileChange(event) {
            const file = event.target.files[0]; // 获取选择的文件
            this.fileStaet = event.target.files[0]
            if (file) {
                this.imageFile = file; // 存储文件
                this.imageUrl = URL.createObjectURL(file); // 创建预览 URL
                const formData = new FormData();
                formData.append('idCard', this.imageFile); 
            }
        },
        handleFileChangeInfo(event) {
            const file = event.target.files[0]; // 获取选择的文件
            this.fileTwoStaet = event.target.files[0]
            if (file) {
                this.imageFileinfo  = file; // 存储文件
                this.imageUrlinfo = URL.createObjectURL(file); // 创建预览 URL
                const formData = new FormData();
                formData.append('idCard', this.imageFile); 
            }
        },
        uploadImage() {

            
            const formData = new FormData();
            
            formData.append('idCard', this.imageFile); // 将文件添加到 FormData

            // this.$customMessage(0, "上传成功");

            this.firstLevelCertification()
        },

 firstLevelCertification() {
    console.log(this.imageUrl ,this.imageUrlinfo,"uploadImage222");
    if (!this.fileStaet) {
        this.$customMessage(1, '请上传证件照片');
        return
    }
    if (this.typeInfo != 2 && !this.fileTwoStaet) {
        this.$customMessage(1, '请上传证件照片');
        return 
    }
   
   

      const authVerifyRequestVO = {
        positiveImg:this.imageUrl,
        negativeImg:this.imageUrlinfo,
      };

     
Promise.try(() => {
  return onKycLv2Submit(authVerifyRequestVO)
 }).then(res => {
          if (res.code == 200) {
            this.isDialogVisible = false;
            this.$customMessage(0, res.msg);
            this.kycInitDetail()

          } else {
            this.$customMessage(2, res.msg);
          }
 }).catch((e)=>{
  console.log(e);
  
 })


    },

   

        // uploadFileInfo(){
        //     this.handleFileChange()

        // },



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

        selectOption(option) {
            this.selectedOption = option;
            this.isDropdownVisible = false; // 选择后隐藏下拉框
            this.isRotated = false; // 切换旋转状态
            this.selectedValue = option;
        },
        selectOptionInfo(option) {
            this.isRotatedInfo = !this.isRotatedInfo;
            this.selectedOptionInfo = option;
            this.isDropdownVisibleInfo = false; // 选择后隐藏下拉框
            this.isDropdown = false;
            // this.isRotatedInfo = false; // 切换旋转状态
        },

        eventTargetFocus(e) {
            console.log(e);
            this.blurstate = true;
        },

        openDialog(token,type) {
            this.tokenInfo = token
            this.isDialogVisible = true;
            this.typeInfo = type
            this.fileStaet=null
            this.fileTwoStaet=null
        },
        closeDialog() {
            this.isDialogVisible = false;
        },
    },
};
</script>

<style scoped>
.ff {
    font-family: PingFang SC;
    font-weight: 500;
}

.flex1 {
    flex: 1;
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

.file-input {
    display: none;
    /* 隐藏文件输入框 */
}

.bgcinfo {
    background-image: url('/src/assets/images/user/icon_frame.png');
    /* 替换为你的图片路径 */
    background-size: cover;
    /* 使背景图像覆盖整个元素 */
    background-position: center;
    /* 背景图像居中 */
    background-repeat: no-repeat;
    /* 不重复背景图像 */
    height: 300px;
    /* 设置元素的高度 */
    width: 100%;
    /* 设置元素的宽度 */
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
</style>