<template>
  <div class="flash">
    <div class="title">
      <div>
        <i class="el-icon-arrow-left" @click="onCapitalAccount"></i>
        <span @click="onCapitalAccount">{{$t('property.闪兑')}}</span>
      </div>
    </div>
    <div class="container">
      <el-form label-position="top">
        <el-form-item>
          <div class="flash-user">
            <div class="left">{{$t('property.账户')}}</div>
            <div class="right">
              <div class="right-item" v-for="item in checkArr" :key="item.id">
                <div class="right-box" @click="handleCheck(item)">
                  <div :class="item.flag ? 'right-active' : ''"></div>
                </div>
                <div class="right-text">{{ item.name }}</div>
              </div>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="item-consume" @click.stop>
            <div class="pay-title">
              <div class="consume">{{$t('property.消耗')}}</div>
              <div class="pay-all" @click.stop="handleAll">{{$t('property.全部')}}</div>
            </div>
            <div class="pay-box">
              <coin-select
                v-if="payArr.length"
                source="top"
                ref="selectRef1"
                :isTop="true"
                :list="payArr"
                :coin-name="topCoinName"
                :icon-url="topIconUrl"
                :decimalPlaces="topDecimalPlaces"
                @handleChoose="handleChoose"
                @onSelect="onSelect"
                :value.sync="payValue"
                @onChange="(value) => onChange(value, 'pay')"
              >
              </coin-select>
            </div>
          </div>
          <div class="pay-amount">{{$t('property.可用')}}：{{ amount }}</div>
        </el-form-item>
        <el-form-item>
          <div class="convert" @click="onConvert">
            <div>
              <img src="@/assets/images/fundsTransfer-icon.png" alt="" />
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="item-get" @click.stop>
            <div class="consume">{{$t('property.获得')}}</div>
            <div class="get-box">
              <coin-select
                v-if="getArr.length"
                source="bottom"
                ref="selectRef2"
                :list="getArr"
                :coin-name="bottomCoinName"
                :icon-url="bottomIconUrl"
                :decimalPlaces="bottomDecimalPlaces"
                @handleChoose="handleChoose"
                @onSelect="onSelect"
                :value.sync="getValue"
                @onChange="(value) => onChange(value, 'get')"
              ></coin-select>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="exchange" @click="onFlash">{{$t('property.兑换')}}</div>
        </el-form-item>
      </el-form>
    </div>
    <div class="table">
      <AssetTable
        :columnData="columnData"
        :tableData="recordList"
        :title="$t('property.闪兑记录')"
        :show="false"
        :paginationShow="true"
        @current-change="currentChange"
        :total="total"
        :page.sync="flashRecordParams.pageNum"
        @coinChange="coinChange"
        @onRecentDate="onRecentDate"
        @onChangeDate="onChangeDate"
        :symbolList="coinList"
      />
    </div>
    <!-- 兑换确认弹框 -->
    <common-modal
      :title="$t('property.确认订单')"
      width="600px"
      :show="isShow"
      :noFooter="false"
      :showClose="true"
      :FooterIsCenter="true"
      @cancel="isShow = false"
    >
      <template #dia_content>
        <div class="dialog">
          <div class="from-to">
            <div class="from-item">
              <div class="img-box">
                <img :src="topIconUrl" alt="" />
              </div>
              <div style="color: #999" class="mid">{{$t('property.从')}}</div>
              <div>
                <span>{{ payValue }}</span>
                <span>{{ topCoinName }}</span>
              </div>
            </div>
            <div class="icon">
              <i class="el-icon-right"></i>
            </div>
            <div class="from-item">
              <div class="img-box">
                <img :src="bottomIconUrl" alt="" />
              </div>
              <div style="color: #999" class="mid">{{$t('property.到')}}</div>
              <div>
                <span>{{ getValue }}</span>
                <span>{{ bottomCoinName }}</span>
              </div>
            </div>
          </div>
          <div class="card">
            <div class="left">
              <p>{{$t('property.交易手续费')}}</p>
              <p>{{$t('property.支付渠道')}}</p>
              <p>{{$t('property.类型')}}</p>
              <p>{{$t('property.汇率')}}</p>
            </div>
            <div class="right">
              <p style="color: #90ff00">{{commission}}{{bottomCoinName}}</p>
              <!-- <p v-text="fromAccountType === 1 ? '现货账户' : '资金账户'"></p> -->
              <p>{{fromType===1? $t('property.现货账户'): $t('property.资金账户')}}</p>
              <p>{{$t('property.市价')}}</p>
              <p>
                1 <span>{{ topCoinName }}</span> ≈
                <span>{{ exchangeRate }}</span>
                <span>{{ bottomCoinName }}</span>
              </p>
            </div>
          </div>
          <div class="no-amount" v-if="Number(payValue - amount) > 0">
            {{$t('property.余额不足！请充值')}}
          </div>
        </div>
      </template>
      <template #dia_footer>
        <el-button class="modal-btn" @click="handleCancel">{{$t('property.取消')}}</el-button>
        <el-button
          v-if="Number(payValue - amount) > 0"
          type="primary"
          class="modal-btn"
          @click="handleRecharge"
          >{{$t('property.充值')}}</el-button
        >
        <el-button v-else type="primary" class="modal-btn" @click="handleSure"
          >{{$t('property.确定')}}</el-button
        >
      </template>
    </common-modal>
    <success-modal
      :is-show.sync="showSuccess"
      :text="$t('property.闪兑成功')"
      :btnText="$t('property.确定')"
      @next="handleSuccess"
      v-if="showSuccess"
    ></success-modal>
  </div>
</template>

<script>
import AssetTable from "@/components/assetWallet/assetTable.vue";
import CoinSelect from "../components/coinSelect.vue";
import SuccessModal from "@/components/successModal.vue";
import {
  simpleApi,
  rateQueryApi,
  transferBalanceApi,
  flashExchangeApi,
  flashRecordApi,
  flashConfigApi,
  getFee
} from "@/api/assetWallet";
export default {
  name: "Flash",
  props: {
    fromAccountType: {
      type: Number,
    },
    coinName: {
      type: String,
    },
    coinId: {
      type: Number,
    },
    iconUrl: {
      type: String,
    },
  },
  components: {
    AssetTable,
    SuccessModal,
    CoinSelect,
  },
  data() {
    return {
      // 闪兑功能测试开始-------------
      topCoinName: "",
      topIconUrl: "",
      topCoinId: null,
      bottomCoinName: "",
      bottomIconUrl: "",
      bottomCoinId: null,
      allArr: [],
      originArr: [],
      topCoinName2: "",
      topIconUrl2: "",
      topCoinId2: null,
      bottomCoinName2: "",
      bottomIconUrl2: "",
      bottomCoinId2: null,
      payValue: "", //消耗数量输入
      getValue: "", //获得数量输入
      amount: "--", //可用余额（包含现货可用余额、资金可用余额）
      //闪兑默认市价类型type1，限价类型type2
      //  闪兑功能测试结束--------------------------
      changeArr: [
        // 消耗
        {
          value: "",
          coinId: null,
          coinName: "",
          iconUrl: "",
          decimalPlaces: null,
        },
        // 获得
        {
          value: "",
          coinId: null,
          coinName: "",
          iconUrl: "",
          decimalPlaces: null,
        },
      ],
      exchangeRate: null, //汇率
      // 消耗选中币种
      coinNamePay: null,
      // 获得选中币种
      coinNameGet: null,
      isShow: false,
      showSuccess: false,
      recordList: [],
      columnData: [
        {
          isTimeType: true,
          label: this.$t('property.时间'),
          width: "150",
        },
        {
          text: true,
          prop: "fromCoinName",
          label: this.$t('property.消耗币种'),
          width: "",
        },
        {
          text: true,
          prop: "toCoinName",
          label: this.$t('property.获得币种'),
          width: "",
        },
        {
          isFlashType: true,
          label: this.$t('property.类型'),
          width: "",
        },
        {
          isAccountType: true,
          label: this.$t('property.账户类型'),
          width: "",
        },
        {
          isFromAmount: true,
          label: this.$t('property.消耗数量'),
          width: "",
        },
        {
          text: true,
          prop: "rate",
          label: this.$t('property.汇率'),
          width: "",
        },
        {
          isSuccess: true,
          label: this.$t('property.状态'),
          width: "150",
        },
      ],
      coinList: [],
      //闪兑记录参数
      flashRecordParams: {
        fromCoinId: "",
        toCoinId: "",
        startTime: new Date().getTime() - 7 * 24 * 3600 * 1000,
        endTime:
          new Date(new Date().toLocaleDateString()).getTime() +
          86400000 * 2 -
          1,
        pageNum: 1,
        pageSize: 10,
      },
      total: 0,
      checkArr: [
        {
          id: 2,
          name: this.$t('property.资金'),
          flag: false,
        },
        {
          id: 1,
          name: this.$t('userInfo.现货'),
          flag: false,
        },
      ],
      fromType: null, //需要兑换的类型
      commission:"",//手续费
      // 闪兑精度
      topDecimalPlaces: null,
      bottomDecimalPlaces:null,
      topDecimalPlaces2: null,
      bottomDecimalPlaces2:null,
    };
  },
  computed: {
    getArr() {
      const arr = this.allArr.filter((item) => {
        if (item.coinName === "USDT" || item.coinName === "BTC") {
          return false;
        }
        if (item.coinName === this.topCoinName) {
          return false;
        }
        return true;
      });
      return [...this.originArr, ...arr];
    },
    payArr: {
      get() {
        const arr = this.allArr.filter((item) => {
          if (item.coinName === "USDT" || item.coinName === "BTC") {
            return false;
          }
          if (item.coinName === this.bottomCoinName) {
            return false;
          }
          return true;
        });
        return [...this.originArr, ...arr];
      },
      set() {},
    },
  },
  created() {
    this.getCoinList();
  },
  methods: {
    //闪兑功能测试开始--------------
    handleChoose({ source, coinName, iconUrl, coinId,  decimalPlaces}) {
      if (source === "top") {
        this.topCoinName = coinName;
        this.topIconUrl = iconUrl;
        this.topCoinId = coinId;
        this.topDecimalPlaces = decimalPlaces
        if (coinName === "USDT") {
          this.bottomCoinName = this.bottomCoinName2;
          this.bottomIconUrl = this.bottomIconUrl2;
          this.bottomCoinId = this.bottomCoinId2;
          this.bottomDecimalPlaces = this.bottomDecimalPlaces2
        } else if (coinName === "BTC") {
          this.bottomCoinName = this.topCoinName2;
          this.bottomIconUrl = this.topIconUrl2;
          this.bottomCoinId = this.topCoinId2;
          this.bottomDecimalPlaces = this.topDecimalPlaces2
        }
        //查汇率
        this.getRateQueryApi();
        //查余额
        this.getTransferBalance();
      } else {
        this.bottomCoinName = coinName;
        this.bottomIconUrl = iconUrl;
        this.bottomCoinId = coinId;
        this.bottomDecimalPlaces = decimalPlaces
        if (coinName === "USDT") {
          this.topCoinName = this.bottomCoinName2;
          this.topIconUrl = this.bottomIconUrl2;
          this.topCoinId = this.bottomCoinId2;
          this.topDecimalPlaces = this.bottomDecimalPlaces2
        } else if (coinName === "BTC") {
          this.topCoinName = this.topCoinName2;
          this.topIconUrl = this.topIconUrl2;
          this.topCoinId = this.topCoinId2;
          this.topDecimalPlaces = this.topDecimalPlaces2
        }
        //查汇率
        this.getRateQueryApi();
        //查余额
        this.getTransferBalance();
      }
    },
    onConvert() {
      const coinName = this.topCoinName;
      const iconUrl = this.topIconUrl;
      const iconId = this.topCoinId;
      const decimalPlaces = this.topDecimalPlaces
      this.topCoinName = this.bottomCoinName;
      this.topIconUrl = this.bottomIconUrl;
      this.topCoinId = this.bottomCoinId;
      this.topDecimalPlaces = this.bottomDecimalPlaces
      this.bottomCoinName = coinName;
      this.bottomIconUrl = iconUrl;
      this.bottomCoinId = iconId;
      this.bottomDecimalPlaces = decimalPlaces
      this.payArr = JSON.parse(JSON.stringify(this.getArr));
      [this.payValue, this.getValue] = [this.getValue, this.payValue]; //数据互换
      this.onChange();
      //查汇率
      this.getRateQueryApi();
      //查余额
      this.getTransferBalance();
    },

    // handleClose() {
    //   this.$refs.selectRef1.isShow();
    //   this.$refs.selectRef2.isShow();
    // },
    onSelect(val) {
      if (val === "top") {
        this.$refs.selectRef2.isShow();
      } else {
        this.$refs.selectRef1.isShow();
      }
    },
    onChange(val, type) {
      //获取输入闪兑的数量
      if (type === "get") {
        if (this.getValue === "") {
          this.payValue = "";
        } else {
          this.payValue = (this.getValue / this.exchangeRate).toFixed(this.topDecimalPlaces);
        }
      } else {
        if (!this.payValue) {
          this.getValue = "";
        } else {
          this.getValue = (this.payValue * this.exchangeRate).toFixed(this.bottomDecimalPlaces);
        }
      }
    },
    //闪兑功能测试结束----------------

    onCapitalAccount() {
      this.$emit("changeIndex");
    },

    //兑换
    onFlash() {
      //兑换校验
      if (!this.payValue) {
        this.$message.warning("请输入消耗数量");
        this.payValue = "";
        this.$refs.selectRef1.getFocus();
        return;
      }
      if (this.payValue === "0") {
        this.$message.warning("消耗数量不能为0，请重新输入");
        this.payValue = "";
        this.getValue = "";
        this.$refs.selectRef1.getFocus();
        return;
      }

      //查余额
      this.isShow = true;
      this.getTransferBalance();
      this.getFlashConfig();
    },
    //闪兑接口
    getflashExchangeApi() {
      let params = {
        fromCoinId: this.topCoinId,
        fromCoinName: this.topCoinName,
        fromAmount: this.payValue,
        toCoinId: this.bottomCoinId,
        toCoinName: this.bottomCoinName,
        accountType: this.fromType,
        type: 1,
      };
      flashExchangeApi(params).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.isShow = false;
            this.showSuccess = true;
          }
        }
      });
    },
    //闪兑记录
    getflashRecordList() {
      flashRecordApi(this.flashRecordParams).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.recordList = res.data.data.records;
            this.total = res.data.data.total;
          }
        }
      });
    },
    //闪兑配置
    getFlashConfig(){
      // flashConfigApi({fromCoinId:this.topCoinId}).then(res=>{
      //   this.commission = res.data.data.fee
      // })
       getFee({
        fromCoinName: this.topCoinName, //兑入币种名称
        toCoinName: this.bottomCoinName, //兑出币种名称
        fromAmount: this.payValue, //兑入数量
       }).then(res=>{
        this.commission = res.data.data.fee
      })
    },
    //翻页功能
    currentChange(val) {
      this.flashRecordParams.pageNum = val.page;
      //闪兑记录
      this.getflashRecordList();
    },
    //根据币种查询
    coinChange(val) {
      //根据消耗币种来查询
      this.flashRecordParams.fromCoinId = val;
      this.getflashRecordList();
    },
    //最近7天，30天
    onRecentDate(val) {
      let t = new Date().getTime();
      if (val === 2) {
        //最近30天
        this.flashRecordParams.startTime = t - 30 * 24 * 3600 * 1000;
        this.flashRecordParams.endTime = t;
        this.getflashRecordList();
      } else {
        //最近7天
        this.flashRecordParams.startTime = t - 7 * 24 * 3600 * 1000;
        this.flashRecordParams.endTime = t;
        this.getflashRecordList();
      }
    },
    //根据日期查询
    onChangeDate(data) {
      if (data && data.length > 0) {
        this.flashRecordParams.startTime = data[0].getTime();
        this.flashRecordParams.endTime = data[1].getTime();
      } else {
        this.flashRecordParams.startTime = "";
        this.flashRecordParams.endTime = "";
      }
      this.getflashRecordList();
    },

    handleSure() {
      //调用兑换接口
      this.getflashExchangeApi();
    },
    //充值
    handleRecharge() {
      this.$router.push("/wallet/deposit");
    },
    handleCancel() {
      this.isShow = false;
    },
    // onConvert() {
    //   this.changeArr.reverse();
    //   this.changeArr[0].value = "";
    //   this.changeArr[1].value = "";
    //   //查汇率
    //   this.getRateQueryApi();
    //   //查余额
    //   this.getTransferBalance();
    // },
    //查询余额
    getTransferBalance() {
      this.amount = "";
      let params = {
        coinName: this.topCoinName,
        coinId: this.topCoinId,
      };
      transferBalanceApi(params).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            if (this.fromType === 1) {
              this.amount = res.data.data.tradeAvailableAmount;
            } else {
              this.amount = res.data.data.otcAvailableAmount;
            }
          }
        }
      });
    },
    //查汇率
    getRateQueryApi() {
      let params = {
        convertAssetName: this.topCoinName,
        unitAssetName: this.bottomCoinName,
      };
      rateQueryApi(params).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.exchangeRate = res.data.data.exchangeRate;
            this.onChange();
          }
        }
      });
    },
    // 货币换算
    // changeValue(index) {
    //   //规则 input只能是数字 最大不能超过余额(余额包括资金，现货)
    //   if (index === 1) {
    //     //获得
    //     if (this.changeArr[1].value == "") {
    //       this.changeArr[0].value = "";
    //     } else {
    //       this.changeArr[0].value =
    //         1 / (this.changeArr[1].value * this.exchangeRate);
    //     }
    //   } else {
    //     //消耗
    //     if (this.changeArr[0].value > this.amount)
    //       return this.$message.warning("余额不足");
    //     if (!this.changeArr[0].value) {
    //       this.changeArr[1].value = "";
    //     } else {
    //       this.changeArr[1].value = this.changeArr[0].value * this.exchangeRate;
    //     }
    //   }
    // },
    //选中币种时不能重新绑定数据
    // coinSelect(row, index) {
    //   // 消耗选中币种
    //   this.changeArr[index].coinId = row.coinId;
    //   this.changeArr[index].coinName = row.coinName;
    //   this.changeArr[index].iconUrl = row.iconUrl;
    //   this.changeArr[index].decimalPlaces = row.decimalPlaces;
    //   //绑定值清空
    //   this.changeArr[0].value = "";
    //   this.changeArr[1].value = "";
    //   //查汇率
    //   this.getRateQueryApi();
    //   //查余额
    //   this.getTransferBalance();
    // },
    // 查询币种列表
    getCoinList() {
      simpleApi({
        isType: 6, //查闪兑
      }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.allArr = res.data.data || [];
            this.coinList = res.data.data || [];
            const { data } = res.data;

            data.forEach((item) => {
              if (item.coinName === "USDT") {
                this.topCoinName = item.coinName;
                this.topIconUrl = item.iconUrl;
                this.topCoinId = item.coinId;
                this.topCoinName2 = item.coinName;
                this.topIconUrl2 = item.iconUrl;
                this.topCoinId2 = item.coinId;
                //精度
                this.topDecimalPlaces = item.decimalPlaces
                this.topDecimalPlaces2 = item.decimalPlaces

                this.originArr.push({
                  ...item,
                  coinId: item.coinId,
                  coinName: item.coinName,
                  iconUrl: item.iconUrl,
                });
              } else if (item.coinName === "BTC") {
                this.bottomCoinName = item.coinName;
                this.bottomIconUrl = item.iconUrl;
                this.bottomCoinId = item.coinId;
                this.bottomCoinName2 = item.coinName;
                this.bottomIconUrl2 = item.iconUrl;
                this.bottomCoinId2 = item.coinId;
                //精度
                this.bottomDecimalPlaces = item.decimalPlaces
                this.bottomDecimalPlaces2 = item.decimalPlaces

                this.originArr.push({
                  ...item,
                  coinId: item.coinId,
                  coinName: item.coinName,
                  iconUrl: item.iconUrl,
                });
              }
            });
            //查汇率
            this.getRateQueryApi();
            // 查闪兑
            this.getflashRecordList();
            // 兑换类型选项
            this.getFlagType();
            //查余额
            this.getTransferBalance();
          }
        }
      });
    },
    //闪兑成功
    handleSuccess() {
      this.showSuccess = false;
      //刷新闪兑记录
      this.getflashRecordList();
      //查询余额
      this.getTransferBalance();
      //清空输入框
      this.payValue = "";
      this.getValue = "";
    },
    handleCheck(row) {
      for (let i = 0; i < this.checkArr.length; i++) {
        this.checkArr[i].flag = false;
      }
      row.flag = !row.flag;
      this.fromType = row.id;
      this.getTransferBalance();
    },
    getFlagType() {
      this.fromType = this.fromAccountType;
      this.checkArr.forEach((item) => {
        if (this.fromType === item.id) {
          item.flag = true;
        }
      });
    },
    handleAll(){
      this.payValue = this.amount
      this.onChange()
    }
  },
};
</script>

<style lang="scss" scoped>
.flash {
  background: #ffffff;
  border-radius: 15px;
  .title {
    padding: 20px 0 20px 70px;
    background: #f5f7fa;
    .el-icon-arrow-left {
      padding-right: 20px;
      font-size: 24px;
      cursor: pointer;
    }
    span {
      font-size: 32px;
      cursor: pointer;
    }
  }
  .container {
    margin-left: 70px;
    margin-top: 30px;
    ::v-deep .el-form-item__content {
      line-height: 22px;
    }
    .item-consume {
      position: relative;
      width: 500px;
      height: 99px;
      background: #ffffff;
      box-shadow: 0px 0px 24px 0px rgba(0, 0, 0, 0.05);
      border-radius: 12px;
      border: 1px solid #e1e1e1;
      .pay-title {
        font-size: 12px;
        display: flex;
        justify-content: space-between;
        margin-top: 15px;
        .consume {
          color: #333333;
          margin-left: 20px;
        }
        .pay-all {
          color: #90ff00;
          margin-right: 20px;
          cursor: pointer;
        }
      }

      .flash-box {
        margin-left: 20px;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        .input-box {
          flex: 1;
          ::v-deep .el-input__inner {
            padding: 0;
            border: none;
          }
        }
        .select-box {
          min-width: 87px;
          margin-right: 20px;
          display: flex;
          align-items: center;
          justify-content: end;
          cursor: pointer;
          .select-left {
            font-size: 14px;
            color: #333;
            img {
              width: 24px;
              height: 24px;
              display: inline-block;
              vertical-align: middle;
            }
            span {
              padding: 0 5px;
            }
          }
        }
      }
    }
    .pay-amount {
      margin-top: 10px;
      font-size: 14px;
      color: #333;
    }
    .item-get {
      position: relative;
      width: 500px;
      height: 99px;
      background: #ffffff;
      box-shadow: 0px 2px 6px 0px rgba(206, 215, 255, 0.6);
      border-radius: 12px;
      border: 1px solid #e1e1e1;
      .consume {
        margin-left: 20px;
        margin-top: 15px;
        font-size: 12px;
        color: #333333;
      }
      .flash-box {
        margin-left: 20px;
        margin-top: 10px;
        display: flex;
        justify-content: space-between;
        .input-box {
          flex: 1;
          ::v-deep .el-input__inner {
            padding: 0;
            border: none;
          }
        }
        .select-box {
          min-width: 87px;
          margin-right: 20px;
          display: flex;
          align-items: center;
          justify-content: end;
          cursor: pointer;
          .select-left {
            font-size: 14px;
            color: #333;
            img {
              width: 24px;
              height: 24px;
              display: inline-block;
              vertical-align: middle;
            }
            span {
              padding: 0 5px;
            }
          }
        }
      }
    }
    .convert {
      width: 500px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 20px 0;
      div {
        width: 24px;
        height: 24px;
        img {
          width: 100%;
          height: 100%;
          cursor: pointer;
        }
      }
    }
    .exchange {
      width: 500px;
      height: 60px;
      line-height: 60px;
      text-align: center;
      background: $colorB;
      border-radius: 12px;
      font-weight: 600;
      color: #ffffff;
      font-size: 18px;
      margin-top: 20px;
      cursor: pointer;
    }
    .flash-user {
      width: 500px;
      display: flex;
      justify-content: space-between;
      .left {
        font-size: 16px;
        color: #333;
      }
      .right {
        display: flex;
        position: relative;

        .right-item {
          display: flex;
          align-items: center;
          margin-left: 20px;
          .right-box {
            width: 16px;
            height: 16px;
            border: 1px solid #e1e1e1;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            .right-active {
              width: 10px;
              height: 10px;
              border-radius: 50%;
              background: $colorB;
              border-radius: 50%;
            }
          }
          .right-text {
            margin-left: 5px;
            font-size: 16px;
            color: #666;
          }
        }
      }
    }
  }
  .dialog {
    padding: 0 20px;
    .from-to {
      display: flex;
      justify-content: center;
      .icon {
        margin: 0 137px;
        display: flex;
        align-items: center;
        .el-icon-right {
          font-size: 24px;
        }
      }
      .from-item {
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        font-size: 14px;
        color: #333;
        .img-box {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
            display: inline-block;
          }
        }
        .mid {
          margin: 10px 0;
        }
      }
    }
    .card {
      margin-top: 30px;
      width: 100%;
      height: 140px;
      background: #f1f3fe;
      border-radius: 6px;
      display: flex;
      // margin: 30px 30px 0 30px;
      justify-content: space-between;
      .left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 15px 0 15px 15px;
        p {
          font-size: 14px;
          color: #999;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin: 15px 15px 15px 0;
        text-align: left;
        p {
          font-size: 14px;
          color: #333;
        }
      }
    }
    .no-amount {
      margin-top: 20px;
      display: flex;
      justify-content: center;
      font-size: 12px;
      color: #f75f52;
    }
  }
  .modal-btn {
    width: 240px;
    height: 40px;
  }
  .table {
    padding-left: 70px;
  }
}
</style>
