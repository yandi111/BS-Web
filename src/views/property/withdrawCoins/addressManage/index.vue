<template>
  <div class="addressManage" @click.stop="close">
    <div class="withdrawCoins-title pad">
      <i class="el-icon-arrow-left" @click="goBack"></i>
      <span @click="goBack">{{ $t("property.提现地址管理") }}</span>
    </div>
    <div class="addDress pad">
      <img src="@/assets/property-imgs/address-icon.png" alt="" />
      <span>{{ $t("property.添加提现地址") }}</span>
    </div>
    <div class="addSymbol">
      <div>
        <span class="symbol">{{ $t("property.币种") }}</span>
        <el-select
          v-model="value"
          @change="handleCoinChange"
          :placeholder="$t('property.全部币种')"
        >
          <el-option
            v-for="item in coinList"
            :key="item.coinId"
            :label="item.coinName"
            :value="item.coinId"
          >
          </el-option>
        </el-select>
      </div>
      <div class="add-address" @click.stop="addCionDress">
        {{ $t("property.添加提币地址") }}
      </div>
    </div>
    <div class="border"></div>
    <div>
      <ChainDressTable
        @click.stop
        :tableData="withdrawalAddress"
        :columnData="columnData"
      />
    </div>
    <!-- 验证过后添加提币地址 -->
    <common-modal
      :title="$t('property.添加提币地址')"
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
            <el-form-item :label="$t('property.币种')" prop="coinName">
              <div class="coin-name" @click.stop>
                <coin-select
                  ref="chainRef"
                  :coinImg="true"
                  :list="symbolList"
                  @selectedCoin="selectedCoin"
                ></coin-select>
              </div>
            </el-form-item>
            <el-form-item :label="$t('property.网络名称')" prop="chainName">
              <el-select
                class="netword-select"
                v-model="onChainwithdrawalForm.chainName"
                :placeholder="$t('property.选择网络')"
                ref="choose"
                @focus="handleDialog"
                @change="networkChange"
              >
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('property.提币地址')" prop="address">
              <el-input
                v-model="onChainwithdrawalForm.address"
                :placeholder="$t('property.请输入提币地址')"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('property.备注')">
              <el-input
                v-model="onChainwithdrawalForm.remark"
                :placeholder="$t('property.请输入备注')"
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
            <el-form-item :label="$t('property.账户类型')">
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
            <el-form-item
              :label="$t('property.账户名')"
              v-if="inputId === 2"
              prop="phone"
            >
              <!-- <el-input
                v-model="internalTransferForm.phone"
                :placeholder="$t('property.请输入手机号')"
                class="phone-select"
                @change="handlePhone"
              >
                <el-select
                  class="phone1-select"
                  v-model="internalTransferForm.phoneArea"
                  slot="prepend"
                  :placeholder="$t('property.请选择')"
                  @change="handlePhoneArea"
                >
                  <el-option
                    v-for="(item, index) in phoneAreaList"
                    :key="index"
                    :label="item.value"
                    :value="item.value"
                  >
                    <span style="float: left">{{ item.label }}</span>
                    <span
                      style="float: right; color: #8492a6; font-size: 13px"
                      >{{ item.value }}</span
                    >
                  </el-option>
                </el-select>
              </el-input> -->

              <div class="phone-form">
                <div class="phone-l">
                  <div class="phone-c">
                    <div class="c-code">{{ activeItem }}</div>
                    <div class="c-select" @click.stop="handleCode">
                      <i
                        :class="[
                          'custom-icon',
                          popperShow
                            ? 'el-icon-arrow-up'
                            : 'el-icon-arrow-down',
                        ]"
                      ></i>
                    </div>
                  </div>
                </div>
                <div class="phone-r">
                  <el-input
                    v-model="internalTransferForm.phone"
                    class="input-with-select form-input"
                    placeholder="请输入手机号"
                    ref="phoneRef"
                    @change="handlePhoneCode"
                  ></el-input>
                </div>
              </div>
              <PhoneCode
                ref="phoneRefs"
                :list.sync="phoneAreaList"
                @shangeData="shangeData"
              />
            </el-form-item>
            <el-form-item
              :label="$t('property.账户名')"
              v-if="inputId === 3"
              prop="email"
            >
              <el-input
                v-model="internalTransferForm.email"
                :placeholder="$t('property.请输入邮箱')"
                @change="handleEmail"
              ></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('property.账户名')"
              v-if="inputId === 4"
              prop="uid"
            >
              <el-input
                v-model="internalTransferForm.uid"
                :placeholder="$t('property.请输入UID')"
                @change="handleUid"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('property.备注')">
              <el-input
                v-model="internalTransferForm.remark"
                :placeholder="$t('property.请输入备注')"
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
          {{ $t("property.确定") }}
        </div>
        <div
          v-show="curIndex === 2"
          class="footer-btn"
          @click="onSure('internalTransferRuleForm')"
        >
          {{ $t("property.确定") }}
        </div>
      </template>
    </common-modal>
    <AddressNetwordSelect
      :is-show.sync="dialogShow"
      @networkChange="networkChange"
      :networkData="networkData"
    ></AddressNetwordSelect>
    <success-modal
      :is-show.sync="successShow"
      :btnText="$t('property.确定')"
      :text="tipText"
      @next="sureSuccess"
    ></success-modal>
  </div>
</template>

<script>
import ChainDressTable from "../components/chainDressTable.vue";
import AddressManageSelect from "../components/addressManageSelect.vue";
import AddressNetwordSelect from "../components/NetwordSelect.vue";
import SuccessModal from "@/components/successModal.vue";
import CoinSelect from "./coinSelect.vue";
import PhoneCode from "@/components/phoneCode";
import { countryList } from "@/api/user";
import {
  addressAddApi,
  chainListApi,
  addressQueryApi,
  withdrawDelApi,
  simpleApi,
} from "@/api/assetWallet";
export default {
  name: "InternalDressManage",
  components: {
    ChainDressTable,
    AddressManageSelect,
    AddressNetwordSelect,
    SuccessModal,
    CoinSelect,
    PhoneCode,
  },
  props: {
    withdrawCoinsType: {
      type: Number,
    },
  },
  data() {
    //表单验证
    var validateAddress = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t("property.请输入账户名")));
      } else {
        callback();
      }
    };
    // 手机号验证
    const validPhone = (rule, value, callback) => {
      let reg = this.activeItem == "+86" ? /^[0-9]{11}$/ : /^\d{5,15}$/;
      if (!value) {
        callback(new Error(this.$t("property.请输入手机号")));
      } else {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error(this.$t("userInfo.请输入正确的手机格式")));
        }
      }
    };
    //邮箱验证
    const validEmail = (rule, value, callback) => {
      const reg =
        /^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/;
      if (!value) {
        callback(new Error(this.$t("property.请输入邮箱")));
      } else {
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error(this.$t("userInfo.请输入正确的邮箱")));
        }
      }
    };
    return {
      dialogShow: false,
      verifyShow: false,
      addressShow: false,
      successShow: false,
      coinList: [],
      symbolList: [],
      value: "",
      tipText: "",
      columnData: [
        {
          remarkType: true,
          prop: "remark",
          sortable: false,
          label: this.$t("property.标签/备注"),
          width: "100",
        },
        {
          coinNameType: true,
          prop: "coinName",
          label: this.$t("property.币种"),
          width: "100",
          sortable: false,
        },
        {
          typeOwnDefined: true,
          text: true,
          // prop: "type",
          label: this.$t("property.类型"),
          width: "100",
          sortable: false,
        },
        {
          text: true,
          prop: "address",
          label: this.$t("property.地址"),
          width: "200",
          sortable: false,
        },
        {
          isOperation: true,
          label: this.$t("property.操作"),
          width: "80",
          sortable: false,
          operation: [
            {
              type: "text",
              label: this.$t("property.删除"),
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
        coinIcon: "",
        chainName: "",
        address: "",
        // type: 1,
        remark: "",
      },
      onChainwithdrawalRules: {
        chainName: [
          {
            required: true,
            message: this.$t("property.请选择网络"),
            trigger: "change",
          },
        ],
        address: [{ validator: validateAddress, trigger: "change" }],
      },
      internalTransferForm: {
        coinId: null,
        coinName: "",
        chainName: "",
        address: "",
        remark: "",
        phoneArea: "+86",
        phone: "",
        email: "",
        uid: "",
      },
      phoneAreaList: [],
      internalTransferRules: {
        phone: [{ validator: validPhone, trigger: "blur" }],
        email: [{ validator: validEmail, trigger: "blur" }],
        uid: [
          {
            required: true,
            message: this.$t("property.请输入uid"),
            trigger: "change",
          },
        ],
      },
      curIndex: 1,
      inputId: 2,
      withdrawalTab: [
        {
          id: 1,
          type: this.$t("property.链上提币"),
        },
        {
          id: 2,
          type: this.$t("property.内部转账"),
        },
      ],
      accountIndex: 2,
      accountTypeTab: [
        {
          id: 2,
          type: this.$t("property.手机号"),
        },
        {
          id: 3,
          type: this.$t("property.邮箱"),
        },

        {
          id: 4,
          type: "UID",
        },
      ],
      //接口数据
      networkData: [],
      withdrawalAddress: [],
      dressType: {
        type: 0, //1查链上地址 2查内部转账 0全部
        coinId: "",
      },
      activeItem: "+86",
      popperShow: false,
    };
  },
  created() {
    //监听点击事件
    document.addEventListener("click", () => {
      this.popperShow = false;
      this.$refs.phoneRefs.closeFn();
    });
    this.getCoinList();
    this.getAddressQueryApi();
    this.getCountryList();
  },
  methods: {
    handleCode() {
      this.popperShow = !this.popperShow;
      this.$refs.phoneRefs.showFn();
    },
    shangeData(item) {
      this.activeItem = item.value;
      this.popperShow = false;
      this.$refs["internalTransferRuleForm"].resetFields();
    },
    handlePhoneCode(val){
     this.internalTransferForm.address = `${this.activeItem} ${val}` 
    },
    //获取国家列表
    getCountryList() {
      countryList().then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            const { data } = res.data;
            const list = [];
            data.map((item) => {
              list.push({
                label: item.name,
                value: `+${item.code}`,
              });
            });
            this.phoneAreaList = list;
          }
        }
      });
    },
    //获取提币币种列表
    getCoinList() {
      simpleApi({ isType: 4 }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.symbolList = JSON.parse(JSON.stringify(res.data.data)) || [];
            this.onChainwithdrawalForm.coinId = this.symbolList[0].coinId;
            this.onChainwithdrawalForm.coinName = this.symbolList[0].coinName;
            this.onChainwithdrawalForm.coinIcon = this.symbolList[0].iconUrl;
            this.coinList = res.data.data || [];
            this.coinList.unshift({
              id: "",
              coinName: this.$t("property.全部币种"),
            });
          }
        }
      });
    },
    //币种选择
    selectedCoin(item) {
      this.onChainwithdrawalForm.coinId = item.coinId;
      this.onChainwithdrawalForm.coinName = item.coinName;
      this.onChainwithdrawalForm.coinIcon = item.iconUrl;
    },
    //内部转账参数(手机，邮箱，uid)
    handlePhoneArea(val) {
      this.internalTransferForm.phoneArea = val;
    },
    handlePhone(val) {
      this.internalTransferForm.address = `${this.internalTransferForm.phoneArea} ${val}`;
    },
    handleEmail(val) {
      this.internalTransferForm.address = val;
    },
    handleUid(val) {
      this.internalTransferForm.address = val;
    },
    //默认图标和选择图标
    defaultIconUrl(val) {
      this.onChainwithdrawalForm.coinIcon = val;
    },
    getIconUrl(val) {
      this.onChainwithdrawalForm.coinIcon = val;
    },
    //添加提币地址
    getAddressAdd(type) {
      if (type === 1) {
        //链上提币参数
        let params = {
          coinId: this.onChainwithdrawalForm.coinId,
          coinName: this.onChainwithdrawalForm.coinName, //币种
          coinIcon: this.onChainwithdrawalForm.coinIcon, //币种icon
          chainName: this.onChainwithdrawalForm.chainName, //链名称
          address: this.onChainwithdrawalForm.address, //地址
          remark: this.onChainwithdrawalForm.remark, //备注
          type: this.type,
        };
        this.getAddressAddApi(params);
      } else {
        //内部转账参数
        let internalTransferParams = {
          address: this.internalTransferForm.address, //
          coinName: this.internalTransferForm.coinName, //币种
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
            this.successShow = true;
            this.tipText = "添加成功";
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
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.tipText = "删除成功";
            this.successShow = true;
          }
        }
      });
    },

    addCionDress() {
      this.addressShow = true;
    },

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
      if (this.curIndex === 1) {
        this.onChainwithdrawalForm.coinName = name;
      } else if (this.curIndex === 2) {
        this.internalTransferForm.coinName = name;
      }
    },
    //选中币种的id
    getCoinId(id) {
      this.onChainwithdrawalForm.coinId = id;
      this.internalTransferForm.coinId = id;
    },
    //确认添加提币地址
    onSure(formName) {
      switch (this.curIndex) {
        case 1:
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
          }

          break;
        case 2:
          if (this.type === 2) {
            this.$refs[formName].validate((valid) => {
              if (valid) {
                this.getAddressAdd(2);
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
                this.$refs.internalTransferRuleForm.resetFields();
                this.addressShow = false;
              } else {
                return false;
              }
            });
          }
          break;
        default:
      }
    },
    changeTab(item) {
      if (item.id === 1) {
        this.accountIndex = 2;
        this.curIndex = 1;
      } else if (item.id === 2) {
        this.curIndex = 2;
        this.inputId = item.id;
        this.type = item.id;
      }
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
      this.$refs.internalTransferRuleForm.resetFields();
    },
    goBack() {
      this.$emit("goBack");
    },
    sureSuccess() {
      this.getAddressQueryApi();
      this.successShow = false;
      this.internalTransferForm.remark = "";
      this.onChainwithdrawalForm.remark = "";
      this.accountIndex = 2;
    },
    //币种搜索
    handleCoinChange(val) {
      this.dressType.coinId = val;
      this.getAddressQueryApi();
    },
    //点击关闭币种选择
    close() {
      if (this.curIndex === 1) {
        if (this.$refs.chainRef) {
          this.$refs.chainRef.showFn();
        }
      } else {
        if (this.$refs.internalRef) {
          this.$refs.internalRef.showFn();
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.addressManage {
  color: #333;
  min-height: 600px;
  .phone-form {
    display: flex;
    .phone-l {
      min-width: 80px;
      display: flex;
      align-items: center;
      height: 45px;
      border: 1px solid #f4f5f7;
      margin-right: 5px;
      .phone-c {
        width: 100%;
        display: flex;
        justify-content: space-between;
        .c-code {
          margin-left: 10px;
        }
        .c-select {
          margin: 0 10px;
        }
      }
    }
    .phone-r {
      flex: 1;
    }
  }
  .pad {
    padding-left: 70px;
  }
  .withdrawCoins-title {
    background: #f5f7fa;
    padding: 20px 0px 20px 70px;
    .el-icon-arrow-left {
      cursor: pointer;
      padding-right: 20px;
      font-size: 24px;
    }
    span {
      cursor: pointer;
      font-size: 32px;
    }
  }
  .addDress {
    margin-top: 30px;
    font-size: 22px;
    img {
      width: 17px;
      height: 18px;
      vertical-align: middle;
      display: inline-block;
      margin-right: 20px;
    }
  }
  .addSymbol {
    margin: 60px 0 0 70px;
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
      background: $colorB;
      border-radius: 6px;
      font-size: 22px;
      font-weight: 500;
      color: #ffffff;
      cursor: pointer;
    }
    ::v-deep .el-select {
      width: 130px;
    }
  }
  .border {
    border-bottom: 1px solid #f5f7fa;
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
      border: 1px solid #f4f5f7;
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
      border: 1px solid $colorB;
      position: relative;
    }
    .select:before {
      content: "";
      position: absolute;
      bottom: 0;
      right: 0;
      border: 14px solid $colorB;
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
    background: $colorB;
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
    padding: 0 30px;
    .form-vali {
      position: relative;
      .vali-box {
        position: absolute;
        right: 5px;
        top: 5px;
        width: 100px;
        height: 30px;
        background-color: $colorB;
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
          background: $colorB;
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
        border: 1px solid #f4f5f7;
      }
      .account-active {
        border: 1px solid $colorB;
        color: $colorB;
      }
    }
  }
  .qr-code {
    width: 180px;
    height: 100px;
    line-height: 100px;
    border-radius: 6px;
    border: 1px solid #f4f5f7;
    text-align: center;
  }
  .netword-select {
    width: 100%;
  }
  ::v-deep .el-input__inner {
    height: 45px;
    line-height: 45px;
    border: 1px solid #f4f5f7;
  }
  .phone-select {
    width: 100%;
    height: 45px;
    border: 1px solid #f4f5f7;
    border-radius: 6px;
    ::v-deep .el-select > .el-input {
      min-width: 90px;
      padding-left: 10px;
    }
    ::v-deep .el-input-group__prepend {
      background-color: #ffffff;
      border: none;
    }
    ::v-deep .el-input__inner {
      border: none;
      padding: 0;
    }
  }
}
.phone1-select {
  position: relative;
  &::before {
    position: absolute;
    content: "";
    width: 1px;
    height: 40%;
    top: 34%;
    right: 8px;
    background-color: #333333;
    z-index: 999;
    opacity: 0.4;
  }
}
.coin-name {
  position: relative;
}
// ::v-deep .el-input__inner {

// }
</style>
