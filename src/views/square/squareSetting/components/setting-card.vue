<template>
  <div class="setting-card">
    <div class="df mb10" v-for="(item, index) in list" :key="index">
      <div class="avatar">
        <img v-if="item.avatar" :src="item.avatar" alt="" />
        <img v-else src="@/assets/square-imgs/defaultAvatar.png" alt="" />
      </div>
      <div class="li">
        <div class="info df aic jb">
          <div class="df aic aife">
            <span class="title">{{ item.nickname }}</span>
          </div>
          <div class="btn" @click="dissolveTheRelationship(item)">
            {{ $t("square.解除用户") }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    block: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      vip: true,
    };
  },
  methods: {
    dissolveTheRelationship(params) {
      this.$emit("onAction", params);
    },
  },
};
</script>

<style lang="scss" scoped>
.setting-card {
  .avatar {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .li {
    flex: 1;
    padding-left: 10px;
    border-bottom: 1px solid #e9edf2;
    padding-bottom: 20px;
    .info {
      font-size: 16px;
      color: #333;
      height: 40px;
      .level {
        font-size: 16px;
        padding: 0 2px;
        background-color: #f4f5f7;
        color: #8992a6;
        &.vip {
          color: #53cca9;
          background-color: #dafef2;
        }
      }
    }
    .btn {
      display: flex;
      align-items: center;
      height: 30px;
      font-size: 16px;
      color: #90ff00;
      padding: 0 12px;
      border-radius: 4px;
      border: 1px solid #90ff00;
      cursor: pointer;
    }
  }
}
</style>
