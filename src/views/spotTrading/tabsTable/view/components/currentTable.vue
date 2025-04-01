<!-- 当前委托 -->
<script>
import {GetUserNewsDelegation} from "@/api/spotTrading";
import dayjs from "dayjs";

export default {
 props: {
  commissionType: {
   type: Number,
   default: 1
  }
 },
 data() {
  return {
   ruleForm: {
    coinId: '',
    startTime: dayjs().subtract(50, 'year').format('YYYY-MM-DD HH:mm:ss'),
    endTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
    type: 0,
    currentPage: 1,
    pageSize: 20,
   },

   list: []
  }
 },
 created() {
  console.log(234234)
  this.getList()
 },
 methods: {
  // 查询限价列表
  async getList() {
   Promise.try(async () => {
    return await GetUserNewsDelegation({
     ...this.ruleForm,
     commissionType: this.commissionType
    })
   }).then(res => {
    console.log(res, 7897987)
   }).catch(err => { })
  }
 }
}
</script>
<template>
 <el-table :data="list">
  <el-table-column :label="$t('spot_11')">
   <template slot-scope="{row}">
    {{ row.pair }}<i :class="[row.orderType === 1 ? 'buy' : 'sell', 'type']">{{ row.orderType === 1 ? $t('lang_232') : $t('lang_235') }}</i>
   </template>
  </el-table-column>
  <el-table-column :label="$t('lang_1021')" prop="orderPirce" />
 </el-table>
</template>
<style lang="sass" scoped></style>