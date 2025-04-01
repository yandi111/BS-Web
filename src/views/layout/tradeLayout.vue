<!-- 快捷/C2C -->
<template>
  <div class="wrapper-view">
    <div class="c2c-Header">
      <div class="tabsNav between">
        <div class="left-panel flexs">
          <div
            class="tab"
            v-for="(item, index) in leftList"
            :key="`left_${index}`"
            :class="item.url === $route.path ? 'tab-active' : ''"
            @click="handleNav(item, index)"
          >
            <span>{{ $t("c2c." + item.title) }}</span>
          </div>
        </div>
        <div class="right-panel flexs">
          <div
            class="tab"
            v-for="(item, index) in rightList"
            :key="`left_${index}`"
            :class="item.url === $route.path ? 'tab-active' : ''"
            @click="handleNav(item, index)"
          >
            <span>{{ $t("c2c." + item.title) }}</span>
            <div class="redDot" v-show="item.redDot && ordersInProgress"></div>
          </div>
          <div class="tab">
            <el-dropdown @visible-change="visibleChange">
              <span
                class="tab-title"
                :class="showingTooltip ? 'textActive' : ''"
                >{{ $t("c2c.广告") }}</span
              >
              <span class="el-dropdown-link">
                <i
                  :class="
                    showingTooltip
                      ? 'el-icon-caret-top'
                      : 'el-icon-caret-bottom'
                  "
                ></i>
              </span>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item
                  v-if="userLevel == 0 || !userLevel"
                  @click.native="toSaler(1)"
                  >{{ $t("c2c.成为商家") }}</el-dropdown-item
                >
                <el-dropdown-item @click.native="publishAd">{{
                  $t("c2c.发布广告")
                }}</el-dropdown-item>
                <el-dropdown-item
                  v-if="userLevel == 1"
                  @click.native="toSaler(2)"
                  >{{ $t("c2c.申请退保") }}</el-dropdown-item
                >
                <!-- <el-dropdown-item v-if=" status === 4" @click.native="banApply">申请解禁</el-dropdown-item> -->
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
      </div>
    </div>
    <!-- 视图 -->
    <div class="table-body">
      <router-view></router-view>
    </div>

    <!-- <Footer /> -->
    <!-- 认证提示 -->
    <OtcAuthDialog :title="''" :visible="isOtcShow" v-if="otcStatusObj" :otcStatusObj="otcStatusObj"  @close="onClose" />
    <!-- 禁止个人发布提示 -->
    <HintDialog :title="''" :visible="hintShow" @close="hintClose" />
  </div>
</template>

<script>
import Header from "@/components/header/header.vue";
// import Footer from "@/components/footer/footer.vue";
import OtcAuthDialog from "@/components/otcAuthDialog/index.vue";
import HintDialog from "@/components/hintDialog/index.vue"
// import { moreC2CList } from "@/config/fields.js";
import { mapGetters, mapState } from "vuex";
import { $orderStatus, merchantCheck, getMerchantInfoById } from "@/api/otc.js";
export default {
  name: "TradeLayout",
  components: {
    Header,
    // Footer,
    OtcAuthDialog,
    HintDialog
  },
  data() {
    return {
      leftList: [
        { title: "快捷买币", url: "/c2c/buyCoin" },
        { title: "自选区", url: "/c2c/tradeToc" },
        { title: "大宗区", url: "/c2c/tradeLarge" },
      ],
      rightList: [
        { title: "C2C交易指南", url: "/c2c/tradeGuide" },
        { title: "订单", url: "/c2c/tradeOrder", redDot: true },
        { title: "我的委托单", url: "/c2c/tradeTrust" },
        { title: "个人中心", url: "/c2c/userCenter" },
        { title: "商家计划", url: "/c2c/merchantPlan" },
      ],
      ordersInProgress: false, //进行中订单状态
      // moreC2CList, //更多下拉列表
      userLevel: undefined, //商户等级
      status: undefined, //是否退保
      showingTooltip: false,
      isOtcShow:false,
      merchantInfo:{},
      auditStatus: null,
      hintShow:false,
      t:'c2c.'
    };
  },
  computed: {
    ...mapState({
      otcStatusObj: ({ setting }) => setting.otcStatusObj,
    }),
    ...mapGetters(["getOrderInProgress"]),
  },
  created() {
    if (!this.$store.state.login.token) {
      this.rightList = [];
      return;
    }
    if (this.$route.fullPath == "/c2c/buyCoin") {
      this.rightList = [
        { title: "订单", url: "/c2c/tradeOrder" },
        { title: "用户中心", url: "/c2c/userCenter" },
      ];
    }
  },
  methods: {
    visibleChange(e) {
      this.showingTooltip = e;
    },
    // 成为商家或者申请退保
    toSaler(type) {
      if (!this.$store.state.login.token) {
        this.$router.push("/login");
        return;
      }
      merchantCheck().then((res) => {
        if (res && res.data  &&res.data == 6) {
          console.log(res.data );
          this.$message({
              message:this.$t(this.t + "解禁申请正在审核中，暂不能申请退保!"),
              type:'warning'
            });
          return;
        }
        // 跳转到我的委托单
        this.$router.push({
          path: "/layout/c2c/tradeTrust",
          query: { curComp: type === 1 ? "Saler" : "cancel" },
        });
      });
    },
    // 发布广告
    publishAd() {
      // 禁止个人发布提示
      if(this.userLevel ==0 &&this.auditStatus ==4){
         this.hintShow = true
        return
      }
     
      if (this.otcStatusObj.canPersonalAuthStatus && !this.otcStatusObj.canMerchantAuthStatus) {
        // 普通用户或者商家通过认证
        this.$router.push({
          path: "/c2c/tradeTrust",
          query: { curComp: "Publish" },
        });
      } else if(!this.otcStatusObj.canMerchantAuthStatus&&this.userLevel ==1) {
        //商家 未认证
        this.isOtcShow = true
      } else if(!this.otcStatusObj.canPersonalAuthStatus&&this.userLevel ==0){
        //普通用户 未身份认证
         this.$router.push({
          path: "/c2c/tradeTrust",
          query: { curComp: "User" },
        });
      } else{

         this.$router.push({
          path: "/c2c/tradeTrust",
          query: { curComp: "Publish" },
        });
      }
    },
    onClose(){
      this.isOtcShow = false
    },
    hintClose(){
      this.hintShow = false
    },
    /**
     * @param {* 当前模块的信息} item
     * @param {* 当前模块的索引} index
     * @param {* 左边模块还是右边模块} module
     */
    handleNav({ url }, index) {
      this.$router.push(url);
    },
    // 根据用户ID 查询 商户信息
    getMerchantInfoById() {
      getMerchantInfoById().then((res) => {
        this.userLevel = res.data.userLevel;
        this.merchantInfo = res.data;
        this.auditStatus = res.data.auditStatus
        this.$store.dispatch("handleSetMerchantInfo", this.merchantInfo);
        this.$store.dispatch("handleSetUserLevel", res.data?.userLevel);
      });
    },
    merchantCheck(type = undefined) {
      merchantCheck().then((res) => {
        // 查询商户信息
        this.status = res.data;
      });
    },

    getOrderState() {
      $orderStatus().then((res) => {
        this.ordersInProgress = res.data.data.ordersInProgress;
      });
    },
  },
  mounted() {
    this.getOrderState();
    this.getMerchantInfoById();
    this.merchantCheck();
  },
};
</script>

<style lang="scss" scoped>
.el-dropdown-menu__item:not(.is-disabled):hover,
.el-dropdown-menu__item:focus {
  background-color: #f5f7fa;
  color: #333333;
}
::v-deep .redDot {
  // background: #90ff00 !important;
  width: 6px !important;
  height: 6px !important;
  top: 18px !important;
  right: -1px !important;
}
.wrapper-view {
  overflow-y: scroll;
  background: #f5f7fa;
  // width: 1920px;

  .c2c-Header {
    width: 100%;
    padding: 0 210px;
    position: fixed;
    background: #fbfcfd;
    top: 70px;
    z-index: 99;
    .tabsNav {
      // width: 1400px;
      height: 80px;
      margin: auto;
      .left-panel,
      .right-panel {
        color: #8992a6;
        font-size: 16px;
        cursor: pointer;
        margin-top: 17px;
        span {
          height: 60px;
          line-height: 60px;
        }
      }
      .left-panel {
        .tab {
          padding-right: 30px;
        }
      }
      .right-panel {
        .tab {
          padding-left: 30px;
          position: relative;
          .tab-title {
            font-size: 16px;
            padding-right: 5px;
            color: #8992a6;
          }
          .redDot {
            position: absolute;
            top: 8px;
            right: -10px;
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: #f75f52;
          }
          .el-icon-caret-bottom {
            font-size: 16px;
            color: #8992a6;
          }
          .el-icon-caret-top {
            font-size: 16px;
            color: #90ff00;
          }
          .textActive {
            color: #90ff00;
          }
        }
      }
      .tab-active {
        color: #90ff00;
        > span {
          display: inline-block;
          position: relative;

          &::before {
            position: absolute;
            content: "";
            width: 100%;
            height: 2px;
            left: 0;
            bottom: 0;
            background-color: #90ff00;
            border-radius: 1;
          }
        }
      }
    }
  }
  .table-body {
    margin-top: 80px;
  }
  // .el-dropdown-menu{
  //   position: absolute;
  //   top: 0;
  //   left: 0px;
  //   // z-index: 10;
  //   padding: 10px 0;
  //   margin: 20px 0;
  //   background-color: #FFFFFF;
  //   border: 1px solid #EBEEF5;
  //   border-radius: 5px;
  //   box-shadow: 0 5px 10pxx 0 rgba(0, 0, 0, 0.1);
  //   .el-dropdown-menu__item{
  //     list-style: none;
  //     line-height: 50px;
  //     padding: 0 20px;
  //     margin: 0;
  //     font-size: 14px;
  //     color: #606266;
  //     cursor: pointer;
  //     outline: none;
  //   }
  // }
}
</style>
