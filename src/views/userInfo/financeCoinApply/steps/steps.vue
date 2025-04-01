<template>
  <div class="wt-step">
    <div class="vertical" v-if="direction.toLocaleUpperCase() === 'V'">
      <div class="item-wrapper">
        <div
          class="item"
          :class="[{ current: item.active }]"
          v-for="(item, index) of dataSource"
          :key="index"
          @tap="switchTap(index)"
        >
          <div class="left">
            <div
              class="arc"
              :class="[{ active: item.active }, cssActive ==index?'first':'']"
              v-if="type == 'default'"
            >
              {{ index + 1 }}
            </div>
            <div
              class="arc"
              :class="[{ active: item.active }, { 'icon-check': item.active }]"
              v-else-if="type == 'check'"
            ></div>
            <div class="line" v-if="index != dataSource.length - 1"></div>
          </div>
          <div class="right">
            <div class="title">{{ item.text }}</div>
            <div class="desc">{{ item.desc }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'coinApplySteps',
  props: {
    dataSource: {
      // 数据来源
      type: Array,
    },
    type: {
      type: String,
      default: () => {
        // 组件类型（有两个值可选 "check", "default"）默认"default"
        return "default";
      },
    },
    direction: {
      // 组价展示方向（有两个值可选 "v", "h" 不区分大小写）默认"h"
      type: String,
      default: () => {
        return "h";
      },
    },
    cssActive:{
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  methods: {
    // 点击事件
    switchTap(index) {
      this.$emit("handle", index);
    },
  },
};
</script>

<style lang="scss" scoped>
.wt-step {
  .vertical {
    background: #fff;
    width: 100%;
    overflow: hidden;
    .item-wrapper {
      .item {
        color: #333;
        display: flex;
        min-height: 80px;
        &:last-child {
          min-height: 7px;
        }
        .left {
          position: relative;
          height: auto;
          display: flex;
        }
        .right {
          margin: 0 3px;
          .title {
            font-size: 16px;
            margin-left: 15px;
            line-height: 24px;
          }
          .desc {
            font-size: 14px;
            color: #999;
            margin: 4px;
          }
        }
        &.current p {
          color: #90ff00;
        }
        .arc {
          background: #F6F9FC;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          display: inline-block;
          font-size: 14px;
          color: #333;
          line-height: 24px;
          text-align: center;
          border: 1px solid #DBE0EA;
        }
        .first{
          background: #90ff00;
          color: #fff;
          border: 1px solid transparent;
        }
        &.current {
          .line {
            border: 1px solid #90ff00;
            margin-top: 24px;
          }
        }
        .line {
          border: 1px dashed #DBE0EA;
          width: 1px;
          position: absolute;
          height: 100%;
          box-sizing: border-box;
          margin-top: 25px;
          left: 11px;
        }
        div {
          &.active {
            background-color: #90ff00;
            color: #fff;
            border: 1px solid transparent;
          }
        }
      }
    }
  }
}
</style>