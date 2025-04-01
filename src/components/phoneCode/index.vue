<template>
  <div class="page">
    <div class="phone-list" v-if="codeShow">
      <div
        class="item-code"
        :class="list.length > 8 ? 'code-active' : ''"
      >
        <div
          class="code-list"
          v-for="(item, index) in list"
          :key="index"
          @click.stop="handleItem(item)"
        >
          <span class="label">{{ item.label }}</span>
          <span class="value">{{ item.value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PhoneCode",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      codeShow: false,
      areaCode: "+86",
      phone: "",
    };
  },
  methods: {
    handleItem(item) {
      
      this.codeShow = false;
      this.$emit("shangeData", item);
    },
    showFn() {
      this.codeShow = !this.codeShow;
    },
    closeFn() {
      this.codeShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  .phone {
    display: flex;
    .select {
      flex: 1;
      height: 55px;
      line-height: 55px;
      background: #f5f7fa;
      border-radius: 6px;
      .select-code {
        display: flex;
        justify-content: space-between;
        padding: 0 10px;
        .select-icon {
          padding-left: 5px;
        }
      }
    }
    .mid {
      width: 10px;
    }
    .phone-input {
      width: 350px;
    }
  }
  .phone-list {
    position: relative;
    z-index: 99;
    .item-code {
      position: absolute;
      left: 0;
      top: 10px;
      width: 100%;
      background-color: #fff;
      box-shadow: 0px 0px 4px 0px rgba(229, 232, 245, 0.5);
      border-radius: 6px;
      .code-list {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .label {
          padding-left: 10px;
        }
        .value {
          padding-right: 10px;
        }
        &:hover {
          background-color: #f7f7f7;
        }
      }
    }
    .code-active {
      height: 320px;
      overflow-y: scroll;
    }
  }
}
</style>