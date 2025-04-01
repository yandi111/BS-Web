<template>
  <div class="main">
    <div class="select">
      <div class="left">
        <el-input
          ref="inputRef"
          placeholder="0.00"
          :value="value"
          @input="(value) => formatDecimal(value, decimalPlaces)"
        ></el-input>
      </div>
      <div class="right" @click="onSelect">
        <div><img :src="iconUrl" alt="" /></div>
        <div class="coinName">{{ coinName }}</div>
        <div>
          <i v-show="!show" class="el-icon-arrow-down"></i>
          <i v-show="show" class="el-icon-arrow-up"></i>
        </div>
      </div>
    </div>
    <div class="search" v-show="show">
      <div class="search-box">
        <div>
          <el-input
            :placeholder="$t('property.搜索')"
            prefix-icon="el-icon-search"
            v-model="searchVal"
            @input="(e) => filterLegalTender(e)"
          >
          </el-input>
        </div>
      </div>
      <div class="search-list">
        <div
          class="search-item"
          v-for="(item, index) in symbolFilterList"
          :key="index"
          @click.stop="chooseItem(item)"
        >
          <img :src="item.iconUrl" alt="" />
          <span>{{ item.coinName }}</span>
        </div>
        <div class="no-data" v-if="!symbolFilterList.length">
          <span>{{$t('property.暂无数据')}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "coinSelect",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    coinName: {
      type: String,
      default: "",
    },
    iconUrl: {
      type: String,
      default: "",
    },
    source: {
      type: String,
      default: "",
    },
    decimalPlaces: {
      type: Number, //精度
      default: null,
    },
    value: {
      type: [String, Number],
      default: Number,
    },
  },
  data() {
    return {
      show: false,
      searchVal: "",
      symbolList: this.list,
      symbolFilterList: [],
    };
  },
  mounted(){
    addEventListener('click',()=>{
      this.isShow()
    })
  },
  methods: {
    chooseItem(item) {
      this.show = false;
      this.$emit("handleChoose", { source: this.source, ...item });
    },
    // 搜索
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
    onSelect() {
      this.show = !this.show;
      if (this.show) {
        this.symbolFilterList = JSON.parse(JSON.stringify(this.list));
      }
      this.$emit("onSelect", this.source);
    },
    isShow() {
      this.show = false;
      this.searchVal = "";
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
      this.$emit("onChange", str);
    },
    //获取聚焦方法
    getFocus() {
      this.$refs.inputRef.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
.main {
  width: 100%;
  .select {
    display: flex;
    padding: 0 20px;
    .left {
      flex: 1;
      ::v-deep   .el-input__inner {
        border: none;
        padding: 0;
      }
    }
    .right {
      min-width: 80px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      color: #333;
      cursor: pointer;
      img {
        width: 24px;
        height: 24px;
        display: inline-block;
      }
      .coinName {
      }
    }
  }
  .search {
    z-index: 999;
    width: 100%;
    position: absolute;
    top: 109px;
    left: 0;
    width: 500px;
    height: 310px;
    background: #ffffff;
    box-shadow: 0px 1px 4px 0px rgba(206, 215, 255, 0.6);
    border-radius: 12px;
    overflow-y: scroll;
    .search-box {
      width: 100%;
      margin-top: 20px;
      display: flex;
      justify-content: center;
      div {
        width: 460px;
      }
    }
    .search-list {
      margin-top: 10px;
      padding-bottom: 10px;
      .search-item {
        width: 100%;
        height: 40px;
        display: flex;
        align-items: center;
        padding-left: 20px;
        font-size: 14px;
        color: #333;
        cursor: pointer;
        img {
          width: 24px;
          height: 24px;
          display: inline-block;
          vertical-align: middle;
          margin-right: 5px;
        }
        &:hover {
          background: #f5f7fa;
        }
      }
      .item-active {
        background: #f5f7fa;
      }
      .no-data {
        margin-top: 20px;
        display: flex;
        justify-content: center;
      }
    }
  }
}
</style>
