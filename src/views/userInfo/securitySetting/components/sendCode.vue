<!-- 发送短信验证码组件封装 -->
<template>
  <el-input
    v-model="value"
    class="form-input"
    autocomplete="off"
    :placeholder="$t('userInfo.请输入验证码')"
    maxlength="6"
    @input="onInput"
  >
    <span
      class="code"
      slot="suffix"
      @click.stop="getCode"
      v-if="!sendMsgDisabled"
      >{{  $t('userInfo.获取验证码')  }}</span
    >
    <span class="code resend" slot="suffix" v-else>{{$t('userInfo.重新发送')
       + codeTime + "s"
    }}</span>
  </el-input>
</template>

<script>

export default {
  name: "SendCode",
  components: {},
  props: {
    // field: {
    //   type: String,
    //   default: "",
    // },
    // 发送短信验证码所需参数
    params: {
      type: Object,
      default: () => {},
    },
    sendMsgDisabled:{
      type:Boolean,
      default: false
    },
    codeTime:{
      type:String | Number,
      default:null,
    }
  },
  watch: {
    // field(newVal, oldVal) {
    //   this.value = field;
    // },
    codeTime(newVal, oldVal) {
      //解决修改props报错问题
    },
    immediate: true,
  },
  data() {
    return {
      value: "",
      // timer: null, // 计时器
     // 发送验证码倒计时
      // sendMsgDisabled: false, // 是否显示发送验证码按钮
      // //是否绑定手机号、邮箱、谷歌认证是否开启
      // phone: false,
      // email: false,
      // googleAuth: false,
    };
  },
  created() {
    // this.switchStatus();
  },
  methods: {
    getCode(){
      this.$emit("pthoneCode") //未绑定手机验证码
    },
   
    //输入值
    onInput(e) {
      console.log(e);
      this.$emit("onInput", e);
    },
   
  },
};
</script>
<style lang='scss' scoped>
.code {
  display: inline-block;
  width: 100px;
  height: 35px;
  margin: 8px;
  cursor: pointer;
  line-height: 35px;
  background-color: #90ff00;
  border-radius: 5px;
  font-size: 16px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #ffffff;
}

/** 发送验证吗样式 */
.resend {
  cursor: not-allowed;
  background-color: #8992a6;
}
</style>