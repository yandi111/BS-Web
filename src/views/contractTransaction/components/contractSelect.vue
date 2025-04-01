<template>
  <div class="contract-select">
    <el-input
      placeholder="数量"
      v-model.trim="formInline.amount"
      @input.native="(e) => changeInputPay(e)"
    >
      <div slot="suffix" @click="popperShow = !popperShow">
        <el-popover
          :append-to-body="false"
          placement="bottom-end"
          width="100"
          :offset="5"
          trigger="click"
          :visible-arrow="true"
        >
          <div class="popper-content">
            <ul v-if="filterLegalList.length > 0">
              <li
                v-for="item in filterLegalList"
                :key="item.id"
                @click="handleChoose(item)"
                :style="{
                  'background-color':
                    item.id === formInline.legalTenderId ? '#EDF1FF' : '',
                }"
              >
                <div
                  style="
                    display: inline-block;
                    width: 25px;
                    height: 25px;
                    line-height: 25px;
                    vertical-align: middle;
                    margin-right: 10px;
                  "
                >
                  <img
                    src="@/assets/images/no-pay.png"
                    style="width: 100%; height: 100%"
                    alt=""
                  />
                </div>
                {{ item.name }}
              </li>
            </ul>
            <div v-else class="no-data">暂无数据</div>
          </div>
          <div slot="reference" class="prefix-content">
            <!-- <img src="@/assets/images/apply-success.png" alt="" style="width: 24px;height: 24px"> -->
            <div class="text">{{ convertAssetName }}</div>
            <i
              :class="[
                'custom-icon',
                popperShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom',
              ]"
            ></i>
          </div>
        </el-popover>
      </div>
    </el-input>
  </div>
</template>

<script>
export default {
  name: "contractSelect",
  data() {
    return {
      popperShow: false,
      convertAssetName: "USDT",
      formInline: {
        amount: "",
        legalTenderId: 1,
      },
      filterLegalList: [],
    };
  },
  methods: {
    changeInputPay(e) {
      console.log("e", e);
    },
    handleChoose(item) {
      console.log("item", item);
    },
  },
};
</script>

<style lang="scss" scoped>
.contract-select {
  .prefix-content {
    height: 40px;
    width: 85px;

    .custom-icon {
      font-size: 20px;
    }
  }
}
</style>