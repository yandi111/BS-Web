<template>
  <div class="my-table width1544">
    <div class="my-table-body">
      <table cellspacing="0">
        <thead>
          <tr>
            <th
              v-for="(item, index) in label"
              :key="index"
              rowspan="1"
              colspan="1"
            >
              <div class="cell">
                <span>{{ item.label | translate }}</span>
                <div v-if="item.icon" class="tips">
                  <el-tooltip placement="top" popper-class="my-tooltip">
                    <div slot="content">
                      <div class="contentBox">
                        <span class="title">
                          {{ "contract.预估强平价说明" | translate }}</span
                        >
                        <p class="text">
                          {{
                            "contract.此价格仅供参考。实际强平、减仓触发按保证金率≤100%时为准。"
                              | translate
                          }}
                        </p>
                      </div>
                    </div>
                    <i class="iconfont icon-warning1 ml8"></i>
                  </el-tooltip>
                </div>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(row, index) in data"
            :key="index"
            @click="handlerPickRow(row)"
          >
            <td v-for="(item, index) in label" rowspan="1" colspan="1">
              <div class="cell">
                <!-- 默认数据展示 -->
                <span v-if="item.text">{{ row[item.prop] | translate }}</span>

                <!-- 方向|杠杆 -->
                <div class="direction" v-if="item.direction">
                  <div
                    class="box"
                    v-for="(ele, index) in item.content"
                    :key="index"
                  >
                    <span
                      v-if="ele.type == 'text'"
                      :style="
                        row[item.prop] && row['positionDirection'] == 2
                          ? 'color:#f75f52'
                          : 'color:#90ff00'
                      "
                      >{{ row[item.prop] | translate }}</span
                    >
                    <i
                      class="iconfont icon-edit"
                      v-if="ele.type == 'edit'"
                      @click.stop="ele.buttonClick(row)"
                    ></i>
                  </div>
                </div>

                <!-- 持仓量 -->
                <div class="amount" v-if="item.unit">
                  <span
                    >{{ `${row[item.prop]} `
                    }}{{
                      contract.quantityUnit != 3
                        ? unit
                        : row["coinMarket"].slice(
                            0,
                            row["coinMarket"].length - 5
                          )
                    }}</span
                  >
                </div>
                <!-- 保证金 -->
                <div class="leverage" v-if="item.leverage">
                  <div
                    class="box"
                    v-for="(ele, index) in item.content"
                    :key="index"
                  >
                    <span v-if="ele.type == 'text'"
                      >{{ row[item.content[0].name] }}
                    </span>
                    <div v-if="ele.type == 'edit'" class="editbox">
                      <span
                        :style="
                          row[item.content[1].name] && row['positionType'] == 0
                            ? 'color:#3990ff'
                            : 'color:#ffac00'
                        "
                        >({{ row[item.content[1].name] }})</span
                      >
                      <i
                        v-if="
                          row[item.content[1].name] && row['positionType'] == 1
                        "
                        class="iconfont icon-edit1"
                        @click.stop="ele.buttonClick(row)"
                      ></i>
                    </div>
                  </div>
                </div>

                <!-- 盈亏 -->
                <div class="profitLoss" v-if="item.profitLoss">
                  <div
                    class="box"
                    v-for="(ele, index) in item.content"
                    :key="index"
                    :class="{
                      up: row[item.content[0].name] > 0,
                      down: row[item.content[0].name] < 0,
                    }"
                  >
                    <span>
                      {{ index == 0 ? row[ele.name] : `(${row[ele.name]})` }}
                    </span>
                    <i
                      v-if="ele.buttonClick"
                      class="iconfont icon-share"
                      @click.stop="ele.buttonClick(row)"
                    ></i>
                    <span
                      class="usdt"
                      v-if="ele.type == 'usdt'"
                      :style="
                        row[item.content[0].name] > 0
                          ? 'color:#90ff00'
                          : 'color:#f75f52'
                      "
                      >USDT</span
                    >
                  </div>
                </div>

                <!-- 操作 -->
                <div v-if="item.isOperation" class="btns">
                  <div
                    class="btn"
                    v-for="x in item.operation"
                    @click.stop="x.buttonClick(row)"
                  >
                    {{ x.label | translate }}
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    label: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      info: "gjalgj",
    };
  },
  methods: {
    handlerPickRow(row) {
      console.log("item", row);
      this.$store.commit("setCurrentMarket", row.coinMarket);
    },
  },
  computed: {
    ...mapState(["contract"]),
    unit() {
      let obj = {
        1: `${this.$t("contract.张")}`,
        2: " USDT",
        3: ` ${this.uni}`,
      };
      return obj[this.contract.quantityUnit];
    },
  },
};
</script>

<style lang="scss" scoped>
.my-table {
  width: 100%;
  & ::-webkit-scrollbar {
    width: 0.1px;
  }
  & ::-webkit-scrollbar-track-piece {
    background-color: var(--select-bg);
    border-radius: 3px;
  }
  & ::-webkit-scrollbar-thumb {
    background-color: rgba($color: #e1e1e1, $alpha: 0.2);
    border-radius: 3px;
  }
  .my-table-body {
    height: 390px;
    overflow-y: auto;
    position: relative;
    table {
      width: 100%;
      thead {
        cursor: default;
        position: sticky;
        top: 0;
        left: 0;
        background-color: var(--main-bg);
      }
      tbody {
        tr {
          &:hover {
            background: var(--row-hover-bg);
            transition: all 0.5s;
          }
        }
      }
      tr {
        padding: 5px 10px;
        font-size: 14px;

        th {
          white-space: nowrap;
          font-weight: normal;
          color: #8992a6;
          &:last-child {
            .cell {
              justify-content: flex-end;
              padding-right: 20px;
            }
          }
        }
        .cell {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding: 5px 10px;
          min-width: 100px;
          min-height: 45px;
          .tips {
            display: flex;
            align-items: center;

            .iconfont {
              font-size: 22px;
            }
          }
          .direction {
            display: flex;
            flex-direction: row;
            align-items: center;
            .box {
              display: flex;
              align-items: center;
              justify-content: center;
              white-space: nowrap;
              .icon-edit {
                font-size: 22px;
                margin-left: 10px;
                color: #8992a6;
                cursor: pointer;
              }
              span {
                display: block;
                height: 30px;
                line-height: 30px;
              }
            }
          }
          .leverage,
          .profitLoss {
            display: flex;
            flex-direction: column;
            align-items: center;
            .box {
              width: 100%;
              display: flex;
              align-items: center;
              .editbox {
                span {
                  white-space: nowrap;
                }
              }
              &.up {
                span {
                  color: #90ff00;
                }
              }
              &.down {
                span {
                  color: #f75f52;
                }
              }
              .iconfont {
                cursor: pointer;
                font-size: 12px;
                color: #9ea9b9;
                margin-left: 8px;
              }
              .usdt {
                margin-left: 10px;
              }
            }
          }
          .profitLoss {
            .box {
              .iconfont {
                margin-right: 0px;
              }
            }
          }

          .btns {
            display: flex;
            align-items: center;
            .btn {
              display: flex;
              align-items: center;
              justify-content: center;
              min-width: 80px;
              height: 35px;
              padding: 0 15px;
              border: 1px solid var(--theme-color);
              border-radius: 6px;
              color: var(--theme-color);
              white-space: nowrap;
              cursor: pointer;
              &:nth-child(n + 2) {
                margin-left: 10px;
              }
              &:hover {
                opacity: 0.7;
              }
            }
          }
        }
      }
    }
  }
}
</style>
