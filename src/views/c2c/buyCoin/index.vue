<!-- 一键买币 -->
<template>
  <div>
    <div class="buy-conins">
      <!-- 交易 -->
      <buy-conins-business
        @buy="handleNext"
        ref="buyCoins"
        @cancelMethod="$refs.buyCoins.isLoading = false"
      ></buy-conins-business>
    </div>

    <!-- 设置支付方式弹窗（买）  -->
    <get-methods
      :is-show.sync="showGetModal"
      :params="showParams"
      :isQuick="true"
      @next="choosePay"
      v-if="showGetModal"
      :incomeId="incomeId"
      :payObj="payObj"
      @cancelMethod="($refs.buyCoins.isLoading = false), (addPayShow = false)"
    />

    <!-- 收付款/添加付款方式 -->
    <choose-pay
      :addPayShow.sync="addPayShow"
      :chooseList="chooseList"
      :isAddShow="isAddShow"
      :incomeId="incomeId"
      v-if="addPayShow"
      @next="sellChoosePay"
      :isRudio="true"
      @cancelPay="($refs.buyCoins.isLoading = false), (addPayShow = false)"
    />
    <div class="mask">
      <guideMask />
    </div>
  </div>
</template>

<script>
import ChoosePay from "../components/popup/choosePay.vue";
import buyConinsBusiness from "./buyConinsBusiness";
import GetMethods from "../components/popup/getMethods.vue";
import payForm from "../components/popup/payForm.vue";
import stopModal from "@/components/commonModal/stop/index.vue";
import guideMask from "./guideMask/guideMask.vue";
import { createOrder } from "@/api/otc.js";
import { mapActions, mapState } from "vuex";
export default {
  name: "buyCoins",
  components: { buyConinsBusiness, GetMethods, payForm, ChoosePay, guideMask },
  data() {
    return {
      activeName: null,
      // 添加支付方式
      showPayMent: false,
      isAddShow: false,
      editFormInfo: {
        type: 1, // 1是银行卡，2是支付宝，3是微信
        name: "", // 姓名
        num: "", // 账号
        bankName: "", // 银行名称
        bankBranch: "", // 支行
        remark: "", // 备注
        qrcode: "", // 收款二维码
      },
      // 是否显示支付页面
      showParams: null,
      // 支付方式（买）
      showGetModal: false,
      incomeId: "",
      payObj: [],
      // （卖）
      addPayShow: false,
      chooseList: [],
      // 创建订单
      createOrderData: [],
      // 是否添加支付方式回显
      isAddPayEcho: false,
    };
  },
  methods: {
    ...mapActions(["handleOrderInfo", "handleOrderStatus"]),
    // 一键买币生成订单
    handleNext(activeName, params, data = {}) {
      console.log(params,'params');
      // 卖 拿到值之后直接创建订单
      if (this.isAddPayEcho && activeName == 1) {
        this.createOrderData = data[0];
        params.type = activeName;
        this.showParams = params;

        console.log(params,'params');
        this.choosePay({ accountId: this.chooseList.id });
        return;
      }

      this.activeName = activeName;
      this.$nextTick(() => {
        if (activeName == 0 || activeName == 1) {
          // 买
          if (activeName == 0) {
            this.incomeId = params.incomeId;
            this.payObj = data[0]?.payTypeVos;
            this.showGetModal = true;
          } else {
            // 收款方式 直接拿订单生成的支付方式 [1,2,3,] ='1,2,3,'
            this.incomeId=params.payArr.map(val=>val.key).join(",");
       
            // 卖
            this.addPayShow = true;
     
          }
          params.type = activeName;
          this.showParams = params;
          this.createOrderData = data[0];
          return;
        }
        // 添加收付款方式
        this.isAddShow = activeName == "addPayMent" ? true : false;
        this.addPayShow = true;
      });
    },
    // 选中回显
    sellChoosePay(list) {
      this.chooseList = list;
      this.choosePay({ accountId: list.id });
    },
    // 选择支付方式下一步 创建订单
    choosePay({ accountId }) {
      if (this.showParams == null) {
        this.isAddPayEcho = true;
        this.$refs.buyCoins.handleNext();
        return;
      }
      const createOrderData = this.createOrderData;
      const payTypeVos = createOrderData?.payTypeVos;
      createOrder({
        advertId: createOrderData.id,
        orderType: this.activeName == 0 ? 1 : 0,
        price: createOrderData.unitPrice,
        createType: this.showParams.createType,
        coinId: createOrderData.coinId,
        coinName: createOrderData.coinName,
        quantity: this.showParams.quantity,
        amount: this.showParams.amount,
        advertUserId: createOrderData.userId || payTypeVos?.userId,
        advertUid: createOrderData.uid,
        accountId: accountId,
        entranceType: 1,
      }).then((res) => {
        this.$emit("buy", this.activeName);
        let orderInfo = res.data;
        this.handleOrderInfo(orderInfo);
        this.handleOrderStatus(orderInfo.status);
        this.showPayMent = false;
        this.showGetModal = false;
        this.$router.push(
          `/c2c/tradeOrder?orderId=${res.data.id}&type=${
            this.showParams.type == 0 ? 1 : 0
          }&typeRoute=${this.$route.name}`
        );
    
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.buy-conins {
  position: relative;

  .mask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
  }
}
</style>
