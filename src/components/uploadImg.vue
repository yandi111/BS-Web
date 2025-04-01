<!-- 图片上传组件 -->
<template>
  <el-upload
    auto-upload
    :http-request="toploadFile"
    action="string"
    :headers="headers"
    :accept="fileType"
    :multiple="false"
    class="upload-demo"
    :data="params"
    :before-upload="handleBeforeUpload"
    :on-error="handleUploadError"
    :on-remove="handleRemove"
    :on-exceed="handleExceed"
    :show-file-list="false"
  >
    <slot name="content"></slot>
    <template> </template>
  </el-upload>
</template>

<script>
import { baseApi } from "@/request/baseApi.js";
import { getToken } from "@/libs/utils.js";
import { getFileURLSign, uploadFile } from "@/api/common.js";
import request from "@/request/request";
import axios from "axios";
export default {
  name: "UploadImg",
  components: {},
  data() {
    return {
      // uploadImgUrl: `${baseApi}/ex/user/file/upload-file`, // 上传的图片服务器地址
      uploadImgUrl: `${baseApi}/ex/user/file/upload-file/uploadToAmazonS3`, // 上传的图片服务器地址
      imageUrl: null,
      headers: {
        token: getToken(),
      },
      fileName: undefined,
      file: undefined,
      url: undefined,
    };
  },
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
  mounted() {},
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
        }).then((res) => {
          this.imageUrl = this.url;
          this.$emit("success", this.imageUrl);
          // this.uploadList.push({ name: this.fileName, url: this.url });
          // this.fileList = this.fileList.concat(this.uploadList);
          // this.uploadList = [];
          // this.number = 0;
          // console.log('file',this.fileList);
          // this.$emit("input", this.listToString(this.fileList));
          // this.$modal.closeLoading();
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
<style lang="scss" scoped></style>
