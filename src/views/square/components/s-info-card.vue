<template>
  <div class="info-card" :style="detail ? 'border:none' : ''">
    <div class="info-head df aic jb">
      <div class="left df">
        <div class="avatar pointer" @click="toAuthorDetail">
          <img v-if="info.avatar" :src="info.avatar" alt="" />
          <img v-else src="@/assets/square-imgs/defaultAvatar.png" alt="" />
        </div>
        <div class="text-box">
          <div class="text df">
            <span class="name">{{ info.nickname }}</span>
          </div>
          <!-- <p class="time">{{ info.createTime }}</p> -->
          <p class="time">{{ publishDate(info.createTime) }}</p>
        </div>
      </div>
      <div class="right df">
        <slot name="header">
          <sButton
            v-if="info.uid != userInfo?.uid"
            @click="onChangeState"
            :focus="info.followStatus"
            >{{
              info.followStatus ? $t("square.已关注") : $t("square.关注")
            }}</sButton
          >
        </slot>
      </div>
    </div>
    <div class="info-content pt5">
      <slot name="content">{{ info.content }}</slot>
    </div>
    <div class="info-function">
      <div
        class="item df aic"
        v-for="item in iconList"
        :key="item.id"
        @click.stop="onFunc(item.value)"
        :class="{
          iconAtive: iconAtive == item.id,
          iconAtive: item.value == 'comment' && expandComment,
        }"
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
          <img :src="getCommunityPersonalInformation?.avatar" alt="" />
        </div>
        <div class="input">
          <s-input-emoji
            @onInput="onInput"
            @keyup="makeAComment(info)"
            ref="inputEmoji"
          ></s-input-emoji>
        </div>
        <s-button large @click="makeAComment(info)">{{
          $t("square.评论")
        }}</s-button>
      </div>

      <!-- 一般状态 -->
      <template v-if="!detail">
        <div class="middle" :class="{ pb20: iconList[1].text || list.length }">
          <div class="cell df aic" v-for="(ite, i) in list" :key="i">
            <template v-if="i < 2">
              <div class="user df">
                <span class="name">{{ ite.nickname }}</span>
                <!-- <div class="level ml10" :class="{ vip: info.level }">V1</div> -->
              </div>
              <span class="ml5 mr5">:</span>
              <div class="text">{{ ite.comment }}</div>
            </template>
          </div>
          <div class="df" @click="viewMore(false)" v-if="list.length > 2">
            <p class="more">
              <span>{{ $t("square.查看更多") }}</span>
              <i class="iconfont icon-right1"></i>
            </p>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="middle pb20">
          <sCommentCard
            ref="sCommentCard"
            :list="list"
            :key="total"
            @makeAComment="makeAComment"
            @getList="getList"
            @onSetting="onCommentAction"
            @onChangeLike="onChangeLike"
          />
          <p class="more" v-if="total > list.length">
            <span @click="viewMore(true)">{{ $t("square.查看更多") }}</span>
            <i class="iconfont icon-right1"></i>
          </p>
        </div>
      </template>
    </div>
    <creator-edit-article
      :editArticle_isShow.sync="editArticle_isShow"
      :type="editType"
      :info="info"
      @onSuccess="onSuccess"
    ></creator-edit-article>
  </div>
</template>

/** 一：插槽 1. head 默认一个按钮 2. content 中间内容 二: props 1. setting
底部按钮 是否显示【...】更多， 2. info 用户信息 包括头像 名称 等级 状态等 3. */

<script>
import sButton from "./s-button.vue";
import sSetting from "./s-setting.vue";
import sInputEmoji from "./s-input-emoji.vue";
import sCommentCard from "./s-comment-card.vue";
import creatorEditArticle from "../squareCreator/components/creator-edit-article.vue";
import $confirm from "../components/s-confirm";
import { mapGetters } from "vuex";
import * as api from "@/api/square";

import publishDate from "../js/publishDate";
export default {
  components: {
    sButton,
    sSetting,
    sInputEmoji,
    sCommentCard,
    creatorEditArticle,
  },
  computed: {
    ...mapGetters(["userInfo", "getCommunityPersonalInformation"]),
  },
  props: {
    setting: {
      type: Boolean,
      default: false,
    },
    forward: {
      type: Boolean,
      default: false,
    },
    other: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object,
      default: () => {},
    },

    //评论栏的状态 如果是一般 则简单展示评论条数 如果是detail 则详细展示
    detail: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      publishDate: publishDate,
      //初始功能列表 拿到【info】参数后 需要对其进行处理，得出如以下的list
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
      iconAtive: 100,
      expandComment: false, //是否展开评论
      comments: "", //评论内容
      list: [],
      editArticle_isShow: false,
      isLike: false,
      total: 0,
      pageSize: 10,
      pageNum: 1,
      isAritle: false,
      editType: "edit",
    };
  },
  watch: {
    info: {
      handler(data) {
        this.isLike = data.likeStatus;
        const o = {
          like: (item) => {
            item.text = data.likeCount;
          },
          comment: (item) => {
            item.text = data.commentCount;
          },
          forward: (item) => (item.text = data.repostCount),
          views: (item) => {
            item.text = data.viewCount;
          },
        };
        this.iconList.forEach((item, index) => {
          o[item.value](item);
        });
        if (data.originalContent != null || this.forward) {
          this.iconList.splice(2, 1);
        }

        // console.log("prompt", this.iconList);
        this.actionList.forEach((item, index) => {
          if (data.canPublishStatus == 0) {
            if (item.value == "edit") {
              this.actionList.splice(index, 1);
            }
          } else {
            if (item.value == "remove") {
              this.actionList.splice(index, 1);
            }
          }
        });
        if (this.other) {
          this.actionList = [
            {
              label: this.$t("square.举报"),
              value: "report",
              icon: "icon-s-report",
            },
          ];
        }
      },
      deep: true,
      immediate: true,
    },
    list: {
      handler(data) {
        // console.log("data", data);
      },
      deep: true,
    },
  },
  created() {
    this.getList();
  },

  methods: {
    toAuthorDetail() {
      const params =
        this.info.uid == this.userInfo.uid
          ? {
              path: "squarePersonal",
            }
          : {
              path: "infomation-others",
              query: {
                uid: this.info.uid,
              },
            };
      this.$router.push(params);
    },

    //查看更多
    viewMore(flag) {
      if (flag) {
        this.isAritle = true;
        ++this.pageNum;
        this.getList();
      } else {
        this.$router.push({
          path: "/square/detail",
          query: {
            id: this.info?.id,
          },
        });
      }
    },
    //获取评论列表
    getList(data, index) {
      let params = {
        contentId: this.$route.query.id || this.info.id,
        sessionId: data ? data.sessionId : undefined,
        pageNum: data ? data.pageNum : this.pageNum,
        pageSize: this.pageSize,
      };
      api.$getListOfComments(params).then((res) => {
        if (data) {
          let replyCommentList = this.list[index].replyCommentList;
          this.list[index].replyCommentList =
            data.pageNum == 1
              ? res.data.data.records
              : replyCommentList.concat(res.data.data.records);
          this.list[index].pageNum++;
        } else {
          this.list = this.isAritle
            ? this.list.concat(res.data.data.records)
            : res.data.data.records;
          this.list.forEach((item, index) => {
            this.list[index].pageNum = 1;
          });
          this.total = res.data.data.total;
          this.isAritle = false;
        }
      });
    },
    /**
     * 头部右侧按钮功能
     */
    onChangeState() {
      this.$emit("onChangeState", {
        uid: this.info.uid,
        follow: !this.info.followStatus,
      });
    },

    //评论点赞
    onChangeLike(val) {
      const params = {
        objId: val.id,
        objType: 2, //1 文章 2 评论
        like: !val.isLike,
      };
      console.log("params", params);

      api.$chengeLike(params).then((res) => {
        if (res.data.success) {
          this.getList();
        }
      });
    },

    /**
     * @param {*string} type like/forward/views
     * @description 左下角功能操作
     */
    onFunc(type) {
      if (type == "comment") {
        this.expandComment = !this.expandComment;
        if (this.expandComment) {
          this.$nextTick(() => {
            const inputBox = this.$refs.inputEmoji.$el;
            const input = inputBox.children[0];
            input.focus();
          });
        }
      } else {
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

    /**
     * @param {*string} value edit/remove/delete and so on
     * @description 右下角功能操作
     */
    onAction(value) {
      const o = {
        edit: () => {
          this.editType = "edit";
          this.editArticle_isShow = true;
        },
        remove: () => {
          $confirm("remove", () => {
            const params = {
              contentId: this.info.id,
              status: 3,
            };
            api.$putOnOrOffArticle(params).then((res) => {
              this.$emit("onSuccess", true);
              this.$message({
                type: "success",
                message: this.$t("square.成功下架"),
              });
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
        report: () => {
          this.$emit("onAction", {
            repost: this.info.repost,
            reportedId: this.info.id,
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

    //评论-更多
    onCommentAction(id, value) {
      if (value == "delete") {
        api.$delComment({ id: id }).then((res) => {
          this.$message.success("删除成功！");
          this.getList();
          this.$emit("resetDetail");
        });
      }
    },

    /**
     * 评论内容
     */
    makeAComment(data) {
      console.log("评论参数", data);
      if ((data.uid && !this.comments) || (!data.uid && !data.content)) {
        this.$message({
          message: "请输入内容！",
          type: "warning",
        });
        return;
      }
      const params = {
        contentId:
          this.$route.query.id || data.id || data.contentId || this.info.id, //文章id
        commentId: data ? data.commentId : undefined, //评论id，回复评论时传递
        content: this.comments || data.content, //评论内容
      };
      api.$onComment(params).then((res) => {
        this.$message.success("评论成功！");
        this.$nextTick((_) => {
          if (this.$refs.inputEmoji) {
            this.$refs.inputEmoji.input = "";
            this.expandComment = false;
          }
        });
        this.comments = "";
        //详情重置
        this.$emit("resetDetail");
        this.$emit("getList");
        this.$emit("onSuccess", true);
        this.getList();
      });
    },
    onSuccess() {
      this.$emit("onSuccess", true);
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
.info-card {
  border: 1px solid #e9edf2;
  border-radius: 6px;
  background-color: #fff;
  .info-head {
    padding: 20px;
    padding-bottom: 0;
    .avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
    .text-box {
      margin-left: 10px;
      .text {
        align-items: flex-end;
        .name {
          color: #333;
          font-size: 16px;
        }
      }
      .time {
        font-size: 10px;
        color: #8992a6;
      }
    }
  }
  .info-content {
    padding: 0 20px 20px 70px;
  }
  .info-function {
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
      &:last-child:hover {
        cursor: default;
      }
      &.iconAtive {
        color: #53cca9;
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
        font-weight: 500;
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
  }
}
</style>
