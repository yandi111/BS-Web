<template>
  <div class="searchBox" v-if="isShow">
    <div class="main" :class="{ useTheme: useTheme }">
      <div class="tabs">
        <span
          class="li"
          :class="{ active: item.id == currentIndex }"
          v-for="item in tabsList"
          :key="item.id"
          @click="changeTab(item.id)"
          >{{ item.label }}</span
        >
      </div>
      <div class="content">
        <div class="box" v-if="currentIndex == 0">
          <div class="card">
            <div class="title">{{ $t("header.spot") }}</div>
            <div
              class="cell"
              v-for="item in spotRenderData"
              :key="item.id"
              @click="toTrade(item, 1)"
            >
              <div class="left">
                <div class="icon">
                  <img :src="item.icon" alt="" />
                </div>
                <div class="symbol">{{ item.symbol }}</div>
              </div>
              <div class="right">
                <div
                  class="lastPrice"
                  :class="{
                    up: parseFloat(item.change) > 0,
                    down: parseFloat(item.change) < 0,
                  }"
                >
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
            <div class="btn" @click="showMore(1)">{{ $t("header.more") }}</div>
          </div>
          <div class="card mt20">
            <div class="title">{{ $t("header.futures") }}</div>
            <div
              class="cell"
              v-for="item in contractRenderData"
              :key="item.id"
              @click="toTrade(item, 2)"
            >
              <div class="left">
                <div class="icon">
                  <img :src="item.icon" alt="" />
                </div>
                <div class="symbol">{{ item.symbol }}</div>
                <div class="tip">{{ $t("header.perpetual") }}</div>
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
            <div class="btn" @click="showMore(2)">{{ $t("header.more") }}</div>
          </div>
        </div>
        <div class="box" v-else-if="currentIndex == 1">
          <div
            class="cell"
            v-for="(item, index) in spotRenderData"
            :key="index"
            @click="toTrade(item, 1)"
          >
            <div class="left">
              <span class="index">{{ index + 1 }}</span>
              <div class="icon">
                <img :src="item.icon" alt="" />
              </div>
              <span class="symbol">{{ item.symbol }}</span>
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
        <div class="box" v-else>
          <div
            class="cell"
            v-for="(item, index) in contractRenderData"
            :key="index"
            @click="toTrade(item, 2)"
          >
            <div class="left">
              <span class="index">{{ index + 1 }}</span>
              <div class="icon">
                <img :src="item.icon" alt="" />
              </div>
              <span class="symbol">{{ item.symbol }}</span>
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
    spotList: {
      type: Array,
      default: () => [],
    },
    contractList: {
      type: Array,
      default: () => [],
    },
    searchKey: {
      type: String,
      default: "",
    },
    //是否启用主题
    useTheme: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      tabsList: [
        { label: this.$t("header.all"), id: 0 },
        { label: this.$t("header.spot"), id: 1 },
        { label: this.$t("header.futures"), id: 2 },
      ],
      currentIndex: 0,
      list: [],
      contractRenderData: [],
      spotRenderData: [],
      num: simulateArrayData(),
    };
  },

  methods: {
    changeTab(id) {
      this.currentIndex = id;
    },
    toTrade(item, type) {
      let url = "";
      if (type == 1) {
        url = "/layout/spotTrading";
        this.$store.commit("setSpotCurrentMarket", item.symbol);
      } else {
        url = "/layout/contractTransaction";
        this.$store.commit("setCurrentMarket", item.symbol);
      }
      this.$router.push({
        path: url,
      });
    },
    filterData(searchV) {
      let key = searchV ? searchV.toLowerCase() : "";
      let length = this.currentIndex ? 100 : 2;
      this.spotRenderData = this.spotList
        .filter((item) => {
          if (item.symbolKey.includes(key)) {
            return item;
          }
        })
        .slice(0, length);
      this.contractRenderData = this.contractList
        .filter((item) => {
          if (item.symbolKey.includes(key)) {
            return item;
          }
        })
        .slice(0, length + 1);
    },
    showMore(id) {
      this.changeTab(id);
    },
  },
  computed: {
    ...mapState(["header"]),
  },
  watch: {
    searchKey: {
      handler(value) {
        this.filterData(value);
      },
    },
    currentIndex: {
      handler() {
        this.filterData(this.searchKey);
      },
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
  // height: 450px;
  padding-top: 20px;

  .main {
    width: 100%;
    height: 500px;
    padding: 20px 0 0;
    background-color: #ffffff;
    box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.05);
    border-radius: 6px;
    .tabs {
      font-size: 18px;
      color: #96a2b2;
      font-weight: bold;
      padding: 0 20px;
      height: 40px;
      border-bottom: 1px solid #f6f7fa;
      .li {
        margin-right: 20px;
        display: inline-block;
        height: 100%;
        cursor: pointer;
        &.active {
          position: relative;
          color: #333333;
          &::after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 3px;
            background-color: #90ff00;
          }
        }
      }
    }
    .content {
      height: 424px;
      padding-top: 20px;
      overflow-y: auto;
      .box {
        color: #333333;

        .card {
          .cell {
            .icon {
              margin-left: 0;
            }
          }
          .title {
            font-size: 14px;
            color: inherit;
            font-weight: bold;
            padding-left: 20px;
          }
          .btn {
            height: 37px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 16px;
            color: var(--theme-color);
            margin: 20px 20px 0;
            border: 1px solid #f5f6f8;
            border-radius: 40px;
            cursor: pointer;
          }
        }
      }
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
          width: 170px;
          .index {
            font-size: 14px;
          }
          .icon {
            width: 24px;
            height: 24px;
            margin-left: 20px;
            margin-right: 10px;
            img {
              width: 100%;
            }
          }
          .symbol {
            font-size: 16px;
          }
          .tip {
            font-size: 10px;
            padding: 1px 3px;
            color: #90ff00;
            border-radius: 2px;
            margin-left: 5px;
            background-color: #dbf5ed;
            transform: scale(0.7);
            margin-bottom: -2px;
          }
        }
        .right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-left: 30px;
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
    &.useTheme {
      background-color: var(--pop-bg);
      .tabs {
        border-bottom: 1px solid var(--pop-hover-bg);
        .li {
          &.active {
            color: var(--main-text-color);
          }
        }
      }
      .content {
        .box {
          color: var(--main-text-color);
          .card {
            .title {
              color: inherit;
            }
            .btn {
              border: 1px solid var(--border-color);
            }
          }
        }
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
</style>
