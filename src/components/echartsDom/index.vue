<template>
  <div ref="chart" class="charts-default" :style="styles"></div>
</template>

<script>
import * as echarts from 'echarts';

export default {
  name:'echartsDom',
  props: {
    options: {
      type: Object,
      required: true
    },
    styles:{
      type: Object,
      default: () => ({height: '100%', width: '100%'})
    },
    classList:{
      Boolean: false,
    }
      
  },
  data() {
    return {
      chartInstance: null,
      echartsObj: echarts
    }
  },
  watch:{
    options: {
      handler(val) {
        this.initChart(val)
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart(this.options)
      })

   
  },
  methods: {
    initChart(options) {
      if (!this.chartInstance){
          this.chartInstance = echarts.init(this.$refs.chart,null,{
          width: 'auto',
          height: 'auto' 
        })
        this.classList&&this.$refs.chart.classList.add('echarts-default');
        window.addEventListener('resize', this.handleResize)
        this.$nextTick(() => {
          this.chartInstance.resize()
        })
      }
     
      this.chartInstance.setOption(options)

    
    },
    handleUpdtate(options) {
      // this.chartInstance.setOption(options)
      // this.chartInstance.resize()
    },
    handleResize() {
      if (this.chartInstance) {
        this.chartInstance.resize()
      }
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
    this.chartInstance.dispose()
  }
}
</script>

<style scoped>
 
  .charts-default{
   flex: 1;

  }
</style>