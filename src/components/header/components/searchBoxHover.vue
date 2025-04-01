<template>
  <div class="searchBox" v-if="isShow">
    <div class="main" :class="{ useTheme: useTheme }">
      <div class="title">{{ $t("header.hot_search") }}</div>
      <div class="content">
        <div class="box">
          <div
            class="cell"
            v-for="(item, index) in list"
            :key="index"
            @click="chooseSymbol(item)"
          >
            <div class="left">
              <span class="index" :class="{ hot: index < 3 }">{{
                index + 1
              }}</span>
              <div class="icon">
                <img :src="item.icon" alt="" />
              </div>
              <span class="symbol">{{ item.coinMarket }}</span>
              <img
                v-if="item.isHot"
                class="fire"
                src="@/assets/contract-imgs/fire.png"
                alt=""
              />
            </div>
            <div class="right">
              <div class="lastPrice" :class="num(item) ? 'up' : 'down'">
                {{ item.lastPrice }}
              </div>
              <div
                class="change"
                :class="{
                  up: parseFloat(item.change) > 0,
                  down: parseFloat(item.change) < 0,
                }"
              >
                {{ item.change | changeFilter }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { simulateArrayData } from "@/libs/simulateArrayData.js";

export default {
  name: "searchBox",
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    contractList: {
      type: Array,
      default: () => [],
    },
    //是否启用主题
    useTheme: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      list: [],
      num: simulateArrayData(),
    };
  },

  methods: {
    chooseSymbol(item) {
      this.$store.commit("setCurrentMarket", item.symbol);
      this.$router.push({
        path: "/layout/contractTransaction",
      });
    },
  },
  mounted() {},
  computed: {
    ...mapState(["header"]),
  },
  watch: {
    contractList: {
      handler(data) {
        this.list = data.map((item) => {
          // console.log('item',item);
          return {
            ...item,
            coinMarket: item.symbolKey.toUpperCase(),
          };
        });
      },
      deep: true,
    },
  },
  filters: {
    changeFilter(val) {
      if (val < 0) {
        return `${val}%`;
      } else if (val == 0 || val == undefined || null) {
        return 0;
      } else {
        return `+${val}%`;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.searchBox {
  position: absolute;
  bottom: 0px;
  left: 0;
  transform: translateY(100%);
  width: 400px;
  height: 450px;
  padding-top: 20px;

  .main {
    width: 100%;
    height: 430px;
    padding: 20px 0;
    background-color: #ffffff;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    .title {
      font-size: 18px;
      color: #333333;
      padding: 0 20px;
    }
    .content {
      height: 360px;
      margin-top: 20px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        display: none;
      }
      .box {
        .cell {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 45px;
          padding: 0 20px;
          &:hover {
            background-color: #f5f7fa;
            cursor: pointer;
          }
          .left {
            display: flex;
            align-items: center;
            width: 180px;
            margin-right: 10px;
            .index {
              font-size: 14px;
              color: #96a2b2;
              &.hot {
                color: #ff4434;
              }
            }
            .icon {
              width: 24px;
              height: 24px;
              margin-left: 18px;
              margin-right: 10px;
              img {
                width: 24px;
                height: 24px;
              }
            }
            .symbol {
              font-size: 16px;
            }
            .fire {
              // width: 12px;
              margin-left: 5px;
              margin-bottom: -3px;
            }
          }
          .right {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding-left: 10px;
            .lastPrice {
              font-size: 16px;
              color: #333333;
              &.up {
                color: #90ff00;
              }
              &.down {
                color: #f75f52;
              }
            }
            .change {
              color: #333333;
              font-size: 10px;
              &.up {
                color: #90ff00;
              }
              &.down {
                color: #f75f52;
              }
            }
          }
        }
      }
    }
    &.useTheme {
      background-color: var(--pop-bg);

      .title {
        color: var(--main-text-color);
      }
      .content {
        .box {
          .cell {
            &:hover {
              background-color: var(--pop-hover-bg);
            }
            .right {
              .lastPrice {
                color: var(--main-text-color);
                &.up {
                  color: #90ff00;
                }
                &.down {
                  color: #f75f52;
                }
              }
              .change {
                color: var(--main-text-color);
                &.up {
                  color: #90ff00;
                }
                &.down {
                  color: #f75f52;
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
