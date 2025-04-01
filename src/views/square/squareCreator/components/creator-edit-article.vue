<template>
  <div class="edit-article" v-if="editArticle_isShow">
    <div class="mask"></div>
    <main>
      <div class="header df aic jcfe">
        <i class="iconfont icon-close2 f26" @click="close(false)"></i>
      </div>
      <div class="content df jb mt20">
        <div class="avatar mr10">
          <img
            v-if="personalInformation.avatar"
            :src="personalInformation.avatar"
            alt=""
          />
          <img v-else src="@/assets/square-imgs/defaultAvatar.png" alt="" />
        </div>
        <div class="right">
          <div class="box">
            <div class="article" v-if="type == 'edit' && infoData.repost == 0">
              <el-input
                :placeholder="$t('square.请输入标题')"
                v-model="titleVal"
                maxlength="20"
              >
              </el-input>
            </div>
            <div class="article">
              <el-input
                type="textarea"
                autosize
                :rows="2"
                :placeholder="$t('square.请输入内容')"
                v-model="input"
                maxlength="500"
              >
              </el-input>
            </div>
            <!-- 编辑--原创内容 -->
            <template v-if="type == 'edit' && infoData.repost == 0">
              <div class="img mt80" v-if="urlList?.length">
                <el-carousel trigger="click" :autoplay="false">
                  <el-carousel-item
                    v-for="(item, index) in urlList"
                    :key="index"
                  >
                    <el-image :src="item" :preview-src-list="urlList">
                    </el-image>
                    <i
                      class="iconfont icon-close2 delete"
                      @click="removeImgs(item)"
                    ></i>
                  </el-carousel-item>
                </el-carousel>
              </div>
            </template>

            <!-- 编辑--转发内容 -->
            <template v-if="type == 'edit' && infoData.repost == 1">
              <creator-edit-article-others
                :article="infoData.originalContent"
              ></creator-edit-article-others>
            </template>

            <!-- 转发 -->
            <template v-if="type == 'forward'">
              <creator-edit-article-others
                :article="infoData"
                forward
              ></creator-edit-article-others>
            </template>
          </div>
        </div>
      </div>
      <div class="footer df aic jb">
        <div class="imgs df">
          <s-emojis @onPick="onPick" ref="emojis"></s-emojis>
          <picture-upload
            ref="sUpload"
            @success="fileSuccess"
            v-if="type == 'edit' && infoData.originalContent == null"
          ></picture-upload>
        </div>
        <div class="btn" @click="sendComment">{{ $t("square.发文") }}</div>
      </div>
    </main>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import sEmojis from "../../components/s-emojis.vue";
import pictureUpload from "@/components/pictureUpload/index.vue";
import creatorEditArticleOthers from "./creator-edit-article-others.vue";
import $confirm from "../../components/s-confirm";
import myImg from "@/components/my-preview";

import { $editArticles, $forwardArticles } from "@/api/square";
export default {
  components: {
    pictureUpload,
    sEmojis,
    creatorEditArticleOthers,
    myImg,
  },
  props: {
    editArticle_isShow: {
      type: Boolean,
      default: false,
    },
    info: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: "edit", //操作方式 edit forward
    },
  },
  data() {
    return {
      personalInformation: {},
      input: "",
      titleVal: "",
      imgsList: [],
      urlList: [],
      infoData: {},
    };
  },
  computed: {
    ...mapGetters(["userInfo", "getCommunityPersonalInformation"]),
    isOther() {
      console.log("this.userInfo", this.userInfo);
      if (this.userInfo.uid == this.info.uid) {
        return false;
      } else {
        return true;
      }
    },
  },
  methods: {
    getPersonalInformation() {
      this.personalInformation = this.getCommunityPersonalInformation;
    },
    close(flag) {
      if (flag) {
        this.input = "";
        // this.personalInformation = {};
        this.imgsList = [];
        this.urlList = this.info.urls ? this.info.urls : [];
        this.infoData = {};
        this.$emit("update:editArticle_isShow", false);
      } else {
        $confirm("edit", () => {
          this.input = "";
          this.imgsList = [];
          this.urlList = this.info.urls ? this.info.urls : [];
          this.infoData = {};
          this.$emit("update:editArticle_isShow", false);
        });
      }
    },
    onPick(value) {
      this.input += value;
    },
    fileSuccess(url) {
      // console.log("this.ur", this.urlList);
      this.urlList.unshift(url);
      this.imgsList = [...this.urlList];
    },
    removeImgs(item) {
      const index = this.urlList.indexOf(item);
      this.urlList.splice(index, 1);
      this.$refs.sUpload.fileDel(index);
      this.imgsList = this.urlList;
    },
    sendComment() {
      if (this.type == "edit") {
        const title = this.infoData.repost == 0 ? this.titleVal : null;
        const params = {
          id: this.info.id,
          title: title,
          content: this.input,
          urls: this.imgsList,
        };

        // console.log("params", params);
        $editArticles(params).then((res) => {
          if (res.data.success) {
            this.close(true);
            this.$message({
              type: "success",
              message: "编辑成功",
            });
            this.$emit("onSuccess");
          }
        });
      } else {
        const params = {
          contentId: this.info.id,
          content: this.input,
        };
        $forwardArticles(params).then((res) => {
          if (res.data.success) {
            this.close(true);
            this.$emit("onSuccess", true);
            this.$message({
              type: "success",
              message: "转发成功",
            });
          }
        });
      }
    },
  },
  watch: {
    editArticle_isShow: {
      handler(value) {
        if (value) {
          this.infoData = JSON.parse(JSON.stringify(this.info));
          if (this.type == "edit") {
            this.input = this.infoData.content;
            this.titleVal = this.infoData.title;
            this.urlList = this.infoData.urls ? this.infoData.urls : [];
          } else if (this.type == "forward") {
            this.input == "";
          }
          console.log("this.infofData", this.infoData);
        }
      },
    },
  },
  mounted() {
    this.getPersonalInformation();
  },
};
</script>

<style lang="scss" scoped>
.edit-article {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2000;
  .mask {
    width: 100vw;
    height: 100vh;
    background-color: rgba($color: #000000, $alpha: 0.2);
    color: #333;
  }
  main {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 500px;
    height: 600px;
    padding: 20px;
    background: #ffffff;
    border-radius: 10px;
    .header {
      justify-content: flex-end;
      .iconfont {
        color: #b2b2b2;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }
    .content {
      .avatar {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .right {
        flex: 1;
        height: 470px;
        padding: 15px 0px 15px 15px;
        background: #f5f7fa;
        border-radius: 10px;

        .box {
          width: 100%;
          height: 440px;
          padding-right: 15px;
          overflow-y: scroll;
          &::-webkit-scrollbar {
            width: 3px;
          }
          .article {
            flex: 1;
            width: 100%;
            font-size: 14px;
            ::v-deep .el-textarea__inner {
              padding: 5px 0 !important;
              height: 140px !important;
              border: none;
              background-color: #f5f7fa;
            }
            ::v-deep .el-input__inner {
              padding: 5px 0 !important;
              border: none;
              background-color: #f5f7fa;
            }
          }
          .img {
            position: relative;
            width: 370px;
            height: 200px;
            border-bottom-left-radius: 5px;
            border-bottom-right-radius: 5px;
            overflow: hidden;
            // z-index: 9999;
            z-index: 1;
            ::v-deep .el-carousel {
              .el-carousel__container {
                width: 370px;
                height: 200px;

                .el-carousel__item {
                  &:hover {
                    .delete {
                      display: flex;
                    }
                  }
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  width: 100%;
                  height: 100%;

                  .el-image {
                    width: 100%;
                  }
                  .delete {
                    display: none;
                    position: absolute;
                    top: 10px;
                    right: 10px;
                    font-size: 28px;
                    opacity: 0.5;
                    cursor: pointer;
                  }
                }
              }
              .el-carousel__indicators {
                .el-carousel__indicator {
                  .el-carousel__button {
                    width: 10px !important;
                  }
                }
              }
            }
          }
        }
      }
    }
    .footer {
      padding-top: 16px;
      padding-left: 60px;
      .imgs {
        color: #96a2b2;
        .iconfont {
          position: relative;
          cursor: pointer;
          transition: all 0.2s linear;
        }
      }
      .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        padding: 0 19px;
        font-size: 16px;
        color: #fff;
        background: #90ff00;
        border-radius: 6px;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      }
    }
  }
}
</style>
