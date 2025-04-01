<!-- 绑定手机 -->
<template>
  <div class="user-form">
    <div class="title-context">
      <i class="el-icon-arrow-left" @click="handleBack"></i>
      <span class="title" @click="handleBack">{{ $t('userInfo.设备管理')  }}</span>
    </div>
    <div class="form-container">
      <table-page
        :page.sync="paramsObj.page"
        @current-change="handleChange"
        :total="total"
        :show-filter="false"
      >
        <template v-slot:table>
          <el-table
            class="customer-no-border-table"
            :data="tableData"
            v-loading="loading"
          >
            <el-table-column prop="deviceName" :label="$t('userInfo.设备') " width="450">
              <template slot-scope="scope">
                <div>
                  <!-- 两种图标类型pc和移动 -->
                  <svg-icon
                    v-if="scope.row.platformType === 0"
                    iconClass="mb-icon"
                    className="mbIcon"
                  />
                  <svg-icon
                    v-if="
                      scope.row.platformType === 1 ||
                      scope.row.platformType === 2
                    "
                    iconClass="pc-icon"
                    className="pcIcon"
                  />
                  <span style="padding-left: 5px">{{
                    scope.row.deviceName
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('userInfo.登录时间') " width="350">
              <template slot-scope="scope">
                <div>
                  <div>{{ $formatTime(scope.row.loginDateTsLong) }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="loginIp" :label="$t('userInfo.登录IP')" width="350">
              <template slot-scope="scope">
                <div>
                  <div>{{ scope.row.loginIp }}</div>
                </div>
              </template>
            </el-table-column>
            <el-table-column :label="$t('userInfo.操作') " width="200">
              <template slot-scope="scope">
                <div class="tablebtn-group">
                  <span
                    class="btn-primary"
                    @click="handleDetail(scope.$index, scope.row)"
                    >{{ $t('userInfo.详情')  }}</span
                  >
                  <span
                    class="btn-error"
                    @click="handleDel(scope.$index, scope.row)"
                    >{{ $t('userInfo.删除')  }}</span
                  >
                </div>
              </template>
            </el-table-column>
            <div slot="empty" style="margin-top: 60px">
              <div class="null-page">
                <img src="@/assets/images/null-page.png" alt="" />
                <div class="text">{{ $t('userInfo.暂无数据') }}</div>
              </div>
            </div>
          </el-table>
        </template>
      </table-page>
    </div>

    <common-modal
      :show-close="true"
      :show="isShow"
      @cancel="cancel"
      :noFooter="true"
      width="600px"
    >
      <template #dia_title>
        <div class="title-modal">
          <!-- 两种图标类型pc和移动 -->
          <svg-icon
            v-if="platformType === 0"
            iconClass="mb-icon"
            className="mbIcon"
          />
          <svg-icon
            v-if="platformType === 1 || platformType === 2"
            iconClass="pc-icon"
            className="pcIcon"
          />
          <span style="padding-left: 5px" class="dia-title-text">{{
            deviceDetail.deviceName
          }}</span>
        </div>
      </template>
      <template v-slot:dia_content>
        <div class="content">
          <el-row>
            <el-col :span="8"
              ><div class="content-title">{{ $t('userInfo.登录时间')  }}</div>
              <div>{{ $formatTime(deviceDetail.loginDateTsLong) }}</div></el-col
            >
            <el-col :span="8">
              <div class="content-title">{{ $t('userInfo.IP地址')  }}</div>
              <div>{{ deviceDetail.loginIp }}</div>
            </el-col>
          </el-row>
        </div>
      </template>
    </common-modal>
    <!-- 设备删除验证 -->
    <verify-form
      :is-show.sync="showVerify"
      :isNeedPhone="isNeedPhone"
      :isNeedEmail="isNeedEmail"
      :isNeedGoogle="isNeedGoogle"
      :authToken.sync="authToken"
      :codeType="codeType"
      @phoneChange="phoneChange"
      @emailChange="emailChange"
      @authChange="authChange"
    >
    </verify-form>
    <success-modal
      :is-show.sync="showSuccess"
      :text="$t('userInfo.设备删除成功') "
      @next="handleSuccess"
      v-if="showSuccess"
    ></success-modal>
  </div>
</template>

<script>
import VerifyForm from "@/components/verifyForm.vue";
import SuccessModal from "@/components/successModal.vue";
import TablePage from "@/components/tablePage/index.vue";
import { authItem } from "@/api/common";
import { deviceList, deviceDel } from "@/api/user.js";
export default {
  name: "BindEmail",
  components: {
    VerifyForm,
    SuccessModal,
    TablePage,
  },
  props: {
    title: {
      type: String,
    },
  },
  data() {
    return {
      paramsObj: {
        page: 1,
        size: 10,
      },
      total: 0,
      isShow: false,
      showVerify: false,
      showSuccess: false,
      isNeedPhone: false,
      isNeedEmail: false,
      isNeedGoogle: false,
      authToken: "",
      tableData: [],
      loading: false,
      deviceDetail: {},
      deviceId: null,
      phoneCode: "",
      emailCode: "",
      authCode: "",
      //获取验证码类型
      codeType: 13,
      platformType: null,
    };
  },
  created() {
    this.getDeviceList();
    this.authItem();
  },
  methods: {
    //获取验证
    authItem() {
      authItem({ data: 13 }).then((res) => {
        this.authToken = res?.data?.authToken;
        this.isNeedPhone = res?.data?.authPhone;
        this.isNeedEmail = res?.data?.authEmail;
        this.isNeedGoogle = res?.data?.authGoogleAuth;
      });
    },
    handleChange(val) {
      this.paramsObj.page = val.page;
      this.getDeviceList();
    },
    // 获取设备列表
    getDeviceList() {
      this.loading = true;
      deviceList(this.paramsObj).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.tableData = res.data.data.records || [];
            this.total = res.data.data.total;
            this.loading = false;
          }
        }
      });
    },
    // 提交
    submit() {
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          this.showVerify = true;
        }
      });
    },
    // 成功返回页面
    handleSuccess() {
      this.showSuccess = false;
    },
    handleBack() {
      this.$emit("success");
    },
    // 详情
    handleDetail(index, row) {
      this.deviceDetail = row;
      this.isShow = true;
      //控制图标
      this.platformType = row.platformType;
    },
    //验证码参数
    phoneChange(val) {
      this.phoneCode = val;
    },
    emailChange(val) {
      this.emailCode = val;
    },
    authChange(val) {
      this.authCode = val;
    },
    //验证后删除设备
    // handleDeviceDel() {
    //   const params = {
    //     id: this.deviceId,
    //     authToken: this.authToken,
    //     emailCode: this.emailCode,
    //     phoneCode: this.phoneCode,
    //     authCode: this.authCode,
    //   };
    //   deviceDel(params).then((res) => {
    //     if (res && res.status === 200) {
    //       if (res.data && res.data.success) {
    //         this.showVerify = false;
    //         this.showSuccess = true;
    //         this.getDeviceList();
    //       }
    //     }
    //   });
    // },
    // 删除设备
    handleDel(index, row) {
      this.deviceId = row.id;
      deviceDel({ id: row.id }).then((res) => {
        if (res && res.status === 200) {
          if (res.data && res.data.success) {
            this.getDeviceList();
            this.showSuccess = true;
          }
        }
      });
    },
    cancel() {
      this.isShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.user-form {
  width: 100%;
  background-color: #ffffff;
  .content {
    padding: 0 30px;
    color: #333333;
    .content-title {
      color: #8992a6;
      font-size: 14px;
      margin-bottom: 20px;
    }
  }
  .title-context {
    .el-icon-arrow-left {
      font-size: 24px;
      padding-right: 20px;
      cursor: pointer;
    }
    .title {
      font-size: 30px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #333333;
      margin-bottom: 60px;
      cursor: pointer;
    }
  }

  .form-container {
    width: 100%;
    padding: 40px 0 0 40px;
    .tablebtn-group {
      .btn-primary {
        margin-left: 0px;
      }
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
    height: 40px;
    line-height: 40px;
    color: #333333;
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

// 去除表格所有边框
.el-table::before {
  height: 0 !important;
}
::v-deep  .el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
  border-bottom: none !important;
}
/* 头部边框 */
::v-deep  .customer-no-border-table thead tr th.is-leaf {
  border: 0px solid #ebeef5 !important;
  border-right: none !important;
}
</style>
