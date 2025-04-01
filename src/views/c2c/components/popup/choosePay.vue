<!-- 选择收款方式 -->
<template>
  <div v-if="isLoading">
    <common-modal
      :title="$t(t + '选择收款方式')"
      width="600px"
      :show="addPayShow"
      :noFooter="false"
      :FooterIsCenter="true"
      :showClose="true"
      :append-to-body="true"
      customClass="add-pay"
      @cancel="$emit('cancelPay')"
    >
      <template #dia_content>
        <div v-if="addPayShow">
          <div class="tips">
            {{
              $t(
                "c2c.买家将根据您选择的收款方式进行付款。交易时，请检查您的收款账户确保您已收到全额付款。"
              )
            }}
          </div>
          <div class="otc-content">
            <div class="oct-topNav">
              <ul class="left-panel">
                <li
                  v-for="(item, index) in leftList"
                  :key="index"
                  :class="item.id === activePay ? 'item-active' : ''"
                  @click="handleNav(item.id)"
                >
                  <span>{{ $t(t + item.title) }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="paykind-container">
            <div v-if="options && options.length > 0" class="mb1">
              <div
                class="paykind-content"
                :class="{
                  choose: Object.keys(ids).length && ids.includes(item.id),
                }"
                v-for="(item, index) in options"
                :key="index"
                @click="choose(item)"
              >
                <div class="content-title mg-bottom">
                  <div
                    class="content-type"
                    :class="{
                      'pay-alipay1': item.type === 3,
                      'pay-wx1': item.type === 2,
                      'pay-card1': item.type === 1,
                    }"
                  >
                    {{ $t(t + payObj[item.type]) }}
                  </div>
                  <div class="content-edit" @click.stop="handlePay(item)">
                    {{ $t(t + "编辑") }}
                  </div>
                </div>
                <div>
                  <div class="content-name mg-bottom">{{ item.name }}</div>
                  <div
                    :class="['content-name', { 'mg-bottom': item.type != 3 }]"
                  >
                    {{ item.num }}
                  </div>
                  <div
                    class="content-name mb0 mg-bottom"
                    v-if="item.type === 1"
                  >
                    {{ item.bankName }}
                  </div>
                  <el-image
                    class="content-code block"
                    v-if="
                      item.type !== 1 && item.qrcode && item.qrcode != '//0'
                    "
                    :src="item.qrcode"
                    :preview-src-list="[item.qrcode]"
                    fit="cover"
                  />
                </div>
                <i
                  class="el-icon-check selectActive"
                  v-if="Object.keys(ids).length && ids.includes(item.id)"
                ></i>
              </div>
            </div>
            <div v-else class="no-pay">
              <img src="@/assets/images/no-pay.png" alt="" />
              <span class="tip">
                {{ $t(t + "暂无收款方式，请") }}
                <span
                  style="color: #90ff00; cursor: pointer"
                  @click="handlePay(undefined)"
                >
                  {{ $t(t + "添加") }}
                </span>
                {{ $t(t + "收款方式") }}
              </span>
            </div>
          </div>
        </div>
      </template>
      <template #dia_footer>
        <el-button
          type="text"
          class="add-btn"
          v-show="activePay != 0 && options.length"
          @click="handlePay(undefined)"
          >{{ $t(t + "添加收款方式") }}
        </el-button>
        <el-button v-if="options.length" type="text" @click="handlePayAdd">{{
          $t(t + "下一步")
        }}</el-button>
      </template>
    </common-modal>

    <payForm
      :isShow.sync="addShow"
      :isQueryAddShow="isAddShow"
      :editFormInfo="editFormInfo"
      v-if="addShow"
      @next="payAddSuccess"
      @cancelPayForm="cancelPayForm"
      ref="payForm"
    />
  </div>
</template>

<script>
import { payList } from "@/api/otc.js";
import payForm from "./payForm.vue";
export default {
  name: "ChoosePay",
  components: {
    payForm,
  },
  props: {
    // 支付类型
    incomeId: {
      type: String,
      default: "",
    },
    // 收付款
    addPayShow: {
      type: Boolean,
      default: false,
    },
    isAddShow: {
      type: Boolean,
      default: false,
    },
    // 支付列表
    chooseList: {
      type: Array | Object,
      default: [],
    },
    // 单选或者多选支付
    isRudio: {
      type: Boolean,
      default: false,
    },
    // 是否从快捷购买进入
    isQuick: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      // 国际缩写
      t: "c2c.",
      addShow: false,
      isLoading: false,
      // chooseType: [],
      chooseItem: null,
      resultList: [],
      payObj: {
        0: "总览",
        1: "银行卡",
        2: "支付宝",
        3: "微信",
      },
      editFormInfo: {
        type: "", // 1是银行卡，2是支付宝，3是微信
        name: "", // 姓名
        num: "", // 账号
        bankName: "", // 银行名称
        bankBranch: "", // 支行
        remark: "", // 备注
        qrcode: "", // 收款二维码
        id: undefined,
      },
      // 所有的支付列表
      options: [],
      activePay: 0,
      leftList: [
        {
          id: 0,
          title: "总览",
        },
        {
          id: 1,
          title: "银行卡",
        },
        {
          id: 2,
          title: "支付宝",
        },
        {
          id: 3,
          title: "微信",
        },
      ],
    };
  },
  watch: {
    chooseList: {
      handler: function () {
        let data = JSON.parse(JSON.stringify(this.chooseList));
        if(Object.keys(data).length){
          this.resultList.push(data)
        }else{
          this.resultList = [];

        }
      },
      immediate: true,
    },
  },
  computed: {
    ids() {
      return (
        Object.keys(this.resultList).length &&
        this.resultList.map((item) => item.id)
      );
    },
    chooseType() {
      return (
        Object.keys(this.resultList).length &&
        this.resultList.map((item) => item.type)
      );
    },
  },
  created() {
    this.getPayList();
  },
  methods: {
    // 选中
    choose(item) {
      // 是否包含具体的支付方式
      let curIndex = this.resultList.findIndex((ele) => ele.id === item.id);
      if (curIndex !== -1) {
        this.resultList.splice(curIndex, 1);
      } else {
        // 检查类型
        if (
          Object.keys(this.resultList).length &&
          this.chooseType.includes(item.type)
        ) {
          let curType = this.resultList.findIndex(
            (ele) => ele.type === item.type
          );
          if (curType !== -1) {
            this.resultList.splice(curType, 1);
          }
        }
        if (this.isRudio == true) {
          this.resultList = [];
        }
        this.resultList.push(item);
      }
    },
    cancelPayForm() {
      this.isQuick && this.$emit("update:addPayShow", false);
    },
    handlePayAdd() {
      if (!this.resultList || this.resultList.length === 0) {
        this.$message.warning(this.$t(this.t + "请选择支付方式"));
        return;
      }
      // 卖出的时候收款只能选择一种
      if (this.isRudio) {
        const filterIncome = this.incomeId?.split(",");
        const isMeet = filterIncome.includes(String(this.resultList[0].type));
        if (isMeet == false) {
          this.$message.warning(this.$t(this.t + "暂不满足此收款方式") + "！");
          return;
        }
      }
      this.$emit("cancelPay");
      this.$emit("next", this.isRudio ? this.resultList[0] : this.resultList);
    },
    // 获取支付列表
    getPayList() {
      payList({ ids: this.activePay, status: 1 }).then((res) => {
        res.data.forEach((item) => {
          item.lastNum =
            item.type === 1
              ? `${item.bankName}:${this.$t(this.t + "尾号")} ${item.num.substr(
                  -4
                )}`
              : item.type === 3
              ? `${this.$t(this.t + "微信") + this.$t(this.t + "账号")} : ${
                  item.num
                }`
              : item.type === 2
              ? `${this.$t(this.t + "支付宝") + this.$t(this.t + "账号")}: ${
                  item.num
                }`
              : item.type;
        });
        this.options = res.data;
        this.isLoading = true;
        this.isAddShow == true && this.handlePay();
      });
    },
    /**
     *
     * @param {* 当前模块的信息} item
     * @param {* 当前模块的索引} index
     * @param {* 左边模块还是右边模块} module
     */
    handleNav(index) {
      this.activePay = index;
      (this.editFormInfo = {
        type: "", // 1是银行卡，2是支付宝，3是微信
        name: "", // 姓名
        num: "", // 账号
        bankName: "", // 银行名称
        bankBranch: "", // 支行
        remark: "", // 备注
        qrcode: "", // 收款二维码
        id: undefined,
      }),
        this.getPayList();
    },
    payAddSuccess(type) {
      this.$parent.isAddShow = false;
      this.$emit("update:addShow", false);
      this.handleNav(type);
    },
    // 添加|编辑支付方式
    handlePay(item) {
      this.addShow = true;
      // return
      this.editFormInfo.type = this.activePay == 0 ? 1 : this.activePay;
      if (item !== undefined) {
        for (let key in this.editFormInfo) {
          if (item.hasOwnProperty(key)) {
            this.editFormInfo[key] = item[key];
          }
        }
        this.$nextTick((_) => {
          this.$refs.payForm.bizType = 40;
        });
      } else {
        this.$nextTick((_) => {
          this.$refs.payForm.changeValue(this.editFormInfo.type);
          this.$refs.payForm.bizType = 39;
        });
      }
       //获取实名
       this.$nextTick(_ => {
         this.$refs.payForm.getName()
       })
    },
  },
};
</script>
<style lang="scss">
.add-pay {
  .el-dialog__header {
    padding: 30px 30px 15px;
  }

  .el-dialog__headerbtn {
    top: 35px;
  }

  .el-dialog__body {
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 0;
  }
}
</style>
<style lang="scss" scoped>
.paykind-container {
  height: 480px;
  padding: 0 30px;
  max-height: 590px;
  overflow-y: auto;

  .paykind-content {
    padding: 20px 0;
    border-bottom: 1px solid #f5f5f5;
    position: relative;
    cursor: pointer;

    .selectActive {
      display: block;
      position: absolute;
      right: 0px;
      bottom: 20px;
      color: #90ff00;
      font-size: 20px;
    }

    .content-title {
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      line-height: 22px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .content-type {
        color: #00082d;
        font-size: 16px;
      }

      .content-edit {
        color: #90ff00;
        font-size: 14px;
        cursor: pointer;
      }
    }

    .content-name {
      font-size: 14px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #00082d;
      line-height: 20px;
    }

    .content-code {
      width: 30px;
      height: 30px;
    }
  }
}

.mg-bottom {
  margin-bottom: 16px;
}
.tips {
  margin: 0px 30px;
  background: rgba($color: #90ff00, $alpha: 0.16);
  font-size: 14px;
  border-radius: 6px;
  color: #333;
  padding: 20px;
}
.otc-content {
  padding: 0;
  width: 100%;
  height: 40px;
  border-bottom: 1px solid #eeeeee;

  .oct-topNav {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    padding: 0;

    ul {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      font-size: 16px;
      font-weight: 400;
      color: #96a2b2;
    }

    .left-panel,
    .right-panel {
      > li {
        width: 90px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        cursor: pointer;
      }

      .item-active {
        color: #333333;
        font-weight: bold;

        > span {
          display: inline-block;
          height: 40px;
          line-height: 40px;
          position: relative;

          &::before {
            position: absolute;
            content: "";
            width: 80%;
            height: 2px;
            left: 12%;
            bottom: 0;
            background-color: #90ff00;
            border-radius: 1;
            // margin: 0 auto;
          }
        }
      }
    }

    .left-panel {
      display: flex;
      justify-content: flex-start;
    }

    .right-panel {
      display: flex;
      justify-content: space-around;
    }
  }
}

.pay-wx {
  position: relative;

  &::before {
    position: absolute;
    content: "";
    width: 2px;
    height: 12px;
    background: #90ff00;
    left: 0;
    top: 40%;
  }
}

/** 银行卡 */
.pay-card {
  position: relative;

  &::before {
    position: absolute;
    content: "";
    width: 2px;
    height: 12px;
    background: #ffd887;
    left: 0;
    top: 40%;
  }
}

/** 支付宝 */
.pay-alipay {
  position: relative;

  &::before {
    position: absolute;
    content: "";
    width: 2px;
    height: 12px;
    background: #90ff00;
    left: 0;
    top: 40%;
  }
}

.pay-wx1 {
  padding-left: 10px;
  position: relative;

  &::before {
    position: absolute;
    content: "";
    width: 2px;
    height: 12px;
    background: #90ff00;
    left: 0;
    top: 28%;
  }
}

/** 银行卡 */
.pay-card1 {
  padding-left: 10px;
  position: relative;

  &::before {
    position: absolute;
    content: "";
    width: 2px;
    height: 12px;
    background: #ffd887;
    left: 0;
    top: 28%;
  }
}

/** 支付宝 */
.pay-alipay1 {
  padding-left: 10px;
  position: relative;

  &::before {
    position: absolute;
    content: "";
    width: 2px;
    height: 12px;
    background: #90ff00;
    left: 0;
    top: 28%;
  }
}

.select {
  width: 100%;
  height: 40px;
  line-height: 40px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  padding: 0 12px;
  font-size: 16px;

  > span {
    float: left;
    height: 40px;
    line-height: 40px;
  }

  > i {
    height: 40px;
    line-height: 40px;
    float: right;
  }
}

.no-pay {
  width: 100%;
  height: 500px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .tip {
    margin-top: 40px;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #8992a6;
  }
}

.el-button {
  width: 100%;
  color: white;
  height: 45px;
  border-radius: 6px;
  background-color: #90ff00;
  border-color: #90ff00;

  &:hover {
    opacity: 0.8;
  }
}

.add-btn {
  border: 1px solid #90ff00;
  color: #90ff00;
  background-color: white;
}
</style>
