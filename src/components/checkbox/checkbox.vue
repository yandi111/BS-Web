<template>
  <div class="check-box" @click="handleClick">
    <div class="check" :class="isChecked ? 'check-active' : ''">
      <div class="checked" v-show="isChecked"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Checkbox",
  data() {
    return {
      isChecked: false,
    };
  },
  methods: {
    handleClick() {
      this.isChecked = !this.isChecked;
      this.$emit("change", this.isChecked);
    },
  },
};
</script>

<style lang="scss" scoped>
.check-box {
  .check {
    width: 16px;
    height: 16px;
    border: 1px solid #8992a6;
    border-radius: 3px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    .checked {
      width: 10px;
      height: 10px;
      background-color: #90ff00;
      border-radius: 3px;
    }
  }
  .check-active {
    border: 1px solid #90ff00;
  }
}
</style>