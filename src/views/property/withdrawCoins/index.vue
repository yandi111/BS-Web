<template>
  <div class="page">
    <div class="header" v-if="pageIndex === 1">
      <div class="title">
        <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
        <span @click="$router.go(-1)">{{ $t("property.提币") }}</span>
      </div>
      <div class="header-mid"></div>
      <div class="header-right">
        <div class="right-btn" @click="handleTab">
          {{
            tabsLabel ? "property.链上提币" : "property.内部转账" | translate
          }}
        </div>
        <div class="right-btn" @click="handleAddress">
          {{ $t("property.地址簿") }}
        </div>
      </div>
    </div>
    <div class="content" v-if="pageIndex === 1">
      <div class="left">
        <div class="nav">
          <img src="@/assets/property-imgs/nav.png" alt="" />
          <div>
            {{
              !tabsLabel ? "property.链上提币" : "property.内部转账" | translate
            }}
          </div>
        </div>
        <div class="content-left" v-if="!tabsLabel">
          <ChainForm
            v-if="coinList.length"
            :coinList.sync="coinList"
            @pageChange="pageChange"
            @tipChange="tipChange"
            @record="record"
            @chaiConfigure="getConfigure"
          />
        </div>
        <div class="content-left" v-else>
          <InsideForm
            ref="insideRef"
            v-if="coinList.length"
            :coinList.sync="coinList"
            @pageChange="pageChange"
            @record="record"
          />
        </div>
      </div>
      <div class="right">
        <div class="content-box" v-if="!tabsLabel">
          <div class="content-right">
            <div class="right-bg">
              <div class="right-t">
                {{ $t("property.守护您的资产") }}<br />{{
                  $t("property.BSEX继续为您护航")
                }}
              </div>
              <div>
                <img src="@/assets/property-imgs/assets-banner.png" alt="" />
              </div>
            </div>
            <div class="right-text pad">
              <div class="text-title">{{ $t("property.温馨提示") }}</div>
              <p>
                {{
                  $t(
                    "property.请确认您的提币地址是否与选择的链名称匹配，避免因网络选择错误，造成提币不成功资产无法找回，造成的损失平台不承担。"
                  )
                }}
              </p>
              <!-- <p>
                <span>-{{$t('property.最小提币数量为')}}：</span>
                <span>{{ minValue }}，</span>
                <span>{{$t('property.最大提币金额不得超过您账户的可用金额。')}}</span>
              </p> -->
              <p>{{ $t("property.请确保提币地址与金额是否正确") }}</p>
              <p>
                {{
                  $t(
                    "property.如果提币地址为本平台的地址，则暂不收取提币手续费。"
                  )
                }}
              </p>
              <p>
                {{
                  $t("property.请确保您移动设备的安全，防止信息被篡改或泄露。")
                }}
              </p>
              <!-- <p>- {{$t('property.如果提币地址是平台地址，暂不收取提币手续费。')}}</p> -->
            </div>
            <div class="right-q">
              <p>{{ $t("property.常问问题") }}</p>
              <div>{{ $t("property.提币限额调整") }}</div>
              <div class="mid">
                {{ $t("property.如何从账户提取加密货币？") }}
              </div>
              <span @click="handleMore">{{ $t("property.更多") }}</span>
            </div>
          </div>
        </div>

        <div class="content-box" v-else>
          <div class="content-right">
            <div class="right-bg">
              <div class="right-t">
                {{ $t("property.守护您的资产") }}<br />{{
                  $t("property.BSEX继续为您护航")
                }}
              </div>
              <div>
                <img src="@/assets/property-imgs/assets-banner.png" alt="" />
              </div>
            </div>
            <div class="right-q">
              <p>{{ $t("property.常问问题") }}</p>
              <div>{{ $t("property.提币限额调整") }}</div>
              <div class="mid">
                {{ $t("property.如何从账户提取加密货币？") }}
              </div>
              <span @click="handleMore">{{ $t("property.更多") }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 地址管理 -->
    <div v-if="pageIndex === 2">
      <InternalDressManage @goBack="goBack" />
    </div>
    <div class="table" v-if="pageIndex === 1">
      <AssetTable
        :columnData="columnData"
        :tableData="recordList"
        :title="$t('property.提币记录')"
        :show="true"
        :paginationShow="true"
        :total="total"
        :page.sync="pagingParams.pageNum"
        :symbolList="symbolList"
        @current-change="currentChange"
        @coinChange="coinChange"
        @onRecentDate="onRecentDate"
        @onChangeDate="onChangeDate"
        @onAllRecord="onAllRecord"
      />
    </div>
    <!-- 禁止交易弹窗 -->
    <el-dialog
      width="500px"
      :title="$t('property.温馨提示')"
      :visible.sync="tipShow"
    >
      <el-row class="tip-row">
        <el-col>
          <div>
            {{
              $t(
                "property.由于您的操作行为，风控已禁止您的交易；如需恢复交易请联系在线客服！"
              )
            }}
          </div>
        </el-col>
        <el-col>
          <div class="tip-btn" @click="handleService">
            {{ $t("property.联系客服") }}
          </div>
        </el-col>
      </el-row>
    </el-dialog>

    <!-- 提币新手指引 -->
    <div class="mask">
      <guideMask />
    </div>
  </div>
</template>

<script>
import AssetTable from "@/components/assetWallet/assetTable.vue";
import ChainForm from "./chainForm/chainForm.vue";
import InsideForm from "./insideForm/insideForm.vue";
import InternalDressManage from "./addressManage/index.vue";
import guideMask from "./guideMask/guideMask.vue";

import { simpleApi, recordQueryApi, configureApi } from "@/api/assetWallet";
export default {
  name: "WithdrawCoins",
  components: {
    ChainForm,
    InternalDressManage,
    AssetTable,
    InsideForm,
    guideMask,
  },
  data() {
    return {
      tabsLabel: false,
      tipShow: false,
      pageIndex: 1,
      pagingParams: {
        type: 2, //2提币
        status: null,
        coinId: null,
        pageNum: 1,
        pageSize: 10,
        startTime: new Date().getTime() - 7 * 24 * 3600 * 1000,
        endTime:
          new Date(new Date().toLocaleDateString()).getTime() +
          86400000 * 2 -
          1,
      },
      total: 0,
      recordList: [], //提币记录
      columnData: [
        {
          WithdrawCoinsTimeType: true,
          prop: "confirmTimeTsLong",
          label: this.$t("property.时间"),
          width: "",
        },
        {
          text: true,
          prop: "coinName",
          label: this.$t("property.币种"),
          width: "",
        },
        {
          isOwnDefined: true,
          text: true,
          label: this.$t("property.类型"),
          width: "",
        },
        {
          text: true,
          prop: "amount",
          label: this.$t("property.数量"),
          width: "",
        },
        {
          ownDefined: true,
          text: true,
          label: this.$t("property.状态"),
          width: "",
        },
        {
          text: true,
          prop: "remark",
          label: this.$t("property.备注"),
          width: "",
        },
        {
          isOperation: true,
          label: this.$t("property.操作"),
          width: "80",
        },
      ],
      coinList: [], //币种列表
      symbolList: [], //提币记录搜索列表
      minValue: "--",
    };
  },
  mounted() {
    this.getCoinList();
  },
  methods: {
    //提币币种列表
    getCoinList() {
      simpleApi({ isType: 4 }).then((res) => {
        this.coinList = res.data.data;
        let arr = JSON.parse(JSON.stringify(res.data.data));
        this.coinList = res.data.data;
        this.symbolList = arr || [];
        this.symbolList.unshift({
          id: null,
          coinName: this.$t("property.全部币种"),
        });
        this.record();
      });
    },
    //获取最新提币值
    getConfigure(params) {
      configureApi(params).then((res) => {
        this.minValue = res.data.data.withdrawMin;
      });
    },
    handleTab() {
      this.tabsLabel = !this.tabsLabel;
      if (this.tabsLabel) {
        this.$nextTick(() => {
          this.$refs.insideRef.getAddressList();
        });
        this.$nextTick(() => {
          this.$refs.insideRef.initData();
        });
      }
    },
    handleAddress() {
      this.pageIndex = 2;
    },
    //更多
    handleMore() {
      this.$router.push("/helpCenterPage");
    },
    //跳转地址管理页面
    pageChange() {
      this.pageIndex = 2;
    },
    //返回
    goBack() {
      this.pageIndex = 1;
    },
    //联系客服
    handleService() {
      //激起客服聊天窗
      // zE.activate()
      zE("messenger", "open");
      this.tipShow = false;
    },
    //交易提示
    tipChange(val) {
      this.tipShow = val;
    },
    //提币记录
    record() {
      recordQueryApi(this.pagingParams).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.total = res.data.data.total;
            this.recordList = res.data.data.records;
            for (var i = 0; i < this.recordList.length; i++) {
              this.$set(this.recordList[i], "operateType", "withdraw");
            }
          }
        }
      });
    },
    //翻页功能
    currentChange(val) {
      this.pagingParams.pageNum = val.page;
      this.record();
    },
    //选择币种筛选
    coinChange(val) {
      this.pagingParams.coinId = val;
      this.record();
    },
    //最近7天，30天筛选
    onRecentDate(val) {
      let t = new Date().getTime();
      if (val === 2) {
        //最近30天
        this.pagingParams.startTime = t - 30 * 24 * 3600 * 1000;
        this.pagingParams.endTime = t;
        this.record();
      } else {
        //最近7天
        this.pagingParams.startTime =
          new Date().getTime() - 7 * 24 * 3600 * 1000;
        this.pagingParams.endTime = new Date().getTime();
        this.record();
      }
    },
    //日期
    onChangeDate(data) {
      if (data && data.length > 0) {
        this.pagingParams.startTime = data[0].getTime();
        this.pagingParams.endTime = data[1].getTime();
      } else {
        this.pagingParams.startTime = "";
        this.pagingParams.endTime = "";
      }
      this.record();
    },
    //点击全部记录
    onAllRecord() {
      const params = {
        type: 2, //2提币
        pageNum: 1,
        pageSize: 10,
        startTime: new Date().getTime() - 7 * 24 * 3600 * 1000,
        endTime:
          new Date(new Date().toLocaleDateString()).getTime() +
          86400000 * 2 -
          1,
      };
      recordQueryApi(params).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.total = res.data.data.total;
            this.recordList = res.data.data.records;
            for (var i = 0; i < this.recordList.length; i++) {
              this.$set(this.recordList[i], "operateType", "withdraw");
            }
          }
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.page {
  background-color: #fff;
  .header {
    background: $bgColorA;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
    .title {
      margin-left: 70px;
      cursor: pointer;
      i {
        font-size: 24px;
        padding-right: 5px;
      }
      span {
        font-size: $fontE;
      }
    }
    .header-mid {
    }
    .header-right {
      display: flex;
      margin-right: 30px;
      .right-btn {
        min-width: 100px;
        padding: 0 10px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: #ffffff;
        border-radius: 4px;
        border: 1px solid #90ff00;
        font-size: 18px;
        margin-left: 30px;
        cursor: pointer;
        color: $colorB;
      }
    }
  }
  .content {
    padding: 0 70px;
    display: flex;
    justify-content: space-between;
    .left {
      .nav {
        margin-top: 28px;
        display: flex;
        align-items: center;
        font-size: 22px;
        img {
          width: 21px;
          height: 16px;
          display: inline-block;
          margin-right: 6px;
        }
      }
    }
    .right {
      .content-box {
        display: flex;
        justify-content: space-between;

        .content-right {
          margin: 150px 70px 0px 0px;
          .right-bg {
            min-width: 620px;
            min-height: 140px;
            border-radius: 12px;
            background: #fcfcfc;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0px 30px;
            .right-t {
              font-size: 20px;
            }
            img {
              width: 97px;
              height: 104px;
              display: block;
            }
          }
          .right-text {
            margin-top: 40px;
            width: 620px;
            padding-bottom: 20px;
            background: #f5f7fa;
            border-radius: 10px;
            font-size: $fontG;
            .text-title {
              font-size: $fontF;
              font-weight: 500;
              color: #333333;
              line-height: 22px;
            }
            p {
              font-size: $fontG;
              font-weight: 400;
              color: #57677d;
              line-height: 24px;
            }
            span {
              color: #f75f52;
            }
          }
          .right-q {
            margin-top: 40px;
            font-size: 14px;
            p {
              font-size: 16px;
              margin-bottom: 20px;
            }
            .mid {
              margin: 5px 0;
            }
            span {
              color: $colorB;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
  .tip-row {
    width: 100%;
    height: 120px;
    padding: 0 20px;
    font-size: 14px;
    .tip-btn {
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #90ff00;
      border-radius: 6px;
      text-align: center;
      font-size: 18px;
      font-weight: 500;
      color: #fff;
      cursor: pointer;
      margin-top: 40px;
    }
  }
  .pad {
    padding: 20px 20px 0 20px;
  }
  .table {
    padding: 0 70px;
  }
}
::v-deep .el-dialog {
  border-radius: 16px;
}
</style>
