<template>
  <div class="chart" id="chart"></div>
</template>

<script>
import * as echarts from "echarts";
export default {
  name: "RateChart",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      chart: null,
      chartOption: {
        grid: {
          left: "5%",
          bottom: "40%",
        },
        tooltip: {
          //提示框组件
          trigger: 'item', //item数据项图形触发，主要在散点图，饼图等无类目轴的图表中使用。
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: 'line', // 默认为直线，可选为：'line' | 'shadow'
          },

          formatter: '资金费率 : {c}  </br> {b}', //{a}（系列名称），{b}（数据项名称），{c}（数值）, {d}（百分比）
        },
        xAxis: {
          type: "category",
          data: [],
           axisTick: {
            interval: function (index, value) {
              return value.substring(value.length - 8) == '00:00:00';
            },
          },
          axisLabel: {
            show: true,
            interval: function (index, value) {
              return value.substring(value.length - 8) == '00:00:00';
            },
            formatter: function (value, index) {
              return value.substring(5, 10);
            },
          },
           axisTick: {
            //刻度线
            show: true,
          },
          splitLine: {
            show: false,
          },
        },
        yAxis: {
          type: "value",
           axisLabel: {
            show: true,
            interval: 'auto',
            formatter: function (value) {
              // return value * 100 + '%'; // 单位后缀 百分比
              return value;
            },
          },
        },
        series: [
          {
            data: [],
            type: "line",
             smooth:false,
            // lineStyle:{
            //   color:'#90ff00'
            // },
            itemStyle: {
              // 设置每条折线的样式
              color: "#90ff00", // 修改折线颜色
              // normal: { label: { show: true } },
              // showAllSymbol: true,
            },
          },
        ],
      },
    };
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.initChart();
    // });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      let chartDom = document.getElementById("chart");
      this.chart = echarts.init(chartDom);
       for (let k in this.list) {
        this.chartOption.xAxis.data.push(this.list[k].time);
        this.chartOption.series[0].data.push(this.list[k].rate);
      }
      this.setOptions(chartDom,this.chart)
    },
      setOptions(chartDom,myChart) {
      myChart.setOption(this.chartOption);
      this.chartOption.xAxis.data = [];
      this.chartOption.series[0].data = [];
      // 监听窗口大小变化事件
      window.addEventListener("resize", function () {
        // 获取图表容器的新宽度
        let newWidth = chartDom.offsetWidth;
        // 调用echarts实例的resize方法重新渲染图表
        myChart.resize({
          width: newWidth,
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.chart {
  width: 100%;
  height: 350px;
}
</style>