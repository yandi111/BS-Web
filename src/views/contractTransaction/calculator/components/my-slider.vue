<template>
  <div class="my-slider">
    <div class="process" id="process" v-if="marks">
      <el-slider
        style="width: 100%"
        :min="min"
        :max="max"
        v-bind="$attrs"
        v-on="$listeners"
        :value="value"
        :marks="marks"
        @input="sliderChange"
        @change="getPositionGear"
      >
      </el-slider>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { $positionGear } from "@/api/contractTransaction";
export default {
  props: {
    max: {
      type: Number,
      default: 100,
    },
    marks: {
      type: Object,
      default: () => {},
    },
    value: {
      type: Number,
      default: 0,
    },
    symbolInfo: {
      type: Object,
      default: () => {},
    },
    maxPositionAmount: {
      type: Number,
      default: 0,
    },
    //不需要发请求 获取最大可开
    notGet: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      min: 1,
      times: "",
    };
  },
  computed: {
    ...mapGetters(["getTheme"]),
  },
  methods: {
    getPositionGear() {
      if (this.notGet) return;
      let data = {
        coinMarket: this.symbolInfo.symbolCode,
        maximumLeverage: this.value,
      };
      // console.log("data", data);
      $positionGear(data).then((res) => {
        this.$emit("update:maxPositionAmount", res.data.data.maxPositionAmount); //默认 张
        // console.log("最大可开", res.data.data.maxPositionAmount);
      });
    },
    sliderChange(e) {
      this.changeSliderStyle(e);
      // this.$emit('sliderChange')
    },
    //进度条样式
    changeSliderStyle(e) {
      let lineBox = document.querySelector("#process").childNodes[0];
      let activeWidth = (100 * e) / this.max;

      if (lineBox) {
        let nodes = lineBox.querySelectorAll(".el-slider__stop");
        let stop_type = this.getTheme == "dark" ? "press-stop1" : "press-stop";
        for (let i = 0; i < nodes.length; i++) {
          nodes[i].classList.add(stop_type);
          let stopLeft =
            nodes[i].style.left.slice(0, nodes[i].style.left.length - 1) * 1;
          if (activeWidth > stopLeft) {
            nodes[i].classList.remove(stop_type);
            nodes[i].classList.add("active-stop");
          } else {
            if (this.getTheme == "dark") {
              nodes[i].classList.remove("press-stop");
            } else {
              nodes[i].classList.remove("press-stop1");
            }
            nodes[i].classList.add(stop_type);
            nodes[i].classList.remove("active-stop");
          }
        }
      }
    },
  },
  watch: {
    symbolInfo: {
      handler(value) {
        if (value?.coinId) {
          this.getPositionGear(this.value);
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.process {
  padding: 10px 5px;
  padding-right: 20px;
  ::v-deep .el-slider .el-slider__runway {
    position: relative;
    height: 2px;
    background-color: var(--runway);
    .el-slider__bar {
      height: 100%;
      background-color: var(--theme-color);
    }
    .el-slider__stop {
      margin-top: 0px;
      top: 50%;
      transform: translateY(-50%);
      &.press-stop::after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: "iconfont";
        content: "\e636";
        font-size: 14px;
        color: var(--theme-color);
        // color: var(--runway);
        color: #8992a6;
        opacity: 0.4;
      }
      &.press-stop1::after {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-family: "iconfont";
        content: "\e62d";
        font-size: 14px;
        color: #97a3ad;
      }
      &.active-stop::after {
        content: "\e62d";
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-55%, -50%);
        font-family: "iconfont";
        font-size: 14px;
        color: var(--theme-color);
      }
    }
    .el-slider__marks {
      width: 100%;
      height: 30px;
      // background-color: red;
      padding: 0 14px;
      margin-top: -30px;
      .el-slider__marks-text {
        font-size: 12px;
        &:last-child {
          transform: translateX(-80%);
          width: 50px;
          text-align: right;
        }
      }
    }

    .el-slider__button-wrapper {
      position: relative;
      .el-slider__button {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: transparent !important;
        // display: flex;
        // align-items: center;
        border: none;
        // margin-right: 10px;
        margin-top: -2px;
        &::after {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-30%, -50%);
          font-family: "iconfont";
          content: "\e62d";
          font-size: 14px;
          color: var(--theme-color);
        }
      }
    }
  }
}
</style>
