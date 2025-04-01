<!-- api管理 -->
<template>
  <div class="user-form">
    <div class="title">{{ $t("userInfo.API管理") }}</div>
    <div class="tip-container">
      <div class="tips">
        <i class="el-icon-warning-outline"></i>
        <div>
          <div class="tip-title">{{ $t("userInfo.API注意事项") }}</div>
          <div class="tip-desc">
            <p>
              {{
                $t(
                  "userInfo.BSEX平台为您提供了强大的API，您可以使用API查询行情，通过API文档查看如何使用"
                )
              }}
            </p>
            <p>
              {{
                $t(
                  "userInfo.请不要泄漏您的密钥，以免造成资产损失，密钥仅在创建时展现一次。"
                )
              }}
            </p>
            <p>
              {{
                $t(
                  "userInfo.出于安全考虑，建议为密钥绑定IP，每个密钥最多绑定20个IP。单个地址直接填写，多个IP地址用半角逗号分隔。"
                )
              }}
            </p>

            <p>
              {{
                $t(
                  "userInfo.新建API时需设置Passphrase，是调用API接口的必要参数，以增强API安全性，并可进行查询秘钥。请您妥善保管，如遗失请重新创建API。"
                )
              }}
            </p>
            <p>
              {{ $t("userInfo.如未完成KYC，您将无法创建API密钥。") }}
            </p>
          </div>
        </div>
      </div>
    </div>
    <div class="form-container">
      <div class="top-oper">
        <div class="title">{{ $t("userInfo.我的API") }}</div>
        <div class="oper-group">
          <div class="addBtn" @click="handleAdd">
            {{ $t("userInfo.新建API") }}
          </div>
        </div>
      </div>
      <div class="table">
        <table-page :show-page="false" :show-filter="false">
          <template v-slot:table>
            <el-table style="width: 100%" :data="tableData">
              <el-table-column
                prop="remark"
                :label="$t('userInfo.备注')"
                min-width="120"
              >
              </el-table-column>
              <el-table-column prop="apiKey" label="APIKey" min-width="200">
              </el-table-column>
              <el-table-column
                :label="$t('userInfo.权限')"
                min-width="200"
                show-overflow-tooltip
                prop="apiPerms"
              >
                <template slot-scope="scope">
                  <div style="display: flex" class="apiPerms">
                    <div
                      v-for="(item, index) in scope.row.apiPerms"
                      :key="index"
                    >
                      {{ item.name }}
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column
                prop="bindIp"
                :label="$t('userInfo.绑定IP地址')"
                min-width="250"
              >
                <template slot-scope="scope">
                  <div class="bind-ip" v-if="scope.row.bindIp">
                    {{ scope.row.bindIp }}
                  </div>
                  <div v-else>--</div>
                </template>
              </el-table-column>
              <el-table-column :label="$t('userInfo.操作')" min-width="150">
                <template slot-scope="scope">
                  <div class="tablebtn-box">
                    <span
                      class="span-look"
                      @click="handleDetail(scope.$index, scope.row)"
                      >{{ $t("userInfo.查看") }}</span
                    >
                    <span
                      class="span-edit"
                      @click="handleEdit(scope.$index, scope.row)"
                      >{{ $t("userInfo.编辑") }}</span
                    >
                    <span
                      class="span-error"
                      @click="handleDel(scope.$index, scope.row)"
                      >{{ $t("userInfo.删除") }}</span
                    >
                  </div>
                </template>
              </el-table-column>
              <template slot="empty">
                <my-empty></my-empty>
              </template>
            </el-table>
          </template>
        </table-page>
      </div>
    </div>
    <verify-form
      ref="verifyForm"
      :is-show.sync="showVeriy"
      @next="handleVerifyForm"
      :is-need-secret="isNeedSecret"
      :is-need-api="isNeedApi"
      :isNeedPhone.sync="isNeedPhone"
      :isNeedEmail.sync="isNeedEmail"
      :isNeedGoogle.sync="isNeedGoogle"
      :authToken.sync="authToken"
      :codeType.sync="codeType"
      @forget="forget"
      @phoneChange="phoneChange"
      @emailChange="emailChange"
      @authChange="authChange"
      @apiChange="apiChange"
    ></verify-form>

    <success-modal
      :is-show.sync="showSuccess"
      :text="text"
      btnText="确定"
      @next="handleSuccess"
      v-if="showSuccess"
    ></success-modal>

    <add-api
      ref="addApi"
      :is-show.sync="addShow"
      :title="$t('userInfo.新建API')"
      :permList="permList"
      @forget="forget"
      @addApiParams="addApiParams"
    ></add-api>
    <!-- 编辑 -->
    <edit-api
      ref="editApi"
      :is-show.sync="editShow"
      :title="$t('userInfo.编辑API')"
      :permList="permList"
      @addApiParams="editApiParams"
      @forget="forget"
    ></edit-api>
    <look-api
    ref="lookApi"
      :is-show.sync="lookShow"
      :title="title"
      :addApiList="addApiList"
      @next="handleLookNext"
      :permList="permList"
    ></look-api>

    <reset-api
      ref="resetRef"
      :is-show.sync="resetShow"
      @next="handleRset"
    ></reset-api>
  </div>
</template>

<script>
import VerifyForm from "@/components/verifyForm.vue";
import SuccessModal from "@/components/successModal.vue";
import TablePage from "@/components/tablePage/index.vue";
import AddApi from "./components/addApi.vue";
import EditApi from "./components/editApi.vue";
import LookApi from "./components/lookApi.vue";
import ResetApi from "./components/resetApi.vue";
import { authItem } from "@/api/common";
import {
  createApiKey,
  apiKeyList,
  apiDetail,
  apiDelet,
  apiEdit,
  apiKeyCheck,
  apiKeyReset,
  $apiPermList,
} from "@/api/user.js";
export default {
  name: "ApiManage",
  components: {
    VerifyForm,
    SuccessModal,
    TablePage,
    AddApi,
    EditApi,
    LookApi,
    ResetApi,
  },
  data() {
    return {
      codeType: 0,
      // 0 新建 1 编辑 2查看 3删除 4 重置
      currentOper: 0,
      // addTitle: this.$t('userInfo.新建API'),
      // editTitle:this.$t('userInfo.编辑API'),
      text: "",
      title: "",
      resetShow: false,
      addShow: false,
      editShow: false,
      lookShow: false,
      // 验证表单所需项
      authToken: "",
      isNeedPhone: false, //手机验证
      isNeedEmail: false, //邮箱验证
      isNeedGoogle: false, //谷歌验证
      isNeedSecret: false,
      isNeedApi: false,
      showVeriy: false,
      device: "",
      showSuccess: false,
      formData: {}, //提交参数
      //验证参数
      authPhone: "",
      authEmail: "",
      authGoogleAuth: "",
      apiId: null, //查看详情id
      apiPwd: "",
      //接口返回
      addApiList: {}, //创建、查看、编辑api成功返回数据
      tableData: [],
      //查询参数
      currentQuery: {
        page: 1,
        size: 10,
      },
      total: 0,
      editObj: {},
      submitPassword: "", //新的口令
      submitAuthToken: "", //口令authToken
      permList: [],
    };
  },
  mounted() {
    this.getApiKeyList();
    this.getPermList();
  },
  methods: {
    //获取认证选项
    getAuthItem(type) {
      authItem({ data: type }).then((res) => {
        this.isNeedPhone = res.data?.authPhone;
        this.isNeedEmail = res.data?.authEmail;
        this.isNeedGoogle = res.data?.authGoogleAuth;
        this.authToken = res.data?.authToken;
      });
    },
    // 查询apiKey列表
    getApiKeyList() {
      apiKeyList(this.currentQuery).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.tableData = res.data.data.records || [];
            this.total = res.data?.data?.total;
          }
        }
      });
    },
    // api权限选项列表
    getPermList() {
      $apiPermList().then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            console.log("res.data.data", res.data.data);
            this.permList = res.data.data;
          }
        }
      });
    },
    // 验证表单
    handleVerifyForm() {
      console.log('hanle');
      // 新增
      if (this.currentOper === 0) {
        //  提交参数
        const params = Object.assign(this.formData, {
          authToken: this.authToken,
          phoneCode: this.authPhone,
          emailCode: this.authEmail,
          authCode: this.authGoogleAuth,
        });
        createApiKey(params).then((res) => {
          if (res && res.status === 200) {
            if (res.data && res.data.success) {
              this.addApiList = res.data.data || {};
              this.text = "创建API成功";
              this.showSuccess = true;
              this.getApiKeyList();
            }
          }
        });
      }

      // 编辑
      if (this.currentOper === 1) {
        const params = Object.assign(this.editObj, {
          id: this.apiId,
          authToken: this.authToken,
          phoneCode: this.authPhone,
          emailCode: this.authEmail,
          authCode: this.authGoogleAuth,
        });
        apiEdit(params).then((res) => {
          if (res && res.status === 200) {
            if (res.data && res.data.success) {
              this.showSuccess = true;
              this.text = "编辑API成功";
              this.getApiKeyList();
            }
          }
        });
      }

      // 查看
      if (this.currentOper === 2) {
        //查看验证参数
        const params = {
          id: this.apiId,
          password: this.$getEncryptCode(this.apiPwd),
          authToken: this.authToken,
          phoneCode: this.authPhone,
          emailCode: this.authEmail,
          authCode: this.authGoogleAuth,
        };
        apiDetail(params).then((res) => {
          if (res && res.status === 200) {
            if (res.data && res.data.success) {
              this.addApiList = {};
              this.addApiList = res.data.data || {};
              this.title = "查看API";
              this.lookShow = true;
              //清除上一次输入的参数
              this.$refs.verifyForm.resetParams();
            }
          }
        });
      }
      //删除
      if (this.currentOper === 3) {
        const params = {
          id: this.apiId,
          authToken: this.authToken,
          phoneCode: this.authPhone,
          emailCode: this.authEmail,
          authCode: this.authGoogleAuth,
        };
        apiDelet(params).then((res) => {
          if (res && res.status === 200) {
            if (res.data && res.data.success) {
              this.showSuccess = true;
              this.text = "我的删除API成功";
              this.getApiKeyList();
            }
          }
        });
      }

      // 重置
      if (this.currentOper === 4) {
        const params = {
          id: this.apiId,
          newPassword: this.$getEncryptCode(this.submitPassword),
          authToken: this.submitAuthToken,
          phoneCode: this.authPhone,
          emailCode: this.authEmail,
          authCode: this.authGoogleAuth,
        };
        apiKeyReset(params).then((res) => {
          if (res && res.status === 200) {
            if (res.data && res.data.success) {
              this.showSuccess = true;
              this.text = "重置API成功";
            }
          }
        });
      }
    },
    // 新增
    handleAdd() {
      this.currentOper = 0;
      // 创建apikey验证码
      this.getAuthItem(16);
      this.codeType = 16;
      this.addShow = true;
      this.addTitle = "新建API";
      this.$refs.addApi.resetParams();
    },

    // 查看
    handleDetail(index, row) {
      this.currentOper = 2;
      //查看详情验证
      this.getAuthItem(17);
      this.codeType = 17;
      this.apiId = row.id;
      this.isNeedApi = true;
      this.showVeriy = true;
      const formData = JSON.parse(JSON.stringify(row));
      this.$refs.lookApi.getFormData(formData);
    },
    // 编辑
    handleEdit(index, row) {
      this.currentOper = 1;
      const formData = JSON.parse(JSON.stringify(row));
      this.apiId = row.id;
      this.getAuthItem(18);
      this.codeType = 18;
      this.$refs.editApi.getFormData(formData);
      this.editShow = true;
    },
    // 删除
    async handleDel(index, row) {
      this.currentOper = 3;
      this.apiId = row.id;
      this.getAuthItem(19);
      this.codeType = 19;
      this.isNeedApi = false;
      this.showVeriy = true;
    },

    // 查看点击下一步
    handleLookNext() {
      this.lookShow = false;
      this.isNeedApi = false;
      this.showVeriy = false;
      //清除验证定时器
      this.$refs.verifyForm.clearTimeoutFn();
    },
    // 重置下一步
    handleRset(formData) {
      //获取认证参数
      const params = {
        id: this.apiId, //apiId
        password: this.$getEncryptCode(formData.password), //登录密码
      };
      apiKeyCheck(params).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.showVeriy = true;
            this.isNeedApi = false;
            // 保存提交参数
            this.submitPassword = formData.newPassword;
            this.submitAuthToken = res.data?.data?.authToken;
          }
        }
      });
    },
    // 忘记口令密码
    forget() {
      this.currentOper = 4;
      this.addShow = false;
      this.showVeriy = false;
      this.resetShow = true;
    },
    cancel() {
      this.isShow = false;
    },
    handleSuccess() {
      if (this.currentOper === 0) {
        this.showSuccess = false;
        this.lookShow = true;
        this.title = "创建API成功";
        this.showVeriy = false;
        this.$refs.verifyForm.resetParams();
        console.log('this.param',this.formData);
        this.$refs.lookApi.getFormData(this.formData);
      }

      if (this.currentOper === 1) {
        this.showSuccess = false;
        this.showVeriy = false;
        this.$refs.verifyForm.resetParams();
      }

      if (this.currentOper === 2) {
        this.showSuccess = false;
        this.showVeriy = false;
        this.$refs.verifyForm.resetParams();
      }

      if (this.currentOper === 3) {
        this.showSuccess = false;
        this.showVeriy = false;
        this.$refs.verifyForm.resetParams();
      }

      // 重置
      if (this.currentOper === 4) {
        this.showSuccess = false;
        this.showVeriy = false;
        this.editShow = false;
        this.resetShow = false;
        this.$refs.verifyForm.resetParams();
        //清除表单数据
        this.$refs.resetRef.resetParams();
      }
      //清除验证定时器
      this.$refs.verifyForm.clearTimeoutFn();
    },
    //创建Api提交参数
    addApiParams(data) {
      console.log('data',data);
      this.formData = data;
      this.isNeedApi = false;
      this.showVeriy =  true;
      //不需要输入api密码
    },
    //编辑验证
    editApiParams(data) {
      console.log(12345645454654);
      this.editObj = data;
      this.isNeedApi = false
      this.showVeriy = true;
    },
    //验证参数
    phoneChange(val) {
      this.authPhone = val;
    },
    emailChange(val) {
      this.authEmail = val;
    },
    authChange(val) {
      this.authGoogleAuth = val;
    },
    apiChange(val) {
      this.apiPwd = val;
    },
  },
};
</script>
<style lang="scss" scoped>
.user-form {
  background: $bgColorA;
  padding: 0px 20px 0px 20px;
  color: $colorC;
  .title {
    padding: 20px 0;
    font-size: 24px;
  }
  .tip-container {
    width: 100%;
    background: #ffffff;
    border-radius: 15px;
    padding: 32px 0px 0px 60px;
    .tips {
      display: flex;
      align-items: flex-start;
      padding-bottom: 15px;
      .el-icon-warning-outline {
        font-size: 36px;
        color: $colorB;
        margin-right: 20px;
      }
      .tip-title {
        margin-bottom: 17px;
        font-size: 16px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
      }
      .tip-desc {
        font-size: 12px;
        font-family: PingFangSC-Regular, PingFang SC;
        font-weight: 400;
        color: #808c9c;

        p {
          line-height: 24px;
          letter-spacing: 1px;
          margin-bottom: 5px;
        }
      }
    }
  }
  .form-container {
    width: 100%;
    margin-top: 20px;
    padding-bottom: 60px;
    background-color: #ffffff;
    border-radius: 15px;
    .table {
      padding: 0 50px;
    }
    .top-oper {
      padding: 0 60px;
      width: 100%;
      height: 100px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #f4f5f7;
      .title {
        font-size: 24px;
        font-family: PingFangSC-Medium, PingFang SC;
        font-weight: 500;
        color: #333333;
      }
      .oper-group {
        .addBtn {
          min-width: 110px;
          height: 40px;
          padding: 0 15px;
          line-height: 40px;
          text-align: center;
          background: $colorB;
          border-radius: 6px;
          font-size: $fontF;
          color: $bgColor;
          cursor: pointer;
        }
      }
    }
    .bind-ip {
      width: 180px;
      /*内容会被修剪，并且其余内容是不可见的*/
      overflow: hidden;
      /*显示省略符号来代表被修剪的文本。*/
      text-overflow: ellipsis;
      /*设置一行显示*/
      white-space: nowrap;
    }
  }

  .btn {
    width: 100%;
    height: 50px;
    font-size: 18px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #ffffff;
  }

  ::v-deep
    .table-content
    .common-table
    ::v-deep
    .el-table
    .el-table__body
    .cell {
    height: 80px;
    line-height: 80px;
    color: #333333;
    font-size: 16px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
  }

  .icon-filter {
    margin-right: 10px;
  }

  .title-modal {
    padding: 20px;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .icon-modal {
      margin-right: 10px;
    }
  }
}

.tablebtn-box {
  font-size: 16px;
  font-weight: 500;
  .span-look {
    color: #333333;
    cursor: pointer;
  }
  .span-edit {
    color: #90ff00;
    padding: 0 20px;
    cursor: pointer;
  }
  .span-error {
    color: #f75f52;
    cursor: pointer;
  }
}
//去掉表格边框
::v-deep .el-table__row > td {
  border: none;
}
/* 清除底部横线 */
.el-table::before {
  height: 0px;
}
/*头部边框*/
::v-deep .el-table thead tr th.is-leaf {
  border: 0px solid #f4f5f7;
  border-right: none;
}
::v-deep .el-table thead tr th:nth-last-of-type(2) {
  border-right: 0px solid #f4f5f7;
}
::v-deep .table-content .common-table .el-table th.el-table__cell > .cell {
  color: #96a2b2;
}
</style>
