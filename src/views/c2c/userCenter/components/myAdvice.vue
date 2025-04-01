<!-- 我的广告 -->
<template>
	<div>
		<table-page :total="total" :page.sync="formInline.pageNum" @current-change="handleChange">
			<template v-slot:table>
				<el-table :data="tableData" style="width: 100%"	v-loading="loading" @cell-dblclick="celldblclick"  >
					<el-table-column prop="id" :label="$t(t+'广告编号') " min-width="180" show-overflow-tooltip>
						<template slot-scope="scope">
							<span class="">{{ scope.row.number }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="type" :label="$t(t+'广告类型')" min-width="130">
						<template slot-scope="scope">
								<div class="color-green" v-if="scope.row.type === 1">{{$t(t+'购买')}}</div>
								<div class="color-orange" v-if="scope.row.type === 0">{{$t(t+'出售')}}</div>
						</template>
					</el-table-column>
					<el-table-column prop="count" :label="$t(t+'订单限额')" min-width="130">
						<template slot-scope="scope">
								<div>{{ scope.row.minMoney }} - {{ scope.row.maxMoney }} {{ scope.row.legalTenderName }}</div>
						</template>
					</el-table-column>
					<el-table-column prop="price" :label="$t(t+'剩余数量')" min-width="100">
						<template slot-scope="scope">
								<span>{{ scope.row.beleftQuantity || 0 }}</span>
						</template>
					</el-table-column>
					<el-table-column prop="nickName" :label="$t(t+'币种')" min-width="140" align="center">
						<template slot-scope="scope">
								<div v-if="scope.row.type === 0">{{ scope.row.coinName }}</div>
								<div v-if="scope.row.type === 1">{{ scope.row.coinName }}</div>
						</template>
					</el-table-column>
					<el-table-column prop="payTypes" :label="$t(t+'收款方式')" min-width="180" >
						<template slot-scope="scope">
							<div class="flex-box">
								<div class="normal-content payment">
									<template v-if="scope.row.incomeId?.indexOf('1') > -1"><span class="pay-card" >{{$t(t+'银行卡')}}</span></br></template>
									<template v-if="scope.row.incomeId?.indexOf('2') > -1"><span class="pay-alipay" >{{$t(t+'支付宝')}}</span></br></template>
									<span class="pay-wx" v-if="scope.row.incomeId?.indexOf('3') > -1">{{$t(t+'微信')}}</span>
								</div>
							</div>
						</template>
					</el-table-column>
					<el-table-column prop="price" :label="$t(t+'广告状态')" min-width="100">
						<template slot-scope="scope">
							<span :style="{color: scope.row.status === 0 ? '#F75F52': scope.row.status === 1 ? '#90ff00 ': ''}">
								{{
									scope.row.status === 0 ? $t(t+'已下架'): 
									scope.row.status === 1 ? $t(t+'已上架'): ''
								}}
							</span>
						</template>
					</el-table-column>
					<el-table-column prop="price" :label="$t(t+'创建日期')" min-width="200" align="center">
						<template slot-scope="scope">
								<span>{{ parseTime(scope.row.createTime) }}</span>
						</template>
					</el-table-column>
					<el-table-column :label="$t(t+'操作')" align="right" min-width="160">
						<template slot-scope="scope">
								<el-button size="mini"  @click="handleOper(scope.row, 'status')" type="text"> {{ scope.row.status === 0 ? $t(t+'上架'):$t(t+'下架') }}</el-button>
								<el-button size="mini" v-if="scope.row.status === 0" class="color-orange"  @click="handleOper(scope.row, 'del')" type="text">{{$t(t+'删除')}} </el-button>
								<el-button size="mini" v-if="scope.row.status === 0" class="color-blue" @click="handleOper(scope.row, 'edit')" type="text"> {{$t(t+'编辑')}}</el-button>
								<el-button size="mini"  @click="handleDetail(scope.row)" type="text"> {{$t(t+'详情')}} </el-button>
						</template>
					</el-table-column>
					<div slot="empty" style="margin-top: 60px">
						<div class="null-page">
							<img src="@/assets/images/null-page.png" alt="" />
							<div class="text"> {{$t(t+'暂无数据')}}</div>
						</div>
					</div>
				</el-table>
			</template>
		</table-page>

		<common-modal :title="$t(t+'广告详情')" :show-close="true" class="detailsDiaog" :show="isShow" 
			@cancel="isShow = false" :noFooter="true" width="600px">
			<template v-slot:dia_content>
				<ul class="detail-info">
					<li>
						<div class="title">{{$t(t+'广告类型')}}</div>
						<div class="type">{{ adviceInfo.type === 1 ? $t(t+'购买') :$t(t+'出售')  }}</div>
					</li>
					<li>
						<div class="title">{{ $t(t+'价格单价') }}</div>
						<div class="type">{{ adviceInfo.unitPrice }}</div>
					</li>
					<li>
						<div class="title">{{ $t(t+'币种') }}</div>
						<div class="type">{{ adviceInfo.coinName }}</div>
					</li>
					<li>
						<div class="title">{{ $t(t+'数量') }}</div>
						<div class="type">{{ adviceInfo.quantity }} {{ adviceInfo.coinName }}</div>
					</li>
					<li>
						<div class="title">{{ $t(t+'最小金额') }}</div>
						<div class="type">{{ adviceInfo.minMoney }} {{ adviceInfo.legalTenderName }}</div>
					</li>
					<li>
						<div class="title">{{ $t(t+'最大金额') }}</div>
						<div class="type">{{ adviceInfo.maxMoney }} {{ adviceInfo.legalTenderName }}</div>
					</li>
					<li>
						<div class="title">{{ $t(t+'收款方式') }}</div>
						<div class="type">
							{{ adviceInfo.incomeId.indexOf('1') > -1 ?  $t(t+'银行卡')  : '' }}
							{{ adviceInfo.incomeId.indexOf('2') > -1 ? $t(t+'支付宝') : '' }}
							{{ adviceInfo.incomeId.indexOf('3') > -1 ?  $t(t+'微信') : '' }}
						</div>
					</li>
					<li>
						<div class="title">{{ $t(t+'交易期限') }}</div>
						<div class="type">{{ adviceInfo.tradingTime }}{{ $t(t+'分钟') }}</div>
					</li>
					<li>
						<div class="title">{{ $t(t+'自动接单') }}</div>
						<div class="type">{{ adviceInfo.autoAccept === 0 ?$t(t+'否') : $t(t+'是')  }}</div>
					</li>
					<li>
						<div class="title">{{ $t(t+'备注')  }}</div>
						<div class="type">{{ adviceInfo.remark }}</div>
					</li>
					<!-- <li v-if="adviceInfo.status === 0">
						<div class="title">下架时间</div>
						<div class="type">2023-03-03 10:25:39</div>
					</li>
					<li v-if="adviceInfo.status === 1">
						<div class="title">上架时间</div>
						<div class="type">2023-03-03 10:25:39</div>
					</li> -->
				</ul>
			</template>
		</common-modal>
		<!-- 验证 -->
		<validate-info :is-show.sync="validateShow" :params="validateParam" :isVerify="isVerify" @next="handleNext"></validate-info>
		
	</div>
</template>

<script>
import TablePage from "@/components/tablePage/index.vue";
import ValidateInfo from "../../tradeTrust/components/validateInfo.vue";
import PublishAd from "../../tradeTrust/components/publishAd.vue";
import { authItemStong } from "@/api/common";
import {
  advertisingMerchantList,
  advertisingMerchantUpdate,
  advertisingMerchantDel,
  advertisingDetail,
  checkAdvertising,
  advertisingUpdate,
} from "@/api/otc.js";
export default {
  name: "MyAdvice",
  components: {
    TablePage,
    ValidateInfo,
    PublishAd,
  },
  data() {
    return {
      isVerify:true,
      // 国际缩写
      t: "c2c.",
      formInline: {
        pageNum: 1,
        pageSize: 10,
      },

      total: 0,
      isShow: false,
      adviceInfo: null,
      tableData: [],
      // 验证
      loading: true,
      validateShow: false,
      validateParam: {},

      publishShow: false,
    };
  },
  mounted() {
    this.advertisingList();
    // 检查商户信息
    // this.merchantCheck()
  },
  methods: {
    // 翻页
    handleChange(val) {
      this.formInline.pageNum = val.page;
      this.advertisingList();
    },
    // 查看详情
    handleDetail(row) {
      advertisingDetail({ id: row.id }).then((res) => {
        this.adviceInfo = res.data;
        this.isShow = true;
      });
    },
    advertisingList() {
      this.loading = true;
      advertisingMerchantList(this.formInline).then((res) => {
        this.tableData = res.data.records;
        this.total = res.data.total;
        this.loading = false;
      });
    },
    // 操作栏 1 上架 0 下架 3 删除
    handleOper(row, type) {
      this.echoParam = {
        id: row.id,
        coinId: row.coinId,
        type: row.type,
        unitPrice: row.unitPrice,
        quantity: row.quantity,
        minMoney: row.minMoney,
        maxMoney: row.maxMoney,
        incomeId: row.incomeId,
        accountId: row.accountId,
        tradingTime: row.tradingTime,
        autoAccept: row.autoAccept,
        remark: row.remark,
        status: row.status == 0 ? 1 : 0,
        isRealTimePrice: row.isRealTimePrice,
        coinName: row.coinName,
        legalTenderId: row.legalTenderId,
        legalTenderName: row.legalTenderName,
      };
      if (type == "status") {
        if (row.status == 1) {
          //广告下架 不需要校验
          advertisingUpdate(this.echoParam).then((res) => {
            this.advertisingList();
            this.$message({
              message: "操作成功",
              type: "success",
            });
          });
        } else {
          this.$modal
            .confirm(
              this.$t(this.t + "dialog_confirm_shelves", [
                row.status == 0
                  ? this.$t(this.t + "上")
                  : this.$t(this.t + "下"),
              ]) + "?"
            )
            .then((_) => {
              checkAdvertising(row).then((res) => {
                this.getAuthItem(37);
                this.validateShow = true;
              });
            });
        }
      } else if (type == "del") {
        this.$modal
          .confirm(this.$t(this.t + "dialog_confirm", [row.number]) + "?")
          .then((_) => {
            this.getAuthItem(38);
            this.validateShow = true;
          });
      } else {
        this.$nextTick((_) => {
          this.$emit("handlePublish", row);
        });
      }
    },
    // 获取认证选项
    getAuthItem(data) {
      this.authStatus = data;
      authItemStong({ data }).then((auth) => {
        // 验证参数
        this.validateParam = {
          email: auth.data.email,
          phone: auth.data.phone,
          authToken: auth.data.authToken,
          bizType: data,
          tradePasswordStatus: auth.data.tradePasswordStatus,
        };
        this.isVerify = false
      });
    },
    // 验证完成
    handleNext(item) {
      if (this.authStatus == 37) {
        this.echoParam.beleftQuantity = this.echoParam.quantity
        delete this.echoParam.quantity
        console.log(this.echoParam);
        advertisingMerchantUpdate({
          ...this.echoParam,
          successToken: item.successToken,
        }).then((res) => {
          this.$message({
            message:this.$t(this.t + "msgSuccess_shelves_Successfully", [
              this.echoParam.status == 0
                ? this.$t(this.t + "下")
                : this.$t(this.t + "上"),
            ]) + "！",
            type: 'success'
          });
          
          this.advertisingList();
        });
      } else {
        advertisingMerchantDel({
          id: this.echoParam.id,
          successToken: item.successToken,
        }).then((res) => {
          this.$message(this.$t(this.t + "删除成功") + "!");
          this.advertisingList();
        });
      }
    },
    // 双击复制
    celldblclick(row, column, cell, event) {
      let oInput = document.createElement("input");
      oInput.value = row[column.property];
      document.body.appendChild(oInput);
      oInput.select();
      document.execCommand("Copy");
      this.$message.success(this.$t(this.t + "复制成功") + "！");
      oInput.remove();
    },
  },
};
</script>
<style lang='scss' scoped>
::v-deep .table-content .common-filter {
  padding: 0;
}

.color-blue {
  color: #90ff00;
}

.color-green {
  color: #90ff00;
}

.color-orange {
  color: #f75f52;
}

.color-black {
  color: #333333;
}

.color-grey {
  color: #8992a6;
}

.btn-group {
  height: 80px;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  & span {
    padding-left: 10px;
    cursor: pointer;
  }
}

.detail-info {
  padding: 0 20px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 30px;
    line-height: 30px;

    .title {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #96a2b2;
    }

    .type {
      font-size: 16px;
      font-family: PingFangSC-Regular, PingFang SC;
      font-weight: 400;
      color: #333333;
    }
  }
}
::v-deep .detailsDiaog {
  .el-dialog {
    border-radius: 6px !important;
    &__header {
      padding: 20px 20px 0;
    }
  }
}
</style>