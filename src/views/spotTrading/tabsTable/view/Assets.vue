<!-- 资产 -->
<script>
import {GetUserSpotAllAssets, GetUserSpotAssets} from "@/api/spotTrading";
import BigNumberUtils from '@/utils/format'
import Profit from "@/views/spotTrading/tabsTable/components/Profit.vue";

const bigNumber = new BigNumberUtils()
export default {
 components: {Profit},
 data() {
  return {
   list: []
  }
 },
 created() {
  this.getAllAssets()
 },
 methods: {
  // 获取用户总资产
  getAllAssets() {
   Promise.try(async () => {
    return await GetUserSpotAllAssets()
   }).then(res => {
    this.getList()
   }).catch(err => {})
  },

  // 获取列表
  getList() {
   Promise.try(async () => {
    return await GetUserSpotAssets()
   }).then(res => {
    this.list = res.data
   }).catch(err => {})
  }
 }
}
</script>

<template>
 <div class="table">
  <el-table :data="list" :border="false">
   <el-table-column :label="$t('lang_43')" prop="coinName" align="left" />
   <el-table-column :label="$t('lang_1093')" prop="amount" align="left" />
   <el-table-column :label="$t('spot_2')" align="left">
    <template slot-scope="{row}">
     {{row.averagePurchasePrice || '--'}}
    </template>
   </el-table-column>
   <el-table-column align="left">
    <template slot="header">
     <el-tooltip class="item" effect="dark" :content="$t('spot_3')" placement="top">
      <span>{{$t('spot_4',['USDT'])}}</span>
     </el-tooltip>
    </template>
    <template slot-scope="{row}">
     <p :class="+(row.profitOrLossPercentage || 0) ? 'add' : 'reduce'">{{row.profitOrLoss || 0.00}}({{row.profitOrLossPercentage || 0.00}}%)</p>
    </template>
   </el-table-column>
   <el-table-column align="left">
    <template slot="header">
     <el-tooltip class="item" effect="dark" :content="$t('spot_5')" placement="top">
      <span>{{$t('spot_6',['USDT'])}}</span>
     </el-tooltip>
    </template>
    <template slot-scope="{row}">
     {{ row.realizedProfitAndLoss || '--' }}
    </template>
   </el-table-column>
   <el-table-column :label="$t('spot_7')" align="left">
    <template slot-scope="{row}">
     {{row.amountCny || '--'}}
    </template>
   </el-table-column>
   <el-table-column :label="$t('lang_1077')" align="left">
    <template slot-scope="{row}">
     {{row.takeProfitPrice || 0}}/{{row.stopLossPrice || 0}}
    </template>
   </el-table-column>
   <el-table-column :label="$t('lang_1290')" align="left">
    <template slot-scope="{row}">
     <el-link type="success" @click="$refs.profit.onOpen">{{$t('lang_1077')}}</el-link>
     <el-link type="success">{{$t('lang_1264')}}</el-link>
    </template>
   </el-table-column>
  </el-table>

  <Profit ref="profit" />
 </div>
</template>

<style scoped lang="scss">
.el-link {
 &:not(:last-child) {
  margin-right: 15px;
 }
 ::v-deep {
  span {
   font: {
    size: 14px
   }
  }
 }
}
</style>