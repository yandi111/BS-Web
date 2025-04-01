<!-- 全仓逐仓弹框 -->
<template>
  <div>
    <el-dialog
      :visible.sync="fullVisible"
      class="fullWarehouse"
      :show-close="false"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
    >
      <div class="dialog-content mt18">
        <div class="title fontWeight600 mb40 between">
          {{ contractInfo?.symbolKey?.toLocaleUpperCase() }}
          {{ $t(`${t + "保证金模式"}`) }}
          <el-image
            class="block pointer"
            @click="fullVisible = false"
            :src="require('@/assets/contract-imgs/dialogClose.png')"
          />
        </div>

        <div class="btn">
          <el-radio-group v-model="fullRadio" class="between">
            <el-radio-button
              label="0"
              :class="['btn-qc', { 'btn-active': fullRadio == 0 }]"
            >
              {{ $t(`${t + "全仓"}`)
              }}<el-image
                v-show="fullRadio == 0"
                :src="require('@/assets/contract-imgs/qzcActive.png')"
              />
            </el-radio-button>
            <el-radio-button
              label="1"
              :class="['btn-qc', { 'btn-active': fullRadio == 1 }]"
            >
              {{ $t(`${t + "逐仓"}`)
              }}<el-image
                v-show="fullRadio == 1"
                :src="require('@/assets/contract-imgs/qzcActive.png')"
              />
            </el-radio-button>
          </el-radio-group>
        </div>

        <div class="text mt20 pb20 mb20">
          {{ $t(`${t + "调整保证金模式仅对当前合约生效。"}`) }}
        </div>

        <div class="desc mb20">
          <span>{{ $t("contract.全仓保证金模式：") }}</span>
          <span>{{
            $t(
              "contract.保证金资产相同的全仓仓位共享该资产的全仓保证金。在强平事件中，交易者可能会损失全部该保证金和该保证金资产下的所有全仓仓位。"
            )
          }}</span>
        </div>

        <div class="desc">
          <span>{{ $t("contract.逐仓保证金模式:") }}</span>
          <span>{{
            $t(
              "contract.一定数量保证金被分配到仓位上。如果仓位保证金亏损到低于维持保证金的水平，仓位将被强平。在逐仓模式下，您可以为这个仓位添加和减少保证金。"
            )
          }}</span>
        </div>

        <el-button
          class="width440 height50 block mt40 mb20"
          type="primary"
          @click="handleConfig('bzj')"
          >{{ $t(`${t + "确认"}`) }}
        </el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      // 开关
      fullVisible: false,
      // 选择仓位
      fullRadio: undefined,
      // 国际缩写
      t: "contract.",
    };
  },
  computed: {
    ...mapState({
      // 单个交易对(合约)信息
      contractInfo: (state) => state.contract?.contractInfo,
    }),
  },
  methods: {
    // 修改全仓|逐仓
    handleConfig() {
      this.$emit("next", {
        positionType: this.fullRadio,
        operationType: 2,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.el-dialog__wrapper {
  overflow: hidden;
}

::v-deep .fullWarehouse {
  .el-dialog {
    border-radius: 25px;
    width: 500px;
    background: var(--main-bg);
    &__header {
      display: none;
    }
  }
  .dialog-content {
    width: 460px;
    margin: auto;
    text-align: left;
    .title {
      font-size: 18px;
      color: var(--trade-text-color);
    }

    .btn {
      .el-radio-button__inner {
        width: 220px !important;
        height: 50px !important;
        line-height: normal;
        background: var(--trade-btn-color);
        border: 1px solid transparent;
        color: var(--trade-text-color);
        font-size: 18px;
        font-weight: bold;
        box-shadow: none;
        border-radius: 6px;
      }
      &-qc {
        border: 1px solid transparent;
      }
      &-active {
        border-radius: 6px;
        border: 1px solid #90ff00;
      }
      .el-image {
        width: 25px;
        height: 34px;
        position: absolute;
        right: -2px;
        bottom: -3px;
      }
    }

    .text {
      font-size: 12px;
      color: var(--trade-text-color);
      width: 100%;
      border-bottom: 1px solid var(--trade-dialog-line-bg);
    }

    .desc {
      white-space: break-spaces;
      font-size: 14px;
      color: #96a2b2;
      span {
        color: var(--trade-text-color);
        font-weight: bold;
      }
    }
    .el-button {
      margin: auto;
    }
  }
}
</style>
