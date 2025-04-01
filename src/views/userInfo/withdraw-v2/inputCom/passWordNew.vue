<template>
    <div>
        <!--  密码  -->
        <div style="margin-top: 20px;">

            <!--  新密码  -->
            <div style="margin-bottom: 9px; font-size: 14px;color: #F0F0F0;">新密码</div>
            <div class="input-container"
                :style="{ border: eventFlag ? '0.5px solid #90FF00' : '0.5px solid rgba(0,0,0,0)' }">
                <div class="inputLeft" style="height: 42px; padding-left: 12px;">
                    <input v-model="passwordData" @input="handleInput" @focus="eventFocus($event)"
                        :type="iconOpen == 1 ? 'password' : 'text'" @blur="eventFlag = false" class="custom-input"
                        placeholder="请输入密码" style="color: #F0F0F0;border:none;height: 42px;" />
                </div>

                <div
                    style="cursor: pointer;  display: flex; justify-content: end ;align-items: center ; margin-left: 33px; margin-right: 10px; ">
                    <div @click.stop="iconClick(1)" v-if="iconOpen == 0" style="cursor: pointer; margin-top: 5px;">
                        <img src="@/assets/newg/icon_open.png" alt="打开">
                    </div>
                    <div @click.stop="iconClick(0)" v-if="iconOpen == 1"
                        style="cursor: pointer; width: 20px; height: 20px;margin-top: -1px;">
                        <img style="width: 100%; height: 100%;" src="@/assets/newg/icon_close.png" alt="关闭">
                    </div>
                </div>
            </div>
            <!-- this.passwordValidation.length < 5   eventFlag  -->
            <div style="margin-top:14px; line-height: 14px;">
                <div class="flex" style="height: 18px;">
                    <!-- <div style="margin-right: 5px;"> <img src="@/assets/newg/icon_reached.png" alt=""> </div> -->
                    <div v-if="passwordValidation.includes(0)"
                        style="margin-right: 5px;margin-top: 1.2px;opacity: 0.85;"> <img
                            src="@/assets/newg/icon_reached.png" alt=""> </div>
                    <div v-else style="margin-right: 5px;margin-top: 1.2px;"> <img src="@/assets/newg/icon_not.png"
                            alt=""> </div>
                    <div style="font-size: 12px; color: #737373;">长度为 8-20 个字符</div>
                </div>
                <div class="flex" style="height: 18px; margin-top: 3px;">
                    <div v-if="passwordValidation.includes(1)"
                        style="margin-right: 5px;margin-top: 1.2px;opacity: 0.85;"> <img
                            src="@/assets/newg/icon_reached.png" alt=""> </div>
                    <div v-else style="margin-right: 5px;margin-top: 1.2px;"> <img src="@/assets/newg/icon_not.png"
                            alt=""> </div>

                    <div style="font-size: 12px; color: #737373;">至少包含1 个大写字符</div>
                </div>
                <div class="flex" style="height: 18px;  margin-top: 3px;">
                    <div v-if="passwordValidation.includes(2)"
                        style="margin-right: 5px;margin-top: 1.2px;opacity: 0.85;"> <img
                            src="@/assets/newg/icon_reached.png" alt=""> </div>
                    <div v-else style="margin-right: 5px;margin-top: 1.2px;"> <img src="@/assets/newg/icon_not.png"
                            alt=""> </div>

                    <div style="font-size: 12px; color: #737373;">至少包含1个小写字符</div>
                </div>
                <div class="flex" style="height: 18px; margin-top: 3px;">
                    <div v-if="passwordValidation.includes(3)"
                        style="margin-right: 5px;margin-top: 1.2px;opacity: 0.85;"> <img
                            src="@/assets/newg/icon_reached.png" alt=""> </div>
                    <div v-else style="margin-right: 5px;margin-top: 1.2px;"> <img src="@/assets/newg/icon_not.png"
                            alt=""> </div>

                    <div style="font-size: 12px; color: #737373;">至少包含 1个数字</div>
                </div>
                <div class="flex" style="height: 18px; margin-top: 3px;">
                    <div v-if="passwordValidation.includes(4)"
                        style="margin-right: 5px;margin-top: 1.2px;opacity: 0.85;"> <img
                            src="@/assets/newg/icon_reached.png" alt=""> </div>
                    <div v-else style="margin-right: 5px;margin-top: 1.2px;"> <img src="@/assets/newg/icon_not.png"
                            alt=""> </div>

                    <div style="font-size: 12px; color: #737373;">至少包含1个符号</div>
                </div>

            </div>
        </div>


        <div style="margin-top: 19px;">
            <div style="margin-bottom: 9px; font-size: 14px;color: #F0F0F0;">新密码确认</div>
            <div class="input-container" style="margin-bottom: 19px;"
                :style="{ border: eventFlagNew ? '0.5px solid #90FF00' : '0.5px solid rgba(0,0,0,0)' }">
                <div class="inputLeft" style="height: 42px; padding-left: 12px;">
                    <input v-model="passwordDataNew" @input="handleInputNew" @focus="eventFocusNew($event)"
                        @blur="eventFlagNew = false" class="custom-input" placeholder="请输入密码"
                        :type="iconOpenNew == 1 ? 'password' : 'text'"
                        style="color: #F0F0F0;border:none;height: 42px;" />
                </div>

                <div
                    style="cursor: pointer;  display: flex; justify-content: end ;align-items: center ; margin-left: 33px; margin-right: 10px; ">
                    <div @click.stop="iconClickNew(1)" v-if="iconOpenNew == 0"
                        style="cursor: pointer; margin-top: 5px;">
                        <img src="@/assets/newg/icon_open.png" alt="打开">
                    </div>
                    <div @click.stop="iconClickNew(0)" v-if="iconOpenNew == 1"
                        style="cursor: pointer; width: 20px; height: 20px;margin-top: -1px;">
                        <img style="width: 100%; height: 100%;" src="@/assets/newg/icon_close.png" alt="关闭">
                    </div>
                </div>
            </div>
        </div>

    </div>



</template>

<script>
// import { account } from '@/views/contractTransaction/components/ws/accountEnsure';
// import UserTips from './userTips.vue';    this.$refs.mobileCode.openDialog(this.getMethod)
import { mapGetters, mapActions } from 'vuex';

export default {

    components: {
        // UserTips
    },
    name: 'passWordNew',
    data() {
        return {

            PHONEmethod: 'PHONE',
            EMAILmethod: 'EMAIL',
            EMAILshow: false,
            EmailCheck: false,
            phoneCheckCode: '',
            emailCheckCode: '',
            PHONEshow: false,

            authBizEnum: '',
            bizId: '',
            authOptions: [],
            tipsStatus: true,
            getMethod: "NEW_PHONE",
            iconOpen: 1,
            iconOpenOld: 1,
            seconds: 60, // 倒计时数据
            eventFlags: false,
            eventFlagOld: false,
            eventFlagsh: false,
            eventFlagSub: false,
            eventFlagNew: false,
            verifyCode: '',
            blurstate: false,
            phoneCheck: false,
            selectedOption: '86', // 默认选项
            isDropdownVisible: false,
            phoneNumberData: null,
            iconOpenNew: 1,
            countryList: [
                {
                    id: 1,
                    name: '中国',
                    code: 53
                },
                {
                    id: 2,
                    name: '中国香港',
                    code: 54
                },

                {
                    id: 2,
                    name: '中国香',
                    code: 55
                }

            ],










            passwordData: '',
            passwordDataNew: '',
            passwordDataOld: '',
            passwordDatas: '',
            eventFlag: false,
            count: 0,
            isHovered: false,
            isAddHovered: false,
            isDialogVisible: false,
            accountList: [
                {
                    account: '857229093@qq.components',
                    name: '移出'
                },
                {
                    account: '857229093@qq.components',
                    name: '移出'
                },
                {
                    account: '857229093@qq.components',
                    name: '移出'
                }
            ]


        }
    },
    computed: {
        ...mapGetters(['getAccountList', 'getToken', 'getUserList']),
        userList() {
            return this.getUserList; // 计算属性返回用户信息
        },
        phoneEmail() {
            return this.getMethod == "NEW_PHONE" ? true : false
        },
        passwordValidation() {
            const validationResults = [];

            // 检查密码长度
            if (this.passwordData.length >= 8 && this.passwordData.length <= 20) {
                validationResults.push(0); // 长度符合条件
            }

            // 检查是否包含大写字母
            if (/[A-Z]/.test(this.passwordData)) {
                validationResults.push(1); // 包含大写字母
            }

            // 检查是否包含小写字母
            if (/[a-z]/.test(this.passwordData)) {
                validationResults.push(2); // 包含小写字母
            }

            // 检查是否包含数字
            if (/\d/.test(this.passwordData)) {
                validationResults.push(3); // 包含数字
            }

            // 检查是否包含特殊符号
            if (/[!@#$%^&*(),.?":{}|<>[\]\\';'`~]/.test(this.passwordData)) {
                validationResults.push(4); // 包含特殊符号
            }

            return validationResults; // 返回校验结果数组
        },
    },
    // eslint-disable-next-line vue/return-in-computed-property
    mounted() { },
    methods: {

        ...mapActions(['fetchUserInfo']),

        tipsStatusClick() {

            this.tipsStatus = !this.tipsStatus
            this.$emit('tipsStatusInfo', this.tipsStatus)
        },

        phoneCheckCodeClick(active) {
            this.phoneCheckCode = active
        },
        emailCheckCodeClick(active) {
            this.emailCheckCode = active
        },



        handleInput() {

            this.$emit('passwordDataClick', this.passwordData)
        },

        handleInputNew() {
            this.$emit('passwordNewDataClick', this.passwordDataNew)
        },

        iconClick(active) {
            this.iconOpen = active
            console.log(active, "iconOpeniconOpeniconOpeniconOpen11111");
        },
        iconClickOld(active) {
            this.iconOpenOld = active
            console.log(active, "iconOpeniconOpeniconOpeniconOpen11111");
        },
        iconClickNew(active) {
            this.iconOpenNew = active
            console.log(active, "iconOpeniconOpeniconOpeniconOpen11111");
        },



        toggleDropdown() {
            this.isDropdownVisible = !this.isDropdownVisible;
            this.isRotated = !this.isRotated; // 切换旋转状态
        },


        selectOption(option) {
            this.selectedOption = option;
            this.isDropdownVisible = false; // 选择后隐藏下拉框
            this.isRotated = false; // 切换旋转状态
            this.selectedValue = option

        },
        phoneInput(event) {
            const inputValue = event.target.value.replace(/\D/g, '')
            if (inputValue.length <= 11) {
                this.phoneNumberData = inputValue;
            } else {
                this.phoneNumberData = inputValue.slice(0, 11);
            }
        },

        handleInputs(event) {
            const inputValue = event.target.value;
            // 限制输入长度为 20
            if (inputValue.length <= 4) {
                this.verifyCode = inputValue; // 更新密码数据
            } else {
                this.verifyCode = inputValue.slice(0, 4); // 截取前 20 个字符
                return
            }
        },

        eventFocusS(e) {
            e.target.style.border = '0.5px solid #90FF00'
            this.eventFlag = true
        },
        eventFocusSub(e) {
            e.target.style.border = '0.5px solid #90FF00'
            this.eventFlagSub = true
        },
        eventFocusSh(e) {
            e.target.style.border = '0.5px solid #90FF00'
            this.eventFlagsh = true
        },
        eventFocusOld(e) {
            e.target.style.border = '0.5px solid #90FF00'
            this.eventFlagOld = true
        },
        eventFocusNew(e) {
            e.target.style.border = '0.5px solid #90FF00'
            this.eventFlagNew = true
        },












        // handleInput(event) {
        //   const inputValue = event.target.value;
        //   // 限制输入长度为 20
        //   if (inputValue.length <= 20) {
        //     this.passwordData = inputValue; // 更新密码数据
        //   } else {
        //     this.passwordData = inputValue.slice(0, 20); // 截取前 20 个字符
        //     return
        //   }
        // },


        eventFocus(e) {
            console.log(e)
            // e.target.style.border  = '0.5px solid #90FF00'
            this.eventFlag = true
            this.eventFlags = true
        },
        openDialog() {
            this.passwordDataOld = '',
                this.passwordData = ''
            this.passwordDataNew = ''

            this.isDialogVisible = true
        },
        closeDialog() {
            this.isDialogVisible = false
        },




    }


}
</script>

<style scoped>
.ff {
    font-family: PingFang SC;
    font-weight: 500;
}

.ff0 {
    font-family: PingFang SC;
    color: #F0F0F0;
}

.cof {
    color: #FFFFFF;
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

.inputLeft {
    width: 100%;
    /* 输入框宽度 */
}

.input-containerS {
    display: flex;
    align-items: center;
    position: relative;
    /* 使子元素绝对定位相对于这个容器 */

    width: 100%;
    /* 容器宽度 */
}

.rotate {
    transform: rotate(180deg);
    /* 旋转 180 度 */
}

.dropdown {
    height: 296px;
    border: 0.5px solid #252525;
    width: 272px;
    position: absolute;
    top: 58px;
    left: 0px;
    background-color: #1C1C1C;
    border-radius: 4px;
    margin-top: 1px;
    z-index: 10;
    overflow: hidden;
}

.input-icon {
    position: absolute;
    right: 10px;
    display: inline-block;
    /* 确保图标在同一行 */
}

.dropdown-item {

    border-radius: 4px;
    /* // padding: 8px 12px; */
    cursor: pointer;
    overflow: hidden;
    /* // color: #363636; */
    color: #737373;
}

.dropdown-item:hover {
    overflow: hidden;
    border-radius: 4px;
    background-color: #252525;
    color: #90ff00;
}

.parent-component {
    padding: 20px;
}

.cancel {
    color: #737373;
    background-color: #252525;
}

.cancel:hover {
    color: #F0F0F0;
    background-color: #363636;
}

.submit {
    background-color: #90FF00;
    color: #252525;
}

.submit:hover {
    color: #737373;
}

.custom-input {
    width: 100%;
    /* 输入框宽度 */
    height: 40px;
    /* 输入框高度 */
    caret-color: #90FF00;
    /* 光标颜色 */
    outline: none;
    /* 去除聚焦时的蓝色边框 */
    border: 0.5px solid rgba(0, 0, 0, 0);
    /* 初始边框样式 */
    border-radius: 4px;
    /* 圆角边框 */
    background: #252525;
    /* 背景颜色 */
    text-align: left;
    /* 文本左对齐 */
}

.dialog-overlay {
    border-radius: 10px;
    position: fixed;
    top: -70px;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 888;
}

.dialog-content {
    background-color: #1B1B1B;
    border-radius: 10px;
    position: relative;
    max-width: 90%;
    max-height: 90%;
    overflow: auto;
}

.close-button {
    position: absolute;
    /* top: 10px; */
    right: 10px;
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

.confirm-button {
    border-top: 1px solid #252525;
    width: 100%;
    padding-top: 15px;
    padding-bottom: 15px;
    background: rgba(0, 0, 0, 0);

    color: #90FF00;
    ;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.input-container {
    display: flex;
    border-radius: 4px;
    overflow-y: auto;
    position: relative;
    /* 使子元素绝对定位相对于这个容器 */
    width: 100%;
    /* 容器宽度 */
    background: #252525;
    /* 背景颜色 */
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
    border-radius: 10px;
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
    border-color: #90FF00;
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

.textTips {
    font-family: PingFang SC;
    font-size: 11px;
    font-weight: 500;
    color: #737373;
}
</style>

<style scoped>
.custom-slider-container {
    position: relative;
    width: 100%;
    padding-bottom: 20px;
    /* 为标签腾出空间 */
}

.custom-slider {
    position: relative;
    width: 100%;
    height: 14px;
    padding: 6px 0;
}

.slider-track {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    height: 1px;
    background-color: #252525;
}

.slider-fill {
    position: absolute;
    height: 100%;
    background-color: #B3B3B3;
}

.slider-point {
    position: absolute;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 14px;
    height: 14px;
    background: url('@/assets/images/icon/icon-drag-node2.png') no-repeat center center;
    background-size: cover;
}

.slider-point.active {
    background-image: url('@/assets/images/icon/icon-drag-node.png');
}

.slider-thumb {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 22px;
    height: 22px;
    background: url('@/assets/images/icon/icon-Slide.png') no-repeat center center;
    background-size: cover;
    cursor: pointer;
}

.slider-tooltip {
    position: absolute;
    top: -25px;
    transform: translateX(-50%);
    background-color: #B3B3B3;
    color: #252525;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: PingFang SC;
    font-size: 11px;
    font-weight: 500;

}

.slider-labels {
    position: absolute;
    width: 100%;
    top: 100%;
    left: 0;
    margin-top: -16px;
    font-family: PingFang SC;
}

.slider-label {
    position: absolute;
    transform: translateX(-50%);
    font-size: 11px;
    font-weight: 500;
    color: #B3B3B3;
}

.filteredAccountList {
    color: #B3B3B3;

}

.filteredAccountList:hover {
    color: #FFFFFF;
}
</style>