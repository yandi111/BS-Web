<template>
 <transition name="fade">
  <!-- <div v-show="isShow" -->
  <div v-show="isShow" class="handTop">
   <el-table :border="false" :data="list" :highlight-current-row="true" @row-click="onClick">
    <el-table-column :label="$t('lang_902')">
     <template slot-scope="{row}">
      <div class="name flex">
       <img  src="@/assets/images/icon/icon-hot.png" alt="">
       <p>{{ row.name  }}</p>
       <span>{{$t('lang_1058')}}</span>
      </div>
     </template>
    </el-table-column>

    <el-table-column :label="$t('lang_1116')" align="center">
     <template slot-scope="{row}">
      <p>{{ row.closePrice }}</p>
     </template>
    </el-table-column>

    <el-table-column :label="$t('lang_2349')" align="right">
     <template slot-scope="{row}">
      <p :class="getRatio(row.volatility)">
       <span :class="getRatio(row.volatility)" v-if="+row.volatility > 0">+</span>
       {{ row.ratio }}
      </p>
     </template>
    </el-table-column>
   </el-table>
  </div>
 </transition>


</template>

<script>
export default {
 props: {
  isShow: {
   type: Boolean,
   default: false,
  },
  list: {
   type: Array,
   default: () => [],
  },
  getCoins: {
   type: Object,
   default: () => {}
  }
 },
 methods: {
  getRatio(e) {
   if (+e > 0) return 'add'
   if (+e < 0) return 'reduce';
   if (+e === 0) return ''
  },

  onClick(row, column, event) {
   if (row.id === this.getCoins.id) return

   this.$emit('chooseCoin', row)
  }
 }
};
</script>

<style lang="scss" scoped>
.handTop {
 width: 500px;
 background: #1E1E1E;
 padding: 15px 20px;
 position: absolute;
 left:0;
 z-index: 9999;
 top: 50px;
}

.itemCoinList:hover {
 background-color: #363636;
}

.v-enter-active,
.v-leave-active {
 transition: all 0.3s;
}

.v-enter,
.v-leave-to {
 opacity: 0;
}

.v-enter-to,
.v-leave {
 opacity: 1;
}

.name {
 align-items: center;

 img {
  margin-right: 5px;
  width: 15px;
 }
 p {
  margin-right: 5px;
  font-size: 14px;
  color: #f0f0f0
 }
 span {
  margin-right: 5px;
  font-size: 12px;
  color: #737373
 }
}

::v-deep {
 .el-table{
  &:before {
   display: none;
  }
  tr, td, th, .el-table__body-wrapper {
   border-bottom: none !important;
   background-color: #1E1E1E !important;

   >.cell {
    padding-left: 0;
   }
  }
  .el-table__body-wrapper {
   tr {
    td {
     cursor: pointer;
     transition: .3s;
    }
    &:hover {
     td {
      background-color: rgba(0, 0, 0, .1) !important;
      transition: .3s;
     }
    }
   }
  }
 }
}
</style>
