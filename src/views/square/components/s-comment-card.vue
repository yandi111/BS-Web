<template>
  <div class="comment_list">
    <div v-for="(item, index) in list" :key="index" class=" ">
      <div class="comment-card mb20">
        <div class="avatar mr10 pointer" @click="toAuthorDetail(item)">
          <img
            src="@/assets/square-imgs/defaultAvatar.png"
            alt=""
            v-if="!item.avatar"
          />
          <img :src="item.avatar" alt="" v-else />
        </div>
        <div class="info">
          <div class="header df aic jb">
            <div class="title df aic">
              <span class="name tf12">{{ item.nickname }}</span>
              <span class="date tf12">{{ getTime(item.createTime) }}</span>
            </div>
            <div
              class="setting"
              v-if="item.uid == $store.state.login.userInfo.uid"
            >
              <s-setting
                @onAction="onSetting(item, $event)"
                :actionList="actionList"
              />
            </div>
          </div>

          <div class="text mt10 f14">
            <span v-if="getName(item)">{{ $t("square.回复") }}</span>
            <span class="comment_name"> {{ getName(item) }}</span>
            {{ item.comment }}
          </div>
          <div class="action df aic">
            <div
              class="item df aic"
              :class="{
                active:
                  ite.value == 'comment' && expandComment && index == indexBtn,
              }"
              v-for="ite in iconList"
              :key="ite.id"
              @click.stop="onFunc(ite.value, index, item)"
            >
              <i
                class="iconfont"
                v-if="ite.value == 'like'"
                :class="item.isLike ? 'icon-aixin' : 'icon-s-like'"
              ></i>
              <i class="iconfont" :class="ite.icon" v-else></i>
              <span>{{ item[item.prop] }}</span>
            </div>
          </div>

          <div
            class="comment-box df aic jb"
            v-if="expandComment && index == indexBtn"
          >
            <div class="avatar">
              <img :src="getCommunityPersonalInformation.avatar" alt="" />
            </div>
            <div class="comment-box_input">
              <s-input-emoji
                @onInput="onInput"
                @keyup="makeAComment({ commentId: item.id, content: comments })"
                ref="inputEmoji"
              ></s-input-emoji>
            </div>
            <s-button
              large
              @click="makeAComment({ commentId: item.id, content: comments })"
              >{{ $t("square.评论") }}</s-button
            >
          </div>
        </div>
      </div>
      <div class="comment_child ml44">
        <sCommentCard
          v-if="item.replyCommentList && item.replyCommentList.length > 0"
          @onAction="onCommentAction"
          @makeAComment="makeAComment"
          @onSetting="onhandlerCommentAction"
          @onChangeLike="onHandlerChangeLike"
          :list="item.replyCommentList"
        />
        <div
          class="view_more pointer f12 pt10"
          v-if="
            item.hasMoreReply && item.replyCommentList.length < item.replyCommentCount
          "
          @click="$emit('getList', item, index)"
        >
          {{ $t("square.展开更多") }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import sButton from "./s-button.vue";
import sSetting from "./s-setting.vue";
import sInputEmoji from "./s-input-emoji.vue";
// import * as api from "@/api/square";
import { mapGetters } from "vuex";

export default {
  name: "sCommentCard",
  components: {
    sButton,
    sSetting,
    sInputEmoji,
  },
  computed: {
    ...mapGetters(["getCommunityPersonalInformation"]),
  },
  props: {
    replyCount: {
      type: Number,
      default: 0,
    },
    list: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      isMore: false,
      iconList: [
        {
          icon: "icon-s-like",
          value: "like",
          prop: "likeCount",
          text: undefined,
          id: 0,
        },
        {
          icon: "icon-s-comment",
          value: "comment",
          prop: "replyCommentList",
          text: 4,
          id: 1,
        },
      ],
      actionList: [
        // { label: "举报", value: "report", icon: "icon-s-report" },
        { label: "删除", value: "delete", icon: "icon-s-delete" },
      ],
      expandComment: false,
      sessionId: undefined,
      indexBtn: undefined,
      isShow: false,
    };
  },
  methods: {
    toAuthorDetail(item) {
      console.log("item", item);
      const params =
        item.uid == this.getCommunityPersonalInformation.uid
          ? {
              path: "squarePersonal",
            }
          : {
              path: "infomation-others",
              query: {
                uid: item.uid,
              },
            };
      this.$router.push(params);
    },
    getName(item) {
      let parent = this.list.filter((ite) => ite.id == item.replyCommentId);
      if (item.replyCommentId != -1 && parent.length > 0) {
        return parent[0].nickname;
      }
    },
    getTime(time) {
      let month = time.split(" ")[0].split("-")[1];
      let day = time.split(" ")[0].split("-")[2];
      let timeStr = month + "月" + day + "日";
      return timeStr;
    },
    onhandlerCommentAction(id, value) {
      this.$emit("onSetting", id, value);
    },
    onSetting(item, value) {
      this.$emit("onSetting", item.id, value);
    },
    onHandlerChangeLike(item) {
      this.$emit("onChangeLike", item);
    },
    onFunc(type, index, item) {
      if (type == "comment") {
        this.indexBtn = index;
        this.expandComment = !this.expandComment;
        if (this.expandComment && this.indexBtn == index) {
          this.$nextTick(() => {
            const inputBox = this.$refs.inputEmoji[0].$el;
            const input = inputBox.children[0];
            input.focus();
          });
        }
      } else {
        this.$emit("onChangeLike", item);
      }
    },
    onFun() {
      this.isShow = !this.isShow;
    },
    //获取评论内容
    onInput(value) {
      this.comments = value;
    },
    onCommentAction() {},

    /**
     * 抛出评论内容
     */
    makeAComment(item) {
      console.log("二级评论", item);
      if (!this.comments && !item.content) {
        this.$message({
          message: "请输入内容！",
          type: "warning",
        });
        return;
      }
      this.$emit("makeAComment", item);
      this.$nextTick((_) => {
        if (this.$refs.inputEmoji) {
          this.$refs.inputEmoji[0].input = "";
          this.expandComment = false;
        }
      });
      this.comments = "";
    },
  },
};
</script>

<style lang="scss" scoped>
.level {
  padding: 0 1px;
  background-color: #f4f5f7;
  font-size: 10px;
  color: #8992a6;
  &.vip {
    color: #53cca9;
    background-color: #dafef2;
  }
}
.comment-card {
  display: flex;
  color: #333;
  .avatar {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
      display: inline-block;
      border-radius: 50%;
    }
  }
  .info {
    flex: 1;
    .header {
      .title {
        font-size: 16px;
        .name {
          color: #333;
        }
        .date {
          color: #8992a6;
        }
      }
      .setting {
        ::v-deep .s-setting {
          .box {
            right: 0;
          }
        }
      }
    }

    .action {
      margin-top: 10px;
      .item {
        color: #8992a6;
        margin-right: 20px;
        cursor: pointer;
        span {
          font-size: 12px;
        }
        .iconfont {
          font-size: 22px;
          &.icon-aixin {
            display: inline-block;
            color: #ff5d9a;
            font-size: 22px;
            animation: up 0.4s linear;

            @keyframes up {
              0% {
                transform: scale(1);
              }
              50% {
                transform: scale(1.1);
              }
              100% {
                transform: scale(1);
              }
            }
          }
        }
        &:hover {
          color: #53cca9;
        }
        &.active {
          color: #53cca9;
        }
      }
    }
    .comment-box {
      padding: 10px 46px 0px 0px;
      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
        }
      }
      .comment-box_input {
        flex: 1;
        display: flex;
        align-items: center;
      }
    }
  }
}
</style>

<style lang="scss">
.c-more {
  span {
    cursor: pointer;
    color: #8992a6;
    font-size: 12px;
  }
}
.comment-box_input {
  .input-emoji {
    div {
      .emoji-picker {
        overflow-x: hidden;
        overflow-y: auto;
        bottom: 105%;
        right: 10px;
        top: auto;
        height: 200px;
        border: 1px solid red;
      }
    }
  }
}
.comment_name {
  color: #8992a6;
}
.s-setting {
  position: relative;
  .setting-icon {
    font-size: 20px;
    color: #8992a6;
    cursor: pointer;
    &:hover {
      color: var(--theme-color);
    }
  }
  .box {
    position: absolute;
    top: 100%;
    right: -20px;
    width: 80px;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.04);
    border-radius: 4px;
    overflow: hidden;
    .cell {
      padding: 0 15px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ffffff;
      color: #333;
      cursor: pointer;
      &:hover {
        background-color: #f5f7fa;
      }
      &.active {
        color: #fa596f;
        .iconfont {
          color: inherit;
        }
      }
      span {
        font-size: 12px;
      }
    }
  }
}
.view_more {
  color: #8992a6;
  padding-bottom: 20px;
  border-top: solid 1px #f5f7fa;
}
</style>
