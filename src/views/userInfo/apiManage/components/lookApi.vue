<!-- 资金验证表单 -->
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
          <el-form :model="formData" label-position="top">
            <el-form-item
              prop="apiKey"
              :label="$t('userInfo.访问密钥(API Key)')"
            >
              <el-input v-model="addApiList.apiKey" readonly autocomplete="off">
                <div slot="suffix" @click="copy(1, addApiList.apiKey)">
                  <svg-icon
                    iconClass="copy"
                    style="padding-right: 10px"
                  ></svg-icon>
                </div>
              </el-input>
            </el-form-item>
            <el-form-item
              prop="apiSecret"
              :label="$t('userInfo.私密密钥(Secret Key)')"
            >
              <el-input
                v-model="addApiList.apiSecret"
                readonly
                autocomplete="off"
              >
                <div slot="suffix" @click="copy(2, addApiList.apiSecret)">
                  <svg-icon
                    iconClass="copy"
                    style="padding-right: 10px"
                  ></svg-icon>
                </div>
              </el-input>
            </el-form-item>
            <el-form-item prop="bindIp" :label="$t('userInfo.绑定IP地址')">
              <el-input
                disabled
                type="textarea"
                autosize
                placeholder="--"
                v-model="addApiList.bindIp"
              >
              </el-input>
              <!-- <div class="form-ip">{{ addApiList.bindIp }}</div> -->
            </el-form-item>
            <el-form-item :label="$t('userInfo.权限')">
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
              <!-- <div ></div>
              {{ addApiList.apiPerms }}

              <div
                class="form-item"
                v-if="
                  addApiList.apiPerms.length == 1 &&
                  addApiList.apiPerms[0].type == '1'
                "
              >
              {{ $t("userInfo.只读") }}
              </div>
              <div
                class="form-item"
                v-if="
                  addApiList.apiPerms.length == 1 &&
                  addApiList.apiPerms[0].type == '2'
                "
              >
                {{ $t("userInfo.交易") }}
              </div>
              <div class="form-item" v-if="addApiList.apiPerms.length == 2">
                {{ $t("userInfo.只读 | 交易") }}
              </div> -->
            </el-form-item>
            <el-form-item prop="qrCode">
              <div style="width: 80px; height: 80px">
                <img
                  :src="addApiList.qrCode"
                  style="width: 100%; height: 100%"
                  alt=""
                />
              </div>
            </el-form-item>
          </el-form>
        </div>
      </template>

      <template #dia_footer>
        <el-button type="primary" style="width: 100%" @click="handleVerfyNext">
          {{ $t("userInfo.确认") }}
        </el-button>
      </template>
    </common-modal>
  </div>
</template>

<script>
import CommonModal from "@/components/commonModal/index.vue";
export default {
  name: "",
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
      default: "查看API",
    },
    addApiList: {
      type: Object,
      default: () => {},
    },
    permList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      formData: {},
      list:[],
      chooseArr: [],
    };
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
  mounted() {},
  methods: {
    //展示选中数据处理
    getFormData(row) {
    console.log(row);
      this.formData = row;
      const apiPermsArr = [];
      if (row.apiPerms?.length) {
        row.apiPerms.forEach((item) => {
          apiPermsArr.push(item.type);
        });
        this.chooseArr = apiPermsArr;
      }
      if(row.permissionsTypes?.length){
        row.permissionsTypes.forEach((item) => {
          apiPermsArr.push(item);
        });
        this.chooseArr = apiPermsArr;
      }
    },
    togglePermission(id) {
      this.list.forEach((item, index) => {
        if (id == index) {
          item.value = !item.value;
        }
      });
    },
    toCheck(item) {
      let index = this.chooseArr.indexOf(item.code);
      if (index != -1) {
        this.chooseArr.splice(index, 1);
      } else {
        this.chooseArr.push(item.code);
      }

      if (index != -1) {
        this.submitParams.splice(index, 1);
      } else {
        this.submitParams.push(item.code);
      }
      console.log("prompt", this.submitParams);
    },
    // 验证下一步
    handleVerfyNext() {
      this.$emit("update:isShow", false);
      this.$emit("next");
    },
    //复制功能
    copy(index, val) {
      if (index === 1) {
        this.$copyText(val).then(() => {
          this.$message.success(this.$t("userInfo.复制成功"));
        });
      } else if (index === 2) {
        this.$copyText(val).then(() => {
          this.$message.success(this.$t("userInfo.复制成功"));
        });
      }
    },
  },
};
</script>
<style lang="scss" scoped>
// 表格padding
.form-common {
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
  .form-item {
    height: 45px;
    border-radius: 6px;
    border: 1px solid #e1e1e1;
    padding-left: 10px;
    font-size: 16px;
    color: #333;
  }
}

::v-deep .el-form-item__label {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC;
  font-weight: 500;
  color: #00082d;
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
</style>
