<template>
  <el-upload
    class="avatar-uploader"
    auto-upload
    :http-request="toploadFile"
    action="string"
    :headers="headers"
    :accept="fileType"
    :multiple="false"
    :data="params"
    :before-upload="handleBeforeUpload"
    :on-error="handleUploadError"
    :on-remove="handleRemove"
    :on-exceed="handleExceed"
    :show-file-list="false"
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <div v-else class="coin-upload">
      <img src="@/assets/financeCoinApply-imgs/coin-upload.png" alt="" />
    </div>
  </el-upload>
</template>

<script>
import { baseApi } from "@/request/baseApi.js";
import { getToken } from "@/libs/utils.js";
import { getFileURLSign } from "@/api/common.js";
import axios from "axios";
export default {
  name: "coinApplyUpload",
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
    // 上传额外的参数
    params: {
      type: Object,
      default: null,
    },
    // 文件最大size
    maxSize: {
      typeof: Number,
      default: 10,
    },
    fileType: {
      type: String,
      default: "image/jpg,image/jpeg,image/png",
    },
  },
  data() {
    return {
      imageUrl: "",
      // uploadImgUrl: `${baseApi}/ex/user/file/upload-file`, // 上传的图片服务器地址
      uploadImgUrl: `${baseApi}/ex/user/file/upload-file/uploadToAmazonS3`, // 上传的图片服务器地址
      headers: {
        token: getToken(),
      },
      fileName: undefined,
      file: undefined,
      url: undefined,
    };
  },
  methods: {
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
        this.imageUrl = res.data?.data?.url;
        this.$emit("success", this.imageUrl);
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
        }).then(() => {
          this.imageUrl = this.url;
          this.$emit("success", this.imageUrl);
        });
      });
    },
    // 上传之前拦截
    handleBeforeUpload(file) {
      this.file = file;
      this.fileName = file.name;

      if (file) {
        this.$emit("update:isLoading", true);
      }
      const nameArr = file.name.split(".");
      const typeFromName = nameArr[nameArr.length - 1];
      const type = this.fileType.includes(typeFromName);

      const suffix = this.fileType.replaceAll("image/", "");

      const isLt2M = file.size / 1024 / 1024 < this.maxSize;
      if (!type) {
        this.$message.warning(this.$t("userInfo.图片格式不正确", [suffix]));
      }
      if (!isLt2M) {
        this.$message.warning(
          this.$t("userInfo.上传的图片大小不能超过", [this.maxSize])
        );
      }
      return type && isLt2M;
    },
    // 上传成功提示
    handleSuccess(file) {
      this.imageUrl = file.data.url;
      this.$emit("success", file);
    },
    // 上传错误钩子
    handleUploadError() {},
    // 移除
    handleRemove() {},
    // 超出大小
    handleExceed() {},
  },
};
</script>

<style lang="scss" scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.coin-upload {
  width: 100px;
  height: 90px;
  background: #f6f9fc;
  border-radius: 6px;
  border: 1px dashed #90ff00;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    width: 36px;
    height: 36px;
  }
}
.avatar {
  width: 100px;
  height: 90px;
  display: block;
}
</style>