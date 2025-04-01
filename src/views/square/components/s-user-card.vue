<template>
  <div class="user-card" v-if="infoData?.uid">
    <div class="icon">
      <i class="el-icon-back" @click="handleBack"></i>
    </div>
    <div class="box">
      <div class="box-left">
        <div class="box-info">
          <div class="info-icon">
            <img v-if="infoData.avatar" :src="infoData?.avatar" alt="" />
            <img v-else src="@/assets/square-imgs/defaultAvatar.png" alt="" />
          </div>
          <div>
            <div class="info-name">
              <span>{{ infoData.nickname }}</span>
            </div>
            <div class="info-text">@{{ infoData.username }}</div>
          </div>
        </div>
        <div class="indr pr40">{{ infoData.introduction }}</div>
        <div class="box-b">
          <div
            class="b-item"
            :class="{ pointer: JSON.stringify($route.query) == '{}' }"
            @click="handleFan(1)"
          >
            <span>{{ infoData.followCount }}</span>
            <span>{{ $t("square.关注") }}</span>
          </div>
          <div
            class="b-item"
            :class="{ pointer: JSON.stringify($route.query) == '{}' }"
            @click="handleFan(2)"
          >
            <span>{{ infoData.fansCount }}</span>
            <span class="fan">{{ $t("square.粉丝") }}</span>
          </div>
          <div class="b-item">
            <span>{{ infoData.likeCount }}</span>
            <span>{{ $t("square.点赞") }}</span>
          </div>
          <div class="b-item">
            <span>{{ infoData.repostCount }}</span>
            <span>{{ $t("square.分享") }}</span>
          </div>
        </div>
      </div>
      <div class="box-right">
        <div v-if="!info?.uid" class="btn" @click="handleEdit">
          {{ $t("square.编辑") }}
        </div>
        <slot v-else></slot>
      </div>
    </div>

    <!-- 编辑弹窗 -->
    <s-info-edit
      :is-show.sync="isShow"
      :info-data="infoData"
      @editList="editList"
    ></s-info-edit>
  </div>
</template>

<script>
import sInfoEdit from "./s-info-edit.vue";
import { mapGetters } from "vuex";
export default {
  name: "SuserCard",
  components: {
    sInfoEdit,
  },
  props: {
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      isShow: false,
      infoData: {},
    };
  },
  computed: {
    ...mapGetters(["getCommunityPersonalInformation"]),
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    handleEdit() {
      this.isShow = true;
    },

    handleFan(index) {
      this.$emit("next", index);
    },
    editList() {
      this.$emit("editList");
    },
    //存储广场个人信息
    viewPersonalHomepage() {
      this.$store.dispatch("handleSetCommunityPersonalInformation");
    },
  },
  mounted() {
    this.viewPersonalHomepage();
  },
  watch: {
    getCommunityPersonalInformation: {
      handler(newValue) {
        if (JSON.stringify(this.$route.query) == "{}") {
          console.log("个人", newValue);
          this.infoData = newValue;
        }
      },
      deep: true,
      immediate: true,
    },
    info: {
      handler(newValue) {
        if (JSON.stringify(this.$route.query) != "{}") {
          // console.log("他人", newValue);
          this.infoData = newValue;
        }
      },
      deep: true,
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.user-card {
  width: 100%;
  min-height: 185px;
  background: #fff;
  border-radius: 6px;
  border: 1px solid #e9edf2;
  padding: 20px;
  color: #333;
  .icon {
    font-size: 24px;
    .el-icon-back {
      cursor: pointer;
    }
  }
  .box {
    margin-top: 25px;
    display: flex;
    justify-content: space-between;
    .box-left {
      .box-info {
        display: flex;
        align-items: center;
        .info-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
            display: inline-block;
            border-radius: 50%;
          }
        }
        .info-name {
          display: flex;
          align-items: center;
          font-size: 16px;
          .info-level {
            width: 20px;
            height: 10px;
            line-height: 10px;
            text-align: center;
            background: #e8f8f3;
            border-radius: 2px;
            color: #90ff00;
            margin-left: 5px;
            font-size: 10px;
          }
        }
        .info-text {
          font-size: 12px;
          color: #8992a6;
          margin-top: 5px;
        }
      }
      .indr {
        margin-top: 10px;
        font-size: 12px;
        line-height: 18px;
        color: #8992a6;
      }
      .box-b {
        margin-top: 10px;
        display: flex;
        .b-item {
          display: flex;
          align-items: center;
          margin-right: 30px;
          font-size: 14px;
          span {
            &:last-child {
              font-size: 14px;
              color: #8992a6;
              margin-left: 7px;
            }
          }

          .fan {
            color: #333;
          }
        }
      }
    }
    .box-right {
      .btn {
        min-width: 60px;
        padding: 0 15px;
        height: 25px;
        line-height: 25px;
        background: #def5ee;
        border-radius: 2px;
        font-size: 16px;
        text-align: center;
        color: #90ff00;
        cursor: pointer;
        white-space: nowrap;
      }
    }
  }
}
</style>
