<!-- 止盈/止损 -->
<script>
export default {
 data() {
  return {
   dialogVisible: false,

   active: 0
  }
 },

 methods: {
  onOpen() {
   this.dialogVisible = true
  },

  handleClose() {
   this.dialogVisible = false
  }
 }
}
</script>

<template>
 <el-dialog
  :title="$t('lang_2153')"
  :visible.sync="dialogVisible"
  :close-on-click-modal="false"
  :close-on-press-escape="false"
  width="375px"
  :before-close="handleClose">

  <div class="dialog_main">
   <div class="tabs flex">
    <el-button @click="active = 0" :class="active === 0 && 'active'">{{$t('spot_8')}}</el-button>
    <el-button @click="active = 1" :class="active === 1 && 'active'">{{$t('spot_9')}}</el-button>
   </div>

   <div class="price_main flex">
    <div class="price_item flex">
     <label>{{$t('spot_2')}}</label>
     <p>56,622.8</p>
    </div>
    <div class="price_item flex">
     <label>{{$t('spot_10')}}</label>
     <p class="add">+2.16</p>
    </div>
   </div>
  </div>

  <div slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">{{$t('lang_345')}}</el-button>
  </div>
 </el-dialog>
</template>

<style scoped lang="scss">
::v-deep {
 .el-dialog {
  border-radius: 6px;
  background-color: #1B1B1B;

  .el-dialog__header {
   display: flex;
   align-items: center;
   justify-content: space-between;
   padding: 17px 15px;
   border-bottom: 1px solid $border-color;
   .el-dialog__title {
    color: #F0F0F0;
    font: {
     size: 14px;
     weight: bold;
    }
   }
   .el-dialog__headerbtn {
    position: relative;
    top: 0;
    right: 0;
   }
  }
  .el-dialog__body {
   padding: 15px;
   margin-bottom: 15px;

   .tabs{
    margin-bottom: 15px;
    justify-content: space-between;

    .el-button {
     flex: 1 1 auto;
     width: 1%;
     border-radius: 4px;
     background-color: #252525;
     border-color: #737373;
     transition: .3s;
     &:not(:last-child){
      margin-right: 10px;
     }

     &:hover {
      border-color: #90FF00;
      transition: .3s;
      span {
       color: #90FF00;
       transition: .3s;
      }
     }

     span {
      color: #737373;
      transition: .3s;
      font: {
       size: 14px;
      };
     }

     &.active {
      border-color: #90FF00;
      background: {
       image: url("../../../../assets/images/spotTrading/active.png");
       repeat: no-repeat;
       size: contain;
       position: right;
      };
      span {
       color: #90FF00;
      }
     }
    }
   }

   .price_main {
    justify-content: space-between;

    .price_item {
     flex-direction: column;
     label {
      margin-bottom: 3px;
      font: {
       size: 11px;
       weight: 500;
      }
      color: #737373
     }
     p {
      font: {
       size: 13px;
       weight: bold;
      }
     }
    }
   }
  }
 }
}
</style>