<template>
  <div class="s-home">
    <div class="s-h-search">
      <s-search @onSearch="onSearch"></s-search>
    </div>
    <div
      class="notify-search-list"
      v-if="JSON.stringify($route.query) !== '{}'"
    >
      <search-list></search-list>
    </div>
    <div class="s-write" v-if="JSON.stringify($route.query) == '{}'">
      <div class="article-publish">
        <s-tabs
          v-if="tabsList.length"
          :tabsList="tabsList"
          :active.sync="activeId"
        >
          <template>
            <div class="s-write-btn" @click="toPublish">
              <img src="@/assets/square-imgs/write.png" alt="" />
              <span>{{ $t("square.写文章") }}</span>
            </div>
          </template>
        </s-tabs>
        <div class="s-textarea">
          <div class="s-textarea-icon">
            <img
              src="@/assets/square-imgs/defaultAvatar.png"
              alt=""
              v-if="!getCommunityPersonalInformation?.avatar"
            />
            <img :src="getCommunityPersonalInformation.avatar" alt="" v-else />
          </div>
          <div class="s-textarea-text">
            <el-input
              class="s-input"
              v-model.trim="input"
              :placeholder="$t('square.输入标题')"
              maxlength="20"
            ></el-input>
            <el-input
              class="s-textarea-inp"
              type="textarea"
              :placeholder="$t('square.分享您的看法')"
              v-model.trim="textarea"
              maxlength="500"
              autosize
              show-word-limit
              height="200px"
            >
            </el-input>
            <div>
              <img-list ref="imgListRef" :imgList="urls"></img-list>
            </div>
          </div>
        </div>
        <div class="s-write-b">
          <div class="s-write-l">
            <s-emojis @onPick="onPick" ref="emojis"></s-emojis>
            <picture-upload
              ref="sUpload"
              @success="fileSuccess"
            ></picture-upload>
            <div class="article-icon">
              <i
                class="iconfont icon-s-article"
                @click="$router.push('/comLayout/squarePublish')"
              ></i>
            </div>
          </div>
          <div class="s-write-r" :class="input && textarea ? 'bg' : ''">
            <div v-if="!input && !textarea">{{ $t("square.发布") }}</div>
            <div v-else @click="publish">{{ $t("square.发布") }}</div>
          </div>
        </div>
      </div>
      <div
        class="s-article-list"
        v-infinite-scroll="getArticleList"
        :infinite-scroll-disabled="!isLoad"
      >
        <sEmptyStatus :state="state" v-if="list.length == 0" />
        <div class="s-focus" v-for="(item, index) in list" :key="index">
          <s-info-card
            :info="item"
            @onChangeState="onChangeState"
            @onSuccess="
              () => {
                getArticleList('loading');
              }
            "
          >
            <template #content>
              <div class="container">
                <div
                  class="textbox pointer"
                  @click="
                    $router.push({
                      path: '/square/detail',
                      query: { id: item.id },
                    })
                  "
                >
                  <p class="name">{{ item.title }}</p>
                  <div class="text">{{ item.content }}</div>
                </div>
                <div class="imgsBox mt10" v-if="item.urls">
                  <s-imags :urls="item.urls" />
                </div>
                <div class="orinal mt10" v-if="item.originalContent">
                  <detailForward :info="item.originalContent" />
                </div>
              </div>
            </template>
          </s-info-card>
        </div>
      </div>
      <el-backtop
        target=".s-article-list"
        :bottom="150"
        ref="backtop"
      ></el-backtop>
    </div>
  </div>
</template>

<script>
// 多语言 
import sSearch from "../components/s-search.vue";
import sTabs from "../components/s-tabs.vue";
import sInfoCard from "../components/s-info-card.vue";
import sEmojis from "../components/s-emojis.vue";
import pictureUpload from "@/components/pictureUpload/index.vue";
import imgList from "../components/s-imgList.vue";
import sImags from "../components/s-imgs.vue";
import searchList from "../components/s-search-list.vue";
import sEmptyStatus from "../components/s-empty-status.vue";
import detailForward from "../squareDetail/components/detail-forward.vue";

import * as api from "@/api/square.js";
import { mapGetters } from "vuex";
export default {
  name: "squareHome",
  components: {
    sSearch,
    sTabs,
    sInfoCard,
    sEmojis,
    pictureUpload,
    imgList,
    sImags,
    searchList,
    sEmptyStatus,
    detailForward,
  },
  data() {
    return {
      searchVal: "",
      tabsList: [
        {
          id: 1,
          label: this.$t("square.推荐"),
        },
        {
          id: 2,
          label: this.$t("square.正在关注"),
        },
      ],
      textarea: "",
      input: "",
      isPublish: false,
      urls: [],
      activeId: 1,
      list: [],
      params: {
        pageNum: 1,
        pageSize: 10,
        sortType: 1, //排序方式 1：最新 2：最热
        keyword: "", //搜索关键字
        type: 2, //列表类型 1：关注的内容 2：所有
        // uid: 1, //作者uid 查询作者的内容是使用
        isRepost: null, //是否为转发的内容 0：原创 1：转发 null:全部
      },
      state: "",
      isLoad: true,
      keyMap: {},
    };
  },
  computed: {
    ...mapGetters(["getCommunityPersonalInformation"]),
  },
  methods: {
    //搜索
    onSearch(val) {
      // console.log("搜索参数", val);
      this.$router.push({
        url: "/square/squareHome",
        query: {
          search: val,
        },
      });
    },

    // 发布
    publish() {
      if (this.isPublish) return;
      this.isPublish = true;
      const params = {
        title: this.input,
        content: this.textarea,
        urls: this.urls,
      };
      if (this.input && this.textarea) {
        api
          .$publishArticles(params)
          .then((res) => {
            // console.log("res.data", res.data);
            if (res.data.success) {
              this.getArticleList("loading");
              this.$message({
                message: this.$t("square.发布成功"),
                type: "success",
              });
            }
          })
          .finally(() => {
            this.initPrams();
          });
      }
    },

    toPublish() {
      this.$router.push("/comLayout/squarePublish");
    },
    //参数初始化
    initPrams() {
      this.input = "";
      this.textarea = "";
      this.$refs.imgListRef.list = [];
      this.isPublish = false;
    },
    //选取表情
    onPick(value) {
      this.textarea += value;
    },
    fileSuccess(url) {
      this.urls.push(url);
      console.log("上传url>>>>", url);
    },

    //获取文章列表
    getArticleList(loading) {
      this.state = "";
      this.params.sortType = this.activeId == 1 ? 2 : 1;
      const params = this.params;
      params.type = this.activeId == 1 ? 2 : 1;

      //重置页数为1 数组置空 滚动回顶部
      if (loading == "loading") {
        this.params.pageNum = 1;
        this.list = [];
        this.$refs.backtop.scrollToTop();
      }

      //查询时 会调两次
      const key = `_${this.params.pageNum}`;
      const value = this.keyMap[key];
      if (value) return;
      this.keyMap[key] = "temp";

      // if (!this.isLoad) return;
      api
        .$getArticleList(params)
        .then((res) => {
          this.state = "success";

          this.list = [...this.list, ...res.data.data.records];
          // console.log("文章列表", this.list);
          this.params.pageNum++;
          this.isLoad = this.list.length == res.data.data.total ? false : true;
          console.log("this.list", this.list);
        })
        .catch((err) => {
          this.state = "error";
          this.isLoad = false;
        })
        .finally(() => {
          this.keyMap = {};
        });
    },

    //关注状态
    onChangeState(val) {
      const params = val;
      api.$onFollowOperations(params).then((res) => {
        console.log("res.data.data", res.data.data);
        if (res.data.success) {
          this.getArticleList("loading");
        }
      });
    },
  },
  watch: {
    activeId: {
      handler(newValue) {
        this.isLoad = true;
        this.getArticleList("loading");
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.s-home {
  position: relative;
  width: 934px;
  // height: 960px;
  .el-backtop {
    position: absolute;
  }
  .s-h-search {
    margin-bottom: 15px;
  }
  .s-write {
    // height: 900px;
    overflow: hidden;
    border-radius: 6px;
    .article-publish {
      padding: 20px;
      background: #ffffff;
      border: 1px solid #e9edf2;
      border-radius: 6px;
      .s-write-btn {
        position: relative;
        height: 30px;
        line-height: 30px;
        border-radius: 6px;
        border: 1px solid #90ff00;
        padding: 0 15px;
        color: #90ff00;
        cursor: pointer;
        img {
          width: 14px;
          height: 14px;
          display: inline-block;
          margin-right: 5px;
        }
      }
      .s-textarea {
        margin-top: 20px;
        display: flex;
        .s-textarea-icon {
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
        .s-textarea-text {
          background: #f5f7fa;
          flex: 1;
          .s-input {
            ::v-deep .el-input__inner {
              background: #f5f7fa;
              border: none;
              padding: 10px 10px 0 10px;
            }
            ::v-deep {
              input::-webkit-input-placeholder {
                color: #666666 !important;
                font-size: 16px;
              }
            }
          }
          .s-textarea-inp {
            ::v-deep .el-textarea__inner {
              background: #f5f7fa;
              border: none;
              padding: 0px 10px 10px 10px;
              max-height: 150px;
              min-height: 55px !important;
            }
            ::v-deep {
              textarea::-webkit-input-placeholder {
                color: #666 !important;
                font-size: 14px;
              }
            }
          }
        }
      }
      .s-write-b {
        margin-top: 15px;
        display: flex;
        justify-content: space-between;
        .s-write-l {
          position: relative;
          display: flex;
          align-items: center;
          padding-left: 50px;
          .article-icon {
            margin-left: 10px;
          }
          .iconfont {
            display: inline-block;
            font-size: 24px;
            color: #8e97aa;
            margin-right: 10px;
            transform-origin: center;
            cursor: pointer;
            &:hover {
              color: #90ff00;
              transform: scale(1.1);
            }
          }
          img {
            width: 24px;
            height: 24px;
            display: inline-block;
            cursor: pointer;
            margin-right: 10px;
          }
        }
        .s-write-r {
          height: 30px;
          line-height: 30px;
          background: #f4f5f7;
          color: #333;
          border-radius: 6px;
          font-size: 16px;
          text-align: center;
          cursor: not-allowed;
          padding: 0 18px;
          user-select: none;
          .disable {
            pointer-events: none;
          }
        }
        .bg {
          background: #90ff00;
          color: #fff;
          cursor: pointer;
        }
      }
    }
    .s-article-list {
      margin-top: 15px;
      // height: 655px;
      // overflow-y: auto;
      border-radius: 8px;
      background-color: #fff;
      .s-focus {
        padding-bottom: 15px;
        background-color: #f5f7fa;
        &:last-child {
          padding-bottom: 0;
        }
        .container {
          .textbox {
            color: #333;
            font-size: 14px;
            .name {
              font-size: 16px;
            }
            .text {
              word-break: break-all;
            }
          }
          .imgsBox {
            position: relative;
            border-radius: 10px;
            overflow: hidden;
          }
        }
      }
    }
  }

  .notify-search-list {
    background: #fff;
    width: 940px;
  }
}
</style>

<style lang="scss">
.s-write-l {
  .emoji-picker {
    top: 100%;
    left: 50px;
    width: 600px;
    height: 200px;
    border: none;
    background-color: #fff;
    .emoji-picker__search {
      background-color: inherit;
      input {
        background-color: inherit;
      }
    }
  }
}
</style>
