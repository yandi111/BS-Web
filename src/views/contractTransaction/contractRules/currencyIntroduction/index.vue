<template>
  <div class="layout" :class="{ dark: getTheme == 'dark' }">
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
      <div class="point">
        <div class="point-t">
          <i class="el-icon-warning-outline"></i
          ><span>{{
            $t(
              "rules.数据由平台提供，仅供参考。所有信息均按现状显示，不作为任何形式的代表或担保。"
            )
          }}</span>
        </div>
        <div
          class="point-b pointer"
          @click="$router.push('/information/compliance?params=6')"
        >
          {{ $t("rules.请参考风险提示。") }}
        </div>
      </div>
      <div class="info">
        <el-row class="info-title">
          <el-col :span="12">
            <div class="info-left">
              <img :src="symbolDetail.iconUrl" alt="" />
              <span class="info-coin">{{ symbolDetail.englishDesc }}</span>
              <span class="info-coinName">{{ symbolDetail.coinName }}</span>
            </div>
          </el-col>
          <el-col :span="12">{{ symbolDetail.ranking?'No.' + symbolDetail.ranking : '' }}</el-col>
        </el-row>
        <el-row class="info-content">
          <el-col :span="12">
            <div class="label">{{ $t("rules.市值") }}</div>
          </el-col>
          <el-col :span="12">
            <div class="value">{{ symbolDetail.marketValue }}</div>
          </el-col>
        </el-row>
        <el-row class="info-content pad">
          <el-col :span="12">
            <div class="label">{{ $t("rules.流通数量") }}</div>
          </el-col>
          <el-col :span="12">
            <div class="value">{{ symbolDetail.totalCirculation }}</div>
          </el-col>
        </el-row>
        <el-row class="info-content pad">
          <el-col :span="12">
            <div class="label">{{ $t("rules.最大供应量") }}</div>
          </el-col>
          <el-col :span="12">
            <div class="value">{{ symbolDetail.totalIssuance }}</div>
          </el-col>
        </el-row>
        <el-row class="info-content pad">
          <el-col :span="12">
            <div class="label">{{ $t("rules.总供应量") }}</div>
          </el-col>
          <el-col :span="12">
            <div class="value">{{ symbolDetail.totalIssuance }}</div>
          </el-col>
        </el-row>
        <el-row class="info-content pad">
          <el-col :span="12">
            <div class="label">{{ $t("rules.发行日期") }}</div>
          </el-col>
          <el-col :span="12">
            <div class="value">{{ symbolDetail.publishTime }}</div>
          </el-col>
        </el-row>
        <el-row class="info-content pad">
          <el-col :span="12">
            <div class="label">{{ $t("rules.发行价") }}</div>
          </el-col>
          <el-col :span="12">
            <div class="value">{{ symbolDetail.issuePrice }}</div>
          </el-col>
        </el-row>
        <el-row class="info-content pad">
          <el-col :span="12">
            <div class="label">{{ $t("rules.区块链浏览器") }}</div>
          </el-col>
          <el-col :span="12">
            <div class="value link" @click="onLink">
              {{ symbolDetail.blockchainBrowser }}
            </div>
          </el-col>
        </el-row>
        <div class="info-title2">{{ $t("rules.币种简介") }}</div>
        <el-row>
          <el-col :span="18">
            <div class="coin_info">
              {{ symbolDetail.coinIntroduction }}
            </div></el-col
          >
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import SearchSelect from "../components/searchSelect.vue";
import { symbolListApi, coinInfo } from "@/api/contractTransaction";
import { mapGetters } from "vuex";
export default {
  name: "CurrencyIntroduction",
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
      coinId: null,
      symbolDetail: {},
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    ...mapGetters(["getTheme"]),
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
      this.coinId = row.baseAssetId;
      this.getCoinInfo();
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
          this.coinId = this.symbolList[0].baseAssetId;
          this.getCoinInfo();
        }
      });
    },
    //查询币种详情
    getCoinInfo() {
      let lang = this.$i18n.locale;
      const obj = {
        cn: "coinIntroduction",
        en: "coinIntroductionEnglish",
        tw: "coinIntroductionTw",
      };

      coinInfo({ coinId: this.coinId }).then((res) => {
        if (res.status === 200) {
          this.symbolDetail = [res.data.data].map((item) => {
            return {
              ...item,
              coinIntroduction: item[obj[lang]],
            };
          })[0];
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
    onLink(e) {
      let url = e.target.innerText.includes("http")
        ? e.target.innerText
        : "https://" + e.target.innerText;
      window.open(url);
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
    padding: 30px 80px 0 112px;
    .point {
      height: 90px;
      background: #f4f5f7;
      border-radius: 15px;
      font-size: 14px;
      display: flex;
      justify-content: center;
      flex-direction: column;
      .point-t {
        margin-left: 20px;
        .el-icon-warning-outline {
          color: var(--theme-color);
        }
        span {
          padding-left: 10px;
        }
      }
      .point-b {
        margin-left: 43px;
        color: var(--theme-color);
      }
    }
    .info {
      margin-top: 40px;
      font-size: 14px;
      color: var(--main-text-color);

      .info-title {
        margin-bottom: 30px;
        .info-left {
          display: flex;
          align-items: center;
          .info-coin {
            padding: 0 5px;
          }
          .info-coinName {
            color: #96a2b2;
          }
          img {
            width: 24px;
            height: 24px;
            display: inline-block;
          }
        }
      }
      .info-title2 {
        color: #96a2b2;
        margin: 15px 0;
      }
      .info-content {
        .label {
          color: #96a2b2;
        }
        .value {
          color: #00082d;
          &.link {
            color: var(--theme-color);
            cursor: pointer;
          }
        }
      }
    }
    .pad {
      padding-top: 10px;
    }
  }
  &.dark {
    .point {
      background-color: #333333;
    }
    .info {
      .info-content {
        .value {
          color: #fff;
        }
      }
    }
  }
}
</style>
