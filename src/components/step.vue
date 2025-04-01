<template>
  <div class="stepOut">
    <!-- 步骤条 -->
    <ul class="step-con">
      <li class="stepItem" v-for="(stepItem, index) in stepInfo.list" :key="index">
        <!-- 圆圈  -->
        <div :class="stepInfo.step > index ? 'icon old' : stepInfo.step === index? 'icon active' : 'icon'" @click="handleStep(stepItem, stepInfo.step, index)"></div>
        <!-- 连接线  -->
        <div :class="stepInfo.step >= index+1 ? 'line lineActive' : 'line'" v-show="index !== stepInfo.list.length-1"></div> 
      </li>
    </ul>
    <!-- 文字 -->
    <ul class="stepText" style="margin-top:11px">
        <li class="stepItem" v-for="(stepItem, index) in stepInfo.list" :key="index">
            <p class="textParams" :class="stepInfo.step >= index+1 ? 'activeTime' : null">{{ stepItem.textParams }}</p>
        </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'steps',
  data () {
    return {
      stepInfo: {
        list: [{textParams: '0%' },{textParams: '25%' },{ textParams: '50%' },{ textParams: '75%' },{ textParams: '100%' }],
        step: 0
      }
    }
  },
  methods: {
    handleStep (stepItem, step, index) {
      if (step === index) return
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
    font-size: 16px;
    // text-align: center;
    position: relative;
    
    .icon {
      width: 10px;
      height: 10px;
      // border-radius: 50%;
      background: #fff;
      border: 1px solid rgba(0,0,0,0.09);
      // margin: 0 auto;
      position: relative;
      transform: rotate(45deg);
      z-index: 888;
      cursor: pointer;
    }
    .old{
      width: 10px;
      height: 10px;
      background-color: #5375FB;
      border: none;
    }
    .active {
      width: 14px;
      height: 14px;
      background-color: #fff;
      border: 2px solid #5375FB;
    }
    .line {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      border-bottom: 2px solid rgba(0,0,0,0.04);
      border-bottom: 2px solid #f5f5f5;
      width: 100%;
      z-index: 111;
    }
    .lineActive {
      border-bottom: 1px solid #5375FB;
    }
    .textParams{
      color: #9999A4;
      font-size: 14px;
      font-weight: 400;
    }
    .activeTime{
        color:#8992a6;
        font-weight: 500;
    }

    &:last-child {
      flex: 0;
    }
  }
  
}
</style>