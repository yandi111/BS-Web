<template>
  <el-dialog
    width="480px"
    :title="title"
    :visible.sync="visible"
    :before-close="handleClose"
  >
    <div class="dialog">
      <div class="text">
        <span>{{$t('property.当前身份等级无法进行链上提币')}}</span>
        </div>
      <div class="btn" @click="handleBtn">{{$t('c2c.去认证')}}</div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: "AuthDialog",
  props: {
    title: {
      type: String,
      default: "",
    },
    visible: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleClose() {
      this.$emit("close");
    },
    handleBtn(){
      this.$router.push('/user/verifyIdentidy')
    }
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  padding: 0px 20px;
  .text {
    font-size: 16px;
    color: #96a2b2;
    margin-bottom: 40px;
    padding: 0px 20px;
  }
  .btn {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border-radius: 6px;
    color: #fff;
    font-size: 18px;
    background: #90ff00;
    cursor: pointer;
  }
}
</style>