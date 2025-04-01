<template>
  <div class="sPublish">
    <div class="sp-title">
      <div class="title-l">{{ $t("square.动态·文章编辑") }}</div>
      <div class="title-r">
        <div class="title-btn" :class="titleVal && textVal ? 'bg' : ''">
          <div class="disable" v-if="!titleVal && !textVal">
            {{ $t("square.发布") }}
          </div>
          <div v-else @click="publish">{{ $t("square.发布") }}</div>
        </div>
      </div>
    </div>
    <div class="sp-content">
      <div class="sp-title-whrite">
        <el-input
          :placeholder="$t('square.请输入标题')"
          v-model.trim="titleVal"
          maxlength="20"
          show-word-limit
        >
        </el-input>
      </div>
      <div>
        <img-list :imgList="urls" ref="imgListRef"></img-list>
      </div>
      <div class="sp-border"></div>
      <div class="sp-icon">
        <div class="sp-reletive">
          <s-emojis @onPick="onPick"></s-emojis>
        </div>
        <div>
          <picture-upload
            ref="spUpload"
            @success="fileSuccess"
          ></picture-upload>
        </div>
      </div>
      <div class="sp-border"></div>
      <div class="sp-text-whrite">
        <el-input
          type="textarea"
          :placeholder="$t('square.从这里开始写正文')"
          v-model.trim="textVal"
          maxlength="500"
          show-word-limit
        >
        </el-input>
      </div>
      <!-- <div class="sp-border"></div>
      <div class="sp-summary">
        <div class="summary-title">摘要</div>
        <div class="summary-des">摘要将优先展示以帮助读者快速了解文章信息</div>
        <div class="summary-text">
          <el-input
            type="textarea"
            placeholder="请输入摘要"
            v-model.trim="summaryVal"
            maxlength="500"
            show-word-limit
          >
          </el-input>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script>
import sEmojis from "../components/s-emojis.vue";
import pictureUpload from "@/components/pictureUpload/index.vue";
import imgList from "../components/s-imgList.vue";
import { $publishArticles } from "@/api/square";
export default {
  name: "sPublish",
  components: {
    sEmojis,
    pictureUpload,
    imgList,
  },
  data() {
    return {
      titleVal: "",
      textVal: "",
      isPublish: false,
      isVal: false,
      urls: [],
    };
  },

  methods: {
    publish() {
      if (this.isPublish) return;
      this.isPublish = true;
      const params = {
        title: this.titleVal,
        content: this.textVal,
        urls: this.urls,
      };
      if (this.titleVal && this.textVal) {
        $publishArticles(params)
          .then((res) => {
            if (res.data.code == 1) {
              this.$message({
                message: this.$t("square.发布成功"),
                type: "success",
              });
              this.$router.push("/square/squareHome");
            }
          })
          .finally(() => {
            this.initPrams();
          });
      }
    },
    onPick(val) {
      this.textVal += val;
    },
    fileSuccess(url) {
      this.urls.push(url);
    },
    //参数初始化
    initPrams() {
      this.titleVal = "";
      this.textVal = "";
      this.$refs.imgListRef.list = [];
      this.isPublish = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.sPublish {
  height: 100%;
  color: #333;
  padding-top: 40px;
  .sp-title {
    height: 60px;
    background: linear-gradient(270deg, #ffffff 0%, #a8eed9 100%);
    border-radius: 6px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
    .title-l {
      font-size: 14px;
      color: #666;
    }
    .title-r {
      display: flex;
      align-items: center;
      .title-btn {
        height: 35px;
        line-height: 35px;
        border-radius: 2px;
        background: #f4f5f7;
        color: #333;
        font-size: 16px;
        text-align: center;
        padding: 0 15px;
        margin-left: 20px;
        cursor: not-allowed;
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
  .sp-content {
    margin-top: 30px;
    background: #ffffff;
    border-radius: 6px;
    border: 1px solid #e9edf2;
    .sp-title-whrite {
      padding-right: 20px;
      ::v-deep .el-input__inner {
        background: #ffffff;
        border: none;
      }
      ::v-deep .el-input__inner::placeholder {
        font-size: 16px;
        color: #8992a6;
      }
    }
    .sp-icon {
      height: 64px;
      display: flex;
      align-items: center;
      padding: 20px;
      .sp-reletive {
        position: relative;
        ::v-deep .emoji-picker {
          position: absolute;
          top: 40px;
          left: 0;
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
    .sp-text-whrite {
      padding-right: 20px;
      ::v-deep .el-textarea__inner {
        border: 1px solid transparent;
        height: 495px !important;
      }
    }
    .sp-summary {
      padding: 20px 20px 35px 20px;
      .summary-title {
        font-size: 18px;
      }
      .summary-des {
        font-size: 14px;
        color: #8992a6;
      }
      .summary-text {
        margin-top: 15px;
        ::v-deep .el-textarea__inner {
          height: 100px;
          background-color: #f5f7fa;
          border: 1px solid transparent;
        }
      }
    }
    .sp-border {
      border-bottom: 1px solid #f5f7fa;
    }
  }
}
</style>
