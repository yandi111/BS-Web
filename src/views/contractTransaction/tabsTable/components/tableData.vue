<template>
  <div class="table-data">
    <el-table
      ref="table"
      :data="tableData"
      @row-click="transferdata"
      v-loading="tableData.length > 0 ? false : true"
      :height="tableHeight"
      :class="[1 == 1 ? tableWidth : '']"
    >
      <el-table-column
        v-for="item in columnData"
        :key="Math.random() + item.label"
        :prop="item.prop"
        :label="item.label"
        :width="item.width"
        :min-width="item.minWidth"
        show-overflow-tooltip
      >
        <template #header>
          <div class="df aic">
            <span class="header-label">{{ item.label | translate }}</span>
            <div class="tips">
              <el-tooltip
                placement="top"
                v-if="item.icon"
                popper-class="my-tooltip"
              >
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
                <i class="iconfont icon-warning1 ml8 f30"></i>
              </el-tooltip>
            </div>
          </div>
        </template>
        <template slot-scope="{ row }">
          <!-- 默认展示 -->
          <span class="txt" v-if="item.text">{{
            row[item.prop] | translate
          }}</span>

          <!-- 方向|杠杆 -->
          <div class="direction" v-if="item.direction">
            <div class="box" v-for="(ele, index) in item.content" :key="index">
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

          <!-- 委託方向 -->
          <div
            v-if="item.e_direction"
            class="entrust_direction"
            :style="
              row['directType'] == 3 || row['directType'] == 4
                ? 'color:#f75f52'
                : 'color:#90ff00'
            "
          >
            <span>{{ row[item.content[0].name] | translate }}</span>
            <span>{{ row[item.content[1].name] }}</span>
          </div>

          <!-- 持仓量 -->
          <div class="amount" v-if="item.unit">
            <span
              >{{ `${row[item.prop]} `
              }}{{
                contract.quantityUnit != 3
                  ? unit
                  : row["coinMarket"].slice(0, row["coinMarket"].length - 5)
              }}</span
            >
          </div>

          <!-- 保证金 -->
          <div class="leverage" v-if="item.leverage">
            <div class="box" v-for="(ele, index) in item.content" :key="index">
              <span v-if="ele.type == 'text'"
                >{{ row[item.content[0].name] }}
              </span>
              <div v-if="ele.type == 'edit'">
                <span
                  :style="
                    row[item.content[1].name] && row['positionType'] == 0
                      ? 'color:#3990ff'
                      : 'color:#ffac00'
                  "
                  >({{ row[item.content[1].name] }})</span
                >
                <i
                  v-if="row[item.content[1].name] && row['positionType'] == 1"
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
                v-if="item.plExplanation"
                class="el-icon-arrow-right"
                @click.stop="onplExplanation(row)"
              ></i>
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

          <!-- 委托时间 -->
          <div class="time df aic" v-if="item.checkbox">
            <div class="box" v-for="ele in item.content" :key="ele.name">
              <i
                v-if="ele.type == 'checkbox' && isShowCheckbox"
                class="iconfont pointer"
                :class="[
                  chooseArr.includes(row.entrustNo)
                    ? 'icon-xuanzekuang'
                    : 'icon-xuanzekuang-duoxuanweixuan',
                ]"
                @click.stop="toCheck(row)"
              ></i>
              <span v-if="ele.type == 'text'">{{ row[ele.name] }}</span>
            </div>
          </div>

          <!-- 合约类型 -->
          <div class="contractType" v-if="item.contractType">
            <span
              class="mr5"
              :class="{
                blue: row[ele.value] == 0,
                orange: row[ele.value] == 1,
              }"
              v-for="(ele, index) in item.content"
              :key="index"
              >{{ row[ele.name] | translate }}</span
            >
          </div>
          <!-- 当前委托的止盈止损 -->
          <div v-if="item.profitLossText">
            <span
              >{{ row.profitTriggerPrice ? row.profitTriggerPrice : "- -" }} |
              {{ row.lossTriggerPrice ? row.lossTriggerPrice : "- -" }}</span
            >
            <i class="el-icon-edit" @click="profitLossEdit(row)"></i>
          </div>

          <!-- 操作 -->
          <div v-if="item.isOperation" class="btnsBox df aic">
            <div
              v-for="(operations, index) in item.operation"
              :key="index"
              class="btns"
              :class="{
                undo: operations.type == 'undo',
                disabled: operations.type == 'check' && !row.availableStatus,
              }"
            >
              <span
                class="btn"
                v-if="operations.isShow(row)"
                @click.stop="operations.buttonClick(row)"
                >{{ operations.label | translate }}</span
              >
            </div>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <!-- 盈亏解释弹窗 -->
    <my-modal
      :isShow.sync="showModal"
      @close="handleClose"
      :title="$t('contract.已实现盈亏')"
    >
      <template #content>
        <div>
          <div class="m-list">
            <div class="l-l">{{ $t("contract.已实现收益") }}</div>
            <div class="l-r">
              {{ profitLossData.realizedProfitLoss | dealData }} USDT
            </div>
          </div>
          <div class="l-border"></div>
          <div class="m-list">
            <div>{{ $t("contract.平仓收益") }}</div>
            <div class="l-r">
              {{ profitLossData.closePositionProfitLoss | dealData }} USDT
            </div>
          </div>
          <div class="m-list">
            <div>{{ $t("contract.资金费") }}</div>
            <div class="l-r">
              {{ profitLossData.fundingFee | dealData }} USDT
            </div>
          </div>
          <div class="m-list">
            <div>{{ $t("contract.维持保证金") }}</div>
            <div class="l-r">
              {{ profitLossData.maintenanceMargin | dealData }} USDT
            </div>
          </div>
          <div class="m-list">
            <div>{{ $t("contract.手续费") }}</div>
            <div class="l-r">
              {{ profitLossData.handingFee | dealData }} USDT
            </div>
          </div>
          <div class="m-list m-text">
            {{ $t("contract.当您的仓位被强平清算时，您保证金中的任何剩余余额都将作为强平罚金收取") }}
          </div>
        </div>
      </template>
      <template #footer>
        <div></div>
      </template>
    </my-modal>
    <!-- 编辑止盈止损 -->
    <EditProfitLoss :isShow.sync="showEditProfitLoss" :data="rowData" @profitLossr-success="profitLossrSuccess" />
  </div>
</template>

<script>
import { mapState } from "vuex";
import { profitLossInfo, profitLossById } from "@/api/contractTransaction";
import myModal from "@/components/my-modal/index.vue";
import EditProfitLoss from "./editProfitLoss.vue";
export default {
  name: "TableData",
  components: {
    myModal,
    EditProfitLoss,
  },
  props: {
    record: {
      type: String,
      default: "暂无数据",
    },
    columnData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    isShowCheckbox: {
      type: Boolean,
      default: false,
    },
    //被选中的id
    chooseId: {
      type: String,
      default: "",
    },
    tableWidth: {
      type: String,
      default: "width1544",
    },
    tableHeight: {
      type: String,
      default: "300px",
    },
  },
  data() {
    return {
      chooseArr: [],
      submitParams: [],
      loading: true,
      uni: "BTC",
      options: [],
      showModal: false,
      profitLossData: {},
      showEditProfitLoss: false,
      rowData: {},
    };
  },
  filters: {
    dealData(item) {
      if (item) {
        return item;
      } else {
        return "0";
      }
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

  methods: {
    profitLossrSuccess(){
      this.$emit('profitLossrSuccess')
    },
    //编辑止盈止损
    profitLossEdit(row) {
      profitLossById({ id: row.entrustNo }).then((res) => {
        this.rowData = Object.assign({},res.data?.data,{leverTimes:row.leverTimes,entrustNo:row.entrustNo,entrustType:row.entrustType});
        this.showEditProfitLoss = true;
      });
    },
    //传递行数据
    transferdata(row) {
      // console.log("row", row);
      this.$store.commit("setCurrentMarket", row.coinMarket);
    },
    toCheck(row) {
      let type = {
        1: 1,
        2: 1,
        3: 3,
        4: 3,
        5: 2,
      };
      let obj = {
        entrustNo: row.entrustNo,
        orderType: type[row.entrustType],
      };

      let index = this.chooseArr.indexOf(row.entrustNo);

      if (index != -1) {
        this.chooseArr.splice(index, 1);
      } else {
        this.chooseArr.push(row.entrustNo);
      }

      if (index != -1) {
        this.submitParams.splice(index, 1);
      } else {
        this.submitParams.push(obj);
      }

      this.$emit("multi-select", this.submitParams);
    },
    getMaxLength(arr) {
      return arr.reduce((acc, item) => {
        if (item) {
          let items = this.$t(item);
          console.log("item", items);

          let calcLen = this.getTextWidth(items);
          if (acc < calcLen) {
            acc = calcLen;
          }
        }
        return acc;
      }, 0);
    },
    getTextWidth(str) {
      let width = 0;
      let html = document.createElement("span");
      html.innerText = str;
      html.className = "getTextWidth";
      document.querySelector("body").appendChild(html);
      width = document.querySelector(".getTextWidth").offsetWidth;
      console.log("width", width);
      document.querySelector(".getTextWidth").remove();
      return width;
    },
    //盈亏解释
    onplExplanation(row) {
      this.showModal = true;
      profitLossInfo({ positionId: row.positionId }).then((res) => {
        // console.log("盈亏解释", res);
        this.profitLossData = res.data?.data;
      });
    },
    handleClose() {
      this.showModal = false;
    },
  },
  watch: {
    tableData(valArr) {
      return;
      const _this = this;
      this.options = this.columnData.map(function (value) {
        const arr = valArr.map((x) => {
          return x[value.prop];
        });
        arr.push(value.label);

        let correction = 30;
        let label = "";
        // console.log("arr", arr);

        if (arr[1]?.includes("持仓量")) {
          correction = 40;
        }

        //操作
        if (!arr[0]) {
          correction = 150;
          value.operation.forEach((item) => {
            label += _this.$t(item.label) + " ";
          });
          console.log("label", label);
          arr[arr.length - 1] = label;
        }
        value.minWidth = _this.getMaxLength(arr) + correction;
        console.log("value", value);
        return value;
      });
    },
    chooseId: {
      handler(entrustNo) {
        // console.log(entrustNo);
        if (entrustNo == "all") {
          this.chooseArr = [];
          this.submitParams = [];
        } else {
          let index = this.chooseArr.indexOf(entrustNo);
          if (index != -1) {
            this.chooseArr.splice(index, 1);
          }
          if (index != -1) {
            this.submitParams.splice(index, 1);
          }
        }
        this.$emit("multi-select", this.submitParams);
      },
    },
    "contract.contractInfo"(value) {
      // console.log("币种", value.baseAssetCode);
      this.uni = value.baseAssetCode;
    },
  },
  mounted() {},
  beforeUpdate() {
    this.$nextTick(() => {
      this.$refs["table"].doLayout();
    });
  },
};
</script>

<style lang="scss" scoped>
.table-data {
  width: calc(100% - 10px);
  .header-label {
    color: var(--table-label-color);
  }

  .iconfont {
    font-size: 20px;
    cursor: pointer;
    color: var(--table-label-color);
  }

  span {
    color: var(--main-text-color);
    font-weight: 700;
  }
  .direction {
    display: flex;
    flex-direction: row;
    align-items: center;
    .box {
      display: flex;
      align-items: center;
      justify-content: center;
      .icon-edit {
        font-size: 24px;
        margin-left: 10px;
        color: #8992a6;
        cursor: pointer;
      }
      span {
        display: block;
        height: 30px;
        line-height: 30px;
        // border: 1px solid pink;
      }
    }
  }
  .entrust_direction {
    span {
      color: inherit;
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
  .time {
    .box {
      .iconfont {
        margin-right: 10px;
        font-size: 14px;
        &.disabled {
          cursor: not-allowed;
          color: #c5c6ca;
        }
      }
      .icon-xuanzekuang {
        color: var(--theme-color);
      }
    }
  }
  .contractType {
    // .box{}
    .blue {
      color: #3990ff;
    }
    .orange {
      color: #ffac00;
    }
  }
  .btnsBox {
    width: 100%;
    justify-content: flex-end;
    .btns {
      // min-width: 80px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 10px;
      font-size: 16px;
      margin-right: 10px;
      border-radius: 6px;
      border: 1px solid var(--theme-color);
      cursor: pointer;
      &:last-child {
        margin-right: 0px;
      }
      &:hover {
        opacity: 0.7;
      }
      &.undo {
        border: 1px solid #f75f52;
        .btn {
          color: #f75f52;
        }
      }
      &.disabled {
        opacity: 0.4;
        cursor: not-allowed;
      }
      .btn {
        font-weight: 600;
        color: var(--theme-color);
      }
    }
  }
}
.el-icon-arrow-right {
  padding-left: 5px;
  cursor: pointer;
}
.m-list {
  display: flex;
  justify-content: space-between;
  color: #c5c6ca;
  margin-bottom: 20px;
  .l-l {
    color: #333;
  }
  .l-r {
    color: #f75f52;
  }
}
.m-text{
  color: #333;
}
.l-border {
  border-bottom: 1px solid #f5f7fa;
  margin-bottom: 20px;
}
.el-icon-edit {
  padding-left: 10px;
  color: #90ff00;
  cursor: pointer;
  font-size: 16px;
}
//去掉表格边框
::v-deep .el-table__row > td {
  border: none;
}
::v-deep .el-loading-mask {
  background-color: var(--main-bg);
}
/* 清除底部横线 */
.el-table::before {
  height: 0px;
}
/*头部边框*/
::v-deep .el-table thead tr th.is-leaf {
  border: 0px solid #ebeef5;
  border-right: none;
  color: var(--table-label-color);
}
::v-deep .el-table thead tr th:nth-last-of-type(2) {
  border-right: 0px solid #ebeef5;
}
.el-table ::-webkit-scrollbar {
  width: 0.1px;
}
.el-table ::-webkit-scrollbar-track-piece {
  background-color: var(--select-bg);
  border-radius: 3px;
}
.el-table ::-webkit-scrollbar-thumb {
  background-color: rgba($color: #e1e1e1, $alpha: 0.2);
  border-radius: 3px;
}
::v-deep .el-table {
  // height: 360px;
  background-color: var(--main-bg);
  .el-table__header,
  .el-table__body,
  .el-table__footer {
    background: var(--main-bg) !important;
    // width: 800px !important;
  }
  thead {
    // width: 900px !important;
    tr {
      th {
        background-color: var(--main-bg);
        &.is-leaf {
          padding: 5px 0;
        }
        .cell {
          display: flex;
          align-items: center;
          padding: 5px 10px;
        }
        &:nth-last-child(2) {
          .cell {
            justify-content: flex-end;
            padding-right: 50px;
          }
        }
      }
    }
  }
  tbody {
    tr {
      background-color: var(--main-bg);
      td {
        padding: 5px 0;
        .cell {
          display: flex;
          align-items: center;
        }
        &:last-child {
          .cell {
            justify-content: flex-end;
            padding-right: 50px;
          }
        }
      }
    }
  }
}
::v-deep .el-table--scrollable-x .el-table__body-wrapper {
  background-color: var(--main-bg);
}
::v-deep .el-table__body-wrapper {
  background-color: var(--main-bg);
}

::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background: var(--row-hover-bg);
}
</style>
