<template>
  <div>
    <div class="personal-card">
      <!-- 原创 -->
      <div class="card-box">
        <div class="c-avatar">
          <img v-if="info.avatar" :src="info.avatar" alt="" />
          <img v-else src="@/assets/square-imgs/defaultAvatar.png" alt="" />
        </div>
        <div class="c-right">
          <div>
            <span class="c-title">{{ info.username }}</span>
            <span class="c-level">V1</span>
            <span>{{ $formatTime(info.createTimeTsLong) }}</span>
          </div>
          <div class="c-content">{{ info.content }}</div>
        </div>
      </div>
      <!-- 转发 -->
      <div v-if="info.repost == 1">
        <div class="card-box">
          <div class="card-bo">
            <div class="sm">
              <img :src="info.originalContent.avatar" alt="" />
            </div>
            <div class="c-right">
              <div>
                <span class="c-title">{{ info.originalContent.username }}</span>
                <span class="c-level">V1</span>
                <span>{{ $formatTime(info.createTimeTsLong) }}</span>
              </div>
              <div class="c-content">{{ info.originalContent.content }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="info-function">
        <div
          class="item df aic"
          v-for="item in iconList"
          :key="item.id"
          @click.stop="onFunc(item.value)"
          :class="{ iconAtive: iconAtive == item.id }"
        >
          <i
            class="iconfont"
            :class="isLike ? 'icon-aixin' : 'icon-s-like'"
            v-if="item.value == 'like'"
          ></i>
          <i class="iconfont" :class="item.icon" v-else></i>
          <span>{{ item.text ? item.text : 0 }}</span>
        </div>
        <div class="item" v-if="setting">
          <s-setting @onAction="onAction" :actionList="actionList" />
        </div>
      </div>
      <div class="comment-box">
        <div class="top df aic jb" v-if="expandComment">
          <div class="avatar">
            <img v-if="userInfo?.avatar" :src="userInfo?.avatar" alt="" />
            <img v-else src="@/assets/square-imgs/defaultAvatar.png" alt="" />
          </div>
          <div class="input">
            <s-input-emoji @onInput="onInput" ref="inputEmoji"></s-input-emoji>
          </div>
          <s-button large @click="makeAComment(info)">{{
            $t("square.评论")
          }}</s-button>
        </div>
        <div class="reply-area"></div>
      </div>
    </div>
    <!-- 转发 -->
    <creator-edit-article
      :editArticle_isShow.sync="editArticle_isShow"
      :type="editType"
      :info="info"
    ></creator-edit-article>
  </div>
</template>

<script>
import sCommentCard from "../components/s-comment-card.vue";
import sSetting from "./s-setting.vue";
import sInputEmoji from "./s-input-emoji.vue";
import sButton from "./s-button.vue";
import creatorEditArticle from "../squareCreator/components/creator-edit-article.vue";
import $confirm from "../components/s-confirm";

import * as api from "@/api/square";

export default {
  name: "sPersonalCard",
  props: {
    setting: {
      type: Boolean,
      default: true,
    },
    info: {
      type: Object,
      default: () => {},
    },
    userInfo: {
      type: Object,
      default: () => {},
    },
  },
  components: {
    sCommentCard,
    sSetting,
    sInputEmoji,
    sButton,
    creatorEditArticle,
  },
  data() {
    return {
      iconAtive: 100,
      iconList: [
        { icon: "icon-s-like", value: "like", text: 0, id: 0 },
        { icon: "icon-s-comment", value: "comment", text: 0, id: 1 },
        { icon: "icon-s-forward", value: "forward", text: 0, id: 2 },
        { icon: "icon-s-views", value: "views", text: 0, id: 3 },
      ],
      actionList: [
        { label: this.$t("square.编辑"), value: "edit", icon: "icon-s-edit" },
        {
          label: this.$t("square.下架"),
          value: "remove",
          icon: "icon-s-remove",
        },
        {
          label: this.$t("square.删除"),
          value: "delete",
          icon: "icon-s-delete",
        },
      ],
      expandComment: false, //是否展开评论
      isLike: false,
      editArticle_isShow: false,
      editType: "edit",
    };
  },
  watch: {
    info: {
      handler(data) {
        console.log('data',data);
        this.isLike = data.likeStatus;
        const o = {
          like: (item) => (item.text = data.likeCount),
          comment: (item) => (item.text = data.commentCount),
          forward: (item) => (item.text = data.repostCount),
          views: (item) => (item.text = data.viewCount),
        };
        this.iconList.forEach((item, index) => {
          o[item.value](item);

          if (data.originalContent != null) {
            if (item.value == "forward") {
              this.iconList.splice(index, 1);
            }
          }
        });
        this.actionList.forEach((item, index) => {
          if (data.canPublishStatus == 0) {
            if (item.value == "edit") {
              this.iconList.splice(index, 1);
            }
          } else {
            if (item.value == "remove") {
              this.iconList.splice(index, 1);
            }
          }
        });
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    onFunc(type) {
      if (type == "comment") {
        this.expandComment = !this.expandComment;
      } else {
        // this.$emit("onFunc", type);
        const typeObj = {
          like: () => {
            const params = {
              objId: this.info.id,
              objType: 1, //1 文章 2 评论
              like: !this.isLike,
            };

            api.$chengeLike(params).then((res) => {
              if (res.data.success) {
                this.isLike = params.like;
                if (params.like) {
                  this.iconList[0].text = this.iconList[0].text + 1;
                } else {
                  this.iconList[0].text = this.iconList[0].text - 1;
                }
              }
            });
          },
          forward: () => {
            this.editArticle_isShow = true;
            this.editType = "forward";
          },
          views: () => {},
          run: (fn) => fn && fn(),
        };
        typeObj.run(typeObj[type]);
      }
    },
    onAction(value) {
      const o = {
        edit: () => {
          this.editType = "edit";
          this.editArticle_isShow = true;
        },
        remove: () => {
          $confirm("remove", () => {
            this.$emit("onSuccess", true);
            this.$message({
              type: "success",
              message: "下架成功",
            });
          });
        },
        delete: () => {
          const params = {
            id: this.info.id,
          };
          api.$deleteContent(params).then((res) => {
            if (res.data.success) {
              this.$emit("onSuccess", true);
              this.$message({
                type: "success",
                message: "删除成功",
              });
            }
          });
        },
        run: (fn) => fn && fn(),
      };
      o.run(o[value]);
    },
    //获取评论内容
    onInput(value) {
      this.comments = value;
    },
    //评论内容
    makeAComment(data) {
      const params = {
        contentId: this.$route.query.id || data.id, //文章id
        commentId: data ? data.commentId : undefined, //评论id，回复评论时传递
        content: this.comments || data.content, //评论内容
      };
      api.$onComment(params).then((res) => {
        this.$message.success("评论成功！");
        this.$nextTick((_) => {
          if (this.$refs.inputEmoji) {
            this.$refs.inputEmoji.input = "";
          }
        });
        this.comments = "";
        //详情重置
        this.getList();
        this.$emit("resetDetail");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.personal-card {
  background: #fff;
  border-radius: 6px;
  border: 1px solid #e9edf2;
  font-size: 14px;
  color: #333;
  .card-box {
    padding: 20px 20px 0 20px;
    display: flex;
    .c-avatar {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 36px;
      height: 36px;
      border-radius: 50%;
      margin-right: 10px;
      img {
        width: 100%;
        height: 100%;
        display: inline-block;
        border-radius: 50%;
      }
    }
    .c-right {
      font-size: 14px;
      .c-content {
        margin-top: 5px;
      }
      span {
        font-size: 10px;
      }
      .c-title {
        font-size: 12px;
      }
      .c-level {
        display: inline-block;
        height: 10px;
        line-height: 10px;
        text-align: center;
        background: #e8f8f4;
        border-radius: 2px;
        padding: 0 5px;
        color: #90ff00;
        margin: 0 5px;
      }
    }
  }
  .sm {
    width: 24px;
    height: 24px;
    background-color: pink;
    border-radius: 50%;
    margin-right: 10px;
    img {
      width: 100%;
      height: 100%;
      display: inline-block;
      border-radius: 50%;
    }
  }
  .card-bo {
    width: 100%;
    display: flex;
    min-height: 80px;
    border-radius: 6px;
    border: 1px solid #e9edf2;
    padding: 20px;
    margin-left: 46px;
  }
  .p-border {
    border: 1px solid #e9edf2;
    margin-top: 20px;
  }

  .info-function {
    margin-top: 20px;
    height: 64px;
    padding: 0 70px;
    border-top: 1px solid #e9edf2;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .item {
      color: #8992a6;
      cursor: pointer;
      span {
        font-size: 12px;
      }
      .iconfont {
        font-size: 24px;
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
      &:first-child:hover {
        color: #ff5d9a;
      }
      &.iconAtive {
        .iconfont {
          color: #53cca9;
        }
      }
    }
  }
  .comment-box {
    .top {
      padding: 20px 20px;
      border-top: 1px solid #e9edf2;
      .avatar {
        width: 36px;
        height: 36px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          display: inline-block;
        }
      }
      .input {
        flex: 1;
        display: flex;
        align-items: center;
      }
    }
    .middle {
      padding: 0 20px;
      .cell {
        font-size: 14px;
        color: #333;
        .user {
          align-items: flex-end;
        }
      }
      .more {
        display: flex;
        align-items: center;
        font-size: 12px;
        color: #8992a6;
        margin-top: 20px;
        cursor: pointer;
        &:hover {
          color: #53cca9;
        }
      }
    }
    .reply-area {
      padding: 0 20px 20px 20px;
    }
  }
}
</style>
