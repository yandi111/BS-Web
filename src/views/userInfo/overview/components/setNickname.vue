<template>
  <div>
    <!-- <button @click="openDialog"></button> -->

    <transition name="fade">
      <div v-if="isDialogVisible" class="dialog-overlay" @click.self="isDialogVisible = false">
        <div class="dialog-content" style="border:1px solid #252525;">
          <div class="flex jb"
            style="padding-top: 17px; padding-bottom: 10px; padding-left: 17px; padding-right: 17px; border-bottom: 1px solid #252525; ">
            <div class="ff" style="font-size: 16px; color: #F0F0F0;  ">编辑</div>
            <div>
              <button @click="isDialogVisible = false" class="close-button">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20">
                  <path
                    d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z" />
                </svg>
              </button>
            </div>

          </div>
          <div  style="padding-left: 20px; padding-right: 20px; margin-top: 10px;">
          <div class="input-container"
            :style="{ border: eventFlag ? '0.5px solid #90FF00' : '0.5px solid rgba(0,0,0,0)' }"
            style="padding-right: 12px;"
             >
            <div class="inputLeft" style="height: 40px; width: 100%;">
              <input @input="handleInput" v-model="passwordData" @focus="eventFocus($event)" @blur="eventFlag = false" class="custom-input"
                placeholder="请输入内容" type="text" style="padding-left: 12px; color: #F0F0F0;border:none;height: 40px;" />
            </div>

            <div style="cursor: pointer;  display: flex; justify-content: end ;align-items: center ; color: #737373;">
              {{passwordData.length}}/20
            </div>
          </div>

          <div class="flex  ic" style="margin-top: 20px">
            <div style="width: 4px; height: 4px; background-color: #90FF00; border-radius: 50%; margin-right: 6px;" ></div>
            <div style="height: 20px; font-weight: 400; font-size: 14px; color: #737373;">您的昵称会对其他用户可见，您今年还有<span style="color: #90FF00;">{{userList.limit }}</span>次机会修改</div>
          </div>
          <div class="flex  ic" style="margin-top: 13px;">
            <div style="width: 4px; height: 4px; background-color: #90FF00; border-radius: 50%; margin-right: 6px;" ></div>
            <div style=" height: 20px;font-weight: 400; font-size: 14px; color: #737373;">在创建个人昵称时，请勿包含不雅词汇、BSEX的官方名称、个人联系方式。</div>
          </div>
          <div class="flex  ic" style="">
            <div style="width: 4px; height: 4px; background-color: rgba(0, 0, 0, 0); border-radius: 50%; margin-right: 6px;" ></div>
            <div style="height: 20px;font-weight: 400; font-size: 14px; color: #737373">或其他敏感内容。违反规定可能导致账户封禁，请注意遵守</div>
          </div>
        </div>


        <div class="flex" style="margin-top: 40px; margin-bottom: 20px;padding-left: 20px; padding-right: 20px;">
          <div @click.self="isDialogVisible = false" class="cancel flex jc ic" style="cursor: pointer; font-weight: 600; font-size: 13px;  flex:1;margin-right:14px;height: 34px;border-radius: 4px;" >取消</div>
          <div @click.self="submit" class="submit flex jc ic" style="cursor: pointer; font-weight: 600; font-size: 13px; flex:1; height: 34px; border-radius: 4px;">确定</div>
        </div>


        </div>
      </div>
    </transition>
  </div>
</template>

<script>
// import { account } from '@/views/contractTransaction/components/ws/accountEnsure';
// import UserTips from './userTips.vue';
import { mapGetters ,mapActions} from 'vuex';
import {onModifyUserInfo} from "@/api/user";
// import axios from 'axios';
export default {
  components: {
    // UserTips
  },
  name: 'SetNickname',
  data() {
    return {
      passwordData: '',
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
    ...mapGetters(['getAccountList', 'getToken','getUserList']),
    userList() {
      return this.getUserList; // 计算属性返回用户信息
    },
  },
  // eslint-disable-next-line vue/return-in-computed-property
  mounted() { },
  methods: {
    ...mapActions(['fetchUserInfo']),
    handleInput(event) {
      const inputValue = event.target.value;
      // 限制输入长度为 20
      if (inputValue.length <= 20) {
        this.passwordData = inputValue; // 更新密码数据
      } else {
        this.passwordData = inputValue.slice(0, 20); // 截取前 20 个字符
        return
      }
    },


    submit(){
      let params = {
        nickname : this.passwordData
      }



// import {onModifyUserInfo} from "@/api/user";

Promise.try(() => {
  return onModifyUserInfo(params)
 }).then(res => {
          if (res.code == 200) {
          this.isDialogVisible = false
          this.fetchUserInfo()
          this.$customMessage(0, "修改成功");
            

          } else {
            this.$customMessage(2, res.msg);
          }
 }).catch((e)=>{
  console.log(e);
  
 })




      // axios.post('/app/bsex-user/modify/user/info',params,
      //   {
      //     headers: {
      //       'x-language': 'zh_CN',
      //       'x-device-id': '',   // 设备唯一标识
      //       'x-app-type': 'WEB',
      //       'x-app-version': '',  // app版本号
      //       'x-app-token': this.getToken, // 
      //       'x-device-model': ''  //  设备型号
      //     }
      //   }
      // ).then(res => {
      //   if (res.data.code == 200) {
      //     console.log(res);
      //     this.isDialogVisible = false
      //     this.fetchUserInfo()
      //     this.$customMessage(0, "修改成功");
      //   } else {
      //     this.$customMessage(2, res.data.msg);
      //   }
      //   this.isDialogVisible = false
      // }).catch(e => {
      //   this.$customMessage(2, "修改失败");
      //   console.log(e);
      //   this.isDialogVisible = false
      // })
      

    },

    eventFocus(e) {
      console.log(e)
      // e.target.style.border  = '0.5px solid #90FF00'
      this.eventFlag = true
      this.eventFlags = true
    },
    openDialog() {
      this.isDialogVisible = true
      this.passwordData = ''
    },
    closeDialog() {
      this.isDialogVisible = false
    },


  }


}
</script>

<style scoped>
.ff {
  font-weight: 500;
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

.parent-component {
  padding: 20px;
}
.cancel{
  color: #737373;
  background-color: #252525;
}
.cancel:hover {
  color: #F0F0F0;
  background-color: #363636;
}
.submit{
  background-color: #90FF00;
  color: #252525;
}
.submit:hover{
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
  font-size: 11px;
  font-weight: 500;

}

.slider-labels {
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  margin-top: -16px;
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