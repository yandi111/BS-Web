<template>
  <div class="walletHistory">
    <div class="title">
      <div @click="onCapitalAccount">
        <i class="el-icon-arrow-left"></i>
        <span>{{ $t("property.钱包历史") }}</span>
      </div>
    </div>
    <div class="content">
      <el-form :inline="true" label-position="top">
        <el-form-item
          :label="$t('property.币种')"
          v-if="activeIndex !== 7 && activeIndex !== 8"
        >
          <el-select
            v-model="paramsListVal.coinVal"
            @change="coinChange"
            :placeholder="$t('property.请选择币种')"
          >
            <el-option
              v-for="item in coinList"
              :key="item.id"
              :label="item.coinName"
              :value="item.coinId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item
          :label="$t('property.状态')"
          v-if="activeIndex === 1 || activeIndex === 2"
        >
          <el-select
            v-model="paramsListVal.statusVal"
            @change="handleStatus"
            :placeholder="$t('property.请选择状态')"
          >
            <el-option
              v-for="item in statusList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('property.类型')">
          <el-select
            popper-class="remove-scrollbar"
            v-model="paramsListVal.typeVal"
            @change="changeType"
            :placeholder="$t('property.请选择类型')"
          >
            <el-option
              v-for="item in typeList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="$t('property.时间')">
          <el-select
            v-model="paramsListVal.timeVal"
            @change="handleDate"
            :placeholder="$t('property.请选择时间')"
          >
            <el-option
              v-for="item in timeList"
              :key="item.id"
              :label="item.label"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div class="border"></div>
    <!-- 充币表格 -->
    <div class="table" v-if="activeIndex === 1">
      <el-table :data="depositData" style="width: 100%">
        <el-table-column :label="$t('property.时间')">
          <template slot-scope="scope">
            <span>{{ $formatTime(scope.row.confirmTimeTsLong) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.币种')" prop="coinName">
        </el-table-column>
        <el-table-column :label="$t('property.类型')">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 1">{{ $t("property.充币") }}</span>
            <span v-if="scope.row.type === 2">{{ $t("property.提币") }}</span>
            <span></span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.账户类型')">
          <template slot-scope="scope">
            <span v-if="scope.row.accountType === 1">{{
              $t("property.现货账户")
            }}</span>
            <span v-if="scope.row.accountType === 2">{{
              $t("property.资金账户")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.数量')" prop="amount">
        </el-table-column>
        <el-table-column :label="$t('property.状态')">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">{{
              $t("property.已完成")
            }}</span>
            <span v-if="scope.row.status === 10">{{
              $t("property.审核中")
            }}</span>
            <span v-if="scope.row.status === 20">{{
              $t("property.审核失败")
            }}</span>
            <span v-if="scope.row.status === 30">{{
              $t("property.待打包")
            }}</span>
            <span v-if="scope.row.status === 40">{{
              $t("property.确认中")
            }}</span>
            <span v-if="scope.row.status === 50">{{
              $t("property.已确认")
            }}</span>
            <span v-if="scope.row.status === 60">{{
              $t("property.确认失败，待重试")
            }}</span>
            <span v-if="scope.row.status === 70">{{
              $t("property.充值未上账")
            }}</span>
            <span v-if="scope.row.status === 80">{{
              $t("property.充值已上帐")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.操作')">
          <template slot-scope="scope">
            <span class="detailBtn" @click="historyDetail(scope.row)">{{
              $t("property.详情")
            }}</span>
          </template>
        </el-table-column>
        <template slot="empty">
          <my-empty></my-empty>
        </template>
      </el-table>
      <div class="block" v-if="depositTotal > 0">
        <el-pagination
          background
          @current-change="onCurrentChange"
          :current-page.sync="currentPapams.pageNum"
          :page-size="currentPapams.pageSize"
          layout="->, prev, pager, next, jumper"
          :total="depositTotal"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 提币表格 -->
    <div class="table" v-if="activeIndex === 2">
      <el-table :data="withdrawData" style="width: 100%">
        <el-table-column :label="$t('property.时间')">
          <template slot-scope="scope">
            <span>{{ $formatTime(scope.row.confirmTimeTsLong) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.币种')" prop="coinName">
        </el-table-column>
        <el-table-column :label="$t('property.类型')">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 1">{{ $t("property.充币") }}</span>
            <span v-if="scope.row.type === 2">{{ $t("property.提币") }}</span>
            <span></span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.账户类型')">
          <template slot-scope="scope">
            <span v-if="scope.row.accountType === 1">{{
              $t("property.现货账户")
            }}</span>
            <span v-if="scope.row.accountType === 2">{{
              $t("property.资金账户")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.数量')" prop="amount">
        </el-table-column>
        <el-table-column :label="$t('property.状态')">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">{{
              $t("property.已完成")
            }}</span>
            <span v-if="scope.row.status === 10">{{
              $t("property.审核中")
            }}</span>
            <span v-if="scope.row.status === 20">{{
              $t("property.审核失败")
            }}</span>
            <span v-if="scope.row.status === 30">{{
              $t("property.待打包")
            }}</span>
            <span v-if="scope.row.status === 40">{{
              $t("property.确认中")
            }}</span>
            <span v-if="scope.row.status === 50">{{
              $t("property.已确认")
            }}</span>
            <span v-if="scope.row.status === 60">{{
              $t("property.确认失败，待重试")
            }}</span>
            <span v-if="scope.row.status === 70">{{
              $t("property.充值未上账")
            }}</span>
            <span v-if="scope.row.status === 80">{{
              $t("property.充值已上帐")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.操作')">
          <template slot-scope="scope">
            <span class="detailBtn" @click="historyDetail(scope.row)">{{
              $t("property.详情")
            }}</span>
          </template>
        </el-table-column>
        <template slot="empty">
          <my-empty></my-empty>
        </template>
      </el-table>
      <div class="block" v-if="withdrawTotal > 0">
        <el-pagination
          background
          @current-change="onCurrentChange"
          :current-page.sync="currentPapams.pageNum"
          :page-size="currentPapams.pageSize"
          layout="->, prev, pager, next, jumper"
          :total="withdrawTotal"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 划转表格 -->
    <div class="table" v-if="activeIndex === 3">
      <el-table :data="transferData" style="width: 100%">
        <el-table-column :label="$t('property.时间')">
          <template slot-scope="scope">
            <span>{{ $formatTime(scope.row.createTimeTsLong) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.币种')" prop="coinName">
        </el-table-column>
        <el-table-column :label="$t('property.类型')">
          <template>
            <span>{{ $t("property.划转") }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.转出账户')">
          <template slot-scope="scope">
            <span v-if="scope.row.fromAccountType === 1">{{
              $t("property.现货账户")
            }}</span>
            <span v-if="scope.row.fromAccountType === 2">{{
              $t("property.资金账户")
            }}</span>
            <span v-if="scope.row.fromAccountType === 3">{{
              $t("property.合约账户")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.转入账户')">
          <template slot-scope="scope">
            <span v-if="scope.row.toAccountType === 1">{{
              $t("property.现货账户")
            }}</span>
            <span v-if="scope.row.toAccountType === 2">{{
              $t("property.资金账户")
            }}</span>
            <span v-if="scope.row.toAccountType === 3">{{
              $t("property.合约账户")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.数量')" prop="amount">
        </el-table-column>
        <template slot="empty">
          <my-empty></my-empty>
        </template>
      </el-table>
      <div class="block" v-if="transferTotal > 0">
        <el-pagination
          background
          @current-change="onCurrentChange"
          :current-page.sync="transferParams.pageNum"
          :page-size="transferParams.pageSize"
          layout="->, prev, pager, next, jumper"
          :total="transferTotal"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 闪兑表格 -->
    <div class="table" v-if="activeIndex === 4">
      <el-table :data="flashData" style="width: 100%">
        <el-table-column :label="$t('property.时间')">
          <template slot-scope="scope">
            <span>{{ $formatTime(scope.row.createTimeTsLong) }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.消耗币种')" prop="fromCoinName">
        </el-table-column>
        <el-table-column :label="$t('property.获得币种')" prop="toCoinName">
        </el-table-column>
        <el-table-column :label="$t('property.类型')">
          <template slot-scope="scope">
            <span v-if="scope.row.type === 1">{{ $t("property.市价") }}</span>
            <span v-if="scope.row.type === 2">{{ $t("property.限价") }}</span>
            <span></span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.账户类型')">
          <template slot-scope="scope">
            <span v-if="scope.row.accountType === 1">{{
              $t("property.现货账户")
            }}</span>
            <span v-if="scope.row.accountType === 2">{{
              $t("property.资金账户")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.消耗数量')">
          <template slot-scope="scope">
            <span class="fromAmount">{{ scope.row.fromAmount }}</span>
            <span>{{ scope.row.fromCoinName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.汇率')" prop="rate">
        </el-table-column>
        <el-table-column :label="$t('property.状态')">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 1">{{ $t("property.成功") }}</span>
            <span v-if="scope.row.status === 0">{{ $t("property.失败") }}</span>
            <span></span>
          </template>
        </el-table-column>
        <template slot="empty">
          <my-empty></my-empty>
        </template>
      </el-table>
      <div class="block" v-if="flashTotal > 0">
        <el-pagination
          background
          @current-change="onCurrentChange"
          :current-page.sync="flashParams.pageNum"
          :page-size="flashParams.pageSize"
          layout="->, prev, pager, next, jumper"
          :total="flashTotal"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 购买表格 -->
    <div class="table" v-if="activeIndex === 5">
      <el-table :data="otcData" style="width: 100%">
        <el-table-column min-width="150" :label="$t('property.订单号')">
          <template slot-scope="scope">
            <span>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.方向')">
          <template>
            <span class="buyc">{{ $t("property.买入") }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.数量')">
          <template slot-scope="scope">
            <span>{{ `${scope.row.quantity} ${scope.row.coinName}` }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.总金额')">
          <template slot-scope="scope">
            <span>{{ scope.row.amount }} CNY</span>
            <span></span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.单价')">
          <template slot-scope="scope">
            <span>{{ scope.row.advertPrice }} CNY</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.对方昵称')">
          <template slot-scope="scope">
            <span>{{ scope.row.merchantName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.订单状态')">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">{{
              $t("property.待支付")
            }}</span>
            <span v-if="scope.row.status === 1">{{
              $t("property.待放币")
            }}</span>
            <span v-if="scope.row.status === 2">{{
              $t("property.申诉中")
            }}</span>
            <span v-if="scope.row.status === 3"
              >{{ $t("property.已完成") }}
            </span>
            <span v-if="scope.row.status === 4">{{ $t("property.取消") }}</span>
            <span v-if="scope.row.status === 5">{{
              $t("property.超时取消")
            }}</span>
            <span v-if="scope.row.status === 6">{{
              $t("property.申诉后交易最终完成")
            }}</span>
            <span v-if="scope.row.status === 7">{{
              $t("property.申诉后取消交易")
            }}</span>
            <span v-if="scope.row.status === 8">{{
              $t("property.用户违规取消")
            }}</span>
            <span v-if="scope.row.status === 9">{{
              $t("property.商户违规取消")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.交易时间')">
          <template slot-scope="scope">
            <span>{{ $formatTime(scope.row.createTimeTsLong) }}</span>
          </template>
        </el-table-column>
        <template slot="empty">
          <my-empty></my-empty>
        </template>
      </el-table>
      <div class="block" v-if="otcTotal > 0">
        <el-pagination
          background
          @current-change="onCurrentChange"
          :current-page.sync="formInline.pageNum"
          :page-size="formInline.pageSize"
          layout="->, prev, pager, next, jumper"
          :total="otcTotal"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 出售表格 -->
    <div class="table" v-if="activeIndex === 6">
      <el-table :data="otcData" style="width: 100%">
        <el-table-column min-width="150" :label="$t('property.订单号')">
          <template slot-scope="scope">
            <span>{{ scope.row.number }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.方向')">
          <template>
            <span class="sellc">{{ $t("property.卖出") }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.数量')">
          <template slot-scope="scope">
            {{ `${scope.row.quantity} ${scope.row.coinName}` }}
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.总金额')">
          <template slot-scope="scope">
            <span>{{ scope.row.amount }} CNY</span>
            <span></span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.单价')">
          <template slot-scope="scope">
            <span>{{ scope.row.advertPrice }} CNY</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.对方昵称')">
          <template slot-scope="scope">
            <span>{{ scope.row.merchantName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.订单状态')">
          <template slot-scope="scope">
            <span v-if="scope.row.status === 0">{{
              $t("property.待支付")
            }}</span>
            <span v-if="scope.row.status === 1">{{
              $t("property.待放币")
            }}</span>
            <span v-if="scope.row.status === 2">{{
              $t("property.申诉中")
            }}</span>
            <span v-if="scope.row.status === 3"
              >{{ $t("property.已完成") }}
            </span>
            <span v-if="scope.row.status === 4">{{ $t("property.取消") }}</span>
            <span v-if="scope.row.status === 5">{{
              $t("property.超时取消")
            }}</span>
            <span v-if="scope.row.status === 6">{{
              $t("property.申诉后交易最终完成")
            }}</span>
            <span v-if="scope.row.status === 7">{{
              $t("property.申诉后取消交易")
            }}</span>
            <span v-if="scope.row.status === 8">{{
              $t("property.用户违规取消")
            }}</span>
            <span v-if="scope.row.status === 9">{{
              $t("property.商户违规取消")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.交易时间')">
          <template slot-scope="scope">
            <span>{{ $formatTime(scope.row.createTimeTsLong) }}</span>
          </template>
        </el-table-column>
        <template slot="empty">
          <my-empty></my-empty>
        </template>
      </el-table>
      <div class="block" v-if="otcTotal > 0">
        <el-pagination
          background
          @current-change="onCurrentChange"
          :current-page.sync="formInline.pageNum"
          :page-size="formInline.pageSize"
          layout="->, prev, pager, next, jumper"
          :total="otcTotal"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 现货买入表格 -->
    <div class="table" v-if="activeIndex === 7">
      <el-table :data="spotData" style="width: 100%">
        <el-table-column min-width="100" :label="$t('property.委托单号')">
          <template slot-scope="scope">
            <span>{{ scope.row.entrustNo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.方向')">
          <template>
            <span class="buyc">{{ $t("property.买入") }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.交易对名称')">
          <template slot-scope="scope">
            <span>{{ scope.row.coinMarket }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.成交数量')">
          <template slot-scope="scope">
            <span>{{ scope.row.amount }}</span>
            <span></span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.成交金额')">
          <template slot-scope="scope">
            <span>{{ scope.row.dealAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.手续费')">
          <template slot-scope="scope">
            <span>{{ scope.row.fee }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.交易类型')">
          <template slot-scope="scope">
            <span v-if="scope.row.dealType === 1">{{
              $t("property.限价交易")
            }}</span>
            <span v-if="scope.row.dealType === 2">{{
              $t("property.市价交易")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.交易时间')" min-width="120">
          <template slot-scope="scope">
            <span>{{ $formatTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <template slot="empty">
          <my-empty></my-empty>
        </template>
      </el-table>
      <div class="block" v-if="spotTotal > 0">
        <el-pagination
          background
          @current-change="onCurrentChange"
          :current-page.sync="spotformData.pageNum"
          :page-size="spotformData.pageSize"
          layout="->, prev, pager, next, jumper"
          :total="spotTotal"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 现货卖出表格 -->
    <div class="table" v-if="activeIndex === 8">
      <el-table :data="spotData" style="width: 100%">
        <el-table-column min-width="100" :label="$t('property.委托单号')">
          <template slot-scope="scope">
            <span>{{ scope.row.entrustNo }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.方向')">
          <template>
            <span class="sellc">{{ $t("property.卖出") }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.交易对名称')">
          <template slot-scope="scope">
            <span>{{ scope.row.coinMarket }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.成交数量')">
          <template slot-scope="scope">
            <span>{{ scope.row.amount }}</span>
            <span></span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.成交金额')">
          <template slot-scope="scope">
            <span>{{ scope.row.dealAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.手续费')">
          <template slot-scope="scope">
            <span>{{ scope.row.fee }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.交易类型')">
          <template slot-scope="scope">
            <span v-if="scope.row.dealType === 1">{{
              $t("property.限价交易")
            }}</span>
            <span v-if="scope.row.dealType === 2">{{
              $t("property.市价交易")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.交易时间')" min-width="120">
          <template slot-scope="scope">
            <span>{{ $formatTime(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <template slot="empty">
          <my-empty></my-empty>
        </template>
      </el-table>
      <div class="block" v-if="spotTotal > 0">
        <el-pagination
          background
          @current-change="onCurrentChange"
          :current-page.sync="spotformData.pageNum"
          :page-size="spotformData.pageSize"
          layout="->, prev, pager, next, jumper"
          :total="spotTotal"
        >
        </el-pagination>
      </div>
    </div>
    <!-- 合约返佣表格 -->
    <div class="table" v-if="activeIndex === 9">
      <el-table :data="agentData" style="width: 100%">
        <el-table-column min-width="100" :label="$t('property.币种')">
          <template slot-scope="scope">
            <span>{{ scope.row.coinName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.返佣') + 'UID'">
          <template slot-scope="scope">
            <span>{{ scope.row.agentUid }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.交易类型')">
          <span>{{ $t("property.合约返佣") }}</span>
        </el-table-column>
        <el-table-column :label="$t('property.改变前币种数量')">
          <template slot-scope="scope">
            <span>{{ scope.row.beforeAmount }}</span>
            <span></span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.数量')">
          <template slot-scope="scope">
            <span>{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.改变后币种数量')">
          <template slot-scope="scope">
            <span>{{ scope.row.afterAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.金额类型')">
          <template slot-scope="scope">
            <span v-if="scope.row.amountType === 1">{{
              $t("property.可用金额")
            }}</span>
            <span v-if="scope.row.amountType === 2">{{
              $t("property.冻结金额")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.创建时间')" min-width="120">
          <template slot-scope="scope">
            <span>{{ $formatTime(scope.row.createTimeTsLong) }}</span>
          </template>
        </el-table-column>
        <template slot="empty">
          <my-empty></my-empty>
        </template>
      </el-table>
    </div>
    <!-- 现货返佣表格 -->
    <div class="table" v-if="activeIndex === 11">
      <el-table :data="agentData" style="width: 100%">
        <el-table-column min-width="100" :label="$t('property.币种')">
          <template slot-scope="scope">
            <span>{{ scope.row.coinName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.返佣') + 'UID'">
          <template slot-scope="scope">
            <span>{{ scope.row.agentUid }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.交易类型')">
          <span>{{ $t("property.现货返佣") }}</span>
        </el-table-column>
        <el-table-column :label="$t('property.改变前币种数量')">
          <template slot-scope="scope">
            <span>{{ scope.row.beforeAmount }}</span>
            <span></span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.数量')">
          <template slot-scope="scope">
            <span>{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.改变后币种数量')">
          <template slot-scope="scope">
            <span>{{ scope.row.afterAmount }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.金额类型')">
          <template slot-scope="scope">
            <span v-if="scope.row.amountType === 1">{{
              $t("property.可用金额")
            }}</span>
            <span v-if="scope.row.amountType === 2">{{
              $t("property.冻结金额")
            }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.创建时间')" min-width="120">
          <template slot-scope="scope">
            <span>{{ $formatTime(scope.row.createTimeTsLong) }}</span>
          </template>
        </el-table-column>
        <template slot="empty">
          <my-empty></my-empty>
        </template>
      </el-table>
    </div>
    <!-- 空投奖励表格 -->
    <div class="table" v-if="activeIndex === 10">
      <el-table :data="agentData" style="width: 100%">
        <el-table-column min-width="100" :label="$t('property.币种')">
          <template slot-scope="scope">
            <span>{{ scope.row.coinName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.数量')">
          <template slot-scope="scope">
            <span>{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.类型')">
          <span>{{ $t("property.空投奖励") }}</span>
        </el-table-column>
        <el-table-column :label="$t('property.创建时间')" min-width="120">
          <template slot-scope="scope">
            <span>{{ $formatTime(scope.row.createTimeTsLong) }}</span>
          </template>
        </el-table-column>
        <template slot="empty">
          <my-empty></my-empty>
        </template>
      </el-table>
    </div>

    <!-- 奖励充值扣款表格 -->
    <div class="table" v-if="activeIndex === 12">
      <el-table :data="agentData" style="width: 100%">
        <el-table-column min-width="100" :label="$t('property.币种')">
          <template slot-scope="scope">
            <span>{{ scope.row.coinName }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.数量')">
          <template slot-scope="scope">
            <span>{{ scope.row.amount }}</span>
          </template>
        </el-table-column>
        <el-table-column :label="$t('property.类型')">
          <span>{{ $t("property.奖励充值扣款") }}</span>
        </el-table-column>
        <el-table-column :label="$t('property.创建时间')" min-width="120">
          <template slot-scope="scope">
            <span>{{ $formatTime(scope.row.createTimeTsLong) }}</span>
          </template>
        </el-table-column>
        <template slot="empty">
          <my-empty></my-empty>
        </template>
      </el-table>
    </div>

    <!-- 充币、提币详情 -->
    <common-modal
      :title="detailTitle"
      width="600px"
      :show="historyShow"
      :noFooter="true"
      :showClose="true"
      @cancel="historyShow = false"
    >
      <template #dia_content>
        <div class="detail">
          <div class="detail-left">{{ $t("property.状态") }}</div>
          <span v-if="historyData.status === 0">{{
            $t("property.已完成")
          }}</span>
          <span v-if="historyData.status === 10">{{
            $t("property.审核中")
          }}</span>
          <span v-if="historyData.status === 20">{{
            $t("property.审核失败")
          }}</span>
          <span v-if="historyData.status === 30">{{
            $t("property.待打包")
          }}</span>
          <span v-if="historyData.status === 40">{{
            $t("property.确认中")
          }}</span>
          <span v-if="historyData.status === 50">{{
            $t("property.已确认")
          }}</span>
          <span v-if="historyData.status === 60">{{
            $t("property.确认失败，待重试")
          }}</span>
          <span v-if="historyData.status === 70">{{
            $t("property.充值未上账")
          }}</span>
          <span v-if="historyData.status === 80">{{
            $t("property.充值已上账")
          }}</span>
        </div>
        <div class="detail">
          <div class="detail-left">{{ $t("property.时间") }}</div>
          <div>{{ $formatTime(historyData.confirmTimeTsLong) }}</div>
        </div>
        <div class="detail">
          <div class="detail-left">{{ $t("property.币种") }}</div>
          <div>{{ historyData.coinName }}</div>
        </div>
        <div class="detail">
          <div class="detail-left">{{ $t("property.充值数量") }}</div>
          <div>{{ historyData.amount }}</div>
        </div>
        <div class="detail" v-if="historyData.chainName">
          <div class="detail-left">{{ $t("property.转账网络") }}</div>
          <div>{{ historyData.chainName }}</div>
        </div>
        <div class="detail">
          <div class="detail-left">{{ $t("property.地址") }}</div>
          <div class="detail-right">{{ historyData.toAddress }}</div>
        </div>
        <div class="detail" v-if="historyData.txId">
          <div class="detail-left">TxID</div>
          <div class="detail-right">{{ historyData.txId }}</div>
        </div>

        <div class="detail">
          <div class="detail-left">{{ $t("property.充币账户") }}</div>
          <div v-if="historyData.accountType === 1">
            {{ $t("property.现货账户") }}
          </div>
          <div v-if="historyData.accountType === 2">
            {{ $t("property.资金账户") }}
          </div>
        </div>
      </template>
    </common-modal>
  </div>
</template>

<script>
import {
  simpleApi,
  recordQueryApi,
  transferRecordQueryApi,
  flashRecordApi,
  entrustDetailList,
  agentRecord,
} from "@/api/assetWallet";
import { orderList } from "@/api/otc";
export default {
  name: "WalletHistory",
  data() {
    return {
      historyShow: false,
      paramsListVal: {
        coinVal: "",
        statusVal: "",
        typeVal: 1,
        timeVal: 1,
      },
      coinList: [],
      symbolList: [],
      statusList: [
        // {
        //   id: "",
        //   label: this.$t("property.全部"),
        // },
        {
          id: 0,
          label: this.$t("property.已完成"),
        },
        // {
        //   id: 10,
        //   label: this.$t("property.审核中"),
        // },
        // {
        //   id: 20,
        //   label: this.$t("property.审核失败"),
        // },
        // {
        //   id: 30,
        //   label: this.$t("property.待确认"),
        // },
        {
          id: 40,
          label: this.$t("property.未完成"),
        },
      ],
      typeList: [
        {
          id: 1,
          label: this.$t("property.充值"),
        },
        {
          id: 2,
          label: this.$t("property.提币"),
        },
        {
          id: 3,
          label: this.$t("property.划转"),
        },
        {
          id: 4,
          label: this.$t("property.闪兑"),
        },
        {
          id: 5,
          label: this.$t("property.购买"),
        },
        {
          id: 6,
          label: this.$t("property.出售"),
        },
        {
          id: 7,
          label: this.$t("property.现货买入"),
        },
        {
          id: 8,
          label: this.$t("property.现货卖出"),
        },
        {
          id: 9,
          label: this.$t("property.合约返佣"),
        },
        {
          id: 11,
          label: this.$t("property.现货返佣"),
        },
        {
          id: 10,
          label: this.$t("property.空投奖励"),
        },
        {
          id: 12,
          label: this.$t("property.奖励充值扣款"),
        },
      ],
      timeList: [
        {
          id: 1,
          label: this.$t("property.最近7天"),
        },
        {
          id: 2,
          label: this.$t("property.最近3个月"),
        },
      ],

      // 详情弹窗标题
      detailTitle: "",
      currentPapams: {
        status: "",
        coinId: "",
        pageNum: 1,
        pageSize: 10,
        startTime: new Date().getTime() - 7 * 24 * 3600 * 1000,
        endTime:
          new Date(new Date().toLocaleDateString()).getTime() +
          86400000 * 2 -
          1,
      },
      //划转记录参数
      transferParams: {
        coinId: "",
        status: "", //0失败、1成功
        fromAccountType: "",
        toAccountType: "",
        pageNum: 1,
        pageSize: 10,
        startTime: new Date().getTime() - 7 * 24 * 3600 * 1000,
        endTime:
          new Date(new Date().toLocaleDateString()).getTime() +
          86400000 * 2 -
          1,
      },
      //闪兑参数
      flashParams: {
        fromCoinId: "",
        toCoinId: "",
        status: "",
        pageNum: 1,
        pageSize: 10,
        startTime: new Date().getTime() - 7 * 24 * 3600 * 1000,
        endTime:
          new Date(new Date().toLocaleDateString()).getTime() +
          86400000 * 2 -
          1,
      },
      activeIndex: 1, //记录绑定充值1，提币2，划转3，闪兑4
      depositData: [],
      depositTotal: 0,
      withdrawData: [], //提币记录数据
      withdrawTotal: 0, //提币总数
      transferData: [],
      transferTotal: 0,
      flashData: [],
      flashTotal: 0,
      withdrawDetail: {}, // 提币详情数据
      otcData: [],
      formInline: {
        type: undefined,
        status: undefined,
        number: undefined,
        coinId: undefined,
        date: undefined,
        startDate: undefined,
        endDate: undefined,
        pageNum: 1,
        pageSize: 10,
      }, //(c2c)订单参数
      otcTotal: 0,
      //现货成交记录参数
      spotformData: {
        coinMarket: null,
        type: null,
        priceType: null,
        pageNum: 1,
        pageSize: 10,
        startTime: new Date().getTime() - 7 * 24 * 3600 * 1000,
        endTime:
          new Date(new Date().toLocaleDateString()).getTime() +
          86400000 * 2 -
          1,
      },
      spotData: [],
      spotTotal: 0,
      //返佣及空投奖励记录参数
      agentFormData: {
        coinId: null,
        optType: null,
        startTime: new Date().getTime() - 7 * 24 * 3600 * 1000,
        endTime:
          new Date(new Date().toLocaleDateString()).getTime() +
          86400000 * 2 -
          1,
      },
      agentData: [], //返佣及空投奖励数据
      // airdropData:[], //空投奖励数据
    };
  },
  mounted() {
    //默认获取充值
    this.getCoinList(3);
  },
  methods: {
    historyDetail(row) {
      this.historyData = row;
      this.detailTitle = `${
        row.type === 1 ? this.$t("property.充币") : this.$t("property.提币")
      } ${this.$t("property.详情")}`;
      this.historyShow = true;
    },
    onCapitalAccount() {
      this.$emit("changeIndex");
    },
    onFlash() {
      this.$emit("flash");
    },
    //获取币种列表 1：查otc 2：查币币 3：查充值 4：查提取 5：查划转 6：查闪兑
    getCoinList(type) {
      simpleApi({ isType: type }).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.coinList = res.data.data || [];
            this.coinList.unshift({
              coinId: "",
              coinName: this.$t("property.全部币种"),
            });
            switch (type) {
              case 3:
                this.getDepositRecord();
                break;
              case 4:
                this.getWithdrawRecord();
                break;
              case 5:
                this.getTransferRecordQuery();
                break;
              case 6:
                this.getFlashRecord();
                break;
              default:
            }
          }
        }
      });
    },
    //获取充币记录
    getDepositRecord() {
      const params = Object.assign(this.currentPapams, { type: 1 });
      recordQueryApi(params).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.depositData = res.data.data.records || [];
            this.depositTotal = res.data.data.total;
          }
        }
      });
    },
    //获取提币记录
    getWithdrawRecord() {
      const params = Object.assign(this.currentPapams, { type: 2 });
      recordQueryApi(params).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.withdrawData = res.data.data.records || [];
            this.withdrawTotal = res.data.data.total;
          }
        }
      });
    },
    //划转记录
    getTransferRecordQuery() {
      transferRecordQueryApi(this.transferParams).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.transferData = res.data.data.records || [];
            this.transferTotal = res.data.data.total;
          }
        }
      });
    },
    //闪兑记录
    getFlashRecord() {
      flashRecordApi(this.flashParams).then((res) => {
        if (res.status && res.status === 200) {
          if (res.data && res.data.success) {
            this.flashData = res.data.data.records || [];
            this.flashTotal = res.data.data.total;
          }
        }
      });
    },
    //订单列表
    getOrderList() {
      orderList(this.formInline).then((res) => {
        this.otcData = res.data.records || [];
        this.otcTotal = res.data.total;
      });
    },
    //现货成交记录
    getSpotList() {
      entrustDetailList(this.spotformData).then((res) => {
        this.spotData = res.data.data.records || [];
        this.spotTotal = res.data?.data?.total;
      });
    },
    //返佣记录
    getAgentList() {
      agentRecord(this.agentFormData).then((res) => {
        this.agentData = res.data.data.records || [];
      });
    },

    //类型切换
    changeType(e) {
      // const obj = {
      //   1: 3, //切换充值的币种
      //   2: 4, //切换充值的币种
      //   3: 5,
      //   4: 6,
      //   5: null,
      //   6: null,
      // };
      // this.activeIndex = obj[e] ? obj[e] : e;
      // obj[e] ? this.getCoinList(obj[e]) : this.getOrderList();
      if (e === 1) {
        this.activeIndex = 1;
        //切换充值的币种
        this.getCoinList(3);
      } else if (e === 2) {
        this.activeIndex = 2;
        this.getCoinList(4);
      } else if (e === 3) {
        this.activeIndex = 3;
        //划转币种
        this.getCoinList(5);
      } else if (e === 4) {
        this.activeIndex = 4;
        //闪兑币种
        this.getCoinList(6);
      } else if (e === 5) {
        this.activeIndex = 5;
        //购买
        this.formInline.type = 1;
        this.getOrderList();
      } else if (e === 6) {
        this.activeIndex = 6;
        //出售
        this.formInline.type = 0;
        this.getOrderList();
      } else if (e === 7) {
        //买入
        this.activeIndex = 7;
        this.spotformData.type = 1;
        this.getSpotList();
      } else if (e === 8) {
        this.activeIndex = 8;
        this.spotformData.type = 2;
        this.getSpotList();
      } else if (e === 9) {
        //合约返佣
        this.activeIndex = 9;
        this.agentFormData.optType = 19;
        this.getAgentList();
      } else if (e === 10) {
        // 空投
        this.activeIndex = 10;
        this.agentFormData.optType = 25;
        this.getAgentList();
      } else if (e == 11) {
        //现货返佣
        this.activeIndex = 11;
        this.agentFormData.optType = 31;
        this.getAgentList();
      } else if (e == 12) {
        //奖励充值扣款
        this.activeIndex = 12;
        this.agentFormData.optType = 71;
        this.getAgentList();
      }
    },
    //筛选条件
    coinChange(val) {
      switch (this.activeIndex) {
        case 1:
          this.currentPapams.coinId = val;
          this.getDepositRecord();
          break;
        case 2:
          this.currentPapams.coinId = val;
          this.getWithdrawRecord();
          break;
        case 3:
          this.transferParams.coinId = val;
          this.getTransferRecordQuery();
          break;
        case 4:
          this.flashParams.fromCoinId = val; //消耗币种id
          this.getFlashRecord();
          break;
        case 5:
          this.formInline.coinId = val;
          this.getOrderList();
          break;
        case 6:
          this.formInline.coinId = val;
          this.getOrderList();
          break;
        case 9:
          this.agentFormData.coinId = val;
          this.getAgentList();
          break;
        case 10:
          this.agentFormData.coinId = val;
          this.getAgentList();
          break;
        case 12:
          this.agentFormData.coinId = val;
          this.getAgentList();
          break;
        default:
      }
    },
    //状态筛选
    handleStatus(val) {
      switch (this.activeIndex) {
        case 1:
          this.currentPapams.status = val;
          this.getDepositRecord();
          break;
        case 2:
          this.currentPapams.status = val;
          this.getWithdrawRecord();
          break;
        default:
      }
    },
    //时间筛选
    handleDate(val) {
      let t = new Date().getTime();
      if (val === 1) {
        //最近7天
        switch (this.activeIndex) {
          case 1:
            this.currentPapams.startTime = t - 7 * 24 * 3600 * 1000;
            this.currentPapams.endTime = t;
            this.getDepositRecord();
            break;
          case 2:
            this.currentPapams.startTime = t - 7 * 24 * 3600 * 1000;
            this.currentPapams.endTime = t;
            this.getWithdrawRecord();
            break;
          case 3:
            this.transferParams.startTime = t - 7 * 24 * 3600 * 1000;
            this.transferParams.endTime = t;
            this.getTransferRecordQuery();
            break;
          case 4:
            this.flashParams.startTime = t - 7 * 24 * 3600 * 1000;
            this.flashParams.endTime = t;
            this.getFlashRecord();
            break;
          case 5:
            this.formInline.startTime = t - 7 * 24 * 3600 * 1000;
            this.formInline.endTime = t;
            this.getOrderList();
            break;
          case 6:
            this.formInline.startTime = t - 7 * 24 * 3600 * 1000;
            this.formInline.endTime = t;
            this.getOrderList();
            break;
          case 7:
            this.spotformData.startTime = t - 7 * 24 * 3600 * 1000;
            this.spotformData.endTime = t;
            this.getSpotList();
            break;
          case 8:
            this.spotformData.startTime = t - 7 * 24 * 3600 * 1000;
            this.spotformData.endTime = t;
            this.getSpotList();
            break;
          case 9:
            this.agentFormData.startTime = t - 7 * 24 * 3600 * 1000;
            this.agentFormData.endTime = t;
            this.getAgentList();
            break;
          case 12:
            this.agentFormData.startTime = t - 7 * 24 * 3600 * 1000;
            this.agentFormData.endTime = t;
            this.getAgentList();
            break;
          default:
        }
      } else if (val === 2) {
        //最近3个月
        switch (this.activeIndex) {
          case 1:
            this.currentPapams.startTime = t - 3 * 30 * 24 * 3600 * 1000;
            this.currentPapams.endTime = t;
            this.getDepositRecord();
            break;
          case 2:
            this.currentPapams.startTime = t - 3 * 30 * 24 * 3600 * 1000;
            this.currentPapams.endTime = t;
            this.getWithdrawRecord();
            break;
          case 3:
            this.transferParams.startTime = t - 3 * 30 * 24 * 3600 * 1000;
            this.transferParams.endTime = t;
            this.getTransferRecordQuery();
            break;
          case 4:
            this.flashParams.startTime = t - 3 * 30 * 24 * 3600 * 1000;
            this.flashParams.endTime = t;
            this.getFlashRecord();
            break;
          case 7:
            this.spotformData.startTime = t - 3 * 30 * 24 * 3600 * 1000;
            this.spotformData.endTime = t;
            this.getSpotList();
            break;
          case 8:
            this.spotformData.startTime = t - 3 * 30 * 24 * 3600 * 1000;
            this.spotformData.endTime = t;
            this.getSpotList();
            break;
          case 9:
            this.agentFormData.startTime = t - 3 * 30 * 24 * 3600 * 1000;
            this.agentFormData.endTime = t;
            this.getAgentList();
            break;
          case 12:
            this.agentFormData.startTime = t - 3 * 30 * 24 * 3600 * 1000;
            this.agentFormData.endTime = t;
            this.getAgentList();
            break;
          default:
        }
      }
    },
    //分页
    onCurrentChange() {
      switch (this.activeIndex) {
        case 1:
          this.getDepositRecord();
          break;
        case 2:
          this.getWithdrawRecord();
          break;
        case 3:
          this.getTransferRecordQuery();
          break;
        case 4:
          this.getFlashRecord();
          break;
        case 5:
          this.getOrderList();
          break;
        case 6:
          this.getOrderList();
          break;
        case 7:
          this.getSpotList();
          break;
        case 8:
          this.getSpotList();
          break;
        default:
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.walletHistory {
  color: #333;
  background: #fff;
  min-height: 600px;
  .title {
    background: #f5f7fa;
    padding: 20px 0px 20px 70px;
    div {
      .el-icon-arrow-left {
        padding-right: 20px;
        font-size: 24px;
        cursor: pointer;
      }
      span {
        font-size: 32px;
        cursor: pointer;
      }
    }
  }
  .content {
    margin-left: 74px;
    margin-top: 45px;
  }

  .border {
    border-bottom: 1px solid #f4f5f7;
    margin-top: 30px;
  }
  .table {
    margin: 5px 30px 0 65px;
    padding-bottom: 30px;
    .detailBtn {
      color: #90ff00;
      cursor: pointer;
    }
    .empty {
      margin-top: 60px;
    }
    .fromAmount {
      padding-right: 5px;
    }
    .block {
      margin-top: 20px;
      margin-right: 20px;
    }
  }
  .detail {
    display: flex;
    justify-content: space-between;
    line-height: 30px;
    margin: 0 25px;
    font-size: 16px;
    color: #333;
    .detail-left {
      width: 50%;
      color: #999;
    }
    .detail-right {
      text-align: right;
    }
  }
  .buyc {
    color: #90ff00;
  }
  .sellc {
    color: #f75f52;
  }
}
::v-deep .el-tabs__nav-wrap::after {
  background-color: transparent;
}
::v-deep .el-table th.el-table__cell > .cell {
  color: #8992a6;
}

::v-deep .el-table td.el-table__cell {
  border-bottom: 1px solid #f4f5f7 !important;
}
::v-deep .el-table th.el-table__cell.is-leaf,
.el-table td.el-table__cell {
  border-bottom: none;
}
.el-table::before {
  background: #f4f5f7;
}
/* 修改鼠标经过表格的颜色 */
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #f4f5f7 !important;
}

::v-deep .el-table .el-table__cell {
  padding: 7px 0;
}
::v-deep .el-table .cell {
  line-height: 49px;
  line-height: 49px;
}
</style>

<style lang="scss">
//必须要写在最外层
.remove-scrollbar {
  .el-scrollbar {
    overflow: visible;
  }
  .el-scrollbar__wrap {
    overflow: visible !important; //超出部分不滚动，直接显示
  }
  .el-scrollbar__thumb {
    display: none; //去掉右侧滚动条
  }
}
</style>

