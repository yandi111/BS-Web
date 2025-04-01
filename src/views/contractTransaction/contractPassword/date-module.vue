<template>
  <div class="date-module mt10">
    <div class="label mb15">{{ $t("contractPass.口令失效时间") }}</div>
    <div
      class="datePick df aic jb"
      @mouseenter="onMounseenter"
      @mouseleave="onMouseleave"
    >
      <div class="block df">
        <div class="df aic pl10" v-if="!isShow && !failureTimeMillis">
          <span class="label">{{ $t("contractPass.请选择时间") }}</span>
        </div>
        <div
          class="datebox df aic jb"
          v-if="isShow || failureTimeMillis"
          ref="pick"
        >
          <el-date-picker
            popper-class="my-dete"
            v-model="failureTimeMillis"
            type="datetime"
            align="middle"
            :clearable="false"
            :placeholder="$t('contractPass.口令失效日期')"
            value-format="timestamp"
            @focus="toggle = true"
            @blur="onBlur"
            @change="change"
          >
          </el-date-picker>
        </div>
      </div>
      <i class="iconfont" :class="toggle ? 'icon-up' : 'icon-down'"></i>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      toggle: false,
      isShow: false,
      date: {
        startTime: "",
        endTime: "",
      },
      failureTimeMillis: "",
    };
  },
  methods: {
    onMounseenter() {
      this.isShow = true;
    },
    onMouseleave() {
      if (!this.failureTimeMillis) {
        this.isShow = this.toggle ? true : false;
      }
    },
    onBlur() {
      if (this.isShow) {
        this.toggle = true;
      }
    },
    change() {
      setTimeout(() => {
        this.toggle = false;
      }, 0);
    },
    close(e) {
      const dom = this.$refs["pick"];
      if (dom) {
        if (dom.contains(e.target) == false) {
          this.toggle = false;
          this.isShow = false;
        }
      }
    },
  },
  watch: {
    failureTimeMillis: {
      handler(newValue) {
        this.$emit("onDate", { failureTimeMillis: newValue });
      },
    },
  },
  mounted() {
    // document.addEventListener("click", (e) => {
    //   this.close(e);
    // });
  },
};
</script>

<style lang="scss">
.my-dete {
  background-color: var(--main-bg);
  color: var(--main-text-color);
  .el-date-picker__time-header {
    border: 1px solid var(--pass-datepick-gapline-color);
    .el-input--small .el-input__inner {
      background-color: inherit;
      border: 1px solid var(--pass-datepick-gapline-color);
      color: var(--main-text-color);
    }
    .el-time-panel {
      background-color: var(--main-bg);
      border: 1px solid var(--pass-datepick-gapline-color);
      .el-time-panel__content {
        .el-time-spinner {
          background-color: var(--main-bg);
          // background-color: red;
        }
        .el-time-spinner__item {
          color: var(--main-text-color);
          &:hover {
            background-color: var(--select-hover);
          }
          &.active {
            color: var(--theme-color);
          }
        }
      }
      .el-time-panel__footer {
        border-top: 1px solid var(--pass-datepick-gapline-color);
        .el-time-panel__btn {
          color: var(--main-text-color);
          &.confirm {
            color: var(--theme-color);
          }
        }
      }
    }
  }
  .el-date-picker__header {
    color: var(--main-text-color);
    button {
      color: inherit;
    }
    span {
      color: inherit;
    }
  }
  .el-date-table th {
    border-bottom: 1px solid var(--pass-datepick-gapline-color);
  }
  .el-picker-panel__footer {
    border-top: 1px solid var(--pass-datepick-gapline-color);
    background-color: inherit;
    .is-plain {
      color: var(--main-text-color);
      border: 1px solid var(--pass-datepick-gapline-color);
      background-color: inherit;
    }
  }
}
</style>

<style lang="scss" scoped>
.label {
  font-size: 14px;
  color: #96a2b2;
}
.datePick {
  position: relative;
  height: 40px;
  padding-right: 15px;
  border-radius: 6px;
  background-color: var(--pass-pricebox-bg);
  cursor: pointer;
  z-index: 1000;
  .label {
    color: var(--main-text-color);
  }
  .iconfont {
    font-size: 22px;
    color: #96a2b2;
  }
  .datebox {
    width: 200px;
    background-color: inherit;
    ::v-deep .el-input__inner {
      width: 200px;
      padding-right: 0;
      background-color: inherit;
      border: none;
      color: var(--main-text-color);
    }
    ::v-deep .el-icon-time:before {
      font-family: "iconfont";
      content: "\e634";
      font-size: 14px;
      color: #96a2b2;
    }
  }
}
</style>
