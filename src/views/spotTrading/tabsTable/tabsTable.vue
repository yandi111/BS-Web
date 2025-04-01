<template>
 <el-main>
  <div class="tabs flex">
   <a @click="activeIndex = 0" :class="activeIndex === 0 && 'active'">{{$t('lang_1093')}}</a>
   <a @click="activeIndex = 1" :class="activeIndex === 1 && 'active'">{{$t('lang_1831')}}</a>
   <a @click="activeIndex = 2" :class="activeIndex === 2 && 'active'">{{$t('lang_1926')}}</a>
   <a @click="activeIndex = 3" :class="activeIndex === 3 && 'active'">{{$t('spot_1')}}</a>
  </div>

  <Assets v-show="activeIndex === 0" />
  <Delegation v-show="activeIndex === 1" />
 </el-main>
</template>
<script>
import Assets from '@/views/spotTrading/tabsTable/view/Assets.vue'
import Delegation from "@/views/spotTrading/tabsTable/view/Delegation.vue";

export default {
  name: "TabsTable",
  components: {
   Delegation,
   Assets
  },
  data() {
    return {
     activeIndex: 1,

     tabs: [
      {

      }
     ]
    };
  },
  methods: {

  },
  computed: {

  },
  mounted() {

  },

  watch: {
  },
};
</script>

<style lang="scss" scoped>
.el-main {
 padding: 10px 20px;
}
.tabs {
 margin-bottom: 15px;
 align-items: center;

 a {
  position: relative;
  padding: 5px 0;
  &:not(:last-child) {
   margin-right: 30px;
  }
  color: rgba(115, 115, 115, 1);
  font: {
   size: 14px;
   weight: 500;
  }
  transition: .3s;
  &.active {
   color: #fff;

   &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 18px;
    height: 2px;
    background-color: #90ff00;
   }
  }

  &:hover {
   color: #fff;
   transition: .3s;
  }
 }
}

::v-deep {
 .el-table{
  &:before {
   display: none;
  }
  tr, td, th, .el-table__body-wrapper {
   border-bottom: none !important;
   background-color: #141414 !important;

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
      background-color: #1B1B1B !important;
      transition: .3s;
     }
    }
   }
  }
 }
}
</style>
