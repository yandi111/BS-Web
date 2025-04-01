<!-- 黑名单 -->
<template>
  <div>
    <table-page :show-page="false" :show-filter="false">
      <template v-slot:table>
        <el-table class="customer-no-border-table" :data="tableData">
          <el-table-column prop="toUserName" :label="$t(t+'用户名称')" width="300">
          </el-table-column>
          <el-table-column prop="merchant" :label="$t(t+'用户等级')" width="300">
            <template slot-scope="scope">
              <div>{{ scope.row.merchant ? $t(t+'商家') :$t(t+'用户') }}</div>
            </template>
          </el-table-column>
          <el-table-column :label="$t(t+'操作')" align="right" width="300">
            <template slot-scope="scope">
              <div class="tablebtn-group">
                <span
                  class="border-orange"
                  @click="handleDown(scope.$index, scope.row)"
                  >{{$t(t+'解除黑名单')}}</span
                >
              </div>
            </template>
          </el-table-column>
          <div slot="empty" style="margin-top: 60px">
            <div class="null-page">
              <img src="@/assets/images/null-page.png" alt="" />
              <div class="text">{{$t(t+'暂无数据')}}</div>
            </div>
          </div>
        </el-table>
      </template>
    </table-page>
  </div>
</template>

<script>
import TablePage from "@/components/tablePage/index.vue";
import { relationList, relationOper } from "@/api/otc.js";
export default {
  name: "MyAdvice",
  components: {
    TablePage,
  },
  data() {
    return {
      tableData: [],
        // 国际缩写
        t: 'c2c.',
    };
  },
  mounted() {
    this.getRelationList();
  },
  methods: {
    // 取消拉黑
    handleDown(index, row) {
      relationOper({
        toUserId: row.toUserId,
        type: 0,
      }).then((res) => {
        this.$message({
            message:this.$t(this.t+'解除黑名单成功！'),
            type: 'success'
          });
        this.getRelationList();
      });
    },
    getRelationList() {
      relationList({
        type: 2,
      }).then((res) => {
        this.tableData = res.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
::v-deep   .table-content .common-table ::v-deep   .el-table .el-table__body .cell {
  height: 40px;
  line-height: 40px;
}
::v-deep   .el-table .el-table__cell,.is-leaf{
	border-bottom: 1px solid transparent!important;
}

</style>
