<template>
  <div class="dialog">
    <common-modal
      :title="$t('property.请选择网络')"
      width="600px"
      :show="isShow"
      :noFooter="false"
      :showClose="true"
      :FooterIsCenter="true"
      @cancel="$emit('update:isShow', false)"
    >
      <template #dia_content>
        <div class="item-box">
          <div
            :class="['item',{'select':activeKey === item.id,'item-disable':item.openDeposit==0}]"
            @click="onChange(item.id, item)"
            v-for="(item, index) in networkData"
            :key="index"
          >
            <div class="item-text">
              <p>{{ item.remark }}</p>
              <p style="color: #8992a6">{{ item.chainName }}</p>
            </div>
            <div class="pause" v-if="item.openDeposit==0">{{ $t("property.暂停") }}</div>
          </div>
        </div>
      </template>
      <template #dia_footer>
        <el-button
          type="primary"
          class="modal-btn"
          style="width: 100%"
          @click="handleSure"
          >{{ $t("property.确定") }}</el-button
        >
      </template>
    </common-modal>
  </div>
</template>

<script>
export default {
  name: "NetworkDialog",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    networkData: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      activeKey: 0,
      value:null
    };
  },
  methods: {
    handleSure() {
      this.$emit("update:isShow", false);
      this.$emit("networkSure",this.value);
    },
    onChange(id, val) {
      this.activeKey = id;
      this.value = val
      this.$emit("networkChange", val);
    },
  },
};
</script>

<style lang="scss" scoped>
.dialog {
  .item-box {
    height: 250px;
    .item {
      position: relative;
      height: 90px;
      border-radius: 6px;
      border: 1px solid #f5f7fa;
      margin: 0 30px;
      cursor: pointer;
      margin-bottom: 20px;
      color: #00082d;
      .pause {
        position: absolute;
        right: 3px;
        top: 3px;
        font-size: 12px;
        background: #fcbfba;
        color: #ff3928;
        border-radius: 5px;
        padding: 2px 5px;
      }
      .item-text{
        margin: 20px 0 0 20px;
      }
    }
    .item-disable {
      cursor: not-allowed;
       pointer-events: none;
    }
  }

  ::v-deep .select {
    position: relative;
    text-align: left;
    background-color: #fff;
    border: 1px solid #90ff00 !important;
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
</style>