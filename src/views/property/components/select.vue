<template>
  <div class="card-select">
    <div class="selected" @click.stop="handleSelect">
      <div>{{ coinName }}</div>
      <div class="card-icon">
        <i :class="!selectShow ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"></i>
      </div>
    </div>
    <div class="select-list" v-show="selectShow">
      <div
        class="list-item"
        v-for="item in conversionList"
        :key="item.id"
        @click.stop="chooseItem(item)"
      >
        {{ item.coinName }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "symbolSelect",
  props: {
    conversionList: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectShow: false,
      coinName: "",
    };
  },
  mounted() {
    document.addEventListener("click", () => {
      this.selectShow = false;
    });
    this.coinName = this.conversionList[0].coinName;
  },
  methods: {
    chooseItem(item) {
      this.coinName = item.coinName;
      this.$emit("handleChoose", item);
    },
    handleSelect() {
      this.selectShow = !this.selectShow;
    },
    showFn() {
      this.selectShow = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.card-select {
  margin-left: 10px;
  font-size: $fontG;
  cursor: pointer;
  position: relative;
  .selected {
    display: flex;
    .card-icon {
      margin-left: 10px;
    }
  }
  .select-list {
    position: absolute;
    top: 30px;
    left: 50px;
    z-index: 999;
    width: 80px;
    height: 240px;
    background: #ffffff;
    box-shadow: 0px 0px 4px 0px rgba(229, 232, 245, 0.5);
    border-radius: 6px;
    overflow-y: scroll;
    .list-item {
      height: 40px;
      line-height: 40px;
      text-align: center;
      font-size: 12px;
      &:hover {
        background: #f7f7f7;
        box-shadow: 0px 0px 4px 0px rgba(229, 232, 245, 0.5);
      }
    }
  }
}
</style>