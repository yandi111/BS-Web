<template>
  <div class="main" style="
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    ">
    <div :style="{ height: '100%', width: '50%' }">
      <echartsDom ref="echartsDom" :options="option" :classList="true"
        :styles="{ height: '100%', width: '100%', right: '-20px', zIndex: 1 }" />
    </div>
    <div :style="{ height: '100%', width: '50%' }">
      <echartsDom ref="echartsDom2" :options="option2" />
    </div>

  </div>
</template>

<script>
import * as echarts from "echarts";
import { depthMapApi } from "@/api/contractTransaction";
import { webSocketMixin } from "./depthSocket";
import echartsDom from "@/components/echartsDom";
import { mapGetters, mapState } from "vuex";

export default {
  name: "depthMap",
  mixins: [webSocketMixin],
  components: {
    // DepthMap,
    echartsDom,
  },
  props: {
    contractType: {
      type: Boolean,
      default: true
    },
    coinInfo: {
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {
      theme: "",
      chart: null,
      depthNum:0,
      bidsData: Array(30).fill(null),
      asksData: Array(30).fill(null),
      option: { series: [] },
      option2: { series: [] },
    };
  },
  watch: {
    getTheme: {
      handler (val) {
        this.theme = val;
        this.$nextTick(() => {
          if (this.option.series.length > 0) {
            this.option.series[0].areaStyle.color =
              this.theme == "light" ? "#E5F8F2" : "#091712";
            this.option2.series[0].areaStyle.color =
              this.theme == "light" ? "#FCE5E8" : "#2E0D12";
          }
        });
      },
      immediate: true,
      deep: true,
    },
    coinInfo: {
      handler (val) {
        this.$nextTick(() => {
          // this.websockClose()
          this.getDepthList();
        });
      },
      immediate: true,
      deep: true,
    },
    spotSelectNum(v){

      this.depthNum= this.contractType ? this.contractSelectNum :v

            this.websockOpen()
    },
    contractSelectNum(v){

      this.depthNum= this.contractType ? v :this.spotSelectNum

      this.websockOpen()
    }
  },
  computed: {
    ...mapGetters(["getTheme"]),
    ...mapState({
      spotCoinInfo: ({ spots }) => spots.spotCoinInfo,
      spotSelectNum: ({ setting }) => setting.SpotSelectNum,
      contractSelectNum: ({ setting }) => setting.contractSelectNum,
    }),
  },
  mounted () {
    this.depthNum= this.contractType ? this.contractSelectNum :this.spotSelectNum
  },
  beforeDestroy () {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    // socket 推送
    websockOpen (e) {
      const self = this;
      // const that = this;
      if (this.websockTime) {
        clearInterval(this.websockTime);
      }
      this.isWebsock = true;
      self.websockSend("depthMap");
    },
    formatNumberWithUnit (number) {
      if (!number) {
        return 0
      }
      if (number >= 1000000) {
        return (
          (number / 1000000)?.toFixed(2)?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") +
          "M"
        );
      } else if (number >= 1000) {
        return (
          (number / 1000)?.toFixed(2)?.replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "K"
        );
      } else {

        return number?.toString();
      }
    },

    //深度图数据
    async getDepthList () {
      let self = this;
      const { icon, symbol, marketType } = this.coinInfo
      const res = await depthMapApi({
        marketType: marketType,
        symbol: symbol,
      });
      const resp = res.data;
      if (resp.code == 1) {
        const { bids, asks } = resp.data;
        var buyData = this.completeData(bids, 24, 'high',false);
        var sellData = this.completeData(asks, 24, 'high',true);
        const bidsData = buyData.map((item, index) => index == 0 ? [null, 0, item] : [item?.price, item?.high, item])
        const asksData = sellData.map((item, index) => index == 0 ? [null, item?.high, item] : [item?.price, item?.high, item])


        this.bidsData = bidsData
        this.asksData = asksData.reverse()

        this.option = {
          animation: false,
          animationThreshold: 10,
          tooltip: {
            trigger: "axis",
            formatter: (params, ticket) => {
              return `
              <div > 
              <div style="
              color: var(--main-text-color); 
              font-family:'Public Sans';
              font-weight: 500;
              line-height: 24px;
              letter-spacing: -0.02em;">委托价格: <span style="color:var(--main-text-color)"> ${this.formatNumberWithUnit(
                  params[0]?.data[2]?.price
                )}</span> </div>
              <div style="  
              font-family:'Public Sans';
              font-weight: 500;
              line-height: 24px;
              color: var(--main-text-color);
              letter-spacing: -0.02em;">累计挂单:  <span style="color:var(--main-text-color)">${this.formatNumberWithUnit(
                  params[0]?.data[2]?.num
                )}</span> </div>
              </div>`;
            },
            borderColor: "var(--gap-bg)",
            backgroundColor: "var(--gap-bg)",
            confine: true,
          },
          xAxis: {
            type: "category",
            boundaryGap: false, 
            max: 'dataMax',
            inverse: true,
            // data: data
          },
          yAxis: [
            {
              type: "value",
              show: false,
            },
          ],
          grid: {
            top: "50px",
            left: "20px",
            right: "0px",

            bottom: "50px",
          },
          series: [
            {
              data: this.bidsData,
              type: "line",
              name: "买",
              // smooth: true,
              color: "#90ff00",
              symbol: "none",
              emphasis: {
                disabled: true,
              },
              areaStyle: {
                color: this.theme == "light" ? "#E5F8F2" : "#091712",
              },
            },
          ],
        };
        this.option2 = {
          animationDurationUpdate: 1000000,
          animation: false,
          animationThreshold: 10,
          tooltip: {
            trigger: "axis",
            formatter: (params, ticket) => {

              return `
              <div > 
              <div style=" 
              color: var(--main-text-color); 
              font-family:'Public Sans';
              font-weight: 500;
              line-height: 24px;
              letter-spacing: -0.02em;">委托价格: <span style="color:var(--main-text-color)"> ${this.formatNumberWithUnit(
                params[0]?.data[2]?.price
              )}</span> </div>
              <div style="  
              font-family:'Public Sans';
              font-weight: 500;
              line-height: 24px;
              color: var(--main-text-color);
              letter-spacing: -0.02em;">累计挂单:  <span style="color:var(--main-text-color)">${this.formatNumberWithUnit(
                params[0]?.data[2]?.num
              )}</span> </div>
              </div>`;
            },
            borderColor: "var(--gap-bg)",
            backgroundColor: "var(--gap-bg)",
          },
          xAxis: {
            type: "category",
            boundaryGap: false,
            max: 'dataMax',
            splitNumber: 4,

            splitLine: {
              show: false,
              // interval: (inde, value) => {

              //   return value == bidsData[0][0];
              // },
            },
          },
          yAxis: [
            {
              type: "value",
              position: "right",
              axisLabel: {
                inside: true,
                showMinLabel: false,
                formatter: (value) => {
                  return this.formatNumberWithUnit(value);
                },
              },
              axisTick: {
                inside: true,
              },
              splitLine: {
                show: false,
              },

            },
          ],
          grid: {
            top: "50px",
            left: "-30px",
            right: "0px",
            bottom: "50px",
          },
          series: [
            {
              name: "卖",
              data: this.asksData,
              type: "line",
              // smooth: true,
              color: "#F75F52",
              symbol: "none",
              emphasis: {
                disabled: true,
              },
              areaStyle: {
                color: this.theme == "light" ? "#FCE5E8" : "#2E0D12",
              },
            },
          ],
        };

        echarts.connect([
          this.$refs.echartsDom.chartInstance,
          this.$refs.echartsDom2.chartInstance,
        ]);
        // console.log("深度测试数据------", option);
        // 开启socket
      this.webSocket();
      }
    },






  },
};
</script>

<style lang="scss" scoped>
.main {
  height: 100%;
  display: flex;
  margin: 20px;
  justify-content: center;
  align-items: center;
}

#depthChart {
  width: 1100px;
  height: 500px;
}
</style>
