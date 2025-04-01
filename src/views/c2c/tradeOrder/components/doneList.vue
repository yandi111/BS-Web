<!-- 购买 -->
<template>
  <div class="progress-table">
    <div class="order_list">
      <table-page
      v-if="curComp === 'List'"
      :total="total"
      :page.sync="formInline.pageNum"
      @current-change="changeNum"
    >
      <template #filter>
        <el-form :inline="true" :model="formInline">
          <el-form-item>
            <el-select
              v-model="formInline.type"
              :placeholder="$t(t + '所有类型')"
              class="width116"
              @visible-change="popperCss1 = !popperCss1"
            >
              <el-option
                v-for="item in typeList"
                :key="item.value"
                :label="$t(t + item.label)"
                :value="item.value"
              />
              <i
                slot="prefix"
                :class="[
                  'custom-icon',
                  popperCss1 ? 'el-icon-caret-top' : 'el-icon-caret-bottom',
                ]"
              ></i>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="formInline.status"
              :placeholder="$t(t + '所有状态')"
              class="width116"
              @visible-change="popperCss2 = !popperCss2"
            >
              <el-option
                v-for="item in statusType ? statusComplete : statusaffot"
                :key="item.value"
                :label="$t(t + item.label)"
                :value="item.value"
              />
              <i
                slot="prefix"
                :class="[
                  'custom-icon',
                  popperCss2 ? 'el-icon-caret-top' : 'el-icon-caret-bottom',
                ]"
              ></i>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-date-picker
              v-model="formInline.date"
              type="daterange"
              range-separator="-"
              :start-placeholder="$t(t + '开始日期')"
              :end-placeholder="$t(t + '结束日期')"
              @change="changeDate"
              align="right"
              class="width287"
            />
          </el-form-item>
          <el-form-item class="placeh-center">
            <el-input
              :placeholder="$t(t + '搜索订单编号')"
              v-model="formInline.number"
              class="width287 flexs"
            >
              <el-image
                slot="prefix"
                :src="require('@/assets/buy-coins/searchTrode.png')"
              />
            </el-input>
          </el-form-item>
          <el-form-item class="from-btn ml30">
            <el-button
              type="text"
              class="config"
              size="small"
              @click="orderList"
            >
              {{ $t(t + "筛选") }}
            </el-button>
            <el-button size="small" class="ml20" @click="handleFilter">
              {{ $t(t + "重置") }}
            </el-button>
          </el-form-item>
        </el-form>
      </template>
      <template v-slot:table>
        <el-table
          :data="tableData"
          style="width: 100%"
          v-loading="loading"
          @cell-dblclick="celldblclick"
        >
          <el-table-column
            prop="number"
            :label="$t(t + '订单号')"
            width="180"
            show-overflow-tooltip
          >
            <template slot-scope="scope">
              <span class="">{{ scope.row.number }}</span>
            </template>
          </el-table-column>
          <el-table-column
            prop="type"
            :label="$t(t + '方向')"
            min-width="100"
            align="center"
          >
            <template slot-scope="scope">
              <div
                :class="scope.row.type === 1 ? 'color-orange' : 'color-green'"
              >
                {{ scope.row.type === 0 ? $t(t + "卖出") : $t(t + "买入") }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="quantity"
            :label="$t(t + '数量')"
            min-width="120"
          >
            <template slot-scope="scope">
              {{ scope.row.quantity }} {{ scope.row.coinName }}
            </template>
          </el-table-column>
          <el-table-column
            prop="amount"
            :label="$t(t + '总金额')"
            min-width="120"
          >
            <template slot-scope="scope"> {{ scope.row.amount }} CNY </template>
          </el-table-column>
          <el-table-column
            prop="advertPrice"
            :label="$t(t + '单价')"
            min-width="100"
          >
            <template slot-scope="scope">
              {{ scope.row.advertPrice }} CNY
            </template>
          </el-table-column>
          <el-table-column
            prop="name"
            :label="$t(t + '对方昵称')"
            min-width="200"
          >
            <template slot-scope="scope">
              <div class="font-common">
                <div class="color-blue mar-bottom">
                  {{
                    $store.state.login.userInfo.userId == scope.row.userId
                      ? scope.row.merchantName
                      : scope.row.userName
                  }}
                  
                  <span class="userRealName">{{ scope.row.type==0 && scope.row.merchantRealName  ? '('+$t(t+'实名：') +scope.row.merchantRealName + ')': '' }}</span>
                </div>
                <div class="main-content" @click="handleDetail(scope.row)">
                  <svg-icon
                    iconClass="chat"
                    className="icon-find"
                    class="pad-right"
                  />
                  <span class="color-black font-common cursor-method">
                    {{ $t(t + "发起聊天") }}
                  </span>
                  <div class="redDot" v-if="scope.row.msgNums"></div>
                </div>
                
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            :label="$t(t + '订单状态')"
            min-width="100"
          >
            <template slot-scope="scope">
              <div class="tip-content mar-bottom">
                {{$t(t+ statusObj[scope.row.status] ) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column
            prop="createTime"
            :label="$t(t + '交易时间')"
            min-width="120"
          >
            <template slot-scope="scope">
              <div class="tip-content">
                {{ $formatTime(scope.row.createTime) }}
              </div>
            </template>
          </el-table-column>
          <el-table-column :label="$t(t + '操作')" align="right">
            <template slot-scope="scope">
              <div class="color-blue">
                <span @click="handleDetail(scope.row)">{{
                  $t(t + "详情")
                }}</span>
              </div>
            </template>
          </el-table-column>
          <template #empty>
            <div class="empty-tabaleContent">
              <img src="@/assets/images/null-page.png" alt="" />
              <p>{{ $t(t + "暂无数据") }}</p>
            </div>
          </template>
        </el-table>
      </template>
    </table-page>
    </div>
    <div v-if="curComp === 'Buy'" class="common-modal">
      <div class="order_detail">
        <Order @back="handleBack"></Order>
      </div>
    </div>
  </div>
</template>

<script>
import TablePage from "@/components/tablePage/index.vue";
import { simpleApi } from "@/api/assetWallet.js";
import {
  orderList,
  orderDetail,
  $messageStatus,
  $the_message_has_been_read,
} from "@/api/otc.js";
import { mapActions } from "vuex";
import Order from "../../components/order/index.vue";
import { statusObj, statusaffot, statusComplete } from "@/config/fields.js";
export default {
  name: "CionsBuy",
  components: {
    TablePage,
    Order,
  },
  data() {
    return {
      statusObj,
      // 国际缩写
      t: "c2c.",
      popperCss2: false,
      popperCss1: false,
      loading: true,
      total: 0,
      dealList: [],
      isShow: false,
      curComp: "List",
      typeList: [
        {
          label: "所有类型",
          value: "",
        },
        {
          label: "购买",
          value: 1,
        },
        {
          label: "出售",
          value: 0,
        },
      ],
      statusaffot,
      statusComplete,
      formInline: {
        type: undefined,
        status: undefined,
        number: undefined,
        coinId: undefined,
        date: undefined,
        startDate: undefined,
        endDate: undefined,
        pageNum: 1,
        pageSize: 10,
      },
      tableData: [],
      statusObj: statusObj,
      cloneFormInline: {},
      statusType: false,
    };
  },
  created() {
    this.coinSimple();
  },
  methods: {
    ...mapActions(["handleOrderInfo", "handleOrderStatus"]),
    // 重置
    handleFilter() {
      this.formInline = {
        pageNum: 1,
        pageSize: 10,
        status: this.statusType ? -1 : -2,
        type: "",
      };
      this.orderList();
    },
    changeNum(num) {
      this.formInline.pageNum = num.page;
      this.orderList();
    },
    // 日期选择
    changeDate(data) {
      this.formInline.startDate =
        data?.length > 0 ? data[0].getTime() : undefined;
      this.formInline.endDate =
        data?.length > 0 ? data[1].getTime() : undefined;
    },
    // 获取法币列表
    coinSimple() {
      simpleApi({
        isType: 1,
      }).then((res) => {
        this.dealList = res.data.data;
        this.dealList.unshift({
          id: "",
          coinName: "所有币种",
        });
        // console.log("res.data.data :>> ", res.data.data);
      });
    },
    orderList() {
      this.loading = true;
      orderList(this.formInline).then((res) => {
        this.tableData = res.data.records;
        this.total = res.data.total;
        this.loading = false;

        this.tableData.forEach((item) => {
          //未读消息状态
          $messageStatus({ coinId: item.number }).then((res) => {
            item.msgNums = res.data.data.size * 1;
          });
        });
        console.log("this.tab", this.tableData);
      });
    },
    /**
     * 详情,确认是买还是卖
     */
    handleDetail(row) {
      orderDetail({
        id: row.id,
      }).then((res) => {
        res.data.orderTime = new Date(res.data.createTime).getTime() / 1000;
        res.data.type = row.type;
        this.handleOrderInfo(res.data);
        this.handleOrderStatus(res.data.status);
        this.curComp = null;
        this.$nextTick(() => {
          this.curComp = "Buy";
        });
        // 自动滚动到顶部
        this.$scrollToTop();
        this.$emit("detail");

        // console.log("row", row);

        //已读消息
        $the_message_has_been_read({ coinId: row.number }).then((res) => {
          // console.log("res", res.data);
        });
      });
    },
    handleBack() {
      this.curComp = null;
      const { typeRoute } = this.$route.query;
      if (typeRoute) {
        this.$router.push({ name: typeRoute });
        // console.log(typeRoute, "typeRoute");
      }

      this.$nextTick(() => {
        this.curComp = "List";
        this.$emit("back");
      });
    },
    // 双击复制
    celldblclick(row, column, cell, event) {
      let oInput = document.createElement("input");
      oInput.value = row[column.property];
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand("Copy");
      this.$message.success(this.$t(this.t + "复制成功") + "！");
      oInput.remove();
    },
  },
};
</script>
<style lang="scss">
.progress-table {
  .el-form-item__content {
    .el-input__inner {
      font-size: 16px;
      border: 1px solid transparent !important;
      background: #f5f7fa;
      border-radius: 0.25rem;
    }

    .el-range-input {
      background: #f5f7fa;
    }
  }
}
</style>
<style lang="scss" scoped>
.order_list ,.order_detail{
  width: 100%;
  margin: auto;
}
.common-modal{
  width: 100%;
	background-image: url('@/assets/images/c2cBG.png');

}
::v-deep .chat-content .chat-panel {
  top: 216px;
  right: 206px;
}

::v-deep .dia-content {
  padding: 51px 0 0 0;
}

.progress-table {
  ::v-deep .el-date-editor {
    padding-left: 20px !important;
  }

  .color-blue {
    color: #90ff00;

    span {
      cursor: pointer;
    }
  }

  .color-green {
    color: #90ff00;
  }

  .color-orange {
    color: #f75f52;
  }

  .color-black {
    color: #333333;
  }

  .cursor-method {
    cursor: pointer;
  }

  .color-grey {
    color: #8992a6;
  }

  .font-common {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    .userRealName{
      color:#00082D 
    }
  }

  .main-content {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 108px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    border: 1px solid #90ff00;
    cursor: pointer;
    .redDot {
      position: absolute;
      right: -2px;
      top: -5px;
      width: 10px;
      height: 10px;
      background: #f75f52;
      border-radius: 50%;
    }
  }

  .pad-right {
    padding-right: 5px;
  }

  .mar-bottom {
    margin-bottom: 10px;
  }
}
::v-deep .placeh-center {
  .el-input {
    &__inner {
      padding-left: 40px !important;
      text-align: left !important;
      &:focus {
        border: 1px solid #90ff00 !important;
        background: white;
      }
    }
    &__prefix {
      left: 10px !important;
      right: auto !important;
      line-height: 50px !important;
    }
    .el-image {
      width: 24px;
      height: 24px;
    }
  }
}
::v-deep .el-form-item {
  .el-input {
    &__inner {
      text-align: center;
      padding-left: 0;
      border: 1px solid #f5f7fa;
    }
    &__suffix {
      display: none;
    }
    &__prefix {
      left: auto;
      right: 10px;
      font-size: 20px;
      color: #8992a6;
      line-height: 35px;
    }
  }
  .custom-icon {
    margin-left: 5px;
    font-size: 16px;
    color: #8992a6;
  }
}

.from-btn {
  .el-button {
    width: 70px;
    height: 34px;
    font-weight: bold;
    font-size: 16px;
    border-radius: 6px;
  }

  .config {
    background-color: #90ff00;
    color: white;

    &:hover {
      opacity: 0.8;
    }
  }
}
</style>
