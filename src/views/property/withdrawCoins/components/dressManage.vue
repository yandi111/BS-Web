<template>
  <div class="addressManage">
    <div class="withdrawCoins-title">
      <i class="el-icon-arrow-left" @click="goBack"></i>
      <span @click="goBack">提现地址管理</span>
    </div>
    <div class="addDress">添加提现地址</div>
    <div class="addSymbol">
      <div>
        <span class="symbol">币种</span>
        <el-select v-model="value" placeholder="全部币种">
          <el-option
            v-for="item in coinList"
            :key="item.coinId"
            :label="item.coinName"
            :value="item.coinId"
          >
          </el-option>
        </el-select>
      </div>
      <div class="add-address" @click="addCionDress">添加提币地址</div>
    </div>
    <div class="border"></div>
    <div style="margin: 0 30px">
      <ChainDressTable
        :tableData="withdrawalAddress"
        :columnData="columnData"
      />
    </div>
    <!-- 提币验证 -->
    <!-- <common-modal
      title="验证"
      width="600px"
      :show="verifyShow"
      :noFooter="false"
      :showClose="true"
      :FooterIsCenter="true"
      @cancel="verifyShow = false"
    >
      <template #dia_content>
        <div class="dialog-form">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            label-position="top"
          >
            <el-form-item label="资金密码" prop="password">
              <el-input
                type="password"
                placeholder="请输入资金密码"
                v-model="ruleForm.password"
                suffix-icon="el-icon-view"
              ></el-input>
            </el-form-item>
            <el-form-item label="手机验证" prop="phone">
              <div class="form-vali">
                <el-input
                  placeholder="验证码"
                  v-model="ruleForm.phone"
                  autocomplete="off"
                ></el-input>
                <div class="vali-box">获取验证码</div>
              </div>
            </el-form-item>
            <el-form-item label="邮箱验证" prop="email">
              <div class="form-vali">
                <el-input
                  placeholder="验证码"
                  v-model="ruleForm.email"
                  autocomplete="off"
                ></el-input>
                <div class="vali-box">获取验证码</div>
              </div>
            </el-form-item>
            <el-form-item label="谷歌验证" prop="google">
              <el-input
                placeholder="验证码"
                v-model.number="ruleForm.google"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #dia_footer>
        <div class="footer-btn" @click="onNext">下一步</div>
      </template>
    </common-modal> -->
    <!-- 验证过后添加提币地址 -->
    <common-modal
      title="添加提币地址"
      width="600px"
      :show="addressShow"
      :noFooter="false"
      :showClose="true"
      :FooterIsCenter="true"
      @cancel="addressShow = false"
    >
      <template #dia_content>
        <div class="dialog-form">
          <div class="withdrawal">
            <div
              class="withdrawal-item"
              :class="curIndex === item.id ? 'withdrawal-active' : ''"
              v-for="item in withdrawalTab"
              :key="item.id"
              @click="changeTab(item)"
            >
              {{ item.type }}
              <div
                :class="curIndex === item.id ? 'withdrawal-border' : ''"
              ></div>
            </div>
          </div>
          <!-- 链上提币 -->
          <el-form
            v-show="curIndex === 1"
            label-position="top"
            :model="onChainwithdrawalForm"
            :rules="onChainwithdrawalRules"
            ref="onChainwithdrawalRuleForm"
          >
            <el-form-item label="币种" prop="coinName">
              <AddressManageSelect
                @defaultCoinId="defaultCoinId"
                @getCoinId="getCoinId"
                @getCoinName="getCoinName"
                @getDefaultCoinName="getDefaultCoinName"
              />
            </el-form-item>
            <el-form-item label="网络名称" prop="chainName">
              <el-select
                class="netword-select"
                v-model="onChainwithdrawalForm.chainName"
                placeholder="选择网络"
                ref="choose"
                @focus="handleDialog"
                @change="networkChange"
              >
              </el-select>
            </el-form-item>
            <el-form-item label="提币地址" prop="address">
              <el-input
                v-show="inputId === 1"
                v-model="onChainwithdrawalForm.address"
                placeholder="请输入提币地址"
              ></el-input>
            </el-form-item>
            <!-- <el-form-item label="二维码">
              <div class="qr-code">
                <img src="@/assets/images/qr-code.png" alt="" />
              </div>
            </el-form-item> -->
            <el-form-item label="备注">
              <el-input
                v-model="onChainwithdrawalForm.remark"
                placeholder="请输入备注"
              ></el-input>
            </el-form-item>
          </el-form>
          <!-- 内部转账 -->
          <el-form
            label-position="top"
            v-show="curIndex === 2"
            :model="internalTransferForm"
            :rules="internalTransferRules"
            ref="internalTransferRuleForm"
          >
            <el-form-item label="币种" prop="coinName">
              <AddressManageSelect
                @defaultCoinId="defaultCoinId"
                @getCoinId="getCoinId"
                @getCoinName="getCoinName"
                @getDefaultCoinName="getDefaultCoinName"
              />
            </el-form-item>
            <el-form-item label="账户类型">
              <div class="account-type">
                <div
                  class="account-item"
                  :class="accountIndex === item.id ? 'account-active' : ''"
                  v-for="item in accountTypeTab"
                  :key="item.id"
                  @click="changeAccountTab(item)"
                >
                  {{ item.type }}
                </div>
              </div>
            </el-form-item>
            <el-form-item label="账户名" prop="address">
              <el-input
                v-show="inputId === 2"
                v-model="internalTransferForm.address"
                placeholder="请输入手机号"
              ></el-input>
              <el-input
                v-show="inputId === 3"
                v-model="internalTransferForm.address"
                placeholder="请输入邮箱"
              ></el-input>
              <el-input
                v-show="inputId === 4"
                v-model="internalTransferForm.address"
                placeholder="请输入UID"
              ></el-input>
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                v-model="internalTransferForm.remark"
                placeholder="请输入备注"
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>
      <template #dia_footer>
        <div
          v-show="curIndex === 1"
          class="footer-btn"
          @click="onSure('onChainwithdrawalRuleForm')"
        >
          确定
        </div>
        <div
          v-show="curIndex === 2"
          class="footer-btn"
          @click="onSure('internalTransferRuleForm')"
        >
          确定
        </div>
      </template>
    </common-modal>
    <AddressNetwordSelect
      :is-show.sync="dialogShow"
      @networkChange="networkChange"
      :networkData="networkData"
    ></AddressNetwordSelect>
  </div>
</template>

<script>
import ChainDressTable from "./chainDressTable.vue";
import AddressManageSelect from "./addressManageSelect.vue";
import AddressNetwordSelect from "./NetwordSelect.vue";
import {
  addressAddApi,
  chainListApi,
  addressQueryApi,
  withdrawDelApi,
  simpleApi,
} from "@/api/assetWallet";
export default {
  name: "AddressManage",
  components: {
    ChainDressTable,
    AddressManageSelect,
    AddressNetwordSelect,
  },
  props: {
    withdrawCoinsType: {
      type: Number,
    },
  },
  data() {
    //表单验证
    var validateAddress = (rule, value, callback) => {
      if (value === "" && this.type === 1) {
        callback(new Error("请输入提币地址"));
      } else if (value === "" && this.type === 2) {
        callback(new Error("请输入手机号"));
      } else if (value === "" && this.type === 3) {
        callback(new Error("请输入邮箱"));
      } else if (value === "" && this.type === 4) {
        callback(new Error("请输入UID"));
      } else {
        callback();
      }
    };
    return {
      dialogShow: false,
      verifyShow: false,
      addressShow: false,
      coinList: [],
      value: "",
      columnData: [
        {
          text: true,
          prop: "remark",
          sortable: false,
          label: "标签/备注",
          width: "",
        },
        {
          text: true,
          prop: "coinName",
          label: "币种",
          width: "",
          sortable: false,
        },
        {
          typeOwnDefined: true,
          text: true,
          // prop: "type",
          label: "类型",
          width: "",
          sortable: false,
        },
        {
          text: true,
          prop: "address",
          label: "地址",
          width: "",
          sortable: false,
        },
        {
          isOperation: true,
          label: "操作",
          width: "80",
          sortable: false,
          operation: [
            {
              type: "text",
              label: "删除",
              icon: "",
              color: "#90ff00",
              cursor: "pointer",
              buttonClick: this.withdrawalDelete,
              isShow: (row) => {
                return true;
              },
            },
          ],
        },
      ],
      //表单验证
      type: 1,
      onChainwithdrawalForm: {
        coinId: null,
        coinName: "",
        chainName: "",
        address: "",
        // type: 1,
        remark: "",
      },
      onChainwithdrawalRules: {
        chainName: [
          { required: true, message: "请选择网络", trigger: "change" },
        ],
        address: [{ validator: validateAddress, trigger: "blur" }],
      },
      internalTransferForm: {
        coinId: null,
        coinName: "",
        chainName: "",
        address: "",
        // type: 2,
        remark: "",
      },
      internalTransferRules: {
        address: [{ validator: validateAddress, trigger: "blur" }],
      },
      curIndex: 1,
      inputId: 1,
      withdrawalTab: [
        {
          id: 1,
          type: "链上提币",
        },
        {
          id: 2,
          type: "内部转账",
        },
      ],
      accountIndex: 2,
      accountTypeTab: [
        {
          id: 2,
          type: "手机号",
        },
        {
          id: 3,
          type: "邮箱",
        },

        {
          id: 4,
          type: "UID",
        },
      ],
      //接口数据
      networkData: [],
      withdrawalAddress: [],
      // withdrawalAddress: [
      //   {
      //     id: 4,
      //     remark: "备注9999",
      //     coinName: "usdt",
      //     address: "uid2343354",
      //     type: 4,
      //   },
      //   {
      //     id: 2,
      //     remark: "备注9999",
      //     coinName: "usdt",
      //     address: "手机fdgfhg",
      //     type: 2,
      //   },
      //   {
      //     id: 1,
      //     remark: "备注9999",
      //     coinName: "usdt",
      //     address: "地址dfggfghfhgh222",
      //     type: 1,
      //   },
      //   {
      //     id: 3,
      //     remark: "备注9999",
      //     coinName: "usdt",
      //     address: "邮箱dfggfghfhgh222",
      //     type: 3,
      //   },
      // ],
      dressType: {
        type: this.withdrawCoinsType, //1查链上地址 2查内部转账
      },
    };
  },
  created() {
    this.getCoinList();
    this.getAddressQueryApi();
  },
  methods: {
    //获取提币币种列表
    getCoinList() {
      simpleApi({ isType: 4 }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.coinList = res.data.data || [];
            this.coinList.unshift({
              id: "",
              coinName: "全部币种",
            });
          }
        }
      });
    },
    //添加提币地址
    getAddressAdd(type) {
      if (type === 1) {
        //链上提币参数
        let params = {
          coinId: this.onChainwithdrawalForm.coinId,
          coinName: this.onChainwithdrawalForm.chainName, //币种
          chainName: this.onChainwithdrawalForm.chainName, //链名称
          address: this.onChainwithdrawalForm.address, //地址
          remark: this.onChainwithdrawalForm.remark, //备注
          type: this.type,
        };
        this.getAddressAddApi(params);
      } else {
        //内部转账参数
        let internalTransferParams = {
          address: this.internalTransferForm.address, //地址
          remark: this.internalTransferForm.remark, //备注
          type: this.type,
        };
        this.getAddressAddApi(internalTransferParams);
      }
    },
    //添加提币地址
    getAddressAddApi(params) {
      addressAddApi(params).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.getAddressQueryApi();
          }
        }
      });
    },
    //获取提币地址列表(查询)
    getAddressQueryApi() {
      addressQueryApi(this.dressType).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.withdrawalAddress = res.data.data;
          }
        }
      });
    },

    withdrawalDelete(row) {
      this.getWithdrawDelApi(row.id);
    },
    //删除提币接口
    getWithdrawDelApi(id) {
      withdrawDelApi({ ids: id }).then((res) => {
        // console.log("删除提币", res);
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.$message.success("删除成功");
            this.getAddressQueryApi();
          }
        }
      });
    },

    addCionDress() {
      this.addressShow = true;
      // this.getAddressAdd();
    },
    // onNext() {

    //币种第一条默认id
    defaultCoinId(id) {
      this.onChainwithdrawalForm.coinId = id;
      this.internalTransferForm.coinId = id;
    },
    getDefaultCoinName(name) {
      this.onChainwithdrawalForm.coinName = name;
      this.internalTransferForm.coinName = name;
    },
    getCoinName(name) {
      this.onChainwithdrawalForm.coinName = name;
      this.internalTransferForm.coinName = name;
    },
    //选中币种的id
    getCoinId(id) {
      this.onChainwithdrawalForm.coinId = id;
      this.internalTransferForm.coinId = id;
    },
    // },
    onSure(formName) {
      if (this.type === 1) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getAddressAdd(1); //提交表单
            this.$refs.onChainwithdrawalRuleForm.resetFields();
            this.addressShow = false;
          } else {
            return false;
          }
        });
      } else if (this.type === 2) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getAddressAdd(2);
            this.internalTransferForm.address = "";
            this.internalTransferForm.remark = "";
            this.$refs.internalTransferRuleForm.resetFields();
            this.addressShow = false;
          } else {
            return false;
          }
        });
      } else if (this.type === 3) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getAddressAdd(2); //提交表单
            this.internalTransferForm.address = "";
            this.internalTransferForm.remark = "";
            this.$refs.internalTransferRuleForm.resetFields();
            this.addressShow = false;
          } else {
            return false;
          }
        });
      } else if (this.type === 4) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.getAddressAdd(2);
            this.internalTransferForm.address = "";
            this.internalTransferForm.remark = "";
            this.$refs.internalTransferRuleForm.resetFields();
            this.addressShow = false;
          } else {
            return false;
          }
        });
      }
    },
    changeTab(item) {
      if (item.id === 1) {
        this.inputId = 2;
        this.accountIndex = 2;
      }
      this.curIndex = item.id;
      this.inputId = item.id;
      this.type = item.id;
      this.$nextTick(() => {
        this.$refs.onChainwithdrawalRuleForm.resetFields();
        this.$refs.internalTransferRuleForm.resetFields();
      });
    },
    handleDialog() {
      this.$refs.choose.blur();
      // 打开弹框
      this.dialogShow = true;
      //获取网络
      chainListApi({ coinId: this.onChainwithdrawalForm.coinId }).then(
        (res) => {
          if (res.status && res.status === 200) {
            if (res.data && res.data.success) {
              this.networkData = res.data.data;
              console.log("获取网络", this.networkData);
            }
          }
        }
      );
    },

    networkChange(val) {
      this.onChainwithdrawalForm.chainName = val.chainName; //获取网络字段
    },
    changeAccountTab(item) {
      this.accountIndex = item.id;
      this.type = item.id;
      this.inputId = item.id;
      this.$nextTick(() => {
        this.$refs.onChainwithdrawalRuleForm.resetFields();
        this.$refs.internalTransferRuleForm.resetFields();
      });
    },
    goBack() {
      this.$emit("goBack");
    },
  },
};
</script>

<style lang="scss" scoped>
.addressManage {
  height: 780px;
  background: #ffffff;
  border-radius: 15px;
  margin-top: 20px;
  margin-right: 80px;
  .withdrawCoins-title {
    padding: 30px 0 0 74px;
    .el-icon-arrow-left {
      cursor: pointer;
      padding-right: 20px;
      font-size: 24px;
    }
    span {
      cursor: pointer;
      font-size: 30px;
    }
  }
  .addDress {
    width: 200px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: #edf1ff;
    border-radius: 6px;
    margin: 30px 0 0 118px;
  }
  .addSymbol {
    margin: 60px 0 0 50px;
    display: flex;
    justify-content: space-between;
    .symbol {
      display: inline-block;
      margin-right: 9px;
      font-size: 16px;
      color: #333;
    }
    .add-address {
      margin-right: 50px;
      width: 200px;
      height: 40px;
      line-height: 40px;
      text-align: center;
      background: #5271ff;
      border-radius: 6px;
      font-size: 22px;
      font-weight: 500;
      color: #ffffff;
      cursor: pointer;
    }
  }
  .border {
    height: 1px;
    border: 1px solid #e1e1e1;
    margin-top: 30px;
  }
  .dialog-content {
    padding: 0 20px;
    .title {
      display: flex;
      justify-content: space-between;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #00082d;
      margin-bottom: 30px;

      .usdt {
        padding-left: 10px;
      }
      .right-title {
        padding-right: 10px;
      }
    }
    .item {
      position: relative;
      height: 117px;
      border-radius: 6px;
      border: 1px solid #e1e1e1;
      cursor: pointer;
      margin-bottom: 20px;
      font-size: 14px;
      color: #333;
      .item-title {
        font-size: 18px;
        color: #00082d;
        font-weight: 500;
        margin-bottom: 10px;
      }
      .item-name {
        color: #999;
      }
    }

    .select {
      position: relative;
      text-align: left;
      background-color: #fff;
      border: 1px solid #90ff00;
      position: relative;
    }
    .select:before {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      border: 14px solid #90ff00;
      border-top-color: transparent;
      border-left-color: transparent;
      z-index: 99;
    }
    .select:after {
      content: "";
      position: absolute;
      width: 4px;
      height: 11px;
      bottom: 5px;
      right: 4px;
      border: 1px solid #fff;
      border-top: none;
      border-top-color: transparent;
      border-left-color: transparent;
      transform: rotate(45deg);
      z-index: 99;
    }
  }
  .footer-btn {
    width: 100%;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: #90ff00;
    border-radius: 6px;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
    cursor: pointer;
  }

  .dialog-form {
    max-height: 506px;
    overflow-y: auto;
    padding: 0 20px;
    .form-vali {
      position: relative;
      .vali-box {
        position: absolute;
        right: 5px;
        top: 5px;
        width: 100px;
        height: 30px;
        background-color: #90ff00;
        text-align: center;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #ffffff;
        line-height: 30px;
        border-radius: 6px;
        cursor: pointer;
      }
    }
    .withdrawal {
      display: flex;
      font-size: 18px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #8992a6;
      margin-bottom: 20px;
      .withdrawal-item {
        margin-right: 82px;
        cursor: pointer;
        .withdrawal-border {
          width: 60px;
          height: 2px;
          background: #5271ff;
          border-radius: 6px;
          margin: 8px 0 0 8px;
        }
      }
    }
    .withdrawal-active {
      color: #333333;
    }
    .account-type {
      display: flex;
      justify-content: space-between;
      .account-item {
        width: 170px;
        height: 45px;
        line-height: 45px;
        text-align: center;
        cursor: pointer;
        border-radius: 6px;
        border: 1px solid #e1e1e1;
      }
      .account-active {
        border: 1px solid #5271ff;
        color: #5271ff;
      }
    }
  }
  .qr-code {
    width: 180px;
    height: 100px;
    line-height: 100px;
    border-radius: 6px;
    border: 1px solid #e1e1e1;
    text-align: center;
  }
  .netword-select {
    width: 550px;
  }
  ::v-deep  .el-input__inner {
    height: 45px;
    line-height: 45px;
  }
}
</style>
