<template>
  <div class="select">
    <el-popover
      width="500"
      placement="bottom"
      :offset="1"
      trigger="click"
      :visible-arrow="true"
      v-model="popperShow"
    >
      <div class="popper-content">
        <div class="popper-input">
          <el-input
            :placeholder="$t('property.搜索')"
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
                item.coinId === legalTenderId ? '#f5f7fa' : '',
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
        <div v-else class="no-data">{{$t('property.暂无数据')}}</div>
      </div>
      <div slot="reference">
        <div class="select-value">
          <div class="left">
            <div class="icon">
              <img :src="iconImg" alt="" />
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
    iconUrl: {
      type: String,
      default: "",
    },
    coinName: {
      type: String,
      default: "",
    },
    coinId: {
      type: Number,
    },
  },
  data() {
    return {
      popperShow: false,
      searchVal: "",
      symbolList: this.coinList,
      symbolFilterList: this.coinList,
      legalTenderId: this.$route.params.coinId || this.coinId,
      convertAssetName: this.$route.params.coinName || this.coinName,
      iconImg: this.iconUrl,
    };
  },
  methods: {
    // 选中法币
    handleChoose(item) {
      this.$emit("selectedCoin", item);
      this.legalTenderId = item.coinId;
      this.convertAssetName = item.coinName;
      this.iconImg = item.iconUrl;
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
  width: 500px;
  height: 60px;
  box-shadow: 0px 2px 24px 0px rgba(0, 0, 28, 0.04);
  border-radius: 10px;
  border: 1px solid #f5f7fa;
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
}
::v-deep .el-input {
  padding: 0 20px;
  margin-bottom: 10px;
}
::v-deep .el-input__icon {
  padding-left: 25px;
}
</style>
