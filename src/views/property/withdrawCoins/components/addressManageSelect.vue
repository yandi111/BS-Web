<template>
  <div class="select">
    <el-popover
      placement="bottom"
      width="550"
      :offset="1"
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
        <div v-else class="no-data">{{$t('property.暂无数据')}}</div>
      </div>
      <div slot="reference">
        <div class="select-value">
          <div class="left">
            <div class="icon">
              <img v-if="iconUrl" :src="iconUrl" alt="" />
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
import { simpleApi } from "@/api/assetWallet";
export default {
  name: "DepositSelect",
  data() {
    return {
      popperShow: false,
      searchVal: "",
      legalTenderId: null,
      convertAssetName: "",
      iconUrl: "",
      tempData: [],
      coinId: "", //币种id
      symbolList: [],
      symbolFilterList: [],
    };
  },
  created() {
    this.getCoinList();
  },
  methods: {
    // 选中法币
    handleChoose(item) {
      this.legalTenderId = item.coinId;
      this.convertAssetName = item.coinName;
      this.iconUrl = item.iconUrl;
      this.coinId = item.coinId;
      this.$emit("getCoinId", item.coinId);
      this.$emit("getCoinName", item.coinName);
      this.$emit("getIconUrl", item.iconUrl);
      this.popperShow = false;
    },
    // 查询币种列表
    getCoinList() {
      simpleApi({
        isType: 3,
      }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.symbolList = res.data.data || [];
            this.symbolFilterList = res.data.data || [];
            // 默认选中第一条数据的coinId
            this.coinId = this.symbolList[0].coinId;
            this.legalTenderId = this.symbolList[0].coinId;
            this.iconUrl = this.symbolList[0].iconUrl;
            this.$emit("defaultCoinId", this.coinId);
            this.$emit("defaultIconUrl", this.iconUrl);
            //搜索功能
            this.convertAssetName = this.symbolList[0].coinName;
            this.$emit("getDefaultCoinName", this.convertAssetName);
          }
        }
      });
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
  width: 550px;
  height: 45px;
  background: #ffffff;
  border-radius: 6px;
  border: 1px solid #e1e1e1;
  .select-value {
    margin-right: 16px;
    display: flex;
    justify-content: space-between;
    cursor: pointer;

    .left {
      display: flex;
      align-items: center;
      .coin-name {
        margin-left: 10px;
      }
      .icon {
        width: 24px;
        height: 24px;
        margin-left: 10px;
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
      line-height: 45px;
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
