<template>
  <div class="select">
    <el-input
      ref="inputRef"
      :value="value"
      @input="(value) => formatDecimal(value, decimalPlaces)"
      placeholder="0.00"
    >
      <div slot="suffix">
        <el-popover
          placement="bottom"
          width="500"
          :offset="-180"
          trigger="click"
          :visible-arrow="true"
          v-model="popperShow"
        >
          <div class="popper-content">
            <div class="popper-input">
              <el-input
                placeholder="搜索"
                prefix-icon="el-icon-search"
                v-model="searchVal"
                @input="(e) => filterLegalTender(e)"
              >
              </el-input>
            </div>
            <ul v-if="symbolFilterList.length > 0">
              <li
                v-for="item in symbolFilterList"
                :key="item.id"
                @click="handleChoose(item)"
                :style="{
                  'background-color': item.coinId === coinId ? '#EDF1FF' : '',
                }"
              >
                <div
                  style="
                    display: inline-block;
                    width: 24px;
                    height: 24px;
                    line-height: 24px;
                    vertical-align: middle;
                    margin-right: 10px;
                  "
                >
                  <img
                    :src="item.iconUrl"
                    style="width: 100%; height: 100%; border-radius: 50%"
                    alt=""
                  />
                </div>
                {{ item.coinName }}
              </li>
            </ul>
            <div v-else class="no-data">暂无数据</div>
          </div>
          <div slot="reference">
            <div class="select-value">
              <div class="left">
                <div class="icon">
                  <img :src="iconUrl" alt="" />
                </div>
                <div class="coin-name">{{ coinName }}</div>
              </div>
              <i
                :class="[
                  'custom-icon',
                  popperShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down',
                ]"
              ></i>
            </div>
          </div>
        </el-popover>
      </div>
    </el-input>
  </div>
</template>

<script>
export default {
  name: "DepositSelect",
  props: {
    coinList: {
      type: Array,
      default: () => [],
    },
    // 选中的字段
    value: {
      type: Number | String,
    },
    // 币种id
    coinId: {
      type: Number,
    },
    // 币种name
    coinName: {
      type: String,
    },
    iconUrl: {
      type: String,
    },
    //精度
    decimalPlaces: {
      type: Number,
    },
  },
  data() {
    return {
      popperShow: false,
      input: "0.000",
      searchVal: "",
      coinListData: [],
      convertAssetName: "",
      symbolList: this.coinList,
      symbolFilterList: this.coinList,
    };
  },
  methods: {
    // 选中法币
    handleChoose(item) {
      this.legalTenderId = item.coinId;
      this.iconUrl = item.iconUrl;
      this.$emit("coinSelect", item);
      this.popperShow = false;
    },

    formatDecimal(str, num) {
      //str当前输入值，num是想要保留的小数位数
      str = String(str);
      // if (!str.trim()) {
      //   return str;
      // }
      var len1 = str.substr(0, 1);
      var len2 = str.substr(1, 1);
      // 如果第一位是0，第二位不是点，就用数字把点替换掉
      if (str.length > 1 && len1 === 0 && len2 !== ".") {
        str = str.substr(1, 1);
      }
      // 第一位不能是.
      if (len1 === ".") {
        str = "";
      }
      // 限制只能输入一个小数点
      if (str.indexOf(".") !== -1) {
        var str_ = str.substr(str.indexOf(".") + 1);
        if (str_.indexOf(".") !== -1) {
          str = str.substr(0, str.indexOf(".") + str_.indexOf(".") + 1);
        }
      }

      // 如果第一位是0，第二位必须大于0或者小数点
      if (str.substring(0, 1) == 0) {
        if (str.substring(1, 2) > 0) {
          str = str.substring(1, 2);
        } else if (str.substring(1, 2) === 0 || str.substring(1, 2) === "0") {
          str = "0";
        }
      }

      // 正则替换
      str = str.replace(/[^\d^.]+/g, ""); // 保留数字和小数点
      if (num || num === 0) {
        var rest = str.split(".")[1];
        if (rest && rest.length > num) {
          rest = rest.substr(0, num);
          str = str.split(".")[0] + "." + rest;
        }
      }
      this.$emit("update:value", str);
      this.$emit("changeValue");
      // return str;
    },

    //获取聚焦方法
    getFocus() {
      this.$refs.inputRef.focus();
    },
    //搜索
    filterLegalTender(e) {
      if (this.symbolList && this.symbolList.length > 0) {
        let data = JSON.parse(JSON.stringify(this.symbolList));
        if (!e) {
          this.symbolFilterList = data;
        } else {
          this.symbolFilterList = data.filter(
            (item) => item.coinName.indexOf(e.toUpperCase()) > -1
          );
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.popper-content {
  .popper-input {
    width: 92%;
    margin-left: 20px;
    margin-bottom: 10px;
  }
}
.select {
  ::v-deep   .el-input__inner {
    border: none;
  }
  height: 40px;
  .select-value {
    margin: 8px 20px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    .left {
      display: flex;
      .coin-name {
        margin-left: 10px;
        margin-right: 5px;
      }
      .icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        img {
          display: inline-block;
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .custom-icon {
      line-height: 24px;
    }
  }
}
</style>
