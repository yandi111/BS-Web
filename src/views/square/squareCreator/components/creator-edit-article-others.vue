<template>
  <div class="other-article mt30">
    <template v-if="info.visible || forward">
      <div class="content">
        <div class="top">
          <div class="avatar">
            <img v-if="info.avatar" :src="info.avatar" alt="" />
            <img v-else src="@/assets/square-imgs/defaultAvatar.png" alt="" />
          </div>
          <span>{{ info.nickname }}</span>
          <span>{{ info.createTime }}</span>
        </div>
        <div class="text">
          <p class="title">{{ info.title }}</p>
          <p class="ellipsis5">{{ info.content }}22</p>
        </div>
      </div>
      <div class="pic" v-if="info.urls">
        <el-image :src="info.urls[0]" :preview-src-list="info.urls"> </el-image>
        <div class="more" v-if="info.urls?.length > 1">
          + {{ info.urls.length - 1 }}
        </div>
      </div>
    </template>
    <template v-else>
      <div class="content">
        <div class="text">
          <i class="iconfont icon-warning mr10"></i>
          <span>{{ $t("square.引用内容已删除") }}</span>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import myImg from "@/components/my-preview";
export default {
  components: {
    myImg,
  },
  props: {
    article: {
      type: Object,
      default: () => {},
    },
    forward: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      info: {},
    };
  },
  watch: {
    article: {
      handler(newValue) {
        this.info = newValue;
        console.log("newValue", newValue);
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.other-article {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 270px;
  background: #ffffff;
  border-radius: 10px;
  border: 1px solid #e9edf2;
  overflow: hidden;
  .content {
    padding: 10px;
    .top {
      flex: 1;
      display: flex;
      align-items: center;
      // font-size: 16px;
      margin-bottom: 5px;
      .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 24px;
        height: 24px;
        margin-right: 8px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      span {
        font-size: 12px;
        margin-right: 10px;
        &:last-child {
          color: #96a2b2;
        }
      }
    }
    .text {
      height: 120px;
      font-size: 12px;
      .title {
        font-weight: bold;
      }
      p {
        overflow: hidden;
      }
      .iconfont {
        color: #6d7b8e;
      }
      span {
        font-size: 12px;
        color: #6d7b8e;
      }
    }
  }
  .pic {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 200px;
    overflow: hidden;
    ::v-deep .el-image {
      width: 100%;
    }
    ::v-deep .el-image__preview {
      cursor: zoom-in;
    }
    .more {
      position: absolute;
      bottom: 0;
      right: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      font-size: 12px;
      color: #fff;
      background-color: #686868;
    }
  }
}
</style>
