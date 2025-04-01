<script>
import * as echarts from 'echarts';

export default {
 props: {
  option: {
   type: Object,
   default: () => ({}),
  },
  width: {
   type: [Number, String],
   default: ''
  },
  height: {
   type: [Number, String],
   default: ''
  }
 },
 data() {
  return {}
 },
 watch: {
  options(newOption) {
   if (this.chartInstance) this.chartInstance.setOption(newOption);
  }
 },
 mounted() {
  this.initChart()
 },
 methods: {
  initChart() {
   const myChart = echarts.init(this.$refs.echart);

   // 设置图表选项
   myChart.setOption(this.option);
  }
 }
}
</script>

<template>
 <div ref="echart" class="echart" :style="{width, height}"></div>
</template>

<style scoped lang="scss">

</style>