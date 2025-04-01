<template>
  <div class="info-module">
    <div
      class="cell df aic jb"
      v-for="(item, index) in infoData"
      :key="index"
    >
      <span class="label">{{ item.label | translate }}</span>
      <div class="value pr30" v-if="!item.select">
        {{ item.value | translate }}
      </div>
      <div class="value" v-else>
        <mySelect
          :options="item?.option"
          v-model="item.value"
          autoWidth
          v-if="item.option?.length"
          :search="item.search"
          :hasInput="item.hasInput"
        />
      </div>
    </div>
  </div>
</template>

<script>
import mySelect from "@/components/my-select/my-select.vue";
import { mapState } from "vuex";
import { symbolListApi, $getLevergeonCal } from "@/api/contractTransaction";
export default {
  components: {
    mySelect,
  },
  data() {
    return {
      infoData: [
        {
          label: "lang_1159",
          select: false,
          value: "lang_1170",
          option: null,
        },
        {
          label: "lang_1189",
          select: true,
          value: "btcusdt",
          search: true,
          option: [
            // { label: "BTC/USDT", value: "btcusdt" },
            // { label: "ETH/USDT", value: "ethusdt" },
            // { label: "TXR/USDT", value: "txrusdt" },
          ],
        },
        {
          label: "lang_1265",
          select: true,
          value: 1,
          option: [
            { label: "lang_1345", value: 1 },
            { label: "lang_2156", value: 2 },
          ],
        },
        {
          label: "lang_892",
          select: true,
          value: 1,
          hasInput: true,
          option: [
            { label: "1X", value: 1 },
            { label: "25X", value: 25 },
            { label: "50X", value: 50 },
            { label: "75X", value: 75 },
            { label: "100X", value: 100 },
            { label: "125X", value: 125 },
          ],
        },
        {
          label: "lang_1267",
          select: true,
          value: 1,
          option: [
            { label: "lang_1340", value: 1 },
            { label: "lang_1342 ", value: 2 },
          ],
        },
        {
          label: "lang_1164",
          select: true,
          value: 3,
          option: [
            { label: "lang_1269", value: 3 },
            { label: "lang_1270", value: 2 },
            { label: "lang_1271", value: 1 },
          ],
        },
      ],
    };
  },
  methods: {
    getSymbolList() {
      symbolListApi().then((res) => {
        const symbolList = res.data.data.map((item) => {
          return {
            id: item.id,
            label: item.symbolCode,
            value: item.symbolKey,
            faceValue: item.faceValue,
            coinId: item.baseAssetId,
            priceDecimal: item.priceDecimal,
            keepMarginRate: item.keepMarginRate,
            openTakerFee: item.openTakerFee,
          };
        });
        this.infoData[1].option = symbolList;
      });
    },
    getLevergeonCal(coinMarket) {
      $getLevergeonCal({ coinMarket }).then((res) => {
        const lever = res.data.data[0]?.maximumLeverage;
        let arr = [
          {
            label: "1X",
            value: 1,
          },
        ];
        let num = 5;
        let d = lever / num;
        for (let i = 1; i <= num; i++) {
          //等差数列 第n项
          let an = d + d * (i - 1);
          arr.push({ label: an + "X", value: an });
        }
        this.infoData[3].option = arr;
      });
    },
    sendParams(data) {
      const symbolInfo = data[1].option.filter(
        (item) => item.value == data[1].value
      )[0];

      const param = {
        symbolInfo,
        marginType: data[2].value,
        leverage: data[3].value,
        direction: data[4].value,
        entrustType: data[5].value,
      };
      this.$emit("onInfo", param);
    },
  },
  computed: {
    ...mapState(["setting"]),
  },
  watch: {
    "setting.currentMarket": {
      handler(newValue) {
        const arr = newValue.split("/");
        const symbol = arr[0].toLowerCase() + arr[1].toLowerCase();
        this.infoData[1].value = symbol;
      },
      immediate: true,
    },
    infoData: {
      handler(data) {
        this.sendParams(data);
      },
      deep: true,
      // immediate: true,
    },
    "infoData.1.value"(newValue) {
      const current = this.infoData[1].option.filter((item) => {
        return item.value == newValue;
      })[0];
      this.getLevergeonCal(current.label);
    },
  },
  mounted() {
    this.getSymbolList();
  },
};
</script>

<style lang="scss" scoped>
.info-module {
  .cell {
    font-size: 14px;
    // height: 30px;
    margin-bottom: 10px;
    .label {
      color: #96a2b2;
    }
    .value {
      color: var(--main-text-color);
      ::v-deep .selectBox {
        .select {
          border: none;
          input {
            text-align: right;
            padding-right: 10px;
            background-color: var(--pop-bg);
          }
          i {
            font-size: 22px;
            color: #8992a6;
            &::before {
              font-family: "iconfont";
              content: "\e606";
            }
          }
        }
        .listbox {
          background-color: var(--pass-selectbox-bg) !important;
        }
      }
    }
  }
}
</style>
