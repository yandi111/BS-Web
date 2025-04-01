<template>
  <div class="deposit-upload">
    <el-upload
      multiple
      action="string"
      :http-request="toploadFile"
      :before-upload="handleBeforeUpload"
      :headers="headers"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :limit="1"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <div class="d-upload-box">
        <div class="d-upload-img">
          <img src="@/assets/property-imgs/d-upload.png" alt="" />
        </div>
        <div>{{ $t("property.不超过15MB的JPG/PNG/MP4/MOV文件格式") }}</div>
      </div>
    </el-upload>
  </div>
</template>

<script>
import axios from "axios";
import { getToken } from "@/libs/utils.js";
import { getFileURLSign } from "@/api/common.js";
import { baseApi } from "@/request/baseApi.js";
export default {
  name: "depositUpload",
  data() {
    return {
      uploadImgUrl: `${baseApi}/ex/user/file/upload-file/uploadToAmazonS3`, // 上传的图片服务器地址
      fileType: ["png", "jpg", "jpeg", "mp4", "mov"], //加视频类型
      fileSize: 15,
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
        // this.imageUrl = res.data?.data?.url;
        // console.log("充币上传组件",res.data);
        this.$emit("dUpload", res.data);
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
        }).then(() => {
          // console.log("充币上传组件",res.data);
          this.$emit("dUpload", res.data);
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
          message: this.$t("property.文件格式不正确", [
            this.fileType.join("/"),
          ]),
          type: "error",
        });
        return false;
      }
      if (this.fileSize) {
        const isLt = file.size / 1024 / 1024 < this.fileSize;
        if (!isLt) {
          this.$message({
            message: this.$t("property.文件大小不能超过"),
            type: "error",
          });
          return false;
        }
      }
      this.$modal.loading(this.$t("property.正在上传文件中，请稍候") + "...");
    },

    handleRemove(file, fileList) {
      this.$emit("dUpload", false);
    },
    handlePreview(file) {
      console.log(file);
    },
    handleExceed(files, fileList) {
      this.$message({
        message: this.$t("property.上传文件数量不能超过", [files.length]),
        type: "error",
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.deposit-upload {
  .d-upload-box {
    width: 500px;
    height: 140px;
    background: #fcfcfc;
    border-radius: 6px;
    border: 1px dashed #90ff00;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-size: 14px;
    color: #333;
    line-height: 25px;
    .d-upload-img {
      img {
        width: 48px;
        height: 48px;
      }
    }
  }
  ::v-deep .el-upload-list__item.is-success.focusing .el-icon-close-tip {
    display: none !important;
  }
}
</style>