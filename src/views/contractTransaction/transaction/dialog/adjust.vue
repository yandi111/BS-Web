<!-- 调整杠杆弹框 -->
<template>
  <div>
    <myModal
      :is-show.sync="adjustVisible"
      useTheme
      title="contract.调整杠杆"
      @close="adjustVisible = false"
      @submit="handleUpdate"
      :disabled="isDisabled"
    >
      <template slot="content">
        <div class="adjust-content">
          <div class="name fontSize16 gray">{{ $t(t + "杠杆") }}</div>
          <div class="inputNumber mt10 flexs">
            <div
              class="inputNumber__decrease"
              @click="handleInputType('reduce')"
            >
              <i class="iconfont icon-jianhao"></i>
            </div>
            <el-input
              v-model="inputValue"
              type="text"
              @input="handleSearch"
            ></el-input>
            <div class="inputNumber__increase" @click="handleInputType('add')">
              <i class="iconfont icon-tianjia"></i>
            </div>
          </div>
          <div class="slider height60 mt15 width520 pl12">
            <el-slider
              v-model="sliderValue"
              class="getsilder"
              ref="sliderDom"
              :marks="marks"
              :min="0"
              :max="leverInfo.maxValue"
              @input="sliderInput"
            />
          </div>
          <div class="fontText gray mt20">
            <div class="text">
              {{
                $t("contract.当前杠杆倍数最大可开X", [
                  positionGealInfo.maxPositionAmount,
                  contractInfo.amountUnit == "张"
                    ? $t("contract.张")
                    : contractInfo.amountUnit,
                ])
              }}
            </div>
            <div class="text pt10">
              {{ $t(t + "杠杆调整将同时影响当前仓位和挂单的杠杆。") }}
            </div>
          </div>
          <div class="tips flexs mt20">
            <el-image :src="require('@/assets/contract-imgs/waring.png')" />
            {{ $t(t + "选择超过10X杠杆交易会增加强行平仓") }}
          </div>
        </div>
      </template>
    </myModal>
  </div>
</template>

<script>
import { positionGeal } from "@/api/contractExchange.js";
import { debounce } from "@/libs/utils.js";
import checkUtils from "@/libs/checkUtils";
import { mapState } from "vuex";
import myModal from "@/components/my-modal";
export default {
  components: {
    myModal,
  },
  data() {
    return {
      // 输入框
      inputValue: "",
      // 开关
      adjustVisible: false,
      // 滑块
      sliderValue: null,
      marks: {},
      stepList: [],
      // 可开张数
      positionGealInfo: {},
      // 仓位方向
      warehousePositionDirection: undefined,
      // 国际缩写
      t: "contract.",
    };
  },
  methods: {
    // 打开杠杆弹窗
    handleadjustVisible(defaultSlider, sliderType) {
      this.adjustVisible = true;
      this.warehousePositionDirection = sliderType;
      // 滑块的初始默认值
      this.inputValue = String(defaultSlider);
      this.sliderValue = Number(defaultSlider);

      // 计算并获取 'minValue' 和 'maxValue' 之间分为 6 个部分的平均范围的数组 如果小于6的话去重 [1,1,2,2,2,3] = [1, 2, 3]
      const result = [
        ...new Set(
          this.getAverageRanges(
            this.leverInfo.minValue,
            this.leverInfo.maxValue,
            6
          )
        ),
      ];
      // 从结果数组中生成 'marks' 对象，使用整数键和原始值作为值
      this.marks = result.reduce((obj, item, value) => {
        obj[parseInt(item)] = item;
        return obj;
      }, {});
      // 从结果数组中移除每个值的 'X'，创建 'stepList'
      this.stepList = result.map((value) => value.replace("X", ""));
      // 使用 debounce 函数返回的新函数进行包装
      this.debounceGetPositionGeal = debounce(this.getPositionGeal, 300);
    },
    // 调整杠杆获取最大可开张数
    getPositionGeal() {
      positionGeal({
        coinMarket: this.leverInfo.symbol,
        maximumLeverage: this.sliderValue,
      }).then((res) => {
        const amountUnitLabel = this.contractInfo.amountUnit;
        // 判断条件，优化计算
        if (amountUnitLabel !== "张" && amountUnitLabel) {
          const contractInfoFaceValue = this.contractInfo.faceValue;
          const lastPrice = this.priceObj.lastPrice;
          console.log(
            res.data.maxPositionAmount,
            contractInfoFaceValue,
            lastPrice
          );
          // 根据 amountUnitLabel 的值进行不同的计算
          res.data.maxPositionAmount =
            amountUnitLabel === "USDT"
              ? checkUtils.accMul(
                  res.data.maxPositionAmount,
                  contractInfoFaceValue,
                  lastPrice
                )
              : checkUtils.accMul(
                  res.data.maxPositionAmount,
                  contractInfoFaceValue
                );
        }
        this.positionGealInfo = res.data;
        console.log("prompt", res.data);
      });
    },
    // 修改杠杆
    handleUpdate() {
      this.$emit("next", {
        leverTime: this.inputValue,
        operationType: 1,
        warehousePositionDirection: this.warehousePositionDirection,
      });
    },

    // 根据最小值、最大值和要将范围划分为的部分数，计算滑块的平均范围
    getAverageRanges(minValue, maxValue, parts) {
      // 计算范围和每个部分之间的间隔
      const range = maxValue - minValue;
      const interval = range / (parts - 1);
      // 初始化一个数组，用于以带有 'X' 占位符的字符串形式存储平均范围
      const result = [];
      for (let i = 0; i < parts; i++) {
        // 计算每个部分的值，并将其与 'X' 添加到结果数组末尾
        const value = minValue + interval * i;
        result.push(parseInt(value) + "X");
      }
      return result; // 返回平均范围的数组
    },
    //  + - 杠杆
    handleInputType(type) {
      if (type == "add") {
        if (Number(this.sliderValue) >= Number(this.leverInfo.maxValue)) return;
        this.sliderValue++;
      } else {
        if (Number(this.sliderValue) < Number(this.leverInfo.minValue)) return;
        this.sliderValue--;
      }
    },
    // 校验杠杆输入
    handleSearch(value) {
      // 使用正则表达式剔除非数字字符
      const numericValue = value.replace(/[^\d]/g, "");
      // 将处理后的字符串转换为数字
      let numberValue = Number(numericValue);

      // 对输入值进行最大值和最小值的限制
      if (numberValue > this.leverInfo.maxValue) {
        numberValue = this.leverInfo.maxValue;
      } else if (numberValue < this.leverInfo.minValue) {
        numberValue = 0;
      }
      // 返回限制后的数字值
      this.inputValue = numberValue.toString();
      this.sliderValue = Number(this.inputValue);
    },
    // 杠杆样式调整
    sliderInput(val) {
      const tooltipPopperElement = document.querySelector(
        "body .el-tooltip__popper"
      );
      if (val || tooltipPopperElement) {
        const element = this.$refs.sliderDom.$el.childNodes[1].childNodes[3];
        // 拿到DOM值 遍历的时候对应好DOM树的下标和滑块值一致然后追加Class
        for (let i = 0; i < element.childNodes.length; i++) {
          const child = element.childNodes[i];
          const childClass = this.stepList[i];

          child.classList[val >= childClass ? "add" : "remove"]("level-on");
        }
      }
    },
  },
  watch: {
    // inputValue 需要字符串 滑块必须是数字 所有需要互相转换类型
    sliderValue: {
      handler(newValue) {
        this.inputValue = String(newValue);
        this.debounceGetPositionGeal();
      },
    },
  },
  computed: {
    ...mapState({
      priceObj: (state) => state.contract.priceObj,
      // 单个交易对(合约)信息
      contractInfo: (state) => state.contract?.contractInfo,
      // 获取合约杠杆信息
      leverInfo: (state) => state.contract?.leverInfo,
    }),
    isDisabled() {
      return this.sliderValue == 0 || !this.sliderValue;
    },
  },
};
</script>

<style lang="scss" scoped>
.el-dialog__wrapper {
  overflow: hidden;
}
/* 调整杠杆 */
::v-deep .adjust {
  text-align: center;
  .el-dialog {
    border-radius: 26px;
    background: var(--main-bg);
    &__body {
      padding: 8px 0 30px;
    }
  }
  &-content {
    width: 540px;
    margin: auto;
    color: var(--trade-text-color);
    .name {
      color: #8992a6;
    }
    .inputNumber {
      text-align: center;
      /* width: 540px; */
      background: var(--trade-lever-Input-gb);
      padding: 0 5px;
      &__decrease,
      &__increase {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 40px;
        color: #b8c0cb;
        border-radius: 6px;
        background: var(--trade-lever-btn-gb);
        cursor: pointer;
        &:active {
          color: #90ff00;
        }
        i {
          font-size: 22px;
        }
      }
      .el-input__inner {
        border: none;
        text-align: center;
        height: 45px;
        color: var(--trade-text-color);
        background: var(--trade-lever-Input-gb);
        border-radius: 6px;
      }
    }
    .el-slider .el-slider__runway {
      cursor: unset;
      .el-slider__stop {
        cursor: pointer;
        background-color: transparent !important;
        top: -7px;
        width: 20px;
        height: 20px;
        background: url("@/assets/contract-imgs/level-step.png") no-repeat
          center / 20px 20px;
      }

      //
      .el-slider__button {
        border: none !important;
        background-color: transparent;
        background: url("@/assets/contract-imgs/level-on.png") no-repeat center /
          28px 28px;
        width: 28px;
        height: 28px;
        transform: scale(0.9);
        &:hover {
          border: none !important;
          background-color: transparent;
          background: url("@/assets/contract-imgs/level-on.png") no-repeat
            center / 28px 28px;
          width: 28px;
          height: 28px;
        }
      }

      .level-on {
        background: url("@/assets/contract-imgs/level.png") no-repeat center /
          20px 20px;
      }

      .el-slider__marks-text {
        width: max-content;
        margin-top: 20px;
      }
    }

    .fontText {
      font-size: 14px;
      color: #999;
      span {
        color: var(--trade-text-color);
      }
    }

    .tips {
      width: 540px;
      padding: 20px;
      background: #ffcf681e;
      border-radius: 6px;
      color: var(--trade-text-color);
      .el-image {
        width: 50px;
        &__inner {
          width: 18px;
          height: 18px;
          vertical-align: middle;
        }
      }
    }

    .config {
      width: 540px;
      height: 50px;
      color: white;
      text-align: center;
      background: #90ff00;
      border-radius: 6px;
      border: none;
      &-disabled {
        color: rgba(255, 255, 255, 0.5);
        background: rgba(46, 189, 133, 0.5);
      }
      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
