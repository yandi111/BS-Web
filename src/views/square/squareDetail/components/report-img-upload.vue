<template>
  <div>
    <div class="img">
      <div class="upload">
        <div class="box df aic jc pointer" @click="onPicture">
          <img src="@/assets/square-imgs/s-add.png" alt="" />
        </div>
        <input
          @change="fileChange($event)"
          type="file"
          accept="image/png,image/jpeg"
          id="upload_file"
          multiple
          style="display: none"
        />
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { getFileURLSign } from "@/api/common.js";
import { baseApi } from "@/request/baseApi.js";
export default {
  name: "pictureUpload",
  data() {
    return {
      uploadImgUrl: `${baseApi}/ex/user/file/upload-file/uploadToAmazonS3`, // 上传的图片服务器地址
      imgList: [],
      size: 0,
      file: undefined,
    };
  },
  methods: {
    // 图片提交服务器地址
    async toploadFile(fileName) {
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
      let res = await getFileURLSign({ fileName: fileName });
      let file = new File([this.file], fileName);
      axios({
        url: res.data.url,
        method: "put",
        data: file,
        headers: {
          isToken: false,
          "Content-Type": null,
        },
      }).then(() => {
        this.$emit("success", res?.data?.fileUrl);
      });
    },
    //上传
    fileClick() {
      if (this.imgList.length == 9) return;
      document.getElementById("upload_file").click();
    },
    fileChange(el) {
      if (!el.target.files[0].size) return;
      this.fileList(el.target.files);
      el.target.value = "";
    },
    fileList(files) {
      console.log("files", files);
      for (let i = 0; i < files.length; i++) {
        this.fileAdd(files[i]);
      }
    },
    fileAdd(file) {
      const typeArr = ["image/png", "image/jpeg"];
      const flag = typeArr.includes(file.type);
      if (!flag) {
        this.$message.error("图片格式错误！");
        return;
      }
      this.file = file;
      this.size = this.size + file.size; //总大小
      let reader = new FileReader();
      reader.vue = this;
      reader.readAsDataURL(file);
      reader.onload = function () {
        file.src = this.result;
        this.vue.imgList.push({
          file,
        });
      };
      this.toploadFile(file.name);
    },
    fileDel(index) {
      this.size = this.size - this.imgList[index].file.size; //总大小
      this.imgList.splice(index, 1);
    },
    bytesToSize(bytes) {
      if (bytes === 0) return "0 B";
      let k = 1000, // or 1024
        sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"],
        i = Math.floor(Math.log(bytes) / Math.log(k));
      return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
    },
    dragenter(el) {
      el.stopPropagation();
      el.preventDefault();
    },
    dragover(el) {
      el.stopPropagation();
      el.preventDefault();
    },
    drop(el) {
      el.stopPropagation();
      el.preventDefault();
      this.fileList(el.dataTransfer.files);
    },
    onPicture() {
      this.fileClick();
    },
  },
};
</script>

<style lang="scss" scoped>
.img {
  .upload {
    .box {
      width: 100px;
      height: 100px;
      background: #f7f8fa;
      border-radius: 6px;
    }
  }
}
</style>
