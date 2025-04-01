<template>
  <div class="s-notify-focus">
    <div class="s-notify-box">
      <div class="s-notify-l">
        <div class="notify-l-box">
          <div class="l-box-icon pointer" @click="toAuthorDetail">
            <img v-if="info?.avatar" :src="info?.avatar" alt="" />
            <img v-else src="@/assets/square-imgs/defaultAvatar.png" alt="" />
          </div>
          <div class="l-box-r">
            <div class="box-r-title">
              <span>{{ info?.nickname }}</span>
              <!-- <span class="r-title-level">V3</span> -->
            </div>
            <div class="box-r-text">
              <span>{{ sText }}</span>
              <span class="box-r-date">{{
                publishDate(info?.createTime)
              }}</span>
            </div>
            <div v-show="isLike">
              <div class="like">
                <div class="like-icon" v-if="info?.objContent"></div>
                <div
                  :class="{ pointer: info.visibleStatus }"
                  @click="commentArticleDetails(info, 'isLike')"
                >
                  {{ info?.objContent }}
                </div>
              </div>
            </div>
            <div v-show="isComment">
              <!-- 1、评论文章 转发文章-->
              <div v-if="info.type == 1 || info.type == 3">
                <div
                  class="comment-title"
                  :class="{ pointer: info.type == 3 && info.visibleStatus }"
                  @click="toForwardDetail(info)"
                >
                  {{
                    info.visibleStatus == 0
                      ? $t("square.评论已删除")
                      : info?.content
                  }}
                </div>
                <div class="comment">
                  <div class="comment-icon" v-if="info?.title"></div>
                  <div
                    class="comment-text"
                    :class="{ pointer: info.contentVisibleStatus == 1 }"
                    @click="commentArticleDetails(info, 'isComment')"
                  >
                    {{
                      info.contentVisibleStatus == 0
                        ? $t("square.文章已删除")
                        : info?.title
                    }}
                  </div>
                </div>
              </div>
              <!-- 2、回复评论 -->
              <div v-if="info.type == 2">
                <div class="comment-title">
                  {{
                    info.deleteStatus == 1
                      ? $t("square.评论已删除")
                      : info?.content
                  }}
                </div>
                <div class="comment">
                  <div
                    class="comment-icon"
                    v-if="info?.replyCommentContent"
                  ></div>
                  <div
                    class="comment-text"
                    :class="{ pointer: info.contentDeleteStatus != 1 }"
                    @click="toDetail(info.contentDeleteStatus)"
                  >
                    {{
                      info.contentDeleteStatus == 1
                        ? $t("square.文章已删除")
                        : info?.replyCommentContent
                    }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <slot></slot>
      </div>
    </div>
    <div class="s-notify-border">
      <div class="border"></div>
    </div>
  </div>
</template>

<script>
import publishDate from "../js/publishDate";
export default {
  name: "sNotifyFocus",
  props: {
    isLike: {
      type: Boolean,
      default: false,
    },
    isComment: {
      type: Boolean,
      default: false,
    },
    sText: {
      type: String,
      default: "",
    },
    info: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      publishDate,
    };
  },
  methods: {
    toDetail(flag) {
      if (!flag) {
        this.$router.push({
          path: "/square/detail",
          query: {
            id: this.info?.contentId,
          },
        });
      }
    },
    //评论文章或转发 跳转原文
    commentArticleDetails(item, flag) {
      console.log("12", item);
      if (flag == "isLike") {
        if (!item.visibleStatus) return;
      } else if (flag == "isComment") {
        if (item.type != 2) {
          if (!item.contentVisibleStatus) return;
        } else {
          if (!item.visibleStatus) return;
        }
      }
      this.$router.push({
        path: "/square/detail",
        query: {
          id: item.contentId,
        },
      });
    },
    toForwardDetail(item) {
      if (!item.visibleStatus) return;
      this.$router.push({
        path: "/square/detail",
        query: {
          id: item.objId,
        },
      });
    },
    toAuthorDetail() {
      const params = {
        path: "infomation-others",
        query: {
          uid: this.info.uid,
        },
      };
      this.$router.push(params);
    },
  },
};
</script>

<style lang="scss" scoped>
.s-notify-focus {
  margin-bottom: 20px;
  color: #333;
  .s-notify-box {
    display: flex;
    justify-content: space-between;
    .s-notify-l {
      .notify-l-box {
        display: flex;
        .l-box-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          margin-right: 10px;
          img {
            width: 100%;
            height: 100%;
            display: inline-block;
            border-radius: 50%;
          }
        }
        .l-box-r {
          .box-r-title {
            font-size: 16px;
            .r-title-level {
              height: 10px;
              line-height: 10px;
              text-align: center;
              background: #e8f8f4;
              border-radius: 2px;
              color: #90ff00;
              display: inline-block;
              padding: 0 5px;
              font-size: 10px;
              margin-left: 5px;
            }
          }
          .box-r-text {
            margin-top: 5px;
            font-size: 10px;
            color: #8992a6;
            .box-r-date {
              padding-left: 5px;
            }
          }
          .like {
            margin-top: 10px;
            display: flex;
            align-items: center;
            font-size: 14px;
            .like-icon {
              width: 4px;
              height: 20px;
              background: #e9edf2;
              margin-right: 5px;
            }
          }
          .comment-title {
            margin: 10px 0 5px 0;
            font-size: 14px;
          }
          .comment {
            margin-top: 10px;
            display: flex;
            align-items: center;
            font-size: 12px;
            .comment-icon {
              width: 4px;
              height: 10px;
              background: #e9edf2;
              margin-right: 5px;
            }
          }
        }
      }
    }
  }
  .s-notify-border {
    margin-top: 25px;
    padding-left: 50px;
    .border {
      border: 1px solid #e9edf2;
    }
  }
}
</style>
