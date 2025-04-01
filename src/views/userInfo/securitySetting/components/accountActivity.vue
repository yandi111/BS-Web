<!-- 绑定手机 -->
<template>
 <div class="user-form">
  <div class="title-context">
   <i class="el-icon-arrow-left" @click="handleSuccess"></i>
   <span class="title" @click="handleSuccess">{{ $t('userInfo.账户活动') }}</span>
  </div>
  <div class="form-container">
   <div class="top-content">
    <ul class="nav-content">
     <li
      v-for="(item, index) in navList"
      :key="index"
      :class="{ active: activeIndex === index }"
      @click="choose(index)"
     >
      {{ item.title }}
     </li>
    </ul>
    <p class="tip">{{ $t('userInfo.登录历史/安全操作历史只展示您三个月的登录记录') }}</p>
   </div>
   <!-- 登录记录 -->
   <table-page
    v-if="activeIndex === 0"
    :page.sync="paramsObj.page"
    @current-change="handleChange"
    :total="total"
    :show-filter="false"
   >
    <template v-slot:table>
     <el-table
      class="customer-no-border-table"
      :data="loginRecordList"
      v-loading="loading"
     >
      <el-table-column :label="$t('userInfo.设备')" min-width="300">
       <template slot-scope="scope">
        <div>
         <svg-icon
          v-if="scope.row.platformType === 0"
          iconClass="mb-icon"
          className="mbIcon"
         />
         <svg-icon
          v-if="
                      scope.row.platformType === 1 ||
                      scope.row.platformType === 2
                    "
          iconClass="pc-icon"
          className="pcIcon"
         />
         <span style="padding-left: 5px">{{
           scope.row.deviceName
          }}</span>
        </div>
       </template>
      </el-table-column>
      <el-table-column :label="$t('userInfo.时间')" min-width="200">
       <template slot-scope="scope">
        <div>
         <div>{{ $formatTime(scope.row.createTimeTsLong) }}</div>
        </div>
       </template>
      </el-table-column>
      <el-table-column :label="$t('userInfo.登录IP')" min-width="200">
       <template slot-scope="scope">
        <div>
         <div>{{ scope.row.ip }}</div>
        </div>
       </template>
      </el-table-column>
     </el-table>
    </template>
   </table-page>
   <!-- 安全历史操作 -->
   <table-page
    v-if="activeIndex === 1"
    :page.sync="paramsOLog.page"
    @current-change="handleLogChange"
    :total="total"
    :show-filter="false"
   >
    <template v-slot:table>
     <el-table
      class="customer-no-border-table"
      :data="logList"
      v-loading="loading"
     >
      <el-table-column :label="$t('userInfo.登录IP')" min-width="200">
       <template slot-scope="scope">
        <div>
         <svg-icon
          v-if="scope.row.platformType === 0"
          iconClass="mb-icon"
          className="mbIcon"
         />
         <svg-icon
          v-if="
                      scope.row.platformType === 1 ||
                      scope.row.platformType === 2
                    "
          iconClass="pc-icon"
          className="pcIcon"
         />
         <span style="padding-left: 5px">{{
           scope.row.deviceName
          }}</span>
        </div>
       </template>
      </el-table-column>
      <el-table-column :label="$t('userInfo.时间')" min-width="100">
       <template slot-scope="scope">
        <div>
         <div>{{ $formatTime(scope.row.createTimeTsLong) }}</div>
        </div>
       </template>
      </el-table-column>
      <el-table-column :label="$t('userInfo.登录IP')" min-width="100">
       <template slot-scope="scope">
        <div>
         <div>{{ scope.row.ip }}</div>
        </div>
       </template>
      </el-table-column>
      <el-table-column :label="$t('userInfo.操作类型')" min-width="100">
       <template slot-scope="scope">
        <div>
         <div>{{ scope.row.description }}</div>
        </div>
       </template>
      </el-table-column>
     </el-table>
    </template>
   </table-page>
  </div>
 </div>
</template>

<script>
import TablePage from "@/components/tablePage/index.vue";
import {loginRecordApi, logListApi} from "@/api/user.js";

export default {
 name: "AccountActivity",
 components: {
  TablePage,
 },
 props: {},
 data() {
  return {
   loading: false,
   activeIndex: 0,
   paramsObj: {
    page: 1,
    size: 10,
   },
   paramsOLog: {
    page: 1,
    size: 10,
   },
   navList: [
    {
     title: this.$t('userInfo.登录历史'),
    },
    {
     title: this.$t('userInfo.安全历史操作'),
    },
   ],
   loginRecordList: [],
   logList: [],
   total: 0,
  };
 },
 mounted() {
  this.getLoginRecord();
 },
 methods: {
  //获取用户登录记录
  getLoginRecord() {
   Promise.try(() => {return loginRecordApi(this.paramsObj)}).then(res => {
    this.loginRecordList = res.data.data.records || [];
    this.total = res.data.data.total;
   })
  },

  //获取用户操作日志
  getLogList() {
   Promise.try(() => {
    return logListApi(this.paramsOLog)
   }).then(res => {
    this.logList = res.data.data.records || [];
    this.total = res.data.data.total;
   })
  },

  choose(index) {
   this.activeIndex = index;
   index === 1 && this.getLogList();
  },

  // 成功返回页面
  handleSuccess() {
   this.$emit("success");
  },

  //分页
  handleChange(val) {
   this.paramsObj.page = val.page;
   this.getLoginRecord(); //登录记录
  },

  handleLogChange(val) {
   this.paramsOLog.page = val.page;
   this.getLogList(); //操作日志
  },
 },
};
</script>
<style lang="scss" scoped>
.user-form {
 padding: 60px;
 width: 100%;
 background-color: #ffffff;
 border-radius: 15px;

 .title-context {
  width: 100%;

  .el-icon-arrow-left {
   font-size: 24px;
   padding-right: 20px;
   cursor: pointer;
  }

  .title {
   font-size: 30px;
   font-family: PingFangSC-Medium, PingFang SC;
   font-weight: 500;
   color: #333333;
   margin-bottom: 60px;
   cursor: pointer;
  }
 }

 .form-container {
  width: 100%;
  padding: 20px 0 0 40px;

  .top-content {
   display: flex;
   justify-content: flex-start;
   align-items: flex-end;
   margin-bottom: 60px;

   .nav-content {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    li {
     font-size: 24px;
     font-family: PingFangSC-Medium, PingFang SC;
     font-weight: 500;
     color: #8992a6;
     margin-right: 30px;
     cursor: pointer;
    }

    .active {
     color: #90ff00;
    }
   }

   .tip {
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #8992a6;
   }
  }
 }

 .btn {
  width: 100%;
  height: 50px;
  font-size: 18px;
  font-family: PingFangSC-Semibold, PingFang SC;
  font-weight: 600;
  color: #ffffff;
 }

 ::v-deep
 .table-content
 .common-table
 ::v-deep
 .el-table
 .el-table__body
 .cell {
  height: 40px;
  line-height: 40px;
  color: #333333;
 }

 .icon-filter {
  margin-right: 10px;
 }

 .title-modal {
  padding: 20px;
  display: flex;
  justify-content: flex-start;
  align-items: center;

  .icon-modal {
   margin-right: 10px;
  }
 }
}

// 去除表格所有边框
.el-table::before {
 height: 0 !important;
}

::v-deep .el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
 border-bottom: none !important;
}

/* 头部边框 */
::v-deep .customer-no-border-table thead tr th.is-leaf {
 border: 0px solid #ebeef5 !important;
 border-right: none !important;
}
</style>
