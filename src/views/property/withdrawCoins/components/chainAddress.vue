<template>
  <div>
    <!-- 添加提币地址(链名称)弹窗 -->
    <common-modal
      title="地址清单中选择"
      width="600px"
      :show="chainAddressShow"
      :noFooter="false"
      :showClose="true"
      :FooterIsCenter="true"
      @cancel="$emit('update:chainAddressShow', false)"
    >
      <template #dia_content>
        <div class="dialog-content">
          <div class="title">
            <div class="title-left">
              <div class="coin-icon">
                <img v-if="iconUrl" :src="iconUrl" alt="" />
              </div>
              <div class="usdt">{{coinName}}</div>
            </div>
            <div class="title-right" @click="toAddress">
              <span class="right-title">管理我的地址</span>
              <i class="el-icon-arrow-right"></i>
            </div>
          </div>
          <div
            class="item"
            :class="activeKey === item.id ? 'select' : ''"
            @click="onChange(item.id, item)"
            v-for="item in addressQueryArr"
            :key="item.id"
          >
            <div style="margin:20px;0;0;20px;">
              <p class="item-title">钱包</p>
              <p>
                <span class="item-name">网络：</span>
                <span>{{ item.chainName }}</span>
              </p>
              <p>
                <span class="item-name">提币地址：</span>
                <span>{{ item.address }}</span>
              </p>
            </div>
          </div>
        </div>
      </template>
      <template #dia_footer>
        <div class="footer-btn" @click="addCionDialog">添加提币地址</div>
      </template>
    </common-modal>
  </div>
</template>

<script>
export default {
  name: "ChainAddress",
  props: {
    chainAddressShow: {
      type: Boolean,
      default: false,
    },
    coinName: {
      type: String,
      default: "",
    },
    iconUrl: {
      type: String,
      default: "",
    },
    addressQueryArr: {
      type: Array,
      default: () => [],
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
      this.$emit("chainAddressChange", val);
    },
    addCionDialog() {
      this.$emit("update:chainAddressShow", false);
    },
    toAddress() {
      this.$emit("toAddress");
    },
  },
};
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 16px;
  color: #999;
  padding: 0 108px;
  text-align: center;
  .no-backup {
    width: 171px;
    height: 120px;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.dialog-content {
  overflow: auto;
  height: 450px;
  padding: 0 20px;
  .title {
    display: flex;
    justify-content: space-between;
    font-size: 14px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #00082d;
    margin-bottom: 30px;
    .title-left {
      display: flex;
      align-items: center;
      .coin-icon {
        width: 24px;
        height: 24px;
        border-radius: 50%;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
        }
      }
    }
    .usdt {
      padding-left: 10px;
    }
    .title-right {
      cursor: pointer;
      .right-title {
        padding-right: 10px;
      }
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
    border: 1px solid $colorB;
    position: relative;
  }
  .select:before {
    content: "";
    position: absolute;
    bottom: 0;
    right: 0;
    border: 14px solid $colorB;
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
  background: $colorB;
  border-radius: 6px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
  cursor: pointer;
}
</style>