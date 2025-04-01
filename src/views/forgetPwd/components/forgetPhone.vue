<template>
  <div class="gate-form">
    <el-form :model="formData" :rules="rules" ref="ruleForm">
      <el-form-item prop="phone">
        <!-- <el-input v-model="formData.phone" autocomplete="off" class="input-with-select login-input" placeholder="请输入您注册的手机号码">
          <el-select v-model="formData.phoneArea" slot="prefix" placeholder="请选择" size="small">
            <el-option v-for="(item, index) in phoneAreaList" :key="index" :label="item.value" :value="item.value">
              <span style="float: left">{{ item.label }}</span>
              <span style="float: right; color: #8492a6; font-size: 13px">{{ item.value }}</span>
            </el-option>
          </el-select>
        </el-input> -->
        <div class="phone">
          <div class="select" @click.stop="handleCode">
            <div class="select-code">
              <div>{{ areaCode }}</div>
              <div class="select-icon">
                <i
                  :class="codeShow ? 'el-icon-arrow-up' : 'el-icon-arrow-down'"
                ></i>
              </div>
            </div>
          </div>
          <div class="mid"></div>
          <div class="phone-input">
            <el-input
              v-model="formData.phone"
              :placeholder="$t('loginRegister.请输入手机号码')"
            ></el-input>
          </div>
        </div>
        <div class="phone-list" v-if="codeShow">
          <div
            class="item-code"
            :class="phoneAreaList.length > 8 ? 'code-active' : ''"
          >
            <div
              class="code-list"
              v-for="(item, index) in phoneAreaList"
              :key="index"
              @click.stop="handleItem(item)"
            >
              <span class="label">{{ item.label }}</span>
              <span class="value">{{ item.value }}</span>
            </div>
          </div>
        </div>
      </el-form-item>
    </el-form>
    <el-button type="primary" class="login-btn" @click="handleNext"
      >{{$t("loginRegister.下一步")}}</el-button
    >
  </div>
</template>

<script>
import { countryList } from "@/api/user";
export default {
  name: "ForgetPhone",
  data() {
    // 手机号验证
    const validPhone = (rule, value, callback) => {
      let reg = /^[0-9]{11}$/;
      if (!value) {
        callback(new Error(this.$t('loginRegister.请输入手机号码(提示)')));
      } else{
        callback();
      }
      // else {
      //   if (reg.test(value)) {
      //     callback();
      //   } else {
      //     callback(new Error(this.$t('loginRegister.请输入正确的手机格式')));
      //   }
      // }
    };

    return {
      formData: {
        phone: "",
        phoneArea: "+86",
      },
      rules: {
        phone: [{ required: true, validator: validPhone, trigger: "change" }],
      },
      phoneAreaList: [],
      //验证---------------
      codeShow: false,
      areaCode: "+86",
    };
  },
  mounted() {
    document.addEventListener("click", () => {
      this.codeShow = false;
    });
    this.getCountryList();
  },
  methods: {
    // 下一步
    handleNext() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          this.$emit("submit", "ForgetCode", this.formData);
        }
      });
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
    // 验证-------------
    handleCode() {
      this.codeShow = !this.codeShow;
    },
    handleItem(item) {
      this.areaCode = item.value;
      console.log('item.value',item.value);
      this.formData.phoneArea = this.areaCode;
      this.codeShow = false;
    },
    // 验证-------------
  },
};
</script>

<style lang="scss" scoped>
.el-select {
  width: 105px;
}
::v-deep .el-input .el-input__inner::placeholder {
  font-size: 16px;
  color: #69798d !important;
}
::v-deep .el-input__inner {
  background: #f5f7fa;
  border: 1px solid #f5f7fa;
  color: #333333;
  font-size: 14px;
}
::v-deep .el-input-group__prepend {
  background-color: #fff !important;
}

.el-select {
  ::v-deep .el-input__inner {
    border: none;
    height: 50px;
    margin-top: 2px;
  }
}

::v-deep .el-input--prefix .el-input__inner {
  padding-left: 20px;
}

::v-deep .input-with-select {
  > .el-input__inner {
    padding-left: 112px;
  }
}

::v-deep .el-form-item__label {
  font-size: 22px;
  font-family: PingFang SC;
  font-weight: 500;
  color: #040a1a;
}

.login-btn {
  margin-top: 25px;
  font-size: 20px;
}

// 验证
.phone {
  display: flex;
  .select {
    flex: 1;
    height: 55px;
    line-height: 55px;
    background: #f5f7fa;
    border-radius: 6px;
    .select-code {
      display: flex;
      justify-content: space-between;
      padding: 0 10px;
      .select-icon {
        padding-left: 5px;
      }
    }
  }
  .mid {
    width: 10px;
  }
  .phone-input {
    width: 350px;
  }
}
.phone-list {
  position: relative;
  z-index: 99;
  .item-code {
    position: absolute;
    left: 0;
    top: 10px;
    width: 100%;
    background-color: #fff;
    box-shadow: 0px 0px 4px 0px rgba(229, 232, 245, 0.5);
    border-radius: 6px;
    .code-list {
      width: 100%;
      display: flex;
      justify-content: space-between;
      .label {
        padding-left: 10px;
      }
      .value {
        padding-right: 10px;
      }
      &:hover {
        background-color: #f7f7f7;
      }
    }
  }
  .code-active {
    height: 320px;
    overflow-y: scroll;
  }
}
</style>
