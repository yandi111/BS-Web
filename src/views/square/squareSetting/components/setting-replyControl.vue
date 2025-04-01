<template>
  <div class="setting-one">
    <div class="control">
      <p class="title">{{ $t("square.允许回复来自") }}</p>
      <div
        class="cell"
        v-for="item in group"
        :key="item.id"
        :class="{ active: permissionValue == item.value }"
        @click="togglePermission(item)"
      >
        <div class="label">{{ item.label }}</div>
        <i class="iconfont icon-checked"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    permission: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      group: [
        { label: this.$t("square.所有人"), id: 0, value: "all_user_comment" },
        {
          label: this.$t("square.我的关注"),
          id: 1,
          value: "follow_user_comment",
        },
      ],
      permissionValue: "all_user_comment",
      params: {
        settingKey: "article_comment",
        settingValues: ["all_user_comment"],
      },
    };
  },
  methods: {
    togglePermission(val) {
      this.permissionValue = val.value;
    },
  },
  watch: {
    permission: {
      handler(newValue) {
        this.permissionValue = newValue;
      },
      immediate: true,
    },
    permissionValue: {
      handler(newValue) {
        this.params.settingValues[0] = newValue;

        this.$emit("controlPemission", this.params);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.control {
  .title {
    font-weight: 500;
    font-size: 14px;
    color: #333333;
  }
  .cell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 12px;
    color: #333333;
    padding: 12px 10px;
    margin: 15px 0;
    cursor: pointer;

    background-color: #ffffff;
    border-radius: 6px;
    &.active {
      background: #f5f7fa;
      .iconfont {
        display: flex;
      }
    }
    .iconfont {
      display: none;
      cursor: pointer;
      &.icon-checked {
        color: #90ff00;
      }
    }
  }
}
.watchlist {
  color: #333;
  font-size: 12px;
}
</style>
