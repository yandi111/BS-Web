<template>
  <div class="musk" v-if="isShow">
    <div class="content">
      <div class="title">
        <span>{{ $t("userInfo.更换头像") }}</span>
        <i
          class="iconfont icon-close"
          @click="$emit('update:isShow', false)"
        ></i>
      </div>
      <div class="main">
        <div class="tip">
          {{
            $t(
              "userInfo.其他用户会看到您的头像。成功提交后，我们将会审核上传的图片，过程需时数分钟。"
            )
          }}
        </div>
        <div class="preview-image-wrap">
          <img class="preview-image" :src="previewImage" ref="preview-image" />
        </div>
        <div class="btns">
          <div class="btn">
            <my-button type="normal" @click="$emit('update:isShow', false)">{{
              $t("userInfo.返回")
            }}</my-button>
          </div>
          <div class="btn">
            <my-button @click="onSave" :loading="loading">{{
              $t("userInfo.保存")
            }}</my-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    previewImage: {
      type: String,
      default: "",
    },
    loading: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onSave() {
      this.$emit("onUpdatePhoto");
    },
  },
  watch: {
    isShow: {
      handler(newValue) {
        if (newValue) {
          this.$nextTick((params) => {
            this.$emit("opened", this.$refs["preview-image"]);
          });
        } else {
          this.$emit("closed");
        }
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.musk {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba($color: #000000, $alpha: 0.3);
  z-index: 9999;
  .content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 600px;
    padding: 20px;
    border-radius: 12px;
    background-color: #fff;
    .title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      span {
        color: #333;
        font-size: 18px;
        font-weight: bold;
      }
      .iconfont {
        font-size: 22px;
        cursor: pointer;
      }
    }
    .main {
      margin-top: 20px;
      height: 100%;
      .tip {
        color: #96a2b2;
        font-size: 14px;
        padding-bottom: 15px;
        border-bottom: 1px solid #f5f5f5;
      }
      .preview-image-wrap {
        padding-top: 20px;
        .preview-image {
          display: block;
          /* This rule is very important, please don't ignore this */
          max-width: 100%;
          height: 300px;
        }
      }
      .btns {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-top: 30px;
        .btn {
          ::v-deep .my-button {
            width: 240px;
            height: 45px;
          }
        }
      }
    }
  }
}
</style>
