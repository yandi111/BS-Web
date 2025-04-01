<template>
  <div>
    <div class="creator-card">
      <!-- 转发的内容 -->
      <template v-if="info.repost">
        <div class="head df aic">
          <div class="icon">
            <img src="@/assets/square-imgs/titleIcon.png" alt="" />
          </div>
          <span class="title">{{ info.content }}</span>
        </div>
        <div class="content df aic jb">
          <template v-if="info.originalContent.visible">
            <div class="texts">
              <p>@{{ info.originalContent.nickname }}</p>
              <p class="ellipsis2 mt5">
                {{ info.originalContent.content }}
              </p>
            </div>
            <div>
              <img
                v-if="info?.originalContent?.urls"
                :src="info?.originalContent.urls[0]"
                alt=""
              />
            </div>
          </template>
          <template v-else>
            <div class="texts">
              <p>@{{ info.originalContent.nickname }}</p>
              <p class="ellipsis2 mt5">{{ $t("square.引用内容已删除") }}</p>
            </div>
          </template>
        </div>
      </template>
      <template v-else>
        <div class="content-original df jb">
          <div class="icon mr5">
            <img src="@/assets/square-imgs/titleIcon.png" alt="" />
          </div>
          <div class="texts">
            <div class="title mb5">{{ info.title }}</div>
            <p class="ellipsis2 mr10">
              {{ info.content }}
            </p>
          </div>
          <div class="img">
            <img v-if="info.urls" :src="info?.urls[0]" alt="" />
            <!-- <img v-else src="@/assets/square-imgs/s-nopic.png" alt="" /> -->
          </div>
        </div>
      </template>

      <div class="bottom">
        <div class="date mb5">
          <span>{{ info.createTime }}</span>
          <span class="ml5">{{ $t("square.已发布") }}</span>
        </div>
        <div class="actions df aic jb">
          <div class="left df aic">
            <div class="item df aic" v-for="item in iconList" :key="item.id">
              <i class="iconfont" :class="item.icon"></i>
              <span>{{ item.text ? item.text : 0 }}</span>
            </div>
          </div>
          <div class="right df aic">
            <div
              class="item ml20"
              :class="{ more: item.value === 'more' }"
              :ref="item.value === 'more' ? 'more' : ''"
              v-for="item in actionList2"
              :key="item.id"
            >
              <span @click="onAction(item)"> {{ item.label }}</span>
              <div class="pop" v-if="expand">
                <div
                  class="cell df aic jc"
                  :class="{ active: currntIndex == item.id }"
                  v-for="item in moreList"
                  :key="item.id"
                  @click="onMore(item)"
                >
                  <!-- <i class="iconfont f20 mr5" :class="item.icon"></i> -->
                  <span> {{ item.label | translate }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <creator-edit-article
      :editArticle_isShow.sync="editArticle_isShow"
      type="edit"
      :info="info"
      @onSuccess="updateEdit"
    ></creator-edit-article>
  </div>
</template>

<script>
import creatorEditArticle from "./creator-edit-article.vue";
import $confirm from "../../components/s-confirm";

import * as api from "@/api/square";
export default {
  components: {
    creatorEditArticle,
  },

  props: {
    info: {
      type: Object,
      default: () => {},
    },
    noEdit: {
      type: Boolean,
      default: false,
    },
    moreList: {
      type: Array,
      default: () => [
        {
          label: "square.下架",
          icon: "icon-s-remove",
          value: "remove",
          id: 0,
        },
        {
          label: "square.删除",
          icon: "icon-s-delete",
          value: "delete",
          id: 1,
        },
      ],
    },
  },
  data() {
    return {
      iconList: [
        { icon: "icon-s-views", text: 0, id: 0, value: "views" },
        { icon: "icon-s-like", text: 0, id: 1, value: "like" },
        { icon: "icon-s-forward", text: 0, id: 2, value: "forward" },
        { icon: "icon-s-comment", text: 0, id: 3, value: "comment" },
      ],
      actionList2: [
        { label: this.$t("square.查看"), id: 0, value: "check" },
        { label: this.$t("square.编辑"), id: 1, value: "edit" },
        { label: this.$t("square.更多"), id: 2, value: "more" },
      ],
      currntIndex: 10,
      expand: false,
      editArticle_isShow: false,
    };
  },
  methods: {
    onAction(val) {
      if (val.value != "more") {
        const o = {
          edit: () => (this.editArticle_isShow = true),
          check: () => {
            this.$router.push({
              name: "squareDetail",
              query: {
                id: this.info.id,
              },
            });
          },
          run: (fn) => fn && fn(),
        };
        o.run(o[val.value]);
      } else {
        this.expand = !this.expand;
      }
    },

    onMore(val) {
      this.currntIndex = val.id;
      const o = {
        remove: () => {
          $confirm("remove", () => {
            //发请求
            const params = {
              contentId: this.info.id,
              status: 3,
            };

            api.$putOnOrOffArticle(params).then((res) => {
              if (res.data.success) {
                this.$emit("onSuccess", true);
                this.$message({
                  type: "success",
                  message: this.$t("square.成功下架"),
                });
              }
            });
          });
        },
        add: () => {
          const params = {
            contentId: this.info.id,
            status: 2,
          };
          api.$putOnOrOffArticle(params).then((res) => {
            if (res.data.success) {
              this.$emit("onSuccess", true);
              this.$message({
                type: "success",
                message: this.$t("square.成功上架"),
              });
            }
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
                message: this.$t("square.删除成功"),
              });
            }
          });
        },
        run: (fn) => fn && fn(),
      };
      o.run(o[val.value]);
    },

    close(e) {
      if (this.$refs.more) {
        let dom = this.$refs?.more[0];
        if (dom) {
          if (dom.contains(e.target) == false) {
            this.expand = false;
            this.currntIndex = 10;
          }
        }
      }
    },
    updateEdit(){
      this.$emit('onSuccess')
    }
  },
  watch: {
    noEdit: {
      handler(newValue) {
        const arr = [
          { label: this.$t("square.查看"), id: 0, value: "check" },
          { label: this.$t("square.编辑"), id: 1, value: "edit" },
          { label: this.$t("square.更多"), id: 2, value: "more" },
        ];
        this.actionList2 = newValue
          ? arr.filter((item) => item.value != "edit")
          : arr;
      },
      immediate: true,
    },
    info: {
      handler(data) {
        // console.log("data", data);
        const o = {
          like: (item) => (item.text = data.likeCount),
          comment: (item) => (item.text = data.commentCount),
          forward: (item) => (item.text = data.repostCount),
          views: (item) => (item.text = data.viewCount),
        };
        this.iconList.forEach((item) => {
          o[item.value](item);
        });
      },
      deep: true,
      immediate: true,
    },
  },
  mounted() {
    document.addEventListener("click", (e) => {
      this.close(e);
    });
  },
  beforeDestroy() {
    document.removeEventListener("click", (e) => {
      this.close(e);
    });
  },
};
</script>

<style lang="scss" scoped>
.creator-card {
  border-top: 1px solid #e9edf2;
  padding-top: 20px;
  background-color: #fff;
  .head {
    .icon {
      width: 24px;
      height: 24px;
      background-color: #f4f5f7;
      border-radius: 2px;
      img {
        width: 100%;
      }
    }
    .title {
      margin-left: 10px;
      font-size: 14px;
      color: #333;
    }
  }
  .content {
    margin: 12px 0;
    padding: 10px 10px 12px 10px;
    background-color: #f5f7fa;
    border-radius: 6px;
    .texts {
      flex: 1;
      font-size: 12px;
      color: #333;
      line-height: 18px;
      padding-right: 20px;
    }
    img {
      width: 60px;
      height: 60px;
    }
  }
  .content-original {
    .icon {
      width: 24px;
      height: 24px;
      background-color: #f4f5f7;
      border-radius: 2px;
      img {
        width: 100%;
      }
    }
    .texts {
      width: 800px;
      font-size: 14px;
      color: #333;
      flex-wrap: wrap;
      .title {
        display: flex;
        align-items: center;
        height: 24px;
      }
    }
    .img {
      width: 60px;
      height: 60px;
      overflow: hidden;
      img {
        width: 100%;
        // height: 100%;
      }
    }
  }
  .bottom {
    padding-bottom: 20px;
    .date {
      color: #8992a6;
      font-size: 12px;
    }
    .actions {
      .left {
        .item {
          font-size: 12px;
          color: #8992a6;
          margin-right: 20px;
          .iconfont {
            font-size: 24px;
          }
        }
      }
      .right {
        position: relative;
        .item {
          color: #90ff00;
          font-size: 14px;
          cursor: pointer;
        }
        .pop {
          position: absolute;
          right: 0;
          top: 110%;
          width: 80px;
          box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.04);
          border-radius: 4px;
          .cell {
            height: 40px;
            font-size: 12px;
            color: #333;
            padding-left: 10px;
            background-color: #fff;
            cursor: pointer;
            &:hover {
              background-color: #f5f7fa;
            }
            &.active {
              color: #fa596f;
            }
          }
        }
      }
    }
  }
}
</style>
