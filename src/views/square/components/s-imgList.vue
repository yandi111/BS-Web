<template>
  <div class="img-list">
    <div class="upload_warp">
      <div class="upload_warp_img" v-show="list.length != 0">
        <div
          class="upload_warp_img_div"
          v-for="(item, index) of list"
          :key="index"
        >
          <div class="upload_warp_img_div_top">
            <img
              src="@/assets/square-imgs/dialog-close.png"
              class="upload_warp_img_div_del"
              @click="fileDel(index)"
            />
          </div>
          <img class="show-img" :src="item" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "imgList",
  props: {
    imgList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      list: this.imgList,
    };
  },
  methods: {
    fileDel(index) {
      this.list.splice(index, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>