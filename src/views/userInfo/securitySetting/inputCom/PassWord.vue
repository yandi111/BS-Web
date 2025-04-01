<template>
 <!--  密码  -->
 <div style="margin-top: 20px;">
  <div style="margin-bottom: 9px; font-size: 14px;color: #F0F0F0;">旧密码</div>
  <!--  旧密码  -->
  <div class="input-container" style="margin-bottom: 19px;"
       :style="{ border: eventFlagOld ? '0.5px solid #90FF00' : '0.5px solid rgba(0,0,0,0)' }">
   <div class="inputLeft" style="height: 42px; padding-left: 12px;">
    <input v-model="passwordDataOld" @input="handleInputOld" @focus="eventFocusOld($event)"
           @blur="eventFlagOld = false" class="custom-input" placeholder="请输入旧密码"
           :type="iconOpenOld == 1 ? 'password' : 'text'"
           style="color: #F0F0F0;border:none;height: 42px;"/>
   </div>

   <div
    style="cursor: pointer;  display: flex; justify-content: end ;align-items: center ; margin-left: 33px; margin-right: 10px; ">
    <div @click.stop="iconClickOld(1)" v-if="iconOpenOld == 0" style="cursor: pointer; margin-top: 5px;">
     <img src="@/assets/newg/icon_open.png" alt="打开">
    </div>
    <div @click.stop="iconClickOld(0)" v-if="iconOpenOld == 1"
         style="cursor: pointer; width: 20px; height: 20px;margin-top: -1px;">
     <img style="width: 100%; height: 100%;" src="@/assets/newg/icon_close.png" alt="关闭">
    </div>
   </div>
  </div>
 </div>
</template>

<script>
export default {
 name: 'PassWord',
 data() {
  return {
   passwordDataOld: '',
   eventFlagOld: false,
   iconOpenOld: 1,
  }
 },

 computed: {},
 // eslint-disable-next-line vue/return-in-computed-property
 mounted() {
 },
 methods: {


  handleInputOld() {
   this.$emit('passWordClick', this.passwordDataOld)
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

   this.check()
   this.isDialogVisible = true
  },
  closeDialog() {
   this.isDialogVisible = false
  },


 }


}
</script>

<style scoped>
.inputLeft {
 width: 100%;
 /* 输入框宽度 */
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

.close-button svg {
 fill: #333333;
 transition: fill 0.3s ease;
}

.close-button:hover svg {
 fill: #ffffff;
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

h2 {
 color: #333;
 margin-bottom: 15px;
}

p {
 margin-bottom: 20px;
}

.selected-icon img {
 height: 30px;
 width: 30px;
}
</style>