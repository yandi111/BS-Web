<template>
  <div class="deposit">
    <div class="deposit-title">
      <i class="el-icon-arrow-left" @click="$router.go(-1)"></i>
      <span @click="$router.go(-1)">{{ $t("property.充币") }}</span>
    </div>
    <div class="content">
      <div class="container">
        <el-form
          label-position="top"
          :model="rechargeParams"
          :rules="rules"
          ref="ruleForm"
        >
          <el-form-item :label="$t('property.充值币种')" class="coin-name">
            <div class="coin-select" @click.stop>
              <coin-select
                ref="selectRef"
                v-if="coinList.length"
                :list="coinList"
                @selectedCoin="selectedCoin"
              ></coin-select>
            </div>
          </el-form-item>
          <el-form-item :label="$t('property.网络选择')" class="item">
            <el-select
              v-model="networkVal"
              :placeholder="$t('property.网络选择')"
              ref="choose"
              @focus="handleDialog"
              @change="networkChange"
            >
            </el-select>
          </el-form-item>
          <el-form-item
            :label="$t('property.充值方式')"
            v-if="rechargeMethodShow"
          >
            <div class="recharge-method" v-if="isRechargeMethod == 1">
              {{ $t("property.人工审核") }}
            </div>
            <div class="recharge-method" v-else>
              {{ $t("property.链上充值") }}
            </div>
          </el-form-item>
          <el-form-item :label="$t('property.充币地址')" v-if="coinAddressShow">
            <div class="deposit-address">
              <div id="copy">{{ coinAddress }}</div>
              <div>
                <img
                  class="copy"
                  src="@/assets/images/copy.png"
                  @click.stop="copy(coinAddress)"
                  alt=""
                />
                <!-- 生成二维码 -->
                <span @click.stop="handleQr(coinAddress)">
                  <span class="qr-code" ref="qrCodeUrl"></span>
                </span>
              </div>
            </div>
          </el-form-item>
          <el-form-item
            class="d-inp"
            :label="$t('property.交易Hash')"
            prop="txId"
            v-if="rechargeMethodShow && isRechargeMethod == 1"
          >
            <el-input
              v-model="rechargeParams.txId"
              :placeholder="$t('property.请输入交易Hash')"
            ></el-input>
          </el-form-item>
          <el-form-item
            class="d-inp"
            :label="$t('property.币种数量')"
            prop="amount"
            v-if="rechargeMethodShow && isRechargeMethod == 1"
          >
            <el-input
              v-model="rechargeParams.amount"
              :placeholder="$t('property.请输入数量')"
            ></el-input>
          </el-form-item>
          <el-form-item
            :label="$t('property.上传交易证明')"
            prop="fileUrl"
            v-if="rechargeMethodShow && isRechargeMethod == 1"
          >
            <deposit-upload @dUpload="dUpload"></deposit-upload>
          </el-form-item>
          <el-form-item v-if="isRechargeMethod == 1 && isSuccess">
            <div class="d-success">
              <div class="d-img">
                <img src="@/assets/property-imgs/d-success.png" alt="" />
              </div>
              <div class="d-box">
                <div class="d-title">{{ $t("property.提交成功") }}</div>
                <div>{{ $t("property.如有疑问请及时联系客服") }}</div>
              </div>
            </div>
          </el-form-item>
          <el-form-item v-if="rechargeMethodShow && isRechargeMethod == 1">
            <div class="d-remark">
              {{ $t("property.上传凭证中需要包含交易Hash及交易记录") }}
            </div>
          </el-form-item>
          <el-form-item v-if="rechargeMethodShow && isRechargeMethod == 1">
            <div class="d-btn" v-if="isSuccess">
              <div class="d-btn-item" @click="onChat">
                {{ $t("property.联系客服") }}
              </div>
              <div class="d-btn-item d-btn-bg" @click="onOk">
                {{ $t("property.好的") }}
              </div>
            </div>
            <div class="d-submit" v-else @click="onRecharge">
              {{ $t("property.提交") }}
            </div>
          </el-form-item>
        </el-form>
        <div class="hint" v-if="rechargeMethodShow && isRechargeMethod == 0">
          <div>{{ $t("property.温馨提示") }}</div>
          <p>
            {{ $t("property.- 请勿向上述地址充值", [coinName]) }}
          </p>
          <p style="color: #f75f52">
            <span>{{ $t("property.- 最小充值金额") }}</span
            ><span>{{ minValue }}</span> <span>{{ coinName }}，</span
            ><span
              >{{
                $t("property.小于最小金额的充值将不会上账且无法退回")
              }}。</span
            >
          </p>
          <p>
            {{ $t("property.充值将在1个网络确认后到账。") }}
          </p>
          <p>
            {{
              $t(
                "property.- 请务必确认电脑及浏览器安全，防止信息被篡改或泄露。"
              )
            }}
          </p>
        </div>
        <div class="hint" v-if="rechargeMethodShow && isRechargeMethod == 1">
          <div>{{ $t("property.温馨提示") }}</div>
          <p>
            {{ $t("property.- 请勿向上述地址充值", [coinName]) }}
          </p>
          <p style="color: #f75f52">
            <span>{{ $t("property.- 最小充值金额") }}</span
            ><span>{{ minValue }}</span> <span>{{ coinName }}，</span
            ><span
              >{{
                $t("property.小于最小金额的充值将不会上账且无法退回")
              }}。</span
            >
          </p>
          <p>
            {{
              $t(
                "property.待BSEX工作人员审核通过后到账。若有疑问请及时联系官方客服。"
              )
            }}
          </p>
          <p>
            {{
              $t(
                "property.- 请务必确认电脑及浏览器安全，防止信息被篡改或泄露。"
              )
            }}
          </p>
        </div>
      </div>
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
          <div>{{ $t("property.如何向我的账户充值数字货币？") }}</div>
          <div class="mid">{{ $t("property.充值未到帐？") }}</div>
          <span @click="handleMore">{{ $t("property.更多") }}</span>
        </div>
      </div>
    </div>

    <div class="record">
      <AssetTable
        :columnData="columnData"
        :tableData="recordList"
        :title="$t('property.充币记录')"
        :paginationShow="true"
        @current-change="currentChange"
        :total="total"
        :page.sync="currentPagePrams.pageNum"
        :symbolList="symbolList"
        @coinChange="coinChange"
        @onRecentDate="onRecentDate"
        @onChangeDate="onChangeDate"
        @resubmit="resubmit"
      />
    </div>
    <network-dialog
      ref="networkRef"
      :is-show.sync="dialogShow"
      @networkChange="networkChange"
      @networkSure="networkSure"
      :networkData="networkData"
    ></network-dialog>
    <!-- 二维码弹窗 -->
    <el-dialog width="500px" @close="onClose" :visible.sync="qrCodeVisible">
      <div class="bigQrCode" ref="bigQrCodeUrl"></div>
    </el-dialog>
    <div class="mask">
      <guideMask />
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
import networkDialog from "./components/networkDialog.vue";
import AssetTable from "@/components/assetWallet/assetTable.vue";
import DepositSelect from "./components/deposit-Select.vue";
import CoinSelect from "../components/coinSelect.vue";
import guideMask from "./guideMask/guideMask.vue";
import depositUpload from "./components/deposit-upload.vue";
import {
  simpleApi,
  chainListApi,
  depositQueryApi,
  recordQueryApi,
  configureApi,
  addArtificialApi,
} from "@/api/assetWallet";
export default {
  name: "Deposit",
  components: {
    networkDialog,
    AssetTable,
    DepositSelect,
    CoinSelect,
    guideMask,
    depositUpload,
  },
  data() {
    return {
      qrCodeVisible: false, //二维码
      dialogShow: false,
      btypeImg: "",
      value: "",
      input2: "",
      networkVal: "",
      networkData: [], //查询网络
      columnData: [
        {
          confirmTimeType: true,
          // prop: "confirmTimeTsLong",
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
          text: true,
          prop: "amount",
          label: this.$t("property.数量"),
          width: "",
        },
        {
          text: true,
          prop: "toAddress",
          label: this.$t("property.地址"),
          width: "",
        },
        {
          ownDefined: true,
          text: true,
          // prop: "status",
          label: this.$t("property.状态"),
          width: "",
        },
        {
          isDepositType: true,
          // prop: "depositType",
          label: this.$t("property.充值方式"),
          width: "",
        },
        {
          isOperation: true,
          label: this.$t("property.操作"),
          width: "100",
        },
      ],
      //接口字段
      coinId: null, //币种id
      chainName: "", //链名称
      userId: null, //用户id
      recordList: [], //充币记录
      coinAddress: "", //充币地址
      coinAddressShow: false,
      coinList: [],
      symbolList: [], //充币记录的币种
      iconUrl: "",
      coinName: "",
      //分页
      currentPagePrams: {
        type: 1,
        coinId: "",
        pageNum: 0,
        pageSize: 10, // 每页大小
        startTime: new Date().getTime() - 7 * 24 * 3600 * 1000,
        endTime:
          new Date(new Date().toLocaleDateString()).getTime() +
          86400000 * 2 -
          1,
      },
      total: 0,
      minValue: "--",
      //充币人工审核功能
      rechargeMethodShow: false,
      isRechargeMethod: null,
      isSuccess: false,
      rechargeParams: {
        chainName: "",
        txId: "",
        amount: "",
        fileUrl: "",
      },
      rules: {
        txId: [{ required: true, message: "请输入交易Hash", trigger: "blur" }],
        amount: [{ required: true, message: "请输入数量", trigger: "blur" }],
        fileUrl: [
          { required: true, message: "请上传交易证明", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    document.addEventListener("click", () => {
      this.$refs.selectRef.showFn();
    });
    this.getCoinList();
    this.getRecordQuery(this.currentPagePrams);
  },
  methods: {
    //获取币种列表
    getCoinList() {
      simpleApi({
        isType: 3, //3：查充值
      }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.coinList = res.data.data || [];
            const list = JSON.parse(JSON.stringify(res.data.data)) || [];
            list.unshift({
              id: "",
              coinName: this.$t("property.全部币种"),
            });
            this.symbolList = list;
            this.iconUrl = this.coinList[0].iconUrl;
            this.coinName = this.coinList[0].coinName;
            this.coinId = this.coinList[0].coinId;
          }
        }
      });
    },
    //获取最新提币值
    getConfigure(params) {
      configureApi(params).then((res) => {
        this.minValue = res.data.data.depositMin;
      });
    },
    detailClick() {},
    handleDialog() {
      this.$refs.choose.blur();
      this.dialogShow = true;
      //网络查询
      chainListApi({ coinId: this.coinId }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.networkData = res.data.data;
          }
        }
      });
    },
    networkChange(val) {
      // this.networkVal = val.chainName;
    },
    networkSure(val) {
      if (!val) return; //选中数据才能发请求
      this.networkVal = val.remark;
      this.chainName = val.chainName;
      this.rechargeParams.chainName = val.chainName;
      this.isRechargeMethod = val.depositType; //链上充值 1：人工审核
      // this.isRechargeMethod = 1; //测试
      this.rechargeMethodShow = true;
      this.coinAddressShow = true;
      this.getDepositQuery(this.coinId, this.chainName);
      //充币最小额度
      const params = {
        coinName: this.coinName,
        chainName: this.chainName,
      };
      this.getConfigure(params);
    },
    // 充币地址查询
    getDepositQuery(id, name) {
      depositQueryApi({
        coinId: id,
        chainName: name,
      }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.coinAddress = res.data.data.coinAddress;
            //二维码
            this.$nextTick(() => {
              this.createQrCode(this.coinAddress);
            });
            this.$refs.qrCodeUrl.innerHTML = "";
          }
        }
      });
    },
    //充币记录查询
    getRecordQuery() {
      recordQueryApi(this.currentPagePrams).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.recordList = res.data.data.records;

            this.total = res.data.data.total;
            for (var i = 0; i < this.recordList.length; i++) {
              this.$set(this.recordList[i], "operateType", "recharge");
            }
          }
        }
      });
    },
    //地址复制
    copy(val) {
      this.$copyText(val).then(() => {
        this.$message.success(this.$t("userInfo.复制成功"));
      });
    },
    //选中法币
    selectedCoin(item) {
      this.networkVal = "";
      this.coinAddressShow = false;
      this.coinId = item.coinId;
      this.coinName = item.coinName;
    },

    //重新提交人工审核
    resubmit(row) {
      this.coinId = row.coinId;
      this.coinName = row.coinName;
      this.coinId = row.coinId;
      this.$refs.selectRef.getCion(row.coinId);
      this.networkVal = row.chainName;
      this.rechargeParams.chainName = row.chainName;
      this.isRechargeMethod = row.depositType;
      this.coinAddress = row.toAddress;
      this.rechargeMethodShow = true;
      this.coinAddressShow = true;
      this.getDepositQuery(row.coinId, row.chainName);
      let dom = document.querySelector(".wrapper-view");
      if (dom) {
        dom.scroll({
          top: 0,
          behavior: "smooth",
        });
      }
    },
    //翻页功能
    currentChange(val) {
      this.currentPagePrams.pageNum = val.page;
      //充币记录
      this.getRecordQuery();
    },
    //充币记录币种筛选
    coinChange(val) {
      if (!val) {
        // console.log(val);
        this.currentPagePrams.coinId = "";
        this.getRecordQuery();
      } else {
        this.currentPagePrams.coinId = val;
        this.getRecordQuery();
        // console.log(val);
      }
    },
    onRecentDate(val) {
      let t = new Date().getTime();
      if (val === 2) {
        //最近30天 (获取30天前的时间戳)
        this.currentPagePrams.startTime = t - 30 * 24 * 3600 * 1000;
        this.currentPagePrams.endTime = t;

        this.getRecordQuery();
      } else {
        //最近7天
        this.currentPagePrams.startTime = t - 7 * 24 * 3600 * 1000;
        this.currentPagePrams.endTime = t;
        this.getRecordQuery();
      }
    },
    //日期
    onChangeDate(data) {
      if (data && data.length > 0) {
        this.currentPagePrams.startTime = data[0].getTime();
        this.currentPagePrams.endTime = data[1].getTime();
      } else {
        this.currentPagePrams.startTime = "";
        this.currentPagePrams.endTime = "";
      }
      this.getRecordQuery();
    },
    //清空上一次的二维码内容
    onClose() {
      this.$refs.bigQrCodeUrl.innerHTML = "";
    },
    //生成二维码
    handleQr(url) {
      this.qrCodeVisible = true;
      this.$nextTick(() => {
        this.createBigQrCode(url);
      });
    },
    //生成小二维码
    createQrCode(url, w, h) {
      this.qrcode = new QRCode(this.$refs.qrCodeUrl, {
        text: url,
        width: 24,
        height: 24,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: 3,
      });
    },
    //生成大二维码
    createBigQrCode(url) {
      this.qrcode2 = new QRCode(this.$refs.bigQrCodeUrl, {
        text: url,
        width: 350,
        height: 350,
        colorDark: "#000000",
        colorLight: "#ffffff",
        correctLevel: 3,
      });
    },
    //更多
    handleMore() {
      this.$router.push("/helpCenterPage");
    },
    //人工审核提交
    onRecharge() {
      this.$refs["ruleForm"].validate(async (valid) => {
        if (valid) {
          const params = {
            coinName: this.coinName,
            coinId: this.coinId,
          };
          let res = await addArtificialApi(
            Object.assign({}, params, this.rechargeParams)
          );
          this.isSuccess = true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    onOk() {
      this.initParams();
    },
    //联系客服
    onChat() {
      zE("messenger", "open");
    },
    //上传文件
    dUpload(file) {
      if (file) {
        this.rechargeParams.fileUrl = file.data.url;
      } else {
        //上传的参数置空
        this.rechargeParams.fileUrl = "";
      }
    },
    //提交参数初始化
    initParams() {
      this.rechargeParams = {
        chainName: "",
        txId: "",
        amount: "",
        fileUrl: "",
      };
      this.networkVal = "";
      this.chainName = "";
      this.rechargeMethodShow = false;
      this.coinAddressShow = false;
      this.isSuccess = false;
      this.$refs.networkRef.activeKey = 0;
      this.getRecordQuery();
    },
  },
};
</script>

<style lang="scss" scoped>
.deposit {
  display: flex;
  flex-direction: column;
  background: #ffffff;
  color: #333333;
  .content {
    display: flex;
    justify-content: space-between;
    .container {
      margin-left: 70px;
      margin-top: 20px;
      ::v-deep .el-form-item__label {
        font-size: 16px;
        color: #333333;
        font-weight: 600;
      }
      .item {
        ::v-deep .el-input__inner {
          width: 500px;
          height: 60px;
          box-shadow: 0px 2px 24px 0px rgba(0, 0, 28, 0.04);
          border-radius: 10px;
          border: 1px solid #f5f7fa;
        }
        ::v-deep .el-select .el-input .el-select__caret {
          color: #333333;
          font-size: 15px;
          margin-right: 9px;
        }
      }
      .deposit-address {
        width: 500px;
        display: flex;
        justify-content: space-between;
        .copy {
          width: 24px;
          height: 24px;
          display: inline-block;
          cursor: pointer;
        }
        .qr-code {
          width: 24px;
          height: 24px;
          display: inline-block;
          margin-left: 20px;
          cursor: pointer;
        }
      }
      .recharge-method {
        height: 60px;
        line-height: 60px;
        background: #ffffff;
        box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.06);
        border-radius: 12px;
        border: 1px solid #f4f5f7;
        padding-left: 15px;
        font-size: 16px;
        color: #333;
      }
    }
    .content-right {
      padding: 0 70px;
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
      .right-q {
        margin-top: 59px;
        font-size: 14px;
        p {
          font-size: 16px;
          margin-bottom: 30px;
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
  .deposit-title {
    background-color: $bgColorA;
    padding: 20px 0 20px 70px;
    .el-icon-arrow-left {
      padding-right: 5px;
      font-size: 24px;
      cursor: pointer;
    }
    span {
      font-size: $fontE;
      cursor: pointer;
    }
  }
  .hint {
    width: 500px;
    line-height: 21px;
    background: #fcfcfc;
    border-radius: 12px;
    padding: 14px 20px 10px 20px;
    margin-top: 30px;
    p {
      font-size: 14px;
    }
  }
  ::v-deep .el-dialog {
    border-radius: 12px;
  }
  .bigQrCode {
    margin-left: 75px;
    margin-top: 30px;
    margin-bottom: 30px;
  }

  .coin-select {
    width: 500px;
    height: 60px;
    position: relative;
  }
  .record {
    padding: 40px 0px 0px 70px;
  }
  .d-inp {
    ::v-deep .el-input__inner {
      height: 60px;
      line-height: 60px;
      background: #ffffff;
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.06);
      border-radius: 12px;
      border: 1px solid #f4f5f7;
    }
  }
  .d-success {
    height: 120px;

    background: #fcfcfc;
    border-radius: 6px;
    border: 1px dashed #90ff00;
    display: flex;
    align-items: center;
    .d-img {
      width: 52px;
      height: 62px;
      line-height: 62px;
      margin: 0 20px 0 40px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .d-box {
      color: #96a2b2;
      font-size: 14px;
      line-height: 30px;
      .d-title {
        font-size: 18px;
        color: #333;
      }
    }
  }
  .d-submit {
    height: 45px;
    line-height: 45px;
    text-align: center;
    background: #90ff00;
    border-radius: 6px;
    font-size: 18px;
    color: #fff;
    cursor: pointer;
  }
  .d-btn {
    display: flex;
    justify-content: space-between;
    .d-btn-item {
      width: 47%;
      height: 45px;
      line-height: 45px;
      text-align: center;
      background: #f4f5f7;
      border-radius: 6px;
      font-size: 18px;
      cursor: pointer;
    }
    .d-btn-bg {
      color: #fff;
      background: #90ff00;
    }
  }
  .d-remark {
    color: #f75f52;
  }
}
</style>
