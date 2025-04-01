<template>
  <div class="my-preview">
    <div
      class="box"
      ref="imgBox"
      @mouseenter="onMouseenter"
      @mouseleave="onMouseleave"
    >
      <img class="img" :src="src" alt="" ref="img" />
      <div class="layer" v-show="isShow">
        <div class="show" @click="onShow">+</div>
      </div>
    </div>
    <div class="more" @click="onShowPreview" v-if="additionalQuantity > 1">
      +{{ additionalQuantity }}
    </div>
    <div class="mask-sd" ref="musk" @click="close" v-show="showPic">
      <div class="content">
        <img class="img" :src="src" alt="" />
      </div>
    </div>
    <div class="previewBox" ref="previewBox" v-show="showPreview">
      <div class="content df aic jc">
        <div class="img" v-for="item in urlList" :key="item">
          <div class="dot" v-if="edit">
            <i class="iconfont icon-close2" @click="removeImgs(item)"></i>
          </div>
          <img :src="item" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      default: "",
    },
    alt: {
      type: String,
      default: "",
    },
    single: {
      type: Boolean,
      default: false,
    },
    //展示多个时
    urls: {
      type: Array,
      default: () => [],
    },
    //是否编辑图片
    edit: {
      type: Boolean,
      default: false,
    },
    //详情页 图片预览
    detail: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isShow: false,
      showPic: false,
      showPreview: false,
      urlList: [],
    };
  },
  computed: {
    additionalQuantity() {
      if (this.detail) {
        return this.urls.length - 3;
      } else {
        return this.urls.length - 1;
      }
    },
  },
  watch: {
    urls: {
      handler(data) {
        this.urlList = [...data];
        this.setSize();
      },
      deep: true,
      immediate: true,
    },
    urlList: {
      handler(data) {
        this.$emit("handleImgs", data);
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    removeImgs(val) {
      this.urlList.forEach((item, index) => {
        if (item == val) {
          this.urlList.splice(index, 1);
        }
      });
    },
    onMouseenter() {
      this.isShow = true;
    },
    onMouseleave() {
      this.isShow = false;
    },
    onShow() {
      this.showPic = true;
    },
    onShowPreview() {
      this.showPreview = true;
    },
    close() {
      this.showPic = false;
    },
    setSize() {
      // console.log("this.$refs", this.$refs.img.offsetWidth);
      setTimeout(() => {
        const imgBox = this.$refs.imgBox;
        const width_imgBox = imgBox.offsetWidth;
        const height_imgBox = imgBox.offsetHeight;

        const img = this.$refs.img;
        const width_img = img.offsetWidth;
        const height_img = img.offsetHeight;

        if (!this.single) {
          if (width_imgBox / height_imgBox > width_img / height_img) {
            img.classList.add("img_w");
          } else {
            img.classList.add("img_h");
          }
        } else {
          if (width_img >= height_img) {
            img.classList.add("img_w");
          } else {
            img.classList.add("img_h");
          }
        }
      }, 0);
    },

    showMusk() {
      const mask = this.$refs.musk;
      const previewBox = this.$refs.previewBox;
      document.body.append(mask);
      document.body.append(previewBox);
      // this.setSize();
    },

    closePreview(e) {
      if (e.target.classList[0] !== "iconfont") {
        this.showPreview = false;
      }
    },
  },
  mounted() {
    this.showMusk();

    const previewBox = this.$refs.previewBox;
    previewBox.addEventListener("click", (e) => {
      this.closePreview(e);
    });
  },
  beforeDestroy() {
    const previewBox = this.$refs.previewBox;
    previewBox.removeEventListener("click", (e) => {
      this.closePreview(e);
    });
  },
};
</script>

<style lang="scss" scoped>
.my-preview {
  position: relative;
  width: 100%;
  height: 100%;
  .box {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 10px;
    overflow: hidden;
    .img_w {
      width: 100%;
    }
    .img_h {
      height: 100%;
    }
    .layer {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background-color: rgba($color: #686868, $alpha: 0.2);
      .show {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        font-size: 26px;
        color: #fefefe;
        border-radius: 50%;
        background-color: rgba($color: #686868, $alpha: 0.4);
        cursor: pointer;
      }
    }
  }
  .more {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 40px;
    height: 40px;
    color: #fff;
    background-color: rgba($color: #686868, $alpha: 0.6);
    cursor: pointer;
  }
}
</style>

<style lang="scss">
.mask-sd {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #686868, $alpha: 0.8);
  z-index: 9999;
  .content {
    width: 500px;
    .img {
      width: 100%;
    }
  }
}
.previewBox {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba($color: #686868, $alpha: 0.8);
  z-index: 9999;
  .content {
    width: 1600px;
    flex-wrap: wrap;
    .img {
      position: relative;
      // width: 300px;
      height: 300px;
      margin-right: 20px;
      margin-bottom: 20px;
      img {
        height: 100%;
      }
      .dot {
        position: absolute;
        top: 10px;
        right: 10px;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 30px;
        // background-color: pink;
        cursor: pointer;
        .iconfont {
          font-size: 30px;
        }
      }
    }
  }
}
</style>
