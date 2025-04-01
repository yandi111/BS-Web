<template>
  <div class="custom-slider-container" @click="setValue">
    <div class="custom-slider" ref="slider">
      <div class="slider-track" @click="setValue">
        <div class="slider-fill" :style="{ width: fillWidth }"></div>
        <div class="slider-clickable-area" @click.stop="setValue"></div> <!-- 增加点击区域 -->
      </div>
      <div 
        v-for="(point, index) in points" 
        :key="index"
        class="slider-point"
        :class="{ 'active': value >= point }"
        :style="{ left: `${(point / getMultiple) * 100}%` }"
        @click.stop="setValueAtPoint(point)"
      ></div>
      <div 
        class="slider-thumb" 
        :style="{ left: thumbPosition }"
        @mousedown="startDrag"
        @mouseover="showTooltip = true"
        @mouseleave="showTooltip = false"
      ></div>
      <div class="slider-tooltip" v-if="showTooltip" :style="{ left: thumbPosition }">
        {{ Math.round(value) }}X
      </div>
    </div>
    <div class="slider-labels">
      <div 
        v-for="(point, index) in points" 
        :key="index"
        class="slider-label"
        :style="{ left: `${(point / getMultiple) * 100}%` }"
      >
        {{ point }}X
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  props: {
    newCount: {
      default: 0, // 设置默认值
    },
    // getMultiple: {
    //   type: Number,
    //   default: 125, // 假设默认值为 125
    // },
  },
  data() {
    return {
      isDragging: false,
      showTooltip: false,
      value: this.newCount ? this.newCount : '', // 初始化 value
      getMultiple:125,
    }
  },
  computed: {
    // ...mapGetters(['getMultiple']),
    points() {
      const numPoints = 5; // 分成 5 份
      const interval = this.getMultiple / numPoints; // 每份的间隔
      return Array.from({ length: numPoints + 1 }, (_, i) => i * interval); // 生成分割点
    },
    fillWidth() {
      return `${(this.value / this.getMultiple) * 100}%`; // 计算填充宽度
    },
    thumbPosition() {
      return `calc(${(this.value / this.getMultiple) * 100}% - 7px)`; // 7px 是滑动点的偏移量
    },
  },
  methods: {
    setValue(event) {
      const sliderRect = this.$refs.slider.getBoundingClientRect();
      let newValue = ((event.clientX - sliderRect.left) / sliderRect.width) * this.getMultiple; // 使用 getMultiple
      newValue = Math.max(0, Math.min(this.getMultiple, newValue)); // 限制在 0 到 getMultiple 之间
      this.value = newValue; // 更新 value
      this.$emit('input', this.value); // 触发 input 事件
    },
    setValueAtPoint(point) {
      this.value = point; // 设置 value 为点击的分割点
      this.$emit('input', this.value); // 触发 input 事件
    },
    startDrag(event) {
      this.isDragging = true;
      this.updateValue(event);
      document.addEventListener('mousemove', this.drag);
      document.addEventListener('mouseup', this.stopDrag);
    },
    drag(event) {
      if (this.isDragging) {
        this.updateValue(event);
      }
    },
    stopDrag() {
      this.isDragging = false;
      document.removeEventListener('mousemove', this.drag);
      document.removeEventListener('mouseup', this.stopDrag);
    },
    updateValue(event) {
      const sliderRect = this.$refs.slider.getBoundingClientRect();
      let newValue = ((event.clientX - sliderRect.left) / sliderRect.width) * this.getMultiple; // 使用 getMultiple
      newValue = Math.max(0, Math.min(this.getMultiple, newValue));
      this.value = newValue; // 更新 value
      this.$emit('input', this.value); // 触发 input 事件
    }
  },
  watch: {
    
    newCount(newVal,old) {
      if(!newVal){
        this.value=0
      }
      this.value = newVal
    },
    value(newVal) {
      console.log(newVal,'newVal---');

      this.$emit('usdtBtcOpen', newVal);
    },
  }
}
</script>

<style scoped>
.custom-slider-container {
  position: relative;
  width: 100%;
  padding-bottom: 20px; /* 为标签腾出空间 */
  cursor: pointer;
}

.custom-slider {
  position: relative;
  width: 100%;
  height: 14px;
  padding: 6px 0;
}

.slider-track {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 100%;
  height: 1px;
  background-color: #252525;
}

.slider-fill {
  position: absolute;
  height: 100%;
  background-color: #B3B3B3;
}

.slider-clickable-area {
  position: absolute;
  top: -5px; /* 上移 5px */
  left: 0;
  width: 100%;
  height: 100%; /* 保持高度 */
  cursor: pointer; /* 鼠标悬停时显示为手型 */
}

.slider-point {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: url('/src/assets/images/icon/icon-drag-node2.png') no-repeat center center;
  background-size: cover;
}

.slider-point.active {
  background-image: url('/src/assets/images/icon/icon-drag-node.png');
}

.slider-thumb {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  background: url('/src/assets/images/icon/icon-Slide.png') no-repeat center center;
  background-size: cover;
  cursor: pointer;
}

.slider-tooltip {
  position: absolute;
  top: -25px;
  transform: translateX(-50%);
  background-color: #B3B3B3;
  color: #252525;
  padding: 2px 6px;
  border-radius: 3px;
  font-family: PingFang SC;
  font-size: 11px;
  font-weight: 500;
}

.slider-labels {
  position: absolute;
  width: 100%;
  top: 100%;
  left: 0;
  margin-top: -16px;
  font-family: PingFang SC;
}

.slider-label {
  position: absolute;
  transform: translateX(-50%);
  font-size: 11px;
  font-weight: 500;
  color: #B3B3B3;
}
</style>