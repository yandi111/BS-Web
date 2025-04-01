<template>
  <div class="my-input">
    <input
      type="text"
      :value="value"
      @input="handleChange"
      :placeholder="placeholder"
      @blur="changeValue"
    />
  </div>
</template>

<script>
export default {
  model: {
    event: "change",
    prop: "value",
  },
  props: {
    value: "",
    placeholder: "",
    //小数位数
    decimal: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {};
  },
  methods: {
    handleChange(e) {
      this.$emit("change", e.target.value);
    },
    handlingParameterTypes(value) {
      if (!this.value) return;
      let val = value
        .replace(/[^\d.]/g, "")
        .replace(/\.{2,}/g, "")
        .replace(".", "$#$")
        .replace(/\./g, "")
        .replace("$#$", ".")
        .replace(/^(\-)*(\d+)\.(\d\d).*s/, "$1$2.$3")
        .replace(/^\./g, "");
      let reg = /\d/;

      if (val.charAt(0) == "0" && val.charAt(1) && reg.test(val.charAt(1))) {
        val = val.slice(1, val.length);
      }
      let result = val;

      //限制小数位数
      if (this.decimal > 0) {
        let dotIndex = result.indexOf(".");
        if (dotIndex != -1) {
          result = val.slice(0, dotIndex + 1 + this.decimal);
        }
      }
      return result;
    },
    changeValue() {
      //remove last point
      if (this.value && this.value.charAt(this.value.length - 1) == ".") {
        let res = this.value.slice(0, this.value.length - 1);
        this.$emit("change", res);
      }
    },
  },
  watch: {
    value(value) {
      let res = this.handlingParameterTypes(value);
      this.$emit("change", res);
    },
  },
};
</script>

<style lang="scss" scoped>
.my-input {
  width: 100%;
  height: 100%;
  input {
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    padding-left: 5px;
  }
}
</style>
