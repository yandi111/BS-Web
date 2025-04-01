<template>
  <div class="layout">
    <div class="header">
      <div class="header-icon">
        <i class="el-icon-arrow-left" @click="handleBack"></i>
      </div>
      <div
        class="header-select"
        @mouseenter="mouseenter"
        @mouseleave="mouseleave"
      >
        <div class="select-text">{{ chooseText }} {{ $t("rules.永续") }}</div>
        <div class="select-icon">
          <i v-if="!isShow" class="el-icon-caret-bottom"></i>
          <i v-else class="el-icon-caret-top"></i>
        </div>
        <search-select
          ref="searchRef"
          :show.sync="isShow"
          :list="symbolList"
          :id="activeId"
          @handleSearch="handleSearch"
          @handleChoose="handleChoose"
        ></search-select>
      </div>
    </div>
    <div class="content">
      <div class="content-item" v-for="(item, index) in dataList" :key="index">
        <div class="title">
          <span>{{ $t("rules.档位") }}</span> {{ item.gear }}
        </div>
        <div>
          <el-row>
            <el-col :span="12"
              ><div>{{ $t("contract.张") }}</div></el-col
            >
            <el-col :span="12"
              ><div>
                {{ item.minPositionAmount }} ~ {{ item.maxPositionAmount }}
              </div></el-col
            >
          </el-row>
          <el-row class="pad">
            <el-col :span="12"
              ><div>{{ $t("rules.最大杠杆倍数") }}</div></el-col
            >
            <el-col :span="12"
              ><div>{{ item.maximumLeverage }}</div></el-col
            >
          </el-row>
          <el-row class="pad">
            <el-col :span="12"
              ><div>{{ $t("rules.维持保证金比率") }}</div></el-col
            >
            <el-col :span="12"
              ><div>{{ item.maintenanceMarginRatio }}%</div></el-col
            >
          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelect from "../components/searchSelect.vue";
import {
  symbolListApi,
  gearinfoApi,
  appSymbolList,
} from "@/api/contractTransaction";
export default {
  name: "LeverageMargin",
  components: {
    SearchSelect,
  },
  data() {
    return {
      isShow: false,
      chooseText: "",
      symbolList: [],
      symbolSearchList: [],
      activeId: null,
      symbols: "", //交易对参数
      dataList: [],
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    mouseenter() {
      this.isShow = true;
      this.handleSearch();
    },
    mouseleave() {
      this.isShow = false;
      this.$refs.searchRef.initVal();
    },
    handleChoose(row) {
      this.chooseText = row.symbolKey;
      this.symbols = row.symbolCode;
      // this.gearinfoList();
      this.getAppSymbolList();
    },
    init() {
      this.getSymbolList();
    },
    getSymbolList() {
      symbolListApi().then((res) => {
        if (res.status === 200) {
          const { data } = res.data;
          data.forEach((item) => {
            item.symbolKey = item.symbolKey.toUpperCase();
          });
          this.symbolList = this.symbolList.concat(data);
          this.symbolSearchList = this.symbolList;
          this.activeId = this.symbolList[0].id;
          this.chooseText = this.symbolList[0].symbolKey;
          this.symbols = this.symbolList[0].symbolCode;
          // this.gearinfoList();
          this.getAppSymbolList();
        }
      });
    },
    // 交易对杠杆信息查询
    // gearinfoList() {
    //   gearinfoApi({
    //     coinMarket: this.symbols,
    //   }).then((res) => {
    //     if (res.status === 200) {
    //       this.dataList = res.data.data
    //     }
    //   });
    // },

    // APP端查询交易对杠杆信息
    getAppSymbolList() {
      appSymbolList({ coinMarket: this.symbols }).then((res) => {
        if (res.status === 200) {
          this.dataList = res.data.data;
        }
      });
    },

    //搜索
    handleSearch(val) {
      let dataArr = [];
      let searchVal = val && val.toUpperCase().trim();
      if (searchVal) {
        this.symbolSearchList.filter((item) => {
          if (item.symbolKey.indexOf(searchVal) != -1) {
            dataArr.push(item);
          }
        });
      } else {
        dataArr = this.symbolSearchList;
      }
      this.symbolList = dataArr;
    },
    handleBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  color: var(--main-text-color);
  .header {
    width: 100%;
    padding: 30px 0 0 75px;
    display: flex;
    align-items: center;
    .header-icon {
      .el-icon-arrow-left {
        cursor: pointer;
        font-size: 20px;
      }
    }
    .header-select {
      position: relative;
      margin-left: 9px;
      display: flex;
      cursor: pointer;
      .select-text {
        font-size: 30px;
      }
      .select-icon {
        display: flex;
        align-items: center;
        margin-left: 10px;
        .el-icon-caret-bottom {
          font-size: 20px;
        }
        .el-icon-caret-top {
          font-size: 20px;
        }
      }
    }
  }
  .content {
    width: 100%;
    height: 100%;
    padding: 60px 0 60px 110px;
    overflow-y: scroll;
    &::-webkit-scrollbar {
      width: 5px;
    }
    &::-webkit-scrollbar-track-piece {
      background-color: var(--select-bg);
      border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb {
      background-color: rgba($color: #e1e1e1, $alpha: 0.2);
      border-radius: 3px;
    }
    .content-item {
      margin-bottom: 30px;
      .title {
        font-size: 18px;
        margin-bottom: 10px;
        color: var(--main-text-color);
      }
      font-size: 14px;
      color: #96a2b2;
      .pad {
        padding-top: 5px;
      }
    }
  }
}
</style>
