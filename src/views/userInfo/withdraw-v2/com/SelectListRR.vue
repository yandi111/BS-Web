<!-- 进阶身份认证 -->
<template>

  <div style="">
    <div class="flex ic jc" style="
                  cursor: pointer;
                  align-items: center;
                  padding-left: 13px;
                  border-radius: 4px;
                  height: 100%;
                  background: #252525;
                  position: relative;
                  color: #f0f0f0;
                ">
      <div class="flex ic jb" style="
                    width: 100%;
                    align-items: center;
                    height: 42px;
                    border-radius: 4px;
                    font-size: 12px;
                  " @click="toggleDropdownsh">
        <div>{{ chainListTitle }}</div>
        <div style="margin-left: 13px; font-size: 12px" class="triangle" :class="{ rotate: isRotated }"></div>
        <!-- 小三角 -->
      </div>

      <transition name="fade">
        <!-- v-if="isDropdownVisible"  -->
        <div v-if="isDropdown" class="dropdowns" style="top: 45px; border-radius: 4px; padding-bottom: 5px;">
          <div style="
                      border-radius: 4px;
                        height: 100%;
                        background-color: #1c1c1c;
                        scrollbar-color: #3a3b3d #141414; /* 滚动点颜色和轨道颜色 */
                      ">
            <div style=" width: 100%;  " class="dropdown-item flex ic jb" v-for="(item, index) in chainList"
              @click="selectOptionInfo(item)" :key="index">
              <div style="font-size: 12px; display: flex; align-items: center; height: 42px; padding-left: 13px;">
                {{ item.tokenProtocol }} </div>
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


</template>

<script>

export default {


  props: {
    chainList: {
      type: null,
      required: true,
    },
    chainListTitle: {
      type: String,
      required: true,

    }

  },
  name: "SelectListRefund",
  components: {
  },
  data() {
    return {
      // localCoinPairTitle:  "选择网络",// 将 prop 的值复制到 data 中
      blurstate: false,
      isRotated: false,
      phoneCheck: false,
      phoneCheckText: "",
      isDropdown: false,
      countryListInfo: [
        {
          id: 2,
          name: "BTC",
          code: 53,
        },
        {
          id: 1,
          name: "ETH",
          code: 54,
        },
        {
          id: 1,
          name: "XRP",
          code: 54,
        },
      ],
    }
  },
  watch: {
    // chainListTitle(newVal) {
    //   this.localCoinPairTitle = newVal; // 监听 prop 的变化并更新 localCoinPairTitle
    // }
  },
  computed: {

  },
  mounted() {

  },
  methods: {
    eventTargetFocus(e) {
      console.log(e);
      this.blurstate = true;

    },

    toggleDropdownsh() {
      this.isDropdown = !this.isDropdown;
      this.isRotated = !this.isRotated; // 切换旋转状态
    },

    selectOptionInfo(item) {
      this.isRotatedInfo = !this.isRotatedInfo;
      this.isDropdownVisibleInfo = false; // 选择后隐藏下拉框
      this.isRotated = !this.isRotated; // 切换旋转状态
      this.isDropdown = false;

      this.$emit('chainListFn',item)
    },



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

.dropdowns {

  width: 100%;

  /* border: 0.5px solid #252525; */
  //   width: 100%;
  position: absolute;
  left: 0px;
  background-color: #1c1c1c;
  border-radius: 4px;
  z-index: 10;
}



.dropdown-item {

  display: flex;
  justify-content: start;
  align-items: center;
  width: 100%;
  border-radius: 4px;
  cursor: pointer;
  color: #737373;
}

.dropdown-item:hover {
  border-radius: 4px;
  background-color: #252525;
  color: #90ff00;
}

::v-deep .el-checkbox__input.is-checked .el-checkbox__inner::after {
  transform: rotate(50deg) scaleY(1.3);

}

.rotate {
  transform: rotate(180deg);
  /* 旋转 180 度 */
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