<template>
  <div class="table">
    <!-- :header-cell-style="{ color: '#96a2b2', backgroundColor: '#f6f6f6', }" -->
    <el-table :data="data" :height="height" style="width: 100%">
      <el-table-column
        v-for="(item, index) in columnLabel"
        :key="item.id"
        :prop="item.prop"
        :label="item.label"
        :min-width="item.width"
        show-overflow-tooltip
      >
        <template slot="header">
          <el-tooltip
            placement="top"
            v-if="item.hover"
            popper-class="my-tooltip"
          >
            <div slot="content">
              <div class="contentBox">
                <p>{{ item.tip }}</p>
              </div>
            </div>
            <span class="label">{{ item.label }}</span>
          </el-tooltip>
          <span v-else class="header-label">{{ item.label | translate }}</span>
        </template>
        <template slot-scope="{ row }">
          <span class="text">{{ row[item.prop] }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  name: "rulestable",
  props: {
    height: {
      type: String,
      default: "330px",
    },
    columnLabel: {
      type: Array,
      default: () => {
        return [];
      },
    },
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.popover-self {
  .text {
    padding: 0 15px;
  }
}
.table {
  .label {
    &:hover {
      color: #90ff00;
    }
  }
  .text {
    padding: 10px;
    color: var(--main-text-color);
  }
}
::v-deep .el-table__row > td {
  border: none;
}
// 清除表格底部横线
.el-table::before {
  height: 0px;
}
.el-table ::-webkit-scrollbar {
  width: 5px;
}
.el-table ::-webkit-scrollbar-track-piece {
  background-color: var(--select-bg);
  border-radius: 3px;
}
.el-table ::-webkit-scrollbar-thumb {
  background-color: rgba($color: #e1e1e1, $alpha: 0.2);
  border-radius: 3px;
}

::v-deep .el-table {
  background-color: var(--main-bg);
  .el-table__header,
  .el-table__body,
  .el-table__footer {
    background: var(--main-bg) !important;
  }
  thead {
    // width: 900px !important;
    tr {
      th {
        background-color: var(--main-bg);
        &.is-leaf {
          padding: 5px 0;
        }
        .cell {
          display: flex;
          align-items: center;
          padding: 5px 10px;
        }
        // &:nth-last-child(2) {
        //   .cell {
        //     justify-content: flex-end;
        //     padding-right: 50px;
        //   }
        // }
      }
    }
  }
  tbody {
    tr {
      background-color: var(--main-bg);
      td {
        padding: 5px 0;
        .cell {
          display: flex;
          // align-items: center;
        }
      }
    }
  }
}

::v-deep .el-table thead tr th.is-leaf {
  border: 0px solid #ebeef5;
  border-right: none;
  color: var(--table-label-color);
}

::v-deep .el-table--scrollable-x .el-table__body-wrapper {
  background-color: var(--main-bg);
}
::v-deep .el-table__body-wrapper {
  background-color: var(--main-bg);
}

::v-deep .el-table--enable-row-hover .el-table__body tr:hover > td {
  background: var(--row-hover-bg);
}
</style>
