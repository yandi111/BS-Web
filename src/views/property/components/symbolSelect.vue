<template>
  <div class="select">
    <el-select
      v-if="coinList.length"
      v-model="symbolVal"
      :placeholder="coinList[0].coinName"
      @change="onChange"
    >
      <el-option-group>
        <div class="search">
          <el-input
            placeholder="搜索"
            prefix-icon="el-icon-search"
            v-model="searchVal"
          >
          </el-input>
        </div>
        <el-option
          v-for="item in coinList"
          :key="item.id"
          :label="item.coinName"
          :value="item.id"
        >
          <div class="optionList">
            <img :src="item.iconUrl" alt="" />
            {{ item.coinName }}
          </div>
        </el-option>
      </el-option-group>
    </el-select>
    <img class="img" v-if="coinList.length" :src="coinList[0].iconUrl" alt="" />
    <img v-if="optionImg" class="img" :src="optionImg" alt="" />
  </div>
</template>

<script>
export default {
  name: "SymbolSelect",
  props: {
    inputVal: {
      type: String,
      default: "",
    },
    optionImg: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    coinList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      symbolVal: "",
      searchVal: "",
      //搜索功能
      tempData: [],
    };
  },
  watch: {
    searchVal(newVal, oldVal) {
      if (!newVal) {
        this.handleInit();
      }
      if (newVal.trim()) {
        this.handleFilter(newVal.trim());
      }
    },
  },
  created() {
    this.tempData = this.coinList;
  },
  methods: {
    //选择币种
    onChange(val) {
      this.coinList.forEach((item) => {
        if (item.id === val) {
          this.optionImg = item.iconUrl;
        }
      });
    },
    //搜索
    handleFilter(val) {
      this.coinList = this.coinList.filter((v) =>
        v.coinName.toLowerCase().includes(val)
      );
    },
    handleInit() {
      this.coinList = this.tempData;
    },
  },
};
</script>

<style lang="scss" scoped>
.select {
  position: relative;
  margin-top: 15px;
  .img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    position: absolute;
    left: 20px;
    top: 15px;
  }
  .el-select {
    ::v-deep   .el-input--suffix .el-input__inner {
      padding-left: 60px;
      font-size: 16px;
    }
  }
}
.optionList {
  display: flex;
  align-items: center;
  img {
    width: 20px;
    height: 20px;
    margin-right: 10px;
    border-radius: 50%;
  }
}
.search {
  padding: 15px 20px 5px 20px;
}
</style>
