<template>
  <div style="margin-top: 97px; padding-right: 44px">
    <div class="flex">
      <!-- <div
        @click="tableState = true"
        :style="{ color: !tableState ? '#737373' : '#F0F0F0' }"
        class="flex ic"
        style="
          cursor: pointer;
          flex-direction: column;
          font-size: 18px;
          font-weight: 500;
          margin-right: 43px;
        "
      >
        <div>全部充币记录</div>
        <div
          v-if="tableState"
          style="width: 18px; height: 2px; margin-top: -10px"
        >
          <img
            style="width: 100%; height: 100%"
            src="@/assets/images/deposit-v2/Rec.png"
            alt=""
          />
        </div>
      </div> -->
      <div
        @click="tableState = false"
        class="flex ic"
        style="
          flex-direction: column;
          font-size: 18px;
          font-weight: 500;
          cursor: pointer;
          color: #F0F0F0;
        "
      >
        <div>{{ coinNameInfo ? coinNameInfo : "" }}{{$t('lang_1806')}}</div>
        <!-- <div
          v-if="!tableState"
          style="width: 18px; height: 2px; margin-top: -10px"
        >
          <img
            style="width: 100%; height: 100%"
            src="@/assets/images/deposit-v2/Rec.png"
            alt=""
          />
        </div> -->
      </div>
    </div>

    <!-- 链上充币   内部转账 -->
    <div  class="flex jb ic">
      <div
        class="flex"
        style="font-size: 14px; font-weight: 500; margin-top: 26px"
      >
        <div
          @click="btnState = true"
          class="flex jc ic"
          style="
            width: 88px;
            height: 34px;
            margin-right: 32px;
            cursor: pointer;
            border-radius: 4px;
          "
          :style="{
            color: btnState ? '#252525' : '#737373',
            backgroundColor: btnState ? '#90FF00' : 'rgba(0,0,0,0)',
          }"
        >
          {{$t('链上充币')}}
        </div>
        <div
          @click="btnState = false"
          class="flex jc ic"
          style="width: 88px; height: 34px; cursor: pointer; border-radius: 4px"
          :style="{
            color: !btnState ? '#252525' : '#737373',
            backgroundColor: !btnState ? '#90FF00' : 'rgba(0,0,0,0)',
          }"
        >
          {{$t('lang_1943')}}
        </div>
      </div>

      <div v-if="btnState && !tableState" style="width: 182px; height: 34px">
        <!-- <SelectListRR
          @chainListFn="chainListFn"
          :chainList="chainList"
          :chainListTitle="chainListTitle"
        /> -->
      </div>
    </div>

    <!-- 链上充币 -->
    <div v-if="btnState && !tableState" style="margin-top: 26px">
      <!-- list -->
      <div style="margin-top: 15px">
        <div
          class="flex ic jb"
          style="border-bottom: 1px solid #252525; height: 48px"
        >
          <div class="left flex ic fccc f500">
            <div style="font-size: 12px" class="tiem">{{$t('lang_2018')}}</div>
            <div style="font-size: 12px">{{$t('lang_1805')}}</div>
          </div>

          <div class="flex">
            <div class="w100 fccc" style="font-size: 12px">{{$t('lang_2385')}}</div>
            <div class="w100 fccc" style="font-size: 12px">{{$t('lang_2238')}}</div>
            <div class="w100 fccc" style="font-size: 12px">{{$t('充币状态')}}</div>
            <div class="fccc" style="font-size: 12px">{{$t('lang_49')}}</div>
          </div>
        </div>
      </div>
  
      <div v-if="transferList && transferList.length > 0">
        <div v-for="(item, index) in transferList" :key="index">
          <div
            class="flex ic jb"
            style="border-bottom: 1px solid #252525; height: 48px"
          >
            <div class="left flex ic fff f500">
              <div style="font-size: 12px" class="tiem">
                {{ $formatTimeInit(item.createdTimestamp) }}
              </div>
              <div style="font-size: 12px">{{ item.sourceAddress }}</div>
            </div>

            <div class="flex">
              <div class="w100 fff" style="font-size: 12px">
                {{ item.tokenName }}
              </div>
              <div class="w100 fff" style="font-size: 12px">
                {{ item.amount }}
              </div>
              <div class="w100 fff" style="font-size: 12px">
                {{
                  item.status == "PENDING"
                    ? $t("等待中")
                    : item.status == "CONFIRMING"
                    ? $t("确认中")
                    : item.status == "SUCCESS"
                    ? $t("充值成功")
                    : $t("充值失败")
                }}
              </div>
              <div
                @click="toggleRotation(index)"
                class="fff"
                style="font-size: 12px; cursor: pointer"
              >
                <div
                  :class="{ rotate: treeState == index && !imgState }"
                  style="
                    width: 12px;
                    height: 12px;
                    margin-right: 10px;
                    transition: transform 0.4s;
                  "
                >
                  <img
                    width="100%"
                    height="100%"
                    src="@/assets/images/deposit-v2/icon-right.png"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            v-if="treeState == index && !imgState"
            style="margin-top: 14px; justify-content: start"
          >
            <div class="flex" style="justify-content: start">
              <div class="l flex jc ic" style="flex-direction: column">
                <div style="width: 200px;" class="flex">
                  <div class="flex ic" style="flex-direction: column">
                    <div style="width: 15.75px; height: 15.75px">
                      <img
                        width="100%"
                        height="100%"
                        src="@/assets/images/deposit-v2/icon-success.png"
                        alt=""
                      />
                    </div>
                    <div
                      style="
                        width: 2px;
                        height: 44px;
                        background-color: #737373;
                      "
                    ></div>
                  </div>
                  <div
                    style="margin-left: 12px; font-size: 15px; font-weight: 500"
                  >
                    <div>{{$t('链上交易提交')}}</div>
                    <div style="color: #737373; font-size: 12px">
                      {{ $formatTimeInit(item.createdTimestamp) }}
                    </div>
                  </div>
                </div>
                <div style="width: 200px;" class="flex">
                  <div class="flex ic" style="flex-direction: column">
                    <div style="width: 15.75px; height: 15.75px">
                        <img
                       v-if="item.status == 'CONFIRMING' "
                        width="100%"
                        height="100%"
                        src="@/assets/images/deposit-v2/icon_wait.png"
                        alt=""
                      />
                      <img
                      v-else
                        width="100%"
                        height="100%"
                        src="@/assets/images/deposit-v2/icon-success.png"
                        alt=""
                      />
                     

                    </div>
                    <div
                      v-if="item.status != 'CONFIRMING'"
                      style="
                        width: 2px;
                        height: 44px;
                        background-color: #737373;
                      "
                    ></div>
                  </div>

                  <div
                    v-if="item.status == 'CONFIRMING'"
                    style="margin-left: 12px; font-size: 15px; font-weight: 500"
                  >
                    <div>
                      {{$t('确认中')}}
                      <span style="color: #737373; font-size: 12px"
                        >{{ item.confirmedNum }}/{{
                          item.confirmingThreshold
                        }}</span
                      >
                    </div>
                    <div style="color: #737373; font-size: 12px">
                      {{ $formatTimeInit(item.updatedTimestamp) }}
                    </div>
                  </div>

                  <div
                    v-else
                    style="margin-left: 12px; font-size: 15px; font-weight: 500"
                  >
                    <div>
                      {{$t('区块确认')}}
                      <span style="color: #737373; font-size: 12px"
                        >{{ item.confirmedNum }}/{{
                          item.confirmingThreshold
                        }}</span
                      >
                    </div>
                    <div style="color: #737373; font-size: 12px">
                      {{ $formatTimeInit(item.updatedTimestamp) }}
                    </div>
                  </div>
                </div>
                <!-- <div  v-if="item.status != 'CONFIRMING'" class="flex"> -->
                <div style="width: 200px;" v-if="item.status != 'CONFIRMING'" class="flex">
                  <div class="flex ic" style="flex-direction: column">
                    <div style="width: 15.75px; height: 15.75px">
                      <img
                        v-if="item.status == 'FAIL'"
                        width="100%"
                        height="100%"
                        src="@/assets/images/deposit-v2/icon_mistake.png"
                        alt=""
                      />
                      <img
                        v-else
                        width="100%"
                        height="100%"
                        src="@/assets/images/deposit-v2/icon-success.png"
                        alt=""
                      />
                    </div>
                    <div style=""></div>
                  </div>
                  <div
                    style="margin-left: 12px; font-size: 15px; font-weight: 500"
                  >
                    <div>{{ item.status == 'FAIL' ? $t('充值失败') : $t('充值成功') }}</div>
                    <div style="color: #737373; font-size: 12px">
                        {{ item.status == 'FAIL' ? $t('资产转入失败') : $t('资产转入成功') }}
                        
                      <!-- {{ item.status == 'FAIL' ?  '资产转入失败' : ' ' }} -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- 钱包处理时间: -->
            <div style="margin-top: 20px">
              <div
                style="
                  color: #737373;
                  font-size: 14px;
                  height: 20px;
                  line-height: 20px;
                  margin-top: 10px;
                "
              >
                {{$t('钱包处理时间')}}:
                <span style="font-weight: 500; color: #b3b3b3">{{
                  $formatTimeInit(item.createdTimestamp)
                }}</span>
              </div>
              <div
                style="
                  color: #737373;
                  font-size: 14px;
                  height: 20px;
                  line-height: 20px;
                  margin-top: 10px;
                "
              >
                {{$t('lang_1805')}}:
                <span style="font-weight: 500; color: #b3b3b3">{{
                  item.sourceAddress
                }}</span>
              </div>
              <div
                style="
                  color: #737373;
                  font-size: 14px;
                  height: 20px;
                  line-height: 20px;
                  margin-top: 10px;
                "
              >
                {{$t('区块链交易ID')}}:
                <span
                  style="
                    font-weight: 500;
                    color: #b3b3b3;
                    border-bottom: 1px solid #b3b3b3;
                  "
                  >{{ item.transactionHash }}</span
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div>
          <NoData />
        </div>
      </div>
    </div>

    <!--   内部转账 -->
    <div v-else>
      <div
        class="flex"
        style="
          margin-top: 15px;
          width: 100%;
          height: 48px;
          line-height: 48px;
          color: #737373;
          font-size: 12px;
          font-weight: 500;
          border-bottom: 1px solid #252525;
        "
      >
        <div class="flex js" style="flex: 1">时间</div>
        <div class="flex js" style="flex: 1">转账账户UID</div>
        <div class="flex js" style="flex: 1">转账账户名</div>
        <div class="flex js" style="flex: 1">币种</div>
        <div class="flex jb" style="flex: 1">
          <div>数量</div>
          <div>状态</div>
        </div>
      </div>
      <div
        v-if="records.length > 0"
        class="containerInfo"
        style="height: 300px; overflow-y: auto"
      >
        <div
          v-for="(item, index) in records"
          :key="index"
          class="flex"
          style="
            width: 100%;
            height: 48px;
            line-height: 48px;
            color: #f0f0f0;
            font-size: 12px;
            font-weight: 500;
            border-bottom: 1px solid #252525;
          "
        >
          <div class="flex js" style="flex: 1">
            {{ $formatTimeInit(item.createTime) }}
          </div>
          <div class="flex js" style="flex: 1">{{ item.uid }}</div>
          <div class="flex js" style="flex: 1">
            {{ item.mobile ? item.mobile : item.email }}
          </div>
          <div class="flex js" style="flex: 1">{{ item.coinName }}</div>
          <div class="flex jb" style="flex: 1">
            <div>{{ item.amount }}</div>
            <div>成功</div>
          </div>
        </div>
      </div>
      <div v-else>
        <div>
          <NoData />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import SelectListRR from "./SelectListRR.vue";
import { getToken } from "@/libs/utils"; // 引入获取 token 的工具函数
import NoData from "@/views/com/NoData";


export default {
  props: {
    coinNameInfo: {
      type: String,
      required: true,
    },
    
    records: {
      type: Array,
      required: true,
    },
    transferList: {
      type: Array,
      required: false,
    },
  },
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Tips",
  components: {
    // SelectListRR,
    NoData,
  },
  data() {
    return {
      treeState: -1,
      imgState: true,
      btnState: false,
      tableState: false,
      chainListTitle: "全部",
      // records: [],
      // transferList: [
      //   {
      //     amount: "69",
      //     blockHash:
      //       "0x4f9c69fc14a7086fd9ec4577a38a010ffa7de44541e8bba0f93a963f805ebc2e",
      //     blockNumber: 7016205,
      //     chainId: "SETH",
      //     confirmedNum: 64,
      //     confirmingThreshold: 64,
      //     createdTimestamp: 1730802545272,
      //     destinationAddress: "0x840c33282b9eb7469d50fb8ceaf66b51803572eb",
      //     explorerTxUrl: "https://sepolia.etherscan.io/tx/",
      //     fee: "0",
      //     id: 1853742121850876000,
      //     sourceAddress: "0x923906b5208ffab7750b16bf7c328f5d7a290209",
      //     status: "SUCCESS",
      //     tokenName: "USDT",
      //     tokenProtocol: null,
      //     transactionHash:
      //       "0x497d7b36accb95fbc909d4ffbadfeedce99915d8e64b2164044dea4350d9e0ac",
      //     type: "Deposit",
      //     updatedTimestamp: 1730802545272,
      //   },
      //   {
      //     amount: "69",
      //     blockHash:
      //       "0x4f9c69fc14a7086fd9ec4577a38a010ffa7de44541e8bba0f93a963f805ebc2e",
      //     blockNumber: 7016205,
      //     chainId: "SETH",
      //     confirmedNum: 64,
      //     confirmingThreshold: 64,
      //     createdTimestamp: 1730802545272,
      //     destinationAddress: "0x840c33282b9eb7469d50fb8ceaf66b51803572eb",
      //     explorerTxUrl: "https://sepolia.etherscan.io/tx/",
      //     fee: "0",
      //     id: 1853742121850876000,
      //     sourceAddress: "0x923906b5208ffab7750b16bf7c328f5d7a290209",
      //     status: "CONFIRMING",
      //     tokenName: "USDT",
      //     tokenProtocol: null,
      //     transactionHash:
      //       "0x497d7b36accb95fbc909d4ffbadfeedce99915d8e64b2164044dea4350d9e0ac",
      //     type: "Deposit",
      //     updatedTimestamp: 1730802545272,
      //   },
      //   {
      //     amount: "69",
      //     blockHash:
      //       "0x4f9c69fc14a7086fd9ec4577a38a010ffa7de44541e8bba0f93a963f805ebc2e",
      //     blockNumber: 7016205,
      //     chainId: "SETH",
      //     confirmedNum: 64,
      //     confirmingThreshold: 64,
      //     createdTimestamp: 1730802545272,
      //     destinationAddress: "0x840c33282b9eb7469d50fb8ceaf66b51803572eb",
      //     explorerTxUrl: "https://sepolia.etherscan.io/tx/",
      //     fee: "0",
      //     id: 1853742121850876000,
      //     sourceAddress: "0x923906b5208ffab7750b16bf7c328f5d7a290209",
      //     status: "FAIL",
      //     tokenName: "USDT",
      //     tokenProtocol: null,
      //     transactionHash:
      //       "0x497d7b36accb95fbc909d4ffbadfeedce99915d8e64b2164044dea4350d9e0ac",
      //     type: "Deposit",
      //     updatedTimestamp: 1730802545272,
      //   },
      // ],

      chainList: [
        {
          id: 2,
          tokenProtocol: "全部",
          code: 53,
        },
        {
          id: 1,
          tokenProtocol: "确认中",
          code: "52",
        },
        {
          id: 1,
          tokenProtocol: "充值成功",
          code: 54,
        },
      ],
    };
  },
  computed: {
    token() {
      return getToken() ? getToken() : "";
    },
  },
  mounted() {

    // const currentTimestamp = Date.now();

    // // 获取三个月前的时间戳（毫秒）
    // const threeMonthsAgo = new Date();
    // threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3); // 设置为当前月份减去 3
    // const threeMonthsAgoTimestamp = threeMonthsAgo.getTime(); // 获取毫秒时间戳

    // this.transferListFn(
    //   1,
    //   100,
    //   "Deposit",
    //   null,
    //   "DEPOSIT",
    //   this.coinNameInfo,
    //   threeMonthsAgoTimestamp,
    //   currentTimestamp
    // );
  },
  methods: {
    chainListFn(item) {
      console.log(item,"item");
    },
    toggleRotation(index) {
      this.imgState = !this.imgState; // 切换旋转状态 /bsex-finance/withdrawal/apply/record/page
      this.treeState = index;
    },

  },
};
</script>
<style lang="scss" scoped>
.rotate {
  transform: rotate(90deg);
  /* 旋转 90 度 */
}

.tiem {
  width: 180px;
}

.w100 {
  width: 100px;
}

.fccc {
  color: #737373;
}

.fff {
  color: #f0f0f0;
}

.f500 {
  font-weight: 500;
}

.jc {
  justify-content: center;
}

.ic {
  align-items: center;
}

.jb {
  justify-content: space-between;
}

.js {
  justify-self: start;
}

/* y轴滚动条样式 */
.containerInfo::-webkit-scrollbar {
  width: 1px;
  /* 设置y轴滚动条的宽度 */
}

.containerInfo::-webkit-scrollbar-track {
  background: #f1f1f1;
  /* y轴滚动条轨道的颜色 */
}

.containerInfo::-webkit-scrollbar-thumb {
  background: #888;
  /* y轴滚动条的颜色 */
  border-radius: 6px;
  /* y轴滚动条的圆角 */
}

.containerInfo::-webkit-scrollbar-thumb:hover {
  background: #555;
  /* y轴滚动条悬停时的颜色 */
}

/* x轴滚动条样式 */
.containerInfo::-webkit-scrollbar {
  height: 1px;
  /* 设置x轴滚动条的高度 */
}

.containerInfo::-webkit-scrollbar-track {
  background: #f1f1f1;
  /* x轴滚动条轨道的颜色 */
}

.containerInfo::-webkit-scrollbar-thumb {
  background: #888;
  /* x轴滚动条的颜色 */
  border-radius: 6px;
  /* x轴滚动条的圆角 */
}
</style>
