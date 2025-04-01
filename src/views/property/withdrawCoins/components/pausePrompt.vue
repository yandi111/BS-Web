<template>
  <my-modal :isShow.sync="isShow" width="width500">
    <template #header>
      <div class="pause-title">{{$t('property.内部提币暂停')}}</div>
    </template>
    <template #content>
      <div class="pause-content">
        {{$t('property.由于系统维护，当前币种内部提币暂停，感谢您的理解和耐心等待，如有疑问请联系官方客服。')}}
      </div>
    </template>
    <template #footer>
      <div class="btns df aic jb">
        <my-button class="mr15" type="normal" @click="close">{{$t('property.取消')}}</my-button>
        <my-button @click="handleSure">{{$t('property.联系客服')}}</my-button>
      </div>
    </template>
  </my-modal>
</template>

<script>
import myModal from "@/components/my-modal/index.vue";
export default {
  name: "pausePrompt",
  components: {
    myModal,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    close() {
      this.$emit("update:isShow", false);
    },
    handleSure() {
      this.$emit("update:isShow", false);
      zE('messenger', 'open');
    },
  },
};
</script>

<style lang="scss" scoped>
.pause-title {
  width: 100%;
  color: #333;
  font-size: 18px;
  text-align: center;
  font-weight: 600;
}
.pause-content {
  color: #7d869b;
  font-size: 14px;
}
</style>