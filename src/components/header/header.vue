<template>
  <div v-if="!getMobileRebateState" class="header">
    <div class="header-container" :class="{ bg: useTheme, dark: isDark }"
         style="background-color: #141414; border-bottom: 0.5px solid #252525;">
      <div class="header-left">
        <router-link to="/" class="logo"><img src="../../assets/images/icon/icon_logo.png" alt=""/></router-link>

        <!--    <el-menu :default-active="activeIndex" background-color="transparent" active-text-color="rgba(144, 255, 0, 1)" text-color="#fff" router class="el-menu-demo" mode="horizontal">-->
        <!--      <el-menu-item v-for="(item, index) of headerNavList" :disabled="!item.url" :key="index" :index="item.url">{{ item.title }}</el-menu-item>-->
        <!--    </el-menu>-->

        <router-link v-for="(item, index) of headerNavList"
                     :to="item.url"
                     :disabled="item.disabled"
                     :target="item.target"
                     class="a_link">
          {{ item.title }}
        </router-link>

      </div>
      <div class="header-right">
        <div v-if="!getToken" class="wallet flex">
          <router-link v-for="(item, index) of loginTab" :key="index" :to="item.url">{{ item.label }}</router-link>
        </div>

        <el-dropdown v-else @command="onCommand">
          <router-link to="/overview" class="userInfo el-dropdown-link">
            <img src="@/assets/side/icon-user.png" alt="">
          </router-link>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item class="info">
              <div class="user flex">
                <div class="username flex">
                  <h1>Hi,{{ ccountList.nickname }}</h1>

                  <div class="flex vip">
                    <img src="@/assets/side/icon_ edit.png" alt="">
                    <p>VIP {{ ccountList.vipLevel }}</p>
                  </div>
                </div>
                <div class="uid flex">
                  <p>UID: <span id="textToCopy">{{ ccountList.uid }}</span></p>
                  <a @click="$copyContent(ccountList.uid)"><img src="@/assets/side/icon_responsible.png" alt=""></a>
                </div>
              </div>
              <a @click="$refs.formaccount.openDialog()" class="UserTab">
                {{ $t('spot_22') }}
              </a>
            </el-dropdown-item>
            <el-dropdown-item command="overview" class="link flex">
              <img src="@/assets/side/icon_wallet_overview.png" alt="">
              <p>{{ $t('spot_23') }}</p>
            </el-dropdown-item>
            <el-dropdown-item command="fundAccount" class="link flex">
              <img src="@/assets/side/icon_account.png" alt="">
              <p>{{ $t('lang_1098') }}</p>
            </el-dropdown-item>
            <el-dropdown-item command="contractAccount" class="link flex">
              <img src="@/assets/side/icon_swap_account.png" alt="">
              <p>{{ $t('lang_1878') }}</p>
            </el-dropdown-item>
            <el-dropdown-item command="contractAccount" class="link flex">
              <img src="@/assets/side/icon_spotaccount.png" alt="">
              <p>{{ $t('lang_2086') }}</p>
            </el-dropdown-item>
            <el-dropdown-item command="verifyIdentidy" class="link flex">
              <img src="@/assets/side/icon_tdentity_verification.png" alt="">
              <p>{{ $t('lang_409') }}</p>
            </el-dropdown-item>
            <el-dropdown-item command="securitySetting" class="link flex">
              <img src="@/assets/side/icon_security settings.png" alt="">
              <p>{{ $t('spot_24') }}</p>
            </el-dropdown-item>
            <el-dropdown-item command="layout" class="link flex">
              <img src="@/assets/side/icon_logout.png" alt="">
              <p>{{ $t('spot_25') }}</p>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>

        <a class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M3.31881 0.1875C3.66399 0.1875 3.94381 0.467322 3.94381 0.8125C3.94381 1.14199 3.68885 1.41193 3.36546 1.43579L3.31881 1.4375H2.06256C1.73311 1.4375 1.46314 1.6925 1.43928 2.01586L1.43756 2.0625V13.9375C1.43756 14.2669 1.69256 14.5369 2.01592 14.5608L2.06256 14.5625H13.9376C14.267 14.5625 14.537 14.3075 14.5608 13.9841L14.5626 13.9375V2.0625C14.5626 1.73305 14.3076 1.46308 13.9842 1.43921L13.9376 1.4375H12.6991C12.3539 1.4375 12.0741 1.15768 12.0741 0.8125C12.0741 0.483012 12.3291 0.213073 12.6525 0.189214L12.6991 0.1875H13.9376C14.9495 0.1875 15.7743 0.989284 15.8113 1.99221L15.8126 2.0625V13.9375C15.8126 14.9495 15.0108 15.7742 14.0079 15.8112L13.9376 15.8125H2.06256C1.0506 15.8125 0.225822 15.0107 0.188854 14.0078L0.187561 13.9375V2.0625C0.187561 1.05054 0.989345 0.225761 1.99227 0.188793L2.06256 0.1875H3.31881ZM8.00003 0.1875C8.32952 0.1875 8.59946 0.442462 8.62332 0.765856L8.62503 0.8125V8.38822L9.76787 7.24556C9.9991 7.01433 10.3664 7.00216 10.612 7.20905L10.6518 7.24556C10.883 7.47679 10.8952 7.84413 10.6883 8.08969L10.6518 8.12944L8.44206 10.3391C8.21084 10.5703 7.84353 10.5825 7.59797 10.3757L7.55821 10.3392L5.34821 8.12947C5.10412 7.88541 5.10409 7.48968 5.34815 7.24559C5.57937 7.01434 5.9467 7.00215 6.19228 7.20902L6.23203 7.24553L7.37503 8.38827V0.8125C7.37503 0.467322 7.65485 0.1875 8.00003 0.1875Z"
                  fill="#F4F4F4"/>
          </svg>
        </a>
        <a class="icon" @click="langsVisible = true">
          <svg id="langs-icon" xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 19 19"
               fill="none">
            <g clip-path="url(#clip0_16456_1075)">
              <path
                  d="M18.75 9.15625C18.75 14.0457 14.7404 18.0625 9.84375 18.0625C4.95433 18.0625 0.9375 14.0529 0.9375 9.15625C0.9375 4.26683 4.94711 0.25 9.84375 0.25C14.7332 0.25 18.75 4.25961 18.75 9.15625ZM12.3606 6.73317C10.6659 6.99279 9.00721 6.98558 7.35577 6.74038C6.98077 8.0024 6.98077 10.4183 7.32692 11.4928H12.375C12.7067 9.94952 12.7067 8.36298 12.3606 6.73317ZM6.14423 6.60337C5.08414 6.27885 4.01683 5.94712 2.94231 5.61538C1.69471 7.8149 1.83894 10.8798 2.96394 12.7043C4.03846 12.3726 5.11298 12.0409 6.15144 11.7236C6.08654 10.8798 5.97115 10.0288 5.97115 9.1851C5.96394 8.31971 6.07933 7.46154 6.14423 6.60337ZM13.4856 11.7019C14.6106 12.0481 15.6779 12.3726 16.7524 12.7043C18.0649 10.3317 17.7764 7.24519 16.7236 5.6226C15.649 5.95433 14.5889 6.27885 13.4856 6.61779C13.8101 8.29808 13.8173 10.0144 13.4856 11.7019ZM9.84375 16.6562C10.8534 15.4591 11.5962 14.1611 12.0649 12.6827C10.5721 12.488 9.11539 12.488 7.6226 12.6899C8.09135 14.1611 8.83413 15.4591 9.84375 16.6562ZM9.82933 1.66346C8.83413 2.85337 8.09135 4.14423 7.6226 5.62981C9.1226 5.82452 10.5793 5.83173 12.0433 5.62981C11.7764 4.48317 10.7524 2.64423 9.82933 1.66346ZM11.2572 16.8005C13.2476 16.4038 14.8774 15.4014 16.1755 13.6635C15.2091 13.3822 14.3149 13.1226 13.4207 12.8846C13.3413 12.863 13.1683 12.9784 13.125 13.0721C12.9519 13.4399 12.851 13.8438 12.6635 14.2043C12.2163 15.0769 11.7332 15.9279 11.2572 16.8005ZM3.54087 4.65625C4.47837 4.92308 5.3726 5.17548 6.26683 5.4351C6.48317 5.5 6.51202 5.34856 6.58413 5.19712C6.99519 4.29567 7.41346 3.39423 7.85337 2.50721C8.02644 2.16106 8.27163 1.85817 8.5024 1.50481C6.53365 1.83654 4.45673 3.14183 3.54087 4.65625ZM11.1635 1.51202C12.0288 2.70192 12.6851 3.9351 13.125 5.27644C13.1971 5.5 13.3413 5.45673 13.4928 5.41346C14.1635 5.22596 14.8269 5.03846 15.4976 4.83654C15.7067 4.77164 15.9087 4.67788 16.1178 4.59135C15.1154 3.06971 13.0673 1.78606 11.1635 1.51202ZM3.50481 13.6707C4.8101 15.3942 6.41106 16.4038 8.42308 16.8005C8.42308 16.7284 8.43029 16.6995 8.42308 16.6851C7.62981 15.5457 6.98798 14.3341 6.54808 13.0144C6.52644 12.9495 6.35337 12.8702 6.27404 12.8918C5.3726 13.1298 4.47837 13.3894 3.50481 13.6707Z"
                  fill="#F4F4F4"/>
            </g>
            <defs>
              <clipPath id="clip0_16456_1075">
                <rect width="17.8125" height="17.8125" fill="white" transform="translate(0.9375 0.25)"/>
              </clipPath>
            </defs>
          </svg>
        </a>
        <a class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd"
                  d="M14.0927 0.526672H5.75189C5.30531 0.526672 4.89265 0.76492 4.66936 1.15167L0.49895 8.37503C0.275659 8.76178 0.275659 9.23827 0.49895 9.62502L4.66936 16.8484C4.89265 17.2351 5.30531 17.4734 5.75189 17.4734L14.0927 17.4734C14.5393 17.4734 14.9519 17.2351 15.1752 16.8484L19.3456 9.62503C19.5689 9.23828 19.5689 8.76178 19.3456 8.37503L15.1752 1.15167C14.9519 0.764921 14.5393 0.526672 14.0927 0.526672ZM5.75189 1.77667L14.0927 1.77667L18.2631 9.00003L14.0927 16.2234L5.75189 16.2234L1.58148 9.00003L5.75189 1.77667ZM9.92229 5.56253C8.02381 5.56253 6.48479 7.10155 6.48479 9.00003C6.48479 10.8985 8.02381 12.4375 9.92229 12.4375C11.8208 12.4375 13.3598 10.8985 13.3598 9.00003C13.3598 7.10155 11.8208 5.56253 9.92229 5.56253ZM9.92229 6.81253C11.1304 6.81253 12.1098 7.7919 12.1098 9.00003C12.1098 10.2082 11.1304 11.1875 9.92229 11.1875C8.71417 11.1875 7.73479 10.2082 7.73479 9.00003C7.73479 7.7919 8.71417 6.81253 9.92229 6.81253Z"
                  fill="#F4F4F4"/>
          </svg>
        </a>
        <a class="icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
            <path
                d="M8.89923 13.7985C6.19811 13.7985 4 11.6004 4 8.89923C4 6.19811 6.19811 4 8.89923 4C11.6004 4 13.7985 6.19811 13.7985 8.89923C13.7985 11.6004 11.6004 13.7985 8.89923 13.7985ZM8.89923 5.18125C6.84977 5.18125 5.18125 6.84878 5.18125 8.89923C5.18125 10.9497 6.84878 12.6172 8.89923 12.6172C10.9497 12.6172 12.6172 10.9497 12.6172 8.89923C12.6172 6.84878 10.9497 5.18125 8.89923 5.18125Z"
                fill="#F4F4F4"/>
            <path
                d="M8.97452 2.86352C8.64869 2.86352 8.38389 2.59872 8.38389 2.27289V0.840625C8.38389 0.514797 8.64869 0.25 8.97452 0.25C9.30034 0.25 9.56514 0.514797 9.56514 0.840625V2.27289C9.56514 2.5997 9.30034 2.86352 8.97452 2.86352ZM8.97452 17.699C8.64869 17.699 8.38389 17.4342 8.38389 17.1084V15.6761C8.38389 15.3503 8.64869 15.0855 8.97452 15.0855C9.30034 15.0855 9.56514 15.3503 9.56514 15.6761V17.1084C9.56514 17.4342 9.30034 17.699 8.97452 17.699ZM4.23573 4.82636C4.08414 4.82636 3.93353 4.76828 3.81836 4.65311L2.80544 3.64117C2.57509 3.41083 2.57509 3.03677 2.80544 2.80544C3.03578 2.57509 3.40984 2.57509 3.64117 2.80544L4.65409 3.81836C4.88444 4.0487 4.88444 4.42277 4.65409 4.65409C4.59915 4.70895 4.5339 4.75241 4.4621 4.78197C4.39031 4.81154 4.31338 4.82662 4.23573 4.82636ZM14.7262 15.3168C14.5746 15.3168 14.424 15.2588 14.3088 15.1436L13.2959 14.1307C13.0656 13.9003 13.0656 13.5263 13.2959 13.2949C13.5263 13.0646 13.9003 13.0646 14.1317 13.2949L15.1436 14.3079C15.3739 14.5382 15.3739 14.9123 15.1436 15.1436C15.0888 15.1985 15.0238 15.2421 14.9522 15.2718C14.8805 15.3015 14.8038 15.3168 14.7262 15.3168ZM2.27388 9.56514H0.840625C0.514797 9.56514 0.25 9.30034 0.25 8.97451C0.25 8.64869 0.514797 8.38389 0.840625 8.38389H2.27289C2.59872 8.38389 2.86352 8.64869 2.86352 8.97451C2.86352 9.30034 2.5997 9.56514 2.27388 9.56514ZM17.1084 9.56514H15.6761C15.3503 9.56514 15.0855 9.30034 15.0855 8.97451C15.0855 8.64869 15.3503 8.38389 15.6761 8.38389H17.1084C17.4342 8.38389 17.699 8.64869 17.699 8.97451C17.699 9.30034 17.4342 9.56514 17.1084 9.56514ZM3.22281 15.3168C3.07122 15.3168 2.92061 15.2588 2.80544 15.1436C2.57509 14.9132 2.57509 14.5392 2.80544 14.3079L3.81836 13.2949C4.0487 13.0646 4.42277 13.0646 4.65409 13.2949C4.88444 13.5253 4.88444 13.8993 4.65409 14.1307L3.64117 15.1436C3.53019 15.2545 3.37971 15.3168 3.22281 15.3168ZM13.7133 4.82636C13.5617 4.82636 13.4111 4.76828 13.2959 4.65311C13.0656 4.42277 13.0656 4.0487 13.2959 3.81737L14.3088 2.80445C14.5392 2.57411 14.9133 2.57411 15.1446 2.80445C15.3749 3.0348 15.3749 3.40886 15.1446 3.64019L14.1317 4.65311C14.0768 4.70813 14.0116 4.75176 13.9398 4.78149C13.868 4.81123 13.791 4.82647 13.7133 4.82636Z"
                fill="#F4F4F4"/>
          </svg>
        </a>
      </div>
    </div>
    <common-modal width="600px" :show="isShow" :noFooter="false" :showClose="false" :appendToBody="true">
      <template #dia_title>
        <div class="title-container">
          <svg-icon iconClass="next" className="prev"></svg-icon>
          <div class="title">{{ $t("lang_3143") }}</div>
          <svg-icon iconClass="next" className="next"></svg-icon>
        </div>
      </template>
      <template #dia_content>
        <div class="success-container">
          <p class="title">{{ noticeDetail.title }}</p>
          <p class="time">{{ $formatTime(noticeDetail.createTimeTsLong) }}</p>
          <div class="desc">
            {{ noticeDetail.content }}
          </div>
        </div>
      </template>

      <template #dia_footer>
        <div class="btn-group1">
          <el-button type="info" style="width: 48%" @click="isShow = false">{{ $t("lang_3144") }}</el-button>
          <el-button type="primary" style="width: 48%" @click="handleMore">{{ $t("lang_3145") }}</el-button>
        </div>
      </template>
    </common-modal>

    <setuser-account ref="formaccount"/>
    <BseDialog :visible.sync="langsVisible" :showFooter="false" :modal="false" :title="$t('spot_21')">
      <LangsBlock @changeLang="changeLangHandler"></LangsBlock>
    </BseDialog>
  </div>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import SetuserAccount from "./components/setuserAccount.vue";
import {useThemePage} from "@/libs/useThemePage";


export default {
  components: {
    SetuserAccount,
    BseDialog: () => import ('@/components/BSEDialog'),
    LangsBlock: () => import('@/components/LangsBlock'),
  },
  data() {
    return {
      userInfoShow: false,
      langsVisible: false,
      setUserInfo: false,
      copySuccess: false, // 复制成功的状态
      loginColor: 1,
      spotList: [],
      isShow: false,
      headerNavList: [
        {
          title: this.$t("lang_1363"),
          url: "/quotes",
        },
        {
          title: this.$t("lang_1361"),
          url: "/spotTrading",
          disabled: true
        },
        {
          title: this.$t("lang_1321"),
          url: "/contractTransaction",
          disabled: true
        },
        {
          title: this.$t('lang_2445'),
          url: "https://ubexsupport.zendesk.com/hc/zh-cn",
          target: "_blank",
        },
        {
          title: this.$t('lang_2927'),
          url: "",
          disabled: true
        },
      ],
      headerNavList2: [
        {
          id: 99,
          title: this.$t("header.app_download"),
          url: "/downApp",
        },
        {
          id: 100,
          title: this.$t("header.square"),
          url: "/square/squareHome",
        },
      ],
      noticeDetail: {}, //通知详情
      loginTab: [
        {
          id: 1,
          label: this.$t("lang_1619"),
          url: "/login",
          isIcon: true,
        },
        {
          id: 2,
          label: this.$t("lang_1699"),
          url: "/register",
          isIcon: true,
        },
      ],
      activeIndex: '',
    };
  },
  computed: {
    ...mapGetters([
      "getTheme",
      "getToken",
      "getAccountList",
      "getVipLevel", "getMobileRebateState",
    ]),

    ccountList() {
      return Array.isArray(this.getAccountList) ? this.getAccountList[0] : JSON.parse(this.getAccountList)[0]
    },

    useTheme() {
      return !!useThemePage.includes(this.$route.path);
    },
    isDark() {
      return this.useTheme && this.getTheme === "dark";
    },
  },
  methods: {
    ...mapActions([
      "handleCurIndex",
      'logOut'
    ]),

    onCommand(e) {
      if (!e) return

      if (e !== 'layout') return this.$router.push(`/${e}`)

      this.$store.dispatch('logOut');
    },
    changeLangHandler() {
      this.langsVisible = false;
    },

    //登录、注册
    login({url, id}) {
      this.loginColor = id
      this.$router.push(url);
      if (id === 2) {
        this.handleCurIndex(0);
      }
    },

    handleMore() {
      this.isShow = false;
    },
  }
};
</script>
<style scoped lang="scss">
@use "./header.scss";

.logo {
  margin-right: 8px;

  img {
    width: 70px;
  }
}

.userInfo {
  padding-right: 15px;
  margin-right: 15px;
  border-right: 2px solid #fff;

  img {
    width: 20px;
  }
}

.icon {
  height: 100%;
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-right: 15px;
  }

  svg {
    cursor: no-drop;
    fill: #606266;
    stroke: #606266;
  }

  #langs-icon {
    cursor: pointer;
    fill: none;
    stroke: none;
  }
}

.link {
  align-items: center;

  img {
    margin-right: 20px;
    width: 20px;
  }

  p {
    font: {
      size: 14px
    }
  }
}

.el-dropdown-menu {
  margin-top: 0;
  background-color: #1B1B1B;
  box-shadow: none;
  border: none;
  border-radius: 0;
  padding: 10px 0 20px;
  max-height: 100vh;

  ::v-deep {
    .popper__arrow {
      display: none;
    }

    .el-dropdown-menu__item {
      height: auto;
      line-height: normal;
      transition: .3s;

      &.info {
        padding: 0 20px;
        margin-bottom: 10px;
        background: transparent !important;

        .user {
          margin-bottom: 10px;
          flex-direction: column;

          .username {
            margin-bottom: 10px;
            align-items: center;
            justify-content: space-between;

            h1 {
              width: 110px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              margin-right: 20px;
              font: {
                size: 20px;
                weight: bold
              }
            }

            .vip {
              align-items: center;

              img {
                margin-right: 5px;
                width: 25px;
              }

              p {
                color: #F0F0F0;
                font: {
                  size: 14px;
                }
              }
            }
          }

          .uid {
            align-items: center;

            p {
              margin-right: 5px;
              font: {
                size: 14px
              }
            }

            img {
              width: 20px;
            }
          }
        }

        .UserTab {
          text-align: center;
          width: 100%;
          padding: 5px;
          border: 1px solid #fff;
          border-radius: 4px;
          box-sizing: border-box;
          color: #fff;
        }
      }

      &.link {
        padding: 20px;
        align-items: center;

        &:hover {
          background: rgba(0, 0, 0, .2);
          transition: .3s;
        }

        img {
          margin-right: 20px;
          width: 20px;
        }

        p {
          font: {
            size: 14px
          }
        }
      }
    }
  }
}

::v-deep {
  .el-menu--horizontal {
    height: 100%;
    border-bottom: none !important;

    .el-menu-item {
      border-bottom: none !important;
      font: {
        size: 14px;
        weight: 600;
      }

      &:not(.is-disabled) {
        &:hover {
          color: #90FF00 !important;
          background-color: transparent !important;
        }
      }
    }
  }
}

.el-dropdown {
  display: flex;
  align-items: center;
  height: 100%;
}
</style>
