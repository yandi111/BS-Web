<template>
  <div class="layout">
    <Header></Header>
    <div class="wrapper-view">
      <div class="main-content">
        <div class="side-menu" :class="{ dark: getTheme === 'dark' }" style="background-color: #141414;">
          <div
            class="menu-item"
            style="background: #141414;"
            :class="[$route.path === item.url ? 'menu-active' : '']"
            v-for="(item, index) in navList"
            :key="index"
            @click="handleMenu(item)"
          >
            {{ item.title | translate }}
          </div>
        </div>
        <div class="content">
          <router-view></router-view>
        </div>
      </div>
      <!-- <Footer></Footer> -->
    </div>
  </div>
</template>

<script>
import Header from "@/components/header/header.vue";
import Footer from "@/components/footer/footer.vue";
import { mapGetters } from "vuex";
export default {
  name: "ContractLayout",
  components: {
    Header,
    Footer,
  },
  data() {
    return {
      navList: [
        {
          title: "rules.币种简介",
          url: "/contractRules/currencyIntroduction",
        },
        {
          title: "rules.交易规则",
          url: "/contractRules/tradingRules",
        },
        {
          title: "rules.资金费率",
          url: "/contractRules/fundingRate",
        },
        {
          title: "rules.仓位档位",
          url: "/contractRules/leverageMargin",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["getTheme"]),
  },
  methods: {
    handleMenu({ url }) {
      this.$router.push(url);
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  background-color: var(--main-bg);

  .wrapper-view {
    // padding-left: 127px;
    width: 100%;
    height: calc(100% - 70px);
    overflow-y: auto;
    .main-content {
      width: 100%;
      height: 100%;
      display: flex;

      .side-menu {
        
        min-width: 280px;
        height: 100%;
        // border-right: 1px solid #f5f3f3;
        background-color: #141414;
        .side-menu ul {
          background-color: #141414;
        }
        .menu-item {
          height: 60px;
          display: flex;
          align-items: center;
          padding-left: 80px;
          color: #96a2b2;
          cursor: pointer;
        }
        .menu-active {
          position: relative;
          background-color: #141414;
          color: var(--main-text-color);
          &::before {
            position: absolute;
            content: "";
            top: 15px;
            right: 0;
            width: 3px;
            height: 30px;
            background: var(--theme-color);
            border-radius: 2px;
          }
        }
        &.dark {
          border-right: 1px solid #222222;
          .menu-active {
            background-color: #141414;
          }
        }
      }
      .content {
        width: 100%;
        height: 100%;
        background-color: #141414;
      }
    }
  }
}
</style>
