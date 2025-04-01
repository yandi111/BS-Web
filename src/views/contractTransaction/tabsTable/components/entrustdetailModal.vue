<!-- 明细 -->
<template>
  <div class="entrustdetail">
    <my-modal
      :is-show.sync="isShow"
      useTheme
      title="contract.委托明细"
      @close="handleCancel"
    >
      <template slot="content">
        <div class="content">
          <div class="cell" v-for="(item, index) in data.list" :key="index">
            <span class="lable">{{ item.label | translate }}</span>
            <span class="value">{{ item.value | translate }}</span>
          </div>
          <div
            class="bottom"
            v-if="data.row?.closePositionsType == 1 && data.list.length"
            :class="{ dark: getTheme == 'dark' }"
          >
            <div class="title">
              <span class="label">{{ "contract.强平详情" | translate }}</span>
              <span class="time">{{ data.row.$createTime }}</span>
            </div>
            <div class="txts">
              <p>
                <span class="text1">{{
                  $t(
                    "contract.X永续的标记价格到达X时,您的XX仓位的保证金率小于或等于100%，强制平仓将被触发。仓位按照标记价格X被强平引擎接管",
                    [
                      data.row.coinMarket,
                      data.row.pointPrrice,
                      data.row.coinMarket,
                      direction,
                    ]
                  )
                }}</span>
              </p>
            </div>
            <div
              class="link"
              @click="(_) => $router.push('/forcedLiquidation')"
            >
              <span>{{ "contract.关于强平" | translate }}</span>
              <i class="iconfont icon-more1 ml10"></i>
            </div>
          </div>
        </div>
      </template>
      <template slot="footer">
        <div class="btns mt1"></div>
      </template>
    </my-modal>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import myModal from "@/components/my-modal";

export default {
  name: "conract-entrustdetail",
  components: {
    myModal,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      detailData: [],
      lang: "cn",
    };
  },

  methods: {
    handleCancel() {
      this.$emit("update:isShow", false);
    },
  },
  computed: {
    ...mapGetters(["getTheme"]),
    direction() {
      let directType =
        this.data.row.directType == 1 || this.data.row.directType == 2
          ? this.$t("contract.多仓")
          : this.$t("contract.空仓");
      let text = `${this.$t("lang_795")}-${directType}-${
        this.data.row.leverTimes
      }X`;
      return text;
    },
  },
  watch: {
    data: {
      handler(value) {
        console.log("prompt", value);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .text {
    font-size: 18px;
    color: var(--main-text-color);
  }
  .icon-close {
    font-size: 22px;
    color: #8992a6;
    cursor: pointer;
  }
}
.content {
  .cell {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    height: 30px;
    color: #96a2b2;
    .value {
      color: var(--main-text-color);
    }
  }
  .bottom {
    margin-top: 10px;
    padding-top: 15px;
    border-top: 1px solid var(--dialog-line-color);
    .title {
      justify-content: flex-start;
      .label {
        font-size: 16px;
        font-weight: 700;
        color: #00082d;
      }
      .time {
        font-size: 12px;
        margin-left: 10px;
        color: #8992a6;
      }
    }
    .txts {
      margin-top: 10px;
      color: #96a2b2;
      p {
        line-height: 32px;
        .price {
          color: #000000;
        }
      }
    }
    .link {
      font-size: 16px;
      color: var(--theme-color);
      cursor: pointer;
      font-weight: 700;
      margin-top: 15px;
    }
    &.dark {
      .label {
        color: #fff !important;
      }
      .price {
        color: #ffffff !important;
      }
    }
  }
}
</style>
