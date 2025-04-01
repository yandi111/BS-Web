<template>
  <div class="select">
    <el-popover
      placement="bottom"
      width="500"
      :offset="2"
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
              'background-color':
                item.coinId === legalTenderId ? '#EDF1FF' : '',
            }"
          >
            <div
              style="
                display: inline-block;
                width: 25px;
                height: 25px;
                line-height: 25px;
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
              <img v-if="symbolUrl" :src="symbolUrl" alt="" />
            </div>
            <div class="coin-name">{{ convertAssetName }}</div>
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
    <div class="tag">
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
  name: "InternalWithdrawSelect",
  props: {
    coinList: {
      type: Array,
      default: () => {
        return [];
      },
    },
    coinId: {
      type: Number,
    },
    iconUrl: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      popperShow: false,
      searchVal: "",
      legalTenderId: this.$route.params.coinId || this.coinId,
      convertAssetName:
        this.$route.params.coinName || this.coinList[0].coinName,

      tempData: [],
      symbolList: this.coinList,
      symbolFilterList: this.coinList,
      hotSymbolList: [],
      symbolUrl: this.iconUrl,
    };
  },
  created() {
    this.symbolListFn();
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
    // 选中法币
    handleChoose(item) {
      this.legalTenderId = item.coinId;
      this.convertAssetName = item.coinName;
      this.symbolUrl = item.iconUrl;
      this.$emit("getCoinId", this.coinId);
      this.$emit("getIconUrl", this.iconUrl);
      this.$emit("internalChoose", item);
      this.popperShow = false;
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
.select {
  margin-bottom: 50px;
  width: 500px;
  height: 60px;
  background: #ffffff;
  box-shadow: 0px 2px 6px 0px rgba(206, 215, 255, 0.6);
  border-radius: 12px;
  border: 1px solid #e1e1e1;
  .select-value {
    margin: 14px 20px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    .left {
      display: flex;
      line-height: 32px;
      .coin-name {
        margin-left: 10px;
      }
      .icon {
        width: 32px;
        height: 32px;
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
      line-height: 32px;
    }
  }
  .tag {
    display: flex;
    p {
      width: 60px;
      height: 35px;
      line-height: 35px;
      text-align: center;
      background: #e7e7e7;
      border-radius: 6px;
      margin-right: 20px;
      font-size: 16px;
      color: #333;
      margin-top: 10px;
      cursor: pointer;
    }
  }
}
::v-deep  .el-input {
  padding: 0 20px;
  margin-bottom: 10px;
}
::v-deep  .el-input__icon {
  padding-left: 25px;
}
</style>
