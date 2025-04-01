<template>
  <div class="contractpass">
    <my-modal :is-show.sync="isShow" useTheme width="width500">
      <template slot="header">
        <div class="left">
          <span class="title">{{ this.$t("contractPass.生成口令") }}</span>
          <i
            class="iconfont icon-history f20 ml10"
            :class="{ dark: getTheme == 'dark' }"
            @click="toHistory"
            v-if="isEdit"
          ></i>
        </div>
        <i class="iconfont icon-guanbi" @click="close"></i>
      </template>
      <template slot="content" v-if="isEdit">
        <info-module ref="info" @onInfo="onInfo"></info-module>
        <priceModule
          ref="price"
          @onPrice="onPrice"
          :type="marketType"
          :symbolInfo="symbolInfo"
        ></priceModule>
        <dateModule ref="date" @onDate="onDate"></dateModule>
      </template>
      <template slot="content" v-else>
        <div class="info df aic pb15">
          <span class="direction">{{ direction }}</span>
          <span class="positon">{{ positon }}</span>
          <span class="lever">{{ leverage }}</span>
          <span class="symbol">{{ symbol }}</span>
        </div>
        <ul v-if="infoList.length">
          <li
            class="df aic jb mt15"
            v-for="(item, index) in infoList"
            :key="index"
          >
            <span class="label">{{ item.label | translate }}</span>
            <span class="value">{{ item.value | translate }}</span>
          </li>
        </ul>
        <div
          class="result df aic"
          :class="{ dark: getTheme == 'dark' }"
          ref="password"
        >
          <p>
            {{
              $t(
                "contractPass.复制打开BSEXApp, 轻松交易。U本位合约，交易对，全仓，类型，方向",
                [_symbol, _margin, _type, direction]
              )
            }}
            <span>#{{ tradeToken }}</span>
          </p>
        </div>
      </template>
      <template slot="footer">
        <div class="btns">
          <my-button :disabled="disabled" @click="onSubmit">{{
            btntxt
          }}</my-button>
        </div>
      </template>
    </my-modal>
  </div>
</template>

<script>
import myModal from "@/components/my-modal";
import infoModule from "./info-module.vue";
import priceModule from "./price-module";
import dateModule from "./date-module";

import { mapGetters } from "vuex";

import { $setContractPass } from "@/api/contractTransaction";

export default {
  components: {
    infoModule,
    priceModule,
    dateModule,
    myModal,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      marketType: undefined,
      symbolList: [],
      symbolInfo: {},
      leverList: [],
      isEdit: true,
      submitParams: {},
      infoList: [],
      tradeToken: "",
    };
  },
  computed: {
    ...mapGetters(["getTheme"]),
    btntxt() {
      return this.isEdit
        ? this.$t("contractPass.生成口令")
        : this.$t("contractPass.复制口令");
    },
    direction() {
      return this.submitParams.direction == 1
        ? this.$t("contractPass.买入开多")
        : this.$t("contractPass.买入开空");
    },
    positon() {
      return this.submitParams.direction == 1
        ? this.$t("contractPass.多仓")
        : this.$t("contractPass.空仓");
    },
    leverage() {
      return this.submitParams.leverage + "X";
    },
    symbol() {
      return this.symbolInfo.label + " " + this.$t("lang_795");
    },
    _symbol() {
      return this.symbolInfo.label;
    },
    _margin() {
      return this.submitParams.marginType == 1
        ? this.$t("contractPass.全仓")
        : this.$t("contractPass.逐仓");
    },
    _type() {
      const obj = {
        1: "contractPass.计划委托",
        2: "contractPass.市价委托",
        3: "contractPass.限价委托",
      };
      return this.$t(obj[this.submitParams.entrustType]);
    },
    entrustValue() {
      if (this.submitParams.entrustType == 3) {
        return `${this.submitParams.price} USDT`;
      } else if (this.submitParams.entrustType == 2) {
        return this.$t("contractPass.最优市价");
      } else {
        return this.submitParams.marketValue == 1
          ? this.$t("contractPass.最优市价")
          : `${this.submitParams.price} USDT`;
      }
    },
    disabled() {
      // console.log("prompt111", this.submitParams);
      let flag = "";
      if (this.submitParams.entrustType == 1) {
        flag = this.submitParams?.price && this.submitParams?.triggerPrice;
      } else if (this.submitParams.entrustType == 2) {
        flag = true;
      } else {
        flag = this.submitParams?.price;
      }

      return !flag;
    },
  },
  watch: {
    isEdit(newValue) {
      this.infoList = [
        { label: "contractPass.交易类型", value: "contractPass.U本位合约" },
        {
          label: "contractPass.委托价格",
          value: this.entrustValue,
        },
        { label: "contractPass.数量", value: this.submitParams.amount + "%" },
        {
          label: "contractPass.类型",
          value: `${
            this.submitParams.marginType == 1
              ? this.$t("contractPass.全仓")
              : this.$t("contractPass.逐仓")
          }-${
            this.submitParams.entrustType == 3
              ? this.$t("contractPass.限价")
              : this.submitParams.entrustType == 2
              ? this.$t("contractPass.市价")
              : this.$t("contractPass.计划")
          }`,
        },
      ];
    },
  },
  methods: {
    toHistory() {
      this.close();
      this.$router.push("/passHistory");
    },
    close() {
      this.$emit("update:isShow", false);
      this.isEdit = true;
    },
    onInfo(param) {
      this.marketType = param.entrustType;
      this.symbolInfo = param.symbolInfo;
      this.submitParams = { ...this.submitParams, ...param };
      console.log('submitParams',this.submitParams);
    },
    onPrice(param) {
      this.submitParams = { ...this.submitParams, ...param };
    },
    onDate(param) {
      this.submitParams = { ...this.submitParams, ...param };
    },
    onCopy() {
      let txtDom = this.$refs.password;
      let txt = txtDom.innerText;

      this.$copyText(txt).then(
        () => {
          this.$message({
            message: this.$t("contractPass.复制成功"),
            type: "success",
          });
          setTimeout(() => {
            this.close();
          }, 1000);
        },
        () => {
          this.$message.error(this.$t("contractPass.复制失败"));
        }
      );
    },
    onSubmit() {
      if (this.isEdit) {
        const o = {
          3: 1,
          2: 2,
          1: this.submitParams.marketValue == 1 ? 7 : 5,
        };
        const params = {
          coinMarket: this.submitParams.symbolInfo.label,
          positionType: this.submitParams.marginType == 0 ? 1 : 0,
          leverTimes: this.submitParams.leverage,
          type: this.submitParams.direction,
          priceType: o[this.submitParams.entrustType],
          amountPrencent: this.submitParams.amount,
        };
        this.submitParams.triggerPrice && this.submitParams.entrustType == 1
          ? (params.triggerPrice = this.submitParams.triggerPrice * 1)
          : "";
        this.submitParams.price != "0.101"
          ? (params.entrustPrice = this.submitParams.price * 1)
          : "";
        this.submitParams.failureTimeMillis
          ? (params.failureTimeMillis = this.submitParams.failureTimeMillis)
          : "";

        console.log("parmas", params);

        $setContractPass(params).then((res) => {
          if (res.data.success) {
            this.tradeToken = res.data.data.tradeToken;
            this.isEdit = false;
          }
        });
      } else {
        this.onCopy();
      }
    },
  },
  mounted() {},
};
</script>
<style lang="scss">
.my-modal {
  z-index: 2000 !important;
}
</style>

<style lang="scss" scoped>
.dark {
  color: #fff !important;
}

.info {
  color: var(--main-text-color);
  span {
    margin-right: 10px;
    font-size: 14px;
    white-space: nowrap;
  }
  .direction {
    color: var(--theme-color);
  }
}
ul {
  li {
    font-size: 14px;
    color: #96a2b2;
    .value {
      color: var(--main-text-color);
    }
  }
}
.result {
  margin-top: 15px;
  min-height: 80px;
  padding: 10px 15px;
  font-size: 14px;
  color: var(--main-text-color);
  background: linear-gradient(135deg, #f5fffb 0%, #dbf9f0 100%);
  border-radius: 6px;
  p {
    span {
      text-decoration: underline;
    }
  }
  &.dark {
    background: #343434;
  }
}
.btns {
  .my-button {
    width: 100% !important;
    flex: 1;
  }
}
</style>
