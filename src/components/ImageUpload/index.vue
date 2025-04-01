<template>
  <div class="component-upload-image">
    <el-upload
      multiple
      auto-upload
      :http-request="toploadFile"
      action="string"
      :before-upload="handleBeforeUpload"
      :limit="limit"
      ref="imageUpload"
      :list-type="listType"
      :show-file-list="listType != ''"
      :headers="headers"
      :file-list="fileList"
      :on-remove="handleDelete"
      :on-error="handleUploadError"
      :on-exceed="handleExceed"
      :on-preview="handlePictureCardPreview"
      :class="{ hide: this.fileList.length >= this.limit }"
      :on-change="onChange"
    >
      <slot name="content"></slot>
      <i
        class="el-icon-plus"
        v-if="listTypeIcon"
        :style="{ fontSize: IconSize + 'px' }"
      ></i>
    </el-upload>
    <!-- 上传提示 -->
    <div class="el-upload__tip" slot="tip" v-if="showTip">
      请上传
      <template v-if="fileSize">
        大小不超过 <b style="color: #f56c6c">{{ fileSize }}MB</b>
      </template>
      <template v-if="fileType">
        格式为 <b style="color: #f56c6c">{{ fileType.join("/") }}</b>
      </template>
      的文件
    </div>

    <el-dialog
      :visible.sync="dialogVisible"
      title="预览"
      width="800"
      append-to-body
    >
      <img
        :src="dialogImageUrl"
        style="display: block; max-width: 100%; margin: 0 auto"
      />
    </el-dialog>
  </div>
</template>

<script>
import { baseApi } from "@/request/baseApi.js";
import { getToken, getUuid } from "@/libs/utils.js";
import { getFileURLSign } from "@/api/common.js";
import request from "@/request/request";
import axios from "axios";
export default {
  props: {
    isVideo: {
      type: Boolean,
      default: false,
    },
    value: [String, Object, Array],
    // 图片数量限制
    limit: {
      type: Number,
      default: 5,
    },
    // 大小限制(MB)
    fileSize: {
      type: Number,
      default: 5,
    },
    // 文件类型, 例如['png', 'jpg', 'jpeg']
    fileType: {
      type: Array,
      default: () => ["png", "jpg", "jpeg"],
    },
    // 是否显示提示
    isShowTip: {
      type: Boolean,
      default: true,
    },
    // 文件列表的类型
    listType: {
      type: String,
      default: "",
    },
    // 是否默认Icon样式
    listTypeIcon: {
      type: Boolean,
      default: false,
    },
    // icon大小
    IconSize: {
      type: Number | String,
      default: "28",
    },
  },
  data() {
    return {
      number: 0,
      uploadList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      hideUpload: false,
      baseUrl: `${baseApi}`,
      // uploadImgUrl: `${baseApi}/ex/user/file/upload-file`, // 上传的图片服务器地址
      uploadImgUrl: `${baseApi}/ex/user/file/upload-file/uploadToAmazonS3`, // 上传的图片服务器地址
      headers: {
        Authorization: "Bearer " + getToken(),
        Token: getToken(),
      },
      fileList: [],
      fileName: undefined,
      file: undefined,
      url: undefined,
    };
  },
  watch: {
    value: {
      handler(val) {
        if (val) {
          // 首先将值转为数组
          const list = Array.isArray(val) ? val : this.value.split(",");
          // 然后将数组转为对象数组
          this.fileList = list.map((item) => {
            if (typeof item === "string") {
              if (item.indexOf(this.baseUrl) === -1) {
                // item = { name: this.baseUrl + item, url: this.baseUrl + item };
                item = { name: getUuid(), url: item };
              } else {
                item = { name: item, url: item };
              }
            }
            return item;
          });
        } else {
          this.fileList = [];
          return [];
        }
      },
      deep: true,
      immediate: true,
    },
  },
  computed: {
    // 是否显示提示
    showTip() {
      return this.isShowTip && (this.fileType || this.fileSize);
    },
  },
  mounted() {
    this.$nextTick((_) => {
      this.listTypeIcon
        ? undefined
        : this.$refs.imageUpload.$el
            .querySelector(".el-upload--picture-card")
            ?.classList.remove("el-upload--picture-card");
    });
  },
  methods: {
    //文件修改触发
    onChange(file, fileList) {
      console.log("fileList", fileList);
      if (fileList.length > 0 && this.isVideo) {
        this.fileList = [fileList[fileList.length - 1]]; //这一步，是 展示最后一次选择文件
      }
    },
    //自定义上传
    async toploadFile() {
      const formData = new FormData();
      formData.append("file", this.file);
      axios({
        url: this.uploadImgUrl,
        method: "post",
        data: formData,
        headers: {
          Token: getToken(),
          "Content-Type": "multipart/form-data",
        },
      }).then((res) => {
        // this.imageUrl = res.data?.data?.url;
        this.uploadList.push({ name: this.fileName, url: res.data?.data?.url });
        this.fileList = this.fileList.concat(this.uploadList);
        this.uploadList = [];
        this.number = 0;

        this.$emit("input", this.listToString(this.fileList));
        this.$modal.closeLoading();
      });
      return;
      await getFileURLSign({ fileName: this.fileName }).then((res) => {
        this.url = res.data.fileUrl;
        this.fileName = res.data.fileName;
        let file = new File([this.file], this.fileName);

        axios({
          url: res.data.url,
          method: "put",
          data: file,
          headers: {
            isToken: false,
            "Content-Type": null,
          },
        }).then((res) => {
          this.uploadList.push({ name: this.fileName, url: this.url });
          this.fileList = this.fileList.concat(this.uploadList);
          this.uploadList = [];
          this.number = 0;

          this.$emit("input", this.listToString(this.fileList));
          this.$modal.closeLoading();
        });
      });
    },
    // 上传前loading加载
    handleBeforeUpload(file) {
      console.log("before", file);
      let isImg = false;
      this.file = file;
      this.fileName = file.name;
      if (this.fileType.length) {
        let fileExtension = "";
        if (file.name.lastIndexOf(".") > -1) {
          fileExtension = file.name.slice(file.name.lastIndexOf(".") + 1);
        }
        isImg = this.fileType.some((type) => {
          if (file.type.indexOf(type) > -1) return true;
          if (fileExtension && fileExtension.indexOf(type) > -1) return true;
          return false;
        });
      } else {
        isImg = file.type.indexOf("image") > -1;
      }

      if (!isImg) {
        this.$message({
          message: `文件格式不正确, 请上传${this.fileType.join("/")}格式文件!`,
          type: "error",
        });
        return false;
      }
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$message({
            message: `上传头像图片大小不能超过 ${this.fileSize} MB!`,
            type: "error",
          });
          return false;
        }
      }
      this.$modal.loading("正在上传文件中，请稍候...");
      this.number++;
    },
    // 文件个数超出
    handleExceed() {
      this.$message({
        message: `上传文件数量不能超过 ${this.limit} 个!`,
        type: "error",
      });
    },
    // 上传成功回调
    handleUploadSuccess(res, file) {
      if (res.code === 1) {
        this.uploadList.push({ name: res.fileName, url: res.data.url });
        if (this.number > 0 && this.uploadList.length === this.number) {
          this.fileList = this.fileList.concat(this.uploadList);
          this.uploadList = [];
          this.number = 0;

          this.$emit("input", this.listToString(this.fileList));
          this.$modal.closeLoading();
        }
      } else {
        this.number--;
        this.$modal.closeLoading();
        this.$message({
          message: res.msg,
          type: "error",
        });
        this.$refs.imageUpload.handleRemove(file);
        this.uploadedSuccessfully();
      }
    },
    // 删除图片
    handleDelete(file) {
      const findex = this.fileList.map((f) => f.name).indexOf(file.name);

      if (findex > -1) {
        this.fileList.splice(findex, 1);
        this.$emit("input", this.listToString(this.fileList));
      }
    },
    // 上传失败
    handleUploadError() {
      this.$message({
        message: "上传图片失败，请重试",
        type: "error",
      });
      this.$modal.closeLoading();
    },
    // 上传结束处理
    uploadedSuccessfully() {
      if (this.number > 0 && this.uploadList.length === this.number) {
        this.fileList = this.fileList.concat(this.uploadList);
        this.uploadList = [];
        this.number = 0;
        this.$emit("input", this.listToString(this.fileList));
        this.$modal.closeLoading();
      }
    },
    // 预览
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 对象转成指定字符串分隔
    listToString(list, separator) {
      let strs = "";
      separator = separator || ",";
      for (let i in list) {
        if (list[i].url) {
          strs += list[i].url.replace(this.baseUrl, "") + separator;
        }
      }
      return strs != "" ? strs.substr(0, strs.length - 1) : "";
    },
  },
};
</script>
<style scoped lang="scss">
.component-upload-image {
  overflow: hidden;
}
// .el-upload--picture-card 控制加号部分
::v-deep .hide .el-upload--picture-card {
  display: none;
}

// 去掉动画效果
::v-deep .el-list-enter-active,
::v-deep .el-list-leave-active {
  transition: all 0s;
}

::v-deep .el-list-enter,
.el-list-leave-active {
  opacity: 0;
  transform: translateY(0);
}
::v-deep .el-upload {
  display: flex;
  .el-icon-plus {
    margin: auto;
  }
}

::v-deep .el-upload-list__item-thumbnail {
  object-fit: cover;
}
</style>

