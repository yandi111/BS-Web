<!-- eslint-disable vue/no-parsing-error -->
<!-- 我的邀请 -->
<template>
  <!-- <div style="height: calc(100vh - 4.52547rem);overflow-y: scroll;padding-bottom: 200px;">
  
  </div> -->

  <div class="mobile-page">
   12121212
  
  </div>


</template>

<script>

import { mapGetters, mapActions ,mapMutations } from "vuex";



export default {
  name: "SecuritySetting",
  components: {
    // SelectList  setMobileRebateState

  },
  data() {
    return {

      showModal: true,
      modalContent: "",
      modalTitle: "",
      showBtn: false,
      isMobileRebate: true, // 设置标志，表示当前是 mobileRebate 页面

    };
  },
  computed: {
    ...mapGetters(["userInfo", 'getUserList']),
    // token() {
    //   return getToken() ? getToken() : ''
    // }
  },
  created() {

  },
  mounted() {
    this.setMobileRebateState(true)
  
  },
  methods: {
    ...mapActions(['fetchUserInfo']),
    ...mapMutations(['setMobileRebateState']),


    handleClose() {
      this.showModal = false;
    },



  },
};
</script>
<style lang='scss' scoped>


.mobile-page {
  padding: 20px;
  font-size: 16px;
}

/* 移动端样式 */
@media (min-width: 1080px) {
  .mobile-page {
    display: none; /* 在大于1080px的屏幕上隐藏 */
  }
}

.ff0 {
  color: #F0F0F0;
}

.ic {
  align-items: center;
}

.jc {
  justify-content: center;
}

.jic {
  display: flex;
  align-items: center;
  justify-content: center;
}

.img100 {
  width: 100%;
  height: 100%;
}

.common-content {
  padding: 0 20px;
  font-size: 14px;
  color: #637287;

  .img {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 30px;
  }

  .item {
    margin-top: 15px;
  }

  .btn {
    display: flex;
    justify-content: space-between;
    font-size: 18px;
    font-weight: 500;
    margin-top: 32px;
    margin-bottom: 10px;

    .cancel {
      width: 210px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      border-radius: 6px;
      // border: 1px solid $colorB;
      // color: $colorB;
      color: #333;
      cursor: pointer;
      background: #F4F5F7;
    }

    .hoverItem:hover {
      background: #1B1B1B;
    }

    .sure {
      width: 210px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      // background: $colorB;
      border-radius: 6px;
      color: #ffffff;
      cursor: pointer;
    }
  }
}

.ic {
  align-items: center;
}

.fd {
  flex-direction: column;
}

.jc {
  justify-content: center;
}

.jb {
  justify-content: space-between;
}

.fc {
  color: #F0F0F0;
}

.ff90 {
  color: #90FF00;
}

.dropdown-items {
  border-radius: 4px;
  // padding: 8px 12px;
  cursor: pointer;
  overflow: hidden;
  color: #FFFFFF;
}

.dropdown-items:hover {
  overflow: hidden;
  border-radius: 4px;
  background-color: #252525;
  color: #90ff00;
}

.rotate {
  transform: rotate(180deg);
  /* 旋转 180 度 */
}

/* Webkit 浏览器（Chrome, Safari） */
.scroll-container::-webkit-scrollbar {
  width: 1px;
  /* 滚动条宽度 */
}

.scroll-container::-webkit-scrollbar-track {
  background: #141414;
  /* 滚动条轨道颜色 */
}

.scroll-container::-webkit-scrollbar-thumb {
  background: #141414;
  /* 滚动条颜色 */
  border-radius: 6px;
  /* 滚动条圆角 */
}

.scroll-container::-webkit-scrollbar-thumb:hover {
  background: #141414;
  /* 滚动条悬停时的颜色 */
}

/* Firefox */
.scroll-container {
  scrollbar-width: thin;
  /* 滚动条宽度 */
  scrollbar-color: #252525 #141414;
  /* 滚动条颜色和轨道颜色 */
}
</style>