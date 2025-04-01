<template>
  <div class="s-imgs" ref="imgs">
    <template>
      <div class="img1" v-if="urls.length == 1" ref="img1Box">
        <!-- <my-img :src="urls[0]" alt="" ref="img1" single/> -->
        <el-image :src="urls[0]" :preview-src-list="urls"> </el-image>
      </div>
    </template>
    <template v-if="urls.length == 2" ref="img2Box">
      <div class="img2">
        <!-- <my-img :src="urls[0]" alt="" /> -->
        <el-image :src="urls[0]" :preview-src-list="urls"> </el-image>
      </div>
      <div class="img2">
        <!-- <my-img :src="urls[1]" alt="" /> -->
        <el-image :src="urls[1]" :preview-src-list="urls"> </el-image>
      </div>
    </template>
    <template v-if="urls.length >= 3" ref="img3Box">
      <div class="img3 mr20 left">
        <!-- <my-img :src="urls[0]" alt="" /> -->
        <el-image :src="urls[0]" :preview-src-list="urls"> </el-image>
      </div>
      <div class="img3">
        <div class="img">
          <!-- <my-img :src="urls[1]" alt="" /> -->
          <el-image :src="urls[1]" :preview-src-list="urls"> </el-image>
        </div>
        <div class="img">
          <el-image :src="urls[2]" :preview-src-list="urls"> </el-image>
          <!-- <my-img :src="urls[2]" alt="" :urls="urls" detail /> -->
          <div class="more" v-if="urls?.length > 3">
            + {{ urls.length - 3 }}
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import myImg from "@/components/my-preview";
export default {
  components: {
    myImg,
  },
  props: {
    urls: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    urls: {
      handler(newValue) {
        this.setSize();
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    setSize() {
      setTimeout(() => {
        const imgs = this.$refs.imgs;

        //两张图片时 对于横扁图，图片高度100%
        const img2s = imgs.querySelectorAll(".img2");
        for (let i = 0; i < img2s.length; i++) {
          const p = 400 / 280;
          const img_w = img2s[i].children[0].offsetWidth;
          const img_h = img2s[i].children[0].offsetHeight;
          if (img_w / img_h > p) {
            img2s[i].children[0].classList.add("hei");
          }
        }

        const img3 = imgs.querySelector(".s-imgs .left");
        const p = 400 / 355;
        if (img3) {
          const img_left_w = img3.children[0].offsetWidth;
          const img_left_h = img3.children[0].offsetHeight;

          if (img_left_w / img_left_h > p) {
            img3.children[0].style = ` transform: scale(${355 / img_left_h})`;
          } else {
            img3.children[0].style = ` transform: scale(${400 / img_left_w})`;
          }
        }

        const _imgs = imgs.querySelectorAll(".img3 .img");
        for (let i = 0; i < _imgs.length; i++) {
          const p = 400 / 170;
          const img_w = _imgs[i].children[0].offsetWidth;
          const img_h = _imgs[i].children[0].offsetHeight;
          if (img_w / img_h > p) {
            _imgs[i].children[0].classList.add("hei");
          } else {
            _imgs[i].children[0].classList.add("wid");
          }
        }
      }, 500);
    },
  },
};
</script>

<style lang="scss" scoped>
.s-imgs {
  display: flex;
  align-items: center;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  .img1 {
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    overflow: hidden;

    ::v-deep .el-image {
      width: 100%;
      height: 500px;
    }
  }
  .hei {
    height: 100%;
  }
  .wid {
    width: 100%;
  }

  .img2 {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 400px;
    height: 280px;
    margin-right: 15px;
    border-radius: 10px;
    overflow: hidden;
    // ::v-deep .el-image {
    //   width: 100%;
    //   height: 100%;
    // }
  }
  .img3 {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 400px;
    height: 355px;

    &.left {
      flex-direction: row;
      align-items: center;
      justify-content: center;
      border-radius: 10px;
      overflow: hidden;
    }

    .img {
      position: relative;
      width: 100%;
      height: 170px;
      display: flex;
      align-items: center;
      border-radius: 10px;
      overflow: hidden;
      // ::v-deep .el-image {
      //   width: 100%;
      // }
      .more {
        position: absolute;
        bottom: 0;
        right: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 40px;
        height: 40px;
        font-size: 12px;
        color: #fff;
        background-color: #686868;
      }
    }
  }
  ::v-deep .el-image__preview {
    cursor: zoom-in;
  }
}
</style>
