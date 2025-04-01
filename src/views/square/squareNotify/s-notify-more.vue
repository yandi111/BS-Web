<template>
  <div class="notify-more">
    <img
      src="@/assets/square-imgs/notify-more.png"
      alt=""
      @click.stop="onShow"
    />
    <div class="n-m-box" v-show="isShow">
      <div class="n-m-list">
        <div
          class="n-m-item"
          v-for="item in list"
          :key="item.id"
          @click.stop="chooseItem(item,info)"
        >
          {{ $t('square.' + item.label) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "sNotifyMore",
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isShow: false,
      list: [
        {
          id: 1,
          label: "移除",
        },
        {
          id: 2,
          label: "拉黑",
        },
      ],
    };
  },
  created() {
    window.addEventListener("click", () => {
      this.isShow = false;
    });
  },
  methods: {
    onShow() {
      this.isShow = !this.isShow;
    },
    chooseItem(item,info) {
      this.$emit("success", item, info);
      this.isShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.notify-more {
  img {
    width: 24px;
    height: 24px;
    display: inline-block;
    cursor: pointer;
  }
  .n-m-box {
    position: relative;
    .n-m-list {
      position: absolute;
      right: 0;
      top: 10px;
      min-width: 70px;
      background: #ffffff;
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.04);
      border-radius: 4px;
      padding: 10px 0;

      .n-m-item {
        text-align: center;
        font-size: 14px;
        color: #333;
        padding: 5px 0;
        cursor: pointer;
        &:hover {
          background: #f5f7fa;
        }
      }
    }
  }
}
</style>