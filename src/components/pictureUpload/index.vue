<template>
  <div>
    <div class="img">
      <div class="upload">
        <i class="iconfont icon-s-pic" @click="onPicture"></i>
        <input
          @change="fileChange($event)"
          type="file"
          :accept="fileType"
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
export default {
  name: "pictureUpload",
  data() {
    return {
      imgList: [],
      size: 0,
      file: undefined,
      fileType: "image/png,image/jpeg",
    };
  },
  methods: {
    // 图片提交服务器地址
    async toploadFile(fileName) {
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
      for (let i = 0; i < files.length; i++) {
        this.fileAdd(files[i]);
      }
    },
    fileAdd(file) {
      const typeArr = this.fileType.split(",");
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
    background-color: #fff;
    border-radius: 4px;
    .upload_warp {
      .upload_warp_img {
        overflow: hidden;
        .upload_warp_img_div {
          position: relative;
          height: 100px;
          width: 120px;
          float: left;
          line-height: 100px;
          display: table-cell;
          text-align: center;
          cursor: pointer;
          margin-right: 20px;
          margin-bottom: 20px;
          .upload_warp_img_div_top {
            position: absolute;
            top: 4px;
            right: 5px;
            width: 100%;
            height: 30px;
            line-height: 30px;
            text-align: left;
            color: #fff;
            font-size: 12px;
            text-indent: 4px;
            .upload_warp_img_div_del {
              position: absolute;
              top: 6px;
              width: 16px;
              right: 4px;
            }
          }
          .show-img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        }
      }
    }
    .iconfont {
      font-size: 24px;
      display: inline-block;
      cursor: pointer;

      &:hover {
        color: var(--theme-color);
        transform: scale(1.1);
      }
    }
  }
}
// .upload_warp_img_div img {
//   max-width: 100%;
//   max-height: 100%;
//   vertical-align: middle;
// }
</style>
