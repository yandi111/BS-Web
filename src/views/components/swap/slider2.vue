<template>
  <div class="custom-slider-container">
    <div class="custom-slider" ref="slider">
      <div class="slider-track">
        <div class="slider-fill" :style="{ width: fillWidth }"></div>
      </div>
      <div 
        v-for="point in points" 
        :key="point"
        class="slider-point"
        :class="{ 'active': value >= point }"
        :style="{ left: `${(point / maxValue) * 100}%` }"
      ></div>
      <div 
        class="slider-thumb" 
        :style="{ left: thumbPosition }"
        @mousedown="startDrag"
        @mouseover="showTooltip = true"
        @mouseleave="showTooltip = false"
      ></div>
      <div class="slider-tooltip" v-if="showTooltip" :style="{ left: thumbPosition }">
        {{ Math.round(value) }}%
      </div>
    </div>
    <div class="slider-labels">
      <div 
        v-for="point in points" 
        :key="point"
        class="slider-label"
        :style="{ left: `${(point / maxValue) * 100}%` }"
      >
        {{ point }}%
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props:{
    closePositionData:{
      required: false,
    },
    sliderValue:{
      type:String|Number
    }

  },
  data() {
    return {
      value: 1,
      isDragging: false,
      showTooltip: false,
      points: [0, 25, 50, 75, 100],
      maxValue: 100,
      newValueinsh:null
    }
  },
  watch:{
    sliderValue:{
      handler(val){
      this.value=val
      },
      immediate:true
      
    }
  },
  computed: {
    fillWidth() {
      return `${(this.value / this.maxValue) * 100}%`
    },
    thumbPosition() {
      return `calc(${(this.value / this.maxValue) * 100}% - 11px)`
    },

    coinNumber(){
      return this.truncateToSixDecimalPlaces(this.newValueinsh) 

    }
  },
  methods: {
    startDrag(event) {
      this.isDragging = true
      this.updateValue(event)
      document.addEventListener('mousemove', this.drag)
      document.addEventListener('mouseup', this.stopDrag)
    },
    drag(event) {
      if (this.isDragging) {
        this.updateValue(event)
      }
    },
    stopDrag() {
      this.isDragging = false
      document.removeEventListener('mousemove', this.drag)
      document.removeEventListener('mouseup', this.stopDrag)
    },
    updateValue(event) {
      const sliderRect = this.$refs.slider.getBoundingClientRect()
      let newValue = ((event.clientX - sliderRect.left) / sliderRect.width) * this.maxValue
      newValue = Math.max(0, Math.min(this.maxValue, newValue))
      this.value =   Math.round(newValue)

      this.newValueinsh = this.closePositionData/1/100 *newValue/1      
      this.$emit('iconChange', this.coinNumber)
    },
     truncateToSixDecimalPlaces(number) {
    // 将数字转换为字符串
    const numberString = number.toString();
    
    // 查找小数点的位置
    const decimalIndex = numberString.indexOf('.');
    
    // 如果没有小数点，直接返回原始数字
    if (decimalIndex === -1) {
        return numberString; // 返回原始数字
    }
    
    // 截取小数点后6位
    return numberString.slice(0, decimalIndex + 7); // +7 是因为要包括小数点
}
  }
}
</script>

<style scoped>
.custom-slider-container {
  position: relative;
  width: 100%;
  padding-bottom: 20px; /* 为标签腾出空间 */
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

.slider-point {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 14px;
  height: 14px;
  background: url('@/assets/images/icon/icon-drag-node2.png') no-repeat center center;
  background-size: cover;
}

.slider-point.active {
  background-image: url('@/assets/images/icon/icon-drag-node.png');
}

.slider-thumb {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 22px;
  height: 22px;
  background: url('@/assets/images/icon/icon-Slide.png') no-repeat center center;
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