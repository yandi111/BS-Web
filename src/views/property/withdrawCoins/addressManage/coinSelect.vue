<template>
  <div class="select">
    <div class="header" :class="show ? 'header-active' : ''" @click.stop="open">
      <div class="left">
        <img :class="coinImg ? 'coinImg' : 'icon'" :src="coinUrl" alt="" />
        <span>{{ coinName }}</span>
      </div>
      <div class="right">
        <i class="el-icon-arrow-down" v-show="!show"></i>
        <i class="el-icon-arrow-up" v-show="show"></i>
      </div>
    </div>
    <div class="content" v-show="show" @click.stop>
      <div class="search container">
        <el-input
          :placeholder="$t('property.搜索')"
          prefix-icon="el-icon-search"
          v-model="search"
          @input="(e) => filterLegalTender(e)"
        >
        </el-input>
      </div>
      <div class="item-box">
        <div
          class="item"
          v-for="(item, index) in symbolFilterList"
          :key="index"
          @click.stop="chooseItem(item)"
        >
          <img :src="item.iconUrl" alt="" />
          <span>{{ item.coinName }}</span>
        </div>
        <div class="no-data" v-if="!symbolFilterList.length">{{$t('property.暂无数据')}}</div>
      </div>
    </div>
    <div class="tag" v-if="isHot">
      <p
        @click="addTag(item.coinName)"
        v-for="(item, index) in hotSymbolList"
        :key="index"
      >
        {{ item.coinName }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "CoinSelect",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    isHot: {
      type: Boolean,
      default: false,
    },
    coinImg: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      show: false,
      search: "",
      coinName: "",
      coinUrl: "",
      symbolList: this.list,
      symbolFilterList: this.list,
      hotSymbolList: [],
    };
  },
  created() {
    document.addEventListener("click", () => {
      this.show = false;
    });
    this.symbolListFn();
  },
  mounted() {
    this.coinName = this.list[0].coinName;
    this.coinUrl = this.list[0].iconUrl;
  },
  methods: {
    //热门法币
    symbolListFn() {
      const hotSymbol = [];
      this.symbolList.forEach((item) => {
        if (item.hot === 1) {
          hotSymbol.push(item);
        }
      });
      this.hotSymbolList = hotSymbol;
    },
    addTag(val) {
      this.$emit("onAddTag", val);
    },
    open() {
      this.show = !this.show;
      this.initVal();
    },
    chooseItem(item) {
      this.coinName = item.coinName;
      this.coinUrl = item.iconUrl;
      this.$emit("selectedCoin", item);
      this.show = false;
    },
    showFn() {
      this.show = false;
      this.initVal();
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
    initVal() {
      this.search = "";
      this.filterLegalTender();
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  width: 100%;
  height: 100%;
  color: #333;
  font-size: 16px;
  .header {
    height: 45px;
    display: flex;
    justify-content: space-between;
    padding: 0 10px 0 20px;
    cursor: pointer;
    height: 45px;
    border-radius: 6px;
    border: 1px solid #f4f5f7;
    .left {
      display: flex;
      align-items: center;
      .icon {
        width: 32px;
        height: 32px;
        margin-right: 5px;
        display: inline-block;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .el-icon-arrow-down{
        font-size: 14px;
        color: #C0C4CC;
      }
      .el-icon-arrow-up{
        font-size: 14px;
        color: #C0C4CC;
      }
    }
  }
  .header-active {
    border: 1px solid #90ff00;
  }
  .content {
    width: 100%;
    position: absolute;
    top: 66px;
    left: 0;
    background: #ffffff;
    border-radius: 12px;
    border: 1px solid #f5f7fa;
    padding-bottom: 10px;
    z-index: 999;
    .search {
      margin-top: 20px;
      margin-bottom: 10px;
    }
    .item-box {
      height: 200px;
      overflow-y: scroll;
      .item {
        height: 40px;
        padding: 0 20px;
        display: flex;
        align-items: center;
        cursor: pointer;
        &:hover {
          background: #f5f7fa;
        }
        img {
          width: 24px;
          height: 24px;
          margin-right: 5px;
          display: inline-block;
        }
        span {
          display: inline-block;
        }
      }
      .no-data {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #666;
      }
    }
  }

  .tag {
    display: flex;
    p {
      width: 60px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      background: #f5f7fa;
      border-radius: 6px;
      margin-right: 20px;
      font-size: 16px;
      color: #333;
      margin-top: 10px;
      cursor: pointer;
    }
  }
  .coinImg {
    width: 24px;
    height: 24px;
    margin-right: 5px;
    display: inline-block;
  }
  .container {
    margin: 0 20px;
  }
}
</style>