<template>
  <span ref="itemCount" class="num"></span>
</template>

<script>
import {CountUp as ICountUp} from "countup.js";

export default {
  props: ['number'],
  data() {
    return {
      options: {
        startVal: this.number, //初始值
        // duration: 0, // 动画持续时间（秒）不设置动画速度最快
        useEasing: true, // 使用缓动效果
        useGrouping: true, // 使用分组分隔符（如1,000）
        // smartEasingThreshold: 10, //对于高于此值的大数进行平滑缓动
        separator: ",", //分隔符逗号，
        decimal: ".", //小数点
      },
      countUp: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      const countUp = new ICountUp(this.$refs.itemCount, this.number || 0, this.options);
      this.countUp = countUp;
      if (!countUp.error) {
        countUp.start()
      } else {
        console.error(countUp.error)
      }
    })
  },
  watch: {
    'number'() {
      if (!this.countUp) return
      this.countUp.update(this.number);
    }
  },
}

</script>
