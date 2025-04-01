<template>
  <div class="report-form">
    <myModal :is-show="isShow" width="width500" customize-class="report">
      <template #header>
        <span class="title">{{ $t("square.举报") }}</span>
        <i class="iconfont icon-close2 f24" @click.stop="close"></i>
      </template>

      <template #content>
        <div class="content">
          <div class="type mb20">
            <div class="label">
              <span>{{ $t("square.请选择您想要举报的类型") }}</span>
              <span class="start">*</span>
            </div>
            <div class="box df aic jb">
              <div
                class="cell"
                :class="{ active: currentType == item.id }"
                v-for="(item, index) in reportList"
                :key="index"
                @click="chooseReportType(item)"
              >
                {{ item.label | translate }}
              </div>
            </div>
          </div>
          <div class="type mb20">
            <div class="label">
              <span>{{ $t("square.举报描述") }}</span>
              <span class="start">*</span>
            </div>
            <div class="box textarea">
              <el-input
                type="textarea"
                :rows="2"
                :placeholder="$t('square.提供更多信息有助于举报快速处理～')"
                maxlength="200"
                show-word-limit
                v-model="textarea"
              >
              </el-input>
            </div>
          </div>
          <div class="type">
            <div class="label">
              <span>{{ $t("square.图片证据") }}</span>
            </div>
            <div class="box imgs df aic">
              <reportImgList
                v-if="urlList?.length"
                :list="urlList"
                @onChange="onChange"
              />

              <div
                class="upload"
                v-if="
                  !submitParams?.reportedUrl?.length ||
                  submitParams?.reportedUrl?.length < 4
                "
              >
                <reportImgUpload @success="addPicture" />
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #footer>
        <div class="btns df aic jb">
          <my-button class="mr15" type="normal" @click="close">
            {{ $t("square.取消") }}
          </my-button>
          <my-button @click="onSubmit" :disabled="disabled">{{
            $t("square.提交")
          }}</my-button>
        </div>
      </template>
    </myModal>
  </div>
</template>

<script>
import myModal from "@/components/my-modal/index.vue";
import reportImgUpload from "./report-img-upload.vue";
import reportImgList from "./report-img-list.vue";
import $confirm from "../../components/s-confirm";

import { $onReport } from "@/api/square";
export default {
  components: {
    myModal,
    reportImgUpload,
    reportImgList,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    reportInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      reportList: [
        { label: "square.信息错误", value: 1, id: 0 },
        { label: "square.诈骗信息", value: 2, id: 1 },
        { label: "square.谩骂攻击", value: 3, id: 2 },
        { label: "square.色情低俗", value: 4, id: 3 },
        { label: "square.其他", value: 5, id: 4 },
      ],
      currentType: 0,
      textarea: "",
      urlList: [],
      // selectedPictures: [],
      submitParams: {
        reportedType: 1,
      },
    };
  },
  computed: {
    disabled() {
      let flag = this.textarea;
      return !flag;
    },
  },
  methods: {
    close() {
      this.$emit("update:isShow", false);
    },
    chooseReportType(item) {
      this.currentType = item.id;
      this.submitParams.reportedType = item.value;
    },
    addPicture(url) {
      this.urlList.unshift(url);
      this.selectedPictures = [...this.urlList];
      // this.submitParams.reportedUrl = this.selectedPictures.join(",");
      this.submitParams.reportedUrl = [...this.urlList];
    },
    onChange(data) {
      this.selectedPictures = data;
      this.submitParams.reportedUrl = [...this.urlList];
      // this.submitParams.reportedUrl = this.selectedPictures.join(",");
    },
    resetData() {
      this.submitParams = {
        reportedType: 1,
      };
      this.urlList = [];
      this.currentType = 0;
      this.textarea = "";
    },
    onSubmit() {
      const params = {
        ...this.reportInfo,
        ...this.submitParams,
        describe: this.textarea,
      };
      console.log("params", params);

      $onReport(params).then((res) => {
        if (res.data.success) {
          this.close();
          $confirm("report", () => {
            this.resetData();
          });
        }
      });

      console.log("this.submitParams", params);
    },
  },
};
</script>

<style lang="scss">
.report {
  .content {
    .label {
      font-size: 14px;
      color: #333333;
      margin-bottom: 10px;
      .start {
        color: red;
      }
    }
    .box {
      flex-wrap: wrap;
      .cell {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 210px;
        height: 40px;
        font-size: 14px;
        background: #f7f8fa;
        border-radius: 6px;
        color: #333333;
        margin-bottom: 10px;
        cursor: pointer;
        &.active {
          color: var(--theme-color);
          border: 1px solid var(--theme-color);
        }
      }
      &.textarea {
        .el-textarea__inner {
          height: 100px !important;
          border: none !important;
          background-color: #f7f8fa;
        }
      }
      // &.imgs {
      //  display: flex;
      //  flex-wrap: wrap;
      // }
    }
  }
}
</style>
