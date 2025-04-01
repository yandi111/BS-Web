<template>
  <div class="coinApplyTable">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column
        v-for="(item, index) in columnData"
        :key="index"
        :min-width="item.width"
        :prop="item.prop"
        :label="item.label"
      >
        <template slot-scope="{ row }">
          <!-- 默认展示 -->
          <span v-if="item.text">{{ row[item.prop] }}</span>
          <!-- 自定义内容 -->
          <div v-if="item.isStatus">
            <span v-if="row.status == 0">{{ $t("userInfo.审核成功") }}</span>
            <span v-if="row.status == 10">{{ $t("userInfo.审核中") }}</span>
            <span v-if="row.status == 20">{{ $t("userInfo.审核失败") }}</span>
          </div>
          <div v-if="item.isRemark">
            <span>{{ row.auditReason ? row.auditReason : "--" }}</span>
          </div>
          <div v-if="item.isTime">
            <span>{{ $formatTime(row.applyTimeTsLong) }}</span>
          </div>
          <!-- 操作 -->
          <span v-if="item.isOperation">
            <span v-for="(operations, index) in item.operation" :key="index">
              <span
                class="btn"
                v-if="operations.isShow(row)"
                @click="operations.buttonClick(row)"
                >{{ operations.label }}</span
              >
            </span>
          </span>
        </template>
      </el-table-column>
      <template slot="empty">
        <my-empty></my-empty>
      </template>
    </el-table>
    <div class="block" v-show="total > 0">
      <el-pagination
        background
        :current-page.sync="currentPage"
        :page-size="pageSize"
        layout="->, prev, pager, next, jumper"
        :total="total"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "coinApplyTable",
  props: {
    columnData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    tableData: {
      type: Array,
      default: () => {
        return [];
      },
    },
    page: {
      type: Number,
      default: 1,
    },
    limit: {
      type: Number,
      default: 20,
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 50];
      },
    },
    total: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {};
  },
  computed: {
    currentPage: {
      get() {
        return this.page;
      },
      set(val) {
        this.$emit("update:page", val);
      },
    },
    pageSize: {
      get() {
        return this.limit;
      },
      set(val) {
        this.$emit("update:limit", val);
      },
    },
  },
  methods: {
    onDetail(row) {
      this.$emit("details", row);
    },
    handleSizeChange(val) {
      if (this.currentPage * val > this.total) {
        this.currentPage = 1;
      }
      this.$emit("pagination", { page: this.currentPage, limit: val });
    },
    // 切换当前页
    handleCurrentChange(val) {
      this.$emit("pagination", { page: val, limit: this.pageSize });
    },
  },
};
</script>

<style lang="scss" scoped>
.btn {
  cursor: pointer;
  color: #90ff00;
}
.block {
  margin-top: 20px;
}
::v-deep .el-table td.el-table__cell {
  border-bottom: 1px solid #f4f5f7 !important;
}
::v-deep .el-table th.el-table__cell.is-leaf,
.el-table td.el-table__cell {
  border-bottom: 1px solid #f4f5f7 !important;
}
.el-table::before {
  background: #f4f5f7;
}
/* 修改鼠标经过表格的颜色 */
::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background-color: #f4f5f7 !important;
}
::v-deep .el-pagination__editor {
  margin: 0 10px;
}
</style>