<template>
  <div class="stepOut">
    <!-- 步骤条 -->
    <ul class="step-con">
      <li class="stepItem" v-for="(stepItem, index) in stepInfo.list" :key="index">
        <!-- 圆圈  -->
        <div>
          <div :class="stepInfo.step > index ? 'icon old' : stepInfo.step === index? 'icon active' : 'icon'" @click="handleStep(stepItem, stepInfo.step, index)">{{ index + 1 }}</div>
        </div>
        <!-- 连接线  -->
        <div :class="stepInfo.step >= index+1 ? 'line lineActive' : 'line'" v-show="index !== stepInfo.list.length-1"></div> 
      </li>
    </ul>
    <!-- 文字 -->
    <ul class="stepText" style="margin-top:11px">
        <li class="stepItem" v-for="(stepItem, index) in stepInfo.list" :key="index">
            <p class="textParams" :class="stepInfo.step >= index ? 'activeTime' : null">{{ stepItem.textParams }}</p>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'steps',
  props: {
    stepInfo: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      
    }
  },
  methods: {
    handleStep (stepItem, step, index) {
      if (step === index || this.stepInfo.step < index) return
      // 点击当前激活节点的后面节点
      this.stepInfo.step = index
      
      this.$emit('change-step', stepItem)
    },
  }
}
</script>

<style lang="scss" scoped>
li{
    list-style: none;
}
.stepOut ul{
  width: 100%;
  height: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  .stepItem {
    display: inline-block;
    flex: 1;
    font-size: 12px;
    // text-align: center;
    position: relative;
    .icon {
      width: 28px;
      height: 28px;
      line-height: 24px;
      text-align: center;
      // border-radius: 50%;
      background: #fff;
      border: 1px solid rgba(0,0,0,0.09);
      border-radius: 50%;
      // margin: 0 auto;
      position: relative;
      z-index: 888;
    }
    .old{
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background-color: $colorB;
      border: none;
      border-radius: 50%;
      position: relative;
      border-radius: 1px solid $colorB;
      color: #FFF;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        border: 1px solid $colorB;
        border-radius: 50%;
      }
    }
    .active {
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background-color: $colorB;
      border: none;
      border-radius: 50%;
      position: relative;
      border-radius: 1px solid $colorB;
      color: #FFF;
      position: relative;
      &::before {
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        border: 1px solid $colorB;
        border-radius: 50%;
      }
    }
    .line {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      border-bottom: 2px solid rgba(0,0,0,0.04);
      width: 80%;
      margin: 0 50px;
      z-index: 111;
    }
    .lineActive {
      border-bottom: 1px solid $colorB;
    }
    .textParams{
      color: #8992a6;
      font-size: 14px;
      font-weight: 400;
      margin-top: 15px;
      &:last-child {
        width: 100px;
        text-align: right;
      }
    }
    .activeTime{
        color:#333333;
        font-weight: 500;
    }

    &:last-child {
      flex: 0;
    }
  }
  
}
</style>