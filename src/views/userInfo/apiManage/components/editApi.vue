<template>
  <div>
    <common-modal
      :title="title"
      width="600px"
      :show="isShow"
      :noFooter="false"
      :showClose="true"
      :FooterIsCenter="true"
      :appendToBody="true"
      @cancel="$emit('update:isShow', false)"
    >
      <template #dia_content>
        <div class="form-common">
          <el-form
            :model="formData"
            :rules="rules"
            ref="verifyForm"
            label-position="top"
          >
            <el-form-item prop="remark" :label="$t('userInfo.备注名')">
              <el-input
                v-model="formData.remark"
                autocomplete="off"
                :placeholder="$t('userInfo.请输入备注名')"
              ></el-input>
            </el-form-item>
            <el-form-item
              prop="password"
              :label="$t('userInfo.API口令')"
              style="position: relative"
            >
              <span class="forget-api" @click="forgetKl">{{
                $t("userInfo.忘记API口令？")
              }}</span>
              <el-input
                v-model="formData.password"
                autocomplete="off"
                :placeholder="
                  $t(
                    'userInfo.请输入8-32位字符，必须包含大写字母，小写字母，数字及特殊符号'
                  )
                "
              ></el-input>
            </el-form-item>
            <el-form-item :label="$t('userInfo.权限设置（可多选）')">
              <div class="selectAll">
                <div class="btn mr10" @click="selectAll(1)">
                  {{ $t("userInfo.全选") }}
                </div>
                <div class="btn" @click="selectAll(0)">
                  {{ $t("userInfo.取消全选") }}
                </div>
              </div>
              <div class="box">
                <div class="cell" v-for="item in list" :key="item.id">
                  <div class="head" @click="togglePermission(item.id)">
                    <span>{{ item.label }}</span>
                    <i
                      class="iconfont"
                      :class="item.value ? 'icon-up1' : 'icon-down1'"
                    ></i>
                  </div>
                  <div class="list" v-show="item.value">
                    <div
                      class="item"
                      v-for="ele in item.permissions"
                      :key="ele.name"
                    >
                      <i
                        class="iconfont pointer mr5"
                        :class="[
                          chooseArr.includes(ele.code)
                            ? 'icon-box'
                            : 'icon-box1',
                        ]"
                        @click="toCheck(ele)"
                      ></i>
                      <span>{{ ele.name }}</span>
                      <el-tooltip placement="top" popper-class="api-tooltip">
                        <div slot="content">
                          <div class="contentBox">
                            <div class="title">{{ ele.name }}</div>
                            <div class="text">
                              {{ ele.description }}
                            </div>
                            <!-- <div class="btn">{{ $t("userInfo.好的") }}</div> -->
                          </div>
                        </div>
                        <i class="iconfont icon-warning1 tips"></i>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </el-form-item>
            <el-form-item
              prop="bindIp"
              :label="
                $t('userInfo.绑定IP地址(选填，每个密钥最多绑定20个IP地址)')
              "
            >
              <el-input
                v-model="formData.bindIp"
                type="textarea"
                :rows="4"
                autocomplete="off"
                :placeholder="
                  $t(
                    'userInfo.单个地址直接填写，多个地址用英文（或半角）逗号隔开'
                  )
                "
              ></el-input>
            </el-form-item>
          </el-form>
        </div>
      </template>

      <template #dia_footer>
        <el-button
          type="primary"
          style="width: 100%"
          @click="handleVerfyNext"
          >{{ $t("userInfo.确认") }}</el-button
        >
      </template>
    </common-modal>
  </div>
</template>

<script>
import CommonModal from "@/components/commonModal/index.vue";
export default {
  name: "EditApi",
  components: {
    CommonModal,
  },
  props: {
    isShow: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default: "编辑API",
    },
    permList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    const validCode = (rule, value, callback) => {
      const reg =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[~!@#$%^&*_\-+=`|\\(){}[\]:;"'<>?,./])[^\\s\n]{8,32}$/;
      if (!value) {
        callback(new Error(this.$t("userInfo.口令密码不能为空")));
      } else {
        if (value.length < 8 || value.length > 32) {
          callback(
            new Error(
              this.$t(
                "userInfo.请输入8-32位字符，必须包含大写字母，小写字母，数字及特殊符号"
              )
            )
          );
        } else {
          if (reg.test(value)) {
            callback();
          } else {
            callback(
              new Error(
                this.$t(
                  "userInfo.请输入8-32位字符，必须包含大写字母，小写字母，数字及特殊符号"
                )
              )
            );
          }
        }
      }
    };
    return {
      // activeItem: ["1"],
      chooseArr: [],
      submitParams: ["1"],
      formData: {
        password: "",
      },
      // qxList: [
      //   {
      //     type: "1",
      //     name: "只读",
      //   },
      //   {
      //     type: "2",
      //     name: "交易",
      //   },
      // ],
      rules: {
        remark: [
          {
            required: true,
            message: this.$t("userInfo.备注不能为空"),
            trigger: "change",
          },
        ],
        password: [{ required: true, validator: validCode, trigger: "change" }],
      },
      list: [],
    };
  },
  methods: {
    getFormData(row) {
      this.formData = row;
      const apiPermsArr = [];
      if (row.apiPerms?.length) {
        row.apiPerms.forEach((item) => {
          apiPermsArr.push(item.type);
        });
        this.chooseArr = apiPermsArr;
      }
    },
    //全选/取消全选
    selectAll(type) {
      let chooseArr = [];
      if (type) {
        this.list.forEach((item) => {
          item.permissions.forEach((ele) => {
            chooseArr.push(ele.code);
          });
        });
      }
      this.chooseArr = chooseArr;
      this.submitParams = chooseArr;
    },
    togglePermission(id) {
      this.list.forEach((item, index) => {
        if (id == index) {
          item.value = !item.value;
        }
      });
    },
    toCheck(row) {
      console.log(row);
      let index = this.chooseArr.indexOf(row.code);
      if (index != -1) {
        this.chooseArr.splice(index, 1);
      } else {
        this.chooseArr.push(row.code);
      }

      this.submitParams = this.chooseArr;
    },
    // 验证下一步
    handleVerfyNext() {
      const reg =
        /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
      if (this.formData.bindIp) {
        const arr = this.formData.bindIp.split(",");
        const newArr = [];
        const regArr = [];
        for (var i = 0; i < arr.length; i++) {
          if (reg.test(arr[i])) {
            newArr.push(arr[i]);
          } else {
            //  return this.$message.warning(this.$t("userInfo.IP地址输入有误，请重输"));
            regArr.push(arr[i]);
          }
        }
        if (regArr.length) {
          this.$message.warning(this.$t("userInfo.IP地址输入有误，请重输"));
          return;
        }
        if (newArr.length) {
          if (newArr.length > 20) {
            this.$message.warning(
              this.$t("userInfo.每个API密钥最多只可绑定20个IP地址")
            );
            return;
          } else {
            console.log("if");
            this.$refs["verifyForm"].validate((valid) => {
              if (valid) {
                const params = {
                  remark: this.formData.remark,
                  password: this.$getEncryptCode(this.formData.password),
                  permissionsTypes: this.submitParams,
                  bindIp: this.formData.bindIp,
                };

                //将参数交给父组件提交
                if (this.submitParams.length) {
                  this.$emit("update:isShow", false);
                  this.$emit("addApiParams", params);
                } else {
                  // this.$message.warning(this.$t("userInfo.权限设置不能为空"));
                  return this.$message.warning("权限设置不能为空");
                }
              }
            });
          }
        }
      } else {
        console.log("else");
        this.$refs["verifyForm"].validate((valid) => {
          if (valid) {
            const params = {
              remark: this.formData.remark,
              password: this.$getEncryptCode(this.formData.password),
              permissionsTypes: this.submitParams,
              bindIp: this.formData.bindIp,
            };

            //将参数交给父组件提交
            if (this.submitParams.length) {
              this.$emit("update:isShow", false);
              this.$emit("addApiParams", params);
            } else {
              return this.$message.warning(
                this.$t("userInfo.权限设置不能为空")
              );
            }
          }
        });
      }
    },
    // 验证下一步
    // handleVerfyNext() {
    //   this.$refs["verifyForm"].validate((valid) => {
    //     if (valid) {
    //       const params = {
    //         remark: this.formData.remark,
    //         permissionsTypes: this.submitParams,
    //         bindIp: this.formData.bindIp,
    //         password: this.$getEncryptCode(this.formData.password),
    //       };
    //       console.log(1231564564);
    //       this.$emit("update:isShow", false);
    //       //将参数交给父组件提交
    //       this.$emit("addApiParams", params);
    //       // this.$emit("next");
    //     }
    //   });
    // },
    // 忘记密码
    forgetKl() {
      this.$emit("forget");
    },
    //初始化参数
    resetParams() {
      this.formData = {
        remark: "", //备注名
        permissionsTypes: "", //权限设置1-只读，2-交易
        password: "", //api口令
        bindIp: "", //绑定ip
      };
    },
  },
  watch: {
    permList: {
      handler(data) {
        this.list = data.map((item, index) => {
          return {
            id: index,
            value: false,
            type: item.type,
            label: item.typeName,
            permissions: item.permissions,
          };
        });
      },
      deep: true,
    },
  },
};
</script>
<style lang="scss" scoped>
// 表格padding
.form-common {
  height: 500px;
  overflow-y: scroll;
  padding: 0 30px;
  .qx-set {
    width: 100%;
    height: 30px;
    display: flex;
    align-items: center;
    li {
      width: 160px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      background: rgba(244, 245, 247, 0.8);
      border-radius: 6px;
      border: 1px solid #8992a6;
      margin-right: 25px;
      font-size: 14px;
      font-family: PingFangSC-Medium, PingFang SC;
      font-weight: 500;
      color: #8992a6;
      cursor: pointer;
    }

    .item-active {
      background: rgba(81, 113, 255, 0.1);
      border-radius: 6px;
      border: 1px solid $colorB;
      color: $colorB;
    }
  }
  .selectAll {
    position: absolute;
    top: -50px;
    right: 0;
    display: flex;
    align-items: center;
    font-size: 16px;
    .btn {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 90px;
      padding: 0 15px;
      height: 35px;
      color: var(--theme-color);
      background-color: #e6f9f3;
      border-radius: 100px;
      cursor: pointer;
      &:hover {
        background-color: #d5f7ec;
      }
    }
  }
}

.forget-api {
  position: absolute;
  top: -50px;
  right: 0px;
  color: $colorB;
  font-size: 16px;
  cursor: pointer;
}

.box {
  .cell {
    width: 100%;
    padding: 1px 10px;
    border-radius: 6px;
    background-color: #f4f5f7;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0px;
    }
    .head {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 14px;
      color: #333333;
      .iconfont {
        font-size: 26px;
        color: #272636;
        cursor: pointer;
      }
    }
    .list {
      display: flex;
      align-items: center;
      // justify-content: space-around;
      flex-wrap: wrap;
      .item {
        display: flex;
        align-items: center;
        margin-right: 30px;
        min-width: 140px;
        .iconfont {
          font-size: 12px;
          &.icon-box {
            color: var(--theme-color);
          }
        }
        .tips {
          font-size: 20px;
          color: #8992a6;
          cursor: pointer;
          &:hover {
            color: lighten(#8992a6, 10%);
          }
        }
      }
    }
  }
}

::v-deep .el-form-item__label {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #00082d;
}
</style>
