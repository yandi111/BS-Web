<template>
  <div>
    <!-- 添加提币地址(链名称)弹窗 -->
    <common-modal
      :title="$t('property.提币地址')"
      width="600px"
      :show="addressShow"
      :noFooter="false"
      :showClose="true"
      :FooterIsCenter="true"
      @cancel="$emit('update:addressShow', false)"
    >
      <template #dia_content>
         <div class="content">
          <div class="no-backup">
             <img src="../../../../assets/images/no-pay.png" alt="">
          </div>
          <div>{{$t('property.常用地址保存在地址薄，可以在将来提币时直接使用为每个地址添加标签方便识别。')}}</div>
         </div>
      </template >
      <template #dia_footer>
        <div class="footer-btn" @click="addCionDialog">{{$t('property.添加提币地址')}}</div>
      </template>
    </common-modal>
  </div>
</template>

<script>
export default {
  name: "ChainName",
  props: {
    addressShow: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      activeKey: 0,
    };
  },
  methods: {
    onChange(id, val) {
      this.activeKey = id;
      this.$emit("addressChange", val);
    },
    addCionDialog() {
      this.$emit("update:addressShow", false);
      this.$emit("addressManagement")
    },
  },
};
</script>

<style lang="scss" scoped>
.content{
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 16px;
  color: #999;
  padding: 0 108px;
  text-align: center;
  .no-backup{
    width: 171px;
    height: 120px;
    margin-bottom: 20px;
    img{
      width: 100%;
      height: 100%;
    }
  }
}
.dialog-content {
  padding: 0 20px;
  .title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #00082d;
    margin-bottom: 30px;

    .usdt {
      padding-left: 10px;
    }
    .right-title {
      padding-right: 10px;
    }
  }
  .item {
    position: relative;
    height: 117px;
    border-radius: 6px;
    border: 1px solid #e1e1e1;
    cursor: pointer;
    margin-bottom: 20px;
    font-size: 14px;
    color: #333;
    .item-title {
      font-size: 18px;
      color: #00082d;
      font-weight: 500;
      margin-bottom: 10px;
    }
    .item-name {
      color: #999;
    }
  }

  .select {
    position: relative;
    text-align: left;
    background-color: #fff;
    border: 1px solid #90ff00;
    position: relative;
  }
  .select:before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    border: 14px solid #90ff00;
    border-top-color: transparent;
    border-left-color: transparent;
    z-index: 99;
  }
  .select:after {
    content: "";
    position: absolute;
    width: 4px;
    height: 11px;
    bottom: 5px;
    right: 4px;
    border: 1px solid #fff;
    border-top: none;
    border-top-color: transparent;
    border-left-color: transparent;
    transform: rotate(45deg);
    z-index: 99;
  }
}
.footer-btn {
  width: 100%;
  height: 50px;
  line-height: 50px;
  text-align: center;
  background: #90ff00;
  border-radius: 6px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
}
</style>