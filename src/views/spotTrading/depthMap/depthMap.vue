<template>
  <div class="page">
    <div id="depth"></div>
  </div>
</template>

<script>
import * as echarts from "echarts";
import { depthMapApi } from "@/api/contractTransaction";
import { webSocketMixin } from "./depthSocket";
import { mapGetters, mapState } from "vuex";
import elementResizeDetectorMaker from "element-resize-detector";

export default {
  name: "Depth",
  mixins: [webSocketMixin],
  props: {
    contractType: {
      type: Boolean,
      default: true,
    },
    coinInfo: {
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {
      chart: null,
      depthNum: 0,
      bidsData: [],
      asksData: [],
      theme: "light",
    };
  },
  watch: {
    coinInfo: {
      handler() {
        this.$nextTick(async() => {
        await  this.initData();
        this.initChart();
        });
      },
      immediate: true,
      deep: true,
    },
    spotSelectNum(v) {
      //当精度选择后停止订阅
      const self = this;
      self.unWebsockSend('unDepthMap')
      this.depthNum = this.contractType ? this.contractSelectNum : v;
      //赋值后发起新的订阅
      this.websockOpen();
      self.websockSend("depthMap");
    },
    contractSelectNum(v) {
      const self = this;
      self.unWebsockSend('unDepthMap')
      this.depthNum = this.contractType ? v : this.spotSelectNum;
      this.websockOpen();
      self.websockSend("depthMap");
    },
  },
  computed: {
    ...mapGetters(["getTheme"]),
    ...mapState({
      spotCoinInfo: ({ spots }) => spots.spotCoinInfo,
      spotSelectNum: ({ setting }) => setting.SpotSelectNum,
      contractSelectNum: ({ setting }) => setting.contractSelectNum,
    }),
  },
  mounted() {
    this.depthNum = this.contractType
      ? this.contractSelectNum
      : this.spotSelectNum;
  },
  methods: {
    // socket 推送
    websockOpen(e) {
      const self = this;
      if (this.websockTime) {
        clearInterval(this.websockTime);
      }
      this.isWebsock = true;
      self.websockSend("depthMap");
    },
    async initData() {
      const { symbol, marketType } = this.coinInfo;
      let res = await depthMapApi({
        marketType: marketType,
        symbol: symbol,
      });
      // 买
      const buyData = res.data.data.bids;
      const bidsDataArr = buyData.map((item, index) =>
        index == 0 ? [item?.price, 0] : [item?.price, item?.high]
      );
      this.bidsData = bidsDataArr.reverse();
      //卖
      const sellData = res.data.data.asks;
      const asksDataArr = sellData.map((item, index) =>
        index == sellData.length - 1
          ? [item?.price, 0]
          : [item?.price, item?.high]
      );
      this.asksData = asksDataArr.reverse();
      // console.log('深度历史数据',this.bidsData,this.asksData);
        // 开启socket
      this.webSocket();
    },
    initChart() {
      let langKey = this.$i18n.locale;
      let chartDom = document.getElementById("depth");
      this.chart = echarts.init(chartDom);
      var option;
      option = {
        backgroundColor: "#141414" ,
        title: {
          text: "",
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            // var res = "<p> 委托价格:" + params[0].name + "</p>";
            let langObj = {
              cn: "委托价格：",
              en: "Commission price：",
              tw: "委托價格：",
              th:'ราคาคอมมิชชั่น：'
            };

            var res = "<p>" + langObj[langKey] + params[0].name + "</p>";
            for (var i = 0; i < params.length; i++) {
              res +=
                "<p>" +
                params[i].marker +
                params[i].seriesName +
                ":" +
                params[i].value[1] +
                "</p>";
            }
            return res;
          },
          position: function (point, params, dom, rect, size) {
            return [point[0], point[1]];
          },
          backgroundColor: "#fff",
          axisPointer: {
            type: "cross",
            lineStyle: {
              color: "#60698D",
              type: "dashed",
            },
            label: {
              show: false, //坐标指示器
              fontSize: 11,
              backgroundColor: "#222E5D",
            },
          },
        },

        grid: {
          containLabel: true,
          left: "0%",
          right: "0%",
          bottom: "0%",
        },
        textStyle: {
          color: "#737373" , //x轴坐标
        },
        animation: false,
        xAxis: {
          type: "category",
          boundaryGap: false,
          axisLine: {
            lineStyle: {
              color: "transparent",
            },
          },
          axisLabel: {
            margin: 10,
            align: "center",
            showMaxLabel: false,
            showMinLabel: false, //不显示X轴最小刻度
          },
          show: true,
        },
        yAxis: [
          {
            nameTextStyle: {
              fontSize: 10,
              color: "#fff",
            },
            offset: 0,
            type: "value",
            splitLine: { show: false },
            axisTick: {
              show: false,
              color: "#fff",
            },
            axisLine: {
              show: false,
            },
            axisLabel: { fontSize: 10, inside: true, color: "transparent" }, //坐标y轴刻度值
          },
          {
            position: "right",
            nameTextStyle: {
              fontSize: 10,
              color: "#fff",
            },
            offset: 0,
            type: "value",
            splitLine: { show: false },
            axisTick: {
              show: false,
              color: "#fff",
            },
            axisLine: {
              show: false,
            },
            axisLabel: {
              fontSize: 10,
              inside: false,
              color:  "#737373" ,
            },
          },
        ],
        series: [
          {
            name: this.$t("contract.累计挂单"),
            showSymbol: false,
            symbol: "circle",
            zlevel: -21,
            yAxisIndex: "0", // 第一个柱状图的数据
            label: {
              show: false,
              distance: 22,
              color: "#fff",
              fontSize: 12,
              align: "center",
              verticalAlign: "middle",
              backgroundColor: "#222E5D",
              padding: [10, 15, 10, 15],
            },
            symbolSize: 11,
            connectNulls: true,
            step: true,
            emphasis: {},
            lineStyle: {},
            type: "line",
            itemStyle: {
              normal: {
                color: "#4dcca6",
                borderColor: "#01C57B",
              },
            },

            areaStyle: {
              normal: {
                // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //   {
                //     offset: 0,
                //     color: "#00fd9d",
                //   },
                //   {
                //     offset: 1,
                //     color: "#141E46",
                //   },
                // ]),
              },
            },

            data: this.bidsData,
          },
          {
            zlevel: -21,
            yAxisIndex: "1",
            name: this.$t("contract.累计挂单"),
            showSymbol: false,
            symbol: "circle",
            label: {
              show: false,
              distance: 22,
              color: "#fff",
              fontSize: 12,
              align: "center",
              verticalAlign: "middle",
              backgroundColor: "#222E5D",
              padding: [10, 15, 10, 15],
            },
            symbolSize: 11,
            connectNulls: true,
            step: true,
            type: "line",
            stack: "总量",
            itemStyle: {
              normal: {
                color: "#f8b2bb",
              },
            },
            areaStyle: {
              normal: {
                // color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                //   {
                //     offset: 0,
                //     color: "#D8195A",
                //   },
                //   {
                //     offset: 1,
                //     color: "#141E46",
                //   },
                // ]),
              },
            },

            data: this.asksData,
          },
        ],
       
      };

      //  //点击F11时，echarts图表跟随屏幕的大小变化而变化
      //       window.addEventListener('resize', function () {
      //           this.chart.resize();
      //       });

      //根据当前容器的尺寸变化而让图表也跟着变化
      let changeSize = elementResizeDetectorMaker();
      let _this = this;
      changeSize.listenTo(chartDom, () => {
        //chartDom为之前获取到的容器名
        _this.$nextTick(() => {
          _this.chart.resize();
        });
      });
      option && this.chart.setOption(option);
      // console.log('加载深度插件');
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  padding: 20px;
  width: 100%;
  height: 100%;
  #depth {
    width: 100%;
    height: 100%;
  }
}
</style>