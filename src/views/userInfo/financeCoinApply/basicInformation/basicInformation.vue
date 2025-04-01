<template>
  <div class="basicInformation">
    <div class="b-header">
      <div class="b-title">{{ $t("userInfo.优质项目上线申请") }}</div>
      <div class="b-text">
        BSEX
        {{
          $t(
            "userInfo.申明您申请上币提供的信息，仅供内部使用，不会泄露给外部实体。"
          )
        }}
      </div>
    </div>
    <div class="b-form">
      <div class="form-left" v-show="comp == 'basicComp'">
        <div class="form-title">{{ $t("userInfo.基本信息填写") }}</div>
        <div>
          <el-form
            :model="basicForm"
            :rules="basicRules"
            ref="basicRuleForm"
            label-position="top"
            label-width="80px"
          >
            <el-form-item :label="$t('userInfo.项目名称')" prop="projectName">
              <el-input v-model="basicForm.projectName"></el-input>
            </el-form-item>
            <el-form-item :label="$t('userInfo.币种全称')" prop="chineseDesc">
              <el-input v-model="basicForm.chineseDesc"></el-input>
            </el-form-item>
            <el-form-item :label="$t('userInfo.币种简称')" prop="coinName">
              <el-input v-model="basicForm.coinName"></el-input>
            </el-form-item>
            <el-form-item :label="$t('userInfo.联系邮箱')" prop="email">
              <el-input v-model="basicForm.email"></el-input>
            </el-form-item>

            <el-form-item>
              <div class="form-btn" @click="handleNext">
                {{ $t("userInfo.下一步") }}
              </div>
            </el-form-item>
          </el-form>
        </div>

        <div></div>
      </div>
      <!-- 详细信息 -->
      <div class="form-left" v-show="comp == 'detailComp'">
        <div class="form-title">{{ $t("userInfo.详细资料填写") }}</div>
        <div>
          <el-form
            :model="detailForm"
            :rules="detailRules"
            ref="detailRuleForm"
            label-position="top"
            label-width="80px"
          >
            <el-form-item
              :label="$t('userInfo.币种logo(高清png格式)')"
              prop="iconUrl"
            >
              <CoinApplyUpload
                @success="(data) => handleSuccess(data, 'port')"
              />
            </el-form-item>
            <el-form-item :label="$t('userInfo.是否首次上新')" prop="isFirst">
              <div class="isFirst">
                <div class="isFirst-t">
                  <div>{{ isFirstVal }}</div>
                  <div class="isFirst-icon" @click.stop="isFirstIcon">
                    <i
                      :class="
                        isFirstShow
                          ? 'el-icon-caret-top'
                          : 'el-icon-caret-bottom'
                      "
                    ></i>
                  </div>
                </div>
                <div class="isFirst-b" v-show="isFirstShow">
                  <div
                    class="isFirst-item"
                    :class="isFirstActive == item.value ? 'item-active' : ''"
                    v-for="item in isFirstList"
                    :key="item.value"
                    @click.stop="handleItem(item)"
                  >
                    {{ item.label }}
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item
              :label="$t('userInfo.官网地址')"
              prop="officialWebsite"
            >
              <el-input v-model="detailForm.officialWebsite"></el-input>
            </el-form-item>
            <el-form-item :label="$t('userInfo.白皮书链接')" prop="whitePaper">
              <el-input v-model="detailForm.whitePaper"></el-input>
            </el-form-item>
            <el-form-item
              :label="$t('userInfo.请在300字内介绍您的项目')"
              prop="coinIntroduction"
            >
              <el-input
                type="textarea"
                v-model="detailForm.coinIntroduction"
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('userInfo.项目社区账号链接')" prop="projectAccountLink">
              <el-input v-model="detailForm.projectAccountLink"></el-input>
            </el-form-item>
             <el-form-item :label="$t('userInfo.备注')" prop="remark">
              <el-input v-model="detailForm.remark"></el-input>
            </el-form-item>

            <el-form-item>
              <div class="btn-box">
                <div class="btn-item" @click="handleFirst">
                  {{ $t("userInfo.上一步") }}
                </div>
                <div class="btn-item btn-right" @click="handleSubmit">
                  {{ $t("userInfo.提交") }}
                </div>
              </div>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <!-- 申请成功 -->
      <div class="form-left" v-show="comp == 'successComp'">
        <div class="form-title">{{ $t("userInfo.申请提交成功") }}</div>
        <div class="success">
          <div>
            <img
              src="@/assets/financeCoinApply-imgs/coinApply-success.png"
              alt=""
            />
          </div>
          <div class="success-text">{{ $t("userInfo.提交成功") }}</div>
          <div class="success-btn" @click="handleOk">
            {{ $t("userInfo.好的") }}
          </div>
        </div>

        <div></div>
      </div>
      <div class="form-right">
        <!-- <el-steps direction="vertical" :active="active">
          <el-step :title="$t('userInfo.基本信息填写')"></el-step>
          <el-step :title="$t('userInfo.详细资料填写')"></el-step>
          <el-step :title="$t('userInfo.申请提交成功')" description=""></el-step>
        </el-steps> -->
        <CoinApplySteps
          :dataSource="list"
          direction="v"
          :cssActive="cssActive"
        />
      </div>
    </div>
    <div class="b-table">
      <div class="table-title">{{ $t("userInfo.历史申请") }}</div>
      <BasicInformationTable
        :columnData="columnData"
        :tableData="tableData"
        :total="total"
        :page.sync="listPrams.pageNum"
        :limit.sync="listPrams.pageSize"
        @pagination="getCoinApplyList"
      />
    </div>
    <!-- 弹窗详情 -->
    <CoinApplyDialog
      :title="''"
      :visible="isShow"
      :details.sync="detailData"
      @close="onClose"
    />
  </div>
</template>

<script>
import BasicInformationTable from "../table/table.vue";
import CoinApplyDialog from "../dialog/dialog.vue";
import CoinApplyUpload from "../upload/upload.vue";
import CoinApplySteps from "../steps/steps.vue";
import {
  $financeCoinApply,
  $coinApplyList,
  $coinApplyDetail,
} from "@/api/spotTrading";
export default {
  name: "basicInformation",
  components: {
    BasicInformationTable,
    CoinApplyDialog,
    CoinApplyUpload,
    CoinApplySteps,
  },
  data() {
    const validCoinIntroduction = (rule, value, callback) => {
      let num = 0
      for (var i = 0; i < value.length; i++) {
        if (/[\u4e00-\u9fa5]/.test(value[i])) {
          num += 2
        } else {
          num++
        }
      }
      if (num > 300) {
        callback(new Error(this.$t('userInfo.请在300字内介绍您的项目')))
      } else {
        callback()
      }
    }
    return {
      comp: "basicComp",
      active: 0,
      isShow: false,
      basicForm: {
        projectName: "",
        chineseDesc: "",
        coinName: "",
        email: "",
      },
      basicRules: {
        projectName: [
          {
            required: true,
            message: this.$t("userInfo.请输入项目名称"),
            trigger: "blur",
          },
        ],
        chineseDesc: [
          {
            required: true,
            message: this.$t("userInfo.请输入币种全称"),
            trigger: "blur",
          },
        ],
        coinName: [
          {
            required: true,
            message: this.$t("userInfo.请输入币种简称"),
            trigger: "blur",
          },
        ],
        email: [
          {
            required: true,
            message: this.$t("userInfo.请输入联系邮箱"),
            trigger: "blur",
          },
        ],
      },
      isFirstVal: this.$t("userInfo.是"),
      isFirstActive: 1,
      isFirstShow: false,
      isFirstList: [
        {
          value: 1,
          label: this.$t("userInfo.是"),
        },
        {
          value: 0,
          label: this.$t("userInfo.否"),
        },
      ],
      detailForm: {
        iconUrl: "",
        isFirst: 1,
        officialWebsite: "",
        whitePaper: "",
        coinIntroduction: "",
        projectAccountLink:"",
        remark: "",
      },
      detailRules: {
        iconUrl: [
          {
            required: true,
            message: this.$t("userInfo.请上传币种logo"),
            trigger: "blur",
          },
        ],
        isFirst: [
          {
            required: true,
            message: this.$t("userInfo.是否首次上新"),
            trigger: "blur",
          },
        ],
        officialWebsite: [
          {
            required: true,
            message: this.$t("userInfo.请输入官网地址"),
            trigger: "blur",
          },
        ],
        whitePaper: [
          {
            required: true,
            message: this.$t("userInfo.请输入白皮书链接"),
            trigger: "blur",
          },
        ],
        coinIntroduction: [
          {
            required: true,
            message: this.$t("userInfo.请输入项目介绍"),
            trigger: "blur",
          },
          { validator: validCoinIntroduction, trigger: 'blur' }
        ],
      },
      listPrams: {
        pageNum: 1,
        pageSize: 10,
      },
      columnData: [
        {
          text: true,
          prop: "projectName",
          label: this.$t("userInfo.项目名称"),
          width: "100",
        },
        {
          text: true,
          prop: "chineseDesc",
          label: this.$t("userInfo.币种全称"),
          width: "100",
        },
        {
          text: true,
          prop: "coinName",
          label: this.$t("userInfo.币种简称"),
          width: "100",
        },
        {
          isStatus: true,
          prop: "status",
          label: this.$t("userInfo.状态"),
          width: "100",
        },
        {
          isRemark: true,
          prop: "auditReason",
          label: this.$t("userInfo.审核备注"),
          width: "100",
        },
        {
          isTime: true,
          prop: "applyTime",
          label: this.$t("userInfo.申请时间"),
          width: "180",
        },
        {
          isOperation: true,
          label: this.$t("userInfo.操作"),
          width: "120",
          operation: [
            {
              type: "text",
              label: this.$t("userInfo.查看详情"),
              color: "#5771F5",
              buttonClick: this.handleDetail,
              isShow: (row) => {
                return true;
              },
            },
          ],
        },
      ],
      total: 0,
      tableData: [],
      detailData: {},
      // 步骤条
      cssActive: 0,
      oldList: [
        {
          active: null,
          text: this.$t("userInfo.基本信息填写"),
        },
        {
          active: null,
          text: this.$t("userInfo.详细资料填写"),
        },
        {
          active: null,
          text: this.$t("userInfo.申请提交成功"),
        },
      ],
      list: [],
    };
  },
  created() {
    window.addEventListener("click", () => {
      this.isFirstShow = false;
    });
  },
  mounted() {
    this.getStepList();
    this.getCoinApplyList();
  },
  methods: {
    isFirstIcon() {
      this.isFirstShow = !this.isFirstShow;
    },
    handleItem(item) {
      this.isFirstVal = item.label;
      this.isFirstActive = item.value;
      this.detailForm.isFirst = item.value;
      this.isFirstShow = false;
    },
    handleSuccess(fileURL, type) {
      // console.log('上传url',fileURL);
      this.detailForm.iconUrl = fileURL;
    },
    handleNext() {
      this.$refs["basicRuleForm"].validate((valid) => {
        if (valid) {
          this.comp = "detailComp";
          // this.active = 1;
          this.getStepListTwo();
        }
      });
    },
    async handleDetail(row) {
      let res = await $coinApplyDetail({ id: row.id });
      this.detailData = res.data.data;
      this.isShow = true;
    },
    handleFirst() {
      this.comp = "basicComp";
      // this.active = 0;
      this.getStepList();
    },
    handleSubmit() {
      this.$refs["detailRuleForm"].validate(async (valid) => {
        if (valid) {
          const params = Object.assign({}, this.basicForm, this.detailForm);
          let res = await $financeCoinApply(params);
          if (res.data.success) {
            this.getCoinApplyList();
            this.comp = "successComp";
            // this.active = 3;
            this.getStepListEnd();
          }
        }
      });
    },
    handleOk() {
      this.comp = "basicComp";
      // this.active = 0;
      this.getStepsInit();
      this.$refs["basicRuleForm"].resetFields();
      this.$refs["detailRuleForm"].resetFields();
    },
    onClose() {
      this.isShow = false;
    },
    // 上币申请历史记录
    getCoinApplyList() {
      $coinApplyList(this.listPrams).then((res) => {
        this.total = res.data.data.total;
        this.tableData = res.data.data.records || [];
      });
    },
    // 步骤条
    getStepsInit() {
      this.list = [];
      this.cssActive = 0;
      this.list = [
        {
          active: null,
          text: this.$t("userInfo.基本信息填写"),
        },
        {
          active: null,
          text: this.$t("userInfo.详细资料填写"),
        },
        {
          active: null,
          text: this.$t("userInfo.申请提交成功"),
        },
      ];
    },
    getStepList() {
      this.cssActive = 0;
      this.list = JSON.parse(JSON.stringify(this.oldList));
    },
    getStepListTwo() {
      this.cssActive = 1;
      const newArr = [];
      this.oldList.forEach((item, index) => {
        if (index == 0) {
          item.active = 1;
        }
        newArr.push(item);
      });
      this.list = newArr;
    },
    getStepListEnd() {
      this.cssActive = 2;
      const newArr = [];
      this.oldList.forEach((item, index) => {
        if (index == 0 || index == 1) {
          item.active = 1;
        }
        newArr.push(item);
      });
      this.list = newArr;
    },
  },
};
</script>

<style lang="scss" scoped>
.basicInformation {
  width: 100%;
  padding: 0 360px;
  color: #333;
  .b-header {
    margin-top: 70px;
    .b-title {
      font-size: 28px;
    }
    .b-text {
      margin-top: 10px;
      font-size: 14px;
      color: #96a2b2;
    }
  }
  .b-form {
    margin-top: 40px;
    display: flex;
    .form-left {
      margin-right: 380px;
      width: 400px;
      .form-title {
        font-family: FZZZHONGJW--GB1, FZZZHONGJW--GB1;
        font-size: 18px;
        margin-bottom: 20px;
      }
      .success {
        margin-bottom: 30px;
        img {
          width: 167px;
          height: 108px;
        }
        .success-text {
          font-size: 14px;
          margin: 15px 0px 30px 66px;
        }
        .success-btn {
          width: 190px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          color: #fff;
          background: #90ff00;
          border-radius: 6px;
          font-size: 18px;
          cursor: pointer;
        }
      }
    }
    .form-right {
      height: 160px;
    }
    .form-btn {
      width: 400px;
      height: 40px;
      line-height: 40px;
      color: #fff;
      background: #90ff00;
      text-align: center;
      font-size: 20px;
      border-radius: 6px;
      cursor: pointer;
    }
    .btn-box {
      display: flex;
      justify-content: space-between;
      .btn-item {
        min-width: 190px;
        height: 40px;
        line-height: 40px;
        background: #f6f9fc;
        border-radius: 6px;
        text-align: center;
        cursor: pointer;
        font-size: 18px;
      }
      .btn-right {
        color: #fff;
        background: #90ff00;
      }
    }
  }
  .b-table {
    margin-top: 30px;
    .table-title {
      font-size: 18px;
      font-weight: 600;
      margin-bottom: 20px;
    }
  }
  .isFirst {
    position: relative;
    .isFirst-t {
      height: 40px;
      background: #f6f9fc;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0px 15px;
      font-size: 14px;
      .isFirst-icon {
        font-size: 16px;
        cursor: pointer;
      }
    }
    .isFirst-b {
      position: absolute;
      top: 50px;
      left: 0px;
      width: 100%;
      background: #ffffff;
      box-shadow: 0px 0px 12px 0px rgba(0, 0, 0, 0.04);
      border-radius: 4px;
      z-index: 999;
      .isFirst-item {
        padding: 0 15px;
        font-size: 12px;
      }
      .item-active {
        background: #f5f7fa;
      }
    }
  }
}
::v-deep
  .el-form-item.is-required:not(.is-no-asterisk)
  > .el-form-item__label:before {
  content: "*";
  color: #f56c6c;
  margin-right: 4px;
}
::v-deep .el-input__inner {
  background-color: #f6f9fc;
  border: 1px solid transparent;
}
::v-deep .el-textarea__inner {
  background-color: #f6f9fc;
  border: 1px solid transparent;
}
</style>