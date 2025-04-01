<!-- 购买 -->
<template>
  <div class="table-content">
    <div class="common-filter" v-if="showFilter">
      <slot name="filter"></slot>
    </div>
    <div class="common-table" v-if="showTable">
      <slot name="table"></slot>
    </div>
    <div class="common-page" v-if="showPage">
      <el-pagination
        v-if="total"
        background
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="pageSize"
        layout="prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: "Table",
  props: {
    showTable: {
      type: Boolean,
      default: true,
    },
    showFilter: {
      type: Boolean,
      default: true,
    },
    showPage: {
      type: Boolean,
      default: true,
    },
    pageNum: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
  },
  components: {},
  data() {
    return {};
  },
  computed: {
    page: {
      get() {
        return this.pageNum;
      },
      set(val) {
        this.$emit("update:pageNum", val);
      },
    },
    limit: {
      get() {
        return this.pageSize;
      },
      set(val) {
        this.$emit("update:pageSize", val);
      },
    },
  },
  methods: {
    handleCurrentChange(val) {
      this.$emit("current-change", { page: val, limit: this.limit });
    },
  },
};
</script>