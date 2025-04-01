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
    <div v-if="imageUrl" class="avatar-upload">
      <img :src="imageUrl" class="avatar" />
      <div>{{ $t("square.头像在30天内只能修改1次") }}</div>
    </div>
    <div v-else class="avatar-upload">
      <img src="@/assets/square-imgs/defaultAvatar.png" alt="" />
      <div>{{ $t("square.头像在30天内只能修改1次") }}</div>
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
    defaultAvatar: {
      type: String,
      default: "",
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
  watch: {
    defaultAvatar: {
      handler(url) {
        this.imageUrl = url;
        console.log("头像----", url);
      },
      immediate: true,
    },
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
.avatar-upload {
  font-size: 12px;
  color: #96a2b2;
  line-height: 20px;
  img {
    width: 80px;
    height: 80px;
    display: inline-block;
    border-radius: 50%;
  }
}
.avatar {
  width: 80px;
  height: 80px;
  display: block;
}
</style>
