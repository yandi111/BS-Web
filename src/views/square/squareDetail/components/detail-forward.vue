<template>
  <div class="detail-forward">
    <div class="top df aic">
      <div class="avatar mr10">
        <img
          src="@/assets/square-imgs/defaultAvatar.png"
          alt=""
          v-if="!info.avatar"
        />
        <img :src="info.avatar" alt="" v-else />
      </div>
      <div class="name mr10">{{ info.nickname }}</div>
      <div class="date">{{ info.updateTime }}</div>
    </div>
    <template v-if="info.visible">
      <div class="content pointer" @click="toDetail">
        <p>{{ info.title }}</p>
        <p>{{ info.content }}</p>
      </div>
      <div class="imgsBoxs" v-if="info.urls">
        <s-imags :urls="info.urls" />
      </div>
    </template>
    <template v-else>
      <div class="content">
        <p class="del">{{ $t("square.引用内容已删除") }}</p>
      </div>
    </template>
  </div>
</template>

<script>
import sImags from "../../components/s-imgs.vue";
export default {
  components: {
    sImags,
  },
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    toDetail() {
      console.log("12", 12);
      console.log("this.info", this.info);
      this.$router.push({
        path: "/square/detail",
        query: {
          id: this.info?.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.detail-forward {
  padding: 10px 15px;
  border-radius: 10px;
  border: 2px solid #f5f7fa;
  .top {
    .avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      font-size: 14px;
      color: #333333;
    }
    .date {
      font-size: 12px;
      color: #8992a6;
    }
  }
  .content {
    color: #333333;
    font-size: 14px;
    padding: 15px 0 20px;
    p {
      &:first-child {
        font-weight: bold;
        margin-bottom: 5px;
      }
      &.del {
        font-weight: normal;
        color: #96a2b2;
      }
    }
  }
  .imgsBox {
    width: 100%;
    border-radius: 6px;
    overflow: hidden;
  }
}
</style>
